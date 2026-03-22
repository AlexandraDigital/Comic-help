import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');`;

const STORY = {
  title: "BLITZ RESET",
  tagline: "Heroes Die. Monsters Are Made.",
  characters: [
    { id: "blitz", name: "Blitz Reset", color: "#FF5C1A", role: "Anti-Hero / Protagonist", powers: ["Ability drain gun", "Machine-boosted stolen powers", "Heat sig cloaking"], motivation: "Erase all villains so no one suffers like he did." },
    { id: "hunthesk", name: "Hunthesk", color: "#00E5A0", role: "Antagonist / O-verse Leader", powers: ["Enhanced grip & strength", "Heat scan", "Command authority"], motivation: "Justice for drained O-verse beings — protect his people." },
    { id: "waveblade", name: "Wave Blade", color: "#A855F7", role: "O-verse Fighter", powers: ["Frequency mixing (triggers body swaps as a flaw)", "Energy waves"], motivation: "Loyal to her team." },
    { id: "arrowshock", name: "ArrowShock", color: "#60A5FA", role: "O-verse Fighter", powers: ["Electrical shock arrows", "Precision aim"], motivation: "Follow Hunthesk's lead." },
  ],
  chapters: [
    {
      id: 1, title: "The Day Heroes Died", act: "ACT I", side: "blitz",
      tagline: "They were supposed to win.",
      beats: [
        "Young Blitz — powerless — watches his heroic family prepare for battle against O-verse invaders.",
        "The O-verse beings overwhelm everything. His family sacrifices their remaining life force to seal the portal.",
        "The villains are gone. His family dissolves with them. He stands alone in silence.",
        "Close-up on his face — something behind his eyes has shattered.",
        "Internal monologue: 'Heroes are supposed to win. To live to fight another day. They didn't.'"
      ],
      tone: "Tragic, devastating — the origin wound",
      keyVisual: "Family silhouettes dissolving into light as the portal seals shut"
    },
    {
      id: 2, title: "The Machine", act: "ACT I", side: "blitz",
      tagline: "Years became obsession. Obsession became purpose.",
      beats: [
        "Time lapse — Blitz in a workshop, blueprints everywhere, mechanical parts, glowing schematics.",
        "The ability-drain gun takes shape: crude, then refined.",
        "First raid in O-verse: a minor villain drained completely — left as a hollow shell.",
        "Blitz feels power flood into him for the first time. Addictive. He notes it. He doesn't stop.",
        "Montage: raids across O-verse, some beings collapsing as empty shells (life source and ability = one).",
        "Some escape mid-drain, flee to Earth injured. He notes them. Lets them be — for now."
      ],
      tone: "Cold, methodical — a hero becoming something else",
      keyVisual: "Blitz surrounded by glowing ability vials in a dark workshop"
    },
    {
      id: 3, title: "The People's Hero", act: "ACT II", side: "blitz",
      tagline: "Earth cheered. They didn't know.",
      beats: [
        "Earth-verse: crime drops. Villains are afraid of something they can't name.",
        "Civilians celebrate 'The Unknown Protector.' News coverage. Gratitude.",
        "Blitz walks a quiet city street — we see the weight he carries beneath the mask.",
        "O-verse enforcement arrives presenting themselves as 'protectors' of their injured kind.",
        "Problem: they're sheltering petty thieves. Low-level criminals. In Blitz's eyes — still villains.",
        "His jaw tightens: 'Villain is villain. No exceptions. Ever.'"
      ],
      tone: "Uneasy calm — the collision is coming",
      keyVisual: "Blitz watching O-verse team gather their injured kin, cold fury on his face"
    },
    {
      id: 4, title: "The Hunt Begins", act: "ACT II", side: "hunthesk",
      tagline: "They found his heat. He didn't know.",
      beats: [
        "O-verse HQ: analysts mapping drainage events, faint heat signatures that vanish.",
        "Blitz is greedy — 5 abilities at once. The signature burns too bright, lingers too long.",
        "Hunthesk sees the data. First clear read of the heat that's been hunting his people.",
        "Team assembled: Hunthesk, Wave Blade, ArrowShock. Others.",
        "Arrival on Earth — horror at the scale. Dozens of drained bodies. Some empty shells of beings.",
        "Hunthesk connects via heat-scan to the injured. Feels their blankness. Rage builds slowly.",
        "'We find who did this. And we end them.'"
      ],
      tone: "Righteous fury building to a boil",
      keyVisual: "Hunthesk among drained bodies, fists clenched, O-verse team behind him"
    },
    {
      id: 5, title: "Collision", act: "ACT II → III", side: "both",
      tagline: "Orange met green. Nothing was ever the same.",
      beats: [
        "The confrontation erupts in a city district — Blitz vs. Hunthesk's full team.",
        "Blitz is formidable: stolen powers firing in combination, tactical and brutal.",
        "ArrowShock's electrical arrow strikes his chest — heart exposed, he staggers.",
        "Hunthesk grabs him from behind. Blitz's fire spiral forms — but Hunthesk comes back a second time.",
        "Wave Blade's frequencies mix accidentally — she loses control of her power.",
        "SURGE: orange and green electricity mixing, two essences colliding in a blaze.",
        "Silence. Both standing. Looking at each other — but in each other's bodies.",
        "Blitz (in Hunthesk's form): 'This is not happening.'",
        "Hunthesk (in Blitz's form): 'Here's what's going to happen if you don't want me to destroy your world...'"
      ],
      tone: "Explosive action → surreal, horrified stillness",
      keyVisual: "The surge — orange and green light intertwined, two figures outlined in electricity"
    },
    {
      id: 6, title: "Living the Other Side", act: "ACT III", side: "both",
      tagline: "To understand your enemy, you have to become them.",
      beats: [
        "Blitz (in Hunthesk's body) is brought to O-verse. He sees the full scope of the destruction.",
        "Faces of drained beings. Families waiting. Children. A whole civilization grieving.",
        "He sees records of himself — cloaked figure, monstrous in efficiency.",
        "Hunthesk (in Blitz's body) finds Earth-verse memories bleeding through. The day his family died.",
        "He feels the grief. The logic of Blitz's crusade. It doesn't justify it — but he understands.",
        "Then: an O-verse being kills a human child. Brutal. Unprovoked. His team watches.",
        "Hunthesk freezes. Does nothing. And the silence of that moment is the loudest thing he's ever felt.",
        "Both return knowing: the other isn't entirely wrong."
      ],
      tone: "Devastating, quiet — every certainty crumbling",
      keyVisual: "Split page: Blitz seeing drained O-verse families / Hunthesk watching the child die"
    },
    {
      id: 7, title: "Reset", act: "ACT III", side: "both",
      tagline: "They came back. Nothing fit anymore.",
      beats: [
        "The swap reverses. Both in their own bodies again, standing apart in silence.",
        "Blitz: 'Some of your people are just... people.'",
        "Hunthesk: 'Some of mine are monsters. I chose not to see it.'",
        "No alliance. Not yet. But the lines are not the same.",
        "Blitz lets a low-level O-verse being go — first time ever. Doesn't explain it.",
        "Hunthesk quietly withdraws protection from a violent member of his group.",
        "Final panel: both on separate rooftops, backs to each other, watching the same city at night.",
        "Caption: 'He still doesn't know if he's the hero. Maybe that's the point.'"
      ],
      tone: "Bittersweet — unresolved, but something has shifted",
      keyVisual: "Two figures on rooftops. Same horizon. Different silhouettes."
    }
  ]
};

