// ===== fundo animado: campo de poeira + dunas que brilham nos cantos (estilo kodeck, em verde) =====
(() => {
  const canvas = document.getElementById('fx');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, DPR = 1;
  let sky = [], dune = [];
  let raf = 0, t0 = performance.now();

  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // altura da duna (acima da base) em x — duas gaussianas nos cantos
  function bump(x, cx, w, h) { const d = (x - cx) / w; return h * Math.exp(-d * d); }
  function duneTop(x) {
    return Math.max(
      bump(x, W * 0.02, W * 0.30, H * 0.62),
      bump(x, W * 0.98, W * 0.30, H * 0.62)
    );
  }

  function build() {
    const A = window.innerWidth * window.innerHeight; // área em px CSS
    const skyN = Math.round(clamp(A / 1300, 320, 1700));
    const duneN = Math.round(clamp(A / 460, 700, 4200));

    sky = new Array(skyN).fill(0).map(() => {
      const y = rand(0, H);
      return {
        x: rand(0, W), y,
        r: rand(0.45, 1.35) * DPR,
        base: rand(0.04, 0.30),
        tw: rand(0.4, 1.7), ph: rand(0, 6.28),
        vy: rand(0.02, 0.10) * DPR,
        green: y > H * 0.6 && Math.random() < 0.35,
      };
    });

    dune = [];
    let guard = 0;
    while (dune.length < duneN && guard < duneN * 9) {
      guard++;
      const x = rand(0, W);
      const top = duneTop(x);
      if (top < H * 0.05) continue; // pula o miolo plano (sem duna)
      const tt = Math.pow(Math.random(), 0.7); // viés p/ baixo (mais denso embaixo)
      const y = (H - top) + tt * top;
      const heightFrac = clamp((H - y) / top, 0, 1); // 0 embaixo, 1 no topo
      dune.push({
        x, y,
        r: rand(0.5, 1.5) * DPR,
        base: rand(0.24, 0.92) * (1 - heightFrac * 0.72), // some perto do topo (vira poeira)
        tw: rand(0.5, 1.9), ph: rand(0, 6.28),
      });
    }
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.floor(window.innerWidth * DPR);
    H = canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    build();
  }

  function halo(cx, cy, r, a) {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, `rgba(52,211,153,${a})`);
    g.addColorStop(0.5, `rgba(52,211,153,${a * 0.45})`);
    g.addColorStop(1, 'rgba(52,211,153,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function frame(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);

    // halos quentes (verde) nos cantos de baixo — brilho aditivo
    ctx.globalCompositeOperation = 'lighter';
    const pulse = reduce ? 1 : 0.85 + 0.15 * Math.sin(t * 0.5);
    halo(W * 0.05, H * 1.05, H * 0.98, 0.17 * pulse);
    halo(W * 0.95, H * 1.05, H * 0.98, 0.17 * pulse);
    halo(W * 0.04, H * 1.03, H * 0.52, 0.13 * pulse); // núcleo mais quente
    halo(W * 0.96, H * 1.03, H * 0.52, 0.13 * pulse);

    // dunas (verde, denso)
    for (const p of dune) {
      const tw = reduce ? 0.8 : 0.5 + 0.5 * Math.sin(t * p.tw + p.ph);
      ctx.globalAlpha = p.base * tw;
      ctx.fillStyle = 'rgba(52,211,153,1)';
      ctx.fillRect(p.x, p.y, p.r, p.r);
    }

    // poeira/estrelas
    for (const p of sky) {
      if (!reduce) {
        p.y -= p.vy;
        if (p.y < -2) { p.y = H + 2; p.x = rand(0, W); }
      }
      const tw = reduce ? 0.7 : 0.4 + 0.6 * Math.sin(t * p.tw + p.ph);
      ctx.globalAlpha = p.base * tw;
      ctx.fillStyle = p.green ? 'rgba(52,211,153,1)' : 'rgba(206,211,217,1)';
      ctx.fillRect(p.x, p.y, p.r, p.r);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    if (!reduce) raf = requestAnimationFrame(frame);
  }

  // resize com debounce
  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(resize, 160);
  });

  // pausa quando a aba não está visível
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else if (!reduce && !raf) { t0 = performance.now(); raf = requestAnimationFrame(frame); }
  });

  resize();
  if (reduce) frame(performance.now());
  else raf = requestAnimationFrame(frame);
})();
