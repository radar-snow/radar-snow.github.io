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
    mods: [['secops', 'SPM', 'Strategic Portfolio Management']] },
  { slug: 'itom', sched: 'toda quinta, por volta das 9h', title: 'Radar ITOM', short: 'ITOM', label: 'IT Operations Management', lede: LEDE_BASE,
    desc: 'Discovery, Service Mapping, CMDB, Event Management/AIOps, Health Log Analytics e observabilidade.',
    mods: [['secops', 'ITOM', 'IT Operations Management']] },
  { slug: 'apm-ea', sched: 'toda quinta, por volta das 10h', title: 'Radar APM/EA', short: 'APM/EA', label: 'Application Portfolio Management e Enterprise Architecture', lede: LEDE_BASE,
    desc: 'Aplicações de negócio, capacidades, racionalização, Enterprise Architecture Workspace e MCP para EA.',
    mods: [['secops', 'APM/EA', 'Enterprise Architecture']] },
  { slug: 'otto', sched: 'toda sexta, por volta das 8h', title: 'Radar Otto', short: 'Otto', label: 'ServiceNow Otto (IA da plataforma)', lede: LEDE_BASE,
    desc: 'AI Agent Studio, AI Control Tower, AI Admin Hub/Center, AI specialists e modelos do Now LLM.',
    mods: [['secops', 'Otto', 'ServiceNow Otto']] },
  { slug: 'dpm-dpr', sched: 'toda sexta, por volta das 9h', title: 'Radar DPM/DPR', short: 'DPM/DPR', label: 'Digital Portfolio Management e Digital Product Release', lede: LEDE_BASE,
    desc: 'Portfólio digital de produtos e serviços, releases, fases, políticas e governança de lançamento.',
    mods: [['secops', 'DPM/DPR', 'Digital Portfolio e Product Release']] },
  { slug: 'itam', sched: 'toda sexta, por volta das 10h', title: 'Radar ITAM', short: 'ITAM', label: 'IT Asset Management (além de HAM e SAM)', lede: LEDE_BASE,
    desc: 'Cloud Cost Management, Enterprise Asset Management, Contract Management Pro e ativos de data center.',
    mods: [['secops', 'ITAM', 'IT Asset Management']] }
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
const ICONS = { 'secops-irm': 'ti-shield-lock', itsm: 'ti-headset', ham: 'ti-device-laptop', sam: 'ti-license', fsm: 'ti-truck', hrsd: 'ti-users', spm: 'ti-chart-dots', itom: 'ti-server-2', 'apm-ea': 'ti-sitemap', otto: 'ti-sparkles', 'dpm-dpr': 'ti-rocket', itam: 'ti-box' };
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
const tiles = summaries.map(({ m, latest }) => {
  const when = latest ? 'Atualizado em ' + fmt(latest.date) : 'Sem edições ainda';
  const next = '&#8635; ' + m.sched.replace('toda ', '').replace(', por volta das ', ' · ');
  return '<a class="tile" href="' + m.slug + '/"' + '' + '>' +
    '<i class="ti ' + ICONS[m.slug] + '" aria-hidden="true"></i>' +
    '<span class="tn">' + m.short + '</span>' +
    '<span class="tl">' + m.label + '</span>' +
    '<span class="tw">' + when + '</span>' +
    '<span class="ts">' + next + '</span></a>';
}).join('\n');
// comunicados (faixa verde no topo): editados à mão em comunicados.js
const comCtx = { window: {} };
require('vm').runInNewContext(fs.readFileSync(path.join(__dirname, 'comunicados.js'), 'utf8'), comCtx);
const allComs = (comCtx.window.RADAR_COM || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
// âncora de cada aviso na página: c-AAAA-MM-DD (com -2, -3... se houver mais de um no mesmo dia)
const comSeen = {};
allComs.slice().reverse().forEach(c => { const k = c.date || 'sem-data'; comSeen[k] = (comSeen[k] || 0) + 1; c.id = 'c-' + k + (comSeen[k] > 1 ? '-' + comSeen[k] : ''); });
const comHtml = '<section class="com" aria-labelledby="com-h">\n    <h2 id="com-h"><a href="comunicados/"><i class="ti ti-speakerphone" aria-hidden="true"></i>Comunicados</a></h2>\n    ' +
  (allComs.length
    ? '<ul>' + allComs.slice(0, 3).map(c => '<li>' + (c.date ? '<span class="cd">' + fmt(c.date) + '</span>' : '') +
        '<span class="ct"><a href="comunicados/#' + c.id + '">' + c.title + '</a></span>' +
        (c.text ? '<span class="cx">' + c.text + '</span>' : '') + '</li>').join('') + '</ul>'
    : '<p class="cx">Nenhum comunicado no momento.</p>') +
  '\n    <a class="cmore" href="comunicados/">Ver todos os comunicados &#8594;</a>\n  </section>';
const themeBlock = tpl.match(/<div class="seg theme"[\s\S]*?<\/script>/)[0];
const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css">`;

// página de comunicados
fs.mkdirSync(path.join(__dirname, 'comunicados'), { recursive: true });
const comPage = head('Radar ServiceNow · Comunicados', 'Comunicados do time sobre o Radar ServiceNow.') +
`<title>Comunicados · Radar ServiceNow</title>
<meta name="claude:viewport-fit-sides" content="cover">
${FONT_LINKS}
${css}
<style>
.shell{max-width:860px}
.clist{display:flex;flex-direction:column;gap:16px}
.citem{background:var(--surface);border:1px solid var(--line);border-left:6px solid var(--accent);border-radius:14px;padding:20px 24px;display:flex;flex-direction:column;gap:6px;scroll-margin-top:16px}
.citem:target{border-color:var(--accent);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 35%,transparent)}
.citem .cd{font-size:.85rem;color:var(--muted);font-variant-numeric:tabular-nums}
.citem h2{font-size:1.3rem}
.citem .cx{margin:0;color:var(--fg)}
.citem .cb{color:var(--muted)}
.citem .cb p{margin:.4em 0}
.citem .cl{font-weight:600;color:var(--accent)}
.cempty{color:var(--muted)}
.top h1 i{color:var(--accent);margin-right:10px}
</style>
<div class="shell">
  <header class="top">
    <div class="toprow">
      <span class="label"><a class="homelink" href="../">← Radar ServiceNow</a> · Comunicados</span>
      ${themeBlock}
    <h1><i class="ti ti-speakerphone" aria-hidden="true"></i>Comunicados</h1>
    <p>Avisos do time sobre o Radar e sobre os módulos, do mais recente para o mais antigo. Não são publicações da ServiceNow.</p>
  </header>
  <main class="clist">
${allComs.length ? allComs.map(c => `    <article class="citem" id="${c.id}">
      ${c.date ? '<span class="cd">' + fmt(c.date) + '</span>' : ''}
      <h2>${c.title}</h2>
      ${c.text ? '<p class="cx">' + c.text + '</p>' : ''}
      ${c.body ? '<div class="cb">' + c.body + '</div>' : ''}
      ${c.url ? '<a class="cl" href="' + c.url + '">Saiba mais &#8594;</a>' : ''}
    </article>`).join('\n') : '    <p class="cempty">Nenhum comunicado no momento.</p>'}
  </main>
  <p class="notes">Comunicados são escritos pelo time que mantém o Radar. As novidades da ServiceNow ficam nas páginas de cada módulo.</p>
</div>
` + foot;
fs.writeFileSync(path.join(__dirname, 'comunicados', 'index.html'), comPage);
const homeHtml = head('Radar ServiceNow', 'Novidades oficiais da ServiceNow por módulo: ' + MODULES.map(m => m.short).join(', ') + '.') +
`<title>Radar ServiceNow</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css">
<script>
/* links antigos (antes de existir um link por módulo) apontavam para SecOps & IRM */
(function(){ var h=location.hash; if(/^#(integracoes|armis-veza|arquivo|edicao-\\d+|int-[a-z0-9-]+)$/.test(h)) location.replace('secops-irm/'+h); })();
</script>
${css}
<style>
.shell{max-width:1040px;gap:36px;padding-block:48px 64px}
.brand{font-family:var(--display);font-size:clamp(2.2rem,5vw,3rem);font-weight:700;margin:0;line-height:1.05}
.brand em{font-style:normal;color:var(--bar)}
.tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.tile{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:20px;border-radius:14px;background:var(--surface);border:1px solid var(--line);text-decoration:none;color:var(--fg);transition:border-color .15s,transform .15s}
.tile:hover{border-color:var(--accent);transform:translateY(-2px)}
.tile i{font-size:28px;color:var(--accent);margin-bottom:10px}
.tn{font-family:var(--display);font-weight:700;font-size:1.35rem;line-height:1.15}
.tl{font-size:.88rem;color:var(--muted);margin-bottom:10px}
.tw{font-size:.82rem;color:var(--muted);font-variant-numeric:tabular-nums}
.ts{font-size:.78rem;color:var(--muted);font-variant-numeric:tabular-nums}
.com{--com-bg:#eef6e7;background:var(--com-bg);border:1px solid var(--accent);border-left:6px solid var(--accent);border-radius:14px;padding:18px 22px;display:flex;flex-direction:column;gap:10px}
.com h2{font-size:1.15rem}
.com h2 a{display:inline-flex;align-items:center;gap:8px;color:var(--accent);text-decoration:none}
.com h2 a:hover{text-decoration:underline}
.com h2 i{font-size:22px}
.cmore{align-self:flex-start;font-size:.9rem;font-weight:600;color:var(--accent);text-decoration:none}
.cmore:hover{text-decoration:underline}
.com ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.com li{display:grid;grid-template-columns:auto 1fr;column-gap:14px;row-gap:2px;align-items:baseline}
.com li+li{border-top:1px solid color-mix(in srgb,var(--accent) 30%,transparent);padding-top:10px}
.cd{font-size:.82rem;color:var(--muted);font-variant-numeric:tabular-nums;grid-row:span 2}
.ct{font-weight:700}
.ct a{color:inherit}
.cx{grid-column:2;color:var(--muted);font-size:.95rem}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .com{--com-bg:#12200a}}
:root[data-theme="dark"] .com{--com-bg:#12200a}
@media (max-width:520px){ .com li{grid-template-columns:1fr} .cd{grid-row:auto} .cx{grid-column:1} }
@media (max-width:520px){ .tiles{grid-template-columns:repeat(2,minmax(0,1fr))} .tile{padding:16px} .tl{display:none} }
</style>
<div class="shell">
  <header class="top">
    <div class="toprow">
      <span class="label">ServiceNow · novidades oficiais por módulo</span>
      ${themeBlock}
    <h1 class="brand">Radar<em>.</em> ServiceNow</h1>
    <p>Novidades oficiais da ServiceNow por módulo, com casos de uso, tutoriais e links para as fontes. Cada módulo é atualizado uma vez por semana, no dia e horário indicados no bloco (horário de Brasília).</p>
  </header>
  ${comHtml}
  <nav class="tiles" aria-label="Módulos">
${tiles}
  </nav>
  <p class="notes">Fontes: documentação oficial da ServiceNow (release notes), newsroom e posts da ServiceNow na Community. Não é um produto oficial da ServiceNow. As sugestões de aplicação são interpretação e vêm marcadas como tal.</p>
</div>
` + foot;
fs.writeFileSync(path.join(__dirname, 'index.html'), homeHtml);
console.log('site gerado: ' + MODULES.map(m => m.slug).join(', ') + ' + página inicial + artifact.html');
