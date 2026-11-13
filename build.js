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
  { slug: 'secops-irm', title: 'Radar SecOps & IRM', short: 'SecOps & IRM', label: 'Security Operations & Integrated Risk Management',
    lede: 'Novidades oficiais da ServiceNow, resumidas e com casos de uso, um guia de instalação das integrações mais usadas e o acompanhamento de Armis & Veza. Cada item traz o link da fonte. Os blocos roxos marcados como <strong>sugestão</strong> são interpretação, não afirmação da ServiceNow.',
    desc: 'Vulnerability Response/USEM, SIR, Threat Intelligence, Policy & Compliance, Risk, TPRM e BCM. Inclui guia de integrações e Armis & Veza.',
    mods: [['secops', 'SecOps', 'Security Operations'], ['irm', 'IRM', 'Integrated Risk Management']] },
  { slug: 'itsm', title: 'Radar ITSM', short: 'ITSM', label: 'IT Service Management', lede: LEDE_BASE,
    desc: 'Incident, Problem, Change, Request, Service Catalog, Service Operations Workspace e Otto for ITSM.',
    mods: [['secops', 'ITSM', 'IT Service Management']] },
  { slug: 'ham', title: 'Radar HAM', short: 'HAM', label: 'Hardware Asset Management', lede: LEDE_BASE,
    desc: 'Ciclo de vida de hardware, inventário, contratos e Otto for HAM.',
    mods: [['secops', 'HAM', 'Hardware Asset Management']] },
  { slug: 'sam', title: 'Radar SAM', short: 'SAM', label: 'Software Asset Management', lede: LEDE_BASE,
    desc: 'Licenças, publishers (Microsoft, SAP, Oracle...), SaaS License Management e Otto for SAM.',
    mods: [['secops', 'SAM', 'Software Asset Management']] },
  { slug: 'fsm', title: 'Radar FSM', short: 'FSM', label: 'Field Service Management', lede: LEDE_BASE,
    desc: 'Work orders, Dispatcher Workspace, Field Service Mobile, agendamento e Schedule Optimization.',
    mods: [['secops', 'FSM', 'Field Service Management']] },
  { slug: 'hrsd', title: 'Radar HRSD', short: 'HRSD', label: 'HR Service Delivery', lede: LEDE_BASE,
    desc: 'Case and Knowledge Management, Employee Center, EmployeeWorks, Lifecycle Events e Otto for HRSD.',
    mods: [['secops', 'HRSD', 'HR Service Delivery']] }
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
    .split('{{MODS}}').join(JSON.stringify(m.mods));
}

// páginas dos módulos
const summaries = [];
for (const m of MODULES) {
  const dir = path.join(__dirname, m.slug);
  fs.writeFileSync(path.join(dir, 'index.html'), head(m.title, m.label + ': novidades oficiais da ServiceNow com casos de uso.') + render(m, '../', true) + foot);
  global.window = {};
  require(path.join(dir, 'editions.js'));
  const eds = (window.RADAR.editions || []).slice().sort((a, b) => b.id - a.id);
  summaries.push({ m, latest: eds[0], count: eds.length, hasInt: fs.existsSync(path.join(dir, 'integrations.js')), hasAV: fs.existsSync(path.join(dir, 'armis-veza.js')) });
  delete require.cache[require.resolve(path.join(dir, 'editions.js'))];
}
// versão do Artifact (SecOps & IRM)
fs.writeFileSync(path.join(__dirname, 'secops-irm', 'artifact.html'), render(MODULES[0], SITE, false));

// página inicial
const css = tpl.match(/<style>[\s\S]*?<\/style>/g).find(x => x.includes('--bg:'));
const fmt = d => { const p = d.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; };
const cards = summaries.map(({ m, latest, count, hasInt, hasAV }) => {
  const bullets = latest ? latest.summary.slice(0, 3).map(s => '<li><span class="tag t-' + s.module + '">' + s.tag + '</span> ' + s.html + '</li>').join('') : '';
  const extras = [count + (count > 1 ? ' edições' : ' edição'), hasInt ? 'guia de integrações' : '', hasAV ? 'Armis & Veza' : ''].filter(Boolean).join(' · ');
  return '<article class="mcard"><div class="mtop"><span class="label">' + m.label + '</span>' + (latest ? '<span class="when">Edição nº ' + latest.id + ' · ' + fmt(latest.date) + '</span>' : '') + '</div>' +
    '<h2><a href="' + m.slug + '/">' + m.short + '</a></h2><p class="mdesc">' + m.desc + '</p>' +
    (bullets ? '<ol class="mlist">' + bullets + '</ol>' : '') +
    '<div class="mfoot"><span class="mx">' + extras + '</span><a class="docbtn" href="' + m.slug + '/">Abrir ' + m.short + ' →</a></div></article>';
}).join('\n');
const themeBlock = tpl.match(/<div class="seg theme"[\s\S]*?<\/script>/)[0];
const homeHtml = head('Radar ServiceNow', 'Novidades oficiais da ServiceNow por módulo: SecOps & IRM, ITSM, HAM, SAM, FSM e HRSD.') +
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
.mgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.mcard{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:20px 22px;display:flex;flex-direction:column;gap:10px;min-width:0}
.mcard h2{font-size:1.6rem}
.mcard h2 a{text-decoration:none}
.mcard h2 a:hover{text-decoration:underline}
.mtop{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 12px;align-items:baseline}
.mtop .when{font-size:.82rem;color:var(--muted);font-variant-numeric:tabular-nums}
.mdesc{margin:0;color:var(--muted);font-size:.95rem}
.mlist{margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:6px;font-size:.95rem}
.mfoot{margin-top:auto;display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px dashed var(--line)}
.mx{font-size:.85rem;color:var(--muted)}
@media (max-width:820px){ .mgrid{grid-template-columns:minmax(0,1fr)} }
</style>
<div class="shell">
  <header class="top">
    <div class="toprow">
      <span class="label">ServiceNow · novidades oficiais por módulo</span>
      ${themeBlock}
    <h1>Radar ServiceNow</h1>
    <p>Um radar para cada módulo da ServiceNow: novidades oficiais resumidas, com casos de uso, tutoriais e links para as fontes. Escolha o módulo e salve o link. Cada um é atualizado toda semana.</p>
  </header>
  <main class="mgrid">
${cards}
  </main>
  <p class="notes">Fontes: documentação oficial da ServiceNow (release notes), newsroom e posts da ServiceNow na Community. Não é um produto oficial da ServiceNow. As sugestões de aplicação são interpretação e vêm marcadas como tal.</p>
</div>
` + foot;
fs.writeFileSync(path.join(__dirname, 'index.html'), homeHtml);
console.log('site gerado: ' + MODULES.map(m => m.slug).join(', ') + ' + página inicial + artifact.html');
