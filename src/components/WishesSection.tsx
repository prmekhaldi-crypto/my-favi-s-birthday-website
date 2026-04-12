import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import GoldDivider from "./GoldDivider";

const wishes = [
  { name: "Emily", message: "You are the most beautiful soul I know. Happy birthday to my ride or die! 🎂" },
  { name: "James", message: "The world is so much brighter because of you. Cheers to another year of your magic! ✨" },
  { name: "Mia", message: "Thank you for being the kind of friend that everyone deserves. I love you endlessly! 💕" },
  { name: "Alex", message: "Here's to more adventures, late-night talks, and memories we'll never forget. HBD! 🥂" },
];

const WishesSection = () => (
  <section className="bg-background py-20 sm:py-28 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary text-center mb-4"
      >
        Wishes from Friends
      </motion.h2>
      <GoldDivider />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        {wishes.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-lift bg-primary rounded-xl p-6 relative overflow-hidden"
          >
            <Heart className="absolute top-4 right-4 w-5 h-5 text-gold/40" />
            <p className="font-heading text-gold text-lg mb-2">{w.name}</p>
            <p className="font-body text-cream/90 text-sm leading-relaxed">{w.message}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WishesSection;
