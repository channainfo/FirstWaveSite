import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { TeamSection } from "@/components/team-section";
import { ImpactSection } from "@/components/impact-section";
import { CTASection } from "@/components/cta-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <DesktopNav />
      <MobileNav />
      
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <TeamSection />
        <ImpactSection />
        <CTASection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
