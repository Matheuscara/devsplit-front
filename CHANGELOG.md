# Changelog — devsplit-front

Histórico das mudanças da landing page. Site **estático** (HTML/CSS/JS puro, sem build).

---

## Redesign completo (atual)

Reescrita total da landing num visual **dark / neon verde / futurista** (nível Awwwards),
autoral e intencional. Três arquivos: `index.html`, `styles.css`, `main.js`.

### Conceito visual
- A metáfora do *split* como eixo editorial: tráfego que diverge em **LOCAL** (sólido) e
  **PASSTHROUGH** (vazado), ecoando a logo.
- Verde com parcimônia: a névoa do shader vive só no hero; no resto, quase-preto, com verde
  reservado pro packet vivo, bordas ativas e o prompt `$`.
- Mono (JetBrains Mono) como voz técnica × display apertado (Space Grotesk) — sensação de devtool.

### Seções (`index.html`)
1. **Nav fixo** — vira translúcido com `blur` + borda ao rolar (>12px); underline verde animado.
   Em ≤920px vira **menu mobile** (hambúrguer + drawer).
2. **Hero** — pill mono com comando, título `clamp(2.6rem,7vw,5.2rem)` com palavra em verde,
   2 CTAs, fundo shader **GrainGradient** + véu escurecendo o topo + grid sutil, e **janela
   macOS** com screenshot de Rotas e glow difuso.
3. **Comparativo antes × depois** — card neutro × card devsplit com borda/glow verde e checklist ✓.
4. **Diagrama de fluxo (SVG)** — `Request → devsplit → LOCAL` em paralelo a
   `→ passthrough → api.stage.acme.dev`; fios tracejados animados + **packet verde** com
   `drop-shadow` percorrendo o caminho via `animateMotion`.
5. **Grid de recursos** — `repeat(4,1fr)` → 2 col (≤920px) → 1 col (≤680px); ícones stroke
   verde, lift + glow radial no hover.
6. **Showcase de telas** — card `big` (Tráfego) full-width + 2 col (Rotas, Certificado).
7. **Terminal** — efeito de digitação disparado por `IntersectionObserver`; `$`/`✓` verdes,
   `#` muted, caret piscando. CTA pro GitHub.
8. **Marquee** — faixa infinita com máscara de fade nas bordas.
9. **Footer** — brand + tagline, 3 colunas de links, linha mono no rodapé.

### Design system (`styles.css`)
- Tokens em CSS custom properties (`--bg`, `--surface`, `--accent`, `--glow`, fontes, `--max`, etc.).
- `--ease: cubic-bezier(.2,.7,.2,1)` em todas as transições; `::selection` verde com tinta escura.
- Breakpoints em **920px** e **680px** (+ ajuste de footer em 380px).

### Movimento e microinterações (`main.js`)
- **Reveal no scroll** via `IntersectionObserver` em `[data-reveal]` (opacity + `translateY(20px)`),
  com **stagger** nos irmãos diretos (delay incremental ~70ms, teto 420ms) em hero, comparativo,
  grid e shots.
- **Terminal** digita só ao entrar na viewport.
- **Smooth scroll** nas âncoras com offset de 72px pro nav fixo.
- **Shader GrainGradient** importado de `@paper-design/shaders-react` via `esm.sh` (React + ReactDOM
  no client), com **fallback CSS** embutido em `.hero__shader` — se o CDN falhar, o hero nunca fica vazio.

### FX de cursor e ambiente
- **Rastro do cursor** (canvas, site inteiro): linha verde afilada com glow. A **bolinha-cabeça
  é o cursor** — desenhada na posição **ao vivo** do mouse (zero offset), e o ponteiro nativo é
  escondido (`html.fx-cursor-hidden`). Ao passar sobre links/botões/cards, a bolinha **vira um anel**
  (affordance de clique). O loop de animação pausa quando o cursor sai da janela.
- **Packets de request** voando no hero: chips mono (`GET /auth → local`, `POST /pay → passthrough`…)
  atravessando o fundo como tráfego sendo dividido; máx. 5 simultâneos.

### Acessibilidade & qualidade
- **`prefers-reduced-motion`** respeitado: terminal renderiza instantâneo, reveals ficam visíveis,
  shader/rastro/packets desligam.
- FX de cursor só com **ponteiro fino** (`pointer: fine`) — touch usa cursor nativo normal.
- **Menu mobile** acessível: `aria-expanded`/`aria-hidden`/`aria-controls`, fecha no `Escape`,
  trava o scroll do body, fecha sozinho ao voltar pra desktop.
- **Anti-CLS**: `width/height` (1500×950) nos screenshots reservam o espaço; responsivos via `height:auto`.
- **Contraste AA**: `--muted-2` ajustado de `#6b7177` (~3.95:1) para `#7e858c` (~5.2:1).
- HTML semântico, `alt` descritivo nas imagens, `:focus-visible` verde.
- **Meta**: `theme-color`, `canonical`, Open Graph + `twitter:card`, `apple-touch-icon`.

### Deploy
- nginx estático em Docker (`Dockerfile` + `nginx.conf` + `docker-compose.yml`), pronto pro Dokploy.
- Sem build step: o nginx só serve os arquivos.
- Cache: `assets/` 30 dias; `index.html`/js/css sempre revalidados.

---

## Convenções

- **Sem framework, sem build.** Editou? É só servir / re-deployar.
- Toda decisão visual usa os tokens de `:root` — nada de valores mágicos espalhados.
- Mudanças de movimento devem sempre ter o caminho `prefers-reduced-motion`.
