import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import GoldDivider from "./GoldDivider";

// ── Types ──────────────────────────────────────────────────────────────────
type Stage = "idle" | "countdown" | "blowing" | "blown" | "cutting" | "cut";

// ── Candle flame component ─────────────────────────────────────────────────
const Flame = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute -top-5 left-1/2 -translate-x-1/2 w-3 h-5 origin-bottom"
    animate={{ scaleX: [1, 1.2, 0.9, 1.1, 1], scaleY: [1, 0.95, 1.05, 0.98, 1], rotate: [-3, 3, -2, 2, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <div className="absolute inset-0 rounded-t-full rounded-b-sm bg-amber-400 opacity-90" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-t-full rounded-b-sm bg-yellow-200 opacity-80" />
    <div className="absolute -inset-2 rounded-full bg-amber-400/20 blur-md" />
  </motion.div>
);

// ── Candle component ───────────────────────────────────────────────────────
const Candle = ({ blown, delay, color }: { blown: boolean; delay: number; color: string }) => (
  <div className="relative flex flex-col items-center">
    <AnimatePresence>
      {!blown && <Flame delay={delay} />}
    </AnimatePresence>
    <AnimatePresence>
      {blown && (
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-6 origin-bottom"
          initial={{ opacity: 0.8, scaleY: 0, y: 0 }}
          animate={{ opacity: 0, scaleY: 1.5, y: -16 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="w-full h-full bg-cream/30 blur-sm rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
    <div className={`w-3 h-10 rounded-t-sm rounded-b-sm ${color} relative overflow-hidden`}>
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/20 rounded-t-sm" />
      <div className="absolute top-0 bottom-0 left-1 w-0.5 bg-white/10 rounded-full" />
    </div>
    <div className={`w-4 h-1 rounded-full ${color} opacity-60 -mt-0.5`} />
  </div>
);

// ── Sparkle component ──────────────────────────────────────────────────────
const Sparkle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none text-gold text-lg select-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [-10, -40] }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
  >
    ✨
  </motion.div>
);

// ── Flying Cake Slice Portal ───────────────────────────────────────────────
// Renders fixed on top of everything via a portal to document.body.
// The slice scales up (z-perspective trick) and flies toward the viewer,
// then a cream-splat overlay flashes at peak size.
const FlyingSlice = ({ active, onDone }: { active: boolean; onDone: () => void }) => {
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active) { doneRef.current = false; return; }
    // After the slice animation + splat settle, notify parent
    const t = setTimeout(() => {
      if (!doneRef.current) { doneRef.current = true; onDone(); }
    }, 1800);
    return () => clearTimeout(t);
  }, [active, onDone]);

  if (!active) return null;

  return createPortal(
    <>
      {/* ── Slice flying toward camera ── */}
      <motion.div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
          pointerEvents: "none",
          transformStyle: "preserve-3d",
          perspective: "800px",
          width: 80,
          height: 80,
        }}
        initial={{ opacity: 1, scale: 0.25, rotate: -10 }}
        animate={{ opacity: [1, 1, 0], scale: [0.25, 8, 10], rotate: ["-10deg", "25deg", "30deg"] }}
        transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <svg viewBox="0 0 100 100" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,0 100,100 0,100" fill="#8b1a4a" />
          <polygon points="50,8 93,100 7,100" fill="#faf5eb" />
          <polygon points="50,38 80,100 20,100" fill="#e879a0" opacity="0.7" />
          <ellipse cx="50" cy="8" rx="12" ry="5" fill="#faf5eb" />
          <circle cx="50" cy="70" r="3" fill="rgba(201,169,110,0.6)" />
          <circle cx="38" cy="82" r="2" fill="rgba(201,169,110,0.4)" />
          <circle cx="62" cy="82" r="2" fill="rgba(201,169,110,0.4)" />
        </svg>
      </motion.div>

      {/* ── Cream splat — appears when slice reaches full size ── */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          pointerEvents: "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 1.8, times: [0, 0.38, 0.42, 0.7, 1], ease: "easeOut" }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central splat */}
          <ellipse cx="200" cy="200" rx="110" ry="95" fill="#faf5eb" opacity="0.92" />
          {/* Radiating blobs */}
          <ellipse cx="200" cy="200" rx="140" ry="60" fill="#faf5eb" opacity="0.6" transform="rotate(30 200 200)" />
          <ellipse cx="200" cy="200" rx="130" ry="55" fill="#faf5eb" opacity="0.55" transform="rotate(80 200 200)" />
          <ellipse cx="200" cy="200" rx="145" ry="50" fill="#faf5eb" opacity="0.5" transform="rotate(140 200 200)" />
          <ellipse cx="200" cy="200" rx="125" ry="58" fill="#faf5eb" opacity="0.52" transform="rotate(200 200 200)" />
          <ellipse cx="200" cy="200" rx="138" ry="52" fill="#faf5eb" opacity="0.48" transform="rotate(260 200 200)" />
          {/* Rose blobs */}
          <circle cx="90" cy="110" r="22" fill="#8b1a4a" opacity="0.25" />
          <circle cx="310" cy="90" r="18" fill="#e879a0" opacity="0.3" />
          <circle cx="80" cy="290" r="16" fill="#8b1a4a" opacity="0.2" />
          <circle cx="320" cy="310" r="20" fill="#e879a0" opacity="0.25" />
          <circle cx="200" cy="50" r="14" fill="#8b1a4a" opacity="0.22" />
          <circle cx="200" cy="350" r="16" fill="#8b1a4a" opacity="0.2" />
          {/* Drips */}
          <ellipse cx="200" cy="330" rx="8" ry="20" fill="#faf5eb" opacity="0.7" />
          <ellipse cx="260" cy="310" rx="6" ry="16" fill="#faf5eb" opacity="0.6" transform="rotate(20 260 310)" />
          <ellipse cx="140" cy="315" rx="6" ry="15" fill="#faf5eb" opacity="0.6" transform="rotate(-15 140 315)" />
          <ellipse cx="310" cy="200" rx="5" ry="18" fill="#faf5eb" opacity="0.55" transform="rotate(90 310 200)" />
          <ellipse cx="90" cy="200" rx="5" ry="16" fill="#faf5eb" opacity="0.55" transform="rotate(90 90 200)" />
          {/* Cake bits */}
          <polygon points="170,180 185,195 165,200" fill="#8b1a4a" opacity="0.5" />
          <polygon points="220,175 235,188 215,195" fill="#8b1a4a" opacity="0.45" />
          <polygon points="200,220 212,235 192,233" fill="#e879a0" opacity="0.4" />
        </svg>
      </motion.div>
    </>,
    document.body
  );
};

