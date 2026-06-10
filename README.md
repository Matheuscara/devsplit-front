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
index.html · styles.css · main.js     # o site
assets/                               # logo, banner, capturas
Dockerfile · nginx.conf · docker-compose.yml   # deploy
DEPLOY.md
```
