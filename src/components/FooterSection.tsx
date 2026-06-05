import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music2, X } from "lucide-react";


// ── Types ──────────────────────────────────────────────────────────────────
interface Person {
  name: string;
  videoSrc: string;
  message: string;
}

interface ConfettiPiece {
  id: number;
  delay: number;
  left: number;
}

// ── Data ───────────────────────────────────────────────────────────────────
const people: Person[] = [
  { name: "Maria",   videoSrc: "", message: "Maria's birthday message" },
  { name: "Melissa", videoSrc: "", message: "Melissa's birthday message" },
{ name: "Les mentors", videoSrc: "/mentors.MOV", message: "REDA, YOUNES & ANES" },
  { name: "Yasmine",    videoSrc: "", message: "Yasmine's birthday message" },
  { name: "Mimi",   videoSrc: "", message: "Sofia's birthday message" },
  { name: "Lclika",   videoSrc: "", message: "Karim's birthday message" },
  { name: "Nourhane",    videoSrc: "", message: "Lina's birthday message" },
  { name: "People y7bok",  videoSrc: "", message: "Younes's birthday message" },
];

// ── Floating bubbles ───────────────────────────────────────────────────────
const SHAPES = ["rounded-full", "rounded-lg", "rounded-2xl", "rounded-none rotate-45"];

const FloatingBubble = ({
  person,
  index,
  onClick,
}: {
  person: Person;
  index: number;
  onClick: () => void;
}) => {
  const shape = SHAPES[index % SHAPES.length];
  const size  = 72;
  const colors = [
    "bg-gold/20 border-gold/50 text-gold",
    "bg-cream/10 border-cream/30 text-cream",
    "bg-rose-300/20 border-rose-300/40 text-rose-200",
  ];
  const color = colors[index % colors.length];

  const isRight   = index % 2 === 1;
  const sideIndex = Math.floor(index / 2);
  const hOffset   = 1 + (sideIndex % 2) * 4;
  const topPercent = 5 + sideIndex * 22;

  const positionStyle: React.CSSProperties = {
    width: size,
    height: size,
    top: `${topPercent}%`,
    ...(isRight ? { right: `${hOffset}%` } : { left: `${hOffset}%` }),
    zIndex: 1,
  };

  return (
    <motion.button
      className={`absolute border-2 flex items-center justify-center cursor-pointer ${shape} ${color}`}
      style={positionStyle}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={`Watch ${person.name}'s message`}
    >
      <span className="font-heading text-xs text-center leading-tight px-1 select-none">
        {person.name}
      </span>
    </motion.button>
  );
};

// ── Confetti ───────────────────────────────────────────────────────────────
const Confetti = ({ delay, left }: { delay: number; left: number }) => {
  const colors = ["hsl(43 52% 54%)", "hsl(340 60% 89%)", "hsl(350 55% 40%)", "hsl(30 60% 97%)"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      className="absolute w-2 h-3 rounded-sm opacity-70 pointer-events-none"
      style={{
        left: `${left}%`,
        top: "-5%",
        backgroundColor: color,
        animation: `confettiFall ${4 + Math.random() * 3}s linear ${delay}s infinite`,
      }}
    />
  );
};

