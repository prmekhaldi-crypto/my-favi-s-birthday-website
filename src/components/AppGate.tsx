/**
 * AppGate.tsx
 *
 * Usage in App.tsx:
 *
 *   import AppGate from "./components/AppGate";
 *
 *   <Route path="/" element={
 *     <AppGate><Index /></AppGate>
 *   } />
 *
 * Easter egg: click the faint ✦ ✦ ✦ at the bottom of the sign-in card
 * 5 times to reveal the credentials.
 */

import React, { useState, useEffect, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";

// ── Credentials ───────────────────────────────────────────────────────────────
const CORRECT_USER = "cerine_is_da_besto";
const CORRECT_PASS = "i_love_you_cerine";

// ── Theme ─────────────────────────────────────────────────────────────────────
const C = {
  bg:        "#0f0207",
  mid:       "#2d0812",
  rose:      "#5a1526",
  gold:      "#d4a843",
  goldLight: "#e8c060",
  goldDim:   "#b8862a",
  cream:     "#f5e6c8",
  dimCream:  "rgba(245,230,200,0.55)",
  border:    "rgba(212,168,67,0.22)",
  borderAc:  "rgba(212,168,67,0.58)",
};

// ── Pre-generated petals ──────────────────────────────────────────────────────
const PETALS = Array.from({ length: 26 }, (_, i) => ({
  id:        i,
  left:      (i * 3.84 + (i % 7) * 1.3) % 100,
  delay:     (i * 0.31) % 4,
  duration:  5 + (i % 5),
  drift:     (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 12),
  lightness: 58 + (i % 5) * 4,
  size:      7 + (i % 4) * 2,
}));

// ── Petal ─────────────────────────────────────────────────────────────────────
function Petal({ p }: { p: typeof PETALS[0] }) {
  return (
    <motion.div
      style={{
        position:      "absolute",
        left:          `${p.left}%`,
        top:           -20,
        width:         p.size,
        height:        p.size,
        borderRadius:  "50% 0 50% 0",
        background:    `hsl(338, 52%, ${p.lightness}%)`,
        opacity:       0.4,
        pointerEvents: "none",
      }}
      animate={{ y: "110vh", x: p.drift, rotate: 360, opacity: [0.4, 0.25, 0] }}
      transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ── Gold Divider ──────────────────────────────────────────────────────────────
function GoldLine() {
  const lineStyle: CSSProperties = {
    flex:       1,
    height:     1,
    background: `linear-gradient(to right, transparent, ${C.gold}55, transparent)`,
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0.65rem auto", maxWidth: 220 }}>
      <div style={lineStyle} />
      <svg width="14" height="14" viewBox="0 0 24 24" fill={C.gold} opacity={0.75}>
        <path d="M12 2 14.5 9H22L16 13.5 18 21 12 17 6 21 8 13.5 2 9H9.5Z" />
      </svg>
      <div style={lineStyle} />
    </div>
  );
}

// ── Shared page wrapper ───────────────────────────────────────────────────────
function PageWrap({ children, radialColor }: { children: React.ReactNode; radialColor: string }) {
  const wrapStyle: CSSProperties = {
    minHeight:      "100vh",
    background:     C.bg,
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    position:       "relative",
    overflow:       "hidden",
    fontFamily:     "'Georgia', serif",
  };
  const glowStyle: CSSProperties = {
    position:      "absolute",
    inset:         0,
    background:    `radial-gradient(ellipse 65% 50% at 50% 55%, ${radialColor} 0%, transparent 70%)`,
    pointerEvents: "none",
  };
  return (
    <div style={wrapStyle}>
      {PETALS.map(p => <Petal key={p.id} p={p} />)}
      <div style={glowStyle} />
      {children}
    </div>
  );
}

// ── Intro Screen ──────────────────────────────────────────────────────────────
function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2400),
      setTimeout(() => setPhase(4), 3700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <PageWrap radialColor={`${C.rose}45`}>
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem" }}>

        <AnimatePresence>
          {phase >= 1 && (
            <motion.p
              key="label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                fontSize:      11,
                letterSpacing: "0.3em",
                color:         C.goldDim,
                textTransform: "uppercase" as const,
                fontFamily:    "sans-serif",
                marginBottom:  "0.9rem",
              }}
            >
              ✦ &nbsp; something beautiful awaits &nbsp; ✦
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.h1
              key="name"
              initial={{ opacity: 0, y: 28, scale: 0.88 }}
              animate={{ opacity: 1,  y: 0,  scale: 1   }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize:   "clamp(4rem, 16vw, 8rem)",
                fontStyle:  "italic",
                fontWeight: 400,
                color:      C.gold,
                margin:     "0 0 0.2rem",
                lineHeight: 1.05,
              }}
            >
              Cerine
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              key="line"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <GoldLine />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.p
              key="sub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize:      "clamp(1rem, 3.5vw, 1.4rem)",
                fontStyle:     "italic",
                color:         C.dimCream,
                marginTop:     "0.8rem",
                letterSpacing: "0.03em",
              }}
            >
              Today, the world is better because you're in it.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 4 && (
            <motion.button
              key="cta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onEnter}
              style={{
                marginTop:     "2.6rem",
                padding:       "0.78rem 2.6rem",
                background:    "transparent",
                border:        `1px solid ${C.borderAc}`,
                borderRadius:  40,
                color:         C.gold,
                fontSize:      13,
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                cursor:        "pointer",
                fontFamily:    "sans-serif",
              }}
            >
              Enter &nbsp;✦
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </PageWrap>
  );
}