// ── Main Cake SVG ──────────────────────────────────────────────────────────
const CakeSVG = ({
  stage,
  candleColors,
  blownCandles,
}: {
  stage: Stage;
  candleColors: string[];
  blownCandles: boolean[];
}) => {
  const isCut = stage === "cut";

  return (
    <div className="relative w-64 sm:w-80 mx-auto select-none">
      <AnimatePresence>
        {isCut && (
          <>
            {[
              { x: 10, y: 10, d: 0 }, { x: 80, y: 5, d: 0.1 },
              { x: 50, y: 0, d: 0.2 }, { x: 20, y: 50, d: 0.3 },
              { x: 70, y: 40, d: 0.15 }, { x: 40, y: 60, d: 0.25 },
            ].map((s, i) => (
              <Sparkle key={i} x={s.x} y={s.y} delay={s.d} />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Candles row */}
      <div className="flex justify-center gap-5 mb-2 relative z-10 px-8">
        {candleColors.map((color, i) => (
          <Candle key={i} blown={blownCandles[i]} delay={i * 0.2} color={color} />
        ))}
      </div>

      {/* Cake body */}
      <div className="relative">
        {/* Top tier */}
        <motion.div
          className="relative mx-auto rounded-t-2xl overflow-hidden"
          style={{ width: "70%", height: 64 }}
          animate={isCut ? { x: -8 } : { x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 right-0 h-4 bg-cream rounded-t-2xl z-10">
            {[12, 28, 44, 60, 76].map((left, i) => (
              <div key={i} className="absolute top-2 w-3 h-4 bg-cream rounded-b-full" style={{ left: `${left}%` }} />
            ))}
          </div>
          <div className="absolute inset-0 bg-rose-900" />
          {[20, 40, 60, 80].map((left, i) => (
            <div key={i} className="absolute top-4 bottom-0 w-1 bg-gold/20" style={{ left: `${left}%` }} />
          ))}
        </motion.div>

        {/* Bottom tier */}
        <motion.div
          className="relative mx-auto rounded-b-xl overflow-hidden"
          style={{ width: "100%", height: 80 }}
          animate={isCut ? { x: -4 } : { x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="absolute top-0 left-0 right-0 h-5 bg-cream z-10">
            {[8, 20, 32, 44, 56, 68, 80, 92].map((left, i) => (
              <div key={i} className="absolute top-3 w-3 h-5 bg-cream rounded-b-full" style={{ left: `${left}%` }} />
            ))}
          </div>
          <div className="absolute inset-0 bg-rose-800" />
          {[15, 35, 55, 75].map((left, i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full bg-gold/40" style={{ left: `${left}%`, top: "55%" }} />
          ))}
          <div className="absolute inset-0 flex items-end justify-center pb-3 z-10">
            <span className="font-heading text-gold/80 text-xs tracking-widest">Happy Birthday</span>
          </div>
        </motion.div>

        <div className="mx-auto h-3 bg-cream/20 rounded-b-full" style={{ width: "110%" }} />
      </div>
    </div>
  );
};

// ── Countdown display ──────────────────────────────────────────────────────
const CountdownDisplay = ({ count }: { count: number | null }) => (
  <AnimatePresence mode="wait">
    {count !== null && (
      <motion.div
        key={count}
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-heading text-8xl sm:text-9xl text-gold drop-shadow-lg">
          {count === 0 ? "💨" : count}
        </span>
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Knife SVG ──────────────────────────────────────────────────────────────
const KnifeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 3L3 10.5l6.75 2.25L12 21l3-7.5L21 3z" />
  </svg>
);

// ── Main section ───────────────────────────────────────────────────────────
const CakeSection = () => {
  const [stage, setStage]               = useState<Stage>("idle");
  const [countdown, setCountdown]       = useState<number | null>(null);
  const [blownCandles, setBlownCandles] = useState([false, false, false, false, false]);
  const [sliceActive, setSliceActive]   = useState(false); // controls the portal
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const candleColors = [
    "bg-rose-400",
    "bg-amber-400",
    "bg-gold",
    "bg-pink-400",
    "bg-rose-300",
  ];

  // ── Start ──
  const handleMakeWish = () => {
    setStage("countdown");
    setCountdown(3);
  };

  // ── Countdown logic ──
  useEffect(() => {
    if (stage !== "countdown" || countdown === null) return;

    if (countdown === 0) {
      timerRef.current = setTimeout(() => {
        setStage("blowing");
        setCountdown(null);
        blowOutCandles();
      }, 700);
      return;
    }

    timerRef.current = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [stage, countdown]);

  // ── Blow candles ──
  const blowOutCandles = () => {
    [0, 1, 2, 3, 4].forEach((i) => {
      setTimeout(() => {
        setBlownCandles((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 300);
    });
    setTimeout(() => setStage("blown"), 5 * 300 + 600);
  };

  // ── Cut the cake → launch slice ──
  const handleCut = () => {
    setStage("cutting");
    // Small delay so the "cutting" stage message renders first
    setTimeout(() => {
      setSliceActive(true);
    }, 300);
  };

  // Called by FlyingSlice when its animation finishes (~1.8 s)
  const handleSliceDone = () => {
    setSliceActive(false);
    setStage("cut");
  };

  // ── Reset ──
  const handleReset = () => {
    setStage("idle");
    setCountdown(null);
    setSliceActive(false);
    setBlownCandles([false, false, false, false, false]);
  };

  return (
    <section className="bg-background py-20 sm:py-28 px-6 overflow-hidden">
      {/* Flying slice + splat portal — renders above everything via document.body */}
      <FlyingSlice active={sliceActive} onDone={handleSliceDone} />

      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary text-center mb-4"
        >
          Make a Wish, Cerine
        </motion.h2>
        <GoldDivider />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-body text-primary/60 text-sm mt-6 mb-14"
        >
          {stage === "idle"      && "Close your eyes, think of something beautiful, then blow out the candles."}
          {stage === "countdown" && "Get ready..."}
          {stage === "blowing"   && "Blowing out the candles... 💨"}
          {stage === "blown"     && "Your wish is on its way ✨ Now cut the cake!"}
          {stage === "cutting"   && "Incoming... 😈"}
          {stage === "cut"       && "🎉 Slice served! Happy Birthday, Cerine! 🎂"}
        </motion.p>

        {/* Cake */}
        <div className="relative flex justify-center mb-12">
          <CakeSVG stage={stage} candleColors={candleColors} blownCandles={blownCandles} />
          <CountdownDisplay count={countdown} />
        </div>

        {/* Action buttons */}
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.button
              key="wish"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={handleMakeWish}
              className="px-8 py-3 rounded-full bg-primary text-gold font-heading text-lg border border-gold/30 hover:border-gold/60 transition"
            >
              🕯️ Make a Wish
            </motion.button>
          )}

          {stage === "blown" && (
            <motion.button
              key="cut"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={handleCut}
              className="flex items-center gap-2 mx-auto px-8 py-3 rounded-full bg-primary text-gold font-heading text-lg border border-gold/30 hover:border-gold/60 transition"
            >
              <KnifeIcon /> Cut the Cake
            </motion.button>
          )}

          {stage === "cut" && (
            <motion.button
              key="reset"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={handleReset}
              className="px-6 py-2 rounded-full font-body text-sm text-primary/50 border border-primary/20 hover:border-primary/40 transition"
            >
              ↺ Do it again
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CakeSection;
