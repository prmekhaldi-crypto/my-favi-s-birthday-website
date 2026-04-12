import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (inView) animate(count, target, { duration: 2, ease: "easeOut" });
  }, [inView, target, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const stats = [
  { label: "Beautiful days lived", value: 10958, suffix: "+" },
  { label: "Estimated laughs", value: 284308, suffix: "" },
  { label: "People you've made smile", value: 12450, suffix: "+" },
  { label: "Cups of coffee enjoyed", value: 8760, suffix: "" },
];

const StatsSection = () => (
  <section className="bg-primary py-20 sm:py-28 px-6">
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold text-center mb-16"
      >
        You Are — In Numbers
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-burgundy-light/40 rounded-2xl p-6 text-center border border-gold/10"
          >
            <p className="font-heading text-3xl sm:text-4xl gold-shimmer mb-2">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </p>
            <p className="font-body text-cream/80 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
