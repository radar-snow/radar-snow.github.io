/* Radar HAM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-13",
      period: "release Brazil (set a nov/2026, edição de estreia)",
      summary: [
        { tag: "setup", module: "secops", html: "<strong>HAM 16.0.0:</strong> instalação pelo Product Hub e uma Configuration Console que concentra toda a configuração, inclusive por conversa com IA." },
        { tag: "contratos", module: "secops", html: "<strong>Integração com Contract Management Pro:</strong> um fluxo com IA extrai dados e obrigações dos contratos assinados de hardware." },
        { tag: "IA", module: "warn", html: "<strong>Otto for HAM 5.1.0</strong> passa a suportar o Gemma. Modelos antigos do Now LLM seguem nas skills publicadas, mas não podem ser usados em desenvolvimento novo." }
      ],
      items: [
        {
          module: "secops", subs: ["Implantação"],
          kicker: "Hardware Asset Management · versão 16.0.0",
          title: "Instalação pelo Product Hub e Configuration Console",
          rows: [
            ["O que mudou", "<ul><li><strong>Product Hub:</strong> o HAM e as aplicações dependentes passam a ser instalados a partir dele, o local central dos apps incluídos na sua assinatura.</li><li><strong>Configuration Console:</strong> configura num só lugar usuários, papéis, ciclo de vida do ativo, inventário, integrações de ativos e skills de IA generativa. Grupos, usuários e o Content Service também podem ser configurados por uma interface de conversa com IA.</li></ul>"],
            ["Por que importa", "Reduz a dependência de configurações espalhadas por módulos diferentes, que é onde implantações de HAM costumam travar."]
          ],
          suggestion: "Em implantações novas ou em reorganizações de HAM, use a Configuration Console como checklist: ela mostra de forma organizada o que falta configurar em ciclo de vida, inventário e integrações.",
          sources: [
            { title: "Hardware Asset Management release notes · Brazil", url: RN + "hardware-asset-management-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Contratos"],
          kicker: "Hardware Asset Management · versão 16.0.0",
          title: "HAM integrado ao Contract Management Pro",
          rows: [
            ["O que mudou", "O HAM passa a se integrar ao Contract Management Pro para gerir o ciclo de vida dos contratos de hardware: renovações, vencimentos e obrigações. Um fluxo agêntico extrai metadados e obrigações dos documentos de contrato assinados e acompanha os compromissos de forma proativa."],
            ["Por que importa", "Contratos de leasing, garantia e manutenção de hardware costumam ficar fora do HAM, e isso gera renovações automáticas e custos inesperados."]
          ],
          suggestion: "Comece pelos contratos de leasing e garantia com vencimento nos próximos 12 meses: são os que mais geram custo inesperado. Confirme com o account team se o Contract Management Pro está incluído na sua assinatura.",
          sources: [
            { title: "Hardware Asset Management release notes · Brazil", url: RN + "hardware-asset-management-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["IA (Otto)"],
          kicker: "ServiceNow Otto for HAM · versão 5.1.0",
          title: "Otto for HAM com suporte ao Gemma e mudança nos modelos do Now LLM",
          rows: [
            ["O que é", "O Otto for HAM traz IA agêntica ao HAM: automatiza tarefas repetitivas de sourcing, reduz o tempo de resposta a pedidos de hardware e de reparo e consolida dados do ativo com análises geradas por IA. É instalado pela ServiceNow Store."],
            ["O que mudou", "A versão 5.1.0 suporta o Gemma. A partir da release de outubro de 2026, o Gemma 4 entra no Now LLM Service. Os modelos antigos continuam disponíveis para skills, agentes e fluxos já publicados, mas não podem ser usados em desenvolvimento ou configuração novos."]
          ],
          suggestion: "Se o time já criou skills ou agentes com o Otto for HAM, liste quais usam modelos antigos e planeje a revisão. Eles continuam funcionando, mas qualquer ajuste futuro vai exigir os modelos novos.",
          sources: [
            { title: "ServiceNow Otto for HAM release notes", url: RN + "servicenow-otto-for-ham-rn.html", note: "docs oficiais, atualizado em 30/09/2026" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais da família Brazil. Os tutoriais (\"Como aplicar\") e o guia de integrações deste módulo entram nas próximas versões."
    }
  ],
  events: []
};
