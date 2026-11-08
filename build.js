// Builds index.html: bilingual sick-day request page with pre-filled iPhone texts.
// No phone number lives in this repo. The page reads it from the link's hash
// (e.g. /necesito/#5551234567) and builds the text links at runtime.
const fs = require("fs");

const items = [
  { emoji: "🍵", label: "Té, por favor", en: "Tea, please", msg: "🍵 Té, por favor", color: "pink" },
  { emoji: "🥤", label: "Agua o jugo", en: "Water or juice", msg: "🥤 Agua o jugo, por favor", color: "turq" },
  { emoji: "🛌", label: "Otra cobija", en: "Extra blanket", msg: "🛌 Otra cobija, por favor", color: "orange" },
  { emoji: "🍲", label: "Sopita o algo de comer", en: "Soup or a snack", msg: "🍲 Algo de comer, por favor", color: "lime" },
  { emoji: "🌙", label: "Luz baja y silencio", en: "Lights down, quiet", msg: "🌙 Luz baja y silencio, por favor", color: "purple" },
  { emoji: "🤍", label: "Ven a sentarte conmigo", en: "Come sit with me", msg: "🤍 Ven a sentarte conmigo", color: "yellow" },
];

// Texts are bilingual: "Spanish (English)". Body is pre-encoded; number is added at runtime.
const body = (msg, en) => encodeURIComponent(`${msg} (${en})`);

const buttons = items
  .map(
    (i) => `      <a class="btn ${i.color}" data-body="${body(i.msg, i.en)}">
        <span class="emoji" aria-hidden="true">${i.emoji}</span>
        <span class="label">${i.label}</span>
        <span class="en">${i.en}</span>
      </a>`
  )
  .join("\n");

