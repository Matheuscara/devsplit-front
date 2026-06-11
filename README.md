# devsplit-front

Landing page do **[devsplit](https://github.com/Matheuscara/devsplit)** — o proxy de dev que
**divide o tráfego do seu gateway de stage**: rode local só o serviço que você está mexendo;
o resto faz passthrough pro ambiente real. Sem Docker, sem mudar o front.

Página **estática** (HTML/CSS/JS), sem build.

## Stack

- HTML + CSS + JS puro.
- Fundo do hero: shader **`GrainGradient`** (`@paper-design/shaders-react`) via CDN `esm.sh`
  — onda de grão verde (mesma técnica do kodeck.dev).
- Fontes: Space Grotesk · Inter · JetBrains Mono.

## Rodar local

```bash
python3 -m http.server 8080            # → http://localhost:8080
# ou via Docker:
docker build -t devsplit-front . && docker run --rm -p 8080:80 devsplit-front
```

## Deploy

nginx estático em Docker, pronto pro **Dokploy**. Passo a passo em [`DEPLOY.md`](./DEPLOY.md).

## Estrutura

```
index.html · styles.css · main.js     # o site (sem build)
assets/                               # logo, banner, capturas de tela
Dockerfile · nginx.conf · docker-compose.yml   # deploy nginx
DEPLOY.md                             # passo a passo de deploy
CHANGELOG.md                          # tudo que foi construído (seções, FX, a11y, etc.)
```

### `main.js` — módulos

- **nav** — estado `scrolled` ao rolar; **menu mobile** (hambúrguer + drawer, Escape, scroll lock).
- **smooth scroll** — âncoras com offset de 72px pro nav fixo.
- **reveal** — `IntersectionObserver` em `[data-reveal]` com stagger por irmão.
- **terminal** — efeito de digitação disparado na viewport (instantâneo em reduced-motion).
- **shader** — `GrainGradient` via `esm.sh`, com fallback CSS.
- **FX de cursor** — rastro em canvas + bolinha que é o ponteiro (vira anel sobre clicáveis).
- **packets** — chips de request animados no hero.

> Toda animação tem caminho `prefers-reduced-motion`; o FX de cursor só roda em ponteiro fino.

## Documentação

Histórico completo do que foi construído (conceito, seções, design system, microinterações,
acessibilidade) em [`CHANGELOG.md`](./CHANGELOG.md).
