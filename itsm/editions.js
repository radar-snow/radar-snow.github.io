/* Radar ITSM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  "editions": [
    {
      "id": 2,
      "date": "2026-11-24",
      "period": "13 a 24 nov/2026 (Brazil Patch 2)",
      "summary": [
        {
          "tag": "upgrade",
          "module": "warn",
          "html": "<strong>Brazil Patch 2 corrige regressão em Incident, Change, Problem e Request</strong> causada pela ativação automática do DF Advisor no upgrade (propriedade <code>com.snc.task.principal_class_filter</code>)."
        },
        {
          "tag": "change",
          "module": "secops",
          "html": "<strong>Dynamic CI Groups voltam a gerar Affected CIs</strong> na change request: o Patch 2 corrige o unpack que não criava os registros."
        },
        {
          "tag": "catálogo",
          "module": "secops",
          "html": "<strong>Catalog client scripts e UI policies voltam a rodar no RITM e no sc_task</strong> para quem só lê o registro (correção destacada, KB3159281)."
        },
        {
          "tag": "sow",
          "module": "secops",
          "html": "<strong>Service Operations Workspace:</strong> correções para o erro de cross scope ao criar incidente pelo botão + e para vídeos que sumiam de artigos de conhecimento."
        }
      ],
      "items": [
        {
          "module": "secops",
          "subs": [
            "Upgrade e segurança",
            "Incident",
            "Change"
          ],
          "kicker": "Brazil Patch 2 · PRB2093236",
          "title": "Ativação automática do DF Advisor causava regressão em Incident, Change, Problem e Request",
          "rows": [
            [
              "O que mudou",
              "O Patch 2 corrige a ativação automática do DF Advisor, que causava comportamento regressivo em incident, change, problem e request depois do upgrade. O ponto central é a propriedade <code>com.snc.task.principal_class_filter</code>."
            ],
            [
              "Como deve ficar",
              "<ul><li>Em instância nova (zboot) ou atualizada sem nenhuma principal CI class configurada antes do upgrade: a propriedade deve estar <strong>vazia</strong>.</li><li>Em instância atualizada que já tinha ao menos uma principal CI class: a propriedade deve ter <strong>o mesmo valor de antes do upgrade</strong>.</li></ul>"
            ],
            [
              "Por que importa",
              "Essa propriedade filtra quais CIs aparecem nos formulários de task. Um valor errado depois do upgrade muda o que o service desk consegue selecionar em incidentes e changes."
            ]
          ],
          "suggestion": "Se a instância já está na Brazil sem o Patch 2, abra <code>sys_properties</code>, procure <code>com.snc.task.principal_class_filter</code> e compare com o valor anterior ao upgrade (um clone antigo ou o histórico de versões ajuda). Inclua essa checagem no roteiro de teste de upgrade.",
          "sources": [
            {
              "title": "Brazil Patch 2 release notes",
              "url": RN + "brazil-patch-2.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Change"
          ],
          "kicker": "Change Management · Brazil Patch 2 · PRB2079977",
          "title": "Dynamic CI Groups não geravam Affected CIs na change",
          "rows": [
            [
              "O problema",
              "Ao usar um Dynamic CI Group como Configuration Item ou Affected CI, o unpack terminava, mas os registros de Affected CI não eram criados, por uma falha no caminho de processamento herdado da Australia."
            ],
            [
              "Impacto",
              "Tudo o que depende dos Affected CIs fica incompleto: análise de impacto, detecção de conflitos e aprovações baseadas nos CIs afetados."
            ],
            [
              "Correção",
              "Corrigido no Brazil Patch 2."
            ]
          ],
          "suggestion": "Se o time usa Dynamic CI Groups em changes, revise as changes abertas desde o upgrade e confira se a lista de Affected CIs está completa. Depois do patch, teste com uma change de exemplo antes de confiar de novo na detecção de conflitos.",
          "sources": [
            {
              "title": "Brazil Patch 2 release notes",
              "url": RN + "brazil-patch-2.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Service Catalog"
          ],
          "kicker": "Service Catalog e Request · Brazil Patch 2",
          "title": "Client scripts e UI policies bloqueados no RITM e outras correções de catálogo",
          "rows": [
            [
              "Correção destacada",
              "<strong>PRB2089751 (KB3159281):</strong> catalog client scripts e UI policies não rodavam nos formulários de RITM e sc_task para usuários que conseguem ler o registro. O resolver retornava \"User doesn't have access to the item\". A regra correta: o User Criteria do item (canView) só controla o pedido no catálogo, não os registros de atendimento."
            ],
            [
              "Outras correções",
              "<ul><li><strong>PRB2089828:</strong> o histórico de stages do RITM não aparecia quando o request era cancelado pela UI action Cancel Request.</li><li><strong>PRB2091274:</strong> o Catalog Builder não mostrava as seções de UI policy e client script para quem tem <code>catalog_builder_editor</code> sem <code>catalog_admin</code>.</li><li><strong>PRB2072938:</strong> variáveis criptografadas de record producer apareciam criptografadas na visualização de listas do incidente.</li></ul>"
            ]
          ],
          "suggestion": "Se o fulfillment reclamou de campos que não aparecem ou não ficam obrigatórios no RITM e no sc_task depois do upgrade, a causa provável é o PRB2089751. Leia o KB3159281 no Now Support antes de criar contorno próprio.",
          "sources": [
            {
              "title": "Brazil Patch 2 release notes",
              "url": RN + "brazil-patch-2.html",
              "note": "docs oficiais"
            },
            {
              "title": "KB3159281 (Now Support)",
              "url": "https://hi.service-now.com/kb_view.do?sysparm_article=KB3159281",
              "note": "KB oficial, exige login"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Service Operations Workspace"
          ],
          "kicker": "Service Operations Workspace · Brazil Patch 2",
          "title": "Correções no SOW para incidentes e conhecimento",
          "rows": [
            [
              "O que foi corrigido",
              "<ul><li><strong>PRB2078372:</strong> erro de cross scope ao clicar no + do SOW para criar um incidente (ligado ao Field Encryption Starter).</li><li><strong>PRB2083677:</strong> vídeos inseridos por Insert/Edit Media eram removidos dos artigos de conhecimento e não apareciam no SOW.</li><li><strong>PRB1977691:</strong> a busca da página de categorias do catálogo não respeitava o tema escuro do SOW.</li></ul>"
            ],
            [
              "Por que importa",
              "Criar incidente pelo + é um dos atalhos mais usados pelo service desk, e artigos com vídeo costumam ser os de resolução mais rápida."
            ]
          ],
          "suggestion": "Se a instância usa Field Encryption e o service desk tem reclamado de erro ao criar incidente no SOW, priorize o Patch 2. Teste também um artigo com vídeo embutido no workspace.",
          "sources": [
            {
              "title": "Brazil Patch 2 release notes",
              "url": RN + "brazil-patch-2.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Incident",
            "IA (Otto)"
          ],
          "kicker": "Newsroom · Microsoft Ignite 17/11/2026",
          "title": "Demonstração: alerta do Azure vira incidente resolvido com agentes de IA",
          "rows": [
            [
              "O que foi mostrado",
              "Um problema detectado no Azure (Azure Monitor e o agente Azure SRE) chega ao agente de AIOps da ServiceNow, que grava resumo, diagnóstico de nível 2, causa provável e próximos passos nas work notes do alerta, fecha o alerta e abre um incidente. A remediação é feita pelo ITSM junto com o agente Azure SRE, com aprovação e execução governadas."
            ],
            [
              "Atenção",
              "É uma demonstração na Ignite, não uma release com versão ou data de disponibilidade."
            ]
          ],
          "suggestion": "Para quem roda carga no Azure, o anúncio mostra para onde vai o fluxo alerta → incidente. Ainda não há o que instalar: acompanhe a doc e pergunte ao account team antes de planejar.",
          "sources": [
            {
              "title": "Microsoft Ignite: ServiceNow delivers governable autonomous IT to Azure",
              "url": "https://newsroom.servicenow.com/press-releases/details/2026/Microsoft-Ignite-ServiceNow-delivers-governable-autonomous-IT-to-Azure/default.aspx",
              "note": "newsroom oficial"
            }
          ]
        }
      ],
      "notes": "O Brazil Patch 2 saiu em 05/11/2026, antes da edição nº 1, mas não tinha sido coberto; entra agora com as correções de ITSM. As release notes de cada app de ITSM (Change, Incident, Request, Service Catalog, SOW, Otto for ITSM) seguem sem atualização desde setembro."
    },
    {
      "id": 1,
      "date": "2026-11-13",
      "period": "release Brazil (set a nov/2026, edição de estreia)",
      "summary": [
        {
          "tag": "ação",
          "module": "warn",
          "html": "<strong>Upgrade para Brazil ativa novas ACLs:</strong> o plugin ITSM Enhanced Security Features passa a ser ativado automaticamente e aplica regras \"deny unless authenticated\" em várias tabelas de ITSM."
        },
        {
          "tag": "change",
          "module": "secops",
          "html": "<strong>Change ganha agentes de IA autônomos:</strong> criação de change a partir de conversa, sugestão de CI, de template e de plano, e avaliação de qualidade que grava nota e score sozinha."
        },
        {
          "tag": "incident",
          "module": "secops",
          "html": "<strong>Incidente em On-hold aguardando o usuário pode se resolver sozinho</strong> depois de 3 tentativas de contato (configurável)."
        },
        {
          "tag": "novo",
          "module": "secops",
          "html": "<strong>Apps novos:</strong> L1 IT Service Desk AI Specialist, que resolve incidentes L1 de ponta a ponta, e ITSM MCP Server, que conecta clientes de IA via MCP."
        },
        {
          "tag": "deprecação",
          "module": "warn",
          "html": "Tópicos pré-prontos do Virtual Agent de ITSM entram em preparação para descontinuação, e Workforce Optimization for ITSM será descontinuado."
        }
      ],
      "items": [
        {
          "module": "secops",
          "subs": [
            "Upgrade e segurança"
          ],
          "alert": true,
          "kicker": "Change e Incident · upgrade para Brazil",
          "title": "ITSM Enhanced Security Features passa a ser ativado no upgrade",
          "rows": [
            [
              "O que mudou",
              "O plugin <code>com.snc.itsm.enhanced_security</code> agora é ativado automaticamente no upgrade para Brazil. Antes, ele só vinha ativo em instâncias novas. Ele adiciona regras de ACL \"deny unless authenticated\" em várias tabelas de ITSM. O plugin Change Management - Collision Detector (<code>com.snc.change.collision</code>) também passa a ser ativado no upgrade."
            ],
            [
              "Por que importa",
              "Qualquer coisa que hoje lê tabelas de ITSM sem autenticação (páginas públicas, widgets, integrações antigas) pode parar de funcionar depois do upgrade."
            ],
            [
              "Se precisar voltar",
              "A ServiceNow orienta abrir chamado no suporte para receber a lista de ACLs a desativar por tabela. Como último recurso, o suporte roda um script que desativa todas as ACLs novas."
            ]
          ],
          "suggestion": "Antes do upgrade, rode o Brazil num clone e teste portais públicos, páginas de status, integrações e relatórios agendados que tocam incident, change e tabelas relacionadas. Liste o que quebrou antes de pedir qualquer reversão: manter as ACLs novas é o mais seguro.",
          "sources": [
            {
              "title": "Change Management release notes · Brazil",
              "url": RN + "change-management-rn.html",
              "note": "docs oficiais"
            },
            {
              "title": "Incident Management release notes · Brazil",
              "url": RN + "incident-management-rn.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Change",
            "IA (Otto)"
          ],
          "kicker": "ServiceNow Otto for ITSM · Brazil e versão 19.0",
          "title": "Change Management com agentes de IA autônomos",
          "rows": [
            [
              "O que mudou",
              "<ul><li><strong>Create change request AI agent:</strong> cria a change a partir de uma conversa, escolhendo sozinho o modelo e o template.</li><li><strong>Change CI suggestion AI agent:</strong> preenche o CI principal e os CIs afetados.</li><li><strong>Change request plans AI agent:</strong> rascunha os campos de plano na fase de readiness, seguindo uma change policy.</li><li><strong>Change template suggestion AI agent:</strong> sugere o template e o modelo mais adequados com base no histórico.</li><li>A avaliação de qualidade da change ganhou um <strong>modo autônomo</strong>: grava a nota e a explicação como work note e cria um registro na tabela AI Change Quality Scores, sem alterar campos da change.</li><li>No Patch 1 / versão 19.0, a busca por changes parecidas passou a considerar só as que atingem um score mínimo de qualidade.</li></ul>"
            ],
            [
              "Requisito",
              "O ServiceNow Otto for ITSM é instalado pela ServiceNow Store."
            ]
          ],
          "suggestion": "Comece pelo modo autônomo de avaliação de qualidade: ele não altera a change, só registra nota e explicação. É um jeito seguro de medir a qualidade das changes do time antes de liberar agentes que criam ou preenchem registros.",
          "sources": [
            {
              "title": "ServiceNow Otto for ITSM release notes · Brazil",
              "url": RN + "now-assist-for-itsm-rn.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Incident"
          ],
          "kicker": "Incident Management · Brazil Early Availability",
          "title": "Resolução automática de incidentes aguardando o usuário",
          "rows": [
            [
              "O que mudou",
              "Quando o incidente vai para On-hold com o motivo <strong>Awaiting Caller Information</strong>, o usuário recebe notificações em um número de tentativas e intervalos configuráveis, contados em dias úteis. Se ele comentar no portal ou responder o e-mail, o incidente volta para In Progress e o agente é avisado. Se não responder, o incidente é resolvido com o código <strong>Resolved - No response from caller</strong>."
            ],
            [
              "Configuração",
              "O padrão é 3 tentativas. Uma propriedade de incidente controla o número de tentativas (0 desliga a automação) e outra controla o intervalo entre elas."
            ],
            [
              "Também nesta release",
              "Um scheduled job instala automaticamente apps como o Major Incident Management, se houver entitlement, mas só em instâncias novas provisionadas por zboot."
            ]
          ],
          "suggestion": "Ótimo para reduzir a fila de incidentes parados \"esperando o usuário\". Alinhe com o service desk o número de tentativas e o texto da notificação, e acompanhe por algumas semanas quantos chamados fecham com \"No response from caller\" para evitar fechamentos indevidos.",
          "sources": [
            {
              "title": "Incident Management release notes · Brazil",
              "url": RN + "incident-management-rn.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Apps novos",
            "IA (Otto)"
          ],
          "kicker": "IT Service Management · release Brazil",
          "title": "L1 IT Service Desk AI Specialist e ITSM MCP Server",
          "rows": [
            [
              "O que é",
              "<ul><li><strong>L1 IT Service Desk AI Specialist:</strong> um \"trabalhador\" autônomo que investiga e resolve incidentes L1 repetitivos de ponta a ponta, sem intervenção humana. Para incidentes que na verdade são pedidos, ele propõe o item de requisição adequado (ex.: acesso a software).</li><li><strong>ITSM MCP Server:</strong> conecta um cliente de IA compatível com Model Context Protocol (MCP) à ServiceNow. Agentes e gestores de TI trabalham incidentes e changes, e usuários consultam e gerenciam os próprios chamados.</li></ul>"
            ],
            [
              "Por que importa",
              "É a primeira vez que a ServiceNow documenta um agente que resolve incidentes L1 sozinho, e uma porta oficial para assistentes de IA externos operarem ITSM."
            ]
          ],
          "suggestion": "Para o L1 AI Specialist, escolha 2 ou 3 tipos de incidente de alto volume e baixa complexidade (reset de senha, acesso a software) como piloto e defina antes o que ele pode resolver sozinho. Para o MCP Server, envolva segurança da informação: é uma nova porta de acesso aos dados de ITSM.",
          "sources": [
            {
              "title": "IT Service Management release notes · Brazil",
              "url": RN + "it-service-management-rn-landing.html",
              "note": "docs oficiais"
            }
          ],
          "howto": [
            {
              "featured": true,
              "title": "atribuir trabalho ao L1 IT Service Desk AI Specialist",
              "release": "Brazil",
              "basis": "Procedimento \"Assigning work to the L1 IT Service Desk AI Specialist\" da documentação oficial.",
              "prereqs": [
                "Role <code>itil_admin</code> para atribuição manual; <code>assignment_rule_admin</code> ou <code>admin</code> para regras de atribuição.",
                "O AI Specialist precisa estar ativo e com capacidades configuradas para o tipo de registro.",
                "AI Specialists não pegam trabalho sozinhos, mesmo estando num grupo de atribuição."
              ],
              "path": "All &gt; System Policy &gt; Rules &gt; Assignment",
              "steps": [
                "Para testar, abra um incidente e coloque o L1 IT Service Desk AI Specialist no campo <strong>Assigned to</strong>. Salve.",
                "Se ele não aparecer na lista, confira se está ativo e com capacidades para aquele tipo de registro.",
                "Para escalar, vá em All &gt; System Policy &gt; Rules &gt; Assignment e selecione <strong>New</strong>.",
                "Dê um nome à regra, por exemplo \"L1 IT Service Desk AI Specialist\".",
                "Na aba <strong>Applies to</strong>, escolha a tabela e os filtros dos chamados que ele deve atender.",
                "Na aba <strong>Assign to</strong>, informe o AI Specialist no campo <strong>User</strong> e selecione <strong>Submit</strong>."
              ],
              "note": "A doc recomenda começar pela atribuição manual e só criar regras depois de ganhar confiança. Advanced Work Assignment (AWA) também funciona, mas só compensa se a empresa já usa AWA. <em>Sugestão:</em> no começo, filtre a regra por categorias de baixo risco.",
              "docUrl": "https://www.servicenow.com/docs/r/it-service-management/work-assign-l1-sd-ai-spec.html"
            },
            {
              "title": "ativar o ITSM MCP Server",
              "release": "Brazil",
              "basis": "Procedimento \"Activate the ITSM MCP Server\" da documentação oficial.",
              "prereqs": [
                "Plugins ativos: ServiceNow Otto for ITSM (<code>sn_itsm_gen_ai</code>), Model Context Protocol Server (<code>sn_mcp_server</code>) e ITSM MCP Server (<code>sn_itsm_mcp_server</code>).",
                "Role <code>sn_mcp_server.admin</code> ou <code>admin</code>; <code>oauth_admin</code> se for criar seu próprio cliente OAuth."
              ],
              "path": "All &gt; MCP Server Console &gt; Configuration &gt; Servers",
              "steps": [
                "Selecione o <strong>ITSM MCP Server</strong>, com o application scope em ITSM MCP Server.",
                "Na lista <strong>Deactivate</strong>, escolha <strong>Activate</strong>. É criado um cliente OAuth com o nome da integração (ex.: <code>sn_itsm_mcp_server.itsm_default</code>).",
                "Configure o OAuth para autenticar o servidor. Usando o cliente criado, os campos da tela Authorization code grant vêm preenchidos.",
                "No campo <strong>Auth scope</strong>, selecione <strong>a2aauthscope</strong>.",
                "Conecte o cliente de IA seguindo \"Connecting to an MCP server from an MCP client\"."
              ],
              "note": "O servidor vem inativo. Ao ativar, todas as ferramentas registradas ficam disponíveis para os clientes MCP conectados. <em>Sugestão:</em> passe por segurança da informação antes de ativar em produção.",
              "docUrl": "https://www.servicenow.com/docs/r/it-service-management/set-up-itsm-mcp-server.html"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Deprecações",
            "Service Operations Workspace"
          ],
          "alert": true,
          "kicker": "Virtual Agent, Workforce Optimization e SOW",
          "title": "O que está saindo ou mudando de lugar",
          "rows": [
            [
              "Em descontinuação",
              "<ul><li>Os <strong>tópicos pré-prontos de NLU do Virtual Agent de ITSM</strong> entram em preparação para descontinuação a partir da Brazil.</li><li>O <strong>ITSM Virtual Agent Conversation Topics Lite</strong> (<code>com.snc.itsm.virtualagent.lite</code>) também está nesse caminho.</li><li><strong>Workforce Optimization for ITSM</strong> é suportado na Brazil, mas será descontinuado numa release futura.</li></ul>"
            ],
            [
              "Service Operations Workspace",
              "Na Brazil, a versão padrão do SOW for ITSM é a 9.5, instalada automaticamente no upgrade. Ela descontinua o Migration Utility do SOW e coloca o conhecimento anexado como related list padrão na aba Related records."
            ]
          ],
          "suggestion": "Se o service desk usa os tópicos prontos do Virtual Agent ou o Workforce Optimization, coloque a substituição no roadmap de 2027 agora. Vale perguntar ao account team qual é o caminho recomendado (as release notes apontam para as experiências com IA).",
          "sources": [
            {
              "title": "ServiceNow Otto for ITSM release notes · Brazil",
              "url": RN + "now-assist-for-itsm-rn.html",
              "note": "docs oficiais"
            },
            {
              "title": "IT Service Management release notes · Brazil",
              "url": RN + "it-service-management-rn-landing.html",
              "note": "docs oficiais"
            },
            {
              "title": "Service Operations Workspace for ITSM release notes · Brazil",
              "url": RN + "service-operations-workspace-itsm-rn.html",
              "note": "docs oficiais"
            }
          ]
        }
      ],
      "notes": "Edição de estreia montada a partir das release notes oficiais da família Brazil. O guia de integrações deste módulo entra numa próxima versão. Datas de GA da Brazil não aparecem nas fontes consultadas."
    }
  ],
  "events": []
};
