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
        She is the kind of soul who doesn’t just enter a room, she transforms it. Not with grand gestures or a need to be
         seen, but with a quiet radiance that makes everyone feel lighter, safer, and somehow more alive. Her warmth is
          magnetic, the kind that draws you in without effort, and her laugh, bold, unapologetic, and contagious...becomes 
          the soundtrack to every memory worth keeping. She is the friend who notices the details others overlook: the way you 
          hesitate before speaking, the milestones you forget to celebrate, the moments when silence says more than words.
           She shows up on an ordinary Tuesday with coffee in hand, knowing exactly when you need it most and reminding you that 
           joy doesn’t wait for special occasions. She send midnight texts just to say, “I’m proud of you,” because she believes 
           in celebrating growth as much as success.

        Her love is not passive; it is fierce, intentional, and deeply rooted in care. She carries people’s burdens without 
        ever dimming her own light, and she gives of herself in ways that make you want to be gentler, braver, better. There 
        is grace in the way she moves through life, not the kind that is polished or rehearsed, but the kind that is raw, 
        human, and profoundly inspiring. To know her is to be reminded that kindness is a strength, that laughter is medicine,
         and that friendship, when lived fully, is one of the most beautiful forms of love.

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
