// ================================================
//  WELLISSON BARBER — Configuração da Barbearia
//  Identidade (nome/logo/whatsapp), tema de cores e
//  estilo de letra do nome no topo. Usado pelo site
//  (index.html) e pelo painel (admin.html).
// ================================================

// ─── Firebase (mesmo projeto do site e do painel) ───
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA7oHFbbLaMi5Ptwic0o4cqvuZN1jD039M",
  authDomain: "welisson-77143.firebaseapp.com",
  projectId: "welisson-77143",
  storageBucket: "welisson-77143.firebasestorage.app",
  messagingSenderId: "120956065574",
  appId: "1:120956065574:web:40ce021fa58845c19093e7"
};

// ─── Valores padrão (usados até carregar do Firestore) ───
const BARBEARIA_PADRAO = {
  nome:        'Welisson Barber',
  topoLinha1:  'Wellisson',
  topoLinha2:  'Barber',
  nomeCurto:   'Welisson',
  whatsapp:    '5585982358729',
  logo:        'logo_emblema.png',
  logoBase64:  null,
  letra:       'classico',
  corDestaque: '#EBC531',
  corFundo:    '#070E24',
};

// Objeto vivo, usado em todo o site/painel. Começa com os padrões e
// é atualizado assim que os dados salvos chegam do Firestore.
const BARBEARIA = Object.assign({}, BARBEARIA_PADRAO);

// ─── Estilos de letra do nome no topo ───────────────
const LETRA_ESTILOS = {
  classico: {
    label: 'Clássico',
    top:    "font-family:'Oswald',sans-serif; font-style:normal; font-weight:400; letter-spacing:7px;",
    bottom: "font-family:'Playfair Display',Georgia,serif; font-style:italic; font-weight:700; letter-spacing:8px;",
  },
  elegante: {
    label: 'Elegante',
    top:    "font-family:'Playfair Display',Georgia,serif; font-style:normal; font-weight:400; letter-spacing:6px;",
    bottom: "font-family:'Playfair Display',Georgia,serif; font-style:italic; font-weight:600; letter-spacing:5px;",
  },
  moderno: {
    label: 'Moderno',
    top:    "font-family:'Oswald',sans-serif; font-style:normal; font-weight:400; letter-spacing:5px;",
    bottom: "font-family:'Oswald',sans-serif; font-style:normal; font-weight:700; letter-spacing:2px;",
  },
  forte: {
    label: 'Forte',
    top:    "font-family:'Oswald',sans-serif; font-style:normal; font-weight:600; letter-spacing:8px;",
    bottom: "font-family:'Oswald',sans-serif; font-style:normal; font-weight:800; letter-spacing:1px;",
  },
  vintage: {
    label: 'Vintage',
    top:    "font-family:'Playfair Display',Georgia,serif; font-style:italic; font-weight:400; letter-spacing:6px;",
    bottom: "font-family:'Playfair Display',Georgia,serif; font-style:normal; font-weight:700; letter-spacing:3px;",
  },
  assinatura: {
    label: 'Assinatura',
    top:    "font-family:'Playfair Display',Georgia,serif; font-style:italic; font-weight:600; letter-spacing:2px;",
    bottom: "font-family:'Oswald',sans-serif; font-style:normal; font-weight:700; letter-spacing:3px;",
  },
};

// ─── Paletas de cores prontas ───────────────────────
const PALETAS_CORES = [
  { id: 'azul_dourado',   label: 'Azul e Dourado',    destaque: '#EBC531', fundo: '#0B1B3D' },
  { id: 'preto_dourado',  label: 'Preto e Dourado',   destaque: '#EBC531', fundo: '#0A0A0A' },
  { id: 'verde_dourado',  label: 'Verde e Dourado',   destaque: '#EBC531', fundo: '#07201A' },
  { id: 'vinho_dourado',  label: 'Vinho e Dourado',   destaque: '#EBC531', fundo: '#2B0A12' },
  { id: 'preto_vermelho', label: 'Preto e Vermelho',  destaque: '#E24545', fundo: '#0A0A0A' },
  { id: 'grafite_laranja',label: 'Grafite e Laranja', destaque: '#F2994A', fundo: '#1C1C1C' },
];

