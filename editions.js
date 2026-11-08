/* Radar SecOps & IRM — dados das edições.
   Para publicar uma nova edição: adicionar um objeto no INÍCIO de RADAR.editions.
   module: "secops" | "irm"   subs: lista de submódulos (aparecem como filtros). */
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-08",
      period: "ago a nov/2026 (edição de estreia, janela ampliada)",
      summary: [
        { tag: "ação", module: "warn", html: "<strong>Vulnerability Response vira USEM.</strong> A VR v30x (USEM) será a versão mínima no upgrade para a família Brazil. Os patches Australia 3m e 4m já disparam a migração automaticamente, sem rollback." },
        { tag: "SIR", module: "secops", html: "<strong>Brazil traz MITRE ATLAS</strong> (ameaças específicas de IA/ML), integração bidirecional com Cortex XSIAM e consulta conversacional aos dados de incidentes." },
        { tag: "VR", module: "secops", html: "<strong>Patch com aprovação de change:</strong> deploys via SCCM e BigFix podem passar por Change Request. O ajuste de risk rating saiu do diálogo de exceção e virou \"Modify risk\", com suporte a edição em massa." },
        { tag: "agentes", module: "secops", html: "<strong>Dezembro/2026:</strong> a previsão é que Tier 2 SOC AI Specialist, Vulnerability Resolution AI Specialist, Continuous Control Monitoring e Cryptography Asset Compliance fiquem disponíveis." },
        { tag: "IRM", module: "irm", html: "<strong>Brazil unifica Issue Management</strong> (auditoria, controles, compliance e risco num só app). Já o <strong>IRM Foundation</strong> passou a incluir Advanced Risk Assessment e Regulatory Change Management." }
      ],
      items: [
        {
          module: "secops", subs: ["VR / USEM"], alert: true,
          kicker: "Vulnerability Response · USEM · prazo",
          title: "A migração de VR para USEM fica obrigatória no upgrade para Brazil",
          rows: [
            ["O que mudou", "A Unified Security Exposure Management (USEM) é a evolução da VR e vem na VR v30x, lançada em 11/12/2025. Quem chegar ao upgrade para Brazil numa versão anterior será migrado à força. A ServiceNow diz que esse \"não é o caminho ideal\" e recomenda migrar antes, pelo Migration Assistant for USEM (KB2556844). O Central Vulnerability Database (CVDB) só funciona na versão USEM."],
            ["Atenção", "Os patches Australia 3m e 4m disparam o upgrade VR→USEM automaticamente para versões abaixo da 30, <strong>sem rollback</strong>. Se você ainda não pretende migrar, não aplique esses patches."],
            ["Por que importa", "Uma migração forçada tira tempo de teste, comunicação e treinamento. Customizações em regras de risco, grupos de remediação e integrações de scanner podem quebrar sem aviso."]
          ],
          suggestion: "Monte já um checklist de migração: (1) levantar a versão atual do <code>sn_vul</code>; (2) mapear customizações em risk calculators, assignment rules e integrações; (3) bloquear os patches 3m/4m na janela de patching até a decisão; (4) rodar o Migration Assistant num clone de sub-prod. Os office hours de 19/11 e 10/12 são uma boa hora para levar dúvidas.",
          howto: [
            {
              title: "roteiro de migração para USEM",
              release: "Australia → Brazil · VR v30x",
              basis: "Baseado no FAQ oficial dos Office Hours de USEM (ServiceNow Community, atualizado em 12/08/2026). O passo a passo detalhado, com telas, está no KB2556844, que exige login no Now Support.",
              prereqs: [
                "A USEM é acessada pelo <strong>Migration Assistant for USEM</strong>, dentro do produto. Não use o Application Manager para atualizar a VR existente.",
                "Instalar o app \"Unified Security Exposure Management\" só libera o assistente: isso não dispara o upgrade.",
                "A licença de VR vale para a USEM sem mudança. Recursos de IA exigem entitlement de Otto/Now Assist."
              ],
              steps: [
                "Comece pelo <strong>sandbox</strong>. A recomendação oficial é essa, já que dev costuma estar ocupado com outras mudanças.",
                "Meça o tempo no sandbox. O FAQ cita cerca de 4 horas em ambientes grandes e no mínimo 2 horas em ambientes pequenos sem customização.",
                "Rode o assistente. Ele guia upgrade de plugins, revisão de customizações e resolução de conflitos. Customizações aparecem como <em>conflicts</em> ou <em>skipped files</em> para revisar.",
                "Regras de assignment, CI lookup e auto-close passam para o Security Exposure Management Workspace e são migradas como estão.",
                "Se ainda houver conflitos depois do upgrade dos apps, você pode voltar ao assistente para resolvê-los.",
                "Valide relatórios e dashboards e ajuste referências a colunas que mudaram. Aceite os upgrades sugeridos das integrações feitas pela ServiceNow. Integrações customizadas não precisam de mudança.",
                "Faça teste de regressão e repita o processo em cada ambiente. O assistente precisa rodar em todos; as configurações podem ser levadas entre instâncias pelo KB2734417."
              ],
              note: "Até decidir a data, não aplique os patches Australia 3m e 4m: eles disparam a migração automática, sem rollback.",
              docUrl: "https://www.servicenow.com/community/secops-articles/usem-office-hours-faqs-amp-slides-migration-amp-adoption/ta-p/3524375"
            }
          ],
          sources: [
            { title: "Essential Information: VR to USEM Upgrade Guidance", url: "https://www.servicenow.com/community/secops-articles/essential-information-vr-to-usem-upgrade-guidance/ta-p/3453606", note: "ServiceNow Community, atualizado em 12/08/2026" }
          ]
        },
        {
          module: "secops", subs: ["SIR"],
          kicker: "Security Incident Response · release Brazil",
          title: "MITRE ATLAS, Cortex XSIAM e incidentes consultáveis em linguagem natural",
          rows: [
            ["O que mudou", "<ul><li><strong>MITRE ATLAS</strong> ao lado do ATT&amp;CK: classifica ameaças específicas de IA/ML, como prompt injection e model poisoning. As técnicas aparecem com ícone próprio no node map, na timeline e no card MITRE.</li><li><strong>Cortex XSIAM:</strong> mapeamento de campos a partir de um incidente real (pelo Incident ID) e um painel \"SIR to XSIAM Mapping\" com drag-and-drop, overrides e scripts de transformação. Atualizações e fechamentos no SIR passam a sincronizar automaticamente com o XSIAM.</li><li><strong>Analyze security incident data:</strong> perguntas conversacionais sobre os dados de incidentes, com follow-ups na mesma sessão (requer ServiceNow Otto for SIR).</li><li><strong>Dashboard Security Incident AI ROI Summary:</strong> tempo economizado por capacidade, assists consumidos, assists por incidente resolvido e usuários únicos por dia.</li><li>O relatório de <strong>quality assessment</strong> agora pode ser regerado por seção antes de ser compartilhado.</li></ul>"],
            ["Deprecações", "O SIR Process Mining Content Pack foi substituído pelo core Process Mining Content Pack, que se instala sozinho. Os modelos antigos do Now LLM continuam rodando nas skills existentes, mas não podem ser usados em desenvolvimento novo. O Gemma 4 entrou a partir do release de setembro/2026 (KB3066214)."]
          ],
          suggestion: "Se a empresa usa copilotos ou agentes de IA internamente, crie uma categoria de incidente para \"abuso de IA\" e já mapeie para técnicas ATLAS. Isso dá métricas próprias para o board. Para o time que usa XSIAM como SIEM/SOAR, a sincronização automática de fechamento elimina o retrabalho de fechar o caso nos dois lados. Já o dashboard de ROI ajuda a justificar a licença de Otto com números.",
          howto: [
            {
              title: "sincronizar atualizações e fechamentos com o Cortex XSIAM",
              release: "Brazil",
              basis: "Resumo do procedimento \"Automate incident updates and closures\" da documentação oficial.",
              prereqs: [
                "Roles: <code>sn_si.admin</code> e <code>sn_si.ingestion_profile_admin</code>.",
                "Um perfil de integração XSIAM já criado."
              ],
              path: "All &gt; Palo Alto Networks XSIAM &gt; XSIAM Profile",
              steps: [
                "Abra o perfil e selecione <strong>Additional Options</strong> na barra de progresso.",
                "No formulário <strong>Automating Incident Updates</strong>, ligue o que quiser sincronizar: status na criação do incidente no SIR, fechamento do incidente no XSIAM quando o SIR fecha, Priority → Severity, busca de incidentes fechados e work notes (com anexos opcionais).",
                "Em <strong>Field Mapping</strong>, escolha o método de amostra: campos padrão (só nomes) ou o número de um Security Incident (carrega valores reais).",
                "Arraste os campos de Incident e Alert para os <strong>XSIAM Target Fields</strong>. Use <em>Map another field</em> para adicionar e <em>Remove</em> para tirar.",
                "Marque a caixa de um campo quando quiser que mudanças no XSIAM sobrescrevam o dado no SIR. Affected Users, Configuration Items e Observables vêm marcados.",
                "Para traduzir valores (Affected user, Configuration Item, Priority), use o link <em>Click here</em> no cabeçalho dos Target Fields e o ícone de script do campo.",
                "Selecione <strong>Finish</strong>. Depois, na seção Name da barra de progresso, marque <strong>Active</strong> e selecione Continue."
              ],
              note: "O caminho de menu foi reconstruído a partir da página oficial, que exibe o texto sem separadores. A doc pede cuidado ao habilitar sobrescrita de dados e informa que a propriedade <code>sn_sec_pan_xsiam.incident_updates</code> vem como False por padrão.",
              docUrl: "https://www.servicenow.com/docs/access?context=pan-xsiam-automate-inc-updates&version=brazil&pubname=brazil-security-management&ft:locale=en-US"
            }
          ],
          sources: [
            { title: "Security Incident Response release notes · Brazil", url: "https://www.servicenow.com/docs/r/release-notes/secops-sir-rn.html?contentId=T7xwdMmBGDe4sW4Ks~o1ow", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["VR / USEM"],
          kicker: "Vulnerability Response · release Brazil (seções 2026-09 e 2026-10)",
          title: "Patch com aprovação de change e um novo fluxo para alterar risco",
          rows: [
            ["O que mudou", "<ul><li><strong>Deploy de patch via Change Request</strong> nas integrações Microsoft SCCM e HCL BigFix, com execução automática opcional após a aprovação.</li><li><strong>Modify risk rating</strong> individual ou em massa (host, aplicação, container ou remediation task). O Vulnerability Admin altera direto; o Remediation Owner passa por aprovação. O compensating control é opcional.</li><li>As remediation tasks <strong>reagrupam automaticamente</strong> quando a Preferred solution do item vulnerável muda.</li></ul>"],
            ["Mudança de comportamento", "Risk rating e compensating control <strong>saíram</strong> do diálogo Request Exception e do Bulk Edit com o motivo \"Mitigating Control in Place\". O caminho agora é <em>Modify risk</em> (admin) ou <em>Request risk modification</em> (owner)."]
          ],
          suggestion: "A aprovação via change fecha uma lacuna clássica de auditoria: \"quem autorizou esse patch em produção?\". Vale envolver o time de Change/ITSM antes de ativar. Revise também procedimentos e treinamentos que ensinam a baixar o risco pelo pedido de exceção, porque esse caminho deixou de existir.",
          howto: [
            {
              featured: true,
              title: "agendar deploy de patch com aprovação de Change Request",
              release: "Brazil · SCCM e HCL BigFix",
              basis: "Procedimento \"Schedule a patch deployment with Change Request approval\" da documentação oficial.",
              prereqs: [
                "Role: <code>sn_vul_patch_orch.configure_patch</code>.",
                "Integração de Patch Orchestration com Microsoft SCCM ou HCL BigFix configurada.",
                "A opção só existe a partir de um registro de <strong>remediation task</strong>."
              ],
              path: "Remediation task &gt; Create Change &gt; Create change &amp; schedule patch",
              steps: [
                "Abra a remediation task atribuída a você ou ao seu grupo.",
                "Selecione <strong>Create Change</strong> e depois <strong>Create change &amp; schedule patch</strong>.",
                "Escolha os patches que serão aplicados e continue.",
                "Escolha os grupos de ativos ou os ativos individuais e continue.",
                "No passo <strong>Schedule &amp; create change</strong>, preencha os campos do Change Request. Alguns, como a short description, vêm preenchidos a partir da remediation task.",
                "Preencha o deploy: nome, horário de início e de fim.",
                "(Opcional) Marque <strong>Automatic patch deployment</strong> para o deploy rodar sozinho quando o Change Request chegar ao estado <em>Implement</em>. Sem essa opção, o deploy é manual depois da aprovação.",
                "Envie (Submit)."
              ],
              note: "Resultado: o Change Request é criado com os detalhes do deploy. Com o deploy automático, ele é agendado quando o change chega a Implement. <em>Sugestão:</em> alinhe com o time de Change qual modelo de change (normal ou padrão) e qual janela usar antes de liberar isso para os resolvedores.",
              docUrl: "https://www.servicenow.com/docs/access?context=vr-ws-patch-schedule-change-request&version=brazil&pubname=brazil-security-management&ft:locale=en-US"
            },
            {
              title: "alterar o risk rating de um finding ou remediation task",
              release: "Brazil · Security Exposure Management Workspace",
              basis: "Procedimento \"Modify the risk rating for a finding or remediation task\" da documentação oficial.",
              prereqs: [
                "Host (VIT): <code>sn_vul.vulnerability_analyst</code>, <code>sn_vul.vulnerability_admin</code> ou <code>sn_vul.remediation_owner</code>.",
                "Aplicação (AVIT): <code>sn_vul.app_sec_manager</code> ou <code>sn_vul.app_security_champion</code>.",
                "Container (CVIT): <code>sn_vul_container.vulnerability_analyst</code>, <code>sn_vul_container.vulnerability_admin</code> ou <code>sn_vul_container.remediation_owner</code>."
              ],
              path: "Workspaces &gt; Security Exposure Management Workspace &gt; List",
              steps: [
                "Abra a lista do Security Exposure Management Workspace.",
                "Abra o finding ou a remediation task.",
                "No menu de mais opções, selecione <strong>Modify risk</strong>. Remediation Owners veem <strong>Request Risk Modification</strong>, que passa por aprovação.",
                "Preencha os campos do diálogo. Associar um compensating control é opcional.",
                "Selecione <strong>Apply</strong>."
              ],
              note: "O caminho de menu foi reconstruído a partir da página oficial, que exibe o texto sem separadores.",
              docUrl: "https://www.servicenow.com/docs/access?context=sem-modify-risk&version=brazil&pubname=brazil-security-management&ft:locale=en-US"
            }
          ],
          sources: [
            { title: "Vulnerability Response release notes · Brazil", url: "https://www.servicenow.com/docs/r/release-notes/secops-vuln-resp-rn.html?contentId=NdD6VlS_FXuUomep_EZWSw", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Estratégia e agentes"],
          kicker: "Estratégia · anúncio de 04/08/2026",
          title: "Autonomous Security: o que já existe e o que chega em dezembro",
          rows: [
            ["Disponível já", "Agentic Exposure Management, Autonomous Remediation Agents, Application Security, DAST, External Attack Surface Management (EASM), Agentic AI for Cyber Physical Security, AI Agent Access Security e Non-Human Identity Remediation."],
            ["Previsto dez/2026", "Tier 2 SOC AI Specialist, Vulnerability Resolution AI Specialist, Agentic AI for Continuous Control Monitoring e Cryptography Asset Compliance."],
            ["Contexto", "A aquisição da Armis (visibilidade de ativos IT/OT/IoT/dispositivos médicos) foi concluída em 2026, e a integração com Armis e Veza (identidades humanas e não humanas) foi anunciada no Knowledge 2026."]
          ],
          suggestion: "Para quem já tem SIR e VR, as peças com sinergia mais direta são o Vulnerability Resolution AI Specialist (remediação) e o Non-Human Identity Remediation, já que contas de serviço esquecidas são um achado recorrente de auditoria. Confirme com o account team quais itens exigem SKU adicional antes de planejar.",
          sources: [
            { title: "ServiceNow delivers Autonomous Security", url: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx", note: "Newsroom, 04/08/2026" },
            { title: "Autonomous Security & Risk com Armis e Veza", url: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-Autonomous-Security--Risk-integrating-Armis-and-Veza-to-govern-every-AI-agent-identity-and-connected-asset/default.aspx", note: "Newsroom, 05/05/2026" },
            { title: "Conclusão da aquisição da Armis", url: "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-completes-Armis-acquisition-closing-the-gap-between-asset-visibility-and-cyber-risk/default.aspx", note: "Newsroom" }
          ]
        },
        {
          module: "irm", subs: ["Issue Management", "Regulatory Change", "Privacy"],
          kicker: "GRC · release Brazil (Q3 2026)",
          title: "Issue Management unificado e IA para relatórios e alertas regulatórios",
          rows: [
            ["O que mudou", "<ul><li><strong>Enterprise-wide Issue Management:</strong> achados de auditoria, falhas de controle e issues de compliance e risco num só app. Tipos de issue com campos, formulários, ciclo de vida e passos guiados próprios, e aprovações configuráveis sem código.</li><li><strong>Actionable Regulatory Alert Insights</strong> (Regulatory Change Management): resumo por IA do que mudou, do impacto no negócio e dos próximos passos.</li><li><strong>AI Reporting Assistant:</strong> narrativas, tabelas e gráficos a partir de dados vivos, por pedido em linguagem natural.</li><li><strong>AI-Powered Data Explorer:</strong> perguntas em linguagem natural com gráficos interativos.</li><li><strong>Privacy Management · AI Reviewer Assist:</strong> sugere risk statements e control objectives para a avaliação de uma atividade de tratamento de dados.</li></ul>"]
          ],
          suggestion: "O Issue Management unificado resolve o cenário em que Auditoria, Compliance e Risco têm, cada um, a sua lista de pendências. Um único backlog com tipos diferentes facilita o reporte ao comitê. Para LGPD, o AI Reviewer Assist acelera a montagem de avaliações de ROPA, desde que o analista revise e confirme cada sugestão (a própria ServiceNow descreve o fluxo assim).",
          sources: [
            { title: "Read about Risk's major new capabilities for Brazil", url: "https://www.servicenow.com/community/grc-articles/read-about-risk-s-major-new-capabilities-for-brazil/ta-p/3596384", note: "ServiceNow Community, 10/09/2026" },
            { title: "Risk Demo Library · Brazil", url: "https://www.servicenow.com/community/grc-articles/risk-demo-library-featuring-risk-capabilities-for-the-brazil-q3/ta-p/3590035", note: "ServiceNow Community" }
          ]
        },
        {
          module: "irm", subs: ["Licenciamento", "Advanced Risk", "Regulatory Change"],
          kicker: "Licenciamento · Q3 2026",
          title: "IRM Foundation passa a incluir Advanced Risk Assessment e Regulatory Change",
          rows: [
            ["O que mudou", "<ul><li><strong>Advanced Risk Assessment</strong> no Foundation, com até 3 Risk Assessment Methodologies ativas e fatores manuais e automáticos ilimitados. Antes, o Foundation só fazia a avaliação clássica com uma metodologia.</li><li><strong>Regulatory Change Management</strong> (workflows centrais e resumo de alertas por IA) no Foundation e no Standard V2. Antes, ficava restrito ao Advanced e ao Professional.</li><li>O IRM Foundation (introduzido em abril/2026) substitui o IRM Standard, que está sendo descontinuado. A versão com RAMs no ARA ficou GA em 10/09/2026.</li></ul>"]
          ],
          suggestion: "Se o seu cliente ou empresa está no tier base e queria metodologias diferentes por tipo de risco (por exemplo, uma para risco operacional e outra para risco de TI), isso já pode estar coberto sem upgrade de SKU. Confirme o entitlement com o account team antes de configurar.",
          sources: [
            { title: "Mature your Risk management program with expanded capabilities at the IRM base tier", url: "https://www.servicenow.com/community/grc-articles/mature-your-risk-management-program-with-expanded-capabilties-at/ta-p/3596030", note: "ServiceNow Community, 30/09/2026" }
          ]
        },
        {
          module: "irm", subs: ["Policy & Compliance"],
          kicker: "Leitura técnica · 01/10/2026",
          title: "Arquitetura e modelo de dados de Policy & Compliance",
          rows: [
            ["O que é", "Um artigo de referência da comunidade GRC sobre a arquitetura e o modelo de dados do IRM Policy and Compliance Management. Não é uma novidade de produto, mas é material raro sobre o assunto."]
          ],
          sources: [
            { title: "IRM Policy and Compliance Management: Architecture and Data Model Overview", url: "https://www.servicenow.com/community/grc-articles/irm-policy-and-compliance-management-architecture-and-data-model/ta-p/3605503", note: "ServiceNow Community" }
          ]
        }
      ],
      notes: "Conteúdo que exige login (Now Support, como os KBs KB2556844 e KB3066214) não foi lido, só citado. As release notes da Store de cada app não trouxeram novidade datada no período. Datas de GA da família Brazil não aparecem nas fontes oficiais consultadas, por isso não estão aqui. Tutoriais: os itens de IRM ficaram sem \"Como aplicar\" porque não encontrei procedimento oficial da release Brazil para Issue Management nem para RAMs no Foundation. O guia de ativação do MITRE ATLAS retornou erro 404 na documentação, então esse passo a passo também ficou de fora."
    }
  ],

  /* Agenda: eventos oficiais. A página esconde automaticamente os que já passaram. */
  events: [
    { date: "2026-11-18", module: "irm", title: "Workshop virtual: Business Continuity Management", detail: "10h–12h PT (15h–17h em Brasília)", url: "https://info.servicenow.com/ServiceNowExchange-SecurityandRisk-Solutions.html?cid=losn:com" },
    { date: "2026-11-19", module: "secops", title: "Office Hours: migração para USEM", detail: "online", url: "https://www.servicenow.com/community/secops-events/office-hours-unified-security-exposure-management-usem-migration/ev-p/3601125" },
    { date: "2026-12-02", module: "geral", title: "ServiceNow World Forum Paris", detail: "", url: "https://www.servicenow.com/events/world-forum/paris.html" },
    { date: "2026-12-10", module: "secops", title: "Office Hours: migração para USEM", detail: "online, nova sessão", url: "https://www.servicenow.com/community/secops-events/office-hours-unified-security-exposure-management-usem-migration/ev-p/3601126" },
    { date: null, module: "secops", title: "What's New for Security Operations, Q3 2026", detail: "sob demanda · SIR, TISC, USEM e Otto", url: "https://www.servicenow.com/community/secops-events/servicenow-exchange-what-s-new-for-security-operations-q3-2026/ev-p/3613367" }
  ]
};
