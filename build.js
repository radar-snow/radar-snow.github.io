// Radar ServiceNow — gera o site estático (GitHub Pages).
// - <modulo>/index.html para cada módulo, a partir de template.html
// - index.html na raiz: página inicial com todos os módulos
// - secops-irm/artifact.html: versão para o Artifact do Claude (sem cabeçalho HTML, links absolutos)
// Uso: node build.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SITE = 'https://ilazyfeel.github.io/radar-servicenow/';
const LEDE_BASE = 'Novidades oficiais da ServiceNow, resumidas e com casos de uso. Cada item traz o link da fonte. Os blocos roxos marcados como <strong>sugestão</strong> são interpretação, não afirmação da ServiceNow.';

const MODULES = [
  { slug: 'secops-irm', sched: 'toda segunda, por volta das 8h', title: 'Radar SecOps & IRM', short: 'SecOps & IRM', label: 'Security Operations & Integrated Risk Management',
    lede: 'Novidades oficiais da ServiceNow, resumidas e com casos de uso, um guia de instalação das integrações mais usadas e o acompanhamento de Armis & Veza. Cada item traz o link da fonte. Os blocos roxos marcados como <strong>sugestão</strong> são interpretação, não afirmação da ServiceNow.',
    desc: 'Vulnerability Response/USEM, SIR, Threat Intelligence, Policy & Compliance, Risk, TPRM e BCM. Inclui guia de integrações e Armis & Veza.',
    mods: [['secops', 'SecOps', 'Security Operations'], ['irm', 'IRM', 'Integrated Risk Management']] },
  { slug: 'itsm', sched: 'toda terça, por volta das 8h', title: 'Radar ITSM', short: 'ITSM', label: 'IT Service Management', lede: LEDE_BASE,
    desc: 'Incident, Problem, Change, Request, Service Catalog, Service Operations Workspace e Otto for ITSM.',
    mods: [['secops', 'ITSM', 'IT Service Management']] },
  { slug: 'ham', sched: 'toda quarta, por volta das 8h', title: 'Radar HAM', short: 'HAM', label: 'Hardware Asset Management', lede: LEDE_BASE,
    desc: 'Ciclo de vida de hardware, inventário, contratos e Otto for HAM.',
    mods: [['secops', 'HAM', 'Hardware Asset Management']] },
  { slug: 'sam', sched: 'toda quarta, por volta das 9h', title: 'Radar SAM', short: 'SAM', label: 'Software Asset Management', lede: LEDE_BASE,
    desc: 'Licenças, publishers (Microsoft, SAP, Oracle...), SaaS License Management e Otto for SAM.',
    mods: [['secops', 'SAM', 'Software Asset Management']] },
  { slug: 'fsm', sched: 'toda quarta, por volta das 10h', title: 'Radar FSM', short: 'FSM', label: 'Field Service Management', lede: LEDE_BASE,
    desc: 'Work orders, Dispatcher Workspace, Field Service Mobile, agendamento e Schedule Optimization.',
    mods: [['secops', 'FSM', 'Field Service Management']] },
  { slug: 'hrsd', sched: 'toda terça, por volta das 9h', title: 'Radar HRSD', short: 'HRSD', label: 'HR Service Delivery', lede: LEDE_BASE,
    desc: 'Case and Knowledge Management, Employee Center, EmployeeWorks, Lifecycle Events e Otto for HRSD.',
    mods: [['secops', 'HRSD', 'HR Service Delivery']] },
  { slug: 'spm', sched: 'toda quinta, por volta das 8h', title: 'Radar SPM', short: 'SPM', label: 'Strategic Portfolio Management', lede: LEDE_BASE,
    desc: 'Portfólio, demandas, projetos, recursos, metas e estratégia, Agile e Otto/MCP para SPM.',
    mods: [['secops', 'SPM', 'Strategic Portfolio Management']] }
];
const DATA_FILES = ['editions.js', 'integrations.js', 'armis-veza.js'];

