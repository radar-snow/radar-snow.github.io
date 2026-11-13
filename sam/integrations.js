/* Radar SAM — guia de integrações (lista passada pelo time em 13/11/2026).
   level dos problemas: "oficial" (docs/KB ServiceNow), "fabricante" (doc do fornecedor),
   "servicenow" (funcionário ServiceNow na Community), "comunidade" (relato de usuário). */
var __D = "https://www.servicenow.com/docs/r/it-asset-management/";
var __SL = __D + "saas-license-management/";
var __SA = __D + "software-asset-management/";
var __PROFILE_PATH = "Core UI: All &gt; Software Asset &gt; SaaS License &gt; Direct Integration Profiles · Workspace: License operations &gt; User subscriptions &gt; Direct integration profiles";
window.RADAR_INT = {
  "reviewed": "2026-11-13",
  "release": "Brazil",
  "tag": "SAM",
  "items": [
    {
      "id": "m365",
      "name": "Microsoft Graph API (Microsoft 365)",
      "area": "SaaS License",
      "what": "Usa a Microsoft Graph API para trazer assinaturas, usuários e uso do Microsoft 365 para o Software Asset Management, reconciliar com as instalações nos dispositivos e apontar licenças a reduzir ou recuperar.",
      "app": "Software Asset Management Professional for Microsoft · SaaS License Management",
      "builtBy": "ServiceNow",
      "compat": [
        "Plugins: Software Asset Management Professional for Microsoft (<code>com.snc.samp.microsoft</code>) e Software Asset Management - SaaS License Management (<code>sn_sam_saas_int</code>, pela Store).",
        "O Microsoft 365 é híbrido: o licenciamento cruza as assinaturas na nuvem com as instalações locais nos dispositivos.",
        "Microsoft Dynamics 365 e Power Apps têm integração própria, fora deste guia.",
        "Se usar o Software Asset Workspace, o perfil não pode ser criado pela Core UI."
      ],
      "vendorSide": [
        "App registrado no Microsoft Entra ID, com Client ID, Client secret e o Tenant ID.",
        "<strong>Baixar assinaturas</strong> (obrigatório): <code>User.Read.All</code> e <code>LicenseAssignment.Read.All</code>, papel Application developer. Só leitura.",
        "<strong>Uso por usuário</strong> (opcional): <code>Reports.Read.All</code>, papéis Application developer e Power platform administrator. Necessário para recomendações por baixo uso, como E3 para E1.",
        "<strong>Recuperar licenças</strong> (opcional): <code>GroupMember.ReadWrite.All</code> e <code>LicenseAssignment.ReadWrite.All</code>."
      ],
      "snSide": [
        "<code>sam_integrator</code> para criar o integration profile."
      ],
      "setup": [
        {
          "title": "Registrar o app no Entra ID",
          "path": "Azure portal &gt; Microsoft Entra ID &gt; App registrations",
          "steps": [
            "Registre um app (\"Register a Microsoft Entra ID application\" na doc) e anote Client ID, Client secret e Tenant ID.",
            "Dê só as permissões do Graph de cada processo que for usar, conforme a tabela de permissões mínimas da doc, e conceda o admin consent."
          ]
        },
        {
          "title": "Criar o integration profile",
          "path": __PROFILE_PATH,
          "steps": [
            "Selecione New e <strong>Microsoft 365 Integration Profile</strong>.",
            "Preencha Display name, Client Id, Client secret e Tenant name or Id.",
            "Salve e publique o perfil."
          ]
        },
        {
          "title": "Seguir o success guide",
          "path": "Microsoft 365 SaaS License Management success guide",
          "steps": [
            "Valide os dados de assinatura, instalação e uso.",
            "Importe os entitlements de assinatura do Microsoft 365.",
            "Reconcilie para compliance.",
            "Identifique as oportunidades de economia e otimize as licenças."
          ]
        }
      ],
      "validate": [
        "Os usuários e as assinaturas do Microsoft 365 aparecem no SaaS License Management, e a reconciliação roda sem erro de autorização."
      ],
      "issues": [],
      "docs": [
        { "title": "Integrating with Microsoft 365", "url": __SA + "integrate-with-microsoft.html" },
        { "title": "Create a Microsoft 365 integration profile", "url": __SA + "set-up-microsoft-office-365.html" },
        { "title": "Microsoft 365 SaaS License Management success guide", "url": __SA + "manage-o365-licenses.html" }
      ]
    },
    {
      "id": "adobe-cloud",
      "name": "Adobe Cloud",
      "area": "SaaS License",
      "what": "Traz as assinaturas do Adobe Creative Cloud, Experience Cloud e Document Cloud para o Software Asset Management, para compliance e otimização de licenças.",
      "app": "Software Asset Management Professional for Adobe (publisher pack) · SaaS License Management",
      "builtBy": "ServiceNow",
      "compat": [
        "Só funciona com o plano <strong>Adobe Creative Cloud for Enterprise</strong>. Planos Teams, Education ou Individuals não permitem a integração.",
        "Plugins: Software Asset Management Professional for Adobe (<code>com.sn_samp_adobe</code>) e Software Asset Management - SaaS License Management (<code>com.sn_sam_saas_int</code>).",
        "Autenticação por credencial <strong>OAuth Server to Server</strong> da Adobe."
      ],
      "vendorSide": [
        "Usuário Administrator na Adobe para baixar as assinaturas.",
        "Credencial OAuth Server to Server criada no lado da Adobe (detalhes no Adobe Authentication Guide)."
      ],
      "snSide": [
        "<code>sam_integrator</code> para criar o integration profile."
      ],
      "setup": [
        {
          "title": "Configurar a integração",
          "path": "Software Asset Management · SaaS License",
          "steps": [
            "Confira os pré-requisitos da página \"Integrating with Adobe Cloud\".",
            "Instale o Software Asset Management Professional for Adobe (<code>com.sn_samp_adobe</code>).",
            "Instale o Software Asset Management - SaaS License Management (<code>com.sn_sam_saas_int</code>).",
            "Crie a integração do Adobe Cloud com a credencial OAuth Server to Server, seguindo os passos da doc."
          ]
        }
      ],
      "validate": [
        "As assinaturas da Adobe aparecem no Software Asset Management e entram nos relatórios de compliance."
      ],
      "issues": [],
      "docs": [
        { "title": "Integrating with Adobe Cloud", "url": __SA + "adobe-cloud-integration.html" },
        { "title": "Integrate with SaaS applications", "url": __SL + "create-integration-profile.html" }
      ]
    },
    {
      "id": "miro",
      "name": "Miro",
      "area": "SaaS License",
      "what": "Traz as assinaturas e a atividade dos usuários do Miro Enterprise para identificar e recuperar licenças sem uso.",
      "app": "SaaS License Management (integração direta com Miro Enterprise)",
      "builtBy": "ServiceNow",
      "compat": [
        "Para <strong>Miro Enterprise</strong>.",
        "Plugin Software Asset Management - SaaS License Management (<code>sn_sam_saas_int</code>), pela Store.",
        "Autenticação por app OAuth 2.0 criado no Miro."
      ],
      "vendorSide": [
        "Usuário <strong>Company admin</strong> no Miro.",
        "Escopo <code>organizations:read</code> para baixar assinaturas e trazer atividade. Recuperar licença não pede escopo extra."
      ],
      "snSide": [
        "<code>sam_integrator</code> para criar o integration profile."
      ],
      "setup": [
        {
          "title": "Criar o app OAuth 2.0 no Miro",
          "path": "Miro Platform &gt; Your Apps",
          "steps": [
            "Entre com credenciais de Company Admin. Se não houver times na organização, ou para testar com dados fictícios, crie um developer team.",
            "No ícone da organização, abra <strong>Your Apps</strong> e selecione <strong>Create a new app</strong>.",
            "Dê um nome, escolha o time e selecione Create app.",
            "Em <strong>App Credentials</strong>, copie Client ID e Client secret.",
            "Em <strong>Redirect URI for OAuth 2.0</strong>, informe a URL indicada na doc."
          ]
        },
        {
          "title": "Criar o integration profile",
          "path": __PROFILE_PATH,
          "steps": [
            "Crie o perfil do Miro com o Client ID e o Client secret, seguindo a página \"Integrating with Miro Enterprise\"."
          ]
        }
      ],
      "validate": [
        "Os usuários do Miro e a última atividade de cada um aparecem no SaaS License Management."
      ],
      "issues": [],
      "docs": [
        { "title": "Integrating with Miro Enterprise", "url": __SL + "integrate-with-miro-enterprise.html" }
      ]
    },
    {
      "id": "salesforce",
      "name": "Salesforce CRM",
      "area": "SaaS License",
      "what": "Traz as assinaturas do Salesforce CRM (Sales Cloud, Service Cloud, Platform, Communities e Chatter) para acompanhar licenças e recuperar as que estão sem uso.",
      "app": "SaaS License Management (integração direta com Salesforce CRM)",
      "builtBy": "ServiceNow",
      "compat": [
        "Serviços: Sales Cloud, Service Cloud, Platform, Customer Community, Partner Community, Company Community e Chatter.",
        "Funciona com organizações Salesforce Classic e Lightning.",
        "Com o Software Asset Workspace, a doc indica criar a integração pelo <strong>SaaS Playbook</strong> (\"Create a Salesforce CRM integration\").",
        "Serviços cobrados fora do modelo por usuário podem ser acompanhados com custom license metrics."
      ],
      "vendorSide": [
        "Conta Salesforce com licença de usuário e as permissões <strong>View Setup and Configuration</strong> e <strong>API Enabled</strong>.",
        "App conectado com grant Authorization code (escopos <code>api</code> e <code>refresh_token, offline_access</code>) ou Client Credentials (escopo <code>api</code>)."
      ],
      "snSide": [
        "<code>sam_integrator</code> para criar o integration profile."
      ],
      "setup": [
        {
          "title": "Criar a integração",
          "path": "Software Asset Workspace: SaaS Playbook · Core UI: " + __PROFILE_PATH,
          "steps": [
            "No Salesforce, crie o app conectado com o grant escolhido e as permissões mínimas.",
            "No Software Asset Workspace, use o SaaS Playbook \"Create a Salesforce CRM integration\". Fora do workspace, crie o perfil direto.",
            "Informe as credenciais do app conectado e publique."
          ]
        }
      ],
      "validate": [
        "As licenças de cada serviço Salesforce aparecem no SaaS License Management com os usuários atribuídos."
      ],
      "issues": [],
      "docs": [
        { "title": "Integrating with Salesforce CRM", "url": __SL + "integrate-with-salesforce-crm.html" },
        { "title": "Create a Salesforce CRM integration (SaaS Playbook)", "url": __SL + "playbook-salesforce-crm.html" }
      ]
    },
    {
      "id": "github-cloud",
      "name": "GitHub Enterprise Cloud",
      "area": "SaaS License",
      "what": "Traz as assinaturas e a atividade dos usuários do GitHub Enterprise Cloud para acompanhar licenças e recuperar as que estão sem uso.",
      "app": "SaaS License Management (integração direta com GitHub Enterprise Cloud, via GitHub Spoke)",
      "builtBy": "ServiceNow",
      "compat": [
        "Só para organizações no plano <strong>Enterprise</strong> do GitHub.",
        "Na instalação do SaaS License Management (<code>sn_sam_saas_int</code>), marque o recurso opcional <strong>GitHub Spoke</strong>.",
        "<strong>Upgrade:</strong> quem vem da Yokohama ou da Zurich precisa reconfigurar o integration profile do GitHub Enterprise Cloud.",
        "Existe integração separada para GitHub Enterprise Server."
      ],
      "vendorSide": [
        "Usuário <strong>Organization owner</strong>, que consiga ler todos os repositórios da organização.",
        "Personal access token (classic) com <code>read:org</code> para assinaturas, mais <code>repo</code> e <code>read:audit_log</code> para atividade, e <code>write:org</code> para recuperar licenças."
      ],
      "snSide": [
        "<code>sam_integrator</code> para criar o integration profile."
      ],
      "setup": [
        {
          "title": "Gerar o token no GitHub",
          "path": "GitHub: Settings &gt; Developer Settings &gt; Personal access tokens &gt; Tokens (classic)",
          "steps": [
            "Entre com uma conta Organization owner e abra Settings pela foto do perfil.",
            "Em <strong>Developer Settings &gt; Personal access tokens &gt; Tokens (classic)</strong>, selecione Generate new token (classic).",
            "Descreva o uso no campo Note e marque só os escopos dos processos que for usar."
          ]
        },
        {
          "title": "Criar o integration profile",
          "path": __PROFILE_PATH,
          "steps": [
            "Na Core UI: New &gt; <strong>GitHub Cloud Integration Profile</strong>. No workspace: New, escolha <strong>GitHub Cloud</strong> e Continue.",
            "Preencha Display Name e os demais campos com o token gerado.",
            "Publique o perfil (o Status muda de Draft para Published)."
          ]
        }
      ],
      "validate": [
        "Os membros da organização e a atividade de cada um aparecem no SaaS License Management."
      ],
      "issues": [
        {
          "added": "2026-11-13", "level": "oficial", "status": "mudança", "date": "2026-09",
          "problem": "Depois do upgrade da Yokohama ou da Zurich para a Brazil, o perfil do GitHub Enterprise Cloud precisa ser reconfigurado",
          "fix": "A doc da Brazil pede para reconfigurar o integration profile e marcar o recurso opcional <strong>GitHub Spoke</strong> no Application Manager ao instalar o SaaS License Management. <em>Sugestão:</em> inclua no checklist do upgrade.",
          "src": { "title": "Integrate with GitHub Enterprise Cloud (docs oficiais)", "url": __SL + "integrate-github-cloud.html" }
        }
      ],
      "docs": [
        { "title": "Integrate with GitHub Enterprise Cloud", "url": __SL + "integrate-github-cloud.html" },
        { "title": "Request SaaS License Management", "url": __SL + "request-saas-license-management.html" }
      ]
    },
    {
      "id": "openlm",
      "name": "OpenLM",
      "area": "Engenharia",
      "what": "Leva para o Software Asset Management o uso de licenças de engenharia (concorrentes) coletado pelo OpenLM nos servidores de licença: uso, negações (denials), atividade de usuários e alertas.",
      "app": "OpenLM Adapter Integration (Store) · Software Asset Management Professional for Engineering Applications",
      "builtBy": "App da ServiceNow Store (detalhes de setup na ficha do app); a parte de SAM é da ServiceNow",
      "compat": [
        "Exige o app Software Asset Management Professional for Engineering Applications (<code>sn_samp_eng_app</code>).",
        "O OpenLM se conecta a servidores de licença como FlexLM, Sentinel, Reprise, Autodesk, DSLS e IBM LUM.",
        "A doc da ServiceNow remete o setup do OpenLM à seção <strong>Supporting Links and Docs</strong> da página do OpenLM Adapter Integration na Store."
      ],
      "vendorSide": [
        "Ambiente OpenLM conectado aos servidores de licença de engenharia."
      ],
      "snSide": [
        "Papel de administrador do Software Asset Management para instalar e configurar."
      ],
      "setup": [
        {
          "title": "Instalar e configurar",
          "path": "ServiceNow Store · Guided Setup",
          "steps": [
            "Peça o Software Asset Management Professional for Engineering Applications.",
            "Instale o OpenLM Adapter Integration da Store.",
            "Configure pelo Guided Setup, seguindo os documentos da ficha do app na Store."
          ]
        }
      ],
      "validate": [
        "O dashboard <strong>Engineering License</strong> (Software asset analytics) mostra uso concorrente, picos diários e negações.",
        "Em License operations aparecem os servidores de licença e as licenças de engenharia descobertas."
      ],
      "issues": [],
      "docs": [
        { "title": "Engineering license management", "url": __SA + "concurrent-licenses.html" },
        { "title": "Engineering license servers", "url": __SA + "eng-license-server.html" }
      ]
    }
  ]
};
