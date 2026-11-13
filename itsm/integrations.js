/* Radar ITSM — guia de integrações (lista passada pelo time em 13/11/2026; integrações custom ficaram de fora).
   level dos problemas: "oficial" (docs/KB ServiceNow), "fabricante" (doc do fornecedor),
   "servicenow" (funcionário ServiceNow na Community), "comunidade" (relato de usuário). */
var __D = "https://www.servicenow.com/docs/r/";
var __SIR = __D + "security-management/security-incident-response/";
var __EXP = __D + "employee-service-management/employee-experience-foundation/";
var __KB = "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=";
var __IBM = "https://ibmresilient.github.io/resilient-community-apps/fn_service_now/docs/install_guide/README.html";
window.RADAR_INT = {
  "reviewed": "2026-11-13",
  "release": "Brazil",
  "tag": "ITSM",
  "items": [
    {
      "id": "qradar-soar",
      "name": "IBM QRadar SOAR",
      "area": "Incident",
      "what": "Liga o IBM QRadar SOAR ao Incident Management: o SOAR cria e atualiza incidentes na ServiceNow pela API do app (entrada), e a ServiceNow devolve notas, status e anexos para o SOAR (saída).",
      "app": "IBM Security QRadar SOAR (ServiceNow Store, escopo x_ibmrt_resilient) + app fn_service_now no SOAR",
      "builtBy": "IBM",
      "compat": [
        "Pela doc da IBM: app <code>fn_service_now</code> v2.4.0 ou superior; SOAR v51.0.0.0+ (ou Cloud Pak for Security 1.10.18+); App Host ou Integration Server v1.15.0+.",
        "ServiceNow <strong>Yokohama ou mais nova</strong>, com ITSM ativo.",
        "Trabalha com a tabela <code>incident</code>; com SIR, também com <code>sn_si_incident</code> e <code>sn_si_task</code> (as duas ao mesmo tempo desde a v2.3.0)."
      ],
      "vendorSide": [
        "Instalar o app <code>fn_service_now</code> no SOAR, de preferência no <strong>App Host</strong>.",
        "Criar uma <strong>API Key</strong> no SOAR (preferível a usuário e senha) e anotar ID e Secret.",
        "No <code>app.config</code>: <code>sn_host</code>, <code>sn_api_uri</code> (padrão <code>/api/x_ibmrt_resilient/api</code>), <code>sn_table_name</code> e a credencial da ServiceNow (<code>sn_username</code>/<code>sn_password</code> ou <code>sn_api_key</code>)."
      ],
      "snSide": [
        "Instalar o app <strong>IBM Security QRadar SOAR</strong> da ServiceNow Store.",
        "Usuário de integração com o papel <code>x_ibmrt_resilient.integrator</code>; usuários finais com <code>x_ibmrt_resilient.user</code>; administração com <code>x_ibmrt_resilient.admin</code>.",
        "Com SIR: adicionar <code>sn_si.integration_user</code> ao usuário de integração e <code>sn_si.analyst</code> a quem trabalha os incidentes.",
        "Se o SOAR fica atrás de firewall, um <strong>MID Server</strong> é necessário para a saída."
      ],
      "setup": [
        {
          "title": "Configurar o app na ServiceNow",
          "path": "Propriedades do app IBM Security QRadar SOAR",
          "steps": [
            "Preencha SOAR Host, Organization, API Key ID e API Key Secret.",
            "Informe o ServiceNow Username de integração e, se usar, o nome do MID Server.",
            "Em <strong>ServiceNowAllowedTableNames</strong>, mantenha ao menos <code>incident, sys_user, sys_user_group</code> e acrescente as tabelas do SIR se for o caso."
          ],
          "note": "Os nomes dos campos seguem o guia de instalação da IBM. Confira a versão do app instalada antes de mudar algo."
        },
        {
          "title": "Configurar o lado SOAR",
          "path": "app.config do fn_service_now (App Host ou Integration Server)",
          "steps": [
            "Ajuste <code>sn_host</code>, <code>sn_api_uri</code> e <code>sn_table_name</code>.",
            "Informe a credencial da ServiceNow. Se houver opção de <code>sn_api_key</code>, prefira-a a usuário e senha (veja o alerta de Basic Auth abaixo).",
            "Opcional: <code>render_rich_text</code> para manter notas em HTML."
          ]
        }
      ],
      "validate": [
        "Crie um incidente de teste a partir do SOAR e confira se ele aparece na tabela <code>incident</code>.",
        "Adicione uma nota e um anexo no incidente da ServiceNow e confira se chegam no SOAR."
      ],
      "issues": [
        {
          "added": "2026-11-13",
          "level": "oficial",
          "status": "mudança",
          "date": "2026-11",
          "problem": "Chamadas de entrada do SOAR na ServiceNow feitas com usuário e senha (Basic Auth)",
          "fix": "Pelo comunicado COMM3378032, Basic Auth em integrações de entrada perde o suporte a partir da Denmark (nov/2027). Interpretação do Radar: se o SOAR chama a API <code>/api/x_ibmrt_resilient/api</code> com <code>sn_username</code>/<code>sn_password</code>, planeje trocar por um método suportado (a doc da IBM cita <code>sn_api_key</code>) e valide com a IBM.",
          "src": { "title": "Comunicado Basic Auth no Radar", "url": "https://radar-snow.github.io/comunicados/#c-basic-auth" }
        }
      ],
      "docs": [
        { "title": "ServiceNow Installation Guide (IBM)", "url": __IBM },
        { "title": "SOAR Customization Guide (IBM)", "url": "https://ibmresilient.github.io/resilient-community-apps/fn_service_now/docs/customize_resilient_guide/README.html" }
      ]
    },
    {
      "id": "defender",
      "name": "Microsoft Defender (incidentes)",
      "area": "Incident / SIR",
      "what": "Traz incidentes do Microsoft Defender para a ServiceNow (security incident, que pode gerar ou atualizar incidentes de TI), com volta de status e comentários para o Defender.",
      "app": "Microsoft Defender integration for Security Operations",
      "builtBy": "ServiceNow",
      "compat": [
        "Faz parte do Security Incident Response. O guia completo, com passos e erros conhecidos, está no Radar SecOps.",
        "É o caminho oficial para quem ainda usa a integração do Azure Sentinel (há utilitário de migração de perfis)."
      ],
      "vendorSide": [
        "App registrado no Microsoft Entra ID com <strong>Tenant ID</strong>, <strong>Client ID</strong> e <strong>Client Secret</strong>.",
        "Permissões <code>SecurityIncident.Read.All</code> e <code>SecurityIncident.ReadWrite.All</code> do tipo <strong>Application</strong>, com admin consent."
      ],
      "snSide": [
        "<code>sn_si.admin</code> ou <code>sn_si.ingestion_profile_admin</code> para configurar; <code>sn_si.analyst</code> para trabalhar."
      ],
      "setup": [
        {
          "title": "Instalar, conectar e criar o perfil",
          "path": "All &gt; Security Operations &gt; Integrations &gt; Integration Configurations",
          "steps": [
            "Instale o app da Store e configure o tile <strong>Microsoft Defender-Incident Ingestion Configuration</strong>.",
            "Crie o perfil em <strong>Microsoft Defender Integration &gt; Defender Incident Profiles</strong> (mapeamento, filtros, agendamento e o que volta para o Defender).",
            "Passo a passo detalhado no guia do Radar SecOps (link abaixo)."
          ]
        }
      ],
      "validate": [
        "Novos incidentes do Defender que passam nos filtros viram registros na ServiceNow com a tag do perfil.",
        "Comentários e fechamento voltam para o Defender."
      ],
      "issues": [
        {
          "added": "2026-11-13",
          "level": "oficial",
          "status": "resolvido",
          "problem": "Erro \"Missing required roles\" ao validar a configuração; nada é ingerido",
          "fix": "As permissões <code>SecurityIncident.*</code> foram dadas como <strong>Delegated</strong>. A integração roda em segundo plano e precisa de <strong>Application</strong>, com admin consent.",
          "src": { "title": "KB2965877 (Now Support)", "url": __KB + "KB2965877" }
        }
      ],
      "docs": [
        { "title": "Guia completo no Radar SecOps", "url": "https://radar-snow.github.io/secops-irm/#integracoes" },
        { "title": "Microsoft Defender integration for Security Operations", "url": __SIR + "ms-defender.html" }
      ]
    },
    {
      "id": "teams",
      "name": "Microsoft Teams",
      "area": "Incident / Change / Request",
      "what": "Leva notificações de Incident, Change e Request para o Microsoft Teams (inclusive aprovações e respostas em comentários) e permite ao agente abrir chat no Teams a partir do registro e copiar a conversa de volta.",
      "app": "IT Service Management for Microsoft 365 (sn_now_teams_it) · ServiceNow for Microsoft Teams and Microsoft 365",
      "builtBy": "ServiceNow",
      "compat": [
        "Notificações acionáveis exigem <strong>ITSM Pro</strong>; chat agente-usuário e Employee Center funcionam com ITSM Standard ou superior.",
        "Instalar o ITSM for Microsoft 365 dispensa instalar o Conversational Integration with Microsoft Teams separado.",
        "Aprovações com e-Signature ainda não são suportadas no Teams."
      ],
      "vendorSide": [
        "Conta com papel <strong>Global Administrator</strong> no Microsoft 365 para dar o consentimento de administrador.",
        "Upload do manifest do app no Teams (apps pré-publicados ou self-configured)."
      ],
      "snSide": [
        "<code>admin</code> para instalar; <code>external_app_install_admin</code> para conectar o tenant e autorizar os apps Azure.",
        "Virtual Agent Lite ou Virtual Agent instalado."
      ],
      "setup": [
        {
          "title": "Instalar o app",
          "path": "System Application &gt; All Available Applications &gt; All",
          "steps": [
            "Busque <strong>IT Service Management for Microsoft 365</strong> e instale (os plugins dependentes vêm junto).",
            "Para o ícone de iniciar chat no registro: importe e faça commit do update set <code>fix_script_start_chat_field_decorator_IT</code> (Store) e rode o fix script <strong>Add Teams chat Field Decorator</strong>."
          ]
        },
        {
          "title": "Conectar o tenant e autorizar os apps",
          "path": "All &gt; ServiceNow for Microsoft 365 &gt; Install Azure apps",
          "steps": [
            "Selecione <strong>Install</strong>, marque <em>Consent on behalf of your organization</em> e aceite.",
            "Autorize os apps pré-publicados necessários (Notify Connector, Request-based Chats, SSO and Activity Notifications) com <strong>Authorize</strong> e consentimento.",
            "Gere e envie o manifest para o Teams e atualize o App ID na instância."
          ]
        }
      ],
      "validate": [
        "Cada app autorizado mostra um check verde e o botão muda para <strong>Installed</strong>.",
        "Resolva um incidente de teste e confira a notificação no Teams; abra um chat a partir do registro."
      ],
      "issues": [
        {
          "added": "2026-11-13",
          "level": "oficial",
          "status": "limitação",
          "problem": "Aprovação com e-Signature não aparece ou não funciona pelo Teams",
          "fix": "Limitação documentada: aprovações com e-Signature ainda não são suportadas na integração ITSM com Teams. Essas aprovações precisam ser feitas na instância.",
          "src": { "title": "IT Service Management integration with Microsoft Teams", "url": __EXP + "sn-ms-teams.html" }
        }
      ],
      "docs": [
        { "title": "IT Service Management integration with Microsoft Teams and Microsoft 365", "url": __EXP + "sn-ms-teams.html" },
        { "title": "Integrating ServiceNow with Microsoft Teams and Microsoft 365", "url": __EXP + "setup-sn-ms-teams.html" },
        { "title": "ServiceNow for Microsoft Teams and Microsoft 365", "url": __EXP + "c_ServiceNowForMSTeams.html" },
        { "title": "Collaboration services (Teams e Slack em incidentes)", "url": __D + "it-service-management/collaboration-services/collab-services-tcm.html" }
      ]
    }
  ]
};
