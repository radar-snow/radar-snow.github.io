/* Radar Otto — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  editions: [
    {
      id: 3,
      date: "2026-11-27",
      period: "21 a 27 de novembro de 2026",
      summary: [
        { tag: "governança", module: "secops", html: "<strong>Shadow AI documentado:</strong> o AI Proxy, embutido no Agent Client Collector, intercepta chamadas a provedores de IA nos endpoints e manda os eventos para o AI Control Tower." },
        { tag: "políticas", module: "secops", html: "<strong>Políticas do AI Control Tower</strong> bloqueiam agente, modelo ou domínio por usuário ou departamento, ou tiram um agente do ar quando há ameaça." },
        { tag: "release", module: "secops", html: "<strong>Hotfix W48</strong> saiu em 25/11 para o Brazil Patch 2 e o Patch 2m (detalhes no KB3237605 e no KB3237607, atrás de login)." },
        { tag: "tutorial", module: "secops", html: "<strong>Tutorial da semana:</strong> como criar uma política de bloqueio no AI Control Tower." }
      ],
      items: [
        {
          module: "secops", subs: ["Governança de IA"],
          kicker: "AI Control Tower · Agent Client Collector · doc de 26/11/2026",
          title: "AI Proxy leva o AI Control Tower aos endpoints para detectar e bloquear shadow AI",
          rows: [
            ["O que mudou", "<ul><li>A doc ganhou em 26/11 duas páginas de visão geral: <strong>AI Proxy</strong> e <strong>AI Control Tower</strong> (na seção do Agent Client Collector, famílias Brazil e Australia).</li><li>O AI Proxy é um proxy HTTPS leve dentro do Agent Client Collector (ACC). Ele intercepta chamadas de saída para provedores de IA, identifica o processo que fez a chamada e envia eventos estruturados ao AI Control Tower. Tráfego que não é de IA passa sem inspeção.</li><li>Os provedores são classificados como <em>Authorized</em> (o tráfego segue depois da checagem de política) ou <em>Unauthorized</em> (o tráfego é bloqueado).</li><li>O uso é mapeado por usuário, dispositivo e departamento. A visão geral também cita classificação de dados sensíveis (PII, dados financeiros, propriedade intelectual) em prompts e uploads, conforme política e consentimento.</li><li>Os procedimentos de instalação e de políticas já estavam na doc desde 02/10 e não tinham entrado no Radar.</li></ul>"],
            ["Pré-requisitos", "ACC na arquitetura sem MID Server (ICS, <em>MID-less</em>), plugin ITOM Cloud Services Core (sn_itom_cloud_svc), instância habilitada no ITOM Cloud Services (via Customer Support) e o app <strong>ITOM Shadow AI governance</strong> instalado. O AI Proxy é ligado na instalação do agente com o parâmetro <code>AI_PROXY_ENABLED=\"true\"</code>. Papel: agent_client_collector_admin."],
            ["Por que importa", "Até aqui o AI Control Tower governava a IA que roda na plataforma. Com o AI Proxy, ele passa a ver também ChatGPT, ferramentas de navegador e modelos usados direto nas máquinas, que é onde costuma estar o maior risco de vazamento de dados."],
            ["Atenção", "As páginas novas usam o nome <strong>AI Control Tower</strong>, enquanto as release notes já falam em Super Intelligence Control Tower. É o mesmo produto."]
          ],
          suggestion: "Um bom começo é um piloto em modo de observação: instale o AI Proxy num grupo pequeno de máquinas, veja quais provedores aparecem e só depois classifique o que é autorizado. Combine a lista com segurança da informação e jurídico antes de bloquear, e avise os usuários, porque a inspeção de prompts envolve consentimento e LGPD.",
          howto: [
            {
              featured: true,
              title: "Criar uma política de bloqueio no AI Control Tower",
              release: "Brazil, com ITOM Shadow AI governance",
              basis: "Procedimento oficial \"Create AI Control Tower (AICT) policies\"",
              prereqs: ["Papel agent_client_collector_admin", "ACC configurado sem MID Server (ICS)", "ITOM Shadow AI governance instalado"],
              path: "All &gt; AI Control Tower &gt; AI Assets &gt; Govern &gt; Policies",
              steps: [
                "Navegue até <strong>All &gt; AI Control Tower &gt; AI Assets</strong>.",
                "No filtro à esquerda, expanda <strong>Govern</strong> e selecione <strong>Policies</strong>.",
                "Selecione <strong>Create policy</strong>.",
                "Em <em>Choose a policy type</em>, escolha <em>An explicit block</em> (bloqueia um usuário ou departamento) ou <em>A threat response</em> (tira um agente do ar quando detecta ameaça).",
                "Para um bloqueio: em <em>Who</em>, escolha usuário ou departamento; em <em>What</em>, escolha AI agent, model ou domain (para agente, monte o filtro de campos se precisar).",
                "Se quiser avisar o usuário, adicione o follow-up <em>Notify</em> em <em>Add follow-up</em>.",
                "Selecione <strong>Publish</strong>."
              ],
              note: "A ação aparece em Policy summary. A política é sincronizada com as políticas do Agent Client Collector, e é o ACC que a executa no endpoint. Na resposta a ameaça, o follow-up pode abrir um ticket na fila de um grupo ou notificar o usuário.",
              docUrl: "https://www.servicenow.com/docs/r/it-operations-management/agent-client-collector/create-aict-policies.html"
            }
          ],
          sources: [
            { title: "AI Proxy", url: "https://www.servicenow.com/docs/r/it-operations-management/agent-client-collector/ai_proxy_concept.html", note: "docs oficiais (26/11/2026)" },
            { title: "AI Control Tower (visão geral no Agent Client Collector)", url: "https://www.servicenow.com/docs/r/it-operations-management/agent-client-collector/ai-control-tower-concept.html", note: "docs oficiais (26/11/2026)" },
            { title: "Set up an AI proxy", url: "https://www.servicenow.com/docs/r/it-operations-management/agent-client-collector/ai-proxy-setup.html", note: "docs oficiais (procedimento)" },
            { title: "Create AI Control Tower (AICT) policies", url: "https://www.servicenow.com/docs/r/it-operations-management/agent-client-collector/create-aict-policies.html", note: "docs oficiais (procedimento)" }
          ]
        }
      ],
      notes: "Semana curta (feriado de Thanksgiving nos EUA): as release notes de AI Agent Studio, AI Control Tower, AI Agent Advisor e AI Search não mudaram desde a última edição, e a newsroom não trouxe anúncio de produto do escopo. Os hotfixes W48 de 25/11 estão em KBs atrás de login (KB3237605 e KB3237607) e não foram lidos. A página de AI Proxy não informa versão mínima do ACC nem do app ITOM Shadow AI governance, então não citei uma."
    },
    {
      id: 2,
      date: "2026-11-21",
      period: "14 a 21 de novembro de 2026",
      summary: [
        { tag: "release", module: "secops", html: "<strong>Brazil Patch 2m saiu em 20/11:</strong> a primeira release mensal \"m\", que junta o patch da família com a versão mais recente de todas as apps de IA." },
        { tag: "busca", module: "secops", html: "<strong>AI Search detecta campos high-churn:</strong> campos que mudam o tempo todo podem sair do índice, o que reduz a carga de reindexação." },
        { tag: "governança", module: "secops", html: "<strong>AI Control Tower aparece como Super Intelligence Control Tower</strong> na doc e na newsroom. Na Ignite, a ServiceNow mostrou a integração com o Microsoft Agent 365." },
        { tag: "tutorial", module: "secops", html: "<strong>Tutorial da semana:</strong> como revisar os campos high-churn e tirá-los do índice com segurança." }
      ],
      items: [
        {
          module: "secops", subs: ["Administração"],
          kicker: "Brazil Patch 2m · 20/11/2026",
          title: "Releases mensais \"m\" trazem as apps de IA mais recentes junto com o patch",
          rows: [
            ["O que mudou", "<ul><li>O <strong>Brazil Patch 2m</strong> saiu em 20/11/2026. É a primeira release mensal identificada por um \"m\" no nome.</li><li>As releases \"m\" incluem tudo do patch base da família, <strong>a versão mais recente de todas as aplicações de IA</strong> e as dependências não-IA dessas apps.</li><li>O 2m herda as 348 correções do Brazil Patch 2 (de 05/11). Entre as correções de IA: limite de memória ao renderizar PDFs no Document Intelligence (Content Understanding), fila de eventos do AI Search que travava a indexação e links de respostas sintetizadas do AI Search que não abriam em nova aba.</li><li>As correções de segurança estão no KB3234986.</li></ul>"],
            ["Por que importa", "Até aqui, as apps de IA chegavam pela Store, uma por uma, num ritmo diferente do patch. Com a release \"m\", um único upgrade deixa a instância com o patch e a pilha de IA atualizados."]
          ],
          suggestion: "Para quem atualiza a pilha de IA app por app, a release \"m\" pode virar o ciclo padrão de manutenção: menos combinações de versões para testar e menos risco de dependências desencontradas. Vale validar antes em subprodução, porque o pacote instala as apps de IA mais recentes de uma vez.",
          sources: [
            { title: "Brazil Patch 2m release notes", url: RN + "bp2m-release-notes.html", note: "docs oficiais" },
            { title: "Available patches and hotfixes (datas do Patch 2 e do Patch 2m)", url: RN + "available-versions.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["AI Search"],
          kicker: "AI Search · Brazil Patch 2 e Patch 2m",
          title: "AI Search aponta os campos que mudam demais e deixa o admin tirá-los do índice",
          rows: [
            ["O que mudou", "<ul><li>Um job agendado analisa a indexação recente e registra os campos que mudam com muita frequência na tabela <strong>AI Search Datasource Churn Audit</strong> [ais_datasource_churn_audit], com Admin Decision <em>Pending</em>.</li><li>Cada campo recebe Frequency Score e Field Type Score (data, número e booleano pontuam alto). Um campo só é marcado como high-churn quando as duas notas são altas.</li><li>O admin decide entre <em>Exclude From Indexing</em> e <em>Continue Indexing</em>.</li><li><strong>Safety Guard:</strong> se o campo é usado em ACL, filtro de search source ou regra de result improvement, o score fica <em>Blocked</em> e o campo não pode ser excluído.</li></ul>"],
            ["Por que importa", "Menos reindexação desnecessária, índice menor e busca mais rápida, inclusive para as respostas do Otto que dependem do AI Search."],
            ["Cuidado", "O Safety Guard <strong>não detecta</strong> campos usados em ACL com script nem em business rule Before Query. Nesses casos, não exclua o campo."]
          ],
          suggestion: "Instâncias com muitos campos de status e contadores atualizados por integração tendem a ter vários candidatos. Uma revisão mensal da tabela de auditoria, junto com o time dono das ACLs, ajuda a cortar reindexação sem quebrar permissões de busca.",
          howto: [
            {
              featured: true,
              title: "Revisar campos high-churn e excluí-los da indexação",
              release: "Brazil Patch 2 ou posterior",
              basis: "Procedimento oficial \"Review high-churn field audit results\"",
              prereqs: ["Papel admin", "AI Search em uso, com fontes indexadas"],
              path: "All &gt; ais_datasource_churn_audit.list",
              steps: [
                "No filtro de navegação, digite <code>ais_datasource_churn_audit.list</code> e pressione Enter.",
                "Abra um registro com Admin Decision igual a <em>Pending</em>.",
                "Veja por que o campo foi marcado: Churn Score, Frequency Score, Field Type Score e Detection Note.",
                "Se o Churn Score for <em>Blocked</em>, deixe o Admin Decision como <em>Pending</em>: há ACL, filtro de search source ou regra de result improvement que depende do campo.",
                "Nos demais casos, defina o Admin Decision como <em>Exclude From Indexing</em> ou <em>Continue Indexing</em>.",
                "Selecione Update."
              ],
              note: "O campo excluído continua no índice até a tabela de origem ser reindexada. Dá para desfazer trocando para Continue Indexing, mas não para voltar a Pending. Campos decididos não são reavaliados nas próximas auditorias.",
              docUrl: "https://www.servicenow.com/docs/r/platform-administration/ai-search/review-churn-audit-results-ais.html"
            }
          ],
          sources: [
            { title: "AI Search release notes · Brazil Patch 2", url: RN + "ai-search-rn.html", note: "docs oficiais" },
            { title: "High-churn field detection", url: "https://www.servicenow.com/docs/r/platform-administration/ai-search/high-churn-field-detection-ais.html", note: "docs oficiais" },
            { title: "Review high-churn field audit results", url: "https://www.servicenow.com/docs/r/platform-administration/ai-search/review-churn-audit-results-ais.html", note: "docs oficiais (procedimento)" }
          ]
        },
        {
          module: "secops", subs: ["Governança de IA", "Marca"],
          kicker: "Super Intelligence Control Tower · newsroom 17/11/2026",
          title: "AI Control Tower aparece como Super Intelligence Control Tower e se integra ao Microsoft Agent 365",
          rows: [
            ["O que mudou", "<ul><li>As release notes e a newsroom já chamam o produto de <strong>Super Intelligence Control Tower</strong>. O conteúdo da Brazil continua o mesmo (políticas do ServiceNow Arc, acesso por cliente MCP no AI Gateway etc.).</li><li>A migração para a experiência redesenhada do Control Tower está documentada no KB3144679 (Now Support).</li><li>Na Microsoft Ignite (17/11), a ServiceNow mostrou o Control Tower integrado ao <strong>Microsoft Agent 365</strong>: os dois lados compartilham agentes de IA, aplicam políticas antes de o agente agir e registram as ações, inclusive as passagens entre agentes da ServiceNow e da Microsoft.</li></ul>"],
            ["Por que importa", "Quem procura \"AI Control Tower\" na doc vai encontrar o novo nome. Para quem tem agentes nos dois ecossistemas, a integração aponta para governança num lugar só."]
          ],
          suggestion: "Atualize o nome em documentos internos e treinamentos para evitar confusão. Se a empresa já usa Copilot ou Agent 365, inclua o inventário de agentes da Microsoft no planejamento de governança, e confirme na doc a disponibilidade da integração antes de prometer prazo (o anúncio foi uma demonstração).",
          sources: [
            { title: "Super Intelligence Control Tower release notes", url: RN + "ai-control-tower-rn.html", note: "docs oficiais" },
            { title: "Microsoft Ignite: ServiceNow delivers governable autonomous IT to Azure", url: "https://newsroom.servicenow.com/press-releases/details/2026/Microsoft-Ignite-ServiceNow-delivers-governable-autonomous-IT-to-Azure/default.aspx", note: "newsroom oficial" }
          ]
        }
      ],
      notes: "Semana de republicação em massa da doc (19/11); considerei só o que é novo de fato. A detecção de campos high-churn chegou no Brazil Patch 2 (05/11) e não tinha entrado na edição de estreia. Os recursos de Otto específicos de módulo (Virtual Agent, SIR, Platform Analytics etc.) ficam nos radares desses módulos. O resumo gerado por IA que aparece na página da doc não foi usado como fonte; o tutorial segue só o procedimento oficial."
    },
    {
      id: 1,
      date: "2026-11-13",
      period: "release Brazil e versões da Store até nov/2026 (edição de estreia)",
      summary: [
        { tag: "marca", module: "secops", html: "<strong>Now Assist agora é ServiceNow Otto.</strong> O nome muda nos produtos (o Now Assist Admin Console virou AI Admin Hub), e os entitlements continuam os mesmos." },
        { tag: "governança", module: "secops", html: "<strong>AI Control Tower:</strong> políticas que definem quais ferramentas cada cliente MCP pode usar e regras para o ServiceNow Arc." },
        { tag: "agentes", module: "secops", html: "<strong>AI Agent Studio redesenhado:</strong> detecção de gatilhos descontrolados e ACLs negadas por padrão para os novos tipos agênticos." },
        { tag: "ação", module: "warn", html: "<strong>NLU será descontinuado</strong> numa release futura (ainda suportado na Brazil)." }
      ],
      items: [
        {
          module: "secops", subs: ["Administração", "Marca"],
          kicker: "AI Admin Hub e AI Admin Center · release Brazil e versão 6.1",
          title: "Now Assist vira ServiceNow Otto, com ativação de skill em um passo",
          rows: [
            ["O que mudou", "<ul><li>Now Assist passou a se chamar <strong>ServiceNow Otto</strong> nos produtos. Os entitlements não mudam.</li><li>O AI Admin Hub (antigo Now Assist Admin Console) ativa skills padrão em <strong>um único passo</strong>. O assistente guiado continua para configurações personalizadas.</li><li>O chat premium do Otto alterna entre visões interativas, mostra prévia de arquivos gerados (Word, PowerPoint, Excel e PDF) e permite perguntar sobre um trecho destacado.</li></ul>"],
            ["AI Admin Center 6.1", "Saúde das apps de IA (integridade e versão), <strong>pré-checagem de upgrade</strong>, painel de consumo de assists por asset, usuário e departamento, métricas de deflexão personalizadas e descoberta de intenções com sugestão de agentes de IA."]
          ],
          suggestion: "O painel de consumo de assists é o que a gestão vai pedir primeiro: use-o para mostrar quais áreas mais usam o Otto e onde vale investir. A pré-checagem de upgrade também ajuda a planejar a ida para a próxima família.",
          sources: [
            { title: "AI Experiences release notes · Brazil (AI Admin Hub e AI Admin Center)", url: RN + "intelligent-experiences-rn-landing.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Governança de IA"],
          kicker: "AI Control Tower · Brazil Patch 2",
          title: "AI Control Tower controla clientes MCP e o ServiceNow Arc",
          rows: [
            ["O que mudou", "<ul><li><strong>Políticas de acesso por cliente no AI Gateway:</strong> cada cliente MCP só usa as ferramentas que sua política permite, quando o controle de acesso do servidor está ligado.</li><li><strong>Gestão de políticas do ServiceNow Arc:</strong> regras que controlam o uso do Arc.</li><li>Configurações de segurança reorganizadas em subabas (Overview, Runtime, Post-runtime e Security insights), com consentimento de consumo de assists. A lista de agentes contidos passou a se chamar Agent containment list.</li></ul>"]
          ],
          suggestion: "Com vários servidores MCP chegando (ITSM, SPM, EA, CMDB), o controle por cliente no AI Gateway vira essencial: defina com segurança da informação uma política padrão só de leitura e libere ferramentas de escrita caso a caso.",
          sources: [
            { title: "AI Control Tower release notes", url: RN + "ai-control-tower-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Agentes de IA"],
          kicker: "AI Agent Studio · release Brazil",
          title: "AI Agent Studio redesenhado e mais seguro por padrão",
          rows: [
            ["O que mudou", "<ul><li>Configuração e avaliação de agentes simplificadas, com rastreio de problemas e sugestões de otimização nas páginas de resultado.</li><li><strong>Detecta e desativa gatilhos descontrolados</strong> de agentes, evitando consumo não intencional.</li><li><strong>ACLs negadas por padrão</strong> para os novos tipos de ACL agêntica.</li><li>Configuração e implantação de AI specialists, headers personalizados para agentes externos, migração de skills para o Mosaic e playground em modo AI-native.</li></ul>"]
          ],
          suggestion: "A proteção contra gatilhos descontrolados evita sustos na conta de assists. Antes de publicar agentes novos, revise as ACLs agênticas, porque o padrão agora é negar.",
          sources: [
            { title: "AI Agent Studio release notes · Brazil", url: RN + "ai-agents-rn.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Agentes de IA", "Deprecações"], alert: true,
          kicker: "Autonomous Workforce 3.2 · Natural Language Understanding",
          title: "AI specialists mais completos, e o NLU a caminho da descontinuação",
          rows: [
            ["Autonomous Workforce 3.2", "Os AI specialists ganharam regras de passagem para humanos, leitura de anexos (prints, PDFs, logs), perfil configurável (nome, ícone, papel e grupo), tarefas pré-prontas ajustáveis sem engenharia de prompt, monitoramento de desempenho e atribuição por regra. Eles só agem quando têm confiança na solução; o resto vai para um humano. A busca avançada vem ligada por padrão."],
            ["NLU", "O Natural Language Understanding é suportado na Brazil, mas <strong>será descontinuado numa release futura</strong>. O Document Intelligence agora se chama Content Understanding."]
          ],
          suggestion: "Se o Virtual Agent ainda depende de modelos NLU, comece a mapear os tópicos e planeje a migração para as experiências com LLM antes que a descontinuação vire prazo.",
          sources: [
            { title: "AI Experiences release notes · Brazil (Autonomous Workforce, NLU, Content Understanding)", url: RN + "intelligent-experiences-rn-landing.html", note: "docs oficiais" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais de AI Experiences da família Brazil. Os recursos de Otto específicos de cada módulo (ITSM, HAM, SAM, HRSD etc.) aparecem nos radares desses módulos. Não encontrei procedimento oficial das novidades desta edição para um tutorial; ele entra quando houver."
    }
  ],
  events: []
};
