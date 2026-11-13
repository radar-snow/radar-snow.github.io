/* Radar HRSD — guia de integrações (lista passada pelo time em 13/11/2026).
   level dos problemas: "oficial" (docs/KB ServiceNow), "fabricante" (doc do fornecedor),
   "servicenow" (funcionário ServiceNow na Community), "comunidade" (relato de usuário). */
var __D = "https://www.servicenow.com/docs/r/";
var __HR = __D + "employee-service-management/hr-service-delivery/";
var __IH = __D + "integrate-applications/integration-hub/";
var __BG_DEPREC = {
  "added": "2026-11-13", "level": "oficial", "status": "mudança", "date": "2026-09",
  "problem": "Integração sendo preparada para descontinuação: oculta e indisponível para ativação a partir da Zurich, com suporte até a Brazil",
  "fix": "A doc da Brazil avisa que quem tem assinatura ativa ainda pode ativar o plugin por um <strong>plugin activation request</strong> (processo descrito no KB0867184). <em>Sugestão:</em> trate a Brazil como a última release suportada e planeje a substituição antes do próximo upgrade."
};
window.RADAR_INT = {
  "reviewed": "2026-11-13",
  "release": "Brazil",
  "tag": "HRSD",
  "items": [
    {
      "id": "workday",
      "name": "Workday HCM",
      "area": "HCM",
      "what": "Sincroniza perfis de trabalhadores do Workday para o HR Service Delivery (departamentos, locais, job profiles, perfis atuais, futuros e efetivos) e traz as tarefas (to-dos) do Workday para o Employee Center.",
      "app": "HR Service Delivery Integration with Workday (Store) · Workday HR Spoke",
      "builtBy": "Bristlecone, Inc. (app da ServiceNow Store, documentado pela ServiceNow)",
      "compat": [
        "Ativar o app ativa automaticamente o <strong>Workday HR Spoke</strong>, do qual ele depende.",
        "Para trazer tarefas, ative também o <strong>HR Service Delivery Integrations Framework</strong> (Enterprise Service Management Integrations Framework) pela Store.",
        "Para funcionar com a página Standard Ticket, a doc pede a instalação de update sets específicos.",
        "O spoke aceita SOAP com OAuth 2.0, SOAP Basic Auth com WS-Security, SOAP Personal Auth e REST. A doc tem uma página para cada modo."
      ],
      "vendorSide": [
        "No tenant Workday, registre o spoke como API client pela tarefa <strong>Register API Client for Integrations</strong> e gere Client ID, Client Secret e refresh token.",
        "Escolha as <strong>Scope (Functional Areas)</strong> necessárias e, se quiser, refresh tokens que não expiram.",
        "Os IDs pedidos na configuração de sync (tipo de organização de departamento, uso de local, tipos de telefone e e-mail) vêm do Workday. A doc aponta um KB com o passo a passo para obter cada valor."
      ],
      "snSide": [
        "<code>admin</code> para instalar o app e configurar as propriedades do spoke.",
        "<code>sn_hr_workday.admin</code> para configurar o sync de perfis e ativar o flow agendado."
      ],
      "setup": [
        {
          "title": "Instalar o app e preparar o spoke",
          "path": "ServiceNow Store",
          "steps": [
            "Ative o <strong>HR Service Delivery Integration with Workday</strong>. O Workday HR Spoke é ativado junto.",
            "Ative o <strong>HR Service Delivery Integrations Framework</strong>, usado para trazer as tarefas do Workday.",
            "Escolha o modo de autenticação do spoke e siga a página correspondente da doc do Workday HR Spoke."
          ]
        },
        {
          "title": "Autenticação OAuth 2.0 para as ações SOAP",
          "path": "Workday: Register API Client for Integrations · ServiceNow: All &gt; System Properties &gt; All Properties",
          "steps": [
            "No Workday, procure a tarefa <strong>Register API Client for Integrations</strong> e preencha Client Name, Non-expiring Refresh Tokens, Scope (Functional Areas) e Include Workday Owned Scope.",
            "Confirme com OK e guarde o Client ID e o Client Secret gerados.",
            "No menu do client, abra <strong>API Client &gt; Manage Refresh Tokens for Integrations</strong>, escolha a conta Workday e gere um novo refresh token.",
            "Na ServiceNow, em All Properties, filtre a coluna Application por <strong>Workday HR Spoke</strong> e preencha as propriedades de OAuth com esses valores."
          ],
          "note": "Se estiver migrando de basic auth para OAuth 2.0, a doc pede para remover as configurações de basic auth antes."
        },
        {
          "title": "Configurar o sync de perfis",
          "path": "Workday Worker Profile Sync &gt; Configurations &gt; Worker Profile Sync Configurations",
          "steps": [
            "Preencha o fuso do tenant Workday e quantos dias à frente considerar para admissões e desligamentos futuros.",
            "Informe os IDs de departamento, local, telefone e e-mail obtidos no Workday.",
            "Para o primeiro teste, marque <strong>Enable dry run</strong>: os dados vão para as tabelas de staging sem transformar para as tabelas finais.",
            "Se precisar investigar, marque <strong>Enable debugging</strong> para coletar logs extras."
          ]
        },
        {
          "title": "Ativar o flow agendado",
          "path": "Flow Designer &gt; Designer &gt; Run Workday Integration Flow",
          "steps": [
            "Antes de rodar, desligue o reporting de flows: <code>com.snc.process_flow.reporting.level</code>.",
            "No Trigger, defina horário e intervalo.",
            "Em <strong>Call Run Workday Service Subflow</strong>, escolha o que trazer: Department, Location, Job Profile, Worker Profile, Effective Worker Profile, Future Worker Profile, Pull To-dos e Professional worker profile.",
            "<strong>Retrieve all data</strong> marcado faz carga completa. Desmarcado, traz só o que mudou desde a última execução com sucesso (vale só para HR profile e Job Profile).",
            "Selecione Done e depois Activate."
          ],
          "note": "Pull To-dos não aceita Retrieve all data: a primeira carga é completa a partir do parâmetro Initial Load Date time e as seguintes são incrementais."
        }
      ],
      "validate": [
        "A carga segue a ordem: locais, departamentos, job profiles, trabalhadores, futuros, efetivos e jobs.",
        "Em <strong>View job tracker details from Workday</strong> aparecem início, fim e status de cada execução.",
        "As tarefas do Workday aparecem na página To-dos do Employee Center."
      ],
      "issues": [
        {
          "added": "2026-11-13", "level": "oficial", "status": "limitação", "date": "2026-09",
          "problem": "Dados que o sync de perfis não traz ou não atualiza",
          "fix": "Segundo a doc: carga parcial não vale para Department e Location; desativar uma organização, local ou job profile no Workday não desativa o registro na ServiceNow (as tabelas não têm campo Active); e alguns campos não são mapeados, como Leave status, Location type, Notice period, Probation end date, Probation period, Social Security number e Business, além de Location type e Work email em Jobs.",
          "src": { "title": "Worker profile synchronization limitations (docs oficiais)", "url": __HR + "w-integration.html" }
        }
      ],
      "docs": [
        { "title": "HR Service Delivery Integration with Workday", "url": __HR + "w-integration.html" },
        { "title": "Configuring HR Service Delivery Integration with Workday", "url": __HR + "w-todos.html" },
        { "title": "Workday HR Spoke", "url": __IH + "workday-hr-spoke.html" }
      ]
    },
    {
      "id": "successfactors",
      "name": "SAP SuccessFactors",
      "area": "HCM",
      "what": "Sincroniza registros de funcionários do SuccessFactors com o HR Service Delivery e reúne na ServiceNow as tarefas do SuccessFactors (pull e push de to-dos), com tópicos de Virtual Agent e agentes de IA de HCM.",
      "app": "HR Service Delivery Integration with SuccessFactors (Store) · SuccessFactors spoke",
      "builtBy": "Bristlecone, Inc. (app da ServiceNow Store, documentado pela ServiceNow)",
      "compat": [
        "Ativar o app ativa o Enterprise Service Management Integrations Framework e o SuccessFactors spoke.",
        "A doc do app exige o SuccessFactors spoke <strong>3.1.2 ou superior</strong>.",
        "<strong>Atenção:</strong> a doc do spoke avisa que a SAP vai descontinuar a basic authentication até novembro de 2026. Instalações novas devem usar o <strong>spoke v4.12.0</strong> com OAuth SAML, e quem está em versão anterior deve migrar."
      ],
      "vendorSide": [
        "Usuário com permissão de OData API no SuccessFactors, no formato <code>&lt;usuário&gt;@&lt;Company ID&gt;</code>.",
        "Para o spoke v4.12.0, a configuração de OAuth SAML no SuccessFactors, conforme a página de setup do spoke v4.x.x."
      ],
      "snSide": [
        "<code>sn_hr_sf.admin</code> para configurar o app.",
        "<code>admin</code> para o spoke (credenciais, conexão e propriedades)."
      ],
      "setup": [
        {
          "title": "Preparar a instância",
          "path": "Restricted Caller Access Privileges · tabela HR Profile",
          "steps": [
            "Libere manualmente os registros de Restricted Caller Access com Status = Requested e Source Scope = Enterprise Service Management Integrations Framework ou HR Service Delivery Integration with Successfactors.",
            "Para desempenho, crie índice no campo de número do funcionário da tabela HR Profile e nos campos coalesce dos transform maps."
          ]
        },
        {
          "title": "Configurar o SuccessFactors spoke",
          "path": "Connections &amp; Credentials",
          "steps": [
            "Instale ou migre para o <strong>SuccessFactors spoke v4.12.0</strong> e siga a página \"Set up the SuccessFactors spoke v4.x.x\".",
            "A doc do spoke pede para ajustar as propriedades <code>glide.pf.rest.response_payload_max_size</code> (máximo 10240), <code>com.snc.process_flow.reporting.serialized.val_size_limit</code> (máximo 16384) e <code>com.glide.transform.json.max-partial-length</code> (máximo 65536).",
            "Crie as credenciais e a conexão do spoke conforme a página de setup."
          ]
        },
        {
          "title": "Ajustar e ativar a sincronização",
          "path": "All &gt; HRSD SuccessFactors Integration &gt; System Properties",
          "steps": [
            "Opcional: revise as propriedades que apontam os subflows de cada serviço (departamentos, trabalhadores, job profiles, jobs, locais e to-dos). A doc recomenda manter os subflows de fábrica.",
            "Configure o pull e o push de to-dos, se for usar.",
            "Ative e rode o flow agendado que sincroniza os perfis (Activating schedule flows)."
          ]
        }
      ],
      "validate": [
        "O job tracker mostra cada execução, com início, fim, carga nas tabelas de staging e status.",
        "As tarefas do SuccessFactors aparecem em View to dos."
      ],
      "issues": [
        {
          "added": "2026-11-13", "level": "oficial", "status": "mudança", "date": "2026-03",
          "problem": "SuccessFactors vai descontinuar a basic authentication até novembro de 2026",
          "fix": "A doc do spoke orienta instalar o <strong>SuccessFactors spoke v4.12.0</strong>, que usa OAuth SAML, ou migrar para ele quem usa versão anterior (página \"Migrate to SuccessFactors spoke v4.12.0\"). <em>Sugestão:</em> como o prazo é este mês, confirme já qual versão do spoke está instalada.",
          "src": { "title": "Set up the SuccessFactors spoke v3.x.x (docs oficiais, atualizado em 12/03/2026)", "url": __IH + "setup-successfactors-v3.html" }
        }
      ],
      "docs": [
        { "title": "HR Service Delivery Integration with SuccessFactors", "url": __HR + "hr-service-delivery-integration-success-factors.html" },
        { "title": "Using HR Service Delivery Integration with SuccessFactors", "url": __HR + "using-hr-service-delivery-integration-with-success-factors.html" },
        { "title": "Set up the SuccessFactors spoke v3.x.x (com o aviso de migração para a v4.12.0)", "url": __IH + "setup-successfactors-v3.html" }
      ]
    },
    {
      "id": "first-advantage",
      "name": "First Advantage",
      "area": "Background check",
      "what": "Pede background checks à First Advantage a partir de um caso de RH. A First Advantage devolve o ID e o status ao caso, convida o funcionário a preencher a aplicação e atualiza o caso quando a checagem termina.",
      "app": "Integração de HR Integrations com First Advantage (SOAP) · alternativa: First Advantage Spoke",
      "builtBy": "ServiceNow (integração pré-configurada do HR Service Delivery)",
      "compat": [
        "<strong>Em descontinuação:</strong> oculta para ativação desde a Zurich, com suporte até a Brazil (KB0867184).",
        "Usa serviços SOAP.",
        "A Integration Hub tem o <strong>First Advantage Spoke</strong>, com ações para criar caso e iniciar a verificação por convite ou por pedido."
      ],
      "vendorSide": [
        "Endpoint SOAP exclusivo fornecido pela First Advantage (o valor de fábrica é só um exemplo). Use HTTPS.",
        "Usuário e senha, parent account, account e e-mail do solicitante."
      ],
      "snSide": [
        "<code>sn_hr_integrations.admin</code>."
      ],
      "setup": [
        {
          "title": "Informar as credenciais",
          "path": "All &gt; HR Integrations &gt; Sources &gt; First Advantage",
          "steps": [
            "Abra o registro <strong>First Advantage</strong>.",
            "No related list <strong>SOAP credentials</strong>, troque o Endpoint URL pelo endereço recebido da First Advantage.",
            "Preencha usuário e senha de entrada (Inbound Username e Inbound Password) e os dados de conta pedidos."
          ]
        },
        {
          "title": "Conferir os mapeamentos e os pacotes",
          "path": "HR Integrations &gt; HR Service Mapping · HR Outbound Schema Mapping",
          "steps": [
            "Em HR Service Mapping, agrupe por HR external source e confira se <strong>Request Background Check by First Advantage</strong> aponta para <strong>First Advantage Web Service</strong>.",
            "Confira os HR Outbound Schema Mappings do grupo First Advantage.",
            "Adicione os pacotes de background check contratados."
          ]
        }
      ],
      "validate": [
        "Um caso de pedido de background check recebe o applicant ID e o status, e o funcionário recebe a tarefa e o e-mail com o link."
      ],
      "issues": [
        Object.assign({}, __BG_DEPREC, {
          "fix": __BG_DEPREC.fix + " Para a First Advantage existe o <strong>First Advantage Spoke</strong> na Integration Hub. Como a integração tem credencial de entrada (Inbound Username/Password), avalie também se ela entra no COMM3378032, sobre Basic Authentication em integrações de entrada.",
          "src": { "title": "Integrating with the First Advantage service (docs oficiais)", "url": __HR + "hr-integrations-with-first-advantage.html" }
        })
      ],
      "docs": [
        { "title": "Integrating with the First Advantage service", "url": __HR + "hr-integrations-with-first-advantage.html" },
        { "title": "Verify integration for the First Advantage service", "url": __HR + "verify-base-inbound-integration-for-first-advantage.html" },
        { "title": "First Advantage Spoke", "url": __IH + "first-advantage-spoke.html" }
      ]
    },
    {
      "id": "sterling",
      "name": "Sterling",
      "area": "Background check",
      "what": "Pede background checks à Sterling a partir de um caso de RH. A Sterling grava o order ID no caso, manda ao funcionário o link da aplicação e atualiza o caso com o resultado.",
      "app": "Integração de HR Integrations com Sterling Talent Solutions (REST)",
      "builtBy": "ServiceNow (integração pré-configurada do HR Service Delivery)",
      "compat": [
        "<strong>Em descontinuação:</strong> oculta para ativação desde a Zurich, com suporte até a Brazil (KB0867184).",
        "Usa serviços REST."
      ],
      "vendorSide": [
        "Endpoint REST exclusivo fornecido pela Sterling.",
        "Valores de <code>user_id</code>, <code>client_reference_id</code>, <code>integration_id</code>, <code>password</code> e <code>account</code>."
      ],
      "snSide": [
        "<code>sn_hr_integrations.admin</code>."
      ],
      "setup": [
        {
          "title": "Informar as credenciais",
          "path": "All &gt; HR Integrations &gt; Sources &gt; Sterling Background Check",
          "steps": [
            "Abra o registro <strong>Sterling Background Check</strong>.",
            "Não preencha o related list REST credentials: a doc pede para usar o related list <strong>HR Integrations Additional Inputs</strong>.",
            "Salve o formulário e preencha cada chave em HR Integrations Additional Inputs.",
            "No HR REST service correspondente, informe o endpoint recebido da Sterling."
          ]
        },
        {
          "title": "Conferir a integração e os pacotes",
          "path": "HR Integrations",
          "steps": [
            "Siga \"Verify integration for the Sterling service\" para conferir os mapeamentos.",
            "Adicione os pacotes de background check da Sterling."
          ]
        }
      ],
      "validate": [
        "Um caso de pedido de background check recebe o order ID, e o funcionário recebe o e-mail com o link."
      ],
      "issues": [
        Object.assign({}, __BG_DEPREC, { "src": { "title": "Integrating with the Sterling Talent Solutions service (docs oficiais)", "url": __HR + "integrate-with-sterling-service.html" } })
      ],
      "docs": [
        { "title": "Integrating with the Sterling Talent Solutions service", "url": __HR + "integrate-with-sterling-service.html" },
        { "title": "Verify integration for the Sterling service", "url": __HR + "verify-base-integration-for-sterling.html" },
        { "title": "Add background check packages for the Sterling service", "url": __HR + "background-check-package-for-sterling.html" }
      ]
    },
    {
      "id": "accurate",
      "name": "Accurate Background",
      "area": "Background check",
      "what": "Pede background checks à Accurate a partir de um caso de RH. A Accurate grava o applicant ID e o status, envia ao funcionário o link da aplicação e atualiza o caso com o resultado.",
      "app": "Integração de HR Integrations com Accurate Background (REST)",
      "builtBy": "ServiceNow (integração pré-configurada do HR Service Delivery)",
      "compat": [
        "<strong>Em descontinuação:</strong> oculta para ativação desde a Zurich, com suporte até a Brazil (KB0867184).",
        "Usa serviços REST com um perfil de Basic auth."
      ],
      "vendorSide": [
        "Endpoint REST exclusivo, usuário e senha fornecidos pela Accurate."
      ],
      "snSide": [
        "<code>sn_hr_integrations.admin</code>."
      ],
      "setup": [
        {
          "title": "Informar as credenciais",
          "path": "All &gt; HR Integrations &gt; Sources &gt; Accurate Background Check",
          "steps": [
            "Abra o registro <strong>Accurate Background Check</strong>.",
            "No related list REST credentials, destrave o campo <strong>Basic auth profile</strong>, escolha <strong>Accurate BG Check Credentials</strong> e abra o registro.",
            "No formulário Basic Auth Configuration, informe usuário e senha e selecione Update.",
            "No HR REST service correspondente, informe o endpoint recebido da Accurate."
          ]
        },
        {
          "title": "Conferir a integração e os pacotes",
          "path": "HR Integrations",
          "steps": [
            "Siga \"Verify integration for the Accurate service\" para conferir os mapeamentos.",
            "Adicione os pacotes de background check da Accurate."
          ]
        }
      ],
      "validate": [
        "Um caso de pedido de background check recebe o applicant ID e o status, e o funcionário recebe o e-mail com o link."
      ],
      "issues": [
        Object.assign({}, __BG_DEPREC, { "src": { "title": "Integrating with the Accurate Background service (docs oficiais)", "url": __HR + "integrate-with-accurate-service.html" } })
      ],
      "docs": [
        { "title": "Integrating with the Accurate Background service", "url": __HR + "integrate-with-accurate-service.html" },
        { "title": "Add background check packages for the Accurate service", "url": __HR + "background-check-package-for-accurate.html" }
      ]
    },
    {
      "id": "cicplus",
      "name": "CICPlus",
      "area": "Onboarding",
      "what": "Deixa novos contratados nos EUA informarem os dados fiscais pela CIC Plus durante o onboarding. A CIC Plus busca o perfil do funcionário na instância e devolve o resultado por callback.",
      "app": "Integração de HR Integrations com CIC Plus",
      "builtBy": "ServiceNow (integração do HR Service Delivery; parte da configuração é feita pela CIC Plus)",
      "compat": [
        "Vale para funcionários baseados nos EUA.",
        "Pressupõe integração com um provedor de identidade (IdP) que já tenha o usuário do novo contratado.",
        "Feita para o lifecycle event de new hire onboarding que vem como demo data no plugin Lifecycle Events for Enterprise (<code>com.sn_hr_lifecycle_ent</code>)."
      ],
      "vendorSide": [
        "Receba da CIC Plus os detalhes de configuração SAML e o Company ID.",
        "Envie à CIC Plus a faixa de IPs, a URL da instância e as credenciais de um usuário com o papel <code>sn_hr_core.usa_employee_only</code>.",
        "A CIC Plus configura a conta para ler perfis pelo endpoint REST <code>get_usa_employee_profile</code> e confere o callback."
      ],
      "snSide": [
        "<code>sn_hr_core.admin</code> e <code>sn_hr_integrations.admin</code>.",
        "Um usuário de integração com <code>sn_hr_core.usa_employee_only</code>."
      ],
      "setup": [
        {
          "title": "Configurar a integração",
          "path": "",
          "steps": [
            "Crie o usuário com o papel <code>sn_hr_core.usa_employee_only</code>.",
            "Configure a conexão SAML entre o IdP e a CIC Plus usando o <strong>número do funcionário como name identifier</strong> (detalhes na documentação da CIC Plus).",
            "Peça à CIC Plus para configurar o endpoint <code>get_usa_employee_profile</code> e verificar o callback.",
            "Configure as credenciais da origem com a URL de login do IdP usado na integração."
          ]
        }
      ],
      "validate": [
        "No onboarding de um novo contratado nos EUA, a etapa da CIC Plus abre com o login do IdP e o perfil do funcionário já identificado."
      ],
      "issues": [
        {
          "added": "2026-11-13", "level": "oficial", "status": "observação", "date": "2026-11",
          "problem": "A CIC Plus chama a instância com usuário e senha de um usuário de integração",
          "fix": "Pelo desenho da doc, a CIC Plus acessa o endpoint <code>get_usa_employee_profile</code> com as credenciais do usuário <code>sn_hr_core.usa_employee_only</code>. <em>Sugestão:</em> isso é uma integração de entrada; confira com a CIC Plus se ela é afetada pelo COMM3378032 e se aceita OAuth 2.0 ou mTLS.",
          "src": { "title": "Set up the CIC Plus integration (docs oficiais)", "url": __HR + "set-up-cic-plus-integration.html" }
        }
      ],
      "docs": [
        { "title": "CIC Plus service", "url": __HR + "integrating-with-cic-plus-service.html" },
        { "title": "Set up the CIC Plus integration", "url": __HR + "set-up-cic-plus-integration.html" }
      ]
    },
    {
      "id": "adobe-sign",
      "name": "Adobe Sign",
      "area": "Documentos",
      "what": "Envia documentos de RH para assinatura digital pelo Adobe Acrobat Sign, como cartas de admissão, termos de confidencialidade e documentos de desligamento, usando dados da ServiceNow nos templates.",
      "app": "Adobe Sign Spoke (Integration Hub) · Document Templates do HR Service Delivery",
      "builtBy": "ServiceNow (spoke da Integration Hub)",
      "compat": [
        "Exige assinatura da <strong>Integration Hub</strong>. A versão mais recente do spoke é a <strong>v2.11.0</strong>.",
        "Dependências: ServiceNow IntegrationHub Action Step - REST (<code>com.glide.hub.action_step.rest</code>) e ServiceNow IntegrationHub Runtime (<code>com.glide.hub.integration.runtime</code>).",
        "O spoke também tem catálogo de itens e sincronização de grupo do Adobe Sign."
      ],
      "vendorSide": [
        "Conta Adobe Acrobat Sign e as credenciais pedidas na página de setup do spoke."
      ],
      "snSide": [
        "<code>admin</code> para instalar e conectar o spoke.",
        "<code>sn_dt_adobesign.admin</code> para configurar os templates de documento."
      ],
      "setup": [
        {
          "title": "Instalar e conectar o spoke",
          "path": "ServiceNow Store · Integration Hub",
          "steps": [
            "Confira a assinatura da Integration Hub e instale o Adobe Sign Spoke.",
            "Faça a conexão com a conta Adobe Acrobat Sign seguindo a página do spoke."
          ]
        },
        {
          "title": "Configurar os templates de documento",
          "path": "All &gt; Document Templates",
          "steps": [
            "Abra um template e preencha os campos obrigatórios.",
            "Em <strong>Signing type</strong>, escolha <strong>Adobe Sign</strong>.",
            "Defina os participantes, as tarefas de cada um e os blocos de assinatura.",
            "Associe o template ao HR template de um serviço e dispare as tarefas de documento a partir do caso."
          ]
        }
      ],
      "validate": [
        "Quem recebe a tarefa de documento consegue assinar pelo Adobe Sign."
      ],
      "issues": [],
      "docs": [
        { "title": "Adobe Sign Spoke", "url": __IH + "adobe-sign-spoke.html" },
        { "title": "Configure document templates for Adobe Sign", "url": __HR + "sign-adobe-doc.html" }
      ]
    },
    {
      "id": "onedrive",
      "name": "Microsoft OneDrive",
      "area": "Documentos",
      "what": "Conecta a instância ao OneDrive por OAuth 2.0 para que flows e agentes acessem arquivos e pastas, por exemplo para guardar ou buscar documentos de RH.",
      "app": "Microsoft OneDrive Spoke (Integration Hub)",
      "builtBy": "ServiceNow (spoke da Integration Hub)",
      "compat": [
        "Exige assinatura da <strong>Integration Hub</strong> e o spoke ativado.",
        "Autenticação OAuth 2.0 com um app registrado no Azure."
      ],
      "vendorSide": [
        "Conta OneDrive, conta Azure e credenciais de administrador do tenant.",
        "App registration com redirect URI <code>https://&lt;instância&gt;.service-now.com/oauth_redirect.do</code> e client secret.",
        "Permissões do Microsoft Graph listadas na doc: Calendars.ReadWrite, Calendars.ReadWrite.Shared, email, Files.Read, Files.Read.All e offline_access."
      ],
      "snSide": [
        "<code>admin</code>."
      ],
      "setup": [
        {
          "title": "Registrar o app no Azure",
          "path": "Azure: App registrations",
          "steps": [
            "Registre um app novo com nome, tipo de conta suportado e o redirect URI da instância.",
            "Copie o Application ID: ele será o Client ID na ServiceNow.",
            "Em <strong>Manage &gt; Certificates &amp; secrets</strong>, crie um client secret e copie na hora (ele só aparece uma vez).",
            "Em <strong>Manage &gt; API permissions &gt; Microsoft Graph</strong>, adicione as permissões Delegated ou Application necessárias."
          ]
        },
        {
          "title": "Registrar o OneDrive como provedor OAuth",
          "path": "System OAuth &gt; Application Registry",
          "steps": [
            "Selecione New e <strong>Connect to a third-party OAuth Provider</strong>.",
            "Preencha Name, Client ID (Application ID), Client Secret e Default Grant type = <strong>Authorization Code</strong>.",
            "Authorization URL: <code>https://login.microsoftonline.com/common/oauth2/v2.0/authorize</code> para app multi-tenant, ou o endereço com o Directory (tenant) ID para single tenant.",
            "Informe na aba de OAuth Entity scopes as mesmas permissões dadas no Azure e conclua a conexão do spoke conforme a doc."
          ]
        }
      ],
      "validate": [
        "Uma ação do spoke de teste no Flow Designer lista arquivos do OneDrive sem erro de autorização."
      ],
      "issues": [],
      "docs": [
        { "title": "Microsoft OneDrive Spoke", "url": __IH + "onedrive-spoke.html" },
        { "title": "Set up Microsoft OneDrive spoke", "url": __IH + "setup-msonedrive.html" }
      ]
    },
    {
      "id": "sailpoint",
      "name": "SailPoint IdentityIQ",
      "area": "Identidade e acesso",
      "what": "Provisiona aplicações para novos contratados no onboarding: o gestor recebe uma tarefa para atribuir papéis e entitlements no SailPoint, e a TI recebe o pedido para acompanhar o provisionamento.",
      "app": "SailPoint IdentityIQ for Service Catalog v2 (Store) · lifecycle event de new hire onboarding",
      "builtBy": "Configuração de HR da ServiceNow sobre o app da Store (confira o publicador na ficha da Store)",
      "compat": [
        "Exige o app <strong>SailPoint IdentityIQ for Service Catalog v2</strong>, versão <strong>2.0.10 ou superior</strong>.",
        "Feita para o lifecycle event de new hire onboarding que vem como demo data no plugin Lifecycle Events for Enterprise (<code>com.sn_hr_lifecycle_ent</code>)."
      ],
      "vendorSide": [
        "SailPoint IdentityIQ configurado para receber os pedidos do Service Catalog, conforme a documentação do app."
      ],
      "snSide": [
        "<code>admin</code> para instalar o app da Store.",
        "Gestor do novo contratado para completar a tarefa de atribuição de papéis."
      ],
      "setup": [
        {
          "title": "Instalar e usar no onboarding",
          "path": "ServiceNow Store · HR Lifecycle Events",
          "steps": [
            "Instale o SailPoint IdentityIQ for Service Catalog v2 (2.0.10 ou superior).",
            "Use a atividade de demo <strong>Account and Application Access in Sailpoint</strong>, do activity set Day One.",
            "Use o HR task template <strong>Assign Roles in Sailpoint</strong> para a tarefa do gestor."
          ]
        }
      ],
      "validate": [
        "Ao criar um caso de onboarding, o gestor recebe a tarefa de atribuir papéis e, depois de concluí-la, a TI recebe o pedido."
      ],
      "issues": [],
      "docs": [
        { "title": "Sailpoint integration for new hire onboarding", "url": __D + "employee-service-management/employee-journey-management/sailpoint-integration-for-new-hire-onboarding.html" }
      ]
    },
    {
      "id": "entra-id",
      "name": "Microsoft Active Directory / Azure AD",
      "area": "Identidade e acesso",
      "what": "Automatiza ações de identidade no Microsoft Entra ID (antigo Azure Active Directory) a partir de flows, como as etapas de conta em admissões, transferências e desligamentos.",
      "app": "Microsoft Entra ID Spoke (antigo Microsoft Azure Active Directory spoke)",
      "builtBy": "ServiceNow (spoke da Integration Hub)",
      "compat": [
        "Exige assinatura da <strong>Integration Hub</strong> e o spoke ativado.",
        "Autenticação OAuth 2.0 com um app registrado no Entra ID.",
        "<em>Sugestão:</em> para Active Directory local, o caminho da plataforma costuma ser a integração LDAP, que não está neste guia. Confirme com o time qual dos dois é usado."
      ],
      "vendorSide": [
        "Conta e credenciais de administrador do Entra ID.",
        "App registration com redirect URI <code>https://&lt;instância&gt;.service-now.com/oauth_redirect.do</code>, client secret e as permissões das ações que serão usadas, com admin consent."
      ],
      "snSide": [
        "<code>admin</code>."
      ],
      "setup": [
        {
          "title": "Criar o app no Entra ID",
          "path": "Azure portal &gt; Microsoft Entra ID &gt; App registrations",
          "steps": [
            "Selecione New registration (ou use um app existente configurado da mesma forma) e informe o redirect URI da instância.",
            "Selecione Register e anote o <strong>Directory ID</strong>.",
            "Em <strong>Certificates &amp; secrets</strong>, crie um client secret e anote o valor.",
            "Em <strong>API permissions</strong>, adicione as permissões das ações do spoke (a doc lista por ação) e conceda o admin consent."
          ]
        },
        {
          "title": "Conectar o spoke",
          "path": "Integration Hub · Connections &amp; Credentials",
          "steps": [
            "Registre o app como provedor OAuth na instância e configure a conexão do Microsoft Entra ID spoke, conforme a página de setup."
          ]
        }
      ],
      "validate": [
        "Uma ação de leitura do spoke no Flow Designer (por exemplo, buscar um usuário) responde sem erro de autorização."
      ],
      "issues": [],
      "docs": [
        { "title": "Microsoft Entra ID Spoke", "url": __IH + "microsoft-azure-ad-spoke.html" },
        { "title": "Set up Microsoft Entra ID spoke", "url": __IH + "set-up-azure.html" }
      ]
    }
  ]
};
