const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', '..', 'weeks');

const A = {
  purple:{ txt:'#7C3AED', soft:'var(--purple-soft)', softHover:'#7C3AED', tint:'rgba(124,58,237,.13)', light:'#F9F7FF', sn:'#7C3AED', snShadow:'0 10px 20px -10px rgba(124,58,237,.6)', snText:'#fff', dot:'#7C3AED', focus:'#7C3AED' },
  green:{ txt:'#0B7A54', soft:'var(--green-soft)', softHover:'#0b7a54', tint:'rgba(16,185,129,.13)', light:'#F4FBF8', sn:'#10B981', snShadow:'0 10px 20px -10px rgba(16,185,129,.5)', snText:'#fff', dot:'#10B981', focus:'#10B981' },
  amber:{ txt:'#B9770B', soft:'var(--amber-soft)', softHover:'#9A6200', tint:'rgba(245,158,11,.16)', light:'#FEFBF4', sn:'#F59E0B', snShadow:'0 10px 20px -10px rgba(245,158,11,.45)', snText:'#5a3d00', dot:'#F59E0B', focus:'#B9770B' },
};

function css(a){return `
  :root{
    --bg:#FFFFFF; --bg-soft:#F6F8FE; --card:#FFFFFF;
    --ink:#101A3D; --body:#5A6480; --muted:#8A93A8; --line:#E9ECF7;
    --blue:#2F54F6; --blue-ink:#2140D6; --blue-soft:#EBEFFF;
    --purple:#7C3AED; --purple-soft:#F2ECFE;
    --green:#10B981; --green-soft:#E4F6EF;
    --amber:#F59E0B; --amber-soft:#FDF1DA;
    --cyan:#0EA5E9; --cyan-soft:#E4F5FE;
    --shadow:0 12px 34px -14px rgba(31,45,90,.18);
    --shadow-lift:0 26px 50px -20px rgba(31,45,90,.28);
    --radius:18px; --wrap:1160px; --read:800px;
    --display:"Sora",system-ui,sans-serif; --font:"Inter",system-ui,sans-serif; --mono:"JetBrains Mono",ui-monospace,monospace;
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
  body{margin:0;background:var(--bg);color:var(--body);font-family:var(--font);font-size:16.5px;line-height:1.68;-webkit-font-smoothing:antialiased}
  a{color:var(--blue);text-decoration:none}
  a:hover{text-decoration:underline}
  h1,h2,h3,h4{font-family:var(--display);color:var(--ink);line-height:1.16;margin:0;font-weight:700}
  p{margin:0 0 1rem}
  .wrap{max-width:var(--wrap);margin:0 auto;padding:0 24px}
  .eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:${a.txt};font-weight:600;margin:0 0 .8rem;display:flex;align-items:center;gap:10px}
  .eyebrow::after{content:"";height:2px;width:34px;background:${a.txt};border-radius:2px;opacity:.5}
  code{font-family:var(--mono);font-size:.86em;background:var(--blue-soft);color:var(--blue-ink);padding:2px 7px;border-radius:6px}
  .nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.86);backdrop-filter:saturate(140%) blur(10px);border-bottom:1px solid var(--line)}
  .nav-inner{display:flex;align-items:center;gap:18px;height:68px;max-width:var(--wrap);margin:0 auto;padding:0 24px}
  .brand{display:flex;align-items:center;gap:11px;text-decoration:none;margin-right:auto;min-width:0}
  .brand:hover{text-decoration:none}
  .brand .logo{width:36px;height:36px;flex:none}
  .brand .bt{display:flex;flex-direction:column;line-height:1.05;min-width:0}
  .brand .bt b{font-family:var(--display);font-weight:700;color:var(--ink);font-size:.98rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .brand .bt span{font-size:.72rem;color:var(--muted);font-weight:500}
  .nav-back{display:inline-flex;align-items:center;gap:7px;font-weight:600;font-size:.9rem;color:var(--body);background:${a.soft};padding:9px 14px;border-radius:10px;white-space:nowrap}
  .nav-back:hover{color:${a.softHover};text-decoration:none}
  @media (max-width:640px){.brand .bt span{display:none}}
  .head-bg{background:radial-gradient(55% 60% at 88% 0%, ${a.tint}, transparent 60%),radial-gradient(50% 55% at 6% 6%, rgba(47,84,246,.10), transparent 55%),linear-gradient(180deg,${a.light},#FFFFFF 75%);border-bottom:1px solid var(--line)}
  .lesson-head{padding:44px 0 34px}
  .crumb{font-family:var(--mono);font-size:.74rem;color:var(--muted);margin-bottom:16px}
  .crumb a{color:var(--body);font-weight:600}
  h1.big{font-size:clamp(2.1rem,4.4vw,3.1rem);font-weight:800;letter-spacing:-.02em;color:var(--ink);max-width:20ch}
  .lead{font-size:1.14rem;color:var(--body);max-width:60ch;margin:18px 0 22px}
  .chips{display:flex;flex-wrap:wrap;gap:10px}
  .chip{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:8px 14px;box-shadow:var(--shadow);font-size:.85rem;font-weight:600;color:var(--ink)}
  .chip .dot{width:9px;height:9px;border-radius:3px;background:${a.dot}}
  .chip.g .dot{background:var(--green)}
  .layout{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:44px;align-items:start;padding:44px 0 20px}
  @media (max-width:960px){.layout{grid-template-columns:1fr;gap:8px}}
  .content{max-width:var(--read);min-width:0}
  .content h2{font-size:clamp(1.5rem,3vw,1.9rem);margin:8px 0 6px;scroll-margin-top:88px}
  .content h3{font-size:1.2rem;margin:26px 0 6px}
  .content p{color:var(--body)}
  .content ul,.content ol{color:var(--body);padding-left:1.3em;margin:0 0 1rem}
  .content li{margin:.35rem 0}
  .content strong,.content b{color:var(--ink)}
  .step{position:relative;padding:30px 0 34px;border-top:1px solid var(--line)}
  .step:first-of-type{border-top:0}
  .step .kicker{display:flex;align-items:center;gap:12px;margin-bottom:10px}
  .step .sn{width:40px;height:40px;border-radius:11px;background:${a.sn};color:${a.snText};display:grid;place-items:center;font-family:var(--mono);font-weight:600;font-size:1rem;flex:none;box-shadow:${a.snShadow}}
  .step.s2 .sn{background:var(--blue);color:#fff;box-shadow:0 10px 20px -10px rgba(47,84,246,.6)}
  .step.s3 .sn{background:var(--green);color:#fff;box-shadow:0 10px 20px -10px rgba(16,185,129,.5)}
  .step.s4 .sn{background:var(--amber);color:#5a3d00}
  .step.s5 .sn{background:var(--cyan);color:#fff}
  .step.s6 .sn{background:var(--blue-ink);color:#fff}
  .step .kicker h2{margin:0}
  .est{font-family:var(--mono);font-size:.7rem;font-weight:600;color:var(--muted);letter-spacing:.04em}
  .code{background:#0F1B3D;color:#D9E1FF;border-radius:14px;padding:16px 18px;overflow-x:auto;font-family:var(--mono);font-size:.86rem;line-height:1.7;margin:0 0 1rem;box-shadow:var(--shadow)}
  .code .c{color:#7C89BC}
  .code b{color:#9FB4FF;font-weight:600}
  .note{display:flex;gap:14px;align-items:flex-start;background:var(--blue-soft);border-radius:14px;padding:16px 18px;border:1px solid #DCE3FF;margin:0 0 1.1rem}
  .note.tip{background:var(--green-soft);border-color:#C7EBDC}
  .note.warn{background:var(--amber-soft);border-color:#F6E3BE}
  .note.rule{background:linear-gradient(120deg,#131f45,#0F1B3D);border:0;color:#fff}
  .note .i{font-size:1.25rem;line-height:1.2;flex:none}
  .note p{margin:0;font-size:.97rem;color:#3A4468}
  .note b{color:var(--blue-ink)}
  .note.tip b{color:#0b7a54} .note.warn b{color:#9A6200}
  .note.rule p{color:#DDE5FF} .note.rule b{color:#fff}
  .note.rule .k{font-family:var(--mono);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:#8FA6FF;font-weight:600;display:block;margin-bottom:5px}
  .decision{background:#fff;border:1px solid var(--line);border-left:5px solid var(--purple);border-radius:14px;padding:18px 20px;box-shadow:var(--shadow);margin:0 0 1.1rem}
  .decision .dh{display:flex;align-items:center;gap:9px;font-family:var(--display);font-weight:700;color:var(--ink);font-size:1.02rem;margin-bottom:6px}
  .decision .dh .tag{font-family:var(--mono);font-size:.62rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--purple);background:var(--purple-soft);padding:3px 8px;border-radius:6px}
  .decision p{margin:0 0 .5rem;font-size:.96rem}
  .decision p:last-child{margin:0}
  .check{list-style:none;padding:0;margin:0 0 1rem;display:grid;gap:10px}
  .check li{display:flex;gap:11px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 15px;box-shadow:var(--shadow);font-size:.96rem;color:var(--ink)}
  .check .tick{color:var(--green);font-weight:800;flex:none}
  .objectives{background:var(--bg-soft);border:1px solid var(--line);border-radius:var(--radius);padding:24px 26px;margin:0 0 6px}
  .objectives h2{margin:0 0 12px;font-size:1.25rem}
  .objectives ul{margin:0;padding-left:1.2em}
  .objectives li{margin:.4rem 0}
  .toc{position:sticky;top:88px;font-size:.9rem}
  @media (max-width:960px){.toc{display:none}}
  .toc .tt{font-family:var(--mono);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:12px}
  .toc a{display:block;color:var(--body);padding:6px 0 6px 14px;border-left:2px solid var(--line);font-weight:500}
  .toc a:hover{color:${a.txt};border-color:${a.txt};text-decoration:none}
  .done{background:linear-gradient(180deg,#fff,#FBFCFF);border:1px solid var(--line);border-radius:var(--radius);padding:24px 26px;box-shadow:var(--shadow);margin:8px 0 0}
  .done h2{margin:0 0 6px}
  .demo{list-style:none;counter-reset:d;padding:0;margin:10px 0 0}
  .demo li{counter-increment:d;display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--line);font-size:.96rem;color:var(--ink)}
  .demo li:last-child{border-bottom:0}
  .demo li::before{content:counter(d);font-family:var(--mono);font-weight:600;color:var(--purple);flex:none;width:20px}
  details{background:#fff;border:1px solid var(--line);border-radius:12px;padding:2px 18px;margin:0 0 10px;box-shadow:var(--shadow)}
  details summary{cursor:pointer;font-weight:600;color:var(--ink);padding:14px 0;list-style:none;display:flex;align-items:center;gap:10px}
  details summary::-webkit-details-marker{display:none}
  details summary::before{content:"+";font-family:var(--mono);color:${a.txt};font-size:1.1rem;flex:none}
  details[open] summary::before{content:"–"}
  details .fa{padding:0 0 14px;font-size:.95rem;color:var(--body)}
  details .fa p:last-child{margin:0}
  .pager{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:40px 0 10px}
  @media (max-width:600px){.pager{grid-template-columns:1fr}}
  .pg{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:18px 20px;box-shadow:var(--shadow);display:block}
  .pg:hover{border-color:${a.txt};text-decoration:none;transform:translateY(-3px);transition:.16s}
  .pg .l{font-family:var(--mono);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:600}
  .pg h4{margin:5px 0 0;font-size:1.05rem}
  .pg.next{text-align:right}
  .pg.soon{opacity:.75;cursor:default}
  .pg.soon:hover{border-color:var(--line);transform:none}
  footer{padding:44px 0;border-top:1px solid var(--line);margin-top:20px;background:var(--bg-soft)}
  .foot{display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:center}
  .foot p{margin:0;color:var(--body);font-size:.9rem}
  :focus-visible{outline:3px solid ${a.focus};outline-offset:2px;border-radius:6px}
`;}

