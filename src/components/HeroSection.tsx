import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Petal = ({ delay, left }: { delay: number; left: number }) => (
  <div
    className="absolute w-3 h-3 rounded-full opacity-40"
    style={{
      left: `${left}%`,
      top: "-5%",
      background: `radial-gradient(circle, hsl(340 60% 75%), hsl(340 60% 89%))`,
      animation: `fall ${6 + Math.random() * 4}s linear ${delay}s infinite`,
    }}
  />
);

const HeroSection = () => {
  const [petals] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      left: Math.random() * 100,
    }))
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
      {petals.map((p) => (
        <Petal key={p.id} delay={p.delay} left={p.left} />
      ))}

      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl gold-shimmer glow-pulse mb-6"
        >
          Happy Birthday, <br />
          <span className="italic">Sarah</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-body text-lg sm:text-xl md:text-2xl text-blush max-w-2xl mx-auto mb-8 tracking-wide"
        >
          Today, the world is better because you're in it.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-heading text-gold text-base sm:text-lg tracking-[0.3em] uppercase"
        >
          April 12, 1995
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
};

export default HeroSection;
