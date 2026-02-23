
-- Portfolio posts table
CREATE TABLE public.portfolio_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  guid text NOT NULL UNIQUE,
  published_at timestamptz NOT NULL DEFAULT now(),
  description text,
  cover_image_url text,
  gallery_images text[] DEFAULT '{}',
  content_html text NOT NULL DEFAULT '',
  author text,
  is_active boolean DEFAULT false,
  sort_order integer DEFAULT 100,
  dzen_category text DEFAULT 'native-draft',
  dzen_format text DEFAULT 'format-article',
  dzen_index text DEFAULT 'index',
  dzen_comments text DEFAULT 'comment-all',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.portfolio_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published portfolio posts are publicly readable"
  ON public.portfolio_posts FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage portfolio posts"
  ON public.portfolio_posts FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
