/* Radar SAM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  "editions": [
    {
      "id": 2,
      "date": "2026-11-26",
      "period": "Store de out–nov/2026 (Software Asset Management 5.1.3, Software Asset Workspace 12.1.0, Otto for SAM 12.0.0 e 13.0.0)",
      "summary": [
        {
          "tag": "workspace",
          "module": "secops",
          "html": "<strong>Relatório novo \"Installs without a matching subscription\"</strong> no Software Asset Workspace 12.1.0 (Brazil) e 11.1.0 (Australia): instalações de produtos por assinatura sem a user subscription correspondente."
        },
        {
          "tag": "IA",
          "module": "secops",
          "html": "<strong>Evaluate Software Reclamation AI Agent</strong> abre direto da aba Reclamation (Otto for SAM 12.0.0 e Workspace 12.0.6), avaliando candidatos por integration profile e por software model."
        },
        {
          "tag": "correção",
          "module": "secops",
          "html": "<strong>Software Asset Management 5.1.3:</strong> corrige o cálculo de licenças Microsoft Per-Server para VMs de cluster aposentadas ou sem instalações, resolve defeitos de domain separation e prepara o futuro AI reclamation specialist."
        },
        {
          "tag": "IA",
          "module": "secops",
          "html": "<strong>Correção da edição nº 1:</strong> as cinco skills que resolvem erros de importação de entitlements saíram no Otto for SAM <strong>13.0.0</strong>, não na 11.0.0."
        }
      ],
      "items": [
        {
          "module": "secops",
          "subs": [
            "Workspace"
          ],
          "kicker": "Software Asset Workspace · versões 12.1.0 (Brazil) e 11.1.0 (Australia) · novembro/2026",
          "title": "Relatório de instalações sem assinatura correspondente",
          "rows": [
            [
              "O que mudou",
              "A seção Reports ganhou o relatório <strong>Installs without a matching subscription</strong>. Ele lista instalações ligadas a produtos licenciados por assinatura que não têm a user subscription correspondente."
            ],
            [
              "Por que importa",
              "Segundo a ServiceNow, ajuda a achar lacunas de licenciamento e problemas de reconciliação."
            ]
          ],
          "suggestion": "Use o relatório como checagem antes de uma reconciliação de produtos SaaS com cliente instalado (por exemplo, Adobe ou Microsoft 365): instalação sem assinatura costuma indicar usuário fora da integração SaaS ou integração com falha. Cruze com o log da integração antes de tratar como não conformidade.",
          "sources": [
            {
              "title": "Software Asset Workspace release notes (Store)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-itam-software-asset-ws.html",
              "note": "docs oficiais, versão 12.1.0"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "IA (Otto)",
            "Workspace"
          ],
          "kicker": "ServiceNow Otto for SAM 12.0.0 · Software Asset Workspace 12.0.6 · outubro/2026",
          "title": "Avaliar candidatos de reclamation com IA direto da aba Reclamation",
          "rows": [
            [
              "O que mudou",
              "O <strong>Evaluate Software Reclamation AI Agent</strong> passa a ser aberto direto da aba Reclamation da visão License usage. Ele avalia candidatos de remoção de assinaturas tanto no nível do integration profile quanto do software model, usando os dados do reclamation summary."
            ],
            [
              "Como funciona",
              "O agente checa ID do produto, se o software é instalado ou por assinatura, último uso e outras métricas. Ele informa quantos candidatos são elegíveis, <strong>exclui usuários VIP</strong> e só inicia a recuperação depois da sua confirmação. Só candidatos no estado <strong>Ready</strong> podem ser recuperados."
            ],
            [
              "Modelos de IA",
              "A mesma versão adiciona suporte ao Gemma pelo Now LLM Service. Modelos antigos seguem disponíveis para skills e agentes já publicados, mas não para desenvolvimento novo (KB3066214)."
            ]
          ],
          "suggestion": "Como o agente recupera de verdade após a confirmação, rode a primeira avaliação num produto de baixo risco e revise as work notes na aba Activity dos candidatos antes de liberar o uso para todo o time.",
          "howto": [
            {
              "featured": true,
              "title": "avaliar candidatos de remoção com o agente do Otto",
              "release": "Brazil · ServiceNow Otto for SAM 12.0.0+",
              "basis": "Procedimento \"Evaluate software removal candidates agentic workflow\" da documentação oficial.",
              "prereqs": [
                "Software Asset Management integrado com AI agents.",
                "Acesso ao painel do ServiceNow Otto.",
                "AI agents com acesso a reclamation rules, removal candidates, products e license metric results."
              ],
              "path": "Software Asset Workspace &gt; License usage &gt; Reclamation (ou License usage &gt; Publishers &gt; Removal candidates)",
              "steps": [
                "No Software Asset Workspace, vá em <strong>License usage &gt; Reclamation</strong>.",
                "Selecione o ícone do <strong>Otto</strong> na frente de um registro. Alternativa: em <strong>License usage &gt; Publishers</strong>, escolha o publisher, abra a aba <strong>Removal candidates</strong> e selecione <strong>Evaluate removal candidates</strong>.",
                "No painel, escolha o produto na lista sugerida. A lista muda conforme o ponto de partida: todos os publishers, só o publisher escolhido ou só o produto da aba de resultados do software model.",
                "Aguarde as checagens. Se alguma falhar, o painel mostra o erro e o fluxo para.",
                "Confira a quantidade de candidatos elegíveis informada pelo agente e confirme se quer recuperar.",
                "Ao final, veja os candidatos recuperados e as work notes na aba <strong>Activity</strong> de cada removal candidate."
              ],
              "note": "Só candidatos no estado Ready podem ser recuperados. O agente exclui usuários VIP da avaliação.",
              "docUrl": "https://www.servicenow.com/docs/r/it-asset-management/software-asset-management/now-assist-sam-evaluate-removal-candidate-workflow.html"
            }
          ],
          "sources": [
            {
              "title": "ServiceNow Otto for SAM release notes",
              "url": RN + "servicenow-otto-sam-rn.html",
              "note": "docs oficiais, versão 12.0.0"
            },
            {
              "title": "Software Asset Workspace release notes (Store)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-itam-software-asset-ws.html",
              "note": "docs oficiais, versão 12.0.6"
            },
            {
              "title": "Evaluate software removal candidates agentic workflow",
              "url": "https://www.servicenow.com/docs/r/it-asset-management/software-asset-management/now-assist-sam-evaluate-removal-candidate-workflow.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Publishers",
            "Implantação"
          ],
          "kicker": "Software Asset Management (Store) · versão 5.1.3 · novembro/2026",
          "title": "Correção no cálculo Microsoft Per-Server e base do AI reclamation specialist",
          "rows": [
            [
              "O que mudou",
              "<ul><li>Corrige o cálculo de licenças <strong>Microsoft Per-Server</strong> para VMs de cluster aposentadas ou sem instalações.</li><li>Resolve defeitos de <strong>domain separation</strong>.</li><li>Prepara a base para o recurso <strong>AI reclamation specialist</strong>, ainda sem detalhes publicados.</li></ul>"
            ],
            [
              "Outras famílias",
              "Em outubro saíram a 4.1.8 (Australia) e a 3.2.10 (Zurich), com a mesma base do AI reclamation specialist e correções em domain separation, relatórios de software lifecycle, status de instalação em ESXi e cálculo de savings nos license metric results."
            ]
          ],
          "suggestion": "Se a posição Microsoft Per-Server de clusters parecia inflada por VMs aposentadas, atualize o app e rode a reconciliação de novo antes do próximo true-up. Guarde o resultado anterior para comparar.",
          "sources": [
            {
              "title": "Software Asset Management release notes (Store)",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-itam-software-asset-mgmt.html",
              "note": "docs oficiais, versões 5.1.3, 4.1.8 e 3.2.10"
            }
          ]
        }
      ],
      "notes": "Semana sem release note mensal nova do SAM na família Brazil (a página segue atualizada em 10/09/2026, com a seção October 2026). Esta edição cobre versões da Store publicadas até 05/11/2026 que a edição de estreia não incluiu. Correção: a edição nº 1 atribuiu as cinco skills de importação de entitlements ao Otto for SAM 11.0.0; elas são da versão 13.0.0. No guia de integrações, entraram dois itens de KBs oficiais (GitHub Enterprise Cloud e Salesforce CRM)."
    },
    {
      "id": 1,
      "date": "2026-11-13",
      "period": "release Brazil e Store até out/2026 (edição de estreia)",
      "summary": [
        {
          "tag": "SAP",
          "module": "secops",
          "html": "<strong>Licenças do SAP S/4HANA Cloud, Private Edition (RISE):</strong> cálculo automático da posição em FUE pelo publisher pack de SAP."
        },
        {
          "tag": "SaaS",
          "module": "secops",
          "html": "<strong>Zoom Workplace:</strong> a integração SaaS reconhece suítes e subprodutos, e identifica usuários inativos pelo último login (SaaS License Management 18.1.1+)."
        },
        {
          "tag": "workspace",
          "module": "secops",
          "html": "<strong>Aba única de Reclamation</strong> no Software Asset Workspace, novas integrações (Smartsheet, Entra ID), deduplicação melhorada e inferência automática de suítes."
        },
        {
          "tag": "mudança",
          "module": "warn",
          "html": "<strong>Software Spend Detection saiu da Core UI</strong> e agora fica no Software Asset Workspace, com análise de gastos por IA no Otto for SAM 11.0.0."
        }
      ],
      "items": [
        {
          "module": "secops",
          "subs": [
            "Publishers",
            "SAP"
          ],
          "kicker": "Software Asset Management · Brazil Early Availability",
          "title": "Gestão de licenças do SAP S/4HANA Cloud, Private Edition",
          "rows": [
            [
              "O que mudou",
              "O SAM passa a estabelecer a posição de licenças do SAP S/4HANA Cloud, Private Edition entregue via RISE with SAP, sem controle manual de classificação de usuários nem de consumo de engine e banco. Ele coleta dados de uso dos sistemas em nuvem privada e calcula automaticamente a posição em <strong>Full Usage Equivalent (FUE)</strong> com o publisher pack de SAP."
            ],
            [
              "Por que importa",
              "A ServiceNow destaca a redução da exposição em auditoria, medindo a nuvem privada junto com os sistemas SAP on-premises."
            ]
          ],
          "suggestion": "Se a empresa migrou ou está migrando para RISE, este é o item mais valioso da release: o FUE costuma ser calculado em planilha. Compare a primeira posição calculada pelo SAM com o último relatório da SAP antes de confiar nela para renovação.",
          "sources": [
            {
              "title": "Software Asset Management release notes · Brazil",
              "url": RN + "software-asset-management-rn.html",
              "note": "docs oficiais"
            }
          ],
          "howto": [
            {
              "featured": true,
              "title": "carregar o license ruleset no SAP S/4HANA Cloud, Private Edition",
              "release": "Brazil · publisher pack de SAP",
              "basis": "Procedimento \"Upload the license ruleset for SAP S/4HANA Private Cloud\" da documentação oficial.",
              "prereqs": [
                "Papel de SAP Basis administrator.",
                "Satellite transport do SAP S/4HANA Private Cloud já instalado no SAP (página \"Deploy the ABAP program for SAP\").",
                "Arquivo <code>License_Ruleset.xlsx</code>, que vem no pacote de download da ServiceNow Store.",
                "Conexão HTTPS confiável: o certificado Root CA exportado do SAP (transação STRUST) importado no cacerts do MID Server, exigido em toda integração com o Private Edition."
              ],
              "path": "SAP: transação SA38 &gt; programa SLIM_USER_CLF_HELP &gt; Manage Rulesets &amp; Results",
              "steps": [
                "Entre no SAP S/4HANA Private Cloud.",
                "No campo de comando, digite a transação <strong>SA38</strong> e pressione Enter.",
                "Em Program, informe <strong>SLIM_USER_CLF_HELP</strong> e selecione <strong>Execute</strong>.",
                "Na SAP License Administration Workbench, selecione <strong>Manage Rulesets &amp; Results</strong> e depois <strong>Upload Ruleset</strong>.",
                "Escolha o arquivo <code>License_Ruleset.xlsx</code> e selecione <strong>Upload</strong>.",
                "Confirme a mensagem de sucesso."
              ],
              "note": "O arquivo precisa se chamar exatamente <code>License_Ruleset.xlsx</code>: renomear causa erro no processamento. É uma configuração única; depois, a classificação FUE (Developer, Advanced, Core e Self-Service) roda sozinha por agendamento. Se o SAP já tiver um ruleset compatível, pule este passo.",
              "docUrl": "https://www.servicenow.com/docs/r/it-asset-management/software-asset-management/upload-license-ruleset-sap-private-cloud.html"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "SaaS"
          ],
          "kicker": "SaaS License Management · release de outubro/2026",
          "title": "Integração com Zoom Workplace ampliada",
          "rows": [
            [
              "O que mudou",
              "A integração reconhece as ofertas do Zoom Workplace, a estrutura de suítes e subprodutos (Meetings, Webinars, Phone, Chat) para uma reconciliação de entitlement correta. Usuários inativos passam a ser identificados pelo <strong>último login</strong>, e não mais pelo histórico de reuniões hospedadas, o que reduz falsos positivos na recuperação de licenças."
            ],
            [
              "Requisito",
              "Disponível a partir da versão 18.1.1 do app Software Asset Management - SaaS License Management."
            ],
            [
              "Permissões no Zoom",
              "A doc pede o mínimo necessário. Baixar assinaturas: <code>user:read:list_users:admin</code> e <code>user:read:settings:admin</code>. Atividade dos usuários: <code>meeting:read:list_meetings:admin</code> e <code>webinar:read:list_webinars:admin</code>. Recuperar licenças: <code>user:update:settings:admin</code>, <code>user:update:user:admin</code> e <code>user:delete:user:admin</code>."
            ]
          ],
          "suggestion": "Antes de recuperar licenças Zoom com o critério novo, rode um ciclo só de relatório: quem não hospeda reuniões mas participa delas deixa de aparecer como inativo, então a lista de candidatos deve diminuir.",
          "sources": [
            {
              "title": "Software Asset Management release notes",
              "url": RN + "software-asset-management-rn.html",
              "note": "docs oficiais, seção October 2026"
            },
            {
              "title": "Integrating with Zoom",
              "url": "https://www.servicenow.com/docs/r/it-asset-management/saas-license-management/integrate-with-zoom.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Workspace",
            "Implantação"
          ],
          "kicker": "Software Asset Management · Brazil Early Availability",
          "title": "Product Hub, Configuration Console e aba única de Reclamation",
          "rows": [
            [
              "O que mudou",
              "<ul><li>Instalação do SAM e dependências pelo <strong>Product Hub</strong>, com documentação, vídeos, release notes e links da Community no mesmo lugar.</li><li><strong>Configuration Console</strong> para fundações de software, propriedades, skills de IA, governança, equipe e dados, inclusive por conversa com IA.</li><li>Uma <strong>aba Reclamation</strong> consolidada na visão License usage do Software Asset Workspace, juntando candidatos de todos os publishers, integrações SaaS e software instalado.</li><li>Integrações melhoradas com <strong>Smartsheet</strong> e <strong>Microsoft Entra ID</strong>, mais métricas de licença predefinidas, deduplicação melhorada e inferência automática de suítes.</li></ul>"
            ]
          ],
          "suggestion": "A aba Reclamation consolidada facilita uma rotina mensal de recuperação de licenças com um único relatório para todos os publishers. Vale montar a rotina com o time de compras.",
          "sources": [
            {
              "title": "Software Asset Management release notes · Brazil",
              "url": RN + "software-asset-management-rn.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "IA (Otto)",
            "Gastos"
          ],
          "alert": true,
          "kicker": "ServiceNow Otto for SAM · versões 11.0.0 e 13.0.0",
          "title": "Análise de gastos com IA e Software Spend Detection fora da Core UI",
          "rows": [
            [
              "O que mudou",
              "<ul><li>O Software Asset Workspace identifica automaticamente compras de software nas transações importadas, extrai publisher e produto e casa com a Content Library do SAM.</li><li>Cinco skills novas de IA resolvem dados de publisher e produto que travam importações de entitlement em massa: Publisher Search Tags Generation, Product Search Tags Generation, Publisher Match Review, Product Match Review e Product Resolution.</li></ul>"
            ],
            [
              "Mudança de lugar",
              "O <strong>Software Spend Detection não está mais disponível na Core UI</strong>. Ele fica no Software Asset Workspace, em License operations. Importações e transações criadas na Core UI continuam acessíveis por lá."
            ]
          ],
          "suggestion": "Atualize procedimentos e treinamentos que ensinam o caminho pela Core UI. As skills de normalização ajudam muito na carga inicial de entitlements de contratos antigos, que costuma ter nomes de produto inconsistentes.",
          "sources": [
            {
              "title": "ServiceNow Otto for SAM release notes",
              "url": RN + "servicenow-otto-sam-rn.html",
              "note": "docs oficiais"
            }
          ]
        }
      ],
      "notes": "Edição de estreia montada a partir das release notes oficiais. O guia de integrações deste módulo entra numa próxima versão."
    }
  ],
  "events": []
};
