import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Confetti = ({ delay, left }: { delay: number; left: number }) => {
  const colors = ["hsl(43 52% 54%)", "hsl(340 60% 89%)", "hsl(350 55% 40%)", "hsl(30 60% 97%)"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      className="absolute w-2 h-3 rounded-sm opacity-70"
      style={{
        left: `${left}%`,
        top: "-5%",
        backgroundColor: color,
        animation: `confettiFall ${4 + Math.random() * 3}s linear ${delay}s infinite`,
      }}
    />
  );
};

const FooterSection = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      left: Math.random() * 100,
    }))
  );

  return (
    <motion.footer
      className="relative bg-primary py-24 sm:py-32 px-6 overflow-hidden"
      onViewportEnter={() => setShowConfetti(true)}
    >
      {showConfetti &&
        confettiPieces.map((c) => <Confetti key={c.id} delay={c.delay} left={c.left} />)}

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-heading text-3xl sm:text-5xl md:text-6xl gold-shimmer glow-pulse mb-6"
        >
          Happy Birthday, Sarah
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="font-body text-cream/80 text-lg sm:text-xl tracking-wide"
        >
          We love you endlessly 💛
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-10 font-body text-cream/40 text-sm"
        >
          Made with love ✨
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default FooterSection;
