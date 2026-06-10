# Landing estática do devsplit (HTML/CSS/JS puro) — servida por nginx.
# Não há build: o shader do hero é carregado via CDN (esm.sh) no navegador.
FROM nginx:1.27-alpine

# config: gzip, cache, headers de segurança
COPY nginx.conf /etc/nginx/conf.d/default.conf

# arquivos do site
COPY index.html styles.css main.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
