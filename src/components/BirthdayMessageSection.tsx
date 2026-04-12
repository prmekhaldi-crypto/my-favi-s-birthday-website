import { motion } from "framer-motion";

const FloralCorner = ({ className }: { className: string }) => (
  <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none">
    <path d="M10 110C10 110 20 60 60 40C40 60 30 90 10 110Z" fill="hsl(340 60% 26%)" opacity="0.15" />
    <path d="M5 105C5 105 30 70 55 55C45 75 25 95 5 105Z" fill="hsl(43 52% 54%)" opacity="0.2" />
    <circle cx="60" cy="38" r="6" fill="hsl(340 60% 89%)" opacity="0.4" />
    <circle cx="45" cy="52" r="4" fill="hsl(43 52% 54%)" opacity="0.3" />
  </svg>
);

const BirthdayMessageSection = () => (
  <section className="relative bg-blush py-20 sm:py-28 px-6 overflow-hidden">
    <FloralCorner className="absolute top-0 left-0" />
    <FloralCorner className="absolute top-0 right-0 -scale-x-100" />
    <FloralCorner className="absolute bottom-0 left-0 -scale-y-100" />
    <FloralCorner className="absolute bottom-0 right-0 -scale-x-100 -scale-y-100" />

    <div className="max-w-2xl mx-auto text-center relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary mb-10"
      >
        A Letter for You
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-handwritten text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed space-y-6"
      >
        <p>Dear Sarah,</p>
        <p>
          On your birthday, I want you to know that you are one of the most extraordinary
          people I've ever known. You carry light in places others carry shadows, and you
          give love in ways that make the world feel softer.
        </p>
        <p>
          I hope this year brings you everything you've quietly wished for —
          the kind of joy that sneaks up on you, the kind of peace that stays,
          and the kind of love you've always given to everyone else.
        </p>
        <p>
          You deserve the whole sky, and then some.
        </p>
        <p className="text-gold font-bold mt-8">With all my love, always ✨</p>
      </motion.div>
    </div>
  </section>
);

export default BirthdayMessageSection;
