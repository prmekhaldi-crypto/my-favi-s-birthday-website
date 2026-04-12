import { motion } from "framer-motion";
import GoldDivider from "./GoldDivider";

const memories = [
  { year: "2015", caption: "The year it all began — our first adventure together.", color: "hsl(340 40% 85%)" },
  { year: "2016", caption: "Summer road trip. We got lost and found the best sunset.", color: "hsl(30 50% 88%)" },
  { year: "2017", caption: "Your graduation day. We cried more than you did.", color: "hsl(340 50% 88%)" },
  { year: "2018", caption: "That spontaneous trip to the coast. Salt air and belly laughs.", color: "hsl(43 40% 88%)" },
  { year: "2019", caption: "New Year's Eve. Dancing like nobody was watching.", color: "hsl(340 35% 82%)" },
  { year: "2020", caption: "Even a pandemic couldn't stop our movie nights (virtually).", color: "hsl(20 40% 88%)" },
  { year: "2022", caption: "Your birthday surprise — you actually cried!", color: "hsl(340 45% 86%)" },
  { year: "2024", caption: "Here we are. Still laughing, still loving, still us.", color: "hsl(43 50% 90%)" },
];

const TimelineSection = () => (
  <section className="bg-background py-20 sm:py-28 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary text-center mb-4"
      >
        Our Flashbacks
      </motion.h2>
      <GoldDivider />

      <div className="relative mt-12">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/30 hidden md:block" />

        <div className="space-y-12 md:space-y-16">
          {memories.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-6 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <span className="font-heading text-gold text-lg sm:text-xl font-bold">{m.year}</span>
                <p className="font-body text-foreground mt-2 text-sm sm:text-base">{m.caption}</p>
              </div>

              <div className="relative z-10 w-4 h-4 rounded-full bg-gold ring-4 ring-cream hidden md:block" />

              <div className="flex-1">
                <div
                  className="w-full aspect-[4/3] rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: m.color }}
                >
                  <span className="font-body text-sm text-foreground/50">Photo placeholder</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TimelineSection;
