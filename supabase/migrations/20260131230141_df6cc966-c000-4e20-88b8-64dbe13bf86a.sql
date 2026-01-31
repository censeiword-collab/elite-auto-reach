-- Enum для статусов публикации
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- Enum для типов лидов
CREATE TYPE lead_status AS ENUM ('new', 'in_progress', 'completed', 'cancelled');

-- =====================
-- ТАБЛИЦА УСЛУГ
-- =====================
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  h1 TEXT,
  short_description TEXT,
  full_description TEXT,
  features JSONB DEFAULT '[]',
  price_from INTEGER,
  price_unit TEXT DEFAULT '₽',
  icon TEXT,
  image_url TEXT,
  gallery JSONB DEFAULT '[]',
  seo_text TEXT,
  faq JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================
-- ТАБЛИЦА СТАТЕЙ БЛОГА
-- =====================
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  h1 TEXT,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category TEXT,
  tags TEXT[],
  related_service_slug TEXT REFERENCES public.services(slug),
  status content_status DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  reading_time_minutes INTEGER DEFAULT 5,
  author_name TEXT DEFAULT 'Редакция AutoService',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================
-- ТАБЛИЦА КЕЙСОВ / ПОРТФОЛИО
-- =====================
CREATE TABLE public.cases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  service_slug TEXT REFERENCES public.services(slug),
  car_brand TEXT,
  car_model TEXT,
  before_images JSONB DEFAULT '[]',
  after_images JSONB DEFAULT '[]',
  work_duration TEXT,
  materials_used TEXT[],
  result_text TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================
-- ТАБЛИЦА ОТЗЫВОВ
-- =====================
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  car_brand TEXT,
  car_model TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  service_slug TEXT REFERENCES public.services(slug),
  source TEXT DEFAULT 'website',
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  review_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================
-- ТАБЛИЦА ЛИДОВ
-- =====================
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  car_brand TEXT,
  car_model TEXT,
  service_slug TEXT REFERENCES public.services(slug),
  message TEXT,
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status lead_status DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =====================
-- ИНДЕКСЫ
-- =====================
CREATE INDEX idx_services_slug ON public.services(slug);
CREATE INDEX idx_services_active ON public.services(is_active);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(published_at);
CREATE INDEX idx_cases_service ON public.cases(service_slug);
CREATE INDEX idx_reviews_service ON public.reviews(service_slug);
CREATE INDEX idx_leads_status ON public.leads(status);

-- =====================
-- RLS POLICIES
-- =====================
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Services are publicly readable" ON public.services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Published blog posts are publicly readable" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Active cases are publicly readable" ON public.cases
  FOR SELECT USING (is_active = true);

CREATE POLICY "Active reviews are publicly readable" ON public.reviews
  FOR SELECT USING (is_active = true);

-- Anyone can submit leads
CREATE POLICY "Anyone can submit leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- =====================
-- TRIGGERS
-- =====================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();