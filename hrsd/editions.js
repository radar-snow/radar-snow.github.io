/* Radar HRSD — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  "editions": [
    {
      "id": 2,
      "date": "2026-11-24",
      "period": "14 a 24 nov/2026 (versões da ServiceNow Store)",
      "summary": [
        {
          "tag": "IA",
          "module": "secops",
          "html": "<strong>Otto for Employee Experience 4.4.4:</strong> Claude Sonnet 4.6 e Google Flash 3.5 viram o padrão da skill de resumo, e os modelos antigos saem."
        },
        {
          "tag": "integração",
          "module": "secops",
          "html": "<strong>Cornerstone OnDemand 1.5.3:</strong> corrige texto traduzido que não aparecia e a classe utilitária que não podia ser customizada."
        },
        {
          "tag": "Store",
          "module": "secops",
          "html": "<strong>Manutenção:</strong> Employee experience taxonomy 28.3.1 com suporte à Brazil, Impact Value Management - HR 5.1.1 com correção na coleta de dados."
        }
      ],
      "items": [
        {
          "module": "secops",
          "subs": [
            "IA (Otto)",
            "Employee Center"
          ],
          "kicker": "ServiceNow Otto for Employee Experience · Store 4.4.4 (nov/2026)",
          "title": "Novos modelos padrão na skill de resumo do Otto for Employee Experience",
          "rows": [
            [
              "O que mudou",
              "<ul><li><strong>Claude Sonnet 4.6</strong> e <strong>Google Flash 3.5</strong> passam a ser os modelos padrão da skill de resumo.</li><li>Os modelos mais antigos de Claude e Google Flash foram retirados.</li></ul>"
            ],
            [
              "Por que importa",
              "A skill de resumo do app é a de Company News and Events, lançada na versão 2.0.3. Trocar o modelo pode mudar o tamanho e o tom dos resumos que o colaborador vê no Employee Center."
            ]
          ],
          "suggestion": "Depois de atualizar o app, compare alguns resumos de notícias e eventos com os de antes. Se a comunicação interna tem um padrão de texto, valide com ela antes de liberar em produção. Se a instância apontava a skill para um modelo antigo, confira se ela continua funcionando.",
          "sources": [
            {
              "title": "ServiceNow Otto for Employee Experience release notes",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-hr-now-assist-employee-experience.html",
              "note": "Store Version History, atualizado em 19/11/2026"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Integrações",
            "Employee Center"
          ],
          "kicker": "ServiceNow Store · versões de novembro/2026",
          "title": "Correções no Cornerstone OnDemand e apps prontos para a Brazil",
          "rows": [
            [
              "O que mudou",
              "<ul><li><strong>HR Service Delivery Integration with Cornerstone OnDemand 1.5.3:</strong> corrige o texto traduzido que não era exibido corretamente e a classe utilitária que não podia ser customizada.</li><li><strong>Employee experience taxonomy 28.3.1:</strong> atualização para suportar a release Brazil.</li><li><strong>Impact Value Management - HR 5.1.1:</strong> resolve um problema no Data Collection app de HRSD. Compatível com Zurich, Australia e Brazil.</li></ul>"
            ],
            [
              "Também atualizados",
              "Content Publishing (37.6.4), Content Experiences (33.3.4), Content Analytics (31.1.1) e Performance Analytics - Portal Analytics (30.2.2), só para suportar as versões mais novas dos apps dependentes."
            ]
          ],
          "suggestion": "Quem usa a Cornerstone com títulos de treinamento em vários idiomas deve priorizar a 1.5.3, que segue as correções de localização da 1.4.1. Para quem planeja o upgrade para a Brazil, inclua a taxonomia 28.3.1 no pacote de apps da Store a atualizar.",
          "sources": [
            {
              "title": "HR Service Delivery Integration with Cornerstone OnDemand release notes",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-hr-integration-with-cornerstone-ondemand.html",
              "note": "Store Version History, atualizado em 19/11/2026"
            },
            {
              "title": "Employee experience taxonomy release notes",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-hr-employee-exp-taxonomy.html",
              "note": "Store Version History, atualizado em 19/11/2026"
            },
            {
              "title": "Impact Value Management - HR release notes",
              "url": "https://www.servicenow.com/docs/r/store-release-notes/store-rn-hr-impact-value-mgmt-hr.html",
              "note": "Store Version History, atualizado em 19/11/2026"
            }
          ]
        }
      ],
      "notes": "Semana curta: as release notes da família Brazil de HRSD, Employee Center, Employee Center Pro e EmployeeWorks não mudaram desde setembro. As novidades vêm das versões de apps de HR na ServiceNow Store publicadas em 19/11/2026. Não houve procedimento oficial novo para virar tutorial nesta edição."
    },
    {
      "id": 1,
      "date": "2026-11-13",
      "period": "release Brazil (set a nov/2026, edição de estreia)",
      "summary": [
        {
          "tag": "IA",
          "module": "secops",
          "html": "<strong>Respostas de atividade geradas por IA</strong> para work notes e comentários em casos de RH, e um agente que acelera a implantação do HRSD."
        },
        {
          "tag": "EmployeeWorks",
          "module": "secops",
          "html": "<strong>EmployeeWorks Web App</strong> com tarefas redesenhadas e assinatura eletrônica (credenciais a partir do Australia Patch 8 e do Brazil Patch 2)."
        },
        {
          "tag": "deprecação",
          "module": "warn",
          "html": "<strong>Saem:</strong> HRSD Process Mining Content Pack, Virtual Agent Conversations de RH e Issue Auto resolution for HR."
        }
      ],
      "items": [
        {
          "module": "secops",
          "subs": [
            "Case and Knowledge",
            "IA (Otto)"
          ],
          "kicker": "Case and Knowledge Management · Brazil Early Availability",
          "title": "IA nas respostas de casos e um agente de implantação",
          "rows": [
            [
              "O que mudou",
              "<ul><li><strong>Geração de respostas de atividade com IA:</strong> cria, revisa e refina work notes e comentários em casos de RH.</li><li><strong>HR Service Delivery Implementation agent:</strong> encurta o caminho entre a instalação e um HRSD funcionando, com uma experiência de administração centralizada e baseada em IA.</li></ul>"
            ]
          ],
          "suggestion": "Para as respostas com IA, defina com o time de RH um tom de voz e quando o agente deve revisar antes de enviar. Em casos sensíveis (desligamento, saúde, assédio), a revisão humana deve ser obrigatória.",
          "sources": [
            {
              "title": "HR Service Delivery · Brazil Early Availability",
              "url": RN + "hr-service-delivery-rn-2026-09.html",
              "note": "docs oficiais"
            }
          ],
          "howto": [
            {
              "featured": true,
              "title": "ativar a geração de respostas com IA nos casos de RH",
              "release": "Brazil · Otto for HRSD",
              "basis": "Procedimento \"Configure Activity Response Generation for HR Case\" da documentação oficial.",
              "prereqs": [
                "Role <code>sn_hr_core.admin</code>."
              ],
              "path": "All &gt; Now Assist Admin &gt; Skills",
              "steps": [
                "Selecione o workflow <strong>Employee</strong> e o produto <strong>HRSD</strong>.",
                "Na skill <strong>Activity Response Generation for HR case</strong>, selecione <strong>Activate skill</strong>.",
                "Em <strong>General details</strong>, ajuste nome e descrição.",
                "Em <strong>Choose Inputs</strong>, revise os campos usados (tabela HR case: Description, Short Description, Additional comments, Work notes, State e Priority).",
                "Em <strong>Define availability</strong>, deixe sempre disponível ou defina condições.",
                "Em <strong>Define access</strong> e <strong>Select display</strong>, escolha quem pode usar. O padrão é <code>sn_hr_core.case_writer</code>."
              ],
              "note": "Cada etapa do setup guiado tem <strong>Save and continue</strong>. Papéis criados depois do upgrade precisam ser adicionados à mão nas duas etapas de acesso, e só aparecem em Select display os papéis incluídos em Define access. <em>Sugestão:</em> restrinja o acesso a um grupo piloto antes de liberar para todo o RH.",
              "docUrl": "https://www.servicenow.com/docs/r/employee-service-management/now-assist-for-hrsd/now-assist-hrsd-activity.html"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "EmployeeWorks",
            "Lifecycle"
          ],
          "kicker": "Case and Knowledge Management · Brazil Early Availability",
          "title": "EmployeeWorks Web App redesenhado e assinatura eletrônica",
          "rows": [
            [
              "O que mudou",
              "O EmployeeWorks Web App ganhou interface redesenhada e ajuda por chat com IA para os tipos de tarefa Approval, Checklist, E-signature, Schedule a meeting, Mark When Complete, Upload documents, URL e View video. Com a assinatura eletrônica, o colaborador assina documentos com segurança e a cópia assinada é salva automaticamente no registro dele."
            ],
            [
              "Atenção",
              "<ul><li>Alguns registros de Restricted Caller Access (RCA) exigem aprovação manual para o recurso funcionar.</li><li>As credenciais de e-signature só são suportadas a partir do <strong>Australia Patch 8</strong> e do <strong>Brazil Patch 2</strong>.</li><li>Plugins necessários: licença do EmployeeWorks Web App, Case and Knowledge Management for EmployeeWorks e E-signature for EmployeeWorks.</li></ul>"
            ]
          ],
          "suggestion": "A assinatura eletrônica cabe bem em admissão (contrato, termos de confidencialidade) e em mudanças de cargo. Confira a versão de patch da instância antes de prometer o recurso ao RH, e valide com o jurídico a validade da assinatura para cada tipo de documento.",
          "sources": [
            {
              "title": "HR Service Delivery · Brazil Early Availability",
              "url": RN + "hr-service-delivery-rn-2026-09.html",
              "note": "docs oficiais"
            }
          ]
        },
        {
          "module": "secops",
          "subs": [
            "Deprecações"
          ],
          "alert": true,
          "kicker": "HR Service Delivery · release Brazil",
          "title": "Três recursos de HRSD descontinuados",
          "rows": [
            [
              "O que saiu",
              "<ul><li><strong>HRSD Process Mining Content Pack</strong> (<code>com.sn_hr_process_optimization</code>): descontinuado. O Process Mining Content Pack unificado substitui e é instalado automaticamente no upgrade. O antigo continua ativo, e as configurações migram sozinhas.</li><li><strong>Virtual Agent Conversations no HRSD:</strong> descontinuado e indisponível para novas ativações.</li><li><strong>Issue Auto resolution for HR:</strong> descontinuado e indisponível para novas ativações.</li></ul>"
            ],
            [
              "Substituição",
              "Para Virtual Agent Conversations e Issue Auto resolution, as release notes apontam os SKUs \"AI Native\" como a experiência atual."
            ]
          ],
          "suggestion": "Se o RH usa conversas de Virtual Agent ou a resolução automática, essas configurações não podem mais ser ativadas em instâncias novas e não vão evoluir. Leve o tema ao account team para entender o que muda de licença com os SKUs AI Native.",
          "sources": [
            {
              "title": "HR Service Delivery · Brazil Early Availability",
              "url": RN + "hr-service-delivery-rn-2026-09.html",
              "note": "docs oficiais"
            }
          ]
        }
      ],
      "notes": "Edição de estreia montada a partir das release notes oficiais da família Brazil. As release notes de Employee Center e do Otto for HRSD também foram consultadas, sem novidade relevante além de melhorias de acessibilidade. O guia de integrações deste módulo entra numa próxima versão."
    }
  ],
  "events": []
};
