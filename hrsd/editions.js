/* Radar HRSD — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  "editions": [
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