// ─── Utilitários de cor ─────────────────────────────
function hexParaRgb(hex) {
  const h = String(hex || '').replace('#', '');
  const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(v, 16);
  if (isNaN(n) || v.length !== 6) return { r: 7, g: 14, b: 36 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbParaHex(r, g, b) {
  const c = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return '#' + c(r) + c(g) + c(b);
}
// Mistura o hex em direção ao branco (pct > 0) ou preto (pct < 0)
function tonalizar(hex, pct) {
  const { r, g, b } = hexParaRgb(hex);
  const alvo = pct >= 0 ? 255 : 0;
  const p = Math.abs(pct);
  return rgbParaHex(r + (alvo - r) * p, g + (alvo - g) * p, b + (alvo - b) * p);
}
function hexParaRgba(hex, alpha) {
  const { r, g, b } = hexParaRgb(hex);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

// ─── Aplica identidade (nome, logo, whatsapp) no DOM ───
function aplicarIdentidade(cfg) {
  const set = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); };

  document.title = cfg.nome;
  set('marca-nav-strong', el => el.textContent = cfg.topoLinha1);
  set('marca-nav-em',     el => el.textContent = cfg.topoLinha2);
  set('marca-hero-top',   el => el.textContent = cfg.topoLinha1);
  set('marca-hero-bottom',el => el.textContent = cfg.topoLinha2);
  set('marca-visually-hidden', el => el.textContent = cfg.nome);
  set('admin-marca-nome', el => el.textContent = cfg.nome);
  set('login-marca-nome', el => el.textContent = cfg.nome);

  const logoSrc = cfg.logoBase64 || cfg.logo;
  document.querySelectorAll('[data-logo]').forEach(img => { img.src = logoSrc; });

  document.querySelectorAll('[data-whatsapp-link]').forEach(a => {
    const texto = a.getAttribute('data-whatsapp-texto') || '';
    a.href = 'https://wa.me/' + cfg.whatsapp + (texto ? '?text=' + encodeURIComponent(texto) : '');
  });
}

// ─── Aplica o tema de cores (site + painel) via CSS vars ───
function aplicarTema(cfg) {
  const root = document.documentElement.style;
  const destaque = cfg.corDestaque || BARBEARIA_PADRAO.corDestaque;
  const fundo    = cfg.corFundo || BARBEARIA_PADRAO.corFundo;

  // Variáveis do site (style.css)
  root.setProperty('--black', fundo);
  root.setProperty('--dark',  tonalizar(fundo, 0.05));
  root.setProperty('--dark2', tonalizar(fundo, 0.09));
  root.setProperty('--dark3', tonalizar(fundo, 0.15));
  root.setProperty('--dark4', tonalizar(fundo, 0.22));
  root.setProperty('--accent', destaque);
  root.setProperty('--accent2', tonalizar(destaque, 0.15));
  root.setProperty('--accent-dim', hexParaRgba(destaque, 0.10));

  // Variáveis do painel (admin.css) — mesmas cores, outros nomes
  root.setProperty('--panel',   tonalizar(fundo, 0.15));
  root.setProperty('--border',  tonalizar(fundo, 0.20));
  root.setProperty('--border2', tonalizar(fundo, 0.28));
  root.setProperty('--gold',  destaque);
  root.setProperty('--gold2', tonalizar(destaque, 0.15));
}

// ─── Aplica o estilo de letra do nome no topo ───────
function aplicarLetra(cfg) {
  const estilo = LETRA_ESTILOS[cfg.letra] || LETRA_ESTILOS.classico;
  const root = document.documentElement.style;
  const parse = (css, prop, fallback) => {
    const m = new RegExp(prop + ':\\s*([^;]+);').exec(css);
    return m ? m[1].trim() : fallback;
  };
  root.setProperty('--hero-top-font',   parse(estilo.top, 'font-family', "'Oswald',sans-serif"));
  root.setProperty('--hero-top-style',  parse(estilo.top, 'font-style', 'normal'));
  root.setProperty('--hero-top-weight', parse(estilo.top, 'font-weight', '400'));
  root.setProperty('--hero-top-spacing',parse(estilo.top, 'letter-spacing', '7px'));
  root.setProperty('--hero-bottom-font',   parse(estilo.bottom, 'font-family', "'Playfair Display',Georgia,serif"));
  root.setProperty('--hero-bottom-style',  parse(estilo.bottom, 'font-style', 'italic'));
  root.setProperty('--hero-bottom-weight', parse(estilo.bottom, 'font-weight', '700'));
  root.setProperty('--hero-bottom-spacing',parse(estilo.bottom, 'letter-spacing', '8px'));
}

function aplicarBarbearia(cfg) {
  aplicarIdentidade(cfg);
  aplicarTema(cfg);
  aplicarLetra(cfg);
}

// ─── Cache local (evita "flash" com os dados antigos) ───
const BARBEARIA_CACHE_KEY = 'wb_barbearia_v1';
try {
  const cache = JSON.parse(localStorage.getItem(BARBEARIA_CACHE_KEY) || 'null');
  if (cache && typeof cache === 'object') Object.assign(BARBEARIA, cache);
} catch (e) { /* sem cache: segue com os padrões */ }
// Tema e letra só mexem em <html style="--var">, que já existe mesmo no <head> — aplica na hora
// para não "piscar" com as cores padrão. Identidade (textos/logo) precisa dos elementos do <body>.
aplicarTema(BARBEARIA);
aplicarLetra(BARBEARIA);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => aplicarIdentidade(BARBEARIA));
} else {
  aplicarIdentidade(BARBEARIA);
}

// ─── Carrega do Firestore e atualiza tudo ───────────
function carregarConfigBarbearia() {
  try {
    if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  } catch (e) { /* já inicializado */ }
  return firebase.firestore().collection('config').doc('barbearia').get()
    .then(doc => {
      if (doc.exists) {
        const dados = doc.data() || {};
        Object.assign(BARBEARIA, dados);
        try { localStorage.setItem(BARBEARIA_CACHE_KEY, JSON.stringify(BARBEARIA)); } catch (e) {}
      }
      aplicarBarbearia(BARBEARIA);
      return BARBEARIA;
    })
    .catch(e => { console.warn('Dados da barbearia: usando os últimos valores conhecidos.', e); return BARBEARIA; });
}
