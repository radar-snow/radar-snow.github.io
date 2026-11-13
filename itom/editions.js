/* Radar ITOM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
var D = "https://www.servicenow.com/docs/r/";
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-13",
      period: "release Brazil e versões da Store até nov/2026 (edição de estreia)",
      summary: [
        { tag: "AIOps", module: "secops", html: "<strong>AIOps AI Specialist (GA em nov/2026):</strong> um \"colega\" de IA que faz a triagem de alertas, descarta ruído e sugere remediação, sem mudar nada sozinho." },
        { tag: "ação", module: "warn", html: "<strong>Service Graph Workspace descontinuado:</strong> os recursos foram para o CMDB Workspace, e alguns papéis mudaram." },
        { tag: "Discovery", module: "secops", html: "<strong>Discovery na Brazil:</strong> PowerShell 7 no MID Server e scan sem credencial com UDP e palpite de sistema operacional." },
        { tag: "MCP", module: "secops", html: "<strong>Service Mapping e Health Log Analytics via MCP:</strong> assistentes de IA consultam topologia de serviços e criam integrações em linguagem natural." }
      ],
      items: [
        {
          module: "secops", subs: ["AIOps", "IA (Otto)"],
          kicker: "AIOps AI Specialist · versão 3.0.0 (primeira versão geral, nov/2026)",
          title: "AIOps AI Specialist assume a triagem de alertas de rotina",
          rows: [
            ["O que é", "Um membro de equipe de IA que faz a triagem de alertas dentro do escopo definido: descarta alertas insignificantes, roda análise de causa raiz e de impacto e sugere opções de remediação, que um operador precisa ativar. Ele recebe o papel de Operator e é \"contratado\" como um membro humano."],
            ["Limites", "O especialista <strong>não faz mudanças autônomas</strong> no ambiente: os operadores revisam e decidem. Não é suportado em instâncias com domain separation. Ao ativar, o agentic workflow Manage Alerts Autonomously é desativado e o especialista assume o trabalho."]
          ],
          suggestion: "Comece limitando o especialista a um grupo de atribuição com muito volume e baixo risco (ex.: alertas de disco ou de rede de filiais) e compare por algumas semanas os alertas que ele descarta com o que o NOC faria.",
          howto: [
            { featured: true, title: "colocar o AIOps AI Specialist na equipe", release: "Brazil Patch 2+",
              basis: "Procedimento \"Onboard the AIOps specialist\" da documentação oficial.",
              prereqs: ["Brazil Patch 2 ou superior; ServiceNow Otto for ITOM 2.10.0+; AIOps Experience 27.2.68+; plugin AIOps AI Specialist (<code>sn_ai_aiops_force</code>) 3.0.0+.", "Uma equipe já criada na instância.", "Role <code>evt_mgmt_admin</code> ou <code>evt_aiops_manager</code>.", "Não funciona em instâncias com domain separation."],
              path: "Workspaces &gt; Service Operations Workspace &gt; Onboard a new team member",
              steps: ["No homepage do Service Operations Workspace, selecione <strong>Onboard a new team member</strong>.", "No tile <strong>AIOps AI Specialist</strong>, selecione <strong>Add to team</strong>.", "Opcional: dê um nome que diga o que ele cuida (ex.: \"NOC AI specialist\").", "Em <strong>Assignment groups</strong>, escolha grupos específicos ou <strong>All groups</strong>.", "Revise o papel atribuído (Operator, <code>evt_mgmt_operator</code>) e, se quiser, desmarque <strong>Handle unassigned alerts</strong>.", "Selecione <strong>Save</strong>."],
              note: "Depois, configure o escopo de alertas e os módulos de tarefa do especialista antes de deixá-lo trabalhar. Se o workflow Manage Alerts Autonomously estava em uso, ele é desativado na ativação.",
              docUrl: D + "it-operations-management/onboard-ai-specialist.html" }
          ],
          sources: [
            { title: "AIOps AI Specialist release notes", url: RN + "aiops-specialist-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["CMDB", "Deprecações"], alert: true,
          kicker: "CMDB · Brazil Early Availability",
          title: "Service Graph Workspace descontinuado e CMDB Workspace ampliado",
          rows: [
            ["O que mudou", "O <strong>Service Graph Workspace foi descontinuado</strong> e seus recursos passaram para o CMDB Workspace, com atualização de vários papéis (por exemplo, <code>app_service_owner</code> agora contém <code>app_service_user</code>). As tarefas de certificação podem ser reiniciadas (\"reset\"), ganharam um painel de informações importantes, anexos e um percentual de conclusão em tempo real."],
            ["Nome novo", "As experiências de IA do CMDB passaram a se chamar ServiceNow Otto, como o Duplicate CI Remediator."]
          ],
          suggestion: "Se o time usa o Service Graph Workspace no dia a dia, atualize favoritos, treinamentos e procedimentos para o CMDB Workspace, e revise quem tem quais papéis depois do upgrade.",
          sources: [
            { title: "CMDB release notes · Brazil", url: RN + "cmdb-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Discovery"],
          kicker: "Discovery · Brazil Early Availability",
          title: "PowerShell 7, scan sem credencial ampliado e mais desempenho em software",
          rows: [
            ["O que mudou", "<ul><li><strong>PowerShell 7:</strong> dois parâmetros do MID Server fazem o File-based Discovery e o Windows ADME preferirem o PowerShell 7 ao 5 no MID e nos hosts de destino.</li><li><strong>Discovery sem credencial:</strong> pode checar portas UDP (<code>mid.discovery.credentialless.include_udp_scan</code>) e arriscar o sistema operacional quando não há match exato (<code>mid.discovery.credentialless.include_os_scan_guess</code>). As duas opções vêm desligadas.</li><li>A propriedade <code>com.glide.ensurer.partitions.cmdb_ci_spkg</code> subiu de 64 para 128 no upgrade, melhorando a descoberta de software em instâncias grandes sem SAM.</li></ul>"]
          ],
          suggestion: "O palpite de sistema operacional ajuda a classificar dispositivos sem credencial (impressoras, IoT), mas pode errar. Ligue primeiro num range de teste e confira as classificações antes de ampliar.",
          sources: [
            { title: "Discovery release notes · Brazil", url: RN + "discovery-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Service Mapping", "Observabilidade", "IA (Otto)"],
          kicker: "Service Mapping 1.24.4 · Health Log Analytics 40.4.0",
          title: "Service Mapping e Health Log Analytics conversam com assistentes de IA",
          rows: [
            ["Service Mapping", "As ferramentas MCP do Service Mapping (no plugin CMDB MCP Server 1.0.0) expõem dados de serviços para clientes de IA: consultar topologia, achar lacunas de mapeamento e criar serviços em linguagem natural. Também chegou o <strong>Lightweight Service Model</strong>, que melhora o desempenho ao converter serviços Dynamic e Tag-Based."],
            ["Health Log Analytics", "<strong>Sustained Alert feedback</strong> suprime alertas de picos curtos e só avisa quando o problema persiste. O Smart Parser com IA ganhou mais transparência e testes. Administradores podem criar integrações sem MID Server por um cliente MCP, em linguagem natural."]
          ],
          suggestion: "O Sustained Alert feedback é uma vitória rápida contra a fadiga de alertas: aplique nas métricas que mais geram picos falsos e meça a queda de alertas na semana seguinte.",
          sources: [
            { title: "Service Mapping release notes", url: RN + "service-mapping-rn.html", note: "docs oficiais" },
            { title: "Health Log Analytics release notes", url: RN + "health-log-analytics-rn.html", note: "docs oficiais" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais da família Brazil e das versões da Store dos apps de ITOM. O guia de integrações deste módulo entra numa próxima versão."
    }
  ],
  events: []
};
