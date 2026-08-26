import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import GoldDivider from "./GoldDivider";

const wishes = [
  { name: "1min3", message: "Joyeux anniversaire best 720 resident!" },
];

const PER_PAGE = 4;
type Tab = "all" | "favorites";

// ── Floating heart particle ────────────────────────────────────────────────
interface HeartParticle {
  id: number;
  x: number;   // vw %
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number; // horizontal drift px
}

const HEART_COLORS = [
  "#f43f5e", "#fb7185", "#fda4af",
  "#e879a0", "#f9a8d4", "#fbbf24",
  "#fcd34d", "#fdba74",
];

let particleId = 0;

const FloatingHeart = ({ p, onDone }: { p: HeartParticle; onDone: () => void }) => (
  <motion.div
    key={p.id}
    className="fixed pointer-events-none z-[9999]"
    style={{ left: `${p.x}vw`, bottom: "-60px" }}
    initial={{ opacity: 1, y: 0, x: 0, scale: p.size }}
    animate={{
      opacity: [1, 1, 0],
      y: [0, -window.innerHeight * 0.6 - 100],
      x: [0, p.drift],
      scale: [p.size, p.size * 1.2, p.size * 0.8],
    }}
    transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
    onAnimationComplete={onDone}
  >
    <Heart
      style={{ width: p.size * 20, height: p.size * 20, color: p.color, fill: p.color }}
    />
  </motion.div>
);

// ── Wish card ──────────────────────────────────────────────────────────────
const WishCard = ({
  wish,
  isFavorited,
  onToggle,
}: {
  wish: { name: string; message: string };
  isFavorited: boolean;
  onToggle: () => void;
}) => (
  <div className="card-lift bg-primary rounded-xl p-6 relative overflow-hidden">
    <button
      onClick={onToggle}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className="absolute top-4 right-4 group"
    >
      <motion.div
        animate={isFavorited ? { scale: [1, 1.6, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Heart
          className={`w-5 h-5 transition-colors duration-200 ${
            isFavorited
              ? "fill-rose-400 text-rose-400"
              : "text-gold/40 group-hover:text-gold/70"
          }`}
        />
      </motion.div>
    </button>
    <p className="font-heading text-gold text-lg mb-2">{wish.name}</p>
    <p className="font-body text-cream/90 text-sm leading-relaxed">{wish.message}</p>
  </div>
);

// ── Main section ───────────────────────────────────────────────────────────
const WishesSection = () => {
  const [page, setPage]           = useState(0);
  const [tab, setTab]             = useState<Tab>("all");
  const [favorited, setFavorited] = useState<Set<number>>(new Set());
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  const spawnHearts = useCallback(() => {
    const newParticles: HeartParticle[] = Array.from({ length: 18 }, () => ({
      id:       particleId++,
      x:        5 + Math.random() * 90,
      size:     0.6 + Math.random() * 1.2,
      color:    HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      duration: 1.8 + Math.random() * 1.4,
      delay:    Math.random() * 0.5,
      drift:    (Math.random() - 0.5) * 160,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleFavorite = (index: number) => {
    setFavorited((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        spawnHearts();
      }
      return next;
    });
  };

  const displayedWishes =
    tab === "favorites"
      ? wishes.map((w, i) => ({ ...w, originalIndex: i })).filter((w) => favorited.has(w.originalIndex))
      : wishes.map((w, i) => ({ ...w, originalIndex: i }));

  const totalPages    = Math.ceil(displayedWishes.length / PER_PAGE);
  const currentWishes = displayedWishes.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const switchTab = (newTab: Tab) => {
    setTab(newTab);
    setPage(0);
  };

  return (
    <>
      {/* Heart particles — rendered at root level, fixed to viewport */}
      {particles.map((p) => (
        <FloatingHeart key={p.id} p={p} onDone={() => removeParticle(p.id)} />
      ))}

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

          <p className="mt-6 text-center font-body text-sm italic text-primary/60">
            This section will be filled later with the messages you receive on Instagram and elsewhere.
          </p>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {(["all", "favorites"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-body text-sm transition-all duration-200 border ${
                  tab === t
                    ? "bg-primary text-gold border-gold/40"
                    : "bg-transparent text-primary/60 border-primary/20 hover:border-primary/40"
                }`}
              >
                {t === "favorites" && (
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      tab === "favorites" ? "fill-rose-400 text-rose-400" : "text-primary/40"
                    }`}
                  />
                )}
                {t === "all"
                  ? "All wishes"
                  : `Favorites${favorited.size > 0 ? ` (${favorited.size})` : ""}`}
              </button>
            ))}
          </div>

          {/* Cards / empty state */}
          <AnimatePresence mode="wait">
            {tab === "favorites" && favorited.size === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 mt-16 text-primary/40"
              >
                <Heart className="w-10 h-10 text-primary/20" />
                <p className="font-body text-sm">
                  No favorites yet — tap the heart on any wish to save it here.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`${tab}-${page}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12"
              >
                {currentWishes.map((w) => (
                  <WishCard
                    key={w.originalIndex}
                    wish={w}
                    isFavorited={favorited.has(w.originalIndex)}
                    onToggle={() => toggleFavorite(w.originalIndex)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <>
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 0))}
                  disabled={page === 0}
                  className="p-2 rounded-full bg-primary text-gold disabled:opacity-30 hover:opacity-80 transition"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`w-2.5 h-2.5 rounded-full transition ${
                        i === page ? "bg-gold scale-125" : "bg-primary opacity-40 hover:opacity-70"
                      }`}
                      aria-label={`Page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                  disabled={page === totalPages - 1}
                  className="p-2 rounded-full bg-primary text-gold disabled:opacity-30 hover:opacity-80 transition"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <p className="text-center text-cream/50 text-xs mt-3 font-body">
                {page + 1} / {totalPages}
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default WishesSection;
