# Radar SecOps & IRM

Portal com novidades oficiais da ServiceNow sobre **Security Operations** e **Integrated Risk Management**, com resumos, casos de uso, tutoriais ("Como aplicar") e um guia de instalação e troubleshooting das integrações mais usadas.

Todo o conteúdo vem de fontes públicas: documentação oficial da ServiceNow, newsroom, ServiceNow Community e documentação dos fabricantes. Cada item traz o link da fonte e, no guia de integrações, o nível de confiança da informação.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Página publicada no GitHub Pages (gerada por `build.js`). |
| `boletim-secops-irm.html` | Fonte da página (a mesma usada no Artifact do Claude). |
| `editions.js` | Dados das edições semanais e da agenda. |
| `integrations.js` | Dados do guia de integrações e do radar de erros. |
| `build.js` | Gera `index.html` a partir de `boletim-secops-irm.html`: `node build.js`. |

## Atualização

Uma tarefa agendada no Claude roda toda segunda-feira: pesquisa as novidades, atualiza `editions.js` e `integrations.js`, publica no Artifact e faz push neste repositório.

> Não é um produto oficial da ServiceNow. As sugestões de aplicação são interpretação e vêm marcadas como tal.
