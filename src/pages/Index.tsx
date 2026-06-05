import HeroSection from "@/components/HeroSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import TimelineSection from "@/components/TimelineSection";
import LoveCardsSection from "@/components/MirrorSection";
import BirthdayMessageSection from "@/components/BirthdayMessageSection";
import PolaroidSection from "@/components/FilmStripSection";
import WishesSection from "@/components/WishesSection";
import StatsSection from "@/components/CakeSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <main className="scroll-smooth">
    <HeroSection />
    <LoveLetterSection />
    <TimelineSection />
    <LoveCardsSection />
    <BirthdayMessageSection />
    <PolaroidSection />
    <WishesSection />
    <StatsSection />
    <FooterSection />
  </main>
);

export default Index;