// ── Lyrics ─────────────────────────────────────────────────────────────────
const lyrics = [
  { time: 12,   text: "Le temps s'est arrêté un instant ce matin," },
  { time: 17,   text: "Sur le seuil de tes 19 printemps, Cerine." },
  { time: 24,   text: "Pas besoin de discours ou de cris pour l'écrire," },
  { time: 26,  text: "Juste la douceur du jour qui vient nous sourire." },
  { time: 30,  text: "Une bougie de plus, un chemin qui s'éclaire," },
  { time: 34,  text: "L'amitié est un souffle, une douce prière." },
  { time: 42,  text: "✨ Joyeux anniversaire à l'âme la plus rare," },
  { time: 46,  text: "Que ta route soit douce, sans ombres ni phares." },
  { time: 53,  text: "Pour toi, Cerine, un jardin plein de promesses," },
  { time: 56,  text: "Que chaque lever y apporte ses tendresses." },
  { time: 59,  text: "Que chaque lever de soleil soit un cadeau," },
  { time: 70,  text: "Au coeur que j'aime, au cœur si beau." },
  { time: 77,  text: "On a partagé les silences et les rires," },
  { time: 83,  text: "Des secrets si légers ou d'éclats de folie," },
  { time: 90,  text: "C'est une nouvelle porte qui s'ouvre sur la vie." },
  { time: 95,  text: "Prends le temps de souffler, de regarder dehors," },
  { time: 101,  text: "Cerine, ton amitié est mon plus grand trésor." },
  { time: 107,  text: "✨ Joyeux anniversaire à l'âme la plus rare," },
  { time: 111,  text: "Que ta route soit douce, sans ombres ni phares." },
  { time: 119,  text: "Pour toi, Cerine, un jardin plein de promesses," },
  { time: 122,  text: "Que chaque lever de soleil soit un cadeau," },
  { time: 126, text: "Pour l'amie que j'aime, au cœur si beau." },
  { time: 131, text: "Doux anniversaire, Cerine." },
  { time: 138, text: "mmm, si douce..." },
  { time: 144, text: "💛 On t'aime." },
];

