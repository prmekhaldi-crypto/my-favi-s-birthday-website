import { useState } from "react";

const STARS_COUNT = 18;

function generateStars() {
  return Array.from({ length: STARS_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 3,
  }));
}

const stars = generateStars();

// ✅ PERSONNALISE ICI — ajoute autant de questions/réponses que tu veux
const QA = [
  {
    label: "Mon plus beau trait ?",
    response: "Cerine, ta lumière vient de l'intérieur — cette façon que tu as de rendre chaque pièce plus belle rien qu'en y entrant. Tu es rare, et le monde le sait.",
  },
  {
    label: "Dis quelque chose de beau",
    response: "Cerine, tu es la preuve que la grâce existe. Dans ton sourire se cache tout ce que les poètes ont cherché à décrire sans jamais tout à fait y arriver.",
  },
  {
    label: "Mon année ?",
    response: "Cette année t'appartient, Cerine. Les étoiles se sont alignées pour toi — prépare-toi à briller comme tu ne l'as jamais fait.",
  },
  {
    label: "Suis-je spéciale ?",
    response: "Cerine, il n'existe qu'une seule toi dans tout l'univers. C'est la définition même de spéciale.",
  },
  {
    label: "Ce que je mérite ?",
    response: "Tu mérites tout ce qui est beau, doux, et immense. Ne laisse jamais personne te convaincre du contraire.",
  },
  // ➕ Ajoute d'autres ici :
  // { label: "Ta question ?", response: "Ta réponse poétique ici…" },
];

const LoveCardsSection = () => {
  const [responseText, setResponseText] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  function showResponse(idx: number) {
    if (activeIdx === idx) return;
    setVisible(false);
    setResponseText("");
    setActiveIdx(idx);
    setTimeout(() => {
      setResponseText(QA[idx].response);
      setVisible(true);
    }, 200);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');
        .miroir-body { min-height:100vh; background:#1a0010; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; }
        .mirror-wrap { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:2rem 1rem; }
        .mirror-frame { position:relative; width:min(400px,92vw); background:#3d0a22; border-radius:50%/46%; padding:3rem 2.5rem; border:4px solid #c9a96e; box-shadow:0 0 0 8px #3d0a22,0 0 0 10px #c9a96e; text-align:center; overflow:hidden; transition:box-shadow 0.6s ease; }
        .mirror-shine { position:absolute; top:10%; left:15%; width:30%; height:55%; background:linear-gradient(135deg,rgba(255,255,255,0.07) 0%,transparent 60%); border-radius:50%; pointer-events:none; }
        .mirror-title { font-family:'Playfair Display',serif; font-size:13px; letter-spacing:0.2em; color:#c9a96e; text-transform:uppercase; margin-bottom:1.2rem; opacity:0.7; }
        .mirror-prompt { color:#e8d5b0; font-size:15px; font-style:italic; letter-spacing:0.04em; margin-bottom:1.4rem; opacity:0.85; font-weight:300; }
        .mirror-response { min-height:100px; display:flex; align-items:center; justify-content:center; margin-bottom:1.2rem; }
        .response-text { color:#faf5eb; font-size:17px; font-weight:400; font-style:italic; line-height:1.75; opacity:0; transition:opacity 0.7s ease; text-align:center; letter-spacing:0.01em; }
        .response-text.visible { opacity:1; }
        .suggestions { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
        .suggestion-pill { background:rgba(201,169,110,0.1); border:1px solid rgba(201,169,110,0.3); border-radius:20px; padding:6px 14px; color:#c9a96e; font-family:'Cormorant Garamond',serif; font-size:13px; font-style:italic; cursor:pointer; transition:background 0.2s, border-color 0.2s; letter-spacing:0.02em; }
        .suggestion-pill:hover { background:rgba(201,169,110,0.22); }
        .suggestion-pill.active { background:rgba(201,169,110,0.25); border-color:rgba(201,169,110,0.8); color:#f0d99a; }
        .star { position:absolute; width:2px; height:2px; border-radius:50%; background:#c9a96e; }
        @keyframes twinkle { 0%,100%{opacity:0}50%{opacity:0.7} }
      `}</style>

      <div className="miroir-body">
        <div className="mirror-wrap">
          <div className="mirror-frame">
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
              {stars.map((s) => (
                <div key={s.id} className="star" style={{ left:`${s.left}%`, top:`${s.top}%`, animation:`twinkle ${s.duration}s infinite ${s.delay}s ease-in-out` }} />
              ))}
            </div>
            <div className="mirror-shine" />

            <div className="mirror-title">Miroir Magique</div>
            <div className="mirror-prompt">Choisis ta question…</div>

            <div className="mirror-response">
              <p className={`response-text${visible ? " visible" : ""}`}>
                {responseText || ""}
              </p>
            </div>

            <div className="suggestions">
              {QA.map((q, i) => (
                <button
                  key={i}
                  className={`suggestion-pill${activeIdx === i ? " active" : ""}`}
                  onClick={() => showResponse(i)}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoveCardsSection;