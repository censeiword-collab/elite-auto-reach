import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-8xl font-heading font-extrabold text-gradient mb-4">404</div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Страница не найдена
            </h1>
            <p className="text-muted-foreground mb-8">
              Возможно, страница была удалена или вы ввели неверный адрес. 
              Попробуйте вернуться на главную.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-glow">
                <a href="/">
                  <Home className="w-4 h-4 mr-2" />
                  На главную
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/contacts">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Связаться с нами
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
