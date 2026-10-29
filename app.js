(function () {
'use strict';

/* ---------- constantes ---------- */
const BUILTIN = [
  { id:'p1',  cat:'Memoria',        word:'MEM★RIA',        bg:'#EE5D7A', text:'Escribí sobre un olor que te devuelve a un lugar. ¿Dónde estás? ¿Quién más está ahí?' },
  { id:'p2',  cat:'Hoy',            word:'H★Y',            bg:'#F6C3CF', text:'¿Qué fue lo más chiquito que te hizo bien hoy?' },
  { id:'p10', cat:'Nuevo comienzo', word:'NUEV★ COMIENZO', bg:'#F2B880', text:'Estás empezando algo nuevo. ¿Qué querés que sepa la versión de vos de dentro de seis meses sobre este momento?' },
  { id:'p11', cat:'Cápsula del tiempo', word:'CÁPSULA ★',  bg:'#C9A6F2', capsule:true, text:'Escribile a tu yo del futuro y elegí cuándo se abre. Hasta esa fecha, la entrada queda sellada.' },
  { id:'p3',  cat:'Cartas',         word:'CART★S',         bg:'#E2574C', text:'Escribile una carta a alguien a quien nunca le dijiste algo importante. No hace falta mandarla.' },
  { id:'p12', cat:'Personas',       word:'PERS★NAS',       bg:'#F6C3CF', text:'Elegí a alguien que te marcó este año. ¿Qué te enseñó sin darse cuenta?' },
  { id:'p13', cat:'Hebreo',         word:'עברית ★',        bg:'#9ED9C4', text:'Escribí tres oraciones en hebreo sobre tu día. No importa si tienen errores: la idea es animarte.' },
  { id:'p4',  cat:'Cambios',        word:'CAMBI★S',        bg:'#C9A6F2', text:'¿Qué querés llevarte de esta etapa y qué querés dejar atrás?' },
  { id:'p5',  cat:'Cuerpo',         word:'CUERP★',         bg:'#F6C3CF', text:'¿Dónde sentís el cansancio hoy? Describilo sin juzgarlo.' },
  { id:'p6',  cat:'Gratitud',       word:'GRACI★S',        bg:'#EE5D7A', text:'Tres cosas que salieron mejor de lo que esperabas esta semana.' },
  { id:'p7',  cat:'Miedos',         word:'MIED★S',         bg:'#C9A6F2', text:'Escribí un miedo como si fuera un personaje: cómo habla, qué quiere, qué lo achica.' },
  { id:'p8',  cat:'Sueños',         word:'SUEÑ★S',         bg:'#E2574C', text:'Describí un día perfecto, hora por hora, con todos los detalles.' },
  { id:'p9',  cat:'Lugares',        word:'LUG★R',          bg:'#F6C3CF', text:'Describí tu rincón favorito como si nadie lo hubiera visto nunca.' }
];
const SWATCHES = ['#EE5D7A','#F6C3CF','#E2574C','#C9A6F2','#F2B880','#9ED9C4','#8FB8F2','#E8E2D6'];
const MOODS = [
  { v:1, label:'Muy mal',  color:'#4C5BD4' },
  { v:2, label:'Mal',      color:'#8E6CF0' },
  { v:3, label:'Normal',   color:'#D8C7F5' },
  { v:4, label:'Bien',     color:'#F49AB0' },
  { v:5, label:'Muy bien', color:'#E8445F' }
];
const MAX_PHOTOS = 6;
const LOCK_AFTER_MS = 2 * 60 * 1000;

/* ---------- íconos ---------- */
const sv = (p, s = 18, w = 1.8) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I = {
  home: sv('<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
  pen: sv('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
  pen2: sv('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>', 18, 2),
  spark: sv('<path d="M12 3l2.6 5.6L20 9.3l-4 4 1 5.7-5-2.8-5 2.8 1-5.7-4-4 5.4-.7z"/>'),
  starF: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.6 5.6L20 9.3l-4 4 1 5.7-5-2.8-5 2.8 1-5.7-4-4 5.4-.7z"/></svg>',
  box: sv('<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12h4"/>'),
  chart: sv('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  list: sv('<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>'),
  gear: sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  lock: sv('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  shuffle: sv('<path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>', 16, 2),
  back: sv('<path d="M15 18l-6-6 6-6"/>', 16, 2),
  next: sv('<path d="M9 18l6-6-6-6"/>', 16, 2),
  trash: sv('<path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/>', 14, 2),
  dl: sv('<path d="M12 4v11"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/>', 14, 2),
  up: sv('<path d="M12 20V9"/><path d="M7 14l5-5 5 5"/><path d="M5 4h14"/>', 14, 2),
  edit: sv('<path d="M4 20h4L19 9l-4-4L4 16z"/>', 14, 2),
  print: sv('<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>', 14, 2),
  x: sv('<path d="M6 6l12 12M18 6L6 18"/>', 14, 2.2),
  img: sv('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>', 20),
  sun: sv('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  moon: sv('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'),
  expand: sv('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>', 16, 2),
  plus: sv('<path d="M12 5v14M5 12h14"/>', 16, 2.2),
  seal: sv('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>', 14, 2),
  check: sv('<path d="M5 12l5 5L20 7"/>', 14, 2.4)
};

/* ---------- utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const pad = n => (n < 10 ? '0' : '') + n;
const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const addDays = (d, n) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; };
const parse = s => { const p = String(s || '').split('-'); return p.length < 3 ? new Date() : new Date(+p[0], +p[1] - 1, +p[2]); };
const todayIso = () => iso(new Date());
const longDate = s => parse(s).toLocaleDateString('es-AR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
const shortDate = s => parse(s).toLocaleDateString('es-AR', { day:'numeric', month:'short' }).replace('.', '');
const medDate = s => parse(s).toLocaleDateString('es-AR', { day:'numeric', month:'long', year:'numeric' });
const monthName = (y, m) => new Date(y, m, 1).toLocaleDateString('es-AR', { month:'long', year:'numeric' });
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const words = t => { t = String(t || '').trim(); return t ? t.split(/\s+/).length : 0; };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const plural = (n, a, b) => n + ' ' + (n === 1 ? a : b);
const normTag = t => String(t || '').trim().replace(/^#+/, '').replace(/\s+/g, '-').toLowerCase().slice(0, 30);
function hl(text, q) {
  const t = esc(text); if (!q) return t;
  const eq = esc(q), i = t.toLowerCase().indexOf(eq.toLowerCase());
  if (i < 0) return t;
  return t.slice(0, i) + '<mark>' + t.slice(i, i + eq.length) + '</mark>' + t.slice(i + eq.length);
}
function starWord(cat) {
  const u = cat.toUpperCase(); let i = u.indexOf('O'); if (i < 0) i = u.indexOf('A');
  return i < 0 ? u + ' ★' : u.slice(0, i) + '★' + u.slice(i + 1);
}
const wordClass = w => (w.length > 12 ? 'word xs' : w.length > 8 ? 'word s' : 'word');
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), 2600);
}
function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}

/* ---------- almacenamiento (IndexedDB, con respaldo en localStorage) ---------- */
let idb = null;
function idbOpen() {
  return new Promise((res, rej) => {
    try {
      const r = indexedDB.open('diario', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('kv');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    } catch (e) { rej(e); }
  });
}
function idbGet(k) {
  return new Promise((res, rej) => {
    const q = idb.transaction('kv', 'readonly').objectStore('kv').get(k);
    q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error);
  });
}
function idbSet(k, v) {
  return new Promise((res, rej) => {
    const tx = idb.transaction('kv', 'readwrite');
    tx.objectStore('kv').put(v, k);
    tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); tx.onabort = () => rej(tx.error);
  });
}

const DEFAULT_DATA = () => ({
  v: 2, entries: [], customPrompts: [], draft: null, lastBackup: null,
  settings: { theme: 'dark', dailyGoal: 200, monthlyGoal: 20, pinHash: null, pinSalt: null }
});
let D = DEFAULT_DATA();

async function loadData() {
  try { idb = await idbOpen(); const d = await idbGet('data'); if (d) return d; } catch (e) { idb = null; }
  try { const r = localStorage.getItem('diario.data.v2'); if (r) return JSON.parse(r); } catch (e) {}
  // migración desde la primera versión
  try {
    const r = localStorage.getItem('diario.entries.v1');
    if (r) { const d = DEFAULT_DATA(); d.entries = JSON.parse(r).map(normalizeEntry).filter(Boolean); return d; }
  } catch (e) {}
  return null;
}
function normalizeEntry(e) {
  if (!e || typeof e.body !== 'string' || !e.date) return null;
  return {
    id: String(e.id != null ? e.id : uid()), date: String(e.date).slice(0, 10), title: e.title || '', body: e.body,
    promptId: e.promptId || null, mood: e.mood || null, tags: Array.isArray(e.tags) ? e.tags.map(normTag).filter(Boolean) : [],
    photos: Array.isArray(e.photos) ? e.photos.filter(p => typeof p === 'string' && p.startsWith('data:image/')) : [],
    fav: !!e.fav, openAt: e.openAt || null, opened: !!e.opened,
    createdAt: e.createdAt || new Date().toISOString(), updatedAt: e.updatedAt || e.createdAt || new Date().toISOString()
  };
}
let saveTimer = null, savePromise = Promise.resolve();
function persist(now) {
  clearTimeout(saveTimer);
  const run = () => {
    savePromise = (async () => {
      try {
        if (idb) await idbSet('data', D);
        else localStorage.setItem('diario.data.v2', JSON.stringify(D));
        setSaved('ok');
      } catch (e) {
        setSaved('err');
        toast('No se pudo guardar: puede que no haya espacio. Exportá una copia y sacá algunas fotos.');
      }
    })();
    return savePromise;
  };
  if (now) return run();
  setSaved('saving');
  saveTimer = setTimeout(run, 450);
}
function setSaved(state) {
  ['#saved', '#saved2'].forEach(sel => {
    const el = $(sel); if (!el) return;
    if (state === 'saving') { el.className = 'saved'; el.textContent = 'Guardando…'; }
    else if (state === 'ok') { const d = new Date(); el.className = 'saved ok'; el.innerHTML = 'Guardado ' + I.check + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
    else { el.className = 'saved err'; el.textContent = 'No se pudo guardar'; }
  });
}

/* ---------- estado de la interfaz ---------- */
const U = {
  view: 'inicio', query: '', openId: null, archTab: 'lista', favOnly: false,
  calY: new Date().getFullYear(), calM: new Date().getMonth(), calDay: null, pixY: new Date().getFullYear(),
  locked: false, pin: '', focus: false, newColor: SWATCHES[0], hiddenAt: 0
};

/* ---------- datos derivados ---------- */
const allPrompts = () => BUILTIN.concat(D.customPrompts || []);
const promptById = id => allPrompts().find(p => p.id === id) || null;
const isSealed = e => !!(e.openAt && e.openAt > todayIso());
const sortedEntries = () => D.entries.slice().sort((a, b) => b.date.localeCompare(a.date) || String(b.createdAt).localeCompare(String(a.createdAt)));
const moodOf = v => MOODS.find(m => m.v === v) || null;
function deco(e) {
  const p = promptById(e.promptId), body = e.body || '', sealed = isSealed(e);
  return {
    e, p, sealed, title: e.title || 'Sin título',
    kind: p ? p.cat : 'Libre', color: p ? p.bg : '#B57BFF',
    ex: sealed ? '' : (body.length > 170 ? body.slice(0, 170).trim() + '…' : body)
  };
}
function promptCounts() { const c = {}; D.entries.forEach(e => { if (e.promptId) c[e.promptId] = (c[e.promptId] || 0) + 1; }); return c; }
function tagCounts() { const c = {}; D.entries.forEach(e => (e.tags || []).forEach(t => { c[t] = (c[t] || 0) + 1; })); return Object.entries(c).sort((a, b) => b[1] - a[1]); }
function datesSet() { const s = {}; D.entries.forEach(e => { s[e.date] = true; }); return s; }
function dayMood(dateStr) {
  const list = D.entries.filter(e => e.date === dateStr);
  if (!list.length) return null;
  const ms = list.map(e => e.mood).filter(Boolean);
  if (!ms.length) return { plain: true };
  return { color: moodOf(Math.round(ms.reduce((a, b) => a + b, 0) / ms.length)).color };
}
function streaks() {
  const ds = datesSet(), t = new Date();
  let cur = 0, c = ds[iso(t)] ? t : addDays(t, -1);
  while (ds[iso(c)]) { cur++; c = addDays(c, -1); }
  const keys = Object.keys(ds).sort(); let best = 0, run = 0, prev = null;
  keys.forEach(k => { const d = parse(k); run = prev && iso(addDays(prev, 1)) === k ? run + 1 : 1; best = Math.max(best, run); prev = d; });
  return { cur, best };
}
function promptOfDay() {
  const P = allPrompts(), s = todayIso(); let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return P[h % P.length];
}
function onThisDay() {
  const t = todayIso(), md = t.slice(5), dd = t.slice(8), now = new Date();
  const pool = D.entries.filter(e => e.date < t && !isSealed(e));
  const years = pool.filter(e => e.date.slice(5) === md).sort((a, b) => b.date.localeCompare(a.date));
  if (years.length) { const n = now.getFullYear() - parse(years[0].date).getFullYear(); return { e: years[0], label: 'Hace ' + plural(n, 'año', 'años') + ', un día como hoy' }; }
  const months = pool.filter(e => e.date.slice(8) === dd).sort((a, b) => b.date.localeCompare(a.date));
  if (months.length) {
    const d = parse(months[0].date), n = (now.getFullYear() - d.getFullYear()) * 12 + now.getMonth() - d.getMonth();
    return { e: months[0], label: 'Hace ' + plural(n, 'mes', 'meses') + ', un día como hoy' };
  }
  return null;
}
const openedCapsules = () => D.entries.filter(e => e.openAt && e.openAt <= todayIso() && !e.opened);

/* ---------- borrador ---------- */
function emptyDraft(o) {
  return Object.assign({ editId: null, mode: 'libre', promptId: promptOfDay().id, date: todayIso(), title: '', body: '', tags: [], photos: [], mood: null, sealed: false, openAt: '' }, o || {});
}
const draftHasContent = d => !!(d && (d.body.trim() || d.title.trim() || d.photos.length));
function startDraft(o) {
  if (draftHasContent(D.draft) && !D.draft.editId) {
    if (!confirm('Tenés un borrador sin guardar. ¿Lo descartás y empezás uno nuevo?\n\n(Cancelar = seguir con el borrador)')) { go('escribir'); return; }
  }
  D.draft = emptyDraft(o);
  if (D.draft.mode === 'consigna' && promptById(D.draft.promptId)?.capsule) { D.draft.sealed = true; D.draft.openAt = iso(addDays(new Date(), 365)); }
  persist(true); go('escribir');
}
const startFree = (date) => startDraft({ mode: 'libre', date: date || todayIso() });
const startPrompt = id => startDraft({ mode: 'consigna', promptId: id });
function randomPromptId(ex) { const P = allPrompts().filter(p => p.id !== ex); return P[Math.floor(Math.random() * P.length)].id; }

/* ---------- navegación ---------- */
function go(view, extra) {
  U.view = view; Object.assign(U, extra || {});
  if (view !== 'buscar') { U.query = ''; $('#q').value = ''; }
  if (view !== 'escribir' && U.focus) setFocus(false);
  render(); window.scrollTo(0, 0);
}

/* ---------- vistas ---------- */
function promptCard(p, c) {
  const n = c[p.id] || 0;
  return `<article class="card"><div class="topc" style="background:${p.bg}"><span class="${wordClass(p.word)}" dir="auto">${esc(p.word)}</span>
    <span class="pill">${n === 0 ? 'nueva' : plural(n, 'respuesta', 'respuestas')}</span>
    <button class="round" data-act="prompt" data-id="${p.id}" aria-label="Responder: ${esc(p.cat)}">${I.pen2}</button></div>
    <div class="bd"><span class="cat">${esc(p.cat)}</span><p>${esc(p.text)}</p>
    ${p.custom ? `<div class="foot"><button class="ghost" data-act="delprompt" data-id="${p.id}">${I.trash} Borrar</button></div>` : ''}</div></article>`;
}
function entryRow(d, q) {
  const e = d.e, dt = parse(e.date), m = moodOf(e.mood);
  const tags = (e.tags || []).map(t => `<span class="chip">#${hl(t, q && q.replace(/^#/, ''))}</span>`).join(' ');
  return `<button class="entry" data-act="open" data-id="${e.id}"><div class="date"><b>${dt.getDate()}</b><span>${esc(dt.toLocaleDateString('es-AR', { month:'short' }).replace('.', ''))}</span></div>
    <div class="info"><div class="tt">${e.fav ? `<span class="star">${I.starF}</span>` : ''}<b>${hl(d.title, q)}</b>
      <span class="tag" style="background:${d.color}">${esc(d.kind)}</span>${m ? `<span class="moodbadge" style="background:${m.color}" title="${m.label}"></span>` : ''}
      ${e.photos && e.photos.length ? `<span class="muted" style="font-size:12px">${plural(e.photos.length, 'foto', 'fotos')}</span>` : ''}</div>
      ${d.sealed ? `<span class="sealed">${I.seal} Cápsula sellada · se abre el ${esc(medDate(e.openAt))}</span>` : `<span class="ex">${hl(d.ex, q)}</span>`}
      ${tags ? `<div class="tools">${tags}</div>` : ''}</div></button>`;
}

function viewInicio() {
  const c = promptCounts(), out = [];
  if (draftHasContent(D.draft)) {
    out.push(`<div class="banner"><div class="bx"><span class="k">Borrador guardado</span><span class="v">${esc(D.draft.title || (D.draft.body.slice(0, 90) + (D.draft.body.length > 90 ? '…' : '')) || 'Sin título')}</span></div>
      <button class="btn" data-act="goto" data-v="escribir">Seguir escribiendo</button></div>`);
  }
  openedCapsules().forEach(e => out.push(`<div class="banner memory"><div class="bx"><span class="k">Se abrió una cápsula del tiempo</span>
    <span class="v">La escribiste el ${esc(medDate(e.date))}${e.title ? ' · ' + esc(e.title) : ''}</span></div><button class="outline" data-act="open" data-id="${e.id}">Abrir</button></div>`));
  const otd = onThisDay();
  if (otd) {
    const d = deco(otd.e);
    out.push(`<div class="banner memory"><div class="bx"><span class="k">${esc(otd.label)}</span><span class="v"><b>${esc(d.title)}</b> — ${esc(d.ex.slice(0, 120))}${d.ex.length > 120 ? '…' : ''}</span></div>
      <button class="outline" data-act="open" data-id="${otd.e.id}">Leer</button></div>`);
  }
  const lb = D.lastBackup ? Math.floor((Date.now() - new Date(D.lastBackup)) / 864e5) : null;
  if (D.entries.length >= 3 && (lb === null || lb >= 14)) {
    out.push(`<div class="banner"><div class="bx"><span class="k">Copia de seguridad</span><span class="v">${lb === null ? 'Todavía no exportaste ninguna copia.' : 'Tu última copia es de hace ' + lb + ' días.'} Si borrás los datos del navegador o cambiás de dispositivo, se pierden las entradas.</span></div>
      <button class="outline" data-act="export-json">${I.dl} Exportar todo</button></div>`);
  }
  const pod = promptOfDay();
  out.push(`<section class="stack"><span class="kicker">Consigna del día</span><div class="pod"><div class="sw" style="background:${pod.bg}"><span class="${wordClass(pod.word)}" dir="auto">${esc(pod.word)}</span></div>
    <div class="tx"><span class="kicker">${esc(pod.cat)}</span><p>${esc(pod.text)}</p><div class="tools"><button class="btn" data-act="prompt" data-id="${pod.id}">${I.pen2} Responder</button></div></div></div></section>`);
  out.push(`<button class="quick" data-act="free">Escritura libre — empezá a escribir lo que tengas en la cabeza…</button>`);
  out.push(`<div class="row"><h2>Consignas</h2><div class="tools"><button class="ghost red" data-act="random">${I.shuffle} Sorprendeme</button><button class="ghost" data-act="goto" data-v="consignas">${I.plus} Crear consigna</button></div></div>
    <div class="grid">${allPrompts().map(p => promptCard(p, c)).join('')}</div>`);
  return `<section class="stack" style="gap:26px">${out.join('')}</section>`;
}

function viewBuscar() {
  const raw = U.query.trim(), q = raw.toLowerCase(); let res;
  if (q.startsWith('#')) { const t = normTag(q); res = sortedEntries().filter(e => (e.tags || []).some(x => x.includes(t))); }
  else res = sortedEntries().filter(e => {
    const d = deco(e); const hay = [e.title, d.sealed ? '' : e.body, (e.tags || []).join(' '), d.p ? d.p.text + ' ' + d.p.cat : 'libre', longDate(e.date)].join(' ').toLowerCase();
    return hay.includes(q);
  });
  return `<section class="stack"><div class="row"><h2>Resultados</h2><span class="muted">${plural(res.length, 'entrada', 'entradas')}</span></div>
    ${res.length ? res.map(e => entryRow(deco(e), raw)).join('') : '<p class="empty">Nada por acá con esa búsqueda.</p>'}</section>`;
}

function viewArchivo() {
  const tab = U.archTab;
  const head = `<div class="row c"><h2>${U.favOnly ? 'Favoritas' : 'Archivo'}</h2>
    <div class="tools"><div class="seg" role="group" aria-label="Vista del archivo">
      <button data-act="archtab" data-v="lista" aria-pressed="${tab === 'lista'}">Lista</button>
      <button data-act="archtab" data-v="mes" aria-pressed="${tab === 'mes'}">Mes</button>
      <button data-act="archtab" data-v="anio" aria-pressed="${tab === 'anio'}">Año en píxeles</button></div>
      <button class="outline ${U.favOnly ? 'on' : ''}" data-act="favonly" aria-pressed="${U.favOnly}">${I.starF} Favoritas</button></div></div>`;
  let body = '';
  const list = sortedEntries().filter(e => !U.favOnly || e.fav);
  if (tab === 'lista') {
    if (!list.length) body = `<p class="empty">${U.favOnly ? 'Todavía no marcaste ninguna entrada como favorita. Tocá la ★ cuando leas una.' : 'Todavía no escribiste nada. La primera página siempre es la más difícil.'}</p>`;
    else { let last = ''; body = list.map(e => { const k = e.date.slice(0, 7); const h = k !== last ? `<div class="month-h">${esc(monthName(+k.slice(0, 4), +k.slice(5) - 1))}</div>` : ''; last = k; return h + entryRow(deco(e)); }).join(''); }
  } else if (tab === 'mes') body = viewMonth(list);
  else body = viewPixels();
  return `<section class="stack">${head}${body}
    <div class="tools nofocus" style="margin-top:10px"><button class="outline" data-act="export-json">${I.dl} Exportar todo (.json)</button><button class="outline" data-act="export-md">${I.dl} Exportar todo (.md)</button>
    <label class="outline" style="cursor:pointer">${I.up} Importar copia<input type="file" id="imp" accept="application/json,.json" class="sr"></label></div></section>`;
}
function viewMonth(list) {
  const y = U.calY, m = U.calM, first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7, t = todayIso();
  const byDay = {}; list.forEach(e => { (byDay[e.date] = byDay[e.date] || []).push(e); });
  let cells = ['L','M','M','J','V','S','D'].map(d => `<div class="wd">${d}</div>`).join('');
  for (let i = 0; i < offset; i++) cells += '<button class="out" tabindex="-1" aria-hidden="true"></button>';
  for (let d = 1; d <= days; d++) {
    const k = y + '-' + pad(m + 1) + '-' + pad(d), es = byDay[k] || [];
    const dots = es.slice(0, 4).map(e => `<i style="background:${(moodOf(e.mood) || { color:'#B57BFF' }).color}"></i>`).join('');
    cells += `<button class="${k === t ? 'today ' : ''}${U.calDay === k ? 'sel' : ''}" data-act="calday" data-v="${k}" aria-label="${esc(longDate(k))}${es.length ? ', ' + plural(es.length, 'entrada', 'entradas') : ''}"><b>${d}</b><span class="dots">${dots}</span></button>`;
  }
  let sel = '';
  if (U.calDay) {
    const es = byDay[U.calDay] || [];
    sel = `<div class="row c" style="margin-top:8px"><h3 class="cap">${esc(longDate(U.calDay))}</h3><button class="outline" data-act="freeon" data-v="${U.calDay}">${I.pen} Escribir para este día</button></div>
      ${es.length ? es.map(e => entryRow(deco(e))).join('') : '<p class="empty" style="padding:20px;font-size:16px">Ese día no escribiste.</p>'}`;
  }
  return `<div class="panel stack"><div class="row c"><button class="iconbtn" data-act="calnav" data-v="-1" aria-label="Mes anterior">${I.back}</button>
    <h3 class="cap">${esc(monthName(y, m))}</h3><button class="iconbtn" data-act="calnav" data-v="1" aria-label="Mes siguiente">${I.next}</button></div>
    <div class="cal">${cells}</div></div>${sel}`;
}
function viewPixels() {
  const y = U.pixY; let g = '<div></div>';
  for (let d = 1; d <= 31; d++) g += `<div class="d">${d % 5 === 0 || d === 1 ? d : ''}</div>`;
  for (let m = 0; m < 12; m++) {
    g += `<div class="m">${esc(new Date(y, m, 1).toLocaleDateString('es-AR', { month:'short' }).replace('.', ''))}</div>`;
    const dim = new Date(y, m + 1, 0).getDate();
    for (let d = 1; d <= 31; d++) {
      if (d > dim) { g += '<span class="px no"></span>'; continue; }
      const k = y + '-' + pad(m + 1) + '-' + pad(d), dm = dayMood(k);
      if (!dm) g += `<span class="px" title="${esc(medDate(k))}"></span>`;
      else g += `<button class="px${dm.plain ? ' plain' : ''}" ${dm.color ? `style="background:${dm.color};border-color:transparent"` : ''} data-act="pixday" data-v="${k}" aria-label="${esc(medDate(k))}"></button>`;
    }
  }
  return `<div class="panel stack"><div class="row c"><button class="iconbtn" data-act="pixnav" data-v="-1" aria-label="Año anterior">${I.back}</button><h3>${y}</h3>
    <button class="iconbtn" data-act="pixnav" data-v="1" aria-label="Año siguiente">${I.next}</button></div>
    <div class="pixels"><div class="pixgrid">${g}</div></div>
    <div class="legend">${MOODS.map(m => `<span><i style="background:${m.color}"></i>${m.label}</span>`).join('')}<span><i style="background:var(--purple);opacity:.5"></i>Sin ánimo</span></div></div>`;
}

function viewEscribir() {
  const d = D.draft || (D.draft = emptyDraft());
  const p = promptById(d.promptId) || allPrompts()[0], con = d.mode === 'consigna';
  const goal = D.settings.dailyGoal || 0;
  const opts = allPrompts().map(x => `<option value="${x.id}" ${x.id === p.id ? 'selected' : ''}>${esc(x.cat)}</option>`).join('');
  return `<section class="stack" style="gap:20px">
  <div class="focusbar"><span class="saved" id="saved2"></span><span class="muted" id="wc2"></span><button class="outline" data-act="focus">Salir del modo foco (Esc)</button></div>
  <div class="row c nofocus"><button class="ghost" data-act="goto" data-v="inicio">${I.back} ${d.editId ? 'Cancelar' : 'Volver'}</button>
    <div class="tools"><span class="saved" id="saved"></span>
    ${d.editId ? '' : `<div class="seg" role="group" aria-label="Tipo de entrada"><button data-act="mode" data-v="consigna" aria-pressed="${con}">Con consigna</button><button data-act="mode" data-v="libre" aria-pressed="${!con}">Libre</button></div>`}
    <button class="outline" data-act="focus">${I.expand} Modo foco</button></div></div>
  ${con ? `<div class="prompt nofocus"><div class="sw" style="background:${p.bg}"><span class="${wordClass(p.word)}" dir="auto">${esc(p.word)}</span></div>
    <div class="tx"><span class="kicker">Consigna · ${esc(p.cat)}</span><p>${esc(p.text)}</p>
    <div class="tools"><button class="outline" data-act="shuffle">${I.shuffle} Otra consigna</button>
    <label class="sr" for="psel">Elegir consigna</label><select id="psel" class="inp" style="height:40px">${opts}</select></div></div></div>` : ''}
  <div class="fields"><label class="field nofocus" style="flex:0 1 200px">Fecha<input type="date" id="fdate" value="${esc(d.date)}"></label>
    <label class="field" style="flex:1 1 280px"><span class="nofocus">Título (opcional)</span><input type="text" class="ttl" id="ftitle" placeholder="Sin título" value="${esc(d.title)}" dir="auto"></label></div>
  <label class="field"><span class="nofocus">Escritura</span><textarea id="fbody" dir="auto" placeholder="${con ? (p.id === 'p13' ? 'כתבי כאן… (o escribí en español si te trabás)' : 'Empezá por la primera imagen que te venga…') : 'Escribí sin pensar demasiado. Nadie más lo va a leer.'}">${esc(d.body)}</textarea></label>
  <div class="extras nofocus">
    <div class="field">¿Cómo te sentís?<div class="moods" role="group" aria-label="Estado de ánimo">${MOODS.map(m => `<button class="mood" data-act="mood" data-v="${m.v}" aria-pressed="${d.mood === m.v}"><span class="c" style="background:${m.color}"></span>${m.label}</button>`).join('')}</div></div>
    <div class="field"><span>Etiquetas</span><div class="tagbox">${d.tags.map(t => `<span class="chip">#${esc(t)}<button class="x" data-act="rmtag" data-v="${esc(t)}" aria-label="Quitar etiqueta ${esc(t)}">${I.x}</button></span>`).join('')}
      <input id="ftag" placeholder="${d.tags.length ? 'Otra etiqueta…' : 'Escribí y apretá Enter (ej: familia, facu)'}" list="taglist" autocomplete="off"><datalist id="taglist">${tagCounts().map(([t]) => `<option value="${esc(t)}">`).join('')}</datalist></div></div>
    <div class="field"><span>Fotos (${d.photos.length}/${MAX_PHOTOS})</span><div class="photos">${d.photos.map((ph, i) => `<div class="ph"><img src="${ph}" alt="Foto ${i + 1}"><button data-act="rmphoto" data-v="${i}" aria-label="Quitar foto ${i + 1}">${I.x}</button></div>`).join('')}
      ${d.photos.length < MAX_PHOTOS ? `<label class="addph">${I.img}Agregar<input type="file" id="fphotos" accept="image/*" multiple class="sr"></label>` : ''}</div></div>
    <div class="field"><label class="check"><input type="checkbox" id="fseal" ${d.sealed ? 'checked' : ''}> Sellar como cápsula del tiempo</label>
      ${d.sealed ? `<label class="field" style="max-width:240px">Se abre el<input type="date" id="fopen" min="${iso(addDays(new Date(), 1))}" value="${esc(d.openAt)}"></label>` : ''}</div>
  </div>
  <div class="savebar"><div class="goal"><span class="muted" id="wc"></span>${goal ? '<div class="bar"><i id="goalbar" style="width:0"></i></div>' : ''}</div>
    <div class="tools">${d.editId ? '' : `<button class="ghost" data-act="discard">Descartar</button>`}<button class="btn" id="save" data-act="save" style="min-height:48px;padding:0 26px">${d.editId ? 'Guardar cambios' : 'Guardar entrada'}</button></div></div>
  </section>`;
}
function updateCount() {
  const d = D.draft; if (!d) return;
  const n = words(d.body), g = D.settings.dailyGoal || 0;
  const txt = plural(n, 'palabra', 'palabras') + (g ? ' · meta ' + g : '') + (g && n >= g ? ' ✓' : '');
  ['#wc', '#wc2'].forEach(s => { const el = $(s); if (el) el.textContent = txt; });
  const b = $('#goalbar'); if (b) b.style.width = Math.min(100, g ? n / g * 100 : 0) + '%';
  const s = $('#save'); if (s) s.disabled = !d.body.trim();
}

function viewLeer() {
  const e = D.entries.find(x => x.id === U.openId);
  if (!e) return viewArchivo();
  const d = deco(e), m = moodOf(e.mood);
  const top = `<div class="row c"><button class="ghost" data-act="goto" data-v="archivo">${I.back} Archivo</button>
    <div class="tools"><button class="outline ${e.fav ? 'on' : ''}" data-act="fav" data-id="${e.id}" aria-pressed="${e.fav}">${I.starF} ${e.fav ? 'Favorita' : 'Marcar favorita'}</button>
    ${d.sealed ? '' : `<button class="outline" data-act="edit" data-id="${e.id}">${I.edit} Editar</button>
    <button class="outline" data-act="pdf" data-id="${e.id}">${I.print} PDF</button><button class="outline" data-act="md1" data-id="${e.id}">${I.dl} .md</button>`}
    <button class="outline danger" data-act="del" data-id="${e.id}">${I.trash} Eliminar</button></div></div>`;
  const meta = `<div class="stack" style="gap:10px"><span class="muted cap">${esc(longDate(e.date))}</span><h2 dir="auto">${esc(d.title)}</h2>
    <div class="tools">${m ? `<span class="chip"><span class="moodbadge" style="background:${m.color}"></span>${m.label}</span>` : ''}
    ${(e.tags || []).map(t => `<button class="chip" data-act="tag" data-v="${esc(t)}">#${esc(t)}</button>`).join('')}
    <span class="muted" style="font-size:13px">${plural(words(e.body), 'palabra', 'palabras')}</span></div></div>`;
  if (d.sealed) return `<article class="read">${top}${meta}<div class="capsule"><span class="sealed">${I.lock}</span><b>Cápsula sellada</b>
    <span class="muted">Se abre el ${esc(longDate(e.openAt))}.</span><button class="outline" data-act="unseal" data-id="${e.id}">Abrir antes de tiempo</button></div></article>`;
  return `<article class="read">${top}${meta}
    ${d.p ? `<div class="q" style="background:${d.p.bg}"><span>Consigna · ${esc(d.p.cat)}</span><i>${esc(d.p.text)}</i></div>` : ''}
    <p class="txt" dir="auto">${esc(e.body)}</p>
    ${e.photos && e.photos.length ? `<div class="gal">${e.photos.map((ph, i) => `<button data-act="lightbox" data-id="${e.id}" data-v="${i}" aria-label="Ver foto ${i + 1}"><img src="${ph}" alt="Foto ${i + 1}"></button>`).join('')}</div>` : ''}
  </article>`;
}

function viewStats() {
  const es = D.entries, st = streaks(), c = promptCounts();
  const totalW = es.reduce((a, e) => a + words(e.body), 0);
  const top = Object.entries(c).sort((a, b) => b[1] - a[1]);
  const topP = top.length ? promptById(top[0][0]) : null;
  const y = new Date().getFullYear(), daysYear = Object.keys(datesSet()).filter(k => +k.slice(0, 4) === y).length;
  const tile = (n, l) => `<div class="tile"><span class="n">${n}</span><span class="l">${l}</span></div>`;
  const moodC = MOODS.map(m => ({ m, n: es.filter(e => e.mood === m.v).length })), maxMood = Math.max(1, ...moodC.map(x => x.n));
  const now = new Date(), months = [];
  for (let i = 11; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1), k = d.getFullYear() + '-' + pad(d.getMonth() + 1); months.push({ l: d.toLocaleDateString('es-AR', { month:'short' }).replace('.', ''), n: es.filter(e => e.date.startsWith(k)).length }); }
  const maxM = Math.max(1, ...months.map(x => x.n));
  const tags = tagCounts().slice(0, 8);
  return `<section class="stack" style="gap:24px"><h2>Estadísticas</h2>
    <div class="tiles">${tile(es.length, 'entradas')}${tile(totalW.toLocaleString('es-AR'), 'palabras en total')}${tile(plural(st.cur, 'día', 'días'), 'racha actual')}
    ${tile(plural(st.best, 'día', 'días'), 'racha más larga')}${tile(es.length ? Math.round(totalW / es.length) : 0, 'palabras por entrada')}${tile(daysYear, (daysYear === 1 ? 'día escrito en ' : 'días escritos en ') + y)}
    ${tile(topP ? esc(topP.cat) : '—', topP ? 'consigna más usada (' + plural(top[0][1], 'vez', 'veces') + ')' : 'consigna más usada')}${tile(es.filter(e => e.fav).length, 'favoritas')}</div>
    <div class="panel stack"><h3>Entradas por mes</h3><div class="cols">${months.map(x => `<div class="c"><b>${x.n || ''}</b><i style="height:${x.n / maxM * 100}%"></i><span>${esc(x.l)}</span></div>`).join('')}</div></div>
    <div class="panel stack"><h3>Estado de ánimo</h3>${moodC.map(x => `<div class="hbar"><span>${x.m.label}</span><span class="tr"><i style="width:${x.n / maxMood * 100}%;background:${x.m.color}"></i></span><span class="num">${x.n}</span></div>`).join('')}</div>
    ${top.length ? `<div class="panel stack"><h3>Consignas que más usás</h3>${top.slice(0, 5).map(([id, n]) => { const p = promptById(id); return p ? `<div class="hbar"><span>${esc(p.cat)}</span><span class="tr"><i style="width:${n / top[0][1] * 100}%;background:${p.bg}"></i></span><span class="num">${n}</span></div>` : ''; }).join('')}</div>` : ''}
    ${tags.length ? `<div class="panel stack"><h3>Etiquetas</h3><div class="tools">${tags.map(([t, n]) => `<button class="chip" data-act="tag" data-v="${esc(t)}">#${esc(t)} · ${n}</button>`).join('')}</div></div>` : ''}
  </section>`;
}

function viewConsignas() {
  const c = promptCounts(), col = U.newColor;
  return `<section class="stack" style="gap:24px"><h2>Consignas</h2>
    <form class="setting" id="newprompt"><h3>Crear una consigna</h3>
      <div class="fields"><label class="field" style="flex:1 1 200px">Categoría<input type="text" id="npcat" maxlength="24" placeholder="Ej: Facultad" required></label></div>
      <label class="field">Consigna<textarea id="nptext" class="inp" style="min-height:90px;font-size:17px" maxlength="240" placeholder="Ej: ¿Qué aprendiste esta semana que no estaba en ningún apunte?" required></textarea></label>
      <div class="field">Color<div class="swatches" role="group" aria-label="Color">${SWATCHES.map(s => `<button type="button" class="swatch" style="background:${s}" data-act="swatch" data-v="${s}" aria-pressed="${s === col}" aria-label="Color ${s}"></button>`).join('')}</div></div>
      <div class="tools"><button class="btn" type="submit">${I.plus} Guardar consigna</button></div></form>
    <div class="grid">${allPrompts().map(p => promptCard(p, c)).join('')}</div></section>`;
}

function viewAjustes() {
  const s = D.settings;
  return `<section class="stack" style="gap:20px"><h2>Ajustes</h2>
    <div class="setting"><h3>Apariencia</h3><div class="seg" role="group" aria-label="Tema">
      <button data-act="settheme" data-v="dark" aria-pressed="${s.theme === 'dark'}">Oscuro</button><button data-act="settheme" data-v="light" aria-pressed="${s.theme === 'light'}">Claro</button><button data-act="settheme" data-v="auto" aria-pressed="${s.theme === 'auto'}">Automático</button></div></div>
    <div class="setting"><h3>Metas</h3><div class="fields">
      <label class="field" style="flex:1 1 200px">Palabras por entrada<input type="number" id="sgoal" min="0" max="5000" step="50" value="${s.dailyGoal}"></label>
      <label class="field" style="flex:1 1 200px">Días de escritura por mes<input type="number" id="smonth" min="1" max="31" value="${s.monthlyGoal}"></label></div>
      <p>La meta de palabras aparece abajo del editor y en el modo foco. La meta mensual es la del anillo.</p></div>
    <div class="setting"><h3>PIN de bloqueo</h3>
      <p>Pide un PIN al abrir el diario y después de 2 minutos sin usarlo. Es una pantalla de privacidad para que nadie lo lea de casualidad: no cifra las entradas. Si te olvidás el PIN, se puede quitar borrando los datos del sitio (y ahí se pierden las entradas que no hayas exportado).</p>
      ${s.pinHash ? `<div class="tools"><button class="outline" data-act="lock">${I.lock} Bloquear ahora</button><button class="outline danger" data-act="pinoff">Quitar PIN</button></div>` : ''}
      <form id="pinform" class="fields"><label class="field" style="flex:1 1 160px">${s.pinHash ? 'Nuevo PIN' : 'PIN (4 a 6 números)'}<input type="password" id="pin1" inputmode="numeric" pattern="[0-9]{4,6}" maxlength="6" autocomplete="new-password" required></label>
        <label class="field" style="flex:1 1 160px">Repetir PIN<input type="password" id="pin2" inputmode="numeric" pattern="[0-9]{4,6}" maxlength="6" autocomplete="new-password" required></label>
        <div style="align-self:flex-end"><button class="btn" type="submit">${s.pinHash ? 'Cambiar PIN' : 'Activar PIN'}</button></div></form></div>
    <div class="setting"><h3>Copia de seguridad</h3>
      <p>Las entradas se guardan en este navegador y en este dispositivo. Exportá una copia cada tanto: el .json sirve para restaurar todo (fotos y consignas propias incluidas) y el .md es para leer o imprimir.${D.lastBackup ? ' Última copia: ' + esc(medDate(iso(new Date(D.lastBackup)))) + '.' : ''}</p>
      <div class="tools"><button class="outline" data-act="export-json">${I.dl} Exportar todo (.json)</button><button class="outline" data-act="export-md">${I.dl} Exportar todo (.md)</button>
      <label class="outline" style="cursor:pointer">${I.up} Importar copia<input type="file" id="imp" accept="application/json,.json" class="sr"></label></div></div>
    <div class="setting"><h3>Instalar como app</h3><p>En el celu: abrí el diario en el navegador y elegí “Agregar a pantalla de inicio” (Chrome: menú ⋮ → Instalar app; iPhone/Safari: Compartir → Agregar a inicio). Funciona sin conexión.</p>
      ${U.installEvt ? `<div class="tools"><button class="btn" data-act="install">Instalar ahora</button></div>` : ''}</div>
  </section>`;
}

/* ---------- paneles fijos ---------- */
function renderSide() {
  const v = U.view, d = D.draft;
  const on = {
    inicio: v === 'inicio', libre: v === 'escribir' && d && d.mode === 'libre', consigna: v === 'escribir' && d && d.mode === 'consigna',
    archivo: (v === 'archivo' && !U.favOnly) || v === 'leer', fav: v === 'archivo' && U.favOnly, stats: v === 'stats', consignas: v === 'consignas', ajustes: v === 'ajustes'
  };
  const b = (k, act, icon, label, extra = '') => `<button class="${on[k] ? 'on' : ''}" data-act="${act}" ${extra}>${icon}${label}</button>`;
  const tags = tagCounts().slice(0, 8);
  $('#side').innerHTML = `<div class="brand"><div class="logo" aria-hidden="true">d<i>★</i></div><div><b>diario</b><small>espacio de escritura</small></div></div>
    <nav class="nav" aria-label="Secciones"><span class="label">Páginas</span>
      ${b('inicio', 'goto', I.home, 'Inicio', 'data-v="inicio"')}${b('libre', 'free', I.pen, 'Escritura libre')}${b('consigna', 'random', I.spark, 'Consigna al azar')}
      ${b('archivo', 'goto', I.box, 'Archivo', 'data-v="archivo" data-fav="0"')}${b('fav', 'goto', I.starF, 'Favoritas', 'data-v="archivo" data-fav="1"')}
      ${b('stats', 'goto', I.chart, 'Estadísticas', 'data-v="stats"')}${b('consignas', 'goto', I.list, 'Consignas', 'data-v="consignas"')}${b('ajustes', 'goto', I.gear, 'Ajustes', 'data-v="ajustes"')}
      ${D.settings.pinHash ? `<button data-act="lock">${I.lock}Bloquear</button>` : ''}</nav>
    ${tags.length ? `<div class="nav"><span class="label">Etiquetas</span>${tags.map(([t, n]) => `<button class="mini" data-act="tag" data-v="${esc(t)}"><span style="color:var(--dim)">#</span>${esc(t)}<span class="cnt">${n}</span></button>`).join('')}</div>` : ''}`;
  const tb = (k, act, icon, label, extra = '') => `<button class="${on[k] ? 'on' : ''}" data-act="${act}" ${extra}>${icon}<span>${label}</span></button>`;
  $('#tabbar').innerHTML = tb('inicio', 'goto', I.home, 'Inicio', 'data-v="inicio"') + tb('archivo', 'goto', I.box, 'Archivo', 'data-v="archivo" data-fav="0"') +
    `<button class="fab" data-act="${draftHasContent(D.draft) ? 'goto' : 'free'}" data-v="escribir" aria-label="Escribir"><span class="o">${I.pen2}</span></button>` +
    tb('stats', 'goto', I.chart, 'Stats', 'data-v="stats"') + tb('ajustes', 'goto', I.gear, 'Ajustes', 'data-v="ajustes"');
}
function renderRight() {
  const t = new Date(), tIso = iso(t), L = ['D','L','M','M','J','V','S'];
  let week = '';
  for (let i = 6; i >= 0; i--) {
    const d = addDays(t, -i), k = iso(d), dm = dayMood(k);
    const bg = dm ? (dm.color || 'var(--purple)') : '';
    week += `<div class="day${dm ? ' has' : ''}${k === tIso ? ' today' : ''}" ${bg ? `style="background:${bg};border-color:${bg}"` : ''}><span>${L[d.getDay()]}</span><b>${d.getDate()}</b></div>`;
  }
  const ym = tIso.slice(0, 7), days = new Set(D.entries.filter(e => e.date.startsWith(ym)).map(e => e.date)).size;
  const goal = Math.max(1, D.settings.monthlyGoal || 20), pct = Math.min(1, days / goal), C = 2 * Math.PI * 50, st = streaks();
  const rec = sortedEntries().slice(0, 4).map(deco);
  $('#right').innerHTML = `<div><h2>Tu semana</h2><div class="week">${week}</div></div>
    <div class="ring"><svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="${days} de ${goal} días escritos este mes" style="flex:none">
      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--ring-track)" stroke-width="12"/>
      ${pct > 0 ? `<circle cx="60" cy="60" r="50" fill="none" stroke="#B57BFF" stroke-width="12" stroke-linecap="round" stroke-dasharray="${(pct * C).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 60 60)"/>` : ''}
      <text x="60" y="60" text-anchor="middle" fill="currentColor" font-family="Playfair Display, Georgia, serif" font-size="26" font-weight="700">${days}/${goal}</text>
      <text x="60" y="80" text-anchor="middle" fill="var(--muted)" font-family="Inter, sans-serif" font-size="11">días del mes</text></svg>
      <div><span class="k">Racha</span><span class="big">${plural(st.cur, 'día', 'días')}</span><span class="h">${datesSet()[tIso] ? 'Hoy ya escribiste.' : 'Escribí hoy para sumar un día.'}${days >= goal ? ' ¡Meta del mes cumplida!' : ''}</span></div></div>
    <div class="stack" style="gap:12px"><div class="row"><h2>Últimas</h2><a href="#" data-act="goto" data-v="archivo" data-fav="0" style="font:500 13px var(--sans)">Ver todo</a></div>
      ${rec.length ? rec.map(d => `<button class="recent" data-act="open" data-id="${d.e.id}"><span class="dot" style="background:${d.color}"></span><span><b>${d.e.fav ? '<span class="star">★</span> ' : ''}${esc(d.title)}</b><small>${esc(shortDate(d.e.date))} · ${esc(d.kind)}${d.sealed ? ' · sellada' : ''}</small></span></button>`).join('') : '<span class="muted">Acá van a aparecer tus entradas.</span>'}</div>`;
}
function renderLock() {
  const el = $('#lock');
  if (!U.locked) { el.hidden = true; el.innerHTML = ''; return; }
  el.hidden = false;
  const n = U.pin.length;
  el.innerHTML = `<div class="lockbox"><div class="logo" aria-hidden="true" style="width:56px;height:56px;font-size:32px">d<i>★</i></div><h2>Diario</h2><span class="muted">Ingresá tu PIN</span>
    <div class="pins" id="pins" aria-label="${n} números ingresados">${[0,1,2,3,4,5].slice(0, Math.max(4, n)).map(i => `<i class="${i < n ? 'f' : ''}"></i>`).join('')}</div>
    <div class="keypad">${[1,2,3,4,5,6,7,8,9].map(k => `<button data-act="key" data-v="${k}">${k}</button>`).join('')}
    <button class="blank" tabindex="-1" aria-hidden="true"></button><button data-act="key" data-v="0">0</button><button data-act="keydel" aria-label="Borrar">${I.back}</button></div>
    <button class="btn" data-act="unlock" style="width:100%">Entrar</button></div>`;
}

function applyTheme() {
  const t = D.settings.theme;
  const real = t === 'auto' ? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : t;
  document.documentElement.setAttribute('data-theme', real);
  $('meta[name=theme-color]').setAttribute('content', real === 'light' ? '#FBF5F3' : '#0B0B0C');
  $('#themebtn').innerHTML = real === 'light' ? I.moon : I.sun;
}

function render() {
  const v = U.view; let h;
  if (v === 'buscar') h = viewBuscar(); else if (v === 'archivo') h = viewArchivo(); else if (v === 'escribir') h = viewEscribir();
  else if (v === 'leer') h = viewLeer(); else if (v === 'stats') h = viewStats(); else if (v === 'consignas') h = viewConsignas();
  else if (v === 'ajustes') h = viewAjustes(); else h = viewInicio();
  $('#view').innerHTML = h;
  renderSide(); renderRight(); renderLock();
  if (v === 'escribir') { updateCount(); if (draftHasContent(D.draft)) setSaved('ok'); }
}

/* ---------- acciones ---------- */
function markBackup() { D.lastBackup = new Date().toISOString(); persist(true); }
function exportJSON() {
  const data = { app: 'diario', version: 2, exportedAt: new Date().toISOString(), entries: D.entries, customPrompts: D.customPrompts };
  download('diario-' + todayIso() + '.json', JSON.stringify(data, null, 2), 'application/json');
  markBackup(); toast('Copia exportada.');
  if (U.view === 'inicio') render();
}
function entryMD(e) {
  const d = deco(e), m = moodOf(e.mood);
  let s = `## ${d.title}\n\n*${longDate(e.date)}*`;
  if (d.p) s += ` · Consigna: ${d.p.cat}`;
  if (m) s += ` · Ánimo: ${m.label}`;
  if (e.tags && e.tags.length) s += `\n\nEtiquetas: ${e.tags.map(t => '#' + t).join(' ')}`;
  if (d.p) s += `\n\n> ${d.p.text}`;
  s += '\n\n' + (d.sealed ? `*(Cápsula sellada hasta el ${medDate(e.openAt)})*` : e.body);
  if (e.photos && e.photos.length) s += `\n\n*(${plural(e.photos.length, 'foto', 'fotos')} — incluidas solo en la copia .json)*`;
  return s + '\n';
}
function exportMD() {
  const list = D.entries.slice().sort((a, b) => a.date.localeCompare(b.date));
  download('diario-' + todayIso() + '.md', '# Diario\n\nExportado el ' + medDate(todayIso()) + '\n\n' + list.map(entryMD).join('\n---\n\n'), 'text/markdown');
  toast('Exportado en Markdown.');
}
function printEntry(e) {
  const d = deco(e), m = moodOf(e.mood);
  $('#print').innerHTML = `<div class="pd">${esc(longDate(e.date))}${m ? ' · ' + m.label : ''}${e.tags && e.tags.length ? ' · ' + e.tags.map(t => '#' + esc(t)).join(' ') : ''}</div>
    <h1>${esc(d.title)}</h1>${d.p ? `<p class="pq">${esc(d.p.text)}</p>` : ''}<div class="pt" dir="auto">${esc(e.body)}</div>
    ${e.photos && e.photos.length ? `<div class="pg">${e.photos.map(p => `<img src="${p}" alt="">`).join('')}</div>` : ''}<div class="pm">Diario</div>`;
  setTimeout(() => window.print(), 60);
}
async function importFile(file) {
  try {
    const raw = JSON.parse(await file.text());
    const list = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.entries) ? raw.entries : null);
    if (!list) throw new Error('formato');
    const seen = new Set(D.entries.map(e => e.date + '|' + e.title + '|' + e.body));
    const ids = new Set(D.entries.map(e => e.id)); let added = 0;
    list.map(normalizeEntry).filter(Boolean).forEach(e => {
      const k = e.date + '|' + e.title + '|' + e.body; if (seen.has(k)) return;
      if (ids.has(e.id)) e.id = uid();
      seen.add(k); ids.add(e.id); D.entries.push(e); added++;
    });
    if (raw && Array.isArray(raw.customPrompts)) {
      const have = new Set(allPrompts().map(p => p.id));
      raw.customPrompts.forEach(p => { if (p && p.id && p.cat && p.text && !have.has(p.id)) D.customPrompts.push({ id: p.id, cat: String(p.cat), text: String(p.text), bg: SWATCHES.includes(p.bg) ? p.bg : SWATCHES[0], word: starWord(String(p.cat)), custom: true }); });
    }
    await persist(true); render();
    toast(added ? 'Importadas ' + plural(added, 'entrada', 'entradas') + '.' : 'No había entradas nuevas para importar.');
  } catch (e) { toast('No pude leer ese archivo. Tiene que ser una copia .json del diario.'); }
}
function compressImage(file) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const max = 1280, k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      res(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('img')); };
    img.src = url;
  });
}
function saveDraftAsEntry() {
  const d = D.draft; if (!d || !d.body.trim()) return;
  if (d.sealed && !(d.openAt && d.openAt > todayIso())) { toast('Elegí una fecha futura para abrir la cápsula.'); $('#fopen') && $('#fopen').focus(); return; }
  const now = new Date().toISOString();
  const data = { date: d.date || todayIso(), title: d.title.trim(), body: d.body, promptId: d.mode === 'consigna' ? d.promptId : null, mood: d.mood, tags: d.tags.slice(), photos: d.photos.slice(), openAt: d.sealed ? d.openAt : null, updatedAt: now };
  let id = d.editId;
  if (id) { const e = D.entries.find(x => x.id === id); if (e) Object.assign(e, data); }
  else { id = uid(); D.entries.push(Object.assign({ id, fav: false, opened: false, createdAt: now }, data)); }
  D.draft = null; persist(true);
  if (data.openAt) { toast('Cápsula sellada hasta el ' + medDate(data.openAt) + '.'); go('archivo', { favOnly: false }); }
  else { toast('Entrada guardada.'); go('leer', { openId: id }); }
}
async function hashPin(pin, salt) {
  const txt = salt + ':' + pin;
  if (window.crypto && crypto.subtle) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt));
    return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('');
  }
  let h = 5381; for (let i = 0; i < txt.length; i++) h = ((h << 5) + h + txt.charCodeAt(i)) >>> 0; return 'x' + h.toString(16);
}
async function tryUnlock() {
  if (U.pin.length < 4) return;
  const h = await hashPin(U.pin, D.settings.pinSalt);
  if (h === D.settings.pinHash) { U.locked = false; U.pin = ''; renderLock(); }
  else { U.pin = ''; renderLock(); const p = $('#pins'); if (p) { p.classList.add('shake'); } toast('PIN incorrecto.'); }
}
function setFocus(on) {
  U.focus = on; document.body.classList.toggle('focus', on);
  if (on) { try { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {}); } catch (e) {} const t = $('#fbody'); t && t.focus(); }
  else if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) {} }
  if (draftHasContent(D.draft)) setSaved('ok');
  updateCount();
}

