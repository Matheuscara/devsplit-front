// ════════════════════════════════════════════════════════════════════════
// devsplit · landing · main.js (vanilla, sem build)
// ════════════════════════════════════════════════════════════════════════

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ───────────────────────── nav: estado ao rolar ─────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ───────────────── ano no footer ─────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ───────────────── smooth scroll com offset do nav ─────────────────
const NAV_OFFSET = 72;
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id === '#' || id === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      return;
    }
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

// ───────────────── reveal no scroll + stagger ─────────────────
const revealEls = document.querySelectorAll('[data-reveal]');
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add('is-in'));
} else {
  // aplica delay incremental aos irmãos diretos de cada container revelado
  const groups = new Set();
  revealEls.forEach((el) => groups.add(el.parentElement));
  groups.forEach((parent) => {
    const sibs = [...parent.children].filter((c) => c.hasAttribute('data-reveal'));
    if (sibs.length > 1) {
      sibs.forEach((el, i) => el.style.setProperty('--reveal-delay', `${Math.min(i * 70, 420)}ms`));
    }
  });

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
}

// ───────────────── terminal: efeito de digitação ─────────────────
const TERM_LINES = [
  { type: 'cmd', text: 'cp examples/devsplit.yaml devsplit.yaml' },
  { type: 'cmd', text: 'cd app && npm install && npm run build' },
  { type: 'cmd', text: 'cd src-tauri && cargo run' },
  { type: 'comment', text: '# 1 prompt de senha (Linux): hosts + :443' },
  { type: 'ok', text: '✓ devsplit rodando — interceptando api.stage.acme.dev' },
];

const termOut = document.getElementById('termOut');
const caret = document.getElementById('caret');

function renderTermInstant() {
  if (!termOut) return;
  termOut.innerHTML = TERM_LINES.map((l) => {
    if (l.type === 'cmd') return `<span class="t-prompt">$ </span><span class="t-cmd">${escape(l.text)}</span>`;
    if (l.type === 'comment') return `<span class="t-comment">${escape(l.text)}</span>`;
    return `<span class="t-ok">${escape(l.text)}</span>`;
  }).join('\n');
  if (caret) caret.style.display = 'none';
}

function escape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function typeTerminal() {
  if (!termOut) return;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  for (let i = 0; i < TERM_LINES.length; i++) {
    const line = TERM_LINES[i];
    const prefix = line.type === 'cmd' ? '<span class="t-prompt">$ </span>' : '';
    const cls = line.type === 'cmd' ? 't-cmd' : line.type === 'comment' ? 't-comment' : 't-ok';

    // base = tudo que já foi digitado nas linhas anteriores
    const done = termOut.innerHTML;
    const chars = [...line.text];

    for (let c = 0; c <= chars.length; c++) {
      const partial = escape(chars.slice(0, c).join(''));
      termOut.innerHTML = done + prefix + `<span class="${cls}">${partial}</span>`;
      await sleep(line.type === 'ok' ? 14 : 26);
    }
    termOut.innerHTML = done + prefix + `<span class="${cls}">${escape(line.text)}</span>` +
      (i < TERM_LINES.length - 1 ? '\n' : '');
    await sleep(line.type === 'comment' ? 260 : 380);
  }
}

if (termOut) {
  if (reduceMotion) {
    renderTermInstant();
  } else {
    let started = false;
    const termIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            typeTerminal();
            termIO.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    termIO.observe(document.getElementById('term'));
  }
}

// ───────────────── shader GrainGradient (hero) ─────────────────
// onda de grão verde, via @paper-design/shaders-react (esm.sh) — mesma técnica do kodeck.dev.
// fallback: gradiente CSS já definido em .hero__shader. Desligado em reduced-motion.
async function mountShader() {
  if (reduceMotion) return;
  const mount = document.getElementById('shader');
  if (!mount) return;

  try {
    const [{ default: React }, { createRoot }, { GrainGradient }] = await Promise.all([
      import('https://esm.sh/react@18.3.1'),
      import('https://esm.sh/react-dom@18.3.1/client'),
      import('https://esm.sh/@paper-design/shaders-react@0.0.46'),
    ]);

    const root = createRoot(mount);
    root.render(
      React.createElement(GrainGradient, {
        style: { width: '100%', height: '100%' },
        colors: ['#34d399', '#22c08a', '#0f3d2c'],
        colorBack: '#0b0c0e',
        softness: 0.78,
        intensity: 0.32,
        noise: 0.42,
        shape: 'wave',
        speed: 0.6,
        scale: 1.05,
      })
    );
    // remove o gradiente-fallback de baixo do canvas, evitando dupla camada
    mount.style.background = 'transparent';
  } catch (err) {
    // mantém o fallback CSS — hero nunca fica vazio
    console.warn('[devsplit] shader indisponível, usando fallback CSS:', err);
  }
}
mountShader();

// ════════════════════════════════════════════════════════════════════════
// FX de movimento: rastro do cursor + packets voando + parallax da janela
// (tudo desligado em reduced-motion e em telas sem ponteiro fino / touch)
// ════════════════════════════════════════════════════════════════════════
const finePointer = window.matchMedia('(pointer: fine)').matches;
const fxEnabled = !reduceMotion && finePointer;

