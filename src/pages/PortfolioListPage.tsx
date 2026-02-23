import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

interface PortfolioPost {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  description: string | null;
  cover_image_url: string | null;
}

const PortfolioListPage = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["portfolio-posts-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_posts" as any)
        .select("id, title, slug, published_at, description, cover_image_url")
        .eq("is_active", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as PortfolioPost[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Портфолио | SUNMAXKZN"
        description="Наши работы — портфолио детейлинга, оклейки и тюнинга автомобилей в Казани"
        canonicalUrl="https://sunmax-kzn.ru/portfolio"
      />
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Портфолио</h1>

        {isLoading ? (
          <p className="text-muted-foreground">Загрузка…</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">Статей пока нет</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <a
                key={p.id}
                href={`/portfolio/${p.slug}`}
                className="group block border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {p.cover_image_url && (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(p.published_at).toLocaleDateString("ru-RU")}
                  </p>
                  <h2 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{p.description}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioListPage;
