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
