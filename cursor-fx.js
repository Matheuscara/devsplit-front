// ===== requests caindo pelo site inteiro + rastro no cursor (leve) =====
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ACCENT = '#34d399';
  const LABELS = ['GET', 'POST', '200', '/auth', 'PUT', '/transporte', '201', 'WS', '304', '/api', 'PATCH', 'DELETE', '/orders', '500', 'HEAD'];
  const MAX = 80; // teto de partículas — segura a CPU

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '9999',
  });
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const roundRect = (c, x, y, rw, rh, r) => {
    if (c.roundRect) { c.beginPath(); c.roundRect(x, y, rw, rh, r); return; }
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + rw, y, x + rw, y + rh, r);
    c.arcTo(x + rw, y + rh, x, y + rh, r);
    c.arcTo(x, y + rh, x, y, r);
    c.arcTo(x, y, x + rw, y, r);
    c.closePath();
  };

  const particles = [];
  let labelI = 0;
  const nextLabel = () => LABELS[labelI++ % LABELS.length];

  // request que cai do TOPO em qualquer lugar da tela (ambiente, site inteiro)
  function emitRain() {
    if (particles.length > MAX) return;
    particles.push({
      type: 'packet', ambient: true,
      x: Math.random() * w, y: -24,
      vx: (Math.random() - 0.5) * 0.4,
      vy: 0.7 + Math.random() * 1.6,
      rot: (Math.random() - 0.5) * 0.25,
      vr: (Math.random() - 0.5) * 0.02,
      alpha: 0.32 + Math.random() * 0.28,
      label: nextLabel(),
    });
  }

  // request que sai do CURSOR e cai
  function emitPacket(x, y) {
    if (particles.length > MAX) return;
    particles.push({
      type: 'packet', ambient: false,
      x, y,
      vx: (Math.random() - 0.5) * 1.4,
      vy: Math.random() * 0.5 + 0.1,
      rot: (Math.random() - 0.5) * 0.3,
      vr: (Math.random() - 0.5) * 0.05,
      life: 0, max: 110 + Math.random() * 50,
      label: nextLabel(),
    });
  }

  // faísca do rastro do cursor
  function emitSpark(x, y) {
    if (particles.length > MAX) return;
    particles.push({
      type: 'spark', x, y,
      vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 0.8,
      life: 0, max: 28 + Math.random() * 20,
      size: 1.8 + Math.random() * 2.4,
    });
  }

  function drawPacket(p, alpha) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = alpha;
    ctx.font = '600 12px "JetBrains Mono", ui-monospace, monospace';
    const tw = ctx.measureText(p.label).width;
    const bw = tw + 16, bh = 20, x = -bw / 2, y = -bh / 2;
    ctx.fillStyle = 'rgba(52,211,153,.12)';
    roundRect(ctx, x, y, bw, bh, 7); ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(52,211,153,.55)';
    roundRect(ctx, x, y, bw, bh, 7); ctx.stroke();
    ctx.fillStyle = '#7af3c0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.label, 0, 0.5);
    ctx.restore();
  }

  let frame = 0;
  function tick() {
    frame++;
    // chuva ambiente: cadência proporcional à largura da tela
    const every = w > 1100 ? 16 : 26;
    if (frame % every === 0) emitRain();

    ctx.clearRect(0, 0, w, h);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      if (p.type === 'spark') {
        p.life++;
        const k = 1 - p.life / p.max;
        if (k <= 0) { particles.splice(i, 1); continue; }
        p.vy += 0.04; p.x += p.vx; p.y += p.vy;
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = k * 0.9;
        ctx.fillStyle = ACCENT;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * k + 0.5, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }

      // packet (ambiente ou do cursor)
      p.vy += p.ambient ? 0.03 : 0.16;
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.globalCompositeOperation = 'source-over';

      if (p.ambient) {
        // some ao sair pela base; fade rápido nos últimos 60px
        if (p.y - 24 > h) { particles.splice(i, 1); continue; }
        const fade = Math.min(1, (h + 24 - p.y) / 80);
        drawPacket(p, p.alpha * fade);
      } else {
        p.life++;
        const k = 1 - p.life / p.max;
        if (k <= 0 || p.y - 30 > h) { particles.splice(i, 1); continue; }
        drawPacket(p, k);
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  // rastro do cursor (só ponteiro fino)
  if (window.matchMedia('(pointer: fine)').matches) {
    let lastX = 0, lastY = 0, accum = 0, primed = false;
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const x = e.clientX, y = e.clientY;
      if (primed) {
        const dx = x - lastX, dy = y - lastY;
        const dist = Math.hypot(dx, dy);
        const sparks = Math.min(3, Math.floor(dist / 6));
        for (let i = 0; i < sparks; i++) {
          const t = Math.random();
          emitSpark(lastX + dx * t, lastY + dy * t);
        }
        accum += dist;
        if (accum > 48) { accum = 0; emitPacket(x, y); }
      }
      lastX = x; lastY = y; primed = true;
    }, { passive: true });
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.body.appendChild(canvas);
  requestAnimationFrame(tick); // chuva roda no site inteiro, sempre
})();
