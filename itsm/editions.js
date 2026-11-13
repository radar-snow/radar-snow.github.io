/* Radar ITSM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-13",
      period: "release Brazil (set a nov/2026, edição de estreia)",
      summary: [
        { tag: "ação", module: "warn", html: "<strong>Upgrade para Brazil ativa novas ACLs:</strong> o plugin ITSM Enhanced Security Features passa a ser ativado automaticamente e aplica regras \"deny unless authenticated\" em várias tabelas de ITSM." },
        { tag: "change", module: "secops", html: "<strong>Change ganha agentes de IA autônomos:</strong> criação de change a partir de conversa, sugestão de CI, de template e de plano, e avaliação de qualidade que grava nota e score sozinha." },
        { tag: "incident", module: "secops", html: "<strong>Incidente em On-hold aguardando o usuário pode se resolver sozinho</strong> depois de 3 tentativas de contato (configurável)." },
        { tag: "novo", module: "secops", html: "<strong>Apps novos:</strong> L1 IT Service Desk AI Specialist, que resolve incidentes L1 de ponta a ponta, e ITSM MCP Server, que conecta clientes de IA via MCP." },
        { tag: "deprecação", module: "warn", html: "Tópicos pré-prontos do Virtual Agent de ITSM entram em preparação para descontinuação, e Workforce Optimization for ITSM será descontinuado." }
      ],
      items: [
        {
          module: "secops", subs: ["Upgrade e segurança"], alert: true,
          kicker: "Change e Incident · upgrade para Brazil",
          title: "ITSM Enhanced Security Features passa a ser ativado no upgrade",
          rows: [
            ["O que mudou", "O plugin <code>com.snc.itsm.enhanced_security</code> agora é ativado automaticamente no upgrade para Brazil. Antes, ele só vinha ativo em instâncias novas. Ele adiciona regras de ACL \"deny unless authenticated\" em várias tabelas de ITSM. O plugin Change Management - Collision Detector (<code>com.snc.change.collision</code>) também passa a ser ativado no upgrade."],
            ["Por que importa", "Qualquer coisa que hoje lê tabelas de ITSM sem autenticação (páginas públicas, widgets, integrações antigas) pode parar de funcionar depois do upgrade."],
            ["Se precisar voltar", "A ServiceNow orienta abrir chamado no suporte para receber a lista de ACLs a desativar por tabela. Como último recurso, o suporte roda um script que desativa todas as ACLs novas."]
          ],
          suggestion: "Antes do upgrade, rode o Brazil num clone e teste portais públicos, páginas de status, integrações e relatórios agendados que tocam incident, change e tabelas relacionadas. Liste o que quebrou antes de pedir qualquer reversão: manter as ACLs novas é o mais seguro.",
          sources: [
            { title: "Change Management release notes · Brazil", url: RN + "change-management-rn.html", note: "docs oficiais" },
            { title: "Incident Management release notes · Brazil", url: RN + "incident-management-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Change", "IA (Otto)"],
          kicker: "ServiceNow Otto for ITSM · Brazil e versão 19.0",
          title: "Change Management com agentes de IA autônomos",
          rows: [
            ["O que mudou", "<ul><li><strong>Create change request AI agent:</strong> cria a change a partir de uma conversa, escolhendo sozinho o modelo e o template.</li><li><strong>Change CI suggestion AI agent:</strong> preenche o CI principal e os CIs afetados.</li><li><strong>Change request plans AI agent:</strong> rascunha os campos de plano na fase de readiness, seguindo uma change policy.</li><li><strong>Change template suggestion AI agent:</strong> sugere o template e o modelo mais adequados com base no histórico.</li><li>A avaliação de qualidade da change ganhou um <strong>modo autônomo</strong>: grava a nota e a explicação como work note e cria um registro na tabela AI Change Quality Scores, sem alterar campos da change.</li><li>No Patch 1 / versão 19.0, a busca por changes parecidas passou a considerar só as que atingem um score mínimo de qualidade.</li></ul>"],
            ["Requisito", "O ServiceNow Otto for ITSM é instalado pela ServiceNow Store."]
          ],
          suggestion: "Comece pelo modo autônomo de avaliação de qualidade: ele não altera a change, só registra nota e explicação. É um jeito seguro de medir a qualidade das changes do time antes de liberar agentes que criam ou preenchem registros.",
          sources: [
            { title: "ServiceNow Otto for ITSM release notes · Brazil", url: RN + "now-assist-for-itsm-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Incident"],
          kicker: "Incident Management · Brazil Early Availability",
          title: "Resolução automática de incidentes aguardando o usuário",
          rows: [
            ["O que mudou", "Quando o incidente vai para On-hold com o motivo <strong>Awaiting Caller Information</strong>, o usuário recebe notificações em um número de tentativas e intervalos configuráveis, contados em dias úteis. Se ele comentar no portal ou responder o e-mail, o incidente volta para In Progress e o agente é avisado. Se não responder, o incidente é resolvido com o código <strong>Resolved - No response from caller</strong>."],
            ["Configuração", "O padrão é 3 tentativas. Uma propriedade de incidente controla o número de tentativas (0 desliga a automação) e outra controla o intervalo entre elas."],
            ["Também nesta release", "Um scheduled job instala automaticamente apps como o Major Incident Management, se houver entitlement, mas só em instâncias novas provisionadas por zboot."]
          ],
          suggestion: "Ótimo para reduzir a fila de incidentes parados \"esperando o usuário\". Alinhe com o service desk o número de tentativas e o texto da notificação, e acompanhe por algumas semanas quantos chamados fecham com \"No response from caller\" para evitar fechamentos indevidos.",
          sources: [
            { title: "Incident Management release notes · Brazil", url: RN + "incident-management-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Apps novos", "IA (Otto)"],
          kicker: "IT Service Management · release Brazil",
          title: "L1 IT Service Desk AI Specialist e ITSM MCP Server",
          rows: [
            ["O que é", "<ul><li><strong>L1 IT Service Desk AI Specialist:</strong> um \"trabalhador\" autônomo que investiga e resolve incidentes L1 repetitivos de ponta a ponta, sem intervenção humana. Para incidentes que na verdade são pedidos, ele propõe o item de requisição adequado (ex.: acesso a software).</li><li><strong>ITSM MCP Server:</strong> conecta um cliente de IA compatível com Model Context Protocol (MCP) à ServiceNow. Agentes e gestores de TI trabalham incidentes e changes, e usuários consultam e gerenciam os próprios chamados.</li></ul>"],
            ["Por que importa", "É a primeira vez que a ServiceNow documenta um agente que resolve incidentes L1 sozinho, e uma porta oficial para assistentes de IA externos operarem ITSM."]
          ],
          suggestion: "Para o L1 AI Specialist, escolha 2 ou 3 tipos de incidente de alto volume e baixa complexidade (reset de senha, acesso a software) como piloto e defina antes o que ele pode resolver sozinho. Para o MCP Server, envolva segurança da informação: é uma nova porta de acesso aos dados de ITSM.",
          sources: [
            { title: "IT Service Management release notes · Brazil", url: RN + "it-service-management-rn-landing.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Deprecações", "Service Operations Workspace"], alert: true,
          kicker: "Virtual Agent, Workforce Optimization e SOW",
          title: "O que está saindo ou mudando de lugar",
          rows: [
            ["Em descontinuação", "<ul><li>Os <strong>tópicos pré-prontos de NLU do Virtual Agent de ITSM</strong> entram em preparação para descontinuação a partir da Brazil.</li><li>O <strong>ITSM Virtual Agent Conversation Topics Lite</strong> (<code>com.snc.itsm.virtualagent.lite</code>) também está nesse caminho.</li><li><strong>Workforce Optimization for ITSM</strong> é suportado na Brazil, mas será descontinuado numa release futura.</li></ul>"],
            ["Service Operations Workspace", "Na Brazil, a versão padrão do SOW for ITSM é a 9.5, instalada automaticamente no upgrade. Ela descontinua o Migration Utility do SOW e coloca o conhecimento anexado como related list padrão na aba Related records."]
          ],
          suggestion: "Se o service desk usa os tópicos prontos do Virtual Agent ou o Workforce Optimization, coloque a substituição no roadmap de 2027 agora. Vale perguntar ao account team qual é o caminho recomendado (as release notes apontam para as experiências com IA).",
          sources: [
            { title: "ServiceNow Otto for ITSM release notes · Brazil", url: RN + "now-assist-for-itsm-rn.html", note: "docs oficiais" },
            { title: "IT Service Management release notes · Brazil", url: RN + "it-service-management-rn-landing.html", note: "docs oficiais" },
            { title: "Service Operations Workspace for ITSM release notes · Brazil", url: RN + "service-operations-workspace-itsm-rn.html", note: "docs oficiais" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais da família Brazil. Os tutoriais (\"Como aplicar\") e o guia de integrações deste módulo entram nas próximas versões. Datas de GA da Brazil não aparecem nas fontes consultadas."
    }
  ],
  events: []
};