const ACTIONS = {
  goto: (el) => { const v = el.dataset.v; const extra = {}; if (el.dataset.fav != null) extra.favOnly = el.dataset.fav === '1'; if (v === 'escribir' && !D.draft) D.draft = emptyDraft(); go(v, extra); },
  free: () => startFree(),
  freeon: (el) => startFree(el.dataset.v),
  random: () => startPrompt(randomPromptId(D.draft && D.draft.promptId)),
  prompt: (el) => startPrompt(el.dataset.id),
  'new': () => startFree(),
  open: (el) => go('leer', { openId: el.dataset.id }),
  tag: (el) => { U.query = '#' + el.dataset.v; $('#q').value = U.query; U.view = 'buscar'; render(); window.scrollTo(0, 0); },
  theme: () => { const cur = document.documentElement.getAttribute('data-theme'); D.settings.theme = cur === 'light' ? 'dark' : 'light'; applyTheme(); persist(true); if (U.view === 'ajustes') render(); },
  settheme: (el) => { D.settings.theme = el.dataset.v; applyTheme(); persist(true); render(); },
  mode: (el) => { D.draft.mode = el.dataset.v; persist(); render(); },
  shuffle: () => { D.draft.promptId = randomPromptId(D.draft.promptId); persist(); render(); },
  mood: (el) => { const v = +el.dataset.v; D.draft.mood = D.draft.mood === v ? null : v; persist(); render(); },
  rmtag: (el) => { D.draft.tags = D.draft.tags.filter(t => t !== el.dataset.v); persist(); render(); $('#ftag') && $('#ftag').focus(); },
  rmphoto: (el) => { D.draft.photos.splice(+el.dataset.v, 1); persist(); render(); },
  focus: () => setFocus(!U.focus),
  save: () => saveDraftAsEntry(),
  discard: () => { if (!draftHasContent(D.draft) || confirm('¿Descartar este borrador?')) { D.draft = null; persist(true); go('inicio'); } },
  fav: (el) => { const e = D.entries.find(x => x.id === el.dataset.id); if (e) { e.fav = !e.fav; persist(true); render(); toast(e.fav ? 'Agregada a favoritas ★' : 'Quitada de favoritas'); } },
  edit: (el) => {
    const e = D.entries.find(x => x.id === el.dataset.id); if (!e) return;
    D.draft = emptyDraft({ editId: e.id, mode: e.promptId ? 'consigna' : 'libre', promptId: e.promptId || promptOfDay().id, date: e.date, title: e.title, body: e.body, tags: (e.tags || []).slice(), photos: (e.photos || []).slice(), mood: e.mood, sealed: !!e.openAt && isSealed(e), openAt: e.openAt || '' });
    go('escribir');
  },
  del: (el) => { if (!confirm('¿Eliminar esta entrada? No se puede deshacer.')) return; D.entries = D.entries.filter(x => x.id !== el.dataset.id); persist(true); toast('Entrada eliminada.'); go('archivo'); },
  unseal: (el) => { if (!confirm('¿Abrir la cápsula antes de tiempo?')) return; const e = D.entries.find(x => x.id === el.dataset.id); if (e) { e.openAt = null; e.opened = true; persist(true); render(); } },
  pdf: (el) => { const e = D.entries.find(x => x.id === el.dataset.id); if (e) printEntry(e); },
  md1: (el) => { const e = D.entries.find(x => x.id === el.dataset.id); if (e) download((e.title || 'entrada').replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase() + '-' + e.date + '.md', entryMD(e), 'text/markdown'); },
  lightbox: (el) => { const e = D.entries.find(x => x.id === el.dataset.id); if (!e) return; const lb = $('#lightbox'); lb.innerHTML = `<img src="${e.photos[+el.dataset.v]}" alt="Foto"><button class="iconbtn" data-act="closelb" aria-label="Cerrar">${I.x}</button>`; lb.hidden = false; },
  closelb: () => { $('#lightbox').hidden = true; $('#lightbox').innerHTML = ''; },
  archtab: (el) => { U.archTab = el.dataset.v; render(); },
  favonly: () => { U.favOnly = !U.favOnly; render(); },
  calnav: (el) => { let m = U.calM + +el.dataset.v, y = U.calY; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } U.calM = m; U.calY = y; U.calDay = null; render(); },
  calday: (el) => { U.calDay = U.calDay === el.dataset.v ? null : el.dataset.v; render(); },
  pixnav: (el) => { U.pixY += +el.dataset.v; render(); },
  pixday: (el) => { const k = el.dataset.v; U.archTab = 'mes'; U.calY = +k.slice(0, 4); U.calM = +k.slice(5, 7) - 1; U.calDay = k; render(); },
  swatch: (el) => { U.newColor = el.dataset.v; document.querySelectorAll('.swatch').forEach(s => s.setAttribute('aria-pressed', s.dataset.v === U.newColor)); },
  delprompt: (el) => { if (!confirm('¿Borrar esta consigna? Las entradas que la usaron quedan como escritura libre.')) return; D.customPrompts = D.customPrompts.filter(p => p.id !== el.dataset.id); persist(true); render(); },
  'export-json': () => exportJSON(),
  'export-md': () => exportMD(),
  lock: () => { if (D.settings.pinHash) { U.locked = true; U.pin = ''; renderLock(); } },
  pinoff: () => { if (!confirm('¿Quitar el PIN?')) return; D.settings.pinHash = null; D.settings.pinSalt = null; persist(true); render(); toast('PIN quitado.'); },
  key: (el) => { if (U.pin.length >= 6) return; U.pin += el.dataset.v; renderLock(); if (U.pin.length >= 4) tryUnlockSilent(); },
  keydel: () => { U.pin = U.pin.slice(0, -1); renderLock(); },
  unlock: () => tryUnlock(),
  install: async () => { if (!U.installEvt) return; U.installEvt.prompt(); await U.installEvt.userChoice.catch(() => {}); U.installEvt = null; render(); }
};
async function tryUnlockSilent() { const h = await hashPin(U.pin, D.settings.pinSalt); if (h === D.settings.pinHash) { U.locked = false; U.pin = ''; renderLock(); } else if (U.pin.length >= 6) tryUnlock(); }

