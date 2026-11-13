/* Radar ITSM — guia de integrações (lista passada pelo time em 13/11/2026; integrações custom ficaram de fora).
   level dos problemas: "oficial" (docs/KB ServiceNow), "fabricante" (doc do fornecedor),
   "servicenow" (funcionário ServiceNow na Community), "comunidade" (relato de usuário). */
var __D = "https://www.servicenow.com/docs/r/";
var __SIR = __D + "security-management/security-incident-response/";
var __EXP = __D + "employee-service-management/employee-experience-foundation/";
var __MID = __D + "servicenow-platform/mid-server/";
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
      "id": "sentinel",
      "name": "Microsoft Sentinel (Azure Sentinel)",
      "area": "Incident / SIR",
      "what": "Ingere incidentes do Microsoft Azure Sentinel e cria security incidents automaticamente, com filtros, agregação, agendamento e sincronização de status e comentários com o Sentinel.",
      "app": "Microsoft Azure Sentinel integration (ServiceNow Store, plugin sn_sec_sentinel)",
      "builtBy": "ServiceNow",
      "compat": [
        "<strong>Em descontinuação:</strong> a Microsoft adiou de março/2026 para <strong>março/2027</strong> o fim da experiência do Azure Sentinel no portal Azure.",
        "A ServiceNow recomenda migrar para a integração do <strong>Defender portal</strong> o quanto antes; ela tem utilitário que converte os perfis Sentinel em perfis Defender e mantém a continuidade dos incidentes."
      ],
      "vendorSide": [
        "Em <strong>App registrations</strong>, registre o app e crie um <strong>Client secret</strong> (copie na hora; ele não aparece de novo).",
        "Em <strong>API permissions</strong>: <em>APIs my organization uses</em> &gt; <strong>Log Analytics API</strong> &gt; Application permissions &gt; <code>Data.Read</code>, com <strong>Grant admin consent</strong>.",
        "No workspace Log Analytics do Sentinel: <strong>Access control (IAM) &gt; Add role assignment</strong>, papel <strong>Azure Sentinel Responder</strong> para o app registrado."
      ],
      "snSide": [
        "<code>sn_si.ingestion_profile_admin</code> (ou <code>sn_si.admin</code>, que herda as permissões)."
      ],
      "setup": [
        {
          "title": "Instalar e configurar a conexão",
          "path": "Security Operations &gt; Integrations &gt; Integration Configurations",
          "steps": [
            "Instale o app da ServiceNow Store.",
            "No tile <strong>Microsoft Azure Sentinel</strong>, selecione <strong>Configure</strong>.",
            "Preencha Name, Identity URL (ex.: <code>login.microsoftonline.com</code>), Azure Resource Manager (ex.: <code>management.azure.com</code>), Tenant ID, Client ID, Client Secret, Subscription ID, Resource Group Name e Workspace Name, e selecione <strong>Submit</strong>."
          ]
        },
        {
          "title": "Criar o perfil de incidentes",
          "path": "All &gt; Microsoft Azure Sentinel Integration &gt; Azure Sentinel Incident Profile",
          "steps": [
            "Selecione <strong>New</strong> e preencha o perfil (o nome vira a security tag padrão).",
            "Mapeie os campos, defina filtros e agendamento.",
            "Configure as atualizações automáticas: status e fechamento voltam para o Sentinel quando o security incident é criado ou fechado."
          ]
        }
      ],
      "validate": [
        "O tile salvo aparece na página de Security Integrations.",
        "Incidentes do Sentinel que passam nos filtros viram security incidents; comentários sincronizam com as Work notes."
      ],
      "issues": [
        {
          "added": "2026-11-13",
          "level": "oficial",
          "status": "mudança",
          "date": "2026-09",
          "problem": "Integração do Azure Sentinel em descontinuação (portal Azure até março/2027)",
          "fix": "Migrar para a <strong>Microsoft Defender integration for Security Operations</strong> usando o utilitário de migração embutido, que converte os perfis e mantém os incidentes já criados via Sentinel. Veja o guia do Defender nesta aba.",
          "src": { "title": "Microsoft Azure Sentinel integration (doc Brazil)", "url": __SIR + "microsoft-azure-sentinel-integration.html" }
        },
        {
          "added": "2026-11-13",
          "level": "oficial",
          "status": "resolvido",
          "problem": "Incidentes do Sentinel não chegam pela integração de alertas do Graph Security API",
          "fix": "Incidentes do Sentinel usam outro plugin: Microsoft Azure Sentinel Incident Ingestion Integration (<code>sn_sec_sentinel</code>).",
          "src": { "title": "KB1741118 (Now Support)", "url": __KB + "KB1741118" }
        }
      ],
      "docs": [
        { "title": "Microsoft Azure Sentinel integration", "url": __SIR + "microsoft-azure-sentinel-integration.html" },
        { "title": "Compare integrations (Sentinel x Graph Security API)", "url": __SIR + "comparing-azure-sentinel-and-graph-security-api-integrations-with-sir.html" },
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
    },
    {
      "id": "mid-server",
      "name": "MID Server",
      "area": "Plataforma",
      "what": "Aplicação Java instalada na rede da empresa que faz a ponte entre a instância e sistemas internos ou atrás de firewall. Integrações como o SOAR podem depender dele.",
      "app": "MID Server (plataforma)",
      "builtBy": "ServiceNow",
      "compat": [
        "Windows Server 2012 a 2025 (com .NET Framework 4.5+) ou Linux Red Hat 6+, Ubuntu 14+ e CentOS 9+, sempre 64 bits.",
        "O MID acompanha a versão da instância: quando a instância sobe de release, ele baixa o pacote novo de <code>install.service-now.com</code> e se atualiza sozinho."
      ],
      "vendorSide": [
        "Host com acesso de saída a <code>install.service-now.com</code> (upgrade automático) e aos servidores OCSP da DigiCert.",
        "Se houver proxy ou appliance com certificado interno ou autoassinado, importe o certificado no trust store do MID."
      ],
      "snSide": [
        "Usuário com papel <code>mid_server</code> para o MID se conectar à instância."
      ],
      "setup": [
        {
          "title": "Depois de cada upgrade da instância",
          "path": "MID Server &gt; Servers",
          "steps": [
            "Confira se todos os MIDs subiram para a versão nova e estão <strong>Up</strong> e <strong>Validated</strong>.",
            "Veja o histórico em <strong>MID Server Upgrade History</strong> e os problemas em MID Server Issues.",
            "Leia as release notes combinadas do MID para o seu salto de versão."
          ]
        }
      ],
      "validate": [
        "MID com status Up, Validated e versão igual à da instância.",
        "As integrações que usam o MID (ex.: saída para o SOAR) voltam a responder após o upgrade."
      ],
      "issues": [
        {
          "added": "2026-11-13",
          "level": "oficial",
          "status": "ver KB",
          "problem": "MID não faz o upgrade automático em host Windows",
          "fix": "Causas documentadas: serviço <strong>Windows Application Experience</strong> desligado (KB0597552) ou antivírus bloqueando o upgrade (KB0870329).",
          "src": { "title": "MID Server upgrades (doc Brazil)", "url": __MID + "c_UpgradeAndTestMIDServer.html" }
        },
        {
          "added": "2026-11-13",
          "level": "oficial",
          "status": "ver KB",
          "problem": "MID para de funcionar por bloqueio de OCSP no firewall ou proxy",
          "fix": "Libere o tráfego para os servidores OCSP da DigiCert. Detalhes e soluções no KB1216223.",
          "src": { "title": "KB1216223 (Now Support)", "url": __KB + "KB1216223" }
        }
      ],
      "docs": [
        { "title": "MID Server system requirements", "url": __MID + "r_MIDServerSystemRequirements.html" },
        { "title": "MID Server upgrades", "url": __MID + "c_UpgradeAndTestMIDServer.html" },
        { "title": "MID Server Upgrade History", "url": __MID + "mid-server-upgrade-history.html" },
        { "title": "Release notes do MID: Australia → Brazil", "url": __D + "delta-australia-brazil/brazil-australia-midserver-release-notes.html" }
      ]
    }
  ]
};