const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const head = (title, desc) => [
  '<!doctype html>', '<html lang="pt-BR">', '<head>', '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
  '<meta name="description" content="' + desc.replace(/"/g, '&quot;') + '">',
  '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font-size:14px}img{max-width:100%}</style>',
  '</head>', '<body>', ''
].join('\n');
const foot = '\n</body>\n</html>\n';
const hash = f => crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex').slice(0, 8);

function modBtns(m) {
  if (m.mods.length < 2) return '';
  return '          <div class="seg" role="group" aria-label="Módulo">\n' +
    '            <button type="button" data-m="all" aria-pressed="true">Todos</button>\n' +
    m.mods.map(x => '            <button type="button" data-m="' + x[0] + '" aria-pressed="false">' + x[1] + '</button>\n').join('') +
    '          </div>\n';
}
function render(m, home, versioned) {
  const dir = path.join(__dirname, m.slug);
  const scripts = DATA_FILES.filter(f => fs.existsSync(path.join(dir, f)))
    .map(f => '<script src="' + f + (versioned ? '?v=' + hash(path.join(dir, f)) : '') + '"></script>').join('\n');
  return tpl.split('{{TITLE}}').join(m.title)
    .split('{{LABEL}}').join(m.label)
    .split('{{LEDE}}').join(m.lede)
    .split('{{HOME}}').join(home)
    .split('{{SCRIPTS}}').join(scripts)
    .split('{{MODBTNS}}').join(modBtns(m))
    .split('{{MODS}}').join(JSON.stringify(m.mods))
    .split('{{SCHED}}').join(m.sched);
}

// páginas dos módulos
const summaries = [];
for (const m of MODULES) {
  const dir = path.join(__dirname, m.slug);
  fs.writeFileSync(path.join(dir, 'index.html'), head(m.title, m.label + ': novidades oficiais da ServiceNow com casos de uso.') + render(m, '../', true) + foot);
  global.window = {};
  require(path.join(dir, 'editions.js'));
  const eds = (window.RADAR.editions || []).slice().sort((a, b) => b.id - a.id);
  let ints = [];
  if (fs.existsSync(path.join(dir, 'integrations.js'))) {
    global.window = {};
    require(path.join(dir, 'integrations.js'));
    ints = (window.RADAR_INT && window.RADAR_INT.items) || [];
    delete require.cache[require.resolve(path.join(dir, 'integrations.js'))];
  }
  summaries.push({ m, eds, latest: eds[0], count: eds.length, ints, hasInt: ints.length > 0, hasAV: fs.existsSync(path.join(dir, 'armis-veza.js')) });
  delete require.cache[require.resolve(path.join(dir, 'editions.js'))];
}
// versão do Artifact (SecOps & IRM)
fs.writeFileSync(path.join(__dirname, 'secops-irm', 'artifact.html'), render(MODULES[0], SITE, false));

// página inicial
const css = tpl.match(/<style>[\s\S]*?<\/style>/g).find(x => x.includes('--bg:'));
const fmt = d => { const p = d.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; };
const ICONS = { 'secops-irm': 'ti-shield-lock', itsm: 'ti-headset', ham: 'ti-device-laptop', sam: 'ti-license', fsm: 'ti-truck', hrsd: 'ti-users', spm: 'ti-chart-dots' };
const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\s+/g, ' ').trim();
const today = new Date().toISOString().slice(0, 10);
const cut = (s, n) => s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n)).replace(/[,.;:]$/, '') + '…';
// índice de busca e feed: itens de todas as edições + guias de integração
const INDEX = [];
for (const { m, eds, ints } of summaries) {
  eds.forEach((e, ei) => e.items.forEach(it => INDEX.push({
    k: 'n', mod: m.slug, short: m.short, date: e.date, ed: e.id, alert: !!it.alert,
    title: strip(it.title), kicker: strip(it.kicker), subs: it.subs,
    url: m.slug + '/' + (ei === 0 ? '' : '#edicao-' + e.id),
    hay: strip([it.title, it.kicker, it.subs.join(' '), it.rows.map(r => r[0] + ' ' + r[1]).join(' '), it.suggestion, JSON.stringify(it.howto || [])].join(' ')).toLowerCase(),
    lede: cut(strip((it.rows[0] || [])[1]), 240)
  })));
  ints.forEach(it => INDEX.push({
    k: 'g', mod: m.slug, short: m.short, title: 'Guia: ' + strip(it.name), kicker: strip(it.area), subs: [],
    url: m.slug + '/#int-' + it.id, hay: strip([it.name, it.area, it.what, it.app, (it.issues || []).map(x => x.problem).join(' ')].join(' ')).toLowerCase(), lede: cut(strip(it.what), 240)
  }));
}
// destaque da semana: item mais recente com alerta; senão, o mais recente
const news = INDEX.filter(x => x.k === 'n').sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.alert - a.alert));
const latestDate = news.length ? news[0].date : '';
const featured = news.filter(x => x.date === latestDate).sort((a, b) => b.alert - a.alert)[0] || news[0];
const rail = summaries.map(({ m, latest }) => {
  const isNew = latest && (Date.parse(today) - Date.parse(latest.date)) / 864e5 <= 7;
  return '<a class="rc" href="' + m.slug + '/"><i class="ti ' + ICONS[m.slug] + '" aria-hidden="true"></i><span class="rn">' + m.short + '</span>' +
    '<span class="rm">' + (latest ? latest.items.length + ' itens · ' + fmt(latest.date) : 'sem edições') + '</span><span class="rs">&#8635; ' + m.sched.replace('toda ', '').replace(', por volta das ', ' · ') + '</span>' + (isNew ? '<span class="dot" title="Edição nova nesta semana"></span>' : '') + '</a>';
}).join('\n');
const featHtml = featured ? '<a class="feat" href="' + featured.url + '"><span class="label fk">Destaque da semana · ' + featured.short + (featured.alert ? ' · ação' : '') + '</span><span class="ft">' + featured.title + '</span><span class="fl">' + featured.lede + '</span><span class="fgo">Abrir ' + featured.short + ' →</span></a>' : '';
const pills = '<button type="button" class="chip" data-hm="all" aria-pressed="true">Todos</button>' + summaries.map(({ m }) => '<button type="button" class="chip" data-hm="' + m.slug + '" aria-pressed="false">' + m.short + '</button>').join('');
const dataJs = 'window.RADAR_HOME=' + JSON.stringify(INDEX.map(x => Object.assign({}, x))) + ';';
const themeBlock = tpl.match(/<div class="seg theme"[\s\S]*?<\/script>/)[0];
const homeHtml = head('Radar ServiceNow', 'Novidades oficiais da ServiceNow por módulo: SecOps & IRM, ITSM, HAM, SAM, FSM, HRSD e SPM.') +
`<title>Radar ServiceNow</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap">
<script>
/* links antigos (antes de existir um link por módulo) apontavam para SecOps & IRM */
(function(){ var h=location.hash; if(/^#(integracoes|armis-veza|arquivo|edicao-\\d+|int-[a-z0-9-]+)$/.test(h)) location.replace('secops-irm/'+h); })();
</script>
${css}
<style>
.brand{font-family:var(--display);font-size:clamp(2rem,5vw,2.8rem);font-weight:700;margin:0;line-height:1.1}
.brand em{font-style:normal;color:var(--bar)}
.rail{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}
.rc{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:4px;padding:14px;border-radius:12px;background:var(--surface);border:1px solid var(--line);text-decoration:none;color:var(--fg);transition:border-color .15s,transform .15s}
.rc:hover{border-color:var(--accent);transform:translateY(-2px)}
.rc i{font-size:26px;color:var(--accent)}
.rn{font-family:var(--display);font-weight:700;font-size:1.15rem}
.rm{font-size:.8rem;color:var(--muted);font-variant-numeric:tabular-nums}
.rs{font-size:.75rem;color:var(--accent);font-variant-numeric:tabular-nums}
.dot{position:absolute;top:12px;right:12px;width:9px;height:9px;border-radius:50%;background:var(--bar)}
.feat{display:flex;flex-direction:column;gap:6px;padding:22px 24px;border-radius:12px;background:var(--surface);border:1px solid var(--line);box-shadow:inset 4px 0 0 var(--bar);text-decoration:none;color:var(--fg)}
.feat:hover{border-color:var(--accent)}
.fk{color:var(--accent)}
.ft{font-family:var(--display);font-size:clamp(1.3rem,3vw,1.8rem);font-weight:700;line-height:1.2;text-wrap:balance}
.fl{color:var(--muted);max-width:75ch}
.fgo{font-weight:600;color:var(--accent);font-size:.95rem}
.find{display:flex;flex-direction:column;gap:12px}
.sbox{display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:4px 6px 4px 18px}
.sbox:focus-within{border-color:var(--accent)}
.sbox svg{flex:none;color:var(--muted)}
.sbox input{flex:1;min-width:0;border:0;background:transparent;font:inherit;font-size:1.05rem;color:var(--fg);padding:10px 0;outline:none}
.hpills{display:flex;flex-wrap:wrap;gap:6px}
.hfeed{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:12px}
.hfeed li a{display:grid;grid-template-columns:72px 92px minmax(0,1fr);gap:12px;padding:12px 18px;text-decoration:none;color:var(--fg);border-top:1px solid var(--line)}
.hfeed li:first-child a{border-top:0}
.hfeed li a:hover{background:var(--hover)}
.hd{font-family:var(--mono);font-size:.78rem;color:var(--muted);padding-top:3px;font-variant-numeric:tabular-nums}
.hm{font-family:var(--mono);font-size:.72rem;letter-spacing:.05em;text-transform:uppercase;color:var(--accent);padding-top:3px}
.ht{font-weight:600}
.hk{display:block;font-size:.85rem;color:var(--muted)}
.hcount{font-size:.88rem;color:var(--muted)}
@media (max-width:560px){ .rail{grid-template-columns:repeat(2,minmax(0,1fr))} .hfeed li a{grid-template-columns:minmax(0,1fr)} .hd,.hm{padding-top:0} }
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css">
<div class="shell">
  <header class="top">
    <div class="toprow">
      <span class="label">ServiceNow · novidades oficiais por módulo</span>
      ${themeBlock}
    <h1 class="brand">Radar<em>.</em> ServiceNow</h1>
    <p>Novidades oficiais da ServiceNow por módulo, com casos de uso, tutoriais e links para as fontes. Cada módulo é atualizado uma vez por semana, no dia e horário indicados no card (horário de Brasília).</p>
  </header>
  <nav class="rail" aria-label="Módulos">
${rail}
  </nav>
  ${featHtml}
  <section class="find" aria-label="Buscar nas novidades">
    <label class="sbox" for="hq"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg><input id="hq" type="search" placeholder="Buscar em todos os módulos: USEM, SAP, e-signature, Tenable..." autocomplete="off"></label>
    <div class="hpills" role="group" aria-label="Filtrar por módulo">${pills}</div>
    <span class="hcount" id="hcount"></span>
    <ul class="hfeed" id="hfeed"></ul>
  </section>
<script>${dataJs}</script>
<script>
(function(){
  var D=window.RADAR_HOME||[], st={q:"",m:"all"};
  function fmt(d){ if(!d) return "guia"; var p=d.split("-"); return p[2]+"/"+p[1]; }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
  function render(){
    var q=st.q, list=D.filter(function(x){ return (st.m==="all"||x.mod===st.m) && (q ? x.hay.indexOf(q)>-1 : x.k==="n"); });
    list.sort(function(a,b){ return (b.date||"").localeCompare(a.date||"") || (b.alert-a.alert); });
    var shown=q?list:list.slice(0,12);
    document.getElementById("hcount").textContent = q ? list.length+" resultado"+(list.length===1?"":"s")+" para \\""+q+"\\"" : "Últimas novidades"+(st.m==="all"?" de todos os módulos":"");
    document.getElementById("hfeed").innerHTML = shown.length ? shown.map(function(x){
      return '<li><a href="'+x.url+'"><span class="hd">'+fmt(x.date)+'</span><span class="hm">'+esc(x.short)+'</span><span><span class="ht">'+esc(x.title)+'</span><span class="hk">'+esc(x.kicker)+'</span></span></a></li>';
    }).join("") : '<li><a href="#" onclick="return false"><span class="hd">—</span><span class="hm"></span><span class="ht">Nada encontrado. Tente outro termo ou limpe o filtro.</span></a></li>';
    document.querySelectorAll("[data-hm]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-hm")===st.m)); });
  }
  document.getElementById("hq").addEventListener("input", function(e){ st.q=e.target.value.trim().toLowerCase(); render(); });
  document.addEventListener("click", function(e){ var b=e.target.closest("[data-hm]"); if(!b) return; st.m=b.getAttribute("data-hm"); render(); });
  render();
})();
</script>
  <p class="notes">Fontes: documentação oficial da ServiceNow (release notes), newsroom e posts da ServiceNow na Community. Não é um produto oficial da ServiceNow. As sugestões de aplicação são interpretação e vêm marcadas como tal.</p>
</div>
` + foot;
fs.writeFileSync(path.join(__dirname, 'index.html'), homeHtml);
console.log('site gerado: ' + MODULES.map(m => m.slug).join(', ') + ' + página inicial + artifact.html');
