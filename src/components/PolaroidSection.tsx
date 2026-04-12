import { motion } from "framer-motion";
import GoldDivider from "./GoldDivider";

const polaroids = [
  { caption: "Best day ever 💕", rotation: -3, color: "hsl(340 40% 87%)" },
  { caption: "Laughing till it hurts", rotation: 2, color: "hsl(30 50% 90%)" },
  { caption: "Golden hour magic", rotation: -5, color: "hsl(43 40% 88%)" },
  { caption: "This one's framed", rotation: 4, color: "hsl(340 50% 85%)" },
  { caption: "Adventures with you", rotation: -2, color: "hsl(20 40% 88%)" },
  { caption: "The real MVP", rotation: 3, color: "hsl(340 35% 82%)" },
  { caption: "Forever grateful", rotation: -4, color: "hsl(43 50% 90%)" },
  { caption: "Can't stop smiling", rotation: 1, color: "hsl(340 45% 86%)" },
  { caption: "My person 🌸", rotation: -1, color: "hsl(30 40% 85%)" },
];

const PolaroidSection = () => (
  <section className="bg-cream py-20 sm:py-28 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary text-center mb-4"
      >
        Polaroid Wall
      </motion.h2>
      <GoldDivider />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-12">
        {polaroids.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, rotate: p.rotation }}
            whileInView={{ opacity: 1, y: 0, rotate: p.rotation }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            className="card-lift bg-cream rounded-sm p-3 sm:p-4"
            style={{ boxShadow: "0 4px 20px hsl(340 30% 50% / 0.1)" }}
          >
            <div
              className="w-full aspect-square rounded-sm mb-3 flex items-center justify-center"
              style={{ backgroundColor: p.color }}
            >
              <span className="font-body text-xs text-foreground/40">Photo</span>
            </div>
            <p className="font-handwritten text-sm sm:text-base text-foreground text-center">
              {p.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PolaroidSection;
