// ════════════════════════════════════════════════════════════════════════
// devsplit · landing · i18n (vanilla, sem build)
// PT-BR / EN · persiste em localStorage · detecta idioma do browser
// ════════════════════════════════════════════════════════════════════════

export const SUPPORTED = ['pt', 'en'];
const STORAGE_KEY = 'devsplit-lang';

export const translations = {
  pt: {
    // ── head / meta ──
    'html.lang': 'pt-BR',
    'meta.title': 'devsplit — divida o tráfego do stage, rode só o que você mexe',
    'meta.description': 'devsplit é um proxy de desenvolvimento que divide o tráfego do gateway de stage: você roda local só o serviço que está mexendo, o resto faz passthrough pro ambiente real. Sem Docker, sem mudar o front.',
    'og.title': 'devsplit — proxy de desenvolvimento que divide o tráfego do stage',
    'og.description': 'Rode local só o serviço que você está mexendo. Todo o resto faz passthrough pro stage real. Sem Docker, sem mudar o front.',

    // ── nav ──
    'nav.brandAria': 'devsplit — início',
    'nav.linksAria': 'Navegação principal',
    'nav.mobileAria': 'Navegação mobile',
    'nav.why': 'Por quê',
    'nav.how': 'Como funciona',
    'nav.features': 'Recursos',
    'nav.screens': 'Telas',
    'nav.security': 'Segurança',
    'nav.install': 'Instalar',
    'nav.start': 'Começar',
    'nav.burgerAria': 'Abrir menu',
    'nav.langAria': 'Idioma / Language',

    // ── hero ──
    'hero.title': 'Rode local só o serviço<br />que você <span class="accent">está mexendo</span>.',
    'hero.sub': 'O <strong>devsplit</strong> divide o tráfego do gateway de stage. O serviço em que você trabalha cai na sua máquina; todo o resto faz <span class="mono-inline">passthrough</span> pro ambiente real. Sem Docker, sem subir a stack inteira, sem mexer no front.',
    'hero.ctaInstall': 'Instalar o devsplit',
    'hero.ctaHow': 'Ver como funciona',
    'hero.winTitle': 'devsplit — interceptando api.stage.acme.dev',
    'hero.imgAlt': 'Tela de Rotas do devsplit: domínio api.stage.acme.dev interceptado, tabela de rotas marcando /transporte e /auth como local e /* como passthrough.',

    // ── comparativo ──
    'cmp.eyebrow': '// o problema',
    'cmp.title': 'Você só mudou um serviço.<br />Por que subir a stack inteira?',
    'cmp.badTag': 'antes',
    'cmp.badTitle': 'Tudo local, na marra',
    'cmp.badLead': 'Pra mexer numa coisa, você levanta o mundo — e ainda assim algo quebra.',
    'cmp.bad1': 'Docker Compose com 12 serviços comendo a RAM',
    'cmp.bad2': 'Banco, fila e auth de mentira pra "simular" o stage',
    'cmp.bad3': 'Variáveis de ambiente desencontradas do real',
    'cmp.bad4': '20 minutos de boot antes da primeira request',
    'cmp.goodTag': 'com devsplit',
    'cmp.goodTitle': 'Local só onde importa',
    'cmp.goodLead': 'Roda na sua máquina o serviço do PR. O resto é o stage de verdade.',
    'cmp.good1': 'Um processo: o serviço que você está editando',
    'cmp.good2': '<span class="mono-inline">passthrough</span> pro stage real em tudo mais',
    'cmp.good3': 'Mesmo gateway, mesmo HTTPS, mesmos dados',
    'cmp.good4': 'Primeira request em segundos, não em minutos',

    // ── fluxo ──
    'flow.eyebrow': '// como funciona',
    'flow.title': 'Uma request entra. O devsplit decide o caminho.',
    'flow.lead': 'Por prefixo de rota: o que casa com um serviço local cai na sua máquina; o resto segue <span class="mono-inline">passthrough</span> pro gateway de stage — mesmo host, mesmo TLS.',
    'flow.figAria': 'Diagrama: request chega no devsplit e é dividida entre serviço local e passthrough para o stage real.',
    'flow.nodeRequest': 'Request',
    'flow.nodeLocal': 'serviço LOCAL',
    'flow.nodeStage': 'passthrough → stage',
    'flow.legendLocal': '<i class="legend__chip legend__chip--local"></i> local — cai na sua máquina',
    'flow.legendPass': '<i class="legend__chip legend__chip--pass"></i> passthrough — segue pro stage real',

    // ── recursos ──
    'feat.eyebrow': '// recursos',
    'feat.title': 'Devtool de verdade, não um mock.',
    'feat.f1t': 'Split por prefixo',
    'feat.f1p': 'Defina <span class="mono-inline">/auth</span> ou <span class="mono-inline">/transporte</span> como local; o curinga <span class="mono-inline">/*</span> faz passthrough. Liga e desliga rota por rota.',
    'feat.f2t': 'Sem Docker',
    'feat.f2p': 'Um app desktop (Tauri) + <span class="mono-inline">devsplit.yaml</span> + CLI. Nada de Compose, nada de stack inteira na sua RAM.',
    'feat.f3t': 'HTTPS confiável',
    'feat.f3p': 'CA local via <span class="mono-inline">mkcert</span> assina o domínio interceptado. O browser confia, o front nem percebe.',
    'feat.f4t': 'Inspector de tráfego',
    'feat.f4p': 'Veja cada request com host, método, decisão (local/passthrough), status e latência P50/P95 por rota.',
    'feat.f5t': 'Detecção de serviços',
    'feat.f5p': 'O devsplit varre as portas locais e sugere rotas. Subiu o serviço? Ele aparece pronto pra ativar.',
    'feat.f6t': 'Perfis nomeados',
    'feat.f6p': 'Salve combinações de rotas por contexto — <span class="mono-inline">transporte</span>, <span class="mono-inline">auth</span> — e troque com um clique.',
    'feat.f7t': 'Saúde antes do split',
    'feat.f7p': 'Checagem de CA, entrada no <span class="mono-inline">hosts</span>, porta livre e gateway alcançável — avisos antes de confiar no proxy.',
    'feat.f8t': 'Front intacto',
    'feat.f8p': 'O app aponta pro mesmo <span class="mono-inline">api.stage.acme.dev</span> de sempre. Zero mudança de código no cliente.',

    // ── telas ──
    'scr.eyebrow': '// telas',
    'scr.title': 'O painel inteiro, sem firula.',
    'scr.trafAlt': 'Inspector de tráfego do devsplit: latência P50/P95 por rota e log de requests com método, host, decisão e status.',
    'scr.trafCap': '<strong>Tráfego</strong> — cada request com decisão, status e latência por rota.',
    'scr.rotasAlt': 'Tela de Rotas do devsplit com tabela de prefixos local e passthrough.',
    'scr.rotasCap': '<strong>Rotas</strong> — ligue o split por prefixo, com checagem de saúde.',
    'scr.certAlt': 'Tela de Certificado do devsplit mostrando a CA mkcert instalada e confiável.',
    'scr.certCap': '<strong>Certificado</strong> — CA <span class="mono-inline">mkcert</span> que torna o HTTPS confiável.',

    // ── segurança ──
    'sec.eyebrow': '// segurança',
    'sec.title': 'Seguro por desenho, não por promessa.',
    'sec.lead': 'O devsplit roda na sua máquina e fala só com o <em>seu</em> stage. Nada de tráfego passando por servidores de terceiros.',
    'sec.t1t': 'Open source e auditável',
    'sec.t1p': 'Código aberto — dá pra ler cada linha do proxy antes de confiar nele.',
    'sec.t2t': 'CA local, chaves na sua máquina',
    'sec.t2p': 'O <span class="mono-inline">mkcert</span> gera e guarda a raiz localmente. Nenhuma chave sai do seu computador.',
    'sec.t3t': 'Tráfego só pro seu stage',
    'sec.t3p': 'O <span class="mono-inline">passthrough</span> vai direto pro seu gateway real — nada trafega por servidores nossos.',
    'sec.t4t': 'TLS real, sem atalhos',
    'sec.t4p': 'Certificado válido pro domínio interceptado. Em momento nenhum a verificação de TLS é desligada.',
    'sec.scanTag': 'scan · 11 jun',
    'sec.scanCmd': 'run security pipeline · 5 scanners',
    'sec.scanTool1': 'gitleaks <i>· histórico + árvore</i>',
    'sec.scanRes1': '0 segredos',
    'sec.scanTool2': 'CodeQL <i>· TS + Rust</i>',
    'sec.scanRes2': '0 alertas',
    'sec.scanTool3': 'cargo-audit <i>· RustSec</i>',
    'sec.scanRes3': '0 vulnerabilidades',
    'sec.scanTool4': 'npm audit <i>· 154 deps</i>',
    'sec.scanRes4': '0 vulnerabilidades',
    'sec.scanTool5': 'Trivy <i>· deps + config</i>',
    'sec.scanRes5': '1 média · glib',
    'sec.scanNote': 'Resultado real do CI, a cada push. O DoS do hickory-proto foi corrigido (hickory 0.26); a única pendência (glib, <i>unsound</i>) é transitiva da stack GTK do Tauri — não é código do devsplit. <a href="https://github.com/Matheuscara/devsplit/blob/main/docs/security-scan.md" target="_blank" rel="noopener">Relatório completo →</a>',

    // ── instalar ──
    'ins.eyebrow': '// instalar',
    'ins.title': 'Do clone ao split em quatro comandos.',
    'ins.termAria': 'Sequência de comandos para instalar e rodar o devsplit',
    'ins.cta': 'Clonar no GitHub',
    'ins.note': 'Linux, macOS e Windows · um único prompt de senha no primeiro start',

    // ── marquee ──
    'marquee.set': '<em>passthrough</em><i>·</i><em>split por prefixo</em><i>·</i><em>sem Docker</em><i>·</i><em>HTTPS confiável</em><i>·</i><em>devsplit.yaml</em><i>·</i><em>inspector de tráfego</em><i>·</i><em>stage real</em><i>·</i><em>front intacto</em><i>·</i>',

    // ── footer ──
    'foot.tag': 'O proxy de desenvolvimento que divide o tráfego do stage. Rode local só o que você mexe.',
    'foot.navAria': 'Rodapé',
    'foot.colProduct': 'Produto',
    'foot.colStart': 'Começar',
    'foot.colResources': 'Recursos',
    'foot.docs': 'Documentação',
    'foot.releases': 'Releases',
    'foot.issues': 'Issues',
    'foot.meta': 'feito pra quem cansou de subir a stack inteira',

    // ── terminal (main.js) ──
    'term.comment': '# 1 prompt de senha (Linux): hosts + :443',
    'term.ok': '✓ devsplit rodando — interceptando api.stage.acme.dev',
  },

  en: {
    // ── head / meta ──
    'html.lang': 'en',
    'meta.title': 'devsplit — split your stage traffic, run only what you touch',
    'meta.description': 'devsplit is a development proxy that splits your stage gateway traffic: run only the service you are working on locally, everything else passes through to the real environment. No Docker, no frontend changes.',
    'og.title': 'devsplit — a development proxy that splits your stage traffic',
    'og.description': 'Run locally only the service you are working on. Everything else passes through to the real stage. No Docker, no frontend changes.',

    // ── nav ──
    'nav.brandAria': 'devsplit — home',
    'nav.linksAria': 'Main navigation',
    'nav.mobileAria': 'Mobile navigation',
    'nav.why': 'Why',
    'nav.how': 'How it works',
    'nav.features': 'Features',
    'nav.screens': 'Screens',
    'nav.security': 'Security',
    'nav.install': 'Install',
    'nav.start': 'Get started',
    'nav.burgerAria': 'Open menu',
    'nav.langAria': 'Idioma / Language',

    // ── hero ──
    'hero.title': 'Run locally only the service<br />you are <span class="accent">working on</span>.',
    'hero.sub': '<strong>devsplit</strong> splits your stage gateway traffic. The service you are working on lands on your machine; everything else does <span class="mono-inline">passthrough</span> to the real environment. No Docker, no spinning up the whole stack, no touching the frontend.',
    'hero.ctaInstall': 'Install devsplit',
    'hero.ctaHow': 'See how it works',
    'hero.winTitle': 'devsplit — intercepting api.stage.acme.dev',
    'hero.imgAlt': 'devsplit Routes screen: api.stage.acme.dev domain intercepted, route table marking /transporte and /auth as local and /* as passthrough.',

    // ── comparativo ──
    'cmp.eyebrow': '// the problem',
    'cmp.title': 'You only changed one service.<br />Why bring up the whole stack?',
    'cmp.badTag': 'before',
    'cmp.badTitle': 'Everything local, the hard way',
    'cmp.badLead': 'To touch one thing, you spin up the world — and something still breaks.',
    'cmp.bad1': 'Docker Compose with 12 services eating your RAM',
    'cmp.bad2': 'Fake database, queue and auth to "simulate" the stage',
    'cmp.bad3': 'Environment variables out of sync with the real one',
    'cmp.bad4': '20 minutes of boot before the first request',
    'cmp.goodTag': 'with devsplit',
    'cmp.goodTitle': 'Local only where it matters',
    'cmp.goodLead': 'Runs the PR service on your machine. Everything else is the real stage.',
    'cmp.good1': 'One process: the service you are editing',
    'cmp.good2': '<span class="mono-inline">passthrough</span> to the real stage for everything else',
    'cmp.good3': 'Same gateway, same HTTPS, same data',
    'cmp.good4': 'First request in seconds, not minutes',

    // ── fluxo ──
    'flow.eyebrow': '// how it works',
    'flow.title': 'A request comes in. devsplit picks the path.',
    'flow.lead': 'By route prefix: whatever matches a local service lands on your machine; the rest goes <span class="mono-inline">passthrough</span> to the stage gateway — same host, same TLS.',
    'flow.figAria': 'Diagram: a request reaches devsplit and is split between the local service and passthrough to the real stage.',
    'flow.nodeRequest': 'Request',
    'flow.nodeLocal': 'LOCAL service',
    'flow.nodeStage': 'passthrough → stage',
    'flow.legendLocal': '<i class="legend__chip legend__chip--local"></i> local — lands on your machine',
    'flow.legendPass': '<i class="legend__chip legend__chip--pass"></i> passthrough — goes to the real stage',

    // ── recursos ──
    'feat.eyebrow': '// features',
    'feat.title': 'A real devtool, not a mock.',
    'feat.f1t': 'Prefix-based split',
    'feat.f1p': 'Set <span class="mono-inline">/auth</span> or <span class="mono-inline">/transporte</span> as local; the <span class="mono-inline">/*</span> wildcard does passthrough. Toggle it route by route.',
    'feat.f2t': 'No Docker',
    'feat.f2p': 'A desktop app (Tauri) + <span class="mono-inline">devsplit.yaml</span> + CLI. No Compose, no whole stack in your RAM.',
    'feat.f3t': 'Trusted HTTPS',
    'feat.f3p': 'A local CA via <span class="mono-inline">mkcert</span> signs the intercepted domain. The browser trusts it, the frontend never notices.',
    'feat.f4t': 'Traffic inspector',
    'feat.f4p': 'See every request with host, method, decision (local/passthrough), status and P50/P95 latency per route.',
    'feat.f5t': 'Service detection',
    'feat.f5p': 'devsplit scans local ports and suggests routes. Started a service? It shows up ready to activate.',
    'feat.f6t': 'Named profiles',
    'feat.f6p': 'Save route combinations per context — <span class="mono-inline">transporte</span>, <span class="mono-inline">auth</span> — and switch with one click.',
    'feat.f7t': 'Health before the split',
    'feat.f7p': 'Checks for CA, <span class="mono-inline">hosts</span> entry, free port and reachable gateway — warnings before you trust the proxy.',
    'feat.f8t': 'Untouched frontend',
    'feat.f8p': 'The app points to the same <span class="mono-inline">api.stage.acme.dev</span> as always. Zero code changes on the client.',

    // ── telas ──
    'scr.eyebrow': '// screens',
    'scr.title': 'The whole dashboard, no fluff.',
    'scr.trafAlt': 'devsplit traffic inspector: P50/P95 latency per route and a request log with method, host, decision and status.',
    'scr.trafCap': '<strong>Traffic</strong> — every request with decision, status and per-route latency.',
    'scr.rotasAlt': 'devsplit Routes screen with a table of local and passthrough prefixes.',
    'scr.rotasCap': '<strong>Routes</strong> — turn on the prefix split, with a health check.',
    'scr.certAlt': 'devsplit Certificate screen showing the mkcert CA installed and trusted.',
    'scr.certCap': '<strong>Certificate</strong> — <span class="mono-inline">mkcert</span> CA that makes HTTPS trusted.',

    // ── segurança ──
    'sec.eyebrow': '// security',
    'sec.title': 'Secure by design, not by promise.',
    'sec.lead': 'devsplit runs on your machine and talks only to <em>your</em> stage. No traffic passing through third-party servers.',
    'sec.t1t': 'Open source and auditable',
    'sec.t1p': 'Open code — you can read every line of the proxy before trusting it.',
    'sec.t2t': 'Local CA, keys on your machine',
    'sec.t2p': '<span class="mono-inline">mkcert</span> generates and keeps the root locally. No key ever leaves your computer.',
    'sec.t3t': 'Traffic only to your stage',
    'sec.t3p': '<span class="mono-inline">passthrough</span> goes straight to your real gateway — nothing travels through our servers.',
    'sec.t4t': 'Real TLS, no shortcuts',
    'sec.t4p': 'A valid certificate for the intercepted domain. TLS verification is never turned off.',
    'sec.scanTag': 'scan · Jun 11',
    'sec.scanCmd': 'run security pipeline · 5 scanners',
    'sec.scanTool1': 'gitleaks <i>· history + tree</i>',
    'sec.scanRes1': '0 secrets',
    'sec.scanTool2': 'CodeQL <i>· TS + Rust</i>',
    'sec.scanRes2': '0 alerts',
    'sec.scanTool3': 'cargo-audit <i>· RustSec</i>',
    'sec.scanRes3': '0 vulnerabilities',
    'sec.scanTool4': 'npm audit <i>· 154 deps</i>',
    'sec.scanRes4': '0 vulnerabilities',
    'sec.scanTool5': 'Trivy <i>· deps + config</i>',
    'sec.scanRes5': '1 medium · glib',
    'sec.scanNote': 'Real CI result, on every push. The hickory-proto DoS was fixed (hickory 0.26); the only pending item (glib, <i>unsound</i>) is transitive from Tauri\u2019s GTK stack — not devsplit code. <a href="https://github.com/Matheuscara/devsplit/blob/main/docs/security-scan.md" target="_blank" rel="noopener">Full report →</a>',

    // ── instalar ──
    'ins.eyebrow': '// install',
    'ins.title': 'From clone to split in four commands.',
    'ins.termAria': 'Sequence of commands to install and run devsplit',
    'ins.cta': 'Clone on GitHub',
    'ins.note': 'Linux, macOS and Windows · a single password prompt on first start',

    // ── marquee ──
    'marquee.set': '<em>passthrough</em><i>·</i><em>prefix split</em><i>·</i><em>no Docker</em><i>·</i><em>trusted HTTPS</em><i>·</i><em>devsplit.yaml</em><i>·</i><em>traffic inspector</em><i>·</i><em>real stage</em><i>·</i><em>untouched frontend</em><i>·</i>',

    // ── footer ──
    'foot.tag': 'The development proxy that splits your stage traffic. Run locally only what you touch.',
    'foot.navAria': 'Footer',
    'foot.colProduct': 'Product',
    'foot.colStart': 'Get started',
    'foot.colResources': 'Resources',
    'foot.docs': 'Documentation',
    'foot.releases': 'Releases',
    'foot.issues': 'Issues',
    'foot.meta': 'built for those tired of spinning up the whole stack',

    // ── terminal (main.js) ──
    'term.comment': '# 1 password prompt (Linux): hosts + :443',
    'term.ok': '✓ devsplit running — intercepting api.stage.acme.dev',
  },
};

