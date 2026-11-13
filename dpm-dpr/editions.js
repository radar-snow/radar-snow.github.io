/* Radar DPM/DPR — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
var D = "https://www.servicenow.com/docs/r/";
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-13",
      period: "Digital Product Release 2.6.2 e release Brazil (edição de estreia)",
      summary: [
        { tag: "DPR", module: "secops", html: "<strong>Releases com acesso restrito ao time</strong> do produto, por registro." },
        { tag: "DPR", module: "secops", html: "<strong>Novo estado On hold</strong> para pausar uma release sem cancelar, e datas planejadas x reais por fase." },
        { tag: "DPM", module: "secops", html: "<strong>Digital Portfolio Management sem novidades na Brazil</strong>, segundo as release notes oficiais." }
      ],
      items: [
        {
          module: "secops", subs: ["DPR", "Acesso"],
          kicker: "Digital Product Release · versão 2.6.2",
          title: "Releases visíveis só para o time da release",
          rows: [
            ["O que mudou", "O acesso restrito adiciona controle por registro a releases, fases, tarefas, mapeamentos de política, datas-chave e relações entre fases. Ele é configurado por produto, na página Product Settings. Releases criadas para um produto restrito herdam a configuração, e o time do produto vira o time inicial da release. Em releases multiproduto, as releases individuais herdam o controle da principal."],
            ["Por que importa", "Lançamentos sensíveis (produto novo, aquisição, mudança regulatória) deixam de ficar visíveis para toda a empresa."]
          ],
          suggestion: "Use para produtos com lançamentos confidenciais e mantenha o time do produto enxuto. Antes de restringir, confira se os aprovadores de change e o CAB estão no time ou nos grupos, para não travar aprovações.",
          howto: [
            { featured: true, title: "restringir as releases de um produto ao time do produto", release: "Digital Product Release 2.6.2",
              basis: "Procedimento \"Configure product-level release settings\" da documentação oficial.",
              prereqs: ["Role <code>sn_dpr_model.release_admin</code> ou <code>sn_dpr_model.product_manager</code>.", "Só usuários ou grupos com o papel <code>sn_dpr_model.release_user</code> podem entrar no time."],
              path: "Workspaces &gt; Digital Product Release Workspace &gt; Products and services",
              steps: ["Abra o Digital Product Release Workspace e selecione o ícone de produtos e serviços.", "Escolha o produto ou serviço e selecione <strong>Release settings</strong>.", "Em <strong>Product team</strong>, marque <strong>Restrict access to product releases</strong>.", "Adicione usuários e grupos nos campos <strong>Users</strong> e <strong>Groups</strong>.", "Aproveite para definir os outros padrões do produto: calendários, templates, change models e classes de CI."],
              note: "Sem esses padrões, todos os registros aparecem ao criar releases. O campo Release readiness dates só aparece se a propriedade <code>sn_dpr.out_of_band_release_allowed</code> for true.",
              docUrl: D + "it-service-management/digital-product-release/dpr-config-product-release-setting.html" }
          ],
          sources: [
            { title: "Digital Product Release release notes", url: RN + "digital-product-release-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["DPR", "Ciclo de vida"],
          kicker: "Digital Product Release · versão 2.6.2",
          title: "Release em espera, datas por fase e dashboards mais limpos",
          rows: [
            ["O que mudou", "<ul><li><strong>On hold:</strong> pausa uma release por motivo de negócio sem cancelar nem perder o lugar no ciclo. Enquanto pausada, a fase atual não pode ser concluída e a progressão automática não roda.</li><li><strong>Datas planejadas e reais</strong> nas fases de releases por estágio: você informa as planejadas, e as reais são preenchidas conforme a fase avança.</li><li>Propriedades <code>sn_dpr.default_phase_for_changes</code> e <code>sn_dpr.default_phase_for_cis</code> definem a fase pré-selecionada ao associar changes e CIs.</li><li>Os gráficos dos dashboards deixam de contar políticas, tarefas e aprovações de fases canceladas ou reiniciadas.</li></ul>"]
          ],
          suggestion: "O estado On hold substitui o \"cancelar e recriar\" que muitos times fazem quando um lançamento escorrega. Combine com as datas planejadas e reais para medir atrasos por fase.",
          sources: [
            { title: "Digital Product Release release notes", url: RN + "digital-product-release-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["DPM"],
          kicker: "Digital Portfolio Management · release Brazil",
          title: "DPM sem novidades na Brazil",
          rows: [
            ["O que diz a doc", "As release notes combinadas de Digital Portfolio Management (de Yokohama até Brazil) registram <strong>\"No updates for this release\"</strong> para a Brazil, tanto em novos recursos quanto em mudanças. As últimas novidades são de Yokohama (aba Troubleshoot no DPM Admin Center, cards de solução configuráveis, KPIs) e de Zurich (tema Coral e ajustes no monitoramento de apps)."],
            ["Por que importa", "Quem está planejando o upgrade para Brazil não precisa reservar esforço para mudanças em DPM."]
          ],
          suggestion: "Se o DPM ainda não é usado, as novidades de Yokohama (KPIs por solução e o Admin Center) são um bom ponto de partida para montar a visão de portfólio digital.",
          sources: [
            { title: "Combined Digital Portfolio Management (DPM) release notes, Yokohama to Brazil", url: D + "delta-yokohama-brazil/brazil-yokohama-digitalportfoliomanagementdpm-release-notes.html", note: "docs oficiais, atualizado em 04/11/2026" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais de Digital Product Release e das release notes combinadas de Digital Portfolio Management. O guia de integrações deste módulo entra numa próxima versão."
    }
  ],
  events: []
};
