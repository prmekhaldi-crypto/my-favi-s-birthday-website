import { motion } from "framer-motion";
import { Heart, Star, Smile, Sun, Sparkles, Music, Coffee, Gift } from "lucide-react";
import GoldDivider from "./GoldDivider";

const items = [
  { icon: Heart, text: "Your laugh is absolutely contagious" },
  { icon: Star, text: "You show up when it matters most" },
  { icon: Smile, text: "You make everyone feel truly seen" },
  { icon: Sun, text: "Your energy lights up every room" },
  { icon: Sparkles, text: "You turn ordinary days into magic" },
  { icon: Music, text: "Your playlist is always perfect" },
  { icon: Coffee, text: "Even your coffee runs feel like an adventure" },
  { icon: Gift, text: "You give the most thoughtful gifts" },
];

const LoveCardsSection = () => (
  <section className="bg-primary py-20 sm:py-28 px-6">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold text-center mb-4"
      >
        Things We Love About You
      </motion.h2>
      <div className="gold-divider px-8 mb-12">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
          <path d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z" fill="currentColor" opacity="0.7" />
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card-lift bg-burgundy-light/50 rounded-xl p-6 text-center border border-gold/10"
          >
            <item.icon className="w-8 h-8 text-gold mx-auto mb-4" />
            <p className="font-body text-cream text-sm sm:text-base">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LoveCardsSection;
