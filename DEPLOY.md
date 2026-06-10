# Deploy — devsplit-front

Landing **estática** (HTML/CSS/JS, sem build) servida por **nginx**. O fundo do hero é o
shader `GrainGradient` (paper-design) carregado via **CDN `esm.sh`** no navegador — então a
máquina/visitante precisa de internet para o efeito (sem ele, o hero fica só escuro; o resto
funciona normal).

## Dokploy (recomendado)

1. **Git**: suba esta pasta (`devsplit-front`) num repositório.
2. No Dokploy: **Create → Compose** (Docker Compose).
3. Aponte para o repositório/branch (provider Git) — o Dokploy acha o `docker-compose.yml`.
4. **Deploy**.
5. Em **Domains**, adicione seu domínio apontando para o serviço **`web`**, porta **80**.
   O Dokploy cria as rotas no Traefik e o TLS (Let's Encrypt) automaticamente — **não**
   é preciso publicar porta no host (deixe o bloco `ports` comentado).

## Teste local

```bash
# opção A: docker compose (descomente o bloco `ports` no docker-compose.yml)
docker compose up --build         # → http://localhost:8080

# opção B: build + run direto
docker build -t devsplit-front .
docker run --rm -p 8080:80 devsplit-front   # → http://localhost:8080
```

## Arquivos

```
devsplit-front/
├── index.html · styles.css · main.js   # o site
├── assets/                             # logo, banner, capturas
├── Dockerfile                          # nginx:alpine + os estáticos
├── nginx.conf                          # gzip, cache, headers
├── docker-compose.yml                  # serviço `web` (expose 80) — pronto p/ Dokploy
└── .dockerignore
```

## Notas

- **Sem build step**: o nginx só serve os arquivos. Atualizou o site? Re-deploy (rebuild da imagem).
- **CDN do shader**: para um deploy 100% self-contained (sem `esm.sh`), dá pra "vendorizar"
  o `@paper-design/shaders-react` + react localmente — peça que eu faço.
- **Cache**: `assets/` tem cache de 30 dias; `index.html` é sempre revalidado.