const LAYOUTS = [
  {
    id: "splash", name: "SPLASH", sub: "Full dramatic page",
    panels: [{ x: 2, y: 2, w: 96, h: 96, label: "Full Scene", n: 1 }]
  },
  {
    id: "classic3", name: "3 STRIP", sub: "Three horizontal panels",
    panels: [
      { x: 2, y: 2, w: 96, h: 30, label: "Opening", n: 1 },
      { x: 2, y: 35, w: 96, h: 30, label: "Middle", n: 2 },
      { x: 2, y: 68, w: 96, h: 30, label: "Closing", n: 3 }
    ]
  },
  {
    id: "action4", name: "ACTION SPLIT", sub: "Big hero + 3 reactions",
    panels: [
      { x: 2, y: 2, w: 58, h: 96, label: "Main Action", n: 1 },
      { x: 63, y: 2, w: 35, h: 30, label: "Reaction", n: 2 },
      { x: 63, y: 35, w: 35, h: 30, label: "Detail", n: 3 },
      { x: 63, y: 68, w: 35, h: 30, label: "Aftermath", n: 4 }
    ]
  },
  {
    id: "bodyswap", name: "SPLIT REALITY", sub: "Two worlds / Body swap",
    panels: [
      { x: 2, y: 2, w: 46, h: 46, label: "Side A", n: 1 },
      { x: 52, y: 2, w: 46, h: 46, label: "Side B", n: 2 },
      { x: 2, y: 52, w: 96, h: 46, label: "The Moment", n: 3 }
    ]
  },
  {
    id: "tension5", name: "TENSION", sub: "Escalating 5-panel drama",
    panels: [
      { x: 2, y: 2, w: 46, h: 46, label: "Setup", n: 1 },
      { x: 52, y: 2, w: 46, h: 20, label: "Detail A", n: 2 },
      { x: 52, y: 25, w: 46, h: 23, label: "Detail B", n: 3 },
      { x: 2, y: 52, w: 30, h: 46, label: "Close-up", n: 4 },
      { x: 36, y: 52, w: 62, h: 46, label: "Payoff", n: 5 }
    ]
  },
  {
    id: "montage6", name: "MONTAGE", sub: "6-grid for flashbacks",
    panels: [
      { x: 2, y: 2, w: 30, h: 46, label: "Scene 1", n: 1 },
      { x: 35, y: 2, w: 30, h: 46, label: "Scene 2", n: 2 },
      { x: 68, y: 2, w: 30, h: 46, label: "Scene 3", n: 3 },
      { x: 2, y: 52, w: 30, h: 46, label: "Scene 4", n: 4 },
      { x: 35, y: 52, w: 30, h: 46, label: "Scene 5", n: 5 },
      { x: 68, y: 52, w: 30, h: 46, label: "Scene 6", n: 6 }
    ]
  }
];

