/* Radar SecOps & IRM — dados das edições.
   Para publicar uma nova edição: adicionar um objeto no INÍCIO de RADAR.editions.
   module: "secops" | "irm"   subs: lista de submódulos (aparecem como filtros). */
window.RADAR = {
  editions: [
    {
      "id": 3,
      "date": "2026-11-23",
      "period": "semana de 16/11 a 23/11/2026 (com as versões da Store de 05/11 que ficaram fora da edição nº 2)",
      "summary": [
        {
          "tag": "prazo",
          "module": "warn",
          "html": "<strong>Advanced Risk 23.0.6 ou posterior:</strong> só atualizar o app não liga mais os recursos. Primeiro instale o app IRM do seu SKU. Se o Advanced Risk já estiver instalado, rode o job <strong>Handle licenses for Advanced Risk application</strong>."
        },
        {
          "tag": "SecOps",
          "module": "secops",
          "html": "<strong>Store de novembro (05/11):</strong> correções na VR/USEM, no CVDB (flag do CISA KEV que não saía), no Configuration Compliance, na integração do Defender e na Qualys. O Early Warning da Armis passa a autenticar via JWKS."
        },
        {
          "tag": "BCM",
          "module": "irm",
          "html": "<strong>BCM e Operational Resilience:</strong> sem release nova na semana. A novidade são os <strong>process guides atualizados</strong> no Best Practices Library (19/11), que incluem BCM, Operational Resilience, TPRM e mais sete produtos."
        },
        {
          "tag": "Armis",
          "module": "secops",
          "html": "<strong>Armis Centrix v26.4</strong> (16/11): a timeline de cada CVE no VMDR junta CVSS, EPSS, weaponization e sinais de early warning. Também há status de saúde das integrações (early access)."
        },
        {
          "tag": "Radar de erros",
          "module": "secops",
          "html": "Entraram oito registros. Três são de Tenable: CI errado no Tenable.sc, recast de severidade e erro de anexo depois da USEM. Os outros: isolamento de host do Defender no IP errado, Deep Scan da Qualys sem Proof e correções oficiais de Qualys, Defender for Cloud e Early Warning."
        }
      ],
      "items": [
        {
          "module": "irm",
          "subs": [
            "Advanced Risk",
            "Licenciamento"
          ],
          "alert": true,
          "kicker": "Integrated Risk Management · Community (funcionário ServiceNow), 16/11/2026",
          "title": "Advanced Risk 23.0.6+: os recursos agora dependem do app IRM do seu SKU",
          "rows": [
            [
              "O que mudou",
              "Até agora, a plataforma lia o seu entitlement para decidir quais recursos do <strong>GRC: Advanced Risk</strong> ligar. A partir da versão <strong>23.0.6</strong> (Store, set/2026, Brazil), o modelo passa a ser por \"plugin identifier\": cada SKU libera um conjunto de recursos, e você precisa instalar o app IRM correspondente. As release notes dão dois exemplos: clientes IRM Professional instalam <strong>Integrated Risk Management Professional</strong> e clientes IRM Enterprise instalam <strong>Integrated Risk Management Enterprise</strong>. O artigo da Community cita <strong>IRM for Advanced Risk</strong> para clientes IRM Advanced."
            ],
            [
              "Impacto no upgrade",
              "Atualizar só o GRC: Advanced Risk <strong>não liga</strong> os recursos certos. Em instâncias que já têm o app, depois de instalar o app do SKU os recursos só aparecem quando o job diário <strong>Handle licenses for Advanced Risk application</strong> roda, ou quando você o executa na hora. Versões anteriores à 23.0.6 continuam no modelo por entitlement."
            ],
            [
              "Outras mudanças da 23.0.6",
              "O GRC: Advanced Risk passa a estar disponível também no SKU IRM Foundation. Risk assessment projects agora aceitam várias entidades no mesmo projeto, e os comentários podem ser obrigatórios por fator, por grupo de fatores ou por tipo de assessment."
            ],
            [
              "Por que importa",
              "É a causa mais provável de \"o upgrade sumiu com recursos\" no Advanced Risk. Também afeta quem está migrando do risk legado para o Advanced Risk."
            ]
          ],
          "suggestion": "Antes da próxima janela de upgrade do IRM: (1) confirme com o account team qual é o seu SKU, porque o artigo pede para instalar <em>só</em> o app que corresponde a ele; (2) inclua no plano de upgrade a instalação do app do SKU e a execução manual do job; (3) depois do upgrade, valide com um usuário de teste os recursos que você usa (multi-entity, RCSA em grid, reporting views).",
          "howto": [
            {
              "featured": true,
              "title": "Liberar os recursos do Advanced Risk pelo app IRM do seu SKU",
              "release": "Store · GRC: Advanced Risk 23.0.6 ou posterior (família Brazil)",
              "basis": "Guia de instalação publicado por funcionário da ServiceNow na Community (16/11/2026, editado em 17/11), conferido com as release notes da Store do GRC: Advanced Risk (versão 23.0.6).",
              "prereqs": [
                "Acesso de admin para instalar aplicações da Store e executar scheduled jobs.",
                "GRC: Advanced Risk 23.0.6 ou posterior (versões anteriores seguem o modelo por entitlement).",
                "Saber qual é o seu SKU de IRM. Se não tiver certeza, confirme com o account team antes de instalar.",
                "O mapeamento de SKU para app fica no KB \"IRM SKU to application mapping and ARA feature availability\" (Now Support, exige login; não foi lido)."
              ],
              "path": "System Definition &gt; Scheduled Jobs",
              "steps": [
                "<strong>Instância nova (caminho preferido):</strong> instale pela Store o app IRM do seu SKU e, depois, instale ou atualize o <strong>GRC: Advanced Risk</strong>. Os recursos do SKU ficam disponíveis sozinhos.",
                "<strong>Advanced Risk já instalado:</strong> instale o app IRM do seu SKU.",
                "Vá em <strong>System Definition &gt; Scheduled Jobs</strong> e procure <strong>Handle licenses for Advanced Risk application</strong>.",
                "Abra o job e selecione <strong>Execute Now</strong>. Os recursos aparecem quando o job termina.",
                "Se não quiser rodar na hora, espere a próxima execução diária do job, que libera os recursos do mesmo jeito."
              ],
              "note": "Instale só o app IRM que corresponde ao seu SKU. Exemplos das release notes: IRM Professional → Integrated Risk Management Professional; IRM Enterprise → Integrated Risk Management Enterprise. <em>Sugestão:</em> faça primeiro em sub-produção e compare a lista de recursos antes e depois do job.",
              "docUrl": "https://www.servicenow.com/community/grc-articles/advanced-risk-now-uses-sku-specific-irm-applications-for-feature/ta-p/3621974"
            }
          ],
          "sources": [
            {
              "title": "Advanced Risk now uses SKU-specific IRM applications for feature entitlement: what you need to know",
              "url": "https://www.servicenow.com/community/grc-articles/advanced-risk-now-uses-sku-specific-irm-applications-for-feature/ta-p/3621974",
              "note": "Community, funcionário ServiceNow, 16/11/2026"
            },
            {
              "title": "GRC: Advanced Risk release notes (versão 23.0.6)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-grc-rn-advanced-risk.html",
              "note": "Store Version History Release Notes"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "VR / USEM",
            "Configuration Compliance"
          ],
          "kicker": "Security Operations · Store, 05/11/2026",
          "title": "Store de novembro: correções na VR/USEM, no CVDB e nas integrações Qualys, Defender e Early Warning",
          "rows": [
            [
              "O que mudou",
              "<ul><li><strong>Vulnerability Response 30.10.1 (USEM):</strong> a data do Deferral Exception Until Date de AVITs é calculada certo depois da aprovação no upgrade para USEM; a Change Request criada a partir da vulnerabilidade preenche Assigned To e Assignment Group no VR Workspace; deferrals mais rápidos (consultas paginadas); fecha um vazamento de informação na barra lateral do VR Workspace (ACL no Data Broker); limpa service mapping de CIs fora da janela de 90 dias de scan.</li><li><strong>Vulnerability Response 26.10.1:</strong> volta a lógica de retry para Red Hat Security Advisories grandes; o status deferred de GitHub Secret Scanning se mantém entre sincronizações; respostas grandes demais do Qualys Host Detection não derrubam mais a integração.</li><li><strong>Central Vulnerability Database 1.2.7:</strong> o flag do CISA KEV e a due date somem quando um scan posterior deixa de reportar a CVE.</li><li><strong>Configuration Compliance 30.8.1 (USEM) e 15.11.0:</strong> remediation tasks são geradas quando um test result é reaberto; findings do Security Posture Control voltam a ser gerados nas políticas ativas.</li><li><strong>Microsoft Defender (TVM) 31.4.11:</strong> as credenciais do Defender for Cloud voltam a salvar e testar sem o Configuration Compliance instalado. Um banner avisa quando você está fora do escopo da aplicação.</li><li><strong>Early Warning 1.2.5:</strong> a autenticação do Armis Early Warning passa a usar o recurso de JWKS da plataforma.</li></ul>"
            ],
            [
              "Integrações afetadas",
              "Qualys, Microsoft Defender Vulnerability Management e Armis Early Warning. Os três cards da aba Integrações ganharam um registro no radar de erros. A página de configuração do Early Warning na doc ainda é de 10/09/2026 e continua pedindo <code>armis_api_key</code>: a release note não explica o que muda para quem já configurou."
            ],
            [
              "Por que importa",
              "O bug do KEV inflava a prioridade de VITs que já não tinham a CVE explorada. A correção da barra lateral é de segurança. Quem está no meio da migração para USEM ganha a correção das exceções."
            ]
          ],
          "suggestion": "Depois de atualizar, rode um relatório de VITs com o flag KEV e compare com o número anterior: a queda mostra o que estava superpriorizado. No Early Warning, confira o histórico de execuções logo depois do upgrade para a 1.2.5 e abra caso no suporte se a autenticação falhar, já que a doc ainda não descreve o JWKS.",
          "sources": [
            {
              "title": "Vulnerability Response release notes (30.10.1 e 26.10.1)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-secops-rn-vulnerability-response.html",
              "note": "Store, atualizada em 05/11/2026"
            },
            {
              "title": "Central Vulnerability Database release notes (1.2.7)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-secops-rn-vr-central-vulnerability-database.html",
              "note": "Store"
            },
            {
              "title": "Configuration Compliance release notes (30.8.1 e 15.11.0)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-secops-rn-config-compl.html",
              "note": "Store"
            },
            {
              "title": "Microsoft Defender TVM release notes (31.4.11)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-secops-rn-microsoft-defender-tvm.html",
              "note": "Store"
            },
            {
              "title": "Early Warning for Security Exposure Management release notes (1.2.5)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-secops-early-warning-security-exposure-mgmt.html",
              "note": "Store"
            }
          ]
        },
        {
          "module": "irm",
          "subs": [
            "BCM",
            "Operational Resilience",
            "TPRM",
            "Audit",
            "Policy & Compliance",
            "Regulatory Change",
            "Privacy",
            "Issue Management"
          ],
          "kicker": "Governance, Risk and Compliance · Community (funcionário ServiceNow), 19/11/2026",
          "title": "Process guides de Risk atualizados, incluindo BCM e Operational Resilience",
          "rows": [
            [
              "O que mudou",
              "A ServiceNow publicou versões atualizadas de 10 process guides de Risk no Best Practices Library: Risk Management, Policy &amp; Compliance Management, Compliance Case Management, Audit Management, Operational Resilience, Regulatory Change Management, Issue Management (Common Core), Business Continuity Management, Third-party Risk Management e Privacy Management."
            ],
            [
              "O que tem nos guias",
              "Cada process guide descreve o processo out-of-the-box: roles, diagramas do processo, workflow de estados e boas práticas de relatórios. A biblioteca também tem success packs, scoping guides, maturity models e implementation guides."
            ],
            [
              "Onde achar",
              "No Best Practices Library, role até <strong>Browse Based on Product</strong> e escolha <strong>Governance, Risk, and Compliance</strong> em <strong>Products &amp; Platform</strong>. A biblioteca é para clientes e parceiros."
            ],
            [
              "BCM",
              "Não houve release nova de BCM, Crisis Management nem Operational Resilience nesta semana. As últimas versões na Store continuam as de outubro (BCM Advanced 2.1.2, BCP 12.1.2, Crisis Management 12.1.2, Crisis Management integration with Everbridge 12.1.2). A integração com o Everbridge não mudou."
            ]
          ],
          "suggestion": "Use o guia de BCM como checklist antes da revisão anual dos planos: compare os estados e roles do guia com o que foi customizado na sua instância. Cada desvio sem motivo claro é um candidato a voltar ao padrão antes do próximo upgrade.",
          "sources": [
            {
              "title": "Find newly updated Risk product process guides in the Best Practices Library",
              "url": "https://www.servicenow.com/community/grc-articles/find-newly-updated-risk-product-process-guides-in-the-best/ta-p/3623086",
              "note": "Community, funcionário ServiceNow, 19/11/2026"
            },
            {
              "title": "Business Continuity Management Advanced release notes",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-grc-rn-business-continuity-mgmt-advanced.html",
              "note": "Store, sem versão nova desde 08/10/2026"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Estratégia e agentes"
          ],
          "kicker": "Armis · Community (funcionário ServiceNow), 16/11/2026",
          "title": "Armis Centrix v26.4: risco da CVE numa timeline só e saúde das integrações",
          "rows": [
            [
              "O que mudou",
              "<ul><li>O VMDR mostra CVSS, EPSS, weaponization confirmada, sinais de early warning e due dates de cada CVE numa timeline ou lista. Esses fatores alimentam um risk score da Armis.</li><li>As CVEs ganham nomes legíveis (ex.: \"Remote Code Execution in Google Chrome\"), que também aparecem no CSV e na API.</li><li>É possível atribuir vários collectors a um grupo de alvos de scan, e o trabalho se divide sozinho.</li><li><strong>Integration health status</strong> (early access) mostra cada execução com falha e seus eventos.</li></ul>"
            ],
            [
              "Disponibilidade",
              "As releases chegam aos tenants ao longo de algumas semanas, e parte dos recursos exige pedido de early access. A lista completa está nas release notes v26.4 no Support Portal da Armis (não lidas)."
            ],
            [
              "Por que importa",
              "É a Armis vendida de forma independente, não um app da ServiceNow. Mas os mesmos sinais de early warning já chegam à USEM pelo Early Warning (ver item da Store acima)."
            ]
          ],
          "suggestion": "Se você usa Armis Centrix e USEM juntos, compare a prioridade de uma CVE no VMDR da Armis com o risk score da USEM. Divergências grandes indicam pesos diferentes nas regras de risco. Vale alinhar antes de cobrar SLA dos times.",
          "sources": [
            {
              "title": "Armis Centrix v26.4 Webinar Recording: Faster CVE triage",
              "url": "https://www.servicenow.com/community/armis-articles/armis-centrix-v26-4-webinar-recording-faster-cve-triage/ta-p/3621776",
              "note": "Community, funcionário ServiceNow, 16/11/2026"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Estratégia e agentes"
          ],
          "kicker": "Leitura · Newsroom, 18/11/2026",
          "title": "Pesquisa \"Deployed but Ungoverned\": incidentes com agentes de IA na Índia",
          "rows": [
            [
              "O que é",
              "Recorte indiano de uma pesquisa global da ServiceNow com mais de 3.700 líderes de segurança em 20 países. Na Índia, 92% das organizações tiveram um incidente de segurança com agentes de IA no último ano, e só 36% delas o contiveram em até 24 horas."
            ],
            [
              "Números que ajudam a priorizar",
              "Só 18% têm visão unificada dos agentes. 67% não conseguem agir automaticamente quando um agente se comporta de forma anômala. 37% acharam em produção agentes que segurança não conhecia."
            ],
            [
              "Cuidado",
              "É uma pesquisa encomendada pela própria ServiceNow, não uma novidade de produto."
            ]
          ],
          "suggestion": "Os números servem para justificar internamente um inventário de agentes (AI Control Tower) e uma categoria de incidente de abuso de IA no SIR, como sugerido na edição nº 1.",
          "sources": [
            {
              "title": "92% of Indian organisations had an AI agent security incident in the past year; only 36% of them contained it within 24 hours",
              "url": "https://newsroom.servicenow.com/press-releases/details/2026/92-of-Indian-organisations-had-an-AI-agent-security-incident-in-the-past-year-only-36-of-them-contained-it-within-24-hours/default.aspx",
              "note": "Newsroom, 18/11/2026"
            }
          ]
        }
      ],
      "notes": "As versões da Store de 05/11 (VR, CVDB, Configuration Compliance, Defender TVM, Early Warning, AI Risk and Compliance 23.2.1) ficaram fora da edição nº 2 e entram agora. O tutorial da semana veio de um guia de upgrade publicado por funcionário da ServiceNow na Community. O KB citado nele (mapeamento de SKU para app) exige login e não foi lido. Sem \"Como aplicar\" nos demais itens: as release notes da Store só listam correções; a doc do Early Warning ainda não descreve o JWKS (páginas de 10/09/2026); os process guides ficam no Best Practices Library, que não foi aberto; Armis Centrix e a pesquisa não têm procedimento. O advisory de CVEs de novembro (KB3235180, Now Support) cita o AI Platform e não SecOps/IRM nas fontes públicas, por isso ficou de fora. Os anúncios do Ignite (17/11) e do Autonomous CRM (12/11) não tratam de SecOps/IRM."
    },
    {
      "id": 2,
      "date": "2026-11-16",
      "period": "semana de 09/11 a 16/11/2026 (com itens de BCM e Operational Resilience de outubro que ficaram fora da edição nº 1)",
      "summary": [
        {
          "tag": "IRM",
          "module": "irm",
          "html": "<strong>Agentic AI for Continuous Controls Monitoring</strong> foi anunciado em 10/11: agentes configuram testes de controle, abrem ticket quando um controle falha e podem corrigir dentro de políticas definidas. São mais de 100 integrações prontas."
        },
        {
          "tag": "prazo",
          "module": "warn",
          "html": "<strong>O CCM atrasou.</strong> Em agosto a previsão era dezembro/2026. Agora a GA está prevista para o <strong>1º trimestre de 2027</strong>. Se você contava com ele para o fechamento do ano, replaneje."
        },
        {
          "tag": "BCM",
          "module": "irm",
          "html": "<strong>BCM na Store (Brazil):</strong> recovery tasks importadas e exportadas pelo Excel, ownership por grupo em BIA, planos e eventos, integração com o GRC Issue e suporte a knowledge graph (outubro)."
        },
        {
          "tag": "Op. Resilience",
          "module": "irm",
          "html": "<strong>Solução de Operational Resilience para serviços financeiros</strong> já disponível (anúncio de 15/10). Ela junta governança de IA, risco e segurança numa visão só para CRO e CISO."
        },
        {
          "tag": "SecOps",
          "module": "secops",
          "html": "Semana sem release nova de SecOps. No radar de erros entraram três casos de Tenable (import lento, dois 403 no Tenable.sc) e a falta de OAuth no conector do Everbridge para BCM."
        }
      ],
      "items": [
        {
          "module": "irm",
          "subs": [
            "Policy & Compliance",
            "Estratégia e agentes"
          ],
          "alert": true,
          "kicker": "Integrated Risk Management · anúncio de 10/11/2026",
          "title": "Continuous Controls Monitoring com agentes de IA, agora previsto para o 1º tri/2027",
          "rows": [
            [
              "O que mudou",
              "A ServiceNow anunciou capacidades agênticas de monitoramento contínuo de controles no IRM. Agentes ajudam a configurar os testes, interpretam o resultado e sinalizam controles com desvio ou falha. Quando um controle falha, o sistema abre ticket e pode remediar automaticamente dentro de políticas definidas."
            ],
            [
              "Como funciona",
              "<ul><li><strong>Control orchestration:</strong> liga cada controle às ferramentas que o aplicam.</li><li><strong>Compliance Graph:</strong> cruza sinais de vários sistemas para mostrar o que está em risco.</li><li><strong>Unified control mapping:</strong> um controle testado uma vez conta para vários frameworks (SOX, PCI-DSS, ISO 27001, HIPAA, EU AI Act).</li><li><strong>Access Graph</strong> (parte do Context Engine): acompanha o ciclo de vida de acessos de pessoas, máquinas e agentes de IA e confirma a revogação no desligamento.</li><li>Visões por linha de defesa e integração com o <strong>Super Intelligence Control Tower</strong>.</li></ul>"
            ],
            [
              "Integrações",
              "Mais de 100 integrações prontas: cloud, containers, IA, SaaS, on-premises, ferramentas de negócio e sistemas de identidade. O anúncio diz que o monitoramento chega também a ativos OT, IoT e dispositivos médicos."
            ],
            [
              "Prazo",
              "A GA está prevista para o <strong>1º trimestre de 2027</strong>. O anúncio de 04/08/2026 previa dezembro/2026. A nota de 10/11 não cita Armis, Veza nem licenciamento."
            ],
            [
              "Por que importa",
              "Hoje o IRM já monitora controles em SecOps, ITSM, ITAM e CMDB. Com o CCM, a coleta de evidência deixa de ser periódica e manual também fora da plataforma, o que reduz o trabalho de auditoria e de atestação."
            ]
          ],
          "suggestion": "Use a espera até o 1º tri como preparação: (1) liste os controles automatizáveis (acesso, configuração, patch, criptografia) e as ferramentas que geram a evidência de cada um; (2) revise o mapeamento de controles entre frameworks no Policy &amp; Compliance, porque o \"unified control mapping\" depende de controles bem racionalizados; (3) se você já usa Configuration Compliance, o monitoramento contínuo atual entre Configuration Compliance e Policy &amp; Compliance é um bom piloto.",
          "sources": [
            {
              "title": "ServiceNow Brings Agentic Monitoring to Every Control in the Enterprise at Machine Speed",
              "url": "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-Brings-Agentic-Monitoring-to-Every-Control-in-the-Enterprise-at-Machine-Speed/",
              "note": "Newsroom, 10/11/2026"
            },
            {
              "title": "ServiceNow delivers Autonomous Security",
              "url": "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-delivers-Autonomous-Security-the-industrys-most-complete-security-offering/default.aspx",
              "note": "Newsroom, 04/08/2026, com a previsão anterior de dezembro"
            }
          ]
        },
        {
          "module": "irm",
          "subs": [
            "BCM"
          ],
          "kicker": "Business Continuity Management · Store, set–out/2026 (Brazil)",
          "title": "BCM: recovery tasks no Excel, ownership por grupo e integração com o GRC Issue",
          "rows": [
            [
              "O que mudou",
              "<ul><li><strong>Business Continuity Management Advanced 2.0.3</strong> (set/2026): issues mais rápidas de registrar e resumir, com validação no Foundation e no Advanced e plano de resolução automatizado no Advanced; ownership por grupo em BIA, planos e eventos; sincronização de owner e contributors na BIA; integração com o módulo GRC Issue; import e export de recovery tasks pelo Excel; melhor colaboração entre recovery teams durante a crise; correções de desempenho no Crisis Map.</li><li><strong>GRC: Business Continuity Planning 12.0.7</strong> (set/2026): abas \"My group's\" em My Tasks, reordenação de tarefas no Gantt por dependência e recovery teams no nível global.</li><li><strong>Outubro/2026:</strong> BCP 12.1.2 traz suporte a knowledge graph para os apps de BCM. O BCM Advanced 2.1.2 só atualiza os apps de BCM e de AI Platform para as versões de outubro.</li></ul>"
            ],
            [
              "Everbridge",
              "As release notes não citam mudança na integração com o Everbridge. O guia de integração segue igual. Veja na aba Integrações o novo relato sobre a falta de OAuth no conector."
            ],
            [
              "Por que importa",
              "Planos com dezenas de recovery tasks eram montados tarefa a tarefa. O Excel acelera a carga inicial e a revisão anual. Ownership por grupo resolve o problema de plano parado quando o dono sai da empresa."
            ]
          ],
          "suggestion": "Na próxima revisão anual de planos, exporte as recovery tasks de um plano piloto, revise com a área dona no Excel (owner, dependências, assignees) e reimporte. Confira o Import log antes de aprovar o plano: nomes de assignee inválidos são ignorados sem erro.",
          "howto": [
            {
              "featured": true,
              "title": "Importar e exportar recovery tasks com o Microsoft Excel",
              "release": "Brazil · Business Continuity Management (BCM Advanced 2.0.3+)",
              "basis": "Resumo da página oficial \"Import and export recovery tasks using Microsoft Excel\" (docs Brazil, atualizada em 10/09/2026).",
              "prereqs": [
                "Role <code>sn_bcm.core_viewer</code>.",
                "Acesso de leitura aos registros citados no arquivo: CIs, usuários, assignment groups, recovery strategies, loss scenarios e planos relacionados.",
                "A página não lista plugins obrigatórios."
              ],
              "path": "Workspaces &gt; Business Continuity Workspace",
              "steps": [
                "No Business Continuity Workspace, abra o business continuity plan e vá na aba <strong>Recovery tasks</strong>.",
                "Na barra de ações, selecione <strong>Export to Excel</strong>, ajuste o nome se quiser e clique em <strong>Download</strong>.",
                "Edite a planilha <strong>Recovery task</strong>: só células desbloqueadas; use as listas suspensas (Owner é lista de usuários); Additional assignees e Dependencies aceitam valores separados por vírgula.",
                "Para atualizar, mantenha o ID numérico da tarefa. Para criar, use um ID temporário com prefixo N (ex.: N1) numa linha vazia. Ele pode ser citado em Dependencies.",
                "Não renomeie abas nem reordene colunas. Salve em .xlsx.",
                "Na related list Recovery tasks, selecione <strong>Import from Excel</strong>, anexe o arquivo e clique em <strong>Save</strong>.",
                "Acompanhe em <strong>View import progress</strong> e revise as abas <strong>Import log</strong> e <strong>Transform history</strong>."
              ],
              "note": "A importação entra na fila e um job processa 500 linhas a cada 60 segundos. Use só arquivos gerados pelo Export to Excel. Se um assignee não existir e a validação do Excel for burlada, o nome é ignorado sem erro. Para reimportar depois de erros, desproteja a planilha (Review &gt; Unprotect Sheet), apague as linhas já importadas e repita a importação. <em>Sugestão:</em> faça o primeiro teste em sub-prod com um plano pequeno.",
              "docUrl": "https://www.servicenow.com/docs/r/governance-risk-compliance/export-import-recovery-tasks-using-excel.html"
            }
          ],
          "sources": [
            {
              "title": "Business Continuity Management Advanced release notes (Store Version History)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-grc-rn-business-continuity-mgmt-advanced.html",
              "note": "atualizado em 08/10/2026"
            },
            {
              "title": "GRC: Business Continuity Planning release notes (Store Version History)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-grc-rn-business-continuity-planning.html",
              "note": "atualizado em 08/10/2026"
            }
          ]
        },
        {
          "module": "irm",
          "subs": [
            "Operational Resilience",
            "BCM",
            "Estratégia e agentes"
          ],
          "kicker": "Operational Resilience · anúncio de 15/10/2026",
          "title": "Operational Resilience para serviços financeiros já disponível; AI Passport chega no 4º tri",
          "rows": [
            [
              "O que mudou",
              "No anúncio de 15/10, a ServiceNow informou que a solução de <strong>Operational Resilience para serviços financeiros</strong> está disponível. Segundo a nota, ela junta governança de IA, risco e segurança num só lugar e dá a CROs e CISOs a mesma visibilidade em tempo real. A ideia é que bancos consigam fazer triagem, contenção e revogação de acesso dentro do prazo regulatório de notificação."
            ],
            [
              "Mesmo anúncio",
              "<strong>AI Passport</strong>: credencial que o agente de IA consulta em tempo de execução para checar o que pode fazer. Ele se baseia em CMDB, políticas de GRC e aprovações de workflow, com bloqueio gradual até um kill switch. Também foram anunciados <strong>shadow AI detection</strong> e AI Cost Management. Os três têm previsão para o 4º tri/2026. A nota passa a chamar a plataforma de governança de IA de <strong>Super Intelligence Control Tower</strong>."
            ],
            [
              "Release Brazil",
              "As release notes de Operational Resilience (v23.0.9) trazem contributors e collaborators em casos de DRIR, trilha de auditoria de mudanças nos incidentes de origem, melhorias no reporting de DORA e um job trimestral (inativo por padrão) que exporta a terminologia do register of information no CSV B_99.01."
            ],
            [
              "Por que importa",
              "Para quem já usa Operational Resilience por causa de DORA, os prazos curtos de notificação são o ponto crítico. A solução financeira e o AI Passport colocam agentes de IA no mesmo fluxo de incidente e risco."
            ]
          ],
          "suggestion": "Se você atende banco: (1) ative o job trimestral de export do register of information (vem inativo e não manda e-mail) e confira o primeiro CSV; (2) inclua o \"incidente envolvendo agente de IA\" nos cenários de BCM e DRIR, porque a nota trata um agente rebelde como qualquer outro ativo exposto; (3) pergunte ao account team se a solução financeira exige SKU próprio, já que o anúncio não fala de licenciamento.",
          "sources": [
            {
              "title": "ServiceNow advances its operational harness for enterprise AI with AI Passport and expanded governance capabilities",
              "url": "https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-advances-its-operational-harness-for-enterprise-AI-with-AI-Passport-and-expanded-governance-capabilities/default.aspx",
              "note": "Newsroom, 15/10/2026"
            },
            {
              "title": "Operational Resilience release notes (Brazil)",
              "url": "https://www.servicenow.com/docs/r/release-notes/grc-or-rn.html",
              "note": "atualizado em 10/09/2026"
            }
          ]
        },
        {
          "module": "irm",
          "subs": [
            "Advanced Risk"
          ],
          "kicker": "Advanced Risk · Store, out/2026",
          "title": "Advanced Risk 23.1.2 traz o GRC Advisor para qualidade dos dados de risco",
          "rows": [
            [
              "O que mudou",
              "A versão 23.1.2 (out/2026, Brazil) adiciona uma configuração do <strong>GRC Advisor</strong> para as tabelas Risk e Risk Event. Ela ativa recursos de correção e sugestão, mas só funciona com o app Data Quality Optimization for Governance, Risk, and Compliance instalado."
            ],
            [
              "Lembrete da 23.0.6",
              "Na versão de setembro, o licenciamento passou do modelo de entitlement para identificador de plugin: é preciso instalar o app do SKU correspondente (ex.: Integrated Risk Management Professional ou Enterprise). A mesma versão permite projetos de risk assessment com várias entidades e comentário obrigatório."
            ],
            [
              "Por que importa",
              "A mudança para identificador de plugin pode deixar recursos indisponíveis depois do upgrade se o app do SKU certo não estiver instalado."
            ]
          ],
          "suggestion": "Antes do upgrade para Brazil, confira com o time de plataforma qual app de SKU de IRM está instalado em cada instância. Se a base de riscos tem muitos registros incompletos, avalie o Data Quality Optimization junto com o GRC Advisor.",
          "sources": [
            {
              "title": "GRC: Advanced Risk release notes (Store Version History)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-grc-rn-advanced-risk.html",
              "note": "atualizado em 08/10/2026"
            }
          ]
        }
      ],
      "notes": "Os itens de BCM, Operational Resilience e Advanced Risk são de outubro (Store de 08/10 e anúncio de 15/10). Eles entram agora porque ficaram de fora da edição nº 1, e o radar acompanha BCM e Operational Resilience toda semana. Não achei release de SecOps (SIR, USEM, TISC) com data entre 09 e 16/11: as páginas de Store do SIR são índices e não mostram versões novas. Sem \"Como aplicar\": o CCM ainda não tem GA nem procedimento publicado; a solução financeira de Operational Resilience e o AI Passport não têm página de procedimento nas docs; o GRC Advisor depende de outro app e não achei o procedimento oficial. A renomeação do AI Control Tower para Super Intelligence Control Tower aparece nas notas de outubro e novembro, mas a ServiceNow não publicou um comunicado específico sobre a mudança de nome."
    },
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
    { date: "2026-11-24", module: "secops", title: "Office Hours: Security Operations Applications", detail: "ServiceNow Exchange · online, perguntas livres ao time de produto de SecOps", url: "https://www.servicenow.com/community/secops-events/servicenow-exchange-office-hours-security-operations/ec-p/3622626" },
    {"date":"2026-11-18","module":"secops","title":"What's New &amp; What's Next for Security Case Management, Q4 2026","detail":"webinar do time de produto · SIR, TISC e Otto para SIR · 8h–9h PT (13h–14h em Brasília)","url":"https://www.servicenow.com/community/secops-events/what-s-new-amp-what-s-next-for-security-case-management-q4-2026/ev-p/3620823"},
    { date: "2026-11-18", module: "irm", title: "Workshop virtual: Business Continuity Management", detail: "10h–12h PT (15h–17h em Brasília)", url: "https://info.servicenow.com/ServiceNowExchange-SecurityandRisk-Solutions.html?cid=losn:com" },
    { date: "2026-11-19", module: "secops", title: "Office Hours: migração para USEM", detail: "online", url: "https://www.servicenow.com/community/secops-events/office-hours-unified-security-exposure-management-usem-migration/ev-p/3601125" },
    { date: "2026-12-02", module: "geral", title: "ServiceNow World Forum Paris", detail: "", url: "https://www.servicenow.com/events/world-forum/paris.html" },
    { date: "2026-12-10", module: "secops", title: "Office Hours: migração para USEM", detail: "online, nova sessão", url: "https://www.servicenow.com/community/secops-events/office-hours-unified-security-exposure-management-usem-migration/ev-p/3601126" },
    { date: null, module: "secops", title: "What's New for Security Operations, Q3 2026", detail: "sob demanda · SIR, TISC, USEM e Otto", url: "https://www.servicenow.com/community/secops-events/servicenow-exchange-what-s-new-for-security-operations-q3-2026/ev-p/3613367" }
  ]
};
