/* Radar HAM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  "editions": [
    {
      "id": 2,
      "date": "2026-11-26",
      "period": "13 a 26 de novembro de 2026",
      "summary": [
        {
          "tag": "IA",
          "module": "warn",
          "html": "<strong>Otto for HAM 5.2.1</strong> aposenta os modelos genéricos Claude (small), GPT (small) e Gemini (small) e troca cada um pelo sucessor: Claude Haiku 4.5, GPT-5.4 mini e Gemini 3.5 Flash."
        },
        {
          "tag": "IA",
          "module": "secops",
          "html": "<strong>HAM Prime e HAM Advanced 1.1.1:</strong> prompts e configurações deixam de usar referências como \"small\" ou \"large\" e passam a citar a versão exata do modelo."
        },
        {
          "tag": "release notes",
          "module": "secops",
          "html": "As release notes da família Brazil para HAM, ITAM e EAM seguem sem mudanças desde setembro. As novidades da quinzena vieram só da Store."
        }
      ],
      "items": [
        {
          "module": "secops",
          "subs": [
            "IA (Otto)",
            "Deprecações"
          ],
          "kicker": "ServiceNow Otto for HAM · versão 5.2.1 (Store, novembro de 2026)",
          "title": "Otto for HAM troca modelos genéricos aposentados pelos sucessores",
          "rows": [
            [
              "O que mudou",
              "<ul><li><strong>Aposentados:</strong> Claude (small), GPT (small) e Gemini (small), que chegaram ao fim do suporte.</li><li><strong>Substitutos:</strong> Claude Haiku 4.5, GPT-5.4 mini e Gemini 3.5 Flash. Cada modelo aposentado foi trocado pelo sucessor atual com suporte completo.</li></ul>"
            ],
            [
              "Por que importa",
              "A ServiceNow justifica a troca por confiabilidade e desempenho. Na prática, as respostas das skills de HAM (resumo do ativo, extração de pedidos de compra, sourcing) passam a vir de outro modelo, e o texto gerado pode mudar de estilo ou de tamanho."
            ],
            [
              "Contexto",
              "Segue a 5.1.0 (outubro de 2026), que trouxe suporte ao Gemma e correções para cenários com SKUs AI Native misturados."
            ]
          ],
          "suggestion": "Depois de atualizar para a 5.2.1, rode em subprodução os mesmos casos de teste das skills de HAM que vocês já usam (por exemplo, o resumo de um ativo com histórico longo e a leitura de um PDF de pedido de compra) e compare com o resultado anterior. Se algum time de compliance aprovou um provedor específico de LLM, confirme que o sucessor continua dentro do que foi aprovado.",
          "sources": [
            {
              "title": "ServiceNow Otto for Hardware Asset Management (HAM) release notes",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-itam-now-assist-ham.html",
              "note": "Store Version History, atualizado em 19/11/2026"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "IA (Otto)"
          ],
          "kicker": "Hardware Asset Management - Prime e - Advanced · versão 1.1.1 (Store, novembro de 2026)",
          "title": "Pacotes Prime e Advanced passam a citar a versão exata do modelo",
          "rows": [
            [
              "O que mudou",
              "Os apps de assinatura Hardware Asset Management - Prime e Hardware Asset Management - Advanced deixam de usar referências genéricas de modelo, como \"small\" ou \"large\". Todos os prompts e configurações passam a apontar para versões específicas."
            ],
            [
              "Por que importa",
              "Fica explícito qual modelo atende cada skill. Isso facilita auditoria, aprovação de provedores de IA e diagnóstico quando uma resposta muda depois de um upgrade."
            ],
            [
              "Versões anteriores",
              "A 1.0.16 (outubro de 2026) atualizou a dependência do ServiceNow Otto for Platform (Prime ou Advanced) para a 3.1.0."
            ]
          ],
          "suggestion": "Aproveite a atualização para registrar, numa planilha de governança de IA, cada skill de HAM ativa e o modelo que ela usa agora. Com a referência explícita, essa lista deixa de ficar desatualizada a cada troca de modelo.",
          "sources": [
            {
              "title": "Hardware Asset Management - Prime release notes",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-itam-hardware-asset-mgmt-prime.html",
              "note": "Store Version History, atualizado em 19/11/2026"
            },
            {
              "title": "Hardware Asset Management - Advanced release notes",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-itam-hardware-asset-mgmt-advanced.html",
              "note": "Store Version History, atualizado em 19/11/2026"
            }
          ]
        }
      ],
      "notes": "Conferidas as release notes da família Brazil (HAM, Otto for HAM, ITAM e EAM) e o Store Version History dos apps de HAM e EAM. Só os apps Otto for HAM, HAM Prime e HAM Advanced tiveram versões novas no período. Sem tutorial nesta edição: não há procedimento oficial publicado para as mudanças."
    },
    {
      "id": 1,
      "date": "2026-11-13",
      "period": "release Brazil (set a nov/2026, edição de estreia)",
      "summary": [
        {
          "tag": "setup",
          "module": "secops",
          "html": "<strong>HAM 16.0.0:</strong> instalação pelo Product Hub e uma Configuration Console que concentra toda a configuração, inclusive por conversa com IA."
        },
        {
          "tag": "contratos",
          "module": "secops",
          "html": "<strong>Integração com Contract Management Pro:</strong> um fluxo com IA extrai dados e obrigações dos contratos assinados de hardware."
        },
        {
          "tag": "IA",
          "module": "warn",
          "html": "<strong>Otto for HAM 5.1.0</strong> passa a suportar o Gemma. Modelos antigos do Now LLM seguem nas skills publicadas, mas não podem ser usados em desenvolvimento novo."
        }
      ],
      "items": [
        {
          "module": "secops",
          "subs": [
            "Implantação"
          ],
          "kicker": "Hardware Asset Management · versão 16.0.0",
          "title": "Instalação pelo Product Hub e Configuration Console",
          "rows": [
            [
              "O que mudou",
              "<ul><li><strong>Product Hub:</strong> o HAM e as aplicações dependentes passam a ser instalados a partir dele, o local central dos apps incluídos na sua assinatura.</li><li><strong>Configuration Console:</strong> configura num só lugar usuários, papéis, ciclo de vida do ativo, inventário, integrações de ativos e skills de IA generativa. Grupos, usuários e o Content Service também podem ser configurados por uma interface de conversa com IA.</li></ul>"
            ],
            [
              "Por que importa",
              "Reduz a dependência de configurações espalhadas por módulos diferentes, que é onde implantações de HAM costumam travar."
            ]
          ],
          "suggestion": "Em implantações novas ou em reorganizações de HAM, use a Configuration Console como checklist: ela mostra de forma organizada o que falta configurar em ciclo de vida, inventário e integrações.",
          "sources": [
            {
              "title": "Hardware Asset Management release notes · Brazil",
              "url": RN + "hardware-asset-management-rn.html",
              "note": "docs oficiais"
            }
          ],
          "howto": [
            {
              "featured": true,
              "title": "configurar o HAM pela Configuration Console",
              "release": "Brazil · HAM 16.0.0+",
              "basis": "Procedimento \"Configure Hardware Asset Management using the Configuration Console\" da documentação oficial.",
              "prereqs": [
                "Hardware Asset Management 16.0.0 ou superior e Setup Hub (<code>sn_ia_base</code>) 3.0.4 ou superior.",
                "Roles <code>ham_admin</code> e <code>ia_user</code>. Os itens que aparecem dependem dos papéis adicionais e dos apps dependentes instalados."
              ],
              "path": "Manage Platform &gt; Hardware Asset Management (Product Hub) &gt; Configure your product &gt; Configure",
              "steps": [
                "No Product Hub, em <strong>Configure your product</strong>, selecione <strong>Configure</strong>.",
                "Escolha um módulo na Configuration Summary ou selecione <strong>Get started</strong> no card do módulo. Os módulos podem ser feitos em qualquer ordem.",
                "Use o campo <strong>Search configurations</strong> para achar um item específico.",
                "Ao terminar cada item, selecione <strong>Mark as configured</strong> (dá para desfazer depois).",
                "Acompanhe o progresso na seção <strong>Setup status</strong>.",
                "Opcional: selecione <strong>Package and download</strong> para baixar o update set e aplicar em produção."
              ],
              "note": "Tudo o que é feito na console vai automaticamente para um update set (um filho por módulo). Também dá para subir no Product Hub um update set de outra instância para replicar uma configuração pronta.",
              "docUrl": "https://www.servicenow.com/docs/r/it-asset-management/hardware-asset-management/configure-ham-from-console.html"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Contratos"
          ],
          "kicker": "Hardware Asset Management · versão 16.0.0",
          "title": "HAM integrado ao Contract Management Pro",
          "rows": [
            [
              "O que mudou",
              "O HAM passa a se integrar ao Contract Management Pro para gerir o ciclo de vida dos contratos de hardware: renovações, vencimentos e obrigações. Um fluxo agêntico extrai metadados e obrigações dos documentos de contrato assinados e acompanha os compromissos de forma proativa."
            ],
            [
              "Por que importa",
              "Contratos de leasing, garantia e manutenção de hardware costumam ficar fora do HAM, e isso gera renovações automáticas e custos inesperados."
            ],
            [
              "Requisito",
              "Disponível só com o SKU <strong>Hardware Asset Management Prime</strong>. A extração de metadados e obrigações com IA exige Contract Management Pro Prime e ServiceNow Otto for Contract Management Pro (<code>sn_cm_gen_ai</code>)."
            ]
          ],
          "suggestion": "Comece pelos contratos de leasing e garantia com vencimento nos próximos 12 meses: são os que mais geram custo inesperado. Antes, confirme com o account team se a assinatura é HAM Prime, porque a integração depende dela.",
          "sources": [
            {
              "title": "Hardware Asset Management release notes · Brazil",
              "url": RN + "hardware-asset-management-rn.html",
              "note": "docs oficiais"
            },
            {
              "title": "HAM integration with Contract Management Pro",
              "url": "https://www.servicenow.com/docs/r/it-asset-management/hardware-asset-management/ham-cm-pro-integration.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "IA (Otto)"
          ],
          "kicker": "ServiceNow Otto for HAM · versão 5.1.0",
          "title": "Otto for HAM com suporte ao Gemma e mudança nos modelos do Now LLM",
          "rows": [
            [
              "O que é",
              "O Otto for HAM traz IA agêntica ao HAM: automatiza tarefas repetitivas de sourcing, reduz o tempo de resposta a pedidos de hardware e de reparo e consolida dados do ativo com análises geradas por IA. É instalado pela ServiceNow Store."
            ],
            [
              "O que mudou",
              "A versão 5.1.0 suporta o Gemma. A partir da release de outubro de 2026, o Gemma 4 entra no Now LLM Service. Os modelos antigos continuam disponíveis para skills, agentes e fluxos já publicados, mas não podem ser usados em desenvolvimento ou configuração novos."
            ]
          ],
          "suggestion": "Se o time já criou skills ou agentes com o Otto for HAM, liste quais usam modelos antigos e planeje a revisão. Eles continuam funcionando, mas qualquer ajuste futuro vai exigir os modelos novos.",
          "sources": [
            {
              "title": "ServiceNow Otto for HAM release notes",
              "url": RN + "servicenow-otto-for-ham-rn.html",
              "note": "docs oficiais, atualizado em 30/09/2026"
            }
          ]
        }
      ],
      "notes": "Edição de estreia montada a partir das release notes oficiais da família Brazil. O guia de integrações deste módulo entra numa próxima versão."
    }
  ],
  "events": []
};
