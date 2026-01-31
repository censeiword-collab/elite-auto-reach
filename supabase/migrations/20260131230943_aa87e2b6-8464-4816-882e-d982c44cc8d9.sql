-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles table (security best practice - separate from profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS for user_roles: only admins can view
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Site settings table (global SEO, branding)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are publicly readable"
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Page sections table (visibility, order)
CREATE TABLE public.page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL DEFAULT 'home',
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  settings JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_slug, section_key)
);

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Page sections are publicly readable"
  ON public.page_sections FOR SELECT USING (true);

CREATE POLICY "Admins can manage page sections"
  ON public.page_sections FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Menu items table
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL DEFAULT 'header', -- header, footer
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  open_in_new_tab BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items are publicly readable"
  ON public.menu_items FOR SELECT USING (is_visible = true);

CREATE POLICY "Admins can manage menu items"
  ON public.menu_items FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- SEO settings per page
CREATE TABLE public.page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  h1 TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  schema_organization BOOLEAN DEFAULT true,
  schema_local_business BOOLEAN DEFAULT true,
  schema_breadcrumb BOOLEAN DEFAULT true,
  schema_faq BOOLEAN DEFAULT false,
  canonical_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Page SEO is publicly readable"
  ON public.page_seo FOR SELECT USING (true);

CREATE POLICY "Admins can manage page SEO"
  ON public.page_seo FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default page sections for homepage
INSERT INTO public.page_sections (page_slug, section_key, title, is_visible, sort_order) VALUES
  ('home', 'hero', 'Главный баннер', true, 1),
  ('home', 'services', 'Услуги', true, 2),
  ('home', 'cases', 'Наши работы', true, 3),
  ('home', 'reviews', 'Отзывы', true, 4),
  ('home', 'cta', 'Призыв к действию', true, 5),
  ('home', 'seo_text', 'SEO-текст', true, 6);

-- Insert default menu items
INSERT INTO public.menu_items (location, title, url, sort_order) VALUES
  ('header', 'Услуги', '/price', 1),
  ('header', 'Блог', '/blog', 2),
  ('header', 'Контакты', '/contacts', 3),
  ('footer', 'Политика конфиденциальности', '/privacy', 1),
  ('footer', 'Оферта', '/terms', 2);

-- Insert default SEO for homepage
INSERT INTO public.page_seo (page_slug, meta_title, meta_description, h1) VALUES
  ('home', 'Автосервис премиум-класса в Казани | PMGDETAILING', 'Оклейка авто плёнкой, шумоизоляция, удаление вмятин без покраски в Казани. Работаем с 2015 года.', 'Автосервис премиум-класса в Казани');