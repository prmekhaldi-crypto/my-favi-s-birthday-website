import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import crn1 from "./Pics/crn1.jpg";
import crn2 from "./Pics/crn2.jpg";
import crn3 from "./Pics/crn 3.jpg";
import crn4 from "./Pics/crn4.jpg";
import crn5 from "./Pics/crn5.jpg";
import crn6 from "./Pics/crn6.jpg";
import crn7 from "./Pics/crn 7.jpg";
import crn9 from "./Pics/crn9.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const MEMORIES = [
  { caption: "Notre première photo ensemble, et je n'oublierai jamais ce regard.", bg: "#7a1e35", ac: "#d4a843", image: crn1 },
  { caption: "Chaque sourire avec toi me rend plus heureuse.", bg: "#5a1526", ac: "#e8c060", image: crn2 },
  { caption: "Même les petits moments deviennent magiques à tes côtés.", bg: "#6b1a2e", ac: "#d4a843", image: crn3 },
  { caption: "Ta présence transforme tout en couleur et en chaleur.", bg: "#4a1020", ac: "#b8862a", image: crn4 },
  { caption: "Ton rire est la plus belle mélodie que je connaisse.", bg: "#7a1e35", ac: "#e8c060", image: crn5 },
  { caption: "Avec toi, je me sens à la fois plus fort.e et plus léger.ère.", bg: "#5a1526", ac: "#d4a843", image: crn6 },
  { caption: "Chaque instant passé avec toi est un cadeau précieux.", bg: "#6b1a2e", ac: "#b8862a", image: crn7 },
  { caption: "Je t’aime plus que jamais, et je veux encore tant d’aventures avec toi.", bg: "#4a1020", ac: "#e8c060", image: crn9 },
];

// ─── Config ──────────────────────────────────────────────────────────────────

const REPS          = 5;
const FRAME_W       = 214;
const AUTO_INTERVAL = 2600;
const EASE          = 0.09;

// ─── Colors ──────────────────────────────────────────────────────────────────

const C = {
  bg:       "#6b1a2e",
  bg2:      "#5a1526",
  bg3:      "#4a1020",
  strip:    "#3d0d1a",
  gold:     "#d4a843",
  gold2:    "#b8862a",
  gold3:    "#e8c060",
  cream:    "#f5e6c8",
  border:   "rgba(212,168,67,0.15)",
  borderAc: "rgba(212,168,67,0.6)",
  sprocket: "rgba(212,168,67,0.18)",
  pip:      "rgba(212,168,67,0.35)",
};

// ─── Camera Icon ─────────────────────────────────────────────────────────────

function CameraIcon({ ac, active }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      style={{ opacity: active ? 0.95 : 0.55, transition: "opacity 0.3s" }}
    >
      <rect x="4" y="9" width="32" height="22" rx="2.5" stroke={ac} strokeWidth="1.6" fill="none" />
      <circle cx="20" cy="20" r="6" stroke={ac} strokeWidth="1.6" fill="none" />
      <circle cx="30" cy="13" r="2" fill={ac} />
      <path d="M4 16h4M32 16h4M4 24h4M32 24h4" stroke={ac} strokeWidth="1.2" />
    </svg>
  );
}

// ─── Sprocket Row ─────────────────────────────────────────────────────────────

function SprocketRow() {
  return (
    <div style={{ display: "flex", height: 18, overflow: "hidden", background: C.strip }}>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          style={{
            flexShrink: 0,
            width: 22,
            height: 10,
            margin: "4px 6px",
            borderRadius: 2,
            background: C.sprocket,
          }}
        />
      ))}
    </div>
  );
}

// ─── Frame ───────────────────────────────────────────────────────────────────