let currentLang = 'pt';

export function getLang() {
  return currentLang;
}

export function t(key) {
  const dict = translations[currentLang] || translations.pt;
  return dict[key] ?? translations.pt[key] ?? key;
}

function detectLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || 'pt').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(nav) ? nav : 'pt';
}

// aplica o dicionário a todos os elementos anotados
function applyTranslations() {
  // innerHTML: [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.innerHTML = t(el.getAttribute('data-i18n'));
  });

  // atributos: [data-i18n-attrs="attr:key;attr2:key2"]
  document.querySelectorAll('[data-i18n-attrs]').forEach((el) => {
    el.getAttribute('data-i18n-attrs').split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });

  // head: title + meta
  document.documentElement.lang = t('html.lang');
  document.title = t('meta.title');
  setMeta('meta[name="description"]', t('meta.description'));
  setMeta('meta[property="og:title"]', t('og.title'));
  setMeta('meta[property="og:description"]', t('og.description'));

  // estado visual do seletor de idioma
  document.querySelectorAll('.lang-switch__opt').forEach((btn) => {
    const active = btn.getAttribute('data-lang') === currentLang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function setMeta(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', value);
}

export function setLang(lang) {
  if (!SUPPORTED.includes(lang) || lang === currentLang) {
    if (lang === currentLang) return;
    lang = 'pt';
  }
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations();
  // notifica outros módulos (ex.: terminal no main.js)
  window.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
}

export function initI18n() {
  currentLang = detectLang();
  applyTranslations();

  document.querySelectorAll('.lang-switch__opt').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });

  window.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: currentLang } }));
}

initI18n();
