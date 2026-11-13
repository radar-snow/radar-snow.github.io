/* Radar ITAM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions.
   Escopo: ITAM além de HAM e SAM (que têm radares próprios): Cloud Cost, EAM, Contract Management Pro, DCNAM. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
var D = "https://www.servicenow.com/docs/r/";
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-13",
      period: "release Brazil e versões da Store até nov/2026 (edição de estreia)",
      summary: [
        { tag: "nuvem", module: "secops", html: "<strong>Cloud Cost Management 11.0:</strong> TCO juntando custo de nuvem com hardware, licenças e mão de obra, unit economics e atribuição de custo pelo CMDB." },
        { tag: "IA", module: "secops", html: "<strong>Otto for Cloud Cost Management:</strong> resumo com IA dos gastos, principais causas e as 5 maiores recomendações de economia." },
        { tag: "contratos", module: "secops", html: "<strong>Contract Management Pro 1.7.15:</strong> pedidos de contrato avulsos, envio pelo Employee Center e fluxo de renovação." },
        { tag: "EAM", module: "secops", html: "<strong>Enterprise Asset Management 11.0:</strong> importação de modelos e ativos com IA e categorias no Service Catalog." }
      ],
      items: [
        {
          module: "secops", subs: ["Cloud Cost"],
          kicker: "Cloud Cost Management · versão 11.0.0",
          title: "Custo total (TCO), unit economics e custo de nuvem atribuído pelo CMDB",
          rows: [
            ["O que mudou", "<ul><li><strong>TCO</strong> das aplicações de negócio, somando custos de nuvem a hardware, licenças de software e mão de obra.</li><li><strong>Unit Economics:</strong> carregue dados de negócio (receita, unidades, margem) para comparar com o custo de nuvem. A visão Business Insights mostra tendências por dono de aplicação, aplicação, departamento, unidade de negócio e centro de custo.</li><li><strong>Fonte de tag category:</strong> deriva o contexto de negócio das relações do CMDB, sem marcar recurso por recurso em cada provedor.</li><li>Visões salvas e compartilháveis no Spend analytics, e um workspace reorganizado.</li></ul>"],
            ["Por que importa", "Tira o FinOps da planilha: o custo de nuvem passa a aparecer na mesma taxonomia de aplicações que a TI já mantém no CMDB."]
          ],
          suggestion: "Se o tagueamento nos provedores é inconsistente (o normal), o mapeamento pelo CMDB resolve boa parte da atribuição. Comece pelas 10 aplicações mais caras e confira se a relação aplicação x recurso no CMDB está correta.",
          howto: [
            { featured: true, title: "atribuir custo de nuvem pelo CMDB (tag category source)", release: "Cloud Cost Management 11.0",
              basis: "Procedimento \"Select a tag category source\" da documentação oficial.",
              prereqs: ["Role <code>insights_admin</code> (<code>sn_clin_core.insights_admin</code>)."],
              path: "Cloud Cost Management Workspace &gt; Operations &gt; Cost usage tags &gt; Tag category source",
              steps: ["Abra a tela <strong>Tag category source</strong> no workspace.", "No campo <strong>Tag source category</strong>, escolha <strong>CMDB-driven cloud mapping</strong> (ou Cloud provider tags, para usar as tags nativas).", "Escolha a entidade: <strong>Application service</strong>, <strong>Business application</strong> ou <strong>Custom table</strong> (filha de Application service com coluna própria para o valor da tag).", "Para Application service e Business application, a tabela vem selecionada. Para Custom table, escolha a tabela e a coluna.", "Salve a configuração."],
              note: "A fonte escolhida define como as tags são derivadas nos downloads de faturamento e como os custos são agrupados em análises, previsões e recomendações.",
              docUrl: D + "it-asset-management/cloud-cost-management/select-tag-category-source.html" }
          ],
          sources: [
            { title: "Cloud Cost Management release notes", url: RN + "cloud-cost-management-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Cloud Cost", "IA (Otto)"],
          kicker: "ServiceNow Otto for Cloud Cost Management · versão 1.0.0",
          title: "Resumo dos gastos de nuvem com IA",
          rows: [
            ["O que mudou", "O botão <strong>Summarize</strong> gera um resumo das tendências de gasto, principais causas de custo e aderência ao orçamento, conforme os filtros e agrupamentos escolhidos. Mostra a variação mês a mês, a cobertura de compromissos (reservas) e as 5 principais recomendações de redução de custo. Plugin: <code>com.sn_now_assist_ccm</code>."]
          ],
          suggestion: "Use o resumo como relatório mensal de FinOps para a gestão: filtre por unidade de negócio, gere o resumo e anexe as recomendações à pauta.",
          sources: [
            { title: "ServiceNow Otto for Cloud Cost Management release notes", url: RN + "servicenow-otto-ccm-rn-static.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Contratos"],
          kicker: "Contract Management Pro · versão 1.7.15",
          title: "Pedidos de contrato avulsos e fluxo de renovação",
          rows: [
            ["O que mudou", "<ul><li><strong>Pedidos avulsos:</strong> crie um pedido de contrato sem vínculo com requisição de compra ou sourcing, a partir do Contract Workspace, de outros workspaces ou do Employee Center (Help Center &gt; Contracts), com formulários prontos para novo contrato, aditivo e renovação.</li><li><strong>Renovação:</strong> tipo de pedido Renewal para contratos a vencer ou vencidos. Após a assinatura, nasce um novo registro ligado ao anterior, com o histórico completo da cadeia de renovações.</li><li>Quem tem o papel <code>sn_cm_core.contract_report_viewer</code> passa a ver o dashboard de contratos, com filtro por tipo de pedido.</li></ul>"]
          ],
          suggestion: "O pedido pelo Employee Center tira os contratos do e-mail: áreas de negócio pedem renovações e aditivos num formulário padrão, e o time de contratos ganha fila e histórico.",
          sources: [
            { title: "Contract Management Pro release notes", url: RN + "contract-management-pro-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["EAM", "Data center"],
          kicker: "Enterprise Asset Management 11.0 e 11.0.1 · Data Center and Network Asset Management 13.0",
          title: "EAM com importação assistida por IA e catálogo organizado",
          rows: [
            ["EAM", "A 11.0.0 trouxe importação em massa de modelos e ativos corporativos assistida por IA, templates para importação manual e instalação pelo Admin Home. A 11.0.1 permite criar <strong>categorias de catálogo corporativo</strong> no Service Catalog. O menu Product catalogs passou a se chamar Product catalog items."],
            ["Data center e rede", "O Data Center and Network Asset Management 13.0 (<code>sn_dcnam</code>) inclui os recursos de EAM e de Telecommunications Network Inventory, com release notes próprias para cada um."]
          ],
          suggestion: "A importação assistida por IA acelera a carga inicial de ativos não-TI (equipamentos, veículos, ferramentas), que costuma vir de planilhas despadronizadas.",
          sources: [
            { title: "Enterprise Asset Management release notes", url: RN + "enterprise-asset-management-rn.html", note: "docs oficiais" },
            { title: "Data Center and Network Asset Management release notes", url: RN + "data-center-and-network-asset-management-release-notes-rn.html", note: "docs oficiais" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais. HAM e SAM têm radares próprios; aqui ficam os demais produtos de IT Asset Management. O guia de integrações deste módulo entra numa próxima versão."
    }
  ],
  events: []
};
