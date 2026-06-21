<div align="center">

<img src="./assets/banner.png" alt="devsplit" width="100%" />

<br />

# devsplit · landing page

**Site de apresentação do [devsplit](https://github.com/Matheuscara/devsplit)** — o proxy de
desenvolvimento que **divide o tráfego do seu gateway de stage**: você roda local só o serviço
que está mexendo, o resto faz `passthrough` pro ambiente real. _Sem Docker, sem subir a stack
inteira, sem mexer no front._

Página **estática** (HTML · CSS · JS puro, **sem build**), com hero em shader, diagrama de fluxo
animado e deploy nginx pronto pro Dokploy.

<br />

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![nginx](https://img.shields.io/badge/nginx-009639?style=flat-square&logo=nginx&logoColor=white)
![sem build](https://img.shields.io/badge/build-nenhum-0b0c0e?style=flat-square)
![Dokploy ready](https://img.shields.io/badge/deploy-Dokploy%20ready-7c3aed?style=flat-square)

[**Projeto principal →**](https://github.com/Matheuscara/devsplit) · [Como rodar](#-rodar-local) · [Deploy](./DEPLOY.md) · [Changelog](./CHANGELOG.md)

</div>

---

## ✨ Destaques

- **Visual autoral** dark / neon verde / futurista — a metáfora do *split* (LOCAL × PASSTHROUGH) como eixo de design.
- **Hero em shader** `GrainGradient` (`@paper-design/shaders-react` via `esm.sh`), com **fallback CSS** se o CDN cair.
- **Diagrama de fluxo em SVG** com packets animados percorrendo os caminhos `local` e `passthrough`.
- **FX de cursor** em canvas (rastro + anel sobre clicáveis) e **packets de request** voando no hero.
- **Acessível e responsivo**: respeita `prefers-reduced-motion`, menu mobile com ARIA, contraste AA, anti-CLS.
- **Zero build**: editou? é só servir / re-deployar.

## 🖼️ Telas

| Rotas | Tráfego | Certificado |
|:---:|:---:|:---:|
| ![Rotas](./assets/shot-rotas.png) | ![Tráfego](./assets/shot-trafego.png) | ![Certificado](./assets/shot-certificado.png) |

## 🚀 Rodar local

```bash
# servidor estático simples
python3 -m http.server 8080            # → http://localhost:8080

# ou via Docker (igual ao deploy)
docker build -t devsplit-front .
docker run --rm -p 8080:80 devsplit-front   # → http://localhost:8080
```

## 📦 Deploy

nginx estático em Docker, pronto pro **Dokploy** (Traefik + TLS automático). Sem build step — o
nginx só serve os arquivos. Passo a passo em [`DEPLOY.md`](./DEPLOY.md).

## 🧱 Estrutura

```
index.html · styles.css · main.js              # o site (sem build)
assets/                                        # logo, banner, capturas de tela
Dockerfile · nginx.conf · docker-compose.yml   # deploy nginx
DEPLOY.md                                       # passo a passo de deploy
CHANGELOG.md                                    # histórico do que foi construído
```

### `main.js` — módulos

| Módulo | O que faz |
|---|---|
| **nav** | Estado `scrolled` ao rolar; menu mobile (hambúrguer + drawer, `Escape`, scroll lock). |
| **smooth scroll** | Âncoras com offset de 72px pro nav fixo. |
| **reveal** | `IntersectionObserver` em `[data-reveal]` com stagger por irmão. |
| **terminal** | Efeito de digitação disparado na viewport (instantâneo em reduced-motion). |
| **shader** | `GrainGradient` via `esm.sh`, com fallback CSS. |
| **FX de cursor** | Rastro em canvas + bolinha-ponteiro que vira anel sobre clicáveis. |
| **packets** | Chips de request animados no hero. |

> Toda animação tem caminho `prefers-reduced-motion`; o FX de cursor só roda em ponteiro fino.

## 📚 Documentação

Histórico completo do que foi construído (conceito, seções, design system, microinterações,
acessibilidade) em [`CHANGELOG.md`](./CHANGELOG.md).

## 📄 Licença

[MIT](./LICENSE) © [Matheus](https://github.com/Matheuscara)
