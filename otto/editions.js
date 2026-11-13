/* Radar Otto — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  editions: [
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
