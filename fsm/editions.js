/* Radar FSM — dados das edições. Nova edição: adicionar um objeto no INÍCIO de RADAR.editions. */
var RN = "https://www.servicenow.com/docs/r/release-notes/";
window.RADAR = {
  editions: [
    {
      id: 1,
      date: "2026-11-13",
      period: "atualizações mensais de set a nov/2026 (edição de estreia)",
      summary: [
        { tag: "dispatch", module: "secops", html: "<strong>Dispatcher Workspace 11.1:</strong> notas operacionais por dia, formato de hora configurável no calendário e opção de evitar rotas com balsa." },
        { tag: "campo", module: "secops", html: "<strong>Field Service Mobile 3.1:</strong> técnico antecipa, estende ou encerra pausas, e o agendamento por \"chegar até\" só mostra horários que cabem no dia do técnico." },
        { tag: "otimização", module: "secops", html: "<strong>Schedule Optimization:</strong> territórios sobrepostos, novas regras de matching (habilidade e raio) e nível e validade de habilidades." }
      ],
      items: [
        {
          module: "secops", subs: ["Dispatcher Workspace"],
          kicker: "FSM Configurable Dispatcher Workspace Bundle · v11.1",
          title: "Notas operacionais, formato de hora e rotas sem balsa",
          rows: [
            ["O que mudou", "<ul><li><strong>Notas operacionais:</strong> dispatchers registram notas do dia para técnicos, equipes, equipamentos e tarefas de work order. Só dispatchers e administradores veem essas notas.</li><li><strong>Formato de hora do calendário</strong> pela propriedade <code>sn_fsm_disp_wrkspc.dispatcher_workspace.calendar_display_time_format</code> (padrão HH:mm, sem segundos).</li><li><strong>Evitar balsas</strong> nas rotas do mapa pela propriedade <code>sn_fsm_disp_wrkspc.dispatcher_workspace.avoid_ferry_routes</code>: a rota usa estradas mesmo que demore mais, e só usa balsa quando não há caminho por terra.</li></ul>"]
          ],
          suggestion: "As notas operacionais substituem bem os recados por fora do sistema (\"técnico X sai mais cedo hoje\", \"van Y na oficina\"). Combine com os dispatchers um padrão de uso para não virarem um segundo canal de chat.",
          sources: [
            { title: "Field Service Management release notes · Brazil", url: RN + "field-service-management-rn-landing.html", note: "docs oficiais" }
          ]
        },
        {
          module: "secops", subs: ["Mobile", "Agendamento"],
          kicker: "Atualização mensal de outubro/2026",
          title: "Pausas no app, agendamento mais realista e questionários mais rápidos",
          rows: [
            ["O que mudou", "<ul><li><strong>Field Service Mobile v3.1:</strong> o técnico pode fazer a pausa antes do horário, estender uma pausa em andamento até o limite da empresa ou encerrá-la mais cedo, quando permitido. A agenda reflete o horário real.</li><li><strong>Appointment Booking v1.1:</strong> agendamentos do tipo \"chegar até\" só mostram horários em que o técnico consegue terminar o serviço antes do fim do dia, evitando overbooking.</li><li><strong>Field Service Questionnaires com Smart Assessments v4.0:</strong> templates montados a partir de um banco de perguntas padrão, sem escrever cada pergunta.</li></ul>"]
          ],
          suggestion: "Se há reclamação de atendimentos marcados que \"nunca cabiam no dia\", a mudança no Appointment Booking ataca exatamente isso. Meça a taxa de reagendamento antes e depois de atualizar.",
          sources: [
            { title: "Field Service Management release notes · Brazil", url: RN + "field-service-management-rn-landing.html", note: "docs oficiais, seção 2026 October" }
          ]
        },
        {
          module: "secops", subs: ["Schedule Optimization"],
          kicker: "Atualização mensal de setembro/2026",
          title: "Schedule Optimization com territórios sobrepostos e habilidades com validade",
          rows: [
            ["O que mudou", "<ul><li><strong>v1.2:</strong> a otimização priorizada de eventos considera territórios sobrepostos, com um raio de busca configurado no qualifier.</li><li><strong>v1.2:</strong> quatro novas dimensões de matching (tarefas e técnicos por habilidade, tarefas e técnicos dentro de um raio), combináveis com AND e OR.</li><li><strong>v2.0:</strong> passa a considerar o nível da habilidade e a data de expiração dela ao avaliar requisitos.</li></ul>"]
          ],
          suggestion: "A validade de habilidades é útil para certificações obrigatórias (NR-10, trabalho em altura etc.): evita que o otimizador mande para o serviço um técnico com certificação vencida. Garanta que as datas de expiração estão cadastradas antes de ligar.",
          sources: [
            { title: "Field Service Management release notes · Brazil", url: RN + "field-service-management-rn-landing.html", note: "docs oficiais, seção 2026 September" }
          ]
        }
      ],
      notes: "Edição de estreia montada a partir das release notes oficiais da família Brazil (o FSM publica atualizações mensais). Os tutoriais (\"Como aplicar\") e o guia de integrações deste módulo entram nas próximas versões."
    }
  ],
  events: []
};