const flagColors = ["pink", "turq", "orange", "lime", "purple", "yellow", "pink"];
const flags = flagColors.map((c) => `<span class="flag ${c}"></span>`).join("");

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Necesito">
<meta name="theme-color" content="#fff8ee">
<title>¿Qué necesitas, mi amor?</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Nunito:wght@700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --paper: #fff8ee;
    --ink: #2b1b2e;
    --pink: #e6007e;   --pink-soft: #ffd6ea;
    --turq: #00a3a3;   --turq-soft: #c9f2ef;
    --orange: #f47b20; --orange-soft: #ffe0c7;
    --lime: #6fb22c;   --lime-soft: #e1f5c8;
    --purple: #7a3fa0; --purple-soft: #ead9f5;
    --yellow: #e0a800; --yellow-soft: #fff0b8;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    background: var(--paper);
    color: var(--ink);
    font-family: "Nunito", system-ui, sans-serif;
  }

  /* Papel picado banner: scalloped flags on a string, holes fake-cut in paper color */
  .banner {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 10px 6px 0;
    overflow: hidden;
  }
  .banner::before {
    content: "";
    position: absolute;
    top: 10px; left: 0; right: 0;
    height: 3px;
    background: var(--ink);
    opacity: 0.35;
  }
  .flag {
    width: 13.5%;
    height: 74px;
    clip-path: polygon(0 0, 100% 0, 100% 82%, 87.5% 100%, 75% 82%, 62.5% 100%, 50% 82%, 37.5% 100%, 25% 82%, 12.5% 100%, 0 82%);
    background:
      radial-gradient(circle at 50% 42%, var(--paper) 0 6px, transparent 7px),
      radial-gradient(circle at 50% 14%, var(--paper) 0 3px, transparent 4px),
      radial-gradient(circle at 50% 70%, var(--paper) 0 3px, transparent 4px),
      radial-gradient(circle at 22% 42%, var(--paper) 0 3px, transparent 4px),
      radial-gradient(circle at 78% 42%, var(--paper) 0 3px, transparent 4px),
      radial-gradient(circle at 25% 15%, var(--paper) 0 2px, transparent 3px),
      radial-gradient(circle at 75% 15%, var(--paper) 0 2px, transparent 3px),
      radial-gradient(circle at 25% 70%, var(--paper) 0 2px, transparent 3px),
      radial-gradient(circle at 75% 70%, var(--paper) 0 2px, transparent 3px),
      var(--c);
  }
  .flag:nth-child(odd)  { transform: rotate(-3deg); }
  .flag:nth-child(even) { transform: rotate(3deg); }
  .flag.pink   { --c: var(--pink); }
  .flag.turq   { --c: var(--turq); }
  .flag.orange { --c: var(--orange); }
  .flag.lime   { --c: var(--lime); }
  .flag.purple { --c: var(--purple); }
  .flag.yellow { --c: var(--yellow); }

  main { max-width: 480px; margin: 0 auto; padding: 8px 18px 32px; }
  h1 {
    font-family: "Fraunces", Georgia, serif;
    font-size: 2.1rem;
    line-height: 1.15;
    margin: 14px 4px 6px;
    color: var(--pink);
  }
  .sub { margin: 0 4px 4px; font-size: 1.1rem; font-weight: 800; }
  .sub-en { margin: 0 4px 22px; font-size: 0.9rem; opacity: 0.75; }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-height: 150px;
    padding: 14px 8px;
    border-radius: 24px;
    border: 3px solid var(--c);
    background: var(--soft);
    box-shadow: 0 6px 0 var(--c);
    color: var(--ink);
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
  .btn:active { transform: translateY(5px); box-shadow: 0 1px 0 var(--c); }
  .btn.pink   { --c: var(--pink);   --soft: var(--pink-soft); }
  .btn.turq   { --c: var(--turq);   --soft: var(--turq-soft); }
  .btn.orange { --c: var(--orange); --soft: var(--orange-soft); }
  .btn.lime   { --c: var(--lime);   --soft: var(--lime-soft); }
  .btn.purple { --c: var(--purple); --soft: var(--purple-soft); }
  .btn.yellow { --c: var(--yellow); --soft: var(--yellow-soft); }
  .btn.wide   { --c: var(--ink);    --soft: #ffffff; grid-column: 1 / -1; min-height: 104px; }

  .emoji { font-size: 3.6rem; line-height: 1; }
  .btn.wide .emoji { font-size: 2.6rem; }
  .label { font-size: 1rem; font-weight: 800; text-align: center; }
  .en { font-size: 0.8rem; opacity: 0.75; text-align: center; }

  .backup { margin: 26px 4px 0; font-size: 0.95rem; text-align: center; font-weight: 800; color: var(--purple); }
  .missing { margin: 18px 4px 0; padding: 14px; border-radius: 16px; background: var(--pink-soft); border: 2px solid var(--pink); text-align: center; font-weight: 800; }
  .btn.off { opacity: 0.35; pointer-events: none; }
  .explainer { margin: 12px 8px 0; font-size: 0.85rem; text-align: center; opacity: 0.75; }
</style>
</head>
<body>
<div class="banner" aria-hidden="true">${flags}</div>
<main>
  <h1>¿Qué necesitas, mi amor?</h1>
  <p class="sub">Toca un botón y yo te lo traigo.</p>
  <p class="sub-en">What do you need, my love? Tap a button and I'll bring it.</p>
  <nav class="grid" aria-label="Requests">
${buttons}
      <a class="btn wide" data-body="">
        <span class="emoji" aria-hidden="true">💬</span>
        <span class="label">Otra cosa</span>
        <span class="en">Something else</span>
      </a>
  </nav>
  <p class="backup">Si no funciona, mándame un texto<span id="num"></span></p>
  <p class="explainer">How it works: tap a button and a text to Shara opens with the words already written. Just press send. If nothing happens, just text her.</p>
  <p class="missing" id="missing" hidden>Falta el número en el enlace. Pídele a Shara el enlace otra vez.<br><span class="en">This link is missing the phone number. Ask Shara to send the link again.</span></p>
</main>
<script>
  // Number comes only from the link hash: digits only, 10 to 15 long. Nothing else is accepted.
  (function () {
    var raw = (location.hash || "").replace("#", "");
    var ok = /^[0-9]{10,15}$/.test(raw);
    var buttons = document.querySelectorAll(".btn");
    if (!ok) {
      document.getElementById("missing").hidden = false;
      for (var i = 0; i < buttons.length; i++) buttons[i].classList.add("off");
      return;
    }
    var phone = raw.length === 10 ? "+1" + raw : "+" + raw;
    for (var j = 0; j < buttons.length; j++) {
      var b = buttons[j].getAttribute("data-body");
      // iOS format: sms:NUMBER&body=TEXT
      buttons[j].setAttribute("href", b ? "sms:" + phone + "&body=" + b : "sms:" + phone);
    }
    if (raw.length === 10) {
      document.getElementById("num").textContent = ": " + raw.slice(0, 3) + "." + raw.slice(3, 6) + "." + raw.slice(6);
    }
  })();
</script>
</body>
</html>
`;

fs.writeFileSync(require("path").join(__dirname, "index.html"), html);
console.log("ok", html.length);
