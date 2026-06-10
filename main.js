// ===== nav: estado ao rolar =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== stagger: atrasa irmãos que revelam juntos =====
['.hero-inner', '.grid', '.shots', '.compare'].forEach((sel) => {
  document.querySelectorAll(sel).forEach((group) => {
    [...group.querySelectorAll(':scope > [data-reveal]')].forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 70, 420)}ms`;
    });
  });
});

// ===== reveal no scroll =====
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

// ===== terminal: digitação =====
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lines = [
  [{ t: '$ ', c: 'c-prompt' }, { t: 'cp examples/devsplit.yaml devsplit.yaml', c: '' }],
  [{ t: '$ ', c: 'c-prompt' }, { t: 'cd app && npm install && npm run build', c: '' }],
  [{ t: '$ ', c: 'c-prompt' }, { t: 'cd src-tauri && cargo run', c: '' }],
  [{ t: '# 1 prompt de senha (Linux): hosts + :443', c: 'c-cmt' }],
  [{ t: '✓ ', c: 'c-ok' }, { t: 'devsplit rodando — interceptando api.stage.acme.com', c: 'c-ok' }],
];

function renderInstant(target) {
  target.innerHTML = lines
    .map((segs) => segs.map((s) => `<span class="${s.c}">${escapeHtml(s.t)}</span>`).join(''))
    .join('\n');
}
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function typeTerminal(target) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  target.innerHTML = '';
  for (let li = 0; li < lines.length; li++) {
    for (const seg of lines[li]) {
      const span = document.createElement('span');
      if (seg.c) span.className = seg.c;
      target.appendChild(span);
      for (const ch of seg.t) {
        span.textContent += ch;
        await sleep(seg.c === 'c-prompt' ? 40 : 16 + Math.random() * 26);
      }
    }
    if (li < lines.length - 1) target.appendChild(document.createTextNode('\n'));
    await sleep(li >= lines.length - 2 ? 460 : 240);
  }
}

const term = document.querySelector('[data-term]');
const termCode = document.getElementById('term-code');
if (term && termCode) {
  if (reduce) {
    renderInstant(termCode);
  } else {
    const tio = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            obs.disconnect();
            typeTerminal(termCode);
          }
        }
      },
      { threshold: 0.4 }
    );
    tio.observe(term);
  }
}

// ===== smooth-scroll com offset do nav =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (ev) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    ev.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  });
});