const LOGO = `<svg class="logo" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <defs><linearGradient id="lg" x1="0" y1="0" x2="48" y2="48"><stop offset="0" stop-color="#2F54F6"/><stop offset="1" stop-color="#7C3AED"/></linearGradient></defs>
        <path d="M16 24c0-5 3.6-9 8-9s8 4 8 9-3.6 9-8 9c-3 0-5-1.8-6.4-4" stroke="url(#lg)" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M32 24c0-5-3.6-9-8-9-3 0-5 1.8-6.4 4" stroke="#2F54F6" stroke-width="5" stroke-linecap="round" fill="none" opacity=".5"/>
        <circle cx="24" cy="24" r="22" stroke="url(#lg)" stroke-width="2.4" opacity=".18"/>
      </svg>`;
const LOGO_MINI = `<svg class="logo" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M16 24c0-5 3.6-9 8-9s8 4 8 9-3.6 9-8 9c-3 0-5-1.8-6.4-4" stroke="url(#lg)" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`;

function render(w){
  const a = A[w.accent];
  const steps = w.steps.map((s,i)=>`
    <section class="step s${(i%6)+1}" id="${s.id}">
      <div class="kicker"><span class="sn">${i+1}</span><h2>${s.title}</h2></div>
      <span class="est">${s.est}</span>
      ${s.body}
    </section>`).join('\n');
  const toc = w.steps.map((s,i)=>`    <a href="#${s.id}">${i+1} · ${s.toc}</a>`).join('\n')
    + `\n    <a href="#done">Definition of done</a>\n    <a href="#demo">Friday demo</a>\n    <a href="#help">Common snags</a>`;
  const objectives = w.objectives.map(o=>`        <li>${o}</li>`).join('\n');
  const done = w.done.map(d=>`        <li><span class="tick">✓</span> ${d}</li>`).join('\n');
  const demo = w.demo.map(d=>`      <li>${d}</li>`).join('\n');
  const faqs = w.faqs.map(f=>`    <details>\n      <summary>${f.q}</summary>\n      <div class="fa"><p>${f.a}</p></div>\n    </details>`).join('\n');
  const nextCard = w.next.soon
    ? `      <div class="pg next soon">\n        <div class="l">Next →</div>\n        <h4>${w.next.label} <span style="color:var(--muted);font-weight:600">(soon)</span></h4>\n      </div>`
    : `      <a class="pg next" href="${w.next.href}">\n        <div class="l">Next →</div>\n        <h4>${w.next.label}</h4>\n      </a>`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Week ${w.num} — ${w.title} · Software Development &amp; Cloud Engineering Bootcamp</title>
<meta name="description" content="${w.desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<style>${css(a)}</style>
</head>
<body>

<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="../index.html" aria-label="Home">
      ${LOGO}
      <span class="bt"><b>Software Development &amp; Cloud Engineering Bootcamp</b><span>Spec it · Build it · Ship it</span></span>
    </a>
    <a class="nav-back" href="../index.html#roadmap">← Roadmap</a>
  </div>
</nav>

<div class="head-bg">
  <header class="wrap lesson-head">
    <div class="crumb"><a href="../index.html">Home</a> / <a href="../index.html#roadmap">Roadmap</a> / Week ${w.num}</div>
    <p class="eyebrow">Week ${w.num} · ${w.phase}</p>
    <h1 class="big">${w.title}</h1>
    <p class="lead">${w.lead}</p>
    <div class="chips">
      <span class="chip"><span class="dot"></span>${w.time}</span>
      <span class="chip"><span class="dot"></span>Phase: ${w.phase}</span>
      <span class="chip g"><span class="dot"></span>Ship: ${w.ship}</span>
    </div>
  </header>
</div>

<div class="wrap layout">
  <main class="content">

    <div class="objectives">
      <h2>🎯 By the end of this week</h2>
      <ul>
${objectives}
      </ul>
    </div>

    <div class="note ${w.intro.cls}" style="margin-top:22px">
      <span class="i">${w.intro.icon}</span>
      <p>${w.intro.html}</p>
    </div>

${steps}

    <div class="done" id="done">
      <h2>✅ Definition of done</h2>
      <ul class="check">
${done}
      </ul>
    </div>

    <h2 id="demo" style="margin-top:34px">🎤 Friday demo — 5 minutes</h2>
    <ol class="demo">
${demo}
    </ol>

    <h2 id="help" style="margin-top:34px">Stuck? Common snags</h2>
${faqs}

    <div class="pager">
      <a class="pg" href="${w.prev.href}">
        <div class="l">← Previous</div>
        <h4>${w.prev.label}</h4>
      </a>
${nextCard}
    </div>
  </main>

  <aside class="toc" aria-label="On this page">
    <div class="tt">On this page</div>
${toc}
  </aside>
</div>

<footer>
  <div class="wrap foot">
    <a class="brand" href="../index.html" style="margin-right:0">
      ${LOGO_MINI}
      <span class="bt"><b>Software Development &amp; Cloud Engineering Bootcamp</b><span>Spec it · Build it · Ship it</span></span>
    </a>
    <p>Week ${w.num} of 12 · Spec it · build it with AI · ship it to the cloud.</p>
  </div>
</footer>

</body>
</html>
`;
}

const weeks = require('./content.js');
for (const w of weeks){
  const file = `${OUT}/week-${w.num}.html`;
  fs.writeFileSync(file, render(w));
  console.log('wrote', file);
}