function Frame({ memory, index, total, isActive }) {
  return (
    <div
      style={{
        width: 200,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 2,
        border: `1px solid ${isActive ? C.borderAc : C.border}`,
        transform: isActive ? "scale(1.06)" : "scale(1)",
        transformOrigin: "center center",
        transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* Photo area */}
      <div
        style={{
          aspectRatio: "3/2",
          background: memory.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {memory.image ? (
          <img
            src={memory.image}
            alt={memory.caption}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <CameraIcon ac={memory.ac} active={isActive} />
        )}
        {/* Scan lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "repeating-linear-gradient(180deg,transparent 0px,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
          }}
        />
      </div>

      {/* Frame number */}
      <div
        style={{
          textAlign: "center",
          padding: "6px 0",
          borderTop: `1px solid ${C.border}`,
          fontSize: 10,
          letterSpacing: "0.14em",
          background: C.strip,
          color: "rgba(212,168,67,0.5)",
          fontFamily: "sans-serif",
        }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FilmStripSection() {
  const reelRef     = useRef(null);
  const trackRef    = useRef(null);
  const posRef      = useRef(0);
  const targetRef   = useRef(0);
  const rafRef      = useRef(0);
  const lastAutoRef = useRef(performance.now());
  const lastTimeRef = useRef(performance.now());
  const autoRef     = useRef(true);
  const dragRef     = useRef({ active: false, startX: 0, startPos: 0, lastX: 0, lastT: 0, vel: 0 });

  const N = MEMORIES.length;
  const allFrames = Array.from({ length: REPS }, () => MEMORIES).flat();

  const [activeIdx, setActiveIdx] = useState(0);
  const [caption, setCaption]     = useState(MEMORIES[0].caption);
  const [capKey, setCapKey]       = useState(0);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const reelWidth = useCallback(
    () => reelRef.current?.offsetWidth ?? window.innerWidth,
    []
  );

  const initialOffset = useCallback(() => {
    const center = Math.floor(REPS / 2) * N;
    return center * FRAME_W - reelWidth() / 2 + FRAME_W / 2 - 7;
  }, [N, reelWidth]);

  const snapIndex = useCallback(
    (pos) => {
      const center = pos + reelWidth() / 2;
      const i = Math.round((center - FRAME_W / 2 + 7) / FRAME_W);
      return Math.max(0, Math.min(allFrames.length - 1, i));
    },
    [allFrames.length, reelWidth]
  );

  const targetForAbs = useCallback(
    (absIdx) => absIdx * FRAME_W - reelWidth() / 2 + FRAME_W / 2 - 7,
    [reelWidth]
  );

  // ── Animation loop ─────────────────────────────────────────────────────────

  useEffect(() => {
    posRef.current    = initialOffset();
    targetRef.current = posRef.current;

    let lastCapIdx = -1;

    function loop(now) {
      rafRef.current = requestAnimationFrame(loop);
      const dt = Math.min(32, now - lastTimeRef.current) / 16;
      lastTimeRef.current = now;

      if (autoRef.current && now - lastAutoRef.current > AUTO_INTERVAL) {
        lastAutoRef.current = now;
        const si = snapIndex(posRef.current);
        targetRef.current = targetForAbs(Math.min(allFrames.length - 1, si + 1));
      }

      const diff = targetRef.current - posRef.current;
      posRef.current += diff * EASE * dt;
      if (Math.abs(diff) < 0.3) posRef.current = targetRef.current;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
      }

      if (posRef.current < N * FRAME_W) {
        posRef.current    += N * FRAME_W;
        targetRef.current += N * FRAME_W;
      }
      if (posRef.current >= (REPS - 1) * N * FRAME_W) {
        posRef.current    -= N * FRAME_W;
        targetRef.current -= N * FRAME_W;
      }

      const ci = snapIndex(posRef.current);
      const di = ci % N;
      if (di !== lastCapIdx) {
        lastCapIdx = di;
        setActiveIdx(di);
        setCaption(MEMORIES[di].caption);
        setCapKey((k) => k + 1);
      }
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [N, allFrames.length, initialOffset, snapIndex, targetForAbs]);

  // ── Pip click ──────────────────────────────────────────────────────────────

  const jumpTo = useCallback(
    (i) => {
      const baseAbs = Math.floor(REPS / 2) * N + i;
      targetRef.current = targetForAbs(baseAbs);
      autoRef.current = false;
      setTimeout(() => {
        autoRef.current = true;
        lastAutoRef.current = performance.now();
      }, 2000);
    },
    [N, targetForAbs]
  );

  // ── Drag / swipe ──────────────────────────────────────────────────────────

  const onDragStart = useCallback((x) => {
    const d = dragRef.current;
    d.active = true;
    d.startX = x;
    d.startPos = posRef.current;
    d.lastX = x;
    d.lastT = performance.now();
    d.vel = 0;
    autoRef.current = false;
  }, []);

  const onDragMove = useCallback((x) => {
    const d = dragRef.current;
    if (!d.active) return;
    const now = performance.now();
    d.vel = ((x - d.lastX) / (now - d.lastT + 1)) * 16;
    d.lastX = x;
    d.lastT = now;
    posRef.current    = d.startPos - (x - d.startX);
    targetRef.current = posRef.current;
  }, []);

  const onDragEnd = useCallback(() => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    const si     = snapIndex(posRef.current);
    const thrown = Math.round(-d.vel / FRAME_W);
    const dest   = Math.max(0, Math.min(allFrames.length - 1, si + thrown));
    targetRef.current = targetForAbs(dest);
    setTimeout(() => {
      autoRef.current = true;
      lastAutoRef.current = performance.now();
    }, 2200);
  }, [allFrames.length, snapIndex, targetForAbs]);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section
      style={{
        padding: "3rem 0 2.5rem",
        overflow: "hidden",
        background: C.bg,
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 1.5rem 2.5rem" }}>
        <h2
          style={{
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            fontStyle: "italic",
            fontWeight: 400,
            color: C.gold3,
            letterSpacing: "-0.02em",
            marginBottom: "0.4rem",
          }}
        >
          I can make a filmstrip of your beauty.
        </h2>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: C.gold2,
            fontFamily: "sans-serif",
            textTransform: "uppercase",
          }}
        >
          a reel of my peak friend
        </p>
      </div>

      {/* Strip */}
      <div style={{ position: "relative", padding: "0.5rem 0" }}>
        <SprocketRow />

        <div
          ref={reelRef}
          style={{
            overflow: "hidden",
            padding: "1.2rem 0",
            cursor: "grab",
            background: C.strip,
            userSelect: "none",
          }}
          onMouseDown={(e) => { onDragStart(e.clientX); e.preventDefault(); }}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          <div
            ref={trackRef}
            style={{ display: "flex", alignItems: "flex-start", gap: 14, width: "max-content", willChange: "transform" }}
          >
            {allFrames.map((mem, i) => (
              <Frame
                key={i}
                memory={mem}
                index={i % N}
                total={N}
                isActive={i % N === activeIdx}
              />
            ))}
          </div>
        </div>

        <SprocketRow />
      </div>

      {/* Caption */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "3.5rem",
          marginTop: "1.5rem",
          position: "relative",
          padding: "0 2rem",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={capKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 3.5vw, 1.5rem)",
              color: C.cream,
              textAlign: "center",
            }}
          >
            &ldquo;{caption}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Pip nav */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: "1.2rem" }}>
        {MEMORIES.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            aria-label={`Go to memory ${i + 1}`}
            style={{
              height: 2,
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
              width: i === activeIdx ? 36 : 20,
              background: i === activeIdx ? C.gold : C.pip,
            }}
          />
        ))}
      </div>
    </section>
  );
}