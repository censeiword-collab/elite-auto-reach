import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import CasesSection from "@/components/home/CasesSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import CTASection from "@/components/home/CTASection";
import SEOTextSection from "@/components/home/SEOTextSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <CasesSection />
        <ReviewsSection />
        <CTASection />
        <SEOTextSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