const SIDE_COLOR = { blitz: "#FF5C1A", hunthesk: "#00E5A0", both: "#A855F7" };
const SIDE_LABEL = { blitz: "BLITZ POV", hunthesk: "O-VERSE POV", both: "BOTH SIDES" };

function PanelSVG({ layout, notes, onNoteClick, selectedPanel, panelCount }) {
  const panels = layout.panels;
  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect x="0" y="0" width="100" height="100" fill="#080810" />
      {panels.map((p) => {
        const hasNote = notes[p.n];
        const isSelected = selectedPanel === p.n;
        const borderColor = isSelected ? "#FFD700" : hasNote ? "#00E5A0" : "#2A2A3E";
        return (
          <g key={p.n} onClick={() => onNoteClick(p.n)} style={{ cursor: "pointer" }}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={isSelected ? "#12122A" : "#0D0D1A"} stroke={borderColor} strokeWidth={isSelected ? "0.8" : "0.5"} rx="0.3" />
            {hasNote ? (
              <foreignObject x={p.x + 1} y={p.y + 1} width={p.w - 2} height={p.h - 2}>
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: "100%", height: "100%", overflow: "hidden", padding: "2px", fontSize: "2.2px", color: "#C0C0D0", fontFamily: "Rajdhani, sans-serif", lineHeight: "1.3", wordBreak: "break-word" }}>
                  {notes[p.n]}
                </div>
              </foreignObject>
            ) : (
              <>
                <text x={p.x + p.w / 2} y={p.y + p.h / 2 - 1.5} textAnchor="middle" fill="#2A2A4A" fontSize="3" fontFamily="Bangers">{p.label}</text>
                <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 2.5} textAnchor="middle" fill="#1E1E3A" fontSize="2.2" fontFamily="Rajdhani">click to describe</text>
              </>
            )}
            <text x={p.x + 1.2} y={p.y + 3.5} fill={isSelected ? "#FFD700" : "#FF5C1A"} fontSize="3.5" fontFamily="Bangers">{p.n}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function BlitzResetStudio() {
  const [tab, setTab] = useState("story");
  const [expandedCh, setExpandedCh] = useState(null);
  const [layoutIdx, setLayoutIdx] = useState(0);
  const [panelNotes, setPanelNotes] = useState({});
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [aiTab, setAiTab] = useState("dialogue");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiChapter, setAiChapter] = useState(0);
  const [aiChar, setAiChar] = useState("blitz");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedChar, setExpandedChar] = useState(null);

  const callClaude = async (system, user) => {
    setLoading(true);
    setAiResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system,
          messages: [{ role: "user", content: user }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "No response.";
      setAiResult(text);
    } catch {
      setAiResult("Connection error. Please try again.");
    }
    setLoading(false);
  };

  const handleGenerate = () => {
    const ch = STORY.chapters[aiChapter];
    const char = STORY.characters.find(c => c.id === aiChar);
    const systemBase = `You are writing dialogue and captions for "BLITZ RESET" — a dark superhero comic with moral complexity. The art style is gritty, cinematic, emotionally raw. Keep dialogue sharp and character-true. No purple prose. Characters speak like they mean it.

CHARACTERS:
- Blitz Reset: Anti-hero. Lost his hero family to O-verse beings. Built a machine to drain abilities. Believes all villains must die — no exceptions. Speaks with cold certainty but buried grief. 
- Hunthesk: O-verse leader. Protective, righteous, but blinded by loyalty to his own kind. Speaks with authority and controlled fury.
- Wave Blade: Quieter, technical, feels guilt over her power causing the body swap.
- ArrowShock: Direct, tactical, follows orders.

FORMAT: Write comic panel dialogue. Use format:
[PANEL N] (brief visual note)
CHARACTER: "Dialogue"
CAPTION: narration if needed`;

    if (aiTab === "dialogue") {
      callClaude(systemBase, `Write dialogue for Chapter ${ch.id}: "${ch.title}". 
Context: ${ch.beats.join(" ")}
Focus on ${char.name} (${char.role}).
Extra context from user: ${aiPrompt || "None"}
Write 1 page (5–6 panels) of dialogue. Be cinematic and raw.`);
    } else if (aiTab === "expand") {
      callClaude(systemBase, `Expand the story beat for Chapter ${ch.id}: "${ch.title}".
Existing beats: ${ch.beats.join(" ")}
User notes: ${aiPrompt || "None"}
Give me 8–10 detailed panel-by-panel beats for this chapter. Include visual direction, emotional subtext, and pacing notes.`);
    } else if (aiTab === "captions") {
      callClaude(systemBase, `Write internal monologue captions for Chapter ${ch.id}: "${ch.title}" from ${char.name}'s POV.
Context: ${ch.beats.join(" ")}
Extra notes: ${aiPrompt || "None"}
Write captions as they'd appear as yellow caption boxes in comics. First-person, raw, minimal. 6–8 captions that capture the emotional arc of the chapter.`);
    }
  };

  const handlePanelNote = (n) => {
    if (selectedPanel === n) {
      setPanelNotes(prev => ({ ...prev, [n]: noteInput }));
      setSelectedPanel(null);
      setNoteInput("");
    } else {
      setSelectedPanel(n);
      setNoteInput(panelNotes[n] || "");
    }
  };

  const layout = LAYOUTS[layoutIdx];

  const s = {
    root: { background: "#080810", minHeight: "100vh", color: "#E0E0E8", fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 },
    header: { background: "linear-gradient(135deg, #0D0D1F 0%, #13091A 100%)", borderBottom: "2px solid #1A1A30", padding: "20px 28px 16px" },
    title: { fontFamily: "'Bangers', cursive", fontSize: 38, letterSpacing: 4, background: "linear-gradient(90deg, #FF5C1A, #FF9A5C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0, lineHeight: 1 },
    tagline: { color: "#8080A0", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginTop: 4 },
    tabs: { display: "flex", gap: 2, padding: "0 28px", background: "#0A0A18", borderBottom: "1px solid #1A1A30" },
    tab: (active) => ({ padding: "12px 20px", cursor: "pointer", border: "none", background: "none", color: active ? "#FF5C1A" : "#606080", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", borderBottom: active ? "2px solid #FF5C1A" : "2px solid transparent", transition: "all 0.2s" }),
    body: { padding: "24px 28px", maxWidth: 1100, margin: "0 auto" },
    card: { background: "#0D0D1E", border: "1px solid #1E1E35", borderRadius: 6, padding: "16px 20px", marginBottom: 12 },
    chHeader: (side) => ({ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", userSelect: "none" }),
    actBadge: (side) => ({ background: SIDE_COLOR[side] + "22", border: `1px solid ${SIDE_COLOR[side]}44`, color: SIDE_COLOR[side], fontSize: 10, fontWeight: 700, letterSpacing: 2, padding: "2px 8px", borderRadius: 3 }),
    chTitle: { fontFamily: "'Bangers', cursive", fontSize: 22, letterSpacing: 1.5, color: "#E8E8F8" },
    chTagline: { color: "#7070A0", fontSize: 12, fontStyle: "italic", marginTop: 2 },
    beat: { display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid #14142A" },
    beatDot: { width: 6, height: 6, background: "#FF5C1A", borderRadius: "50%", marginTop: 6, flexShrink: 0 },
    sectionTitle: { fontFamily: "'Bangers', cursive", fontSize: 20, letterSpacing: 2, color: "#FF5C1A", marginBottom: 16, textTransform: "uppercase" },
    charCard: (id) => ({ background: "#0D0D1E", border: `1px solid ${STORY.characters.find(c=>c.id===id)?.color}33`, borderRadius: 6, padding: "12px 16px", marginBottom: 8, cursor: "pointer" }),
    layoutGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 },
    layoutCard: (active) => ({ background: active ? "#1A1A30" : "#0D0D1E", border: `1px solid ${active ? "#FF5C1A" : "#1E1E35"}`, borderRadius: 5, padding: "10px 12px", cursor: "pointer", transition: "all 0.2s" }),
    canvasWrap: { background: "#080810", border: "1px solid #1E1E35", borderRadius: 6, aspectRatio: "1", maxWidth: 440, margin: "0 auto 16px" },
    noteArea: selectedPanel ? { background: "#0D0D1E", border: "1px solid #FF5C1A", borderRadius: 5, padding: 14, marginBottom: 16 } : null,
    aiTabRow: { display: "flex", gap: 8, marginBottom: 16 },
    aiTabBtn: (active) => ({ padding: "7px 14px", cursor: "pointer", border: `1px solid ${active ? "#00E5A0" : "#1E1E35"}`, background: active ? "#00E5A020" : "#0D0D1E", color: active ? "#00E5A0" : "#606080", borderRadius: 4, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" }),
    select: { background: "#0D0D1E", border: "1px solid #2A2A40", color: "#C0C0D8", padding: "8px 12px", borderRadius: 4, fontFamily: "'Rajdhani', sans-serif", fontSize: 13, width: "100%", marginBottom: 10 },
    textarea: { width: "100%", background: "#080810", border: "1px solid #2A2A40", color: "#C0C0D8", padding: "10px 12px", borderRadius: 4, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, resize: "vertical", minHeight: 80, marginBottom: 12, outline: "none" },
    genBtn: { background: "linear-gradient(135deg, #FF5C1A, #FF3D00)", border: "none", color: "#fff", padding: "10px 24px", borderRadius: 4, cursor: "pointer", fontFamily: "'Bangers', cursive", fontSize: 18, letterSpacing: 2, display: "flex", alignItems: "center", gap: 8 },
    resultBox: { background: "#050510", border: "1px solid #1A1A30", borderRadius: 5, padding: 16, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, lineHeight: 1.7, color: "#B0B0C8", whiteSpace: "pre-wrap", marginTop: 16, maxHeight: 400, overflowY: "auto" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  };

  return (
    <>
      <style>{FONTS + `
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #080810; } ::-webkit-scrollbar-thumb { background: #2A2A40; border-radius: 3px; }
        .beat-row:last-child { border-bottom: none !important; }
        .ch-card:hover { border-color: #2A2A40 !important; }
        .tab-btn:hover { color: #FF9A5C !important; }
        textarea:focus { border-color: #FF5C1A !important; }
      `}</style>
      <div style={s.root}>
        {/* HEADER */}
        <div style={s.header}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={s.title}>BLITZ RESET</div>
              <div style={s.tagline}>⚡ AI Comic Studio — Heroes Die. Monsters Are Made.</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ background: "#FF5C1A22", border: "1px solid #FF5C1A44", color: "#FF5C1A", padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>BLITZ</span>
              <span style={{ background: "#00E5A022", border: "1px solid #00E5A044", color: "#00E5A0", padding: "4px 10px", borderRadius: 3, fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>O-VERSE</span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={s.tabs}>
          {[["story", "📖 Story Arc"], ["panels", "🎬 Panel Studio"], ["ai", "⚡ AI Writer"], ["cast", "👥 Cast"]].map(([id, label]) => (
            <button key={id} className="tab-btn" style={s.tab(tab === id)} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        <div style={s.body}>

          {/* ── STORY ARC TAB ── */}
          {tab === "story" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
                {[["7", "Chapters"], ["4", "Characters"], ["2", "POV Sides"], ["1", "Body Swap"]].map(([n, l]) => (
                  <div key={l} style={{ background: "#0D0D1E", border: "1px solid #1E1E35", borderRadius: 6, padding: "14px 18px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: 32, color: "#FF5C1A" }}>{n}</div>
                    <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 2, textTransform: "uppercase" }}>{l}</div>
                  </div>
                ))}
              </div>

              <div style={s.sectionTitle}>Story Arc — Chapter Breakdown</div>
              {STORY.chapters.map((ch) => (
                <div key={ch.id} className="ch-card" style={{ ...s.card, cursor: "pointer" }} onClick={() => setExpandedCh(expandedCh === ch.id ? null : ch.id)}>
                  <div style={s.chHeader(ch.side)}>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: 28, color: "#4040606", minWidth: 32, color: "#2A2A50" }}>{String(ch.id).padStart(2, "0")}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                        <span style={s.actBadge(ch.side)}>{ch.act}</span>
                        <span style={s.actBadge(ch.side)}>{SIDE_LABEL[ch.side]}</span>
                      </div>
                      <div style={s.chTitle}>{ch.title}</div>
                      <div style={s.chTagline}>"{ch.tagline}"</div>
                    </div>
                    <div style={{ color: "#3A3A60", fontSize: 18 }}>{expandedCh === ch.id ? "▲" : "▼"}</div>
                  </div>

                  {expandedCh === ch.id && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${SIDE_COLOR[ch.side]}22` }}>
                      <div style={{ marginBottom: 12 }}>
                        {ch.beats.map((beat, i) => (
                          <div key={i} className="beat-row" style={s.beat}>
                            <div style={s.beatDot} />
                            <div style={{ fontSize: 14, color: "#B0B0C8", lineHeight: 1.5 }}>{beat}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 16, paddingTop: 10 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Tone</div>
                          <div style={{ fontSize: 13, color: "#9090B0", fontStyle: "italic" }}>{ch.tone}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Key Visual</div>
                          <div style={{ fontSize: 13, color: "#9090B0", fontStyle: "italic" }}>{ch.keyVisual}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── PANEL STUDIO TAB ── */}
          {tab === "panels" && (
            <div style={s.grid2}>
              <div>
                <div style={s.sectionTitle}>Layout Templates</div>
                <div style={s.layoutGrid}>
                  {LAYOUTS.map((l, i) => (
                    <div key={l.id} style={s.layoutCard(layoutIdx === i)} onClick={() => { setLayoutIdx(i); setSelectedPanel(null); setNoteInput(""); }}>
                      <div style={{ fontFamily: "'Bangers', cursive", fontSize: 14, letterSpacing: 1, color: layoutIdx === i ? "#FF5C1A" : "#8080A0" }}>{l.name}</div>
                      <div style={{ fontSize: 11, color: "#4A4A70", marginTop: 2 }}>{l.sub}</div>
                    </div>
                  ))}
                </div>

                {selectedPanel && (
                  <div style={s.noteArea}>
                    <div style={{ fontSize: 13, color: "#FF5C1A", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Panel {selectedPanel} — Scene Description</div>
                    <textarea
                      style={s.textarea}
                      placeholder="Describe this panel: what's happening, who's in it, camera angle, mood..."
                      value={noteInput}
                      onChange={e => setNoteInput(e.target.value)}
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => handlePanelNote(selectedPanel)} style={{ ...s.genBtn, fontSize: 14, padding: "8px 16px" }}>SAVE PANEL</button>
                      <button onClick={() => { setSelectedPanel(null); setNoteInput(""); }} style={{ background: "#1A1A30", border: "1px solid #2A2A45", color: "#8080A0", padding: "8px 16px", borderRadius: 4, cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontSize: 13 }}>CANCEL</button>
                    </div>
                  </div>
                )}

                <div style={{ ...s.card, marginTop: 0 }}>
                  <div style={{ fontSize: 12, color: "#6060A0", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Panel Notes</div>
                  {layout.panels.map(p => (
                    <div key={p.n} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 0", borderBottom: "1px solid #12122A" }}>
                      <span style={{ color: "#FF5C1A", fontFamily: "'Bangers', cursive", fontSize: 16, minWidth: 20 }}>{p.n}</span>
                      <span style={{ fontSize: 12, color: panelNotes[p.n] ? "#B0B0C8" : "#3A3A60", fontStyle: panelNotes[p.n] ? "normal" : "italic" }}>
                        {panelNotes[p.n] || `${p.label} — click panel to describe`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={s.sectionTitle}>{layout.name} — {layout.sub}</div>
                <div style={s.canvasWrap}>
                  <PanelSVG layout={layout} notes={panelNotes} onNoteClick={handlePanelNote} selectedPanel={selectedPanel} />
                </div>
                <div style={{ background: "#0A0A18", border: "1px solid #1A1A28", borderRadius: 5, padding: "10px 14px", fontSize: 12, color: "#5050A0" }}>
                  💡 Click any panel to add a scene description. The <span style={{ color: "#00E5A0" }}>SPLIT REALITY</span> layout is perfect for Chapter 5 (Collision) and Chapter 6 (Living the Other Side).
                </div>
              </div>
            </div>
          )}

          {/* ── AI WRITER TAB ── */}
          {tab === "ai" && (
            <div style={s.grid2}>
              <div>
                <div style={s.sectionTitle}>AI Writer</div>
                <div style={s.aiTabRow}>
                  {[["dialogue", "Dialogue"], ["expand", "Expand Beats"], ["captions", "Captions"]].map(([id, label]) => (
                    <button key={id} style={s.aiTabBtn(aiTab === id)} onClick={() => setAiTab(id)}>{label}</button>
                  ))}
                </div>

                <div style={{ fontSize: 12, color: "#5050A0", marginBottom: 12, lineHeight: 1.6 }}>
                  {aiTab === "dialogue" && "Generate panel-by-panel dialogue for a chapter. Raw, character-true, cinematic."}
                  {aiTab === "expand" && "Expand chapter beats into detailed panel-by-panel visual directions with pacing notes."}
                  {aiTab === "captions" && "Generate internal monologue caption boxes (yellow box style) for a character's chapter arc."}
                </div>

                <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Chapter</div>
                <select style={s.select} value={aiChapter} onChange={e => setAiChapter(Number(e.target.value))}>
                  {STORY.chapters.map((ch, i) => (
                    <option key={ch.id} value={i}>Ch.{ch.id} — {ch.title} ({ch.act})</option>
                  ))}
                </select>

                {aiTab !== "expand" && (
                  <>
                    <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Character Focus</div>
                    <select style={s.select} value={aiChar} onChange={e => setAiChar(e.target.value)}>
                      {STORY.characters.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </>
                )}

                <div style={{ fontSize: 11, color: "#6060A0", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Extra Notes (optional)</div>
                <textarea
                  style={s.textarea}
                  placeholder={aiTab === "dialogue" ? "Any specific scene moment, tone direction, or lines you want included..." : aiTab === "expand" ? "Specific panel directions or pacing notes to incorporate..." : "Specific emotional beats or themes for the captions..."}
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                />

                <button onClick={handleGenerate} disabled={loading} style={{ ...s.genBtn, opacity: loading ? 0.6 : 1 }}>
                  {loading ? "⚡ GENERATING..." : "⚡ GENERATE"}
                </button>
              </div>

              <div>
                <div style={s.sectionTitle}>Output</div>
                {loading && (
                  <div style={{ ...s.card, textAlign: "center", padding: 32 }}>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: 24, color: "#FF5C1A", letterSpacing: 2, marginBottom: 8 }}>GENERATING...</div>
                    <div style={{ fontSize: 13, color: "#5050A0" }}>Writing your comic...</div>
                  </div>
                )}
                {!loading && aiResult && (
                  <div style={s.resultBox}>{aiResult}</div>
                )}
                {!loading && !aiResult && (
                  <div style={{ ...s.card, textAlign: "center", padding: 32, color: "#3A3A60" }}>
                    <div style={{ fontFamily: "'Bangers', cursive", fontSize: 20, marginBottom: 8 }}>READY TO WRITE</div>
                    <div style={{ fontSize: 13 }}>Configure options on the left and hit Generate.</div>
                  </div>
                )}
                {!loading && aiResult && (
                  <button
                    onClick={() => navigator.clipboard?.writeText(aiResult)}
                    style={{ marginTop: 10, background: "#0D0D1E", border: "1px solid #2A2A40", color: "#8080A0", padding: "7px 14px", borderRadius: 4, cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontSize: 12 }}
                  >
                    📋 Copy to Clipboard
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── CAST TAB ── */}
          {tab === "cast" && (
            <div>
              <div style={s.sectionTitle}>Character Bible</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {STORY.characters.map(c => (
                  <div key={c.id} style={{ background: "#0D0D1E", border: `1px solid ${c.color}33`, borderRadius: 7, padding: "18px 20px", cursor: "pointer" }} onClick={() => setExpandedChar(expandedChar === c.id ? null : c.id)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <div style={{ width: 42, height: 42, borderRadius: "50%", background: c.color + "22", border: `2px solid ${c.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bangers', cursive", fontSize: 20, color: c.color }}>
                        {c.name[0]}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Bangers', cursive", fontSize: 20, letterSpacing: 1, color: "#E8E8F8" }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: c.color, letterSpacing: 1.5, textTransform: "uppercase" }}>{c.role}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "#8080A0", lineHeight: 1.5, marginBottom: expandedChar === c.id ? 12 : 0 }}>{c.motivation}</div>
                    {expandedChar === c.id && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.color}22` }}>
                        <div style={{ fontSize: 11, color: "#5050A0", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Abilities</div>
                        {c.powers.map((p, i) => (
                          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 0" }}>
                            <div style={{ width: 5, height: 5, background: c.color, borderRadius: "50%", flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: "#B0B0C8" }}>{p}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ ...s.card, marginTop: 20, borderColor: "#A855F733" }}>
                <div style={{ fontFamily: "'Bangers', cursive", fontSize: 18, color: "#A855F7", letterSpacing: 2, marginBottom: 10 }}>THE BODY SWAP — HOW IT HAPPENED</div>
                <div style={{ fontSize: 14, color: "#9090B0", lineHeight: 1.7 }}>
                  During the battle in Ch.5, three things aligned: <span style={{ color: "#60A5FA" }}>ArrowShock's arrow</span> struck Blitz's heart, leaving him briefly vulnerable. <span style={{ color: "#FF5C1A" }}>Hunthesk</span> grabbed him from behind while his fire spiral was still active. At that same moment, <span style={{ color: "#A855F7" }}>Wave Blade</span> accidentally mixed her frequency powers with both fighters — a downside of her ability. The result was an <span style={{ color: "#FF5C1A" }}>orange</span> and <span style={{ color: "#00E5A0" }}>green</span> electrical surge as their essences collided, swapping them into each other's bodies.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
