import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Increment view count
  useQuery({
    queryKey: ["blog-post-view", slug],
    queryFn: async () => {
      if (!post?.id) return null;
      await supabase
        .from("blog_posts")
        .update({ views_count: (post.views_count || 0) + 1 })
        .eq("id", post.id);
      return true;
    },
    enabled: !!post?.id,
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-bold mb-4">Статья не найдена</h1>
            <p className="text-muted-foreground mb-8">
              К сожалению, запрашиваемая статья не существует или была удалена.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к блогу
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const publishedDate = post.published_at
    ? format(new Date(post.published_at), "d MMMM yyyy", { locale: ru })
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.h1 || post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image,
    author: {
      "@type": "Person",
      name: post.author_name || "Редакция",
    },
    publisher: {
      "@type": "Organization",
      name: "PMG Detailing",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/logo.png`,
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": window.location.href,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
        keywords={post.meta_keywords || undefined}
        ogImage={post.featured_image || undefined}
        canonicalUrl={`${window.location.origin}/blog/${post.slug}`}
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">
                  Главная
                </Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Блог
                </Link>
                <span>/</span>
                <span className="text-foreground truncate max-w-[200px]">
                  {post.title}
                </span>
              </nav>

              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {post.category && (
                  <Badge variant="secondary">{post.category}</Badge>
                )}
                {post.tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.h1 || post.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                {post.author_name && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author_name}</span>
                  </div>
                )}
                {publishedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{publishedDate}</span>
                  </div>
                )}
                {post.reading_time_minutes && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.reading_time_minutes} мин чтения</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featured_image && (
          <section className="pb-8">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-4xl mx-auto"
              >
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-auto rounded-2xl object-cover max-h-[500px]"
                />
              </motion.div>
            </div>
          </section>
        )}

        {/* Content */}
        <article className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-6">
                  {post.excerpt}
                </p>
              )}

              {/* Main content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
                  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-muted prose-pre:border"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    Теги:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to blog */}
              <div className="mt-12">
                <Button asChild variant="outline">
                  <Link to="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Все статьи
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