/* ---------- eventos ---------- */
document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-act]'); if (!el) return;
  if (el.closest('#lightbox') && el.dataset.act !== 'closelb') return;
  const fn = ACTIONS[el.dataset.act]; if (!fn) return;
  if (el.tagName === 'A') ev.preventDefault();
  fn(el, ev);
});
$('#lightbox').addEventListener('click', ev => { if (ev.target.id === 'lightbox') ACTIONS.closelb(); });
document.addEventListener('input', ev => {
  const id = ev.target.id, d = D.draft;
  if (id === 'q') { U.query = ev.target.value; if (U.query.trim()) { U.view = 'buscar'; $('#view').innerHTML = viewBuscar(); renderSide(); } else go('inicio'); return; }
  if (!d) return;
  if (id === 'fbody') { d.body = ev.target.value; updateCount(); persist(); }
  else if (id === 'ftitle') { d.title = ev.target.value; persist(); }
  else if (id === 'fdate') { d.date = ev.target.value || todayIso(); persist(); }
  else if (id === 'fopen') { d.openAt = ev.target.value; persist(); }
});
document.addEventListener('change', async ev => {
  const id = ev.target.id, d = D.draft;
  if (id === 'imp' && ev.target.files[0]) { importFile(ev.target.files[0]); ev.target.value = ''; return; }
  if (id === 'psel' && d) { d.promptId = ev.target.value; persist(); render(); return; }
  if (id === 'fseal' && d) { d.sealed = ev.target.checked; if (d.sealed && !d.openAt) d.openAt = iso(addDays(new Date(), 365)); persist(); render(); return; }
  if (id === 'sgoal') { D.settings.dailyGoal = Math.max(0, +ev.target.value || 0); persist(true); toast('Meta guardada.'); return; }
  if (id === 'smonth') { D.settings.monthlyGoal = Math.min(31, Math.max(1, +ev.target.value || 20)); persist(true); renderRight(); toast('Meta guardada.'); return; }
  if (id === 'fphotos' && d) {
    const files = Array.from(ev.target.files || []).slice(0, MAX_PHOTOS - d.photos.length);
    for (const f of files) { try { d.photos.push(await compressImage(f)); } catch (e) { toast('No pude leer una de las fotos.'); } }
    persist(); render();
  }
});
document.addEventListener('keydown', ev => {
  if (U.locked) {
    if (/^[0-9]$/.test(ev.key)) { ACTIONS.key({ dataset: { v: ev.key } }); ev.preventDefault(); }
    else if (ev.key === 'Backspace') { ACTIONS.keydel(); ev.preventDefault(); }
    else if (ev.key === 'Enter') { tryUnlock(); ev.preventDefault(); }
    return;
  }
  if (ev.key === 'Escape') { if (!$('#lightbox').hidden) ACTIONS.closelb(); else if (U.focus) setFocus(false); return; }
  if (ev.target.id === 'ftag' && D.draft) {
    if (ev.key === 'Enter' || ev.key === ',') {
      ev.preventDefault(); const t = normTag(ev.target.value);
      if (t && !D.draft.tags.includes(t)) { D.draft.tags.push(t); persist(); }
      render(); $('#ftag').focus();
    } else if (ev.key === 'Backspace' && !ev.target.value && D.draft.tags.length) { D.draft.tags.pop(); persist(); render(); $('#ftag').focus(); }
  }
  if ((ev.metaKey || ev.ctrlKey) && ev.key === 's' && U.view === 'escribir') { ev.preventDefault(); saveDraftAsEntry(); }
});
document.addEventListener('focusout', ev => {
  if (ev.target.id === 'ftag' && D.draft && ev.target.value.trim()) {
    const t = normTag(ev.target.value); if (t && !D.draft.tags.includes(t)) { D.draft.tags.push(t); ev.target.value = ''; persist(); }
  }
});
document.addEventListener('submit', async ev => {
  ev.preventDefault();
  if (ev.target.id === 'newprompt') {
    const cat = $('#npcat').value.trim(), text = $('#nptext').value.trim(); if (!cat || !text) return;
    D.customPrompts.push({ id: 'c' + uid(), cat, text, bg: U.newColor, word: starWord(cat), custom: true });
    persist(true); render(); toast('Consigna creada.');
  }
  if (ev.target.id === 'pinform') {
    const a = $('#pin1').value, b = $('#pin2').value;
    if (!/^[0-9]{4,6}$/.test(a)) return toast('El PIN tiene que tener de 4 a 6 números.');
    if (a !== b) return toast('Los PIN no coinciden.');
    D.settings.pinSalt = uid(); D.settings.pinHash = await hashPin(a, D.settings.pinSalt);
    persist(true); render(); toast('PIN activado.');
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { U.hiddenAt = Date.now(); if (saveTimer) persist(true); }
  else if (D.settings.pinHash && U.hiddenAt && Date.now() - U.hiddenAt > LOCK_AFTER_MS) { U.locked = true; U.pin = ''; renderLock(); }
});
window.addEventListener('pagehide', () => { if (saveTimer) persist(true); });
document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && U.focus) setFocus(false); });
matchMedia('(prefers-color-scheme: light)').addEventListener && matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { if (D.settings.theme === 'auto') applyTheme(); });
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); U.installEvt = e; if (U.view === 'ajustes') render(); });

/* ---------- arranque ---------- */
(async function init() {
  const loaded = await loadData();
  if (loaded) { D = Object.assign(DEFAULT_DATA(), loaded); D.settings = Object.assign(DEFAULT_DATA().settings, loaded.settings || {}); D.entries = (D.entries || []).map(normalizeEntry).filter(Boolean); D.customPrompts = D.customPrompts || []; }
  // marcar cápsulas abiertas como vistas recién cuando se leen
  const origOpen = ACTIONS.open;
  ACTIONS.open = el => { const e = D.entries.find(x => x.id === el.dataset.id); if (e && e.openAt && e.openAt <= todayIso() && !e.opened) { e.opened = true; persist(true); } origOpen(el); };
  if (!loaded) persist(true);
  U.locked = !!D.settings.pinHash;
  applyTheme();
  $('#today').textContent = longDate(todayIso());
  if (draftHasContent(D.draft) && location.hash === '#escribir') U.view = 'escribir';
  render();
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
})();
