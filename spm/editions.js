/* Radar SPM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
var D = "https://www.servicenow.com/docs/r/";
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-13",
      period: "release Brazil e versões da Store até nov/2026 (edição de estreia)",
      summary: [
        { tag: "PPM", module: "secops", html: "<strong>Portfolio Insights com IA:</strong> novos cards de estouro de orçamento e de variação de custo, com causa raiz e próximos passos sugeridos." },
        { tag: "demandas", module: "secops", html: "<strong>Portfolio Planning 8.19:</strong> partição de demandas por área (Enterprise-Wide Deployment) e smart assessments na triagem de demandas." },
        { tag: "ação", module: "warn", html: "<strong>Metas com calendário fiscal</strong> (4-4-5, 13 períodos...). Trocar o calendário pode deixar targets \"stale\" e travados." },
        { tag: "IA", module: "secops", html: "<strong>MCP for SPM:</strong> assistentes de IA consultam dados de SPM em linguagem natural, agora com acesso às ferramentas por papel." }
      ],
      items: [
        {
          module: "secops", subs: ["PPM", "IA (Otto)"],
          kicker: "Project Portfolio Management · Brazil Early Availability",
          title: "Cards de estouro de orçamento e variação de custo no Portfolio Insights",
          rows: [
            ["O que mudou", "<ul><li><strong>Budget Overrun:</strong> compara a previsão do ano fiscal de cada item do plano com o orçamento aprovado e marca os que vão estourar, com análise de causa raiz por tipo de custo (taxas, esforço acima do previsto, câmbio) e ações sugeridas, como refazer a previsão com finanças ou abrir controle de mudança.</li><li><strong>Cost Variance:</strong> marca planos de custo cujo gasto real está acima ou abaixo do planejado no período, além de um limite configurável, com causas agrupadas e próximos passos.</li><li>A skill de <strong>resumo de demandas</strong> pode ser copiada e personalizada (campos, entidades relacionadas e prompt). Só uma versão fica ativa por vez.</li><li>Demandas também podem ser criadas e acompanhadas pelo Employee Slate.</li></ul>"],
            ["Por que importa", "Desvio de orçamento costuma aparecer só no fechamento. Os cards trazem o alerta e a explicação para dentro do portfólio, durante o ano."]
          ],
          suggestion: "Use o card de Budget Overrun como pauta fixa da reunião mensal de portfólio: a lista de itens marcados, com a causa raiz, já é a agenda. Defina com o PMO o limite de variação antes de ligar o Cost Variance, para não gerar alertas demais.",
          sources: [
            { title: "Project Portfolio Management release notes · Brazil", url: RN + "spm-ppm-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Demandas", "Portfolio Planning"],
          kicker: "Portfolio Planning · versão 8.19.0",
          title: "Demandas particionadas por área e smart assessments na triagem",
          rows: [
            ["O que mudou", "<ul><li><strong>Enterprise-Wide Deployment para demandas:</strong> particiona as demandas por qualquer critério (departamento, unidade de negócio). Cada usuário vê só as demandas, listas, buscas e dashboards das partições permitidas ao seu papel. Inclui \"demand experiences\" (formulário, módulos e atributos por tipo de demanda) e um dashboard por partição.</li><li><strong>Smart assessments para demandas:</strong> disparados quando a demanda vai para Screening, controlados pela propriedade <code>sn_align_ws.enable_smart_assessments</code>. O formulário ficou mais simples e aceita perguntas de texto.</li><li>A exportação do roadmap para PowerPoint passou a aceitar um intervalo de 3 anos.</li></ul>"],
            ["Por que importa", "Empresas com várias áreas usando o mesmo SPM costumam esbarrar em visibilidade: cada diretoria quer ver só o próprio funil de demandas."]
          ],
          suggestion: "Se cada diretoria tem seu processo de demanda, as \"demand experiences\" permitem formulários diferentes sem criar tabelas novas. Antes de particionar, defina com o PMO quem precisa ver todas as partições (governança, finanças).",
          sources: [
            { title: "Portfolio Planning release notes", url: RN + "portfolio-planning-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Metas e estratégia"], alert: true,
          kicker: "Strategic Planning 4.20.0 · Goal Framework for SPM 2.13.0",
          title: "Metas e targets com calendário fiscal",
          rows: [
            ["O que mudou", "Targets, desdobramentos, datas de check-in e lembretes passam a seguir calendários fiscais: Standard, 13 períodos, 4-4-5, 4-5-4 e 5-4-4. O modo é definido para toda a instância na propriedade <code>sn_gfa.calendar_type</code> (<code>gregorian</code>, o padrão, ou <code>fiscal</code>), separada da antiga <code>sn_gf.goal_calendar_type</code>."],
            ["Atenção", "Trocar o calendário pode deixar <strong>\"stale\"</strong> os targets que têm desdobramentos, e eles ficam travados até serem recuperados: rodando o job de reset ou duplicando o target (a cópia não leva comentários, work notes nem histórico). O target também não salva se o calendário fiscal tiver lacunas ou sobreposições no período."]
          ],
          suggestion: "Se a empresa reporta metas no calendário fiscal (comum em varejo com 4-4-5), essa é uma melhoria grande. Faça a troca num clone primeiro, veja quantos targets ficam stale e combine com os donos das metas quando migrar em produção.",
          sources: [
            { title: "Strategic Planning release notes", url: RN + "strategic-planning-rn.html", note: "docs oficiais" },
            { title: "Goal Framework for SPM release notes", url: RN + "goal-framework-for-spm-rn.html", note: "docs oficiais" },
            { title: "Fiscal calendar support for targets", url: D + "it-business-management/goal-framework/fiscal-calendar-goal-framework.html", note: "docs oficiais, atualizado em 02/11/2026" }
          ]
        },
        {
          module: "secops", subs: ["IA (Otto)", "Apps novos"],
          kicker: "MCP for Strategic Portfolio Management · versões 1.4.0 e 1.5.0",
          title: "Assistentes de IA consultando dados de SPM via MCP",
          rows: [
            ["O que é", "Um servidor MCP (app <code>com.sn.spm.mcp</code>, gerido pelo MCP Server Console) que conecta qualquer assistente de IA compatível com MCP à instância. Líderes de estratégia, PMO e gerentes de portfólio consultam dados de SPM em linguagem natural, sem abrir a ServiceNow. Exemplos de ferramentas: buscar metas por dono, departamento ou estratégia e gerar insights de metas com IA."],
            ["Novo na 1.5.0", "<strong>Acesso por papel:</strong> cada ferramenta é mapeada aos papéis de SPM exigidos, e o MCP Server Console aplica esse controle. <strong>Anotações</strong> (title, readOnlyHint, destructiveHint) informam ao assistente quais ferramentas só leem dados."]
          ],
          suggestion: "É um bom caminho para executivos que não entram na ServiceNow: perguntar ao assistente \"quais metas da minha área estão em risco?\". Comece só com ferramentas de leitura e revise as anotações no MCP Server Console antes de liberar.",
          sources: [
            { title: "MCP for Strategic Portfolio Management release notes", url: RN + "mcp-for-spm-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Recursos", "Apps novos"],
          kicker: "Resource Management Workspace 5.11.1 e apps da família SPM",
          title: "Encerrar alocação numa data exata e novos apps do SPM",
          rows: [
            ["O que mudou", "No Resource Management Workspace, a ação <strong>End Assignment</strong> encerra uma alocação de recurso numa data precisa, sem mexer no plano da tarefa. O esforço futuro sai e o heatmap mostra a disponibilidade real."],
            ["Apps na família SPM", "As release notes da Brazil listam também: Collaborative Work Management (tarefas, documentos e planejamento num só workspace), SPM Enterprise-Wide Deployment e Extended Security for Enterprise-Wide Deployment (partições e controles de acesso estendidos a APIs e fluxos agênticos) e Export to PowerPoint (relatórios de status de projeto em PowerPoint)."]
          ],
          suggestion: "O End Assignment resolve um pedido comum dos gerentes de recurso: liberar alguém que terminou antes sem \"bagunçar\" o cronograma do projeto. Vale treinar os gerentes de recurso, já que a ação fica no menu da linha da alocação.",
          howto: [
            { featured: true, title: "encerrar uma alocação de recurso numa data exata", release: "Brazil · Resource Management Workspace 5.11.1",
              basis: "Procedimento \"End a resource assignment\" da documentação oficial.",
              prereqs: ["Role <code>resource_user</code>.", "Funciona em linhas de alocação individuais: não vale para alocações filhas nem na visão de lista."],
              path: "Workspaces &gt; Resource Management Workspace &gt; Resource cards",
              steps: ["Abra o Resource Management Workspace e selecione o ícone de <strong>Resource cards</strong>. Abra o card do recurso.", "Expanda a visão do recurso e encontre a linha da alocação.", "No menu de contexto da linha, selecione <strong>End Assignment</strong>.", "Escolha a data de término. O padrão é a mais recente entre hoje, o início da alocação e o último lançamento de horas.", "Opcional: mude o status da alocação.", "Confirme para aplicar a nova data."],
              note: "Não são aceitas datas antes do início da alocação, depois do fim planejado da tarefa ou antes do último lançamento de horas. As horas já lançadas e a data de início não mudam.",
              docUrl: D + "it-business-management/resource-management/end-resource-assignment-rmw.html" }
          ],
          sources: [
            { title: "Resource Management Workspace release notes", url: RN + "resource-management-workspace-rn.html", note: "docs oficiais" },
            { title: "Strategic Portfolio Management release notes · Brazil", url: RN + "it-business-management-rn-landing.html", note: "docs oficiais" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais da família Brazil e das versões da Store dos apps de SPM. O guia de integrações deste módulo entra numa próxima versão."
    }
  ],
  events: []
};
