/* Radar APM/EA — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
var D = "https://www.servicenow.com/docs/r/";
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-13",
      period: "release Brazil até o Patch 1 (edição de estreia)",
      summary: [
        { tag: "MCP", module: "secops", html: "<strong>MCP for Enterprise Architecture (GA):</strong> consulte aplicações, capacidades, relações e racionalização pelo assistente de IA." },
        { tag: "IA", module: "secops", html: "<strong>Agente de consulta de EA</strong> agora responde o impacto de um CI de infraestrutura nas aplicações e capacidades de negócio." },
        { tag: "ação", module: "warn", html: "<strong>Sistemas de IA x aplicações de negócio:</strong> novo plugin no AI Control Tower e um job de migração para quem usava a integração antes da versão 10.1.3." }
      ],
      items: [
        {
          module: "secops", subs: ["MCP", "IA (Otto)"],
          kicker: "Enterprise Architecture · Brazil Patch 1",
          title: "MCP for Enterprise Architecture disponível para todos",
          rows: [
            ["O que mudou", "Consulte insights de aplicações de negócio, mapeamento de capacidades, relações de arquitetura e dados de racionalização a partir do assistente de IA, sem abrir a instância. O app é o MCP for Enterprise Architecture (<code>sn_ea_mcp_server</code>)."],
            ["Por que importa", "Arquitetos e líderes de TI conseguem perguntas rápidas (\"quais aplicações suportam a capacidade X?\") sem navegar pelo workspace."]
          ],
          suggestion: "Monte com os arquitetos uma lista de perguntas frequentes e teste no assistente. A doc oficial tem uma página de exemplos de prompts que ajuda a começar.",
          howto: [
            { featured: true, title: "instalar e ativar o MCP for Enterprise Architecture", release: "Brazil Patch 1",
              basis: "Procedimento \"Install MCP for Enterprise Architecture\" da documentação oficial.",
              prereqs: ["Role <code>admin</code>.", "Plugins MCP Server (<code>com.sn_mcp_server</code>) e ServiceNow Otto for Enterprise Architecture (<code>com.sn.ea.gen.ai</code>) instalados.", "Entitlement do app (confira na ficha da Store as dependências e a compatibilidade)."],
              path: "All &gt; MCP Server Console",
              steps: ["Instale o app <strong>MCP for Enterprise Architecture</strong> pela ServiceNow Store.", "Vá em All &gt; MCP Server Console.", "Ative o servidor <strong>MCP for Enterprise Architecture</strong>.", "Conecte o assistente de IA ao servidor."],
              note: "<em>Sugestão:</em> se a empresa usa o AI Control Tower, defina uma política de acesso para o cliente MCP antes de liberar, limitando às ferramentas de consulta.",
              docUrl: D + "application-portfolio-management/install-mcp-for-ea.html" }
          ],
          sources: [
            { title: "Enterprise Architecture release notes · Brazil", url: RN + "enterprise-architecture-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["IA (Otto)", "Impacto"],
          kicker: "Enterprise Architecture · Brazil Patch 1",
          title: "Agente de consulta de EA analisa impacto de infraestrutura",
          rows: [
            ["O que mudou", "Pergunte ao <strong>Enterprise Architecture query agent</strong> qual o impacto de um CI de infraestrutura (banco de dados, instância de banco, servidor ou storage). Ele segue as relações do CMDB até os application services, aplicações de negócio e capacidades que dependem dele. Também responde de qual infraestrutura uma aplicação depende."],
            ["Também nesta versão", "A skill de <strong>Business application insights</strong> do Otto pode ser disparada automaticamente ao abrir a aplicação ou só quando o usuário pede (aba Define trigger no AI Admin Hub)."]
          ],
          suggestion: "Ótimo para janelas de mudança de infraestrutura: antes de desligar um servidor ou migrar um banco, pergunte ao agente quais capacidades de negócio são afetadas. A qualidade da resposta depende das relações do CMDB estarem corretas.",
          sources: [
            { title: "Enterprise Architecture release notes · Brazil", url: RN + "enterprise-architecture-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Governança de IA", "Upgrade"], alert: true,
          kicker: "Enterprise Architecture for AICT · Brazil Patch 1",
          title: "Sistemas de IA ligados a aplicações de negócio, mesmo sem o EA Workspace",
          rows: [
            ["O que mudou", "O novo plugin <strong>Enterprise Architecture for AICT</strong> associa sistemas de IA a aplicações de negócio no AI Control Tower, mesmo sem usar o Enterprise Architecture Workspace. Ele tem modelo de dados próprio e é instalado como dependência do AI Control Tower Core (<code>app-ai-governance</code>). Uma aba Business portfolio no AI Control Tower mostra a adoção de IA no portfólio de aplicações."],
            ["Ação no upgrade", "Quem ativou a integração com o AI Control Tower numa versão do EA Workspace anterior à <strong>10.1.3</strong> deve rodar o job <strong>Migrate BA Product Model Map from EA Workspace</strong> depois do upgrade, para levar as associações existentes ao novo modelo de dados. A doc pede para revisar as considerações de instalação e upgrade do plugin antes."]
          ],
          suggestion: "A aba Business portfolio responde uma pergunta que a governança de IA costuma ter: quais aplicações de negócio já usam IA. Inclua o job de migração no checklist do upgrade se a integração foi ativada antes da 10.1.3.",
          sources: [
            { title: "Enterprise Architecture release notes · Brazil", url: RN + "enterprise-architecture-rn.html", note: "docs oficiais" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais de Enterprise Architecture (antigo Application Portfolio Management) da família Brazil. O guia de integrações deste módulo entra numa próxima versão."
    }
  ],
  events: []
};
