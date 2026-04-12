import { motion } from "framer-motion";
import GoldDivider from "./GoldDivider";

const LoveLetterSection = () => (
  <section className="bg-cream py-20 sm:py-28 px-6">
    <div className="max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary text-center mb-4"
      >
        Who She Is
      </motion.h2>

      <GoldDivider />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-body text-base sm:text-lg text-foreground leading-relaxed mb-10"
      >
        She is the kind of person who lights up every room she walks into — not because she demands attention,
        but because her warmth is magnetic. Her laugh, loud and unapologetic, is the soundtrack to every
        beautiful memory we share. She is the friend who remembers the little things, who shows up with
        flowers on a random Tuesday, who texts you at midnight just to say, "I'm proud of you."
        She loves deeply, cares fiercely, and lives with a grace that makes everyone around her
        want to be better.
      </motion.p>

      <motion.blockquote
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="border-l-4 border-gold pl-6 py-4 italic font-heading text-xl sm:text-2xl text-gold"
      >
        "She is not just a friend — she is a feeling. A safe place. A home you carry in your heart."
      </motion.blockquote>
    </div>
  </section>
);

export default LoveLetterSection;