// ───────────────── rastro do cursor (canvas, site inteiro) ─────────────────
// a bolinha-cabeça É o cursor: fica na posição AO VIVO do mouse, sem offset.
function initCursorTrail() {
  const canvas = document.createElement('canvas');
  canvas.className = 'fx-trail';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  document.documentElement.classList.add('fx-cursor-hidden'); // esconde o ponteiro nativo
  const ctx = canvas.getContext('2d');

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    // tamanho de buffer (nítido) e tamanho CSS (1:1 com o viewport) explícitos
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const points = [];          // {x, y, life}
  const MAX = 18;
  let mouse = null;           // posição ao vivo do cursor (ou null se saiu da janela)
  let rafId = null;

  function ensureLoop() { if (!rafId) loop(); }

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    mouse = { x: e.clientX, y: e.clientY };
    ensureLoop();
  }, { passive: true });

  // ao sair da janela, some o cursor e deixa o rastro terminar de apagar
  function leave() { mouse = null; }
  document.addEventListener('mouseleave', leave);
  window.addEventListener('blur', leave);

  function loop() {
    rafId = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // amostra a posição ao vivo no rastro
    if (mouse) {
      points.push({ x: mouse.x, y: mouse.y, life: 1 });
      if (points.length > MAX) points.shift();
    }
    for (const p of points) p.life -= 0.06;
    while (points.length && points[0].life <= 0) points.shift();

    // linha do rastro (afilando até a cabeça)
    if (points.length > 1) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(52,211,153,.9)';
      ctx.shadowBlur = 12;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1], b = points[i];
        const t = i / points.length;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(52,211,153,${(b.life * 0.6).toFixed(3)})`;
        ctx.lineWidth = 1 + t * 4.5;
        ctx.stroke();
      }
    }

    // a bolinha-cursor: SEMPRE na posição ao vivo do mouse (zero offset/atraso)
    if (mouse) {
      ctx.shadowColor = 'rgba(52,211,153,.9)';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(52,211,153,.28)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(198,255,230,.98)';
      ctx.fill();
    }

    // encerra o loop só quando o cursor saiu e o rastro sumiu
    if (!mouse && points.length === 0) {
      cancelAnimationFrame(rafId);
      rafId = null;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
  }
}

// ───────────────── packets de request voando no hero ─────────────────
function initPackets() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const layer = document.createElement('div');
  layer.className = 'fx-packets';
  layer.setAttribute('aria-hidden', 'true');
  hero.appendChild(layer);

  const POOL = [
    ['GET', '/transporte', 'local'],
    ['POST', '/auth/login', 'local'],
    ['GET', '/session', 'local'],
    ['GET', '/health', 'pass'],
    ['GET', '/financeiro', 'pass'],
    ['POST', '/pay/charge', 'pass'],
    ['GET', '/outra/coisa', 'pass'],
    ['POST', '/transporte/run', 'local'],
  ];

  let idx = 0;
  let alive = 0;
  const MAX_ALIVE = 5;

  function spawn() {
    if (alive >= MAX_ALIVE || document.hidden) return;
    const [method, path, dec] = POOL[idx % POOL.length];
    idx++;

    const el = document.createElement('div');
    el.className = 'fx-packet';
    const y = 12 + Math.floor((idx * 37) % 70);          // 12%–82% da altura, determinístico
    const dur = 14 + (idx % 5) * 2;                        // 14s–22s
    const drift = -40 + (idx % 4) * 22;                   // leve subida/descida
    el.style.setProperty('--y', `${y}vh`);
    el.style.setProperty('--dur', `${dur}s`);
    el.style.setProperty('--drift', `${drift}px`);
    el.innerHTML =
      `<b class="${method === 'GET' ? 'm-get' : 'm-post'}">${method}</b>` +
      `<span>${path}</span>` +
      `<span class="arr">→</span>` +
      `<span class="dec dec--${dec === 'local' ? 'local' : 'pass'}">${dec === 'local' ? 'local' : 'passthrough'}</span>`;

    layer.appendChild(el);
    alive++;
    el.addEventListener('animationiteration', () => { el.remove(); alive--; }, { once: true });
    // fallback de limpeza
    setTimeout(() => { if (el.isConnected) { el.remove(); alive--; } }, dur * 1000 + 500);
  }

  spawn();
  setInterval(spawn, 2600);
}

// ───────────────── parallax da janela do hero ─────────────────
function initParallax() {
  const img = document.querySelector('.window--hero .window__body img');
  const hero = document.getElementById('hero');
  if (!img || !hero) return;

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
    const cy = (e.clientY - r.top) / r.height - 0.5;
    img.style.setProperty('--px', `${(-cx * 16).toFixed(1)}px`);
    img.style.setProperty('--py', `${(-cy * 12).toFixed(1)}px`);
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    img.style.setProperty('--px', '0px');
    img.style.setProperty('--py', '0px');
  });
}

if (fxEnabled) {
  initCursorTrail();
  initParallax();
}
// packets fazem sentido mesmo sem ponteiro fino; só dependem de movimento permitido
if (!reduceMotion) initPackets();
