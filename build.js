// Gera index.html (GitHub Pages) a partir de boletim-secops-irm.html (fonte do Artifact no Claude).
// O Artifact recebe o cabeçalho HTML automaticamente; aqui ele é acrescentado à mão.
// Uso: node build.js
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'boletim-secops-irm.html'), 'utf8');
const head = [
  '<!doctype html>',
  '<html lang="pt-BR">',
  '<head>',
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
  '<meta name="description" content="Novidades oficiais da ServiceNow sobre Security Operations e Integrated Risk Management, com casos de uso, tutoriais e guia de integrações.">',
  '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font-size:14px}img{max-width:100%}</style>',
  '</head>',
  '<body>',
  ''
].join('\n');
fs.writeFileSync(path.join(__dirname, 'index.html'), head + src + '\n</body>\n</html>\n');
console.log('index.html gerado');
