import { motion } from "framer-motion";
import GoldDivider from "./GoldDivider";
import week2 from "./Pics/week2.jpg";
import matchi from "./Pics/matchi.jpg";
import maria from "./Pics/maria.jpg";
import TC from "./Pics/TC.jpg";
import TD from "./Pics/TD.jpg";
import incaf from "./Pics/incaf.jpg";
import metro from "./Pics/metro.jpg";
import stand from "./Pics/stand.jpg";

const memories = [
  {
    year: "September 2025",
    caption: "First week fl'ESI... After not seeing each other for months, we finally reunited. The hugs were endless.",
    color: "hsl(340 40% 85%)",
    image: week2,
    credit: "week2",
  },
  {
    year: "October 2025",
    caption: "We matched!",
    color: "hsl(30 50% 88%)",
    image: matchi,
    credit: "matchi",
  },
  {
    year: "November 2025",
    caption: "The group can't be separated!",
    color: "hsl(340 50% 88%)",
    image: maria,
    credit: "maria",
  },
  {
    year: "December 2025",
    caption: "Preparing for TC with lots of excitement!",
    color: "hsl(43 40% 88%)",
    image: TC,
    credit: "tc",
  },
  {
    year: "January 2026",
    caption: "Skipped TD pour Tiktoker MDR.",
    color: "hsl(340 35% 82%)",
    image: TD,
    credit: "td",
  },
  {
    year: "February 2026",
    caption: "Still here, still together (je suis derrière la cam hahah).",
    color: "hsl(20 40% 88%)",
    image: incaf,
    credit: "incaf",
  },
  {
    year: "March 2026",
    caption: "Ra7 3lina le metro, pcq crn mtzdmch hahah.",
    color: "hsl(340 45% 86%)",
    image: metro,
    credit: "metro",
  },
  {
    year: "April 2026",
    caption: "Here we are. Still laughing, still loving, still us.",
    color: "hsl(43 50% 90%)",
    image: stand,
    credit: "stand",
  },
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
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={m.image}
                    alt={`${m.year} memory photo`}
                    className="object-cover w-full h-full"
                  />
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