// ── Music Player ───────────────────────────────────────────────────────────
const MusicPlayer = () => {
  const audioRef  = useRef<HTMLAudioElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const lineRefs  = useRef<(HTMLDivElement | null)[]>([]);

  const [playing,     setPlaying]     = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [expanded,    setExpanded]    = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [duration,    setDuration]    = useState(0);

  const AUDIO_SRC = "/Dix_neuf_printemps.mp3";

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
      setExpanded(true);
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setProgress(t);
      let active = -1;
      for (let i = 0; i < lyrics.length; i++) {
        if (t >= lyrics[i].time) active = i;
        else break;
      }
      setCurrentLine(active);
    };

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setCurrentLine(-1);
      setProgress(0);
    };

    audio.addEventListener("timeupdate",      onTimeUpdate);
    audio.addEventListener("loadedmetadata",  onLoadedMetadata);
    audio.addEventListener("ended",           onEnded);
    return () => {
      audio.removeEventListener("timeupdate",     onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended",          onEnded);
    };
  }, []);

  useEffect(() => {
    if (currentLine < 0) return;
    const el = lineRefs.current[currentLine];
    if (el && lyricsRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentLine]);

  const formatTime = (s: number) => {
    const m   = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
    setProgress(Number(e.target.value));
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
      {/* Player bar */}
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
        <Music2 className="w-4 h-4 text-gold flex-shrink-0" />

        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-heading text-gold text-xs tracking-wide truncate">
            Dix-neuf Printemps
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-body text-cream/40 text-[10px] tabular-nums w-6">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1 appearance-none rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(43 52% 54%) ${(progress / (duration || 1)) * 100}%, rgba(255,255,255,0.15) 0%)`,
                accentColor: "hsl(43 52% 54%)",
              }}
            />
            <span className="font-body text-cream/40 text-[10px] tabular-nums w-6">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full bg-gold/30 hover:bg-gold/50 flex items-center justify-center transition flex-shrink-0"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing
            ? <Pause className="w-3.5 h-3.5 text-gold" />
            : <Play  className="w-3.5 h-3.5 text-gold" />}
        </button>

        <button
          onClick={() => setExpanded((e) => !e)}
          className="font-body text-cream/40 hover:text-cream/70 text-[10px] uppercase tracking-widest transition flex-shrink-0"
          aria-label="Toggle lyrics"
        >
          {expanded ? "Hide" : "Lyrics"}
        </button>
      </div>

      {/* Lyrics panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 220 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              ref={lyricsRef}
              className="h-full overflow-y-auto px-4 py-4 bg-white/5 border border-white/10 rounded-2xl scroll-smooth"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex flex-col gap-3 py-16">
                {lyrics.map((line, i) => (
                  <div key={i} ref={(el) => { lineRefs.current[i] = el; }}>
                    <motion.p
                      animate={{
                        opacity: i === currentLine ? 1 : i < currentLine ? 0.35 : 0.45,
                        scale:   i === currentLine ? 1.04 : 1,
                        color:   i === currentLine
                          ? "hsl(43 52% 64%)"
                          : "rgba(253,245,230,0.5)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="font-body text-sm text-center leading-relaxed cursor-default select-none"
                    >
                      {line.text}
                    </motion.p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative -mt-[220px] h-[220px] pointer-events-none rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[hsl(350_55%_25%)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[hsl(350_55%_25%)] to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={AUDIO_SRC} loop={false} />
    </div>
  );
};

// ── Birthday Countdown ─────────────────────────────────────────────────────
const useBirthdayCountdown = () => {
  const getNext = () => {
    const now      = new Date();
    const thisYear = now.getFullYear();
    // 🗓 Change month (0-indexed) and day to Cerine's real birthday
    let bday = new Date(thisYear, 5, 15);
    if (bday <= now) bday = new Date(thisYear + 1, 5, 15);
    const diff = bday.getTime() - now.getTime();
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(getNext);
  useEffect(() => {
    const id = setInterval(() => setTime(getNext()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-heading text-2xl sm:text-3xl text-gold tabular-nums"
    >
      {String(value).padStart(2, "0")}
    </motion.span>
    <span className="font-body text-cream/40 text-[10px] uppercase tracking-widest mt-1">
      {label}
    </span>
  </div>
);

const BirthdayCountdown = () => {
  const { days, hours, minutes, seconds } = useBirthdayCountdown();
  const isBirthday = days === 0 && hours === 0 && minutes === 0;

  if (isBirthday) {
    return (
      <p className="font-heading text-gold text-xl animate-pulse">
        🎂 Today is the day! Happy Birthday Cerine! 🎂
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-body text-cream/50 text-xs uppercase tracking-widest">
        Next birthday in
      </p>
      <div className="flex items-start gap-5">
        <CountdownUnit value={days}    label="days"    />
        <span className="font-heading text-gold text-2xl mt-1">:</span>
        <CountdownUnit value={hours}   label="hours"   />
        <span className="font-heading text-gold text-2xl mt-1">:</span>
        <CountdownUnit value={minutes} label="minutes" />
        <span className="font-heading text-gold text-2xl mt-1">:</span>
        <CountdownUnit value={seconds} label="seconds" />
      </div>
    </div>
  );
};

// ── Video Modal ────────────────────────────────────────────────────────────
const VideoModal = ({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-primary rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg mx-4"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream/10">
          <p className="font-heading text-gold text-lg">{person.name} says...</p>
          <button
            onClick={onClose}
            className="text-cream/50 hover:text-cream transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-video bg-black flex items-center justify-center">
          {person.videoSrc ? (
            <video
              src={person.videoSrc}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-cream/30">
              <Play className="w-12 h-12" />
              <p className="font-body text-sm">
                Add <code className="text-gold/70">videoSrc</code> for {person.name}
              </p>
            </div>
          )}
        </div>

        <p className="font-body text-cream/50 text-sm text-center py-4 px-5">
          {person.message}
        </p>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ── Main Component ─────────────────────────────────────────────────────────
const FooterSection = () => {
  const [showConfetti,   setShowConfetti]   = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const [confettiPieces] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id:    i,
      delay: Math.random() * 5,
      left:  Math.random() * 100,
    }))
  );

  return (
    <>
      <motion.footer
        className="relative bg-primary py-24 sm:py-32 px-6 overflow-hidden min-h-[600px]"
        onViewportEnter={() => setShowConfetti(true)}
      >
        {showConfetti &&
          confettiPieces.map((c) => (
            <Confetti key={c.id} delay={c.delay} left={c.left} />
          ))}

        {people.map((person, i) => (
          <FloatingBubble
            key={person.name}
            person={person}
            index={i}
            onClick={() => setSelectedPerson(person)}
          />
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-heading text-3xl sm:text-5xl md:text-6xl gold-shimmer glow-pulse"
          >
            Happy Birthday, Cerine
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-body text-cream/80 text-lg sm:text-xl tracking-wide"
          >
            We love you endlessly 💛
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <BirthdayCountdown />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <MusicPlayer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="font-body text-cream/40 text-sm"
          >
            Made with love ✨
          </motion.div>
        </div>
      </motion.footer>

      {selectedPerson && (
        <VideoModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </>
  );
};

export default FooterSection;