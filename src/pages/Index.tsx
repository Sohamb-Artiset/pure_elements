import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategorySection } from "@/components/CategorySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { GiftingProducts } from "@/components/GiftingProducts";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ConcernsSection } from "@/components/ConcernsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FounderSection } from "@/components/FounderSection";
import { IngredientsSection } from "@/components/IngredientsSection";
import { StoresSection } from "@/components/StoresSection";
import { Footer } from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <GiftingProducts />
      <ConcernsSection />
      <ProductShowcase />
      <TestimonialsSection />
      <FounderSection />
      <IngredientsSection />
      <StoresSection />
      <Footer />
      <FloatingCart />
    </div>
  );
};

export default Index;
