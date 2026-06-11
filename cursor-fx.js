// ===== rastro do cursor: faíscas + "requests" caindo (site inteiro, leve) =====
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // sem ponteiro fino (mouse/trackpad) não faz sentido — pula em touch puro
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const ACCENT = '#34d399';
  const LABELS = ['GET', 'POST', '200', '/auth', 'PUT', '/transporte', '201', 'WS', '304', '/api', 'PATCH', 'DELETE'];
  const MAX = 90; // teto de partículas — segura a CPU

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

  function emitSpark(x, y) {
    if (particles.length > MAX) return;
    particles.push({
      type: 'spark', x, y,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.7,
      life: 0, max: 26 + Math.random() * 18,
      size: 1.4 + Math.random() * 2,
    });
  }

  function emitPacket(x, y) {
    if (particles.length > MAX) return;
    particles.push({
      type: 'packet', x, y,
      vx: (Math.random() - 0.5) * 1.3,
      vy: Math.random() * 0.5 + 0.15,
      life: 0, max: 95 + Math.random() * 45,
      rot: (Math.random() - 0.5) * 0.3,
      vr: (Math.random() - 0.5) * 0.04,
      label: LABELS[labelI++ % LABELS.length],
    });
  }

  function drawPacket(p, k) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = k;
    ctx.font = '600 11px "JetBrains Mono", ui-monospace, monospace';
    const tw = ctx.measureText(p.label).width;
    const bw = tw + 14, bh = 19, x = -bw / 2, y = -bh / 2;
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

  let running = false;
  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life++;
      const k = 1 - p.life / p.max;
      if (k <= 0 || p.y - 30 > h) { particles.splice(i, 1); continue; }
      if (p.type === 'spark') {
        p.vy += 0.04; p.x += p.vx; p.y += p.vy;
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = k * 0.85;
        ctx.fillStyle = ACCENT;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * k + 0.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        p.vy += 0.16; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.globalCompositeOperation = 'source-over';
        drawPacket(p, k);
      }
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    if (particles.length) {
      requestAnimationFrame(tick);
    } else {
      running = false;
    }
  }
  const ensure = () => { if (!running) { running = true; requestAnimationFrame(tick); } };

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
      if (accum > 55) { accum = 0; emitPacket(x, y); }
    }
    lastX = x; lastY = y; primed = true;
    ensure();
  }, { passive: true });

  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.body.appendChild(canvas);
})();
