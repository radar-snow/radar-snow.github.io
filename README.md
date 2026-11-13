# Radar ServiceNow

Um radar para cada módulo da ServiceNow: novidades oficiais resumidas, com casos de uso, tutoriais ("Como aplicar") e links para as fontes.

**Site:** https://radar-snow.github.io/

| Módulo | Link |
|---|---|
| SecOps & IRM (com guia de integrações e Armis & Veza) | https://radar-snow.github.io/secops-irm/ |
| ITSM | https://radar-snow.github.io/itsm/ |
| HAM | https://radar-snow.github.io/ham/ |
| SAM | https://radar-snow.github.io/sam/ |
| FSM | https://radar-snow.github.io/fsm/ |
| HRSD | https://radar-snow.github.io/hrsd/ |
| SPM | https://radar-snow.github.io/spm/ |
| ITOM | https://radar-snow.github.io/itom/ |
| APM/EA | https://radar-snow.github.io/apm-ea/ |
| Otto | https://radar-snow.github.io/otto/ |
| DPM/DPR | https://radar-snow.github.io/dpm-dpr/ |
| ITAM (além de HAM e SAM) | https://radar-snow.github.io/itam/ |

Todo o conteúdo vem de fontes públicas: documentação oficial da ServiceNow, newsroom, ServiceNow Community e documentação dos fabricantes. Cada item traz o link da fonte.

## Estrutura

| Arquivo | O que é |
|---|---|
| `template.html` | Modelo único da página de módulo (visual, filtros, abas). |
| `build.js` | Gera `<módulo>/index.html`, a página inicial `index.html` e `secops-irm/artifact.html`. Rode `node build.js` depois de qualquer mudança. |
| `<módulo>/editions.js` | Edições semanais e agenda do módulo. |
| `secops-irm/integrations.js` | Guia de integrações e radar de erros (SecOps & IRM). |
| `secops-irm/armis-veza.js` | Acompanhamento Armis & Veza. |

Para criar um módulo novo: crie a pasta com um `editions.js` e acrescente o módulo na lista `MODULES` do `build.js`.

## Atualização

Tarefas agendadas no Claude pesquisam as novidades de cada módulo toda semana, atualizam os arquivos de dados, rodam `node build.js` e fazem push neste repositório.

> Não é um produto oficial da ServiceNow. As sugestões de aplicação são interpretação e vêm marcadas como tal.
