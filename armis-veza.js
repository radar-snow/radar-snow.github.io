/* Radar SecOps & IRM — acompanhamento Armis & Veza.
   status: "disponível" | "previsto" | "anunciado" | "integração existente" */
window.RADAR_AV = {
  updated: "2026-11-09",
  lede: "A ServiceNow comprou a Veza (identidades e acessos) e a Armis (visibilidade de ativos de TI, OT, IoT e dispositivos médicos) e as colocou no centro da estratégia de \"Autonomous Security\". Esta página separa o que já dá para usar do que ainda é promessa, sempre com a fonte oficial.",
  companies: [
    {
      id: "armis", name: "Armis", tag: "Ativos", module: "secops",
      what: "Plataforma de cyber exposure management: descobre sem agente tudo o que está conectado (TI, OT, IoT, dispositivos médicos, cloud) e avalia o risco de cada ativo. O produto principal é o Armis Centrix.",
      deal: "Aquisição concluída em 20/04/2026, por cerca de US$ 7,75 bilhões em dinheiro.",
      today: "Segundo a ServiceNow, o Armis Centrix já está integrado à plataforma e continua sendo vendido também de forma independente, com integração mais profunda \"ao longo do tempo\".",
      fits: [
        "<strong>CMDB e VR/USEM:</strong> inventário completo, inclusive de ativos que scanners e agentes não enxergam, para casar vulnerabilidades com CIs e donos.",
        "<strong>USEM:</strong> o Early Warning (powered by Armis) já marca no CVDB as CVEs com sinal de exploração iminente.",
        "<strong>OT e sistemas críticos:</strong> conversa com Operational Technology e com o novo Agentic AI for Cyber Physical Security."
      ],
      src: { title: "ServiceNow completes Armis acquisition (Newsroom, 20/04/2026)", url: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-completes-Armis-acquisition-closing-the-gap-between-asset-visibility-and-cyber-risk/default.aspx" }
    },
    {
      id: "veza", name: "Veza", tag: "Identidades", module: "irm",
      what: "Plataforma de segurança de identidade: o Access Graph mapeia quem (pessoas, contas de serviço, máquinas e agentes de IA) tem acesso a quê, em todos os sistemas, e ajuda a remover permissões excessivas. Também faz IGA (revisões e pedidos de acesso), monitoramento de acesso privilegiado e segurança de identidades não humanas.",
      deal: "Anunciada em 02/12/2025 e concluída em 02/03/2026, por cerca de US$ 1,2 bilhão (10-Q da ServiceNow).",
      today: "Já existe integração oficial com o AI Control Tower (Access intelligence no mapa de agentes). Segundo a ServiceNow, cerca de 60 dos ~150 clientes da Veza já eram clientes ServiceNow.",
      fits: [
        "<strong>IRM:</strong> o anúncio da compra diz que a Veza vai levar contexto de identidade ao IRM. Controles de acesso e revisões de privilégio são candidatos naturais a evidência automática.",
        "<strong>VR e SIR:</strong> o mesmo anúncio cita contexto de identidade para Vulnerability Response e Incident Response (ex.: quem tem acesso ao ativo vulnerável).",
        "<strong>AI Control Tower:</strong> governar o que cada agente de IA pode acessar e fazer."
      ],
      src: { title: "ServiceNow to acquire Veza (Newsroom, 02/12/2025, atualizado com o fechamento)", url: "https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-to-Expand-Security-Portfolio-With-Acquisition-of-Vezas-Leading-AI-native-Identity-Security-Platform/default.aspx" }
    }
  ],
  timeline: [
    { date: "2025-12-02", title: "ServiceNow anuncia a compra da Veza", src: "https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-to-Expand-Security-Portfolio-With-Acquisition-of-Vezas-Leading-AI-native-Identity-Security-Platform/default.aspx" },
    { date: "2025-12", title: "ServiceNow anuncia a compra da Armis", src: "https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-to-acquire-Armis-to-expand-cyber-exposure-and-security-across-the-full-attack-surface-in-IT-OT-and-medical-devices-for-companies-governments-and-critical-infrastructure-worldwide/default.aspx" },
    { date: "2026-03-02", title: "Compra da Veza concluída", src: "https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-to-Expand-Security-Portfolio-With-Acquisition-of-Vezas-Leading-AI-native-Identity-Security-Platform/default.aspx" },
    { date: "2026-04-20", title: "Compra da Armis concluída (~US$ 7,75 bi)", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-completes-Armis-acquisition-closing-the-gap-between-asset-visibility-and-cyber-risk/default.aspx" },
    { date: "2026-05-05", title: "Knowledge 2026: lançado o \"Autonomous Security & Risk\" com Armis e Veza (sem datas de disponibilidade)", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-Autonomous-Security--Risk-integrating-Armis-and-Veza-to-govern-every-AI-agent-identity-and-connected-asset/default.aspx" },
    { date: "2026-08-04", title: "\"Autonomous Security\": 8 soluções disponíveis e 4 previstas para dezembro", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx" },
    { date: "2026-09", title: "Release Brazil: docs oficiais do Early Warning (Armis) na USEM e do Veza Access Intelligence no AI Control Tower", src: "https://www.servicenow.com/docs/r/security-management/armis-early-warning-integration.html" },
    { date: "2026-12", title: "Previsto: Tier 2 SOC AI Specialist, Vulnerability Resolution AI Specialist, Continuous Control Monitoring e Cryptography Asset Compliance", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx" }
  ],
  status: [
    { name: "Early Warning for Security Exposure Management", link: "Armis (explícito: \"powered by Armis\")", module: "secops", status: "disponível", when: "Docs da release Brazil", what: "Marca no CVDB as CVEs com sinal de exploração iminente (honeypots, OSINT, pesquisa) e permite usar o flag e o Admiralty score nas regras de risco.", int: "armis-ew", src: "https://www.servicenow.com/docs/r/security-management/armis-early-warning-integration.html" },
    { name: "Veza Access Intelligence no AI Control Tower", link: "Veza (explícito)", module: "irm", status: "disponível", when: "Docs da release Brazil", what: "Mostra risco e severidade de acesso de cada agente de IA governado no mapa de agentes (AWS, Gemini Enterprise, Azure AI Foundry e Salesforce).", int: "veza-aict", src: "https://www.servicenow.com/docs/r/intelligent-experiences/gov-sec-configure-veza-access-intelligence.html" },
    { name: "Service Graph Connector for Armis", link: "Armis (integração anterior à compra)", module: "secops", status: "integração existente", when: "Store, desde 2020", what: "Carrega dispositivos Armis (gerenciados, não gerenciados, IoT, médicos, OT) no CMDB.", int: "armis-sgc", src: "https://store.servicenow.com/store/app/e43a2fe21b246a50a85b16db234bcb55" },
    { name: "Agentic AI for Cyber Physical Security", link: "Geral: o anúncio não liga o produto à Armis, mas cita a Armis em OT/ICS", module: "secops", status: "disponível", when: "04/08/2026", what: "Segurança de ambientes ciber-físicos (OT/ICS) com agentes de IA.", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx" },
    { name: "AI Agent Access Security", link: "Geral: o anúncio descreve o Access Graph da Veza, sem ligar ao produto", module: "secops", status: "disponível", when: "04/08/2026", what: "Controle do que agentes de IA podem acessar.", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx" },
    { name: "Non-Human Identity Remediation", link: "Geral: idem", module: "secops", status: "disponível", when: "04/08/2026", what: "Remediação de identidades não humanas (contas de serviço, tokens, chaves).", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx" },
    { name: "Agentic AI for Continuous Control Monitoring", link: "Não citado", module: "irm", status: "previsto", when: "Dez/2026", what: "Monitoramento contínuo de controles com agentes de IA.", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx" },
    { name: "Cryptography Asset Compliance", link: "Não citado", module: "irm", status: "previsto", when: "Dez/2026", what: "Compliance de ativos criptográficos.", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx" },
    { name: "Integração Armis + Veza no Context Engine / Context Graph", link: "Armis e Veza", module: "secops", status: "anunciado", when: "Sem data (\"coming soon\")", what: "O asset graph da Armis e o Access Graph da Veza alimentando o Context Engine da ServiceNow, ligados a serviços, times e políticas.", src: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-completes-Armis-acquisition-closing-the-gap-between-asset-visibility-and-cyber-risk/default.aspx" }
  ],
  useCases: [
    { title: "Priorizar o que vai ser explorado, não só o que tem CVSS alto", module: "secops", text: "Com o Early Warning ativo, inclua o flag (e o Admiralty score) como critério com peso na regra de risco padrão. Bom para ambientes onde patch leva tempo: OT, saúde, sistemas legados e janelas de manutenção fixas." },
    { title: "Fechar o buraco dos ativos sem dono", module: "secops", text: "Use o Service Graph Connector for Armis para trazer dispositivos não gerenciados e de OT para o CMDB antes de cobrar remediação. Muitos problemas de VR (Discovered Items, CI sem match) começam aí." },
    { title: "Revisão de acessos de contas de serviço como evidência de controle", module: "irm", text: "Se você tiver Veza, comece mapeando contas de serviço e tokens com permissão excessiva. Isso vira evidência para controles de acesso no Policy & Compliance e prepara o terreno para o Continuous Control Monitoring previsto para dezembro." },
    { title: "Governar agentes de IA antes que virem incidente", module: "irm", text: "Para quem já usa AI Control Tower, o Access intelligence da Veza mostra o risco de acesso de cada agente governado. Combine com a categoria de incidente de abuso de IA (MITRE ATLAS) sugerida na edição nº 1." }
  ],
  questions: [
    "<strong>Licenciamento:</strong> as fontes não dizem quais capacidades exigem SKU novo. Confirme com o account team antes de planejar.",
    "<strong>Quem é a fonte da verdade?</strong> Há uma pergunta em aberto na Community (set/2026, 1.100+ visualizações, sem resposta): correlacionar sinais de Armis e Veza dentro da ServiceNow ou deixar as duas plataformas priorizarem e a ServiceNow só orquestrar a remediação? Também não está claro o limite com CMDB/CSDM, VR, SIR, IRM e IAM.",
    "<strong>Clientes standalone:</strong> a Armis continua sendo vendida de forma independente. Ainda não há roadmap público de convergência dos produtos.",
    "<strong>\"Revolucionar\" é a palavra do marketing:</strong> as compras fecharam há poucos meses, e parte do que foi anunciado ainda não tem data."
  ],
  questionsSrc: { title: "How are you planning to use Armis Centrix and Veza together with ServiceNow? (Community, 29/09/2026)", url: "https://www.servicenow.com/community/secops-forum/how-are-you-planning-to-use-armis-centrix-and-veza-together-with/m-p/3603795" }
};
