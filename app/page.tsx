import { SiteHeader } from "@/features/landing/components/site-header";
import { HeroSection } from "@/features/landing/components/hero-section";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { ProductShowcase } from "@/features/landing/components/product-showcase";
import { FeaturesSection } from "@/features/landing/components/features-section";
import { TrustSection } from "@/features/landing/components/trust-section";
import { PricingSection } from "@/features/landing/components/pricing-section";
import { FaqSection } from "@/features/landing/components/faq-section";
import { FinalCta } from "@/features/landing/components/final-cta";
import { SiteFooter } from "@/features/landing/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center">
        
        <HeroSection />
        
        <HowItWorks />
        
        <ProductShowcase />
        
        <FeaturesSection />
        
        <TrustSection />
        
        <PricingSection />
        
        <FaqSection />
        
        <FinalCta />
        
      </main>
      <SiteFooter />
    </div>
  );
}