// ── Sign-In Screen ────────────────────────────────────────────────────────────
function SignInScreen({ onSuccess }: { onSuccess: () => void }) {
  const [user,         setUser]         = useState("");
  const [pass,         setPass]         = useState("");
  const [showPass,     setShowPass]     = useState(false);
  const [error,        setError]        = useState(false);
  const [shake,        setShake]        = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showHint,     setShowHint]     = useState(false);

  const inputStyle = (hasError: boolean): CSSProperties => ({
    width:        "100%",
    padding:      "0.72rem 0.85rem 0.72rem 2.3rem",
    background:   `${C.bg}dd`,
    border:       `1px solid ${hasError ? "#e879a0" : C.border}`,
    borderRadius: 10,
    color:        C.cream,
    fontSize:     13,
    fontFamily:   "sans-serif",
    outline:      "none",
    boxSizing:    "border-box" as const,
    transition:   "border-color 0.2s",
  });

  const labelStyle: CSSProperties = {
    fontSize:      11,
    letterSpacing: "0.13em",
    color:         `${C.cream}55`,
    textTransform: "uppercase" as const,
    fontFamily:    "sans-serif",
    display:       "block",
    marginBottom:  "0.4rem",
  };

  const iconStyle: CSSProperties = {
    position:  "absolute" as const,
    left:      12,
    top:       "50%",
    transform: "translateY(-50%)",
    color:     `${C.gold}75`,
  };

  const handleSubmit = () => {
    if (user.trim() === CORRECT_USER && pass === CORRECT_PASS) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleSecretClick = () => {
    const n = secretClicks + 1;
    setSecretClicks(n);
    if (n >= 5) { setShowHint(true); setSecretClicks(0); }
  };

  const cardStyle: CSSProperties = {
    position:       "relative",
    zIndex:         10,
    width:          "min(420px, 92vw)",
    background:     `${C.mid}f0`,
    border:         `1px solid ${C.border}`,
    borderRadius:   20,
    padding:        "2.5rem 2.2rem 1.8rem",
    backdropFilter: "blur(14px)",
  };

  const hintStyle: CSSProperties = {
    position:     "absolute",
    bottom:       "calc(100% + 10px)",
    left:         "50%",
    transform:    "translateX(-50%)",
    background:   C.mid,
    border:       `1px solid ${C.borderAc}`,
    borderRadius: 12,
    padding:      "0.8rem 1.3rem",
    fontSize:     12,
    fontFamily:   "sans-serif",
    color:        C.cream,
    whiteSpace:   "nowrap" as const,
    lineHeight:   2,
    cursor:       "pointer",
    zIndex:       100,
    textAlign:    "left" as const,
  };

  return (
    <PageWrap radialColor={`${C.rose}30`}>
      <motion.div
        animate={shake ? { x: [-10, 10, -7, 7, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        style={cardStyle}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <div style={{ fontSize: 30, marginBottom: "0.4rem" }}>🌹</div>
          <h2 style={{ fontSize: "clamp(1.4rem, 5.5vw, 1.9rem)", fontStyle: "italic", fontWeight: 400, color: C.gold, margin: 0 }}>
            Welcome, birthday girl
          </h2>
          <GoldLine />
          <p style={{ fontSize: 11, letterSpacing: "0.18em", color: `${C.cream}45`, textTransform: "uppercase", fontFamily: "sans-serif", margin: 0 }}>
            This is yours. Prove it.
          </p>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>

          {/* Username */}
          <div>
            <label style={labelStyle}>Username</label>
            <div style={{ position: "relative" }}>
              <User size={14} style={iconStyle} />
              <input
                type="text"
                value={user}
                onChange={e => { setUser(e.target.value); setError(false); }}
                placeholder="who are you?"
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={inputStyle(error)}
                onFocus={e  => (e.target.style.borderColor = C.borderAc)}
                onBlur={e   => (e.target.style.borderColor = error ? "#e879a0" : C.border)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Secret word</label>
            <div style={{ position: "relative" }}>
              <Lock size={14} style={iconStyle} />
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={e => { setPass(e.target.value); setError(false); }}
                placeholder="your secret..."
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={{ ...inputStyle(error), paddingRight: "2.4rem" }}
                onFocus={e  => (e.target.style.borderColor = C.borderAc)}
                onBlur={e   => (e.target.style.borderColor = error ? "#e879a0" : C.border)}
              />
              <button
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: `${C.gold}65`, padding: 0, display: "flex", alignItems: "center" }}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1,  y: 0  }}
                exit={{ opacity: 0 }}
                style={{ fontSize: 12, color: "#e879a0", textAlign: "center", fontFamily: "sans-serif", margin: 0 }}
              >
                Hmm, that doesn't seem right... 🌹
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            style={{
              marginTop:     "0.3rem",
              padding:       "0.82rem",
              background:    `linear-gradient(135deg, ${C.rose}cc, ${C.mid})`,
              border:        `1px solid ${C.borderAc}`,
              borderRadius:  12,
              color:         C.gold,
              fontSize:      15,
              fontFamily:    "'Georgia', serif",
              fontStyle:     "italic",
              cursor:        "pointer",
              letterSpacing: "0.04em",
            }}
          >
            Enter the celebration &nbsp;✦
          </motion.button>
        </div>

        {/* ── Easter egg: click ✦ ✦ ✦ five times to reveal creds ── */}
        <div style={{ textAlign: "center", marginTop: "1.6rem", position: "relative" }}>
          <button
            onClick={handleSecretClick}
            aria-label="decorative"
            style={{
              background:    "none",
              border:        "none",
              cursor:        "default",
              color:         `${C.gold}18`,
              fontSize:      11,
              letterSpacing: "0.5em",
              fontFamily:    "sans-serif",
              padding:       "4px 12px",
              userSelect:    "none",
            }}
          >
            ✦ ✦ ✦
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 6,  scale: 0.94 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{ opacity: 0, scale: 0.92 }}
                onClick={() => setShowHint(false)}
                style={hintStyle}
              >
                <div style={{ color: C.goldLight, letterSpacing: "0.08em", marginBottom: 2 }}>psst... 🤫</div>
                <div><span style={{ color: `${C.gold}90` }}>username: </span>{CORRECT_USER}</div>
                <div><span style={{ color: `${C.gold}90` }}>password: </span>{CORRECT_PASS}</div>
                <div style={{ color: `${C.cream}35`, fontSize: 10, marginTop: 4 }}>tap to close</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </PageWrap>
  );
}

// ── App Gate ──────────────────────────────────────────────────────────────────
export default function AppGate({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<"intro" | "signin" | "app">("intro");

  return (
    <AnimatePresence mode="wait">
      {stage === "intro" && (
        <motion.div key="intro" exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.65 }} style={{ position: "relative" }}>
          <IntroScreen onEnter={() => setStage("signin")} />
        </motion.div>
      )}
      {stage === "signin" && (
        <motion.div key="signin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }} style={{ position: "relative" }}>
          <SignInScreen onSuccess={() => setStage("app")} />
        </motion.div>
      )}
      {stage === "app" && (
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}