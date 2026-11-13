/* Radar SecOps & IRM — guia de integrações.
   level dos problemas: "oficial" (docs/KB ServiceNow), "fabricante" (doc do fornecedor),
   "servicenow" (funcionário ServiceNow na Community), "comunidade" (relato de usuário). */
var __DOCS = "https://www.servicenow.com/docs/r/security-management/";
window.RADAR_INT = {
  "reviewed": "2026-11-08",
  "release": "Brazil",
  "notices": [
    {
      "tag": "atenção",
      "prazo": "novembro de 2027 (release Denmark)",
      "title": "Basic Authentication em integrações de entrada perde suporte",
      "html": "O comunicado <strong>COMM3378032</strong> da ServiceNow encerra o suporte a usuário e senha em requisições de API <strong>de entrada</strong> (REST, SOAP e outras), inclusive em contas de serviço (Web Service Access Only). Revise as integrações em que um sistema externo chama a instância com usuário e senha e migre para OAuth 2.0, mutual TLS (mTLS) ou token federado. O KB3220405 mostra como identificar essas integrações e como migrar.",
      "suggestion": "<em>Sugestão:</em> na maioria dos guias desta aba, a ServiceNow busca os dados na ferramenta e se autentica nela (API key, token ou OAuth). Esse sentido não é o afetado. Priorize o que envia dados <strong>para</strong> a instância, como webhooks, envio de alertas e scripts que chamam a API da ServiceNow.",
      "url": "https://radar-snow.github.io/comunicados/#c-basic-auth",
      "urlLabel": "Ver o comunicado completo"
    }
  ],
  "items": [
    {
      "id": "tenable",
      "name": "Tenable",
      "area": "VR / USEM",
      "what": "Importa ativos, plugins e vulnerabilidades do Tenable.io (Tenable Vulnerability Management), Tenable.sc e Tenable.cs para a Vulnerability Response, criando vulnerable items (VITs) e CIs.",
      "app": "Vulnerability Response Integration with Tenable",
      "builtBy": "ServiceNow",
      "compat": [
        "Exige Vulnerability Response 12.1 ou superior.",
        "Tenable.sc a partir da versão 5.13; Tenable.cs a partir da 5.0.1.",
        "Integração multi-source: dá para ter mais de uma instância Tenable. A primeira serve de modelo para as seguintes."
      ],
      "vendorSide": [
        "<strong>Tenable.io:</strong> usuário com permissão ≥ 64 (Administrator). A partir da v3.8 da integração, um usuário básico com permissão 16 também funciona.",
        "<strong>Tenable.sc:</strong> usuário Security Analyst ou Manager. A partir da 5.13, autenticação por API Key (Access Key e Secret Key).",
        "<strong>Tenable.cs:</strong> token gerado na plataforma Tenable CS.",
        "Tenable.sc on-premises fora da rede da instância: precisa de MID Server."
      ],
      "snSide": [
        "<code>admin</code> instala o app e atribui os papéis iniciais.",
        "<code>sn_vul.vulnerability_admin</code> configura as integrações no Setup Assistant.",
        "<code>sn_vul_tenable.configure_integrations</code> para configurar e <code>sn_vul_tenable.read_integration</code> para leitura.",
        "Estime o volume de VITs e confirme que a instância comporta: instância subdimensionada gera cargas lentas."
      ],
      "setup": [
        {
          "title": "Instalar pelo Setup Assistant",
          "path": "All &gt; Vulnerability Response &gt; Administration &gt; Setup Assistant &gt; Integration application Installation",
          "steps": [
            "Baixe o app da ServiceNow Store (em produção, pegue o entitlement antes).",
            "No Setup Assistant, localize o card <strong>Tenable (Tenable Platform)</strong> e selecione <strong>Install</strong>.",
            "Siga os prompts até concluir a instalação."
          ]
        },
        {
          "title": "Configurar a conexão e os imports",
          "path": "Setup Assistant &gt; Integration Configuration &gt; Scanner Integrations",
          "steps": [
            "Ao lado do Tenable desejado (io, sc ou cs), selecione <strong>Edit</strong>.",
            "Em <strong>Account Credentials</strong>: produto, nome da conta, <strong>Instance URL</strong>, método de autenticação e chaves. Se necessário, escolha o MID Server.",
            "<strong>Asset Import Configuration:</strong> ative, defina a data inicial e o agendamento. Revise as <strong>CI Lookup Rules</strong>, que definem como o ativo vira CI no CMDB.",
            "<strong>Plugins Import Configuration:</strong> ative, defina a data inicial e o agendamento. Deixe a data vazia para importar tudo.",
            "<strong>Vulnerabilities Import Configuration:</strong> ative, defina a data inicial e filtre por severidade (io) ou query (sc).",
            "Use <strong>Import Assets Now</strong> e <strong>Import Plugins Now</strong> para o primeiro teste sob demanda."
          ]
        }
      ],
      "validate": [
        "Veja o gráfico <strong>Integration run status</strong> da integração Tenable para checar sucesso ou falha de cada execução.",
        "Confira se os ativos chegaram e casaram com CIs (ou caíram em Discovered Items) e se os VITs foram criados.",
        "Para rescan sob demanda no Tenable.io, as integrações Tenable.io Template e Scan Credential precisam estar ativas (Tenable Vulnerability Integration &gt; Administration &gt; Integrations)."
      ],
      "issues": [
        {
          "added": "2026-11-09",
          "level": "comunidade",
          "status": "contorno",
          "date": "2026-08",
          "problem": "\"Invalid response code received from TenableSCPluginIntegration: 403. Access denied.\" no job de plugins do Tenable.sc (relatos em instâncias Australia, desde jul/2026)",
          "fix": "Solução aceita na thread (de usuário, não de funcionário ServiceNow): a Tenable lançou o VPR 2.0 no início de julho, e o appliance do Tenable.sc ficou sem espaço em disco. Peça ao time da Tenable para checar os logs do appliance e aumentar <code>/tmp</code> e <code>/var/tmp</code> (o autor cita recomendação da Tenable de pelo menos 4 GB cada). Depois disso pode aparecer \"Invalid response code received received from TenableSCPluginIntegration: 0\" até o backlog ser importado. Outro usuário relatou o mesmo 403 logo após o upgrade para Australia, com credenciais novas, e abriu caso no suporte, ainda sem resposta na thread. <em>Sugestão:</em> confira também se o MID Server está ativo e se o usuário tem papel Security Analyst ou Manager no Tenable.sc.",
          "src": {
            "title": "TenableSCPluginIntegration (Community, jul–ago/2026; sem resposta de funcionário ServiceNow)",
            "url": "https://www.servicenow.com/community/secops-forum/tenablescpluginintegration/td-p/3570033"
          }
        },
        {
          "added": "2026-11-09",
          "level": "comunidade",
          "status": "sem solução",
          "date": "2025-11",
          "problem": "\"Invalid response code received from TenableIOVulnerabilitiesIntegration: 401\" com \"At least one import queue entry is in error. No more data to process at this time.\" na integração de fixed vulnerabilities do Tenable.io",
          "fix": "A thread não tem resposta. <em>Sugestão:</em> 401 costuma indicar chave de API inválida ou expirada. Gere novas Access/Secret Keys no Tenable.io, atualize a credencial e rode a integração sob demanda.",
          "src": {
            "title": "Tenable.io fixed vulnerabilities integration failure (Community, nov/2025)",
            "url": "https://www.servicenow.com/community/ask-the-experts-forum/tenable-io-fixed-vulnerabilities-integration-failure/m-p/3425955"
          }
        },
        {
          "level": "oficial",
          "problem": "Timeout ou \"invalid credentials\" no Setup Assistant",
          "fix": "As integrações expiram em 5 minutos sem resposta, com ou sem MID Server. A doc manda conferir credenciais e Instance URL no Setup Assistant.",
          "src": {
            "title": "Configure the Tenable Vulnerability Integration using Setup Assistant",
            "url": __DOCS + "vulnerability-response/vr-tenable-config-in-SA.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Ingestão lenta depois de marcar \"Create vulnerable items for 'Fixed' vulnerability detections\"",
          "fix": "A doc avisa que essa opção cria VITs para detecções já corrigidas e pode prejudicar a performance de ingestão. Ative só se precisar desse histórico.",
          "src": {
            "title": "Configure the Tenable Vulnerability Integration using Setup Assistant",
            "url": __DOCS + "vulnerability-response/vr-tenable-config-in-SA.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Vindo do app antigo feito pela Tenable",
          "fix": "Há um guia de limpeza e migração para o app feito pela ServiceNow: KB0960667 (exige login no Now Support).",
          "src": {
            "title": "Preparing for the Tenable Vulnerability Integration",
            "url": __DOCS + "vulnerability-response/tenable-setup-checklist.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "comunidade",
          "problem": "Erro 403 em TenableSCAssetsIntegration com credenciais corretas",
          "fix": "Num caso resolvido, as datas de import no Setup Assistant estavam no futuro. Ajustar para uma data anterior resolveu. Em outro caso, o problema era permissão do usuário no Tenable.sc. Confira as duas coisas.",
          "src": {
            "title": "TenableSCAssetsIntegration Error 403 (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/tenablescassetsintegration-error-403/m-p/2835256"
          },
          "added": "2026-11-08",
          "status": "contorno",
          "date": "2024-02"
        },
        {
          "level": "comunidade",
          "problem": "Erro 429 (Too many requests) no import de vulnerabilidades do Tenable.io",
          "fix": "Causa relatada: export job travado em PROCESSING do lado da Tenable. A solução foi listar os export jobs pela API da Tenable e cancelar o que estava preso.",
          "src": {
            "title": "Invalid response code 429 received from Tenable (Community)",
            "url": "https://www.servicenow.com/community/developer-forum/vulnerabilities-integration-is-failed-showing-error-invalid/td-p/2690769"
          },
          "added": "2026-11-08",
          "status": "resolvido",
          "date": "2023-10"
        },
        {
          "added": "2026-11-08",
          "level": "servicenow",
          "status": "limitação",
          "date": "2026-04",
          "problem": "Rescan falha com 403 \"Please specify a valid Repository\" / \"Access denied\" em repositórios de Agent no Tenable.sc",
          "fix": "Não é permissão. É limitação documentada: o Tenable.sc não aceita lançar rescan em máquinas com agente, e o rescan da VR envia um pedido de active scan. Rescan de Active Scans funciona. Contorno: rode os scans de agente direto no Tenable.sc, com cadência menor, e deixe o próximo import trazer o resultado.",
          "src": {
            "title": "VR Tenable Integration: issue with rescanning (resposta de funcionário ServiceNow, abr/2026)",
            "url": "https://www.servicenow.com/community/secops-forum/vulnerability-response-tenable-integration-issue-with-rescanning/m-p/3517548"
          }
        },
        {
          "added": "2026-11-08",
          "level": "comunidade",
          "status": "sem solução",
          "date": "2025-02",
          "problem": "\"Job exceeded the processing time and was forced to complete\" no Tenable.io (data source Tenable.io Assets)",
          "fix": "Relatado com a nota \"Some import queue entries are in error\". A thread não tem resposta. <em>Sugestão:</em> revise as entradas com erro na fila de import e reduza o volume por execução com filtros de data e severidade. Se persistir, abra caso no suporte.",
          "src": {
            "title": "Tenable.io integration fails: Job exceeded the processing time (Community)",
            "url": "https://www.servicenow.com/community/developer-forum/tenable-io-integration-fails-with-error-job-exceeded-the/td-p/3184768"
          }
        },
        {
          "added": "2026-11-08",
          "level": "oficial",
          "status": "ver KB",
          "problem": "Vulnerable items não são criados depois de atualizar a Vulnerability Response e os plugins da Tenable",
          "fix": "Existe um KB oficial exatamente para esse sintoma: KB2742409. O conteúdo exige login no Now Support. Se acontecer após um upgrade, comece por ele.",
          "src": {
            "title": "KB2742409 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2742409"
          }
        }
      ],
      "docs": [
        {
          "title": "Preparing for the Tenable Vulnerability Integration",
          "url": __DOCS + "vulnerability-response/tenable-setup-checklist.html"
        },
        {
          "title": "Install using Setup Assistant",
          "url": __DOCS + "vulnerability-response/tenableInstall.html"
        },
        {
          "title": "Configure using Setup Assistant",
          "url": __DOCS + "vulnerability-response/vr-tenable-config-in-SA.html"
        },
        {
          "title": "REST messages da integração",
          "url": __DOCS + "vulnerability-response/tenable-rest-msgs.html"
        },
        {
          "title": "Integration run status chart",
          "url": __DOCS + "vulnerability-response/tenable-integration-run.html"
        }
      ],
      "module": "secops"
    },
    {
      "id": "wiz",
      "name": "Wiz",
      "area": "VR / USEM",
      "what": "Um único app que traz do Wiz vulnerabilidades de host e serverless (VITs), de containers (CVITs), test results e Issues de cloud (Configuration Compliance), além de SCA e secrets (AVITs).",
      "app": "Vulnerability Response Integration with Wiz",
      "builtBy": "ServiceNow (substituiu os 3 apps feitos pela Wiz em 31/07/2025)",
      "compat": [
        "Depende de Vulnerability Response e apps de suporte (NVD, Integration with CISA, job de CWE), Container Vulnerability Response e Configuration Compliance, que são assinaturas separadas.",
        "A partir das versões 30.3 (workspace USEM) e 1.3 (workspace legado), a chave de detecção do Host Vulnerability passou a usar UUID.",
        "Findings de AI security exigem a versão 32.8.4 ou superior e o escopo <code>read:ai_security_findings</code> na conta de serviço."
      ],
      "vendorSide": [
        "No Wiz, crie o tile de integração ServiceNow (conta de serviço) e anote <strong>Auth URL</strong>, <strong>API URL</strong>, <strong>Client ID</strong> e <strong>Client Secret</strong>.",
        "Permissões por integração: Host Vulnerability → <code>read:host_configuration</code> e <code>read:vulnerabilities</code>; Asset → <code>read:resources</code>; Container → <code>read:cloud_configuration</code>; Test Results, Compliance e Issues → <code>read:issues</code> e <code>read:threat_issues</code>; Application List, SCA e Secrets → <code>read:secret_instances</code>."
      ],
      "snSide": [
        "<code>admin</code> instala o app e atribui os papéis.",
        "<code>sn_vul.vulnerability_admin</code> e <code>sn_vulc.admin</code> para configurar VR e Container VR.",
        "<code>sn_vul_wiz.configure_integration</code> para configurar e <code>sn_vul_wiz.read_integration</code> para leitura."
      ],
      "setup": [
        {
          "title": "Instalar o app",
          "path": "All &gt; System Applications &gt; All Available Applications",
          "steps": [
            "Localize <strong>Vulnerability Response Integration with Wiz</strong> e abra o card.",
            "Selecione <strong>Install</strong> e, no <strong>Dependency Checklist</strong>, instale o que estiver como \"Needs to be installed\".",
            "Confirme em <strong>Install</strong> no diálogo final."
          ]
        },
        {
          "title": "Configurar a conexão",
          "path": "All &gt; Wiz Vulnerability Integration &gt; Administration &gt; Configuration",
          "steps": [
            "Atribua os papéis em User administration &gt; Users.",
            "Com o papel <code>sn_vul_wiz.configure_integration</code>, abra a Configuration. <strong>Confirme que o Application scope está em Vulnerability Response Integration with Wiz.</strong>",
            "Preencha Auth URL, Api URL, Client ID e Client Secret.",
            "Selecione <strong>Save and test</strong> e aguarde a mensagem de validação.",
            "Defina quais Resource Types importar na integração de ativos (opcional; não precisa mais rodar antes das outras)."
          ]
        }
      ],
      "validate": [
        "A mensagem de sucesso do <strong>Save and test</strong> confirma credenciais e URLs.",
        "Na tabela de Vulnerable Items (<code>sn_vul_vulnerable_item</code>), adicione a coluna UUID para conferir a nova chave de detecção.",
        "Depois de mudar a chave em Vulnerability Response &gt; Administration &gt; Configure Detection Granularity, rode um <strong>import completo</strong> para ver o efeito."
      ],
      "issues": [
        {
          "added": "2026-11-09",
          "level": "comunidade",
          "status": "sem solução",
          "date": "2025-07",
          "problem": "Job \"Wiz Fetch Vulnerabilities - On Demand\" cria detecções, mas nenhum vulnerable item é criado (app antigo \"Wiz Integration for Security Operations\")",
          "fix": "A thread não tem resposta. O relato é do app antigo feito pela Wiz, que a ServiceNow substituiu pelo \"Vulnerability Response Integration with Wiz\". <em>Sugestão:</em> se ainda estiver no app antigo, planeje a migração para o app da ServiceNow antes de investigar a fundo.",
          "src": {
            "title": "VR: Wiz Integration is not creating vulnerable items from detections (Community, jul/2025)",
            "url": "https://www.servicenow.com/community/secops-forum/vr-wiz-integration-is-not-creating-vulnerable-items-from/td-p/3332256"
          }
        },
        {
          "level": "servicenow",
          "problem": "Não aparecem os jobs \"Wiz Fetch Vulnerabilities - On Demand / Daily Run\"",
          "fix": "Esses processos são do app antigo feito pela Wiz. O app atual (ServiceNow) tem outros jobs e outra documentação. Use a doc nova e ignore tutoriais antigos.",
          "src": {
            "title": "Unable to find Wiz Fetch Vulnerabilities (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/unable-to-find-quot-wiz-fetch-vulnerabilities-quot-integration/m-p/3579204"
          },
          "added": "2026-11-08",
          "status": "resolvido",
          "date": "2026-08"
        },
        {
          "level": "servicenow",
          "problem": "Algum job de integração Wiz simplesmente não existe na instância",
          "fix": "Jobs só aparecem se o app dependente estiver instalado. Exemplo: Test Results e Issues exigem Configuration Compliance.",
          "src": {
            "title": "Unable to find Wiz Fetch Vulnerabilities (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/unable-to-find-quot-wiz-fetch-vulnerabilities-quot-integration/m-p/3579204"
          },
          "added": "2026-11-08",
          "status": "resolvido",
          "date": "2026-08"
        },
        {
          "level": "servicenow",
          "problem": "Migrar dos apps antigos da Wiz",
          "fix": "Os apps antigos seguem funcionando até a troca, mas não são mais distribuídos. O guia de migração é o KB2344715 (exige login).",
          "src": {
            "title": "Announcement: Wiz integration with ServiceNow SecOps",
            "url": "https://www.servicenow.com/community/secops-articles/announcement-wiz-integration-with-servicenow-secops/ta-p/3325055"
          },
          "added": "2026-11-08",
          "status": "resolvido",
          "date": "2025-07"
        },
        {
          "level": "oficial",
          "problem": "Detecções duplicadas ou fechadas após o upgrade da chave",
          "fix": "A chave mudou de vulnerability + asset_id + proof para UUID. Rode um import completo depois do upgrade e revise a granularidade de detecção.",
          "src": {
            "title": "Configure the Vulnerability Response Integration with Wiz",
            "url": __DOCS + "vulnerability-response/vr-config-wiz-host-vuln.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "added": "2026-11-08",
          "level": "oficial",
          "status": "ver KB",
          "problem": "Execução falha com \"ConversionError: The undefined value has no properties\" nas notas",
          "fix": "Há um KB oficial para esse erro: KB2424280. O conteúdo exige login no Now Support.",
          "src": {
            "title": "KB2424280 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2424280"
          }
        },
        {
          "added": "2026-11-08",
          "level": "oficial",
          "status": "resolvido",
          "problem": "\"Save and test\" falha ou as credenciais não ficam salvas",
          "fix": "A doc pede que o <strong>Application scope</strong> esteja em Vulnerability Response Integration with Wiz antes de preencher a configuração. Troque o escopo e repita o Save and test.",
          "src": {
            "title": "Configure the Vulnerability Response Integration with Wiz",
            "url": __DOCS + "vulnerability-response/vr-config-wiz-host-vuln.html"
          }
        },
        {
          "added": "2026-11-08",
          "level": "comunidade",
          "status": "sem solução",
          "date": "2026-08",
          "problem": "Não há job de sincronização completa (reconciliação) de findings ativos no app novo",
          "fix": "Pergunta em aberto na Community: como reimportar todos os findings ativos ou refazer VITs/CVITs sem mudança no Wiz, como o antigo processo \"On Demand\" fazia. Ninguém confirmou uma alternativa nativa. <em>Sugestão:</em> consulte o suporte antes de depender disso.",
          "src": {
            "title": "Unable to find Wiz Fetch Vulnerabilities (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/unable-to-find-quot-wiz-fetch-vulnerabilities-quot-integration/m-p/3579204"
          }
        }
      ],
      "docs": [
        {
          "title": "Understanding the Vulnerability Response Integration with Wiz",
          "url": __DOCS + "vulnerability-response/vr-wiz-exploring-host-cf.html"
        },
        {
          "title": "Activate the application",
          "url": __DOCS + "vulnerability-response/vr-wiz-host-vuln-install.html"
        },
        {
          "title": "Configure the integration",
          "url": __DOCS + "vulnerability-response/vr-config-wiz-host-vuln.html"
        },
        {
          "title": "Wiz Asset Integration e Resource Types",
          "url": __DOCS + "vulnerability-response/wiz-assets-resources-tab.html"
        }
      ],
      "module": "secops"
    },
    {
      "id": "defender",
      "name": "Microsoft Defender for Security Operations",
      "area": "SIR",
      "what": "Ingere incidentes e alertas do Microsoft Defender no Security Incident Response, com sincronização bidirecional de status e work notes. Também substitui a integração do Azure Sentinel.",
      "app": "Microsoft Defender integration for Security Operations",
      "builtBy": "ServiceNow",
      "compat": [
        "A Microsoft adiou para março/2027 a descontinuação da experiência do Sentinel no portal Azure. Quem usa a integração Sentinel com SIR deve migrar para a do Defender portal.",
        "A integração tem um utilitário de migração que converte perfis Sentinel em perfis Defender (KB2795226).",
        "Ambientes de nuvem suportados: GLOBAL, US-GOV-GCC-HIGH, US-GOV-DOD e CHINA."
      ],
      "vendorSide": [
        "Registre um app no Microsoft Entra ID e anote <strong>Tenant ID</strong>, <strong>Client ID</strong> e <strong>Client Secret</strong>.",
        "Permissões de API: <code>SecurityIncident.Read.All</code> e <code>SecurityIncident.ReadWrite.All</code>, do tipo <strong>Application</strong>, com admin consent."
      ],
      "snSide": [
        "<code>sn_si.admin</code> (herda tudo de profile admin) ou <code>sn_si.ingestion_profile_admin</code>.",
        "<code>sn_si.analyst</code> para trabalhar os incidentes."
      ],
      "setup": [
        {
          "title": "Instalar e conectar o tenant",
          "path": "All &gt; Security Operations &gt; Integrations &gt; Integration Configurations",
          "steps": [
            "Instale o app da ServiceNow Store.",
            "Busque o tile <strong>Microsoft Defender-Incident Ingestion Configuration</strong> e selecione <strong>Configure</strong>.",
            "Preencha Name, Cloud Environment, Tenant ID, Client ID e Client Secret, e selecione <strong>Submit</strong>."
          ]
        },
        {
          "title": "Criar o perfil de ingestão",
          "path": "All &gt; Microsoft Defender Integration &gt; Defender Incident Profiles",
          "steps": [
            "Selecione <strong>New</strong>, dê um nome (vira a security tag padrão), marque Active, escolha o tenant em Source e defina Order (o menor número tem prioridade).",
            "Selecione <strong>Continue</strong> e siga a barra de progresso: <strong>Mapping</strong> (campos do Defender → SIR), filtros e agregação.",
            "Em <strong>Scheduling</strong>: ative a ingestão contínua, defina o Polling increment (minutos) e, se quiser histórico, use <strong>One-Time Retrieval</strong> com a data inicial (há deduplicação).",
            "Em <strong>Additional Options</strong>: configure o que volta para o Defender (status, fechamento, work notes)."
          ]
        }
      ],
      "validate": [
        "O tile configurado aparece na página de Integration Configurations após o Submit.",
        "Com o perfil ativo, novos incidentes do Defender que passam nos filtros viram security incidents com a tag do perfil.",
        "Teste a volta: feche um incidente no SIR e confira o status no Defender."
      ],
      "issues": [
        {
          "added": "2026-11-09",
          "level": "servicenow",
          "status": "resolvido",
          "date": "2026-04",
          "problem": "Teste de conexão do conector nativo do Microsoft Defender no SIR falha com erro de autorização, mesmo com as permissões de API aparentemente configuradas no Azure",
          "fix": "Causa: as permissões foram concedidas como <strong>Delegated</strong>, mas o conector usa OAuth 2.0 Client Credentials e precisa de <strong>Application</strong>. No App Registration, marque <code>SecurityIncident.Read.All</code> e <code>SecurityIncident.ReadWrite.All</code> como Application, clique em <strong>Grant admin consent</strong>, confira Client ID, Client Secret e Tenant ID na ServiceNow e rode o teste de novo.",
          "src": {
            "title": "Microsoft Defender connection fails due to role permissions (artigo de funcionária ServiceNow, abr/2026)",
            "url": "https://www.servicenow.com/community/secops-articles/microsoft-defender-connection-fails-due-to-role-permissions/ta-p/3532663"
          }
        },
        {
          "level": "oficial",
          "problem": "Erro \"Missing required roles\" ao validar a configuração; nada é ingerido",
          "fix": "As permissões <code>SecurityIncident.*</code> foram dadas como <strong>Delegated</strong> no Entra ID. A integração roda em segundo plano e precisa de permissões <strong>Application</strong>. Remova as Delegated, adicione como Application e conceda admin consent.",
          "src": {
            "title": "KB2965877 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2965877"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Ainda usando a integração do Azure Sentinel",
          "fix": "Migre para a integração do Defender portal com o utilitário embutido, que mantém a continuidade dos incidentes criados via Sentinel. Guia: KB2795226.",
          "src": {
            "title": "Microsoft Defender integration for Security Operations",
            "url": __DOCS + "security-incident-response/ms-defender.html"
          },
          "added": "2026-11-08",
          "status": "resolvido",
          "date": "2026-03"
        },
        {
          "level": "oficial",
          "problem": "Incidentes do Sentinel não chegam pela integração de alertas do Graph",
          "fix": "Incidentes do Sentinel usam outro plugin: Microsoft Azure Sentinel Incident Ingestion Integration (<code>sn_sec_sentinel</code>), e não o de alertas do Graph Security API.",
          "src": {
            "title": "KB1741118 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB1741118"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "added": "2026-11-08",
          "level": "comunidade",
          "status": "sem solução",
          "date": "2026-05",
          "problem": "Mapeamento dos incidentes do Defender para o registro do SIR não fica bom no Security Operations Workspace",
          "fix": "Relatado nos comentários do anúncio de GA. O funcionário da ServiceNow que respondeu recomendou consultar o KB2795226 logado e abrir chamado no suporte se continuar. A thread não traz solução.",
          "src": {
            "title": "Now Available: Microsoft Defender Incident ingestion (comentários, mai/2026)",
            "url": "https://www.servicenow.com/community/secops-articles/now-available-microsoft-defender-incident-ingestion-integration/ta-p/3514605"
          }
        }
      ],
      "docs": [
        {
          "title": "Visão geral da integração",
          "url": __DOCS + "security-incident-response/ms-defender.html"
        },
        {
          "title": "Install and Configure",
          "url": __DOCS + "security-incident-response/configure-ms-defender.html"
        },
        {
          "title": "Create an incident profile",
          "url": __DOCS + "security-incident-response/ms-defender-profile.html"
        },
        {
          "title": "Map incident fields",
          "url": __DOCS + "security-incident-response/microsoft-defender-mapping.html"
        },
        {
          "title": "Schedule incident retrieval",
          "url": __DOCS + "security-incident-response/ms-defender-schedule-inc.html"
        },
        {
          "title": "Automate incident updates and closures",
          "url": __DOCS + "security-incident-response/ms-defender-additional-op.html"
        }
      ],
      "module": "secops"
    },
    {
      "id": "mitre",
      "name": "MITRE ATT&CK",
      "area": "SIR / Threat Intelligence",
      "what": "Carrega o repositório MITRE ATT&CK (matrizes, técnicas, grupos, malware, mitigações) via TAXII para associar técnicas a incidentes, observables e casos.",
      "app": "Faz parte do Threat Intelligence (perfil TAXII de base)",
      "builtBy": "ServiceNow",
      "compat": [
        "Instale nesta ordem, um por vez: Threat Intelligence Support Common UI Components (sn_ti_seismic) 1.0+, Threat Intelligence Support Common 12.0+, Threat Intelligence 12.0+, Security Incident Response 12.0+.",
        "As coleções vêm no plugin Threat Intelligence Core."
      ],
      "vendorSide": [
        "Nenhum cadastro do lado da MITRE: o perfil TAXII de base já aponta para os servidores públicos."
      ],
      "snSide": [
        "<code>admin</code> instala e atribui <code>sn_si.admin</code> e <code>sn_ti.admin</code>.",
        "<code>sn_ti.admin</code> configura o perfil TAXII.",
        "<code>sn_ti.mitre_analyst</code> dá navegação cruzada entre SIR e Threat Intelligence (somente leitura)."
      ],
      "setup": [
        {
          "title": "Ativar o perfil e as coleções",
          "path": "All &gt; Threat Intelligence &gt; Sources &gt; TAXII Profiles",
          "steps": [
            "Abra o perfil <strong>MITRE ATT&amp;CK</strong> de base.",
            "Na coleção que interessa (Enterprise, Mobile ou ICS ATT&amp;CK), marque <strong>Active</strong>. Deixe as outras desativadas, tanto na coleção quanto em Matrices.",
            "Defina o <strong>Run</strong> da coleção. O padrão é On Demand, e Daily não é permitido."
          ]
        }
      ],
      "validate": [
        "Os dados aparecem em <strong>MITRE ATT&amp;CK Repository &gt; Matrices</strong> e <strong>MITRE ATT&amp;CK Repository &gt; Techniques</strong>.",
        "Técnicas revogadas pela MITRE ficam marcadas como revoked e não podem ser usadas."
      ],
      "issues": [
        {
          "added": "2026-11-09",
          "level": "comunidade",
          "status": "contorno",
          "date": "2024-11",
          "problem": "Regra de auto-extração de técnicas MITRE ATT&amp;CK não preenche as técnicas em incidentes vindos do Azure Sentinel (só funciona manualmente)",
          "fix": "Um usuário relatou que o suporte da ServiceNow (via caso HI) mandou mudar a propriedade <code>sn_sec_sentinel.sentinel_security_incident_api_version</code> para <code>2024-03-01</code>; aí táticas e técnicas passaram a vir no payload de import. A thread não confirma que o vínculo com o SIR ficou automático e não tem solução aceita.",
          "src": {
            "title": "Auto Technique extraction rule for Azure Sentinel (Community, fev/2024–mar/2025)",
            "url": "https://www.servicenow.com/community/secops-forum/auto-technique-extraction-rule-for-azure-sentinel/td-p/2843446"
          }
        },
        {
          "level": "oficial",
          "problem": "Erro ao definir Run = Daily na coleção TAXII",
          "fix": "Comportamento esperado. A atualização diária é bloqueada para não sobrecarregar os servidores da MITRE, que só atualizam o ATT&amp;CK duas vezes por ano. O campo volta para On Demand; escolha uma frequência maior.",
          "src": {
            "title": "Set up the MITRE-ATT&CK framework",
            "url": __DOCS + "setup-mitre-profile.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Repositório vazio ou desatualizado",
          "fix": "As coleções só atualizam se estiverem ativas. Confira o Active da coleção e as versões mínimas dos apps de Threat Intelligence (12.0+), que preenchem os dados automaticamente.",
          "src": {
            "title": "Set up the MITRE-ATT&CK framework",
            "url": __DOCS + "setup-mitre-profile.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Medo de perder customizações na atualização",
          "fix": "Customizações feitas no repositório (malware, grupo, mitigação e ferramenta associados a uma técnica) são preservadas nas atualizações agendadas.",
          "src": {
            "title": "Set up the MITRE-ATT&CK framework",
            "url": __DOCS + "setup-mitre-profile.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "added": "2026-11-08",
          "level": "servicenow",
          "status": "resolvido",
          "date": "2021-02",
          "problem": "\"Get TAXII collections\" retorna \"No data collections found for this profile\" (404 nos Outbound HTTP Requests)",
          "fix": "Resposta de funcionário da ServiceNow: (1) veja no Upgrade Summary Report se arquivos <code>sn_ti</code> foram pulados; (2) compare o XML do perfil TAXII com uma cópia limpa, já que mudança de endpoint, método ou headers causa o 404; (3) teste a conectividade com um background script que faz GET no endpoint de collections da MITRE. Se nada resolver, abra chamado.",
          "src": {
            "title": "Missing TAXII Collections for MITRE ATT&CK Profile (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/missing-taxii-collections-for-mitre-att-ck-profile/m-p/1284785"
          }
        },
        {
          "added": "2026-11-08",
          "level": "comunidade",
          "status": "resolvido",
          "date": "2025-04",
          "problem": "Feeds MITRE desativados no TISC e sem botão de editar",
          "fix": "Duas causas na mesma thread: o escopo da sessão estava errado (volte para <strong>Threat Intelligence Support Common</strong> e o botão aparece) e a coleção Enterprise ATT&CK do perfil TAXII nunca tinha sido agendada e executada. Depois disso, as técnicas puderam ser associadas.",
          "src": {
            "title": "TISC MITRE Threat Intel Feeds - How to Enable? (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/tisc-mitre-threat-intel-feeds-how-to-enable/m-p/3228647"
          }
        },
        {
          "added": "2026-11-08",
          "level": "oficial",
          "status": "ver KB",
          "problem": "Integração MITRE ATT&CK roda por mais de 30 minutos",
          "fix": "Existe um KB oficial para esse sintoma: KB1579132 (conteúdo exige login). Pelo resumo público, a causa citada é o antivírus colocando o anexo da importação em quarentena (erro \"Cannot auto-detect encoding\"). Confirme no KB antes de mexer em exclusões do antivírus.",
          "src": {
            "title": "KB1579132 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB1579132"
          }
        }
      ],
      "docs": [
        {
          "title": "Get started with MITRE-ATT&CK framework",
          "url": __DOCS + "get-started-with-mitre.html"
        },
        {
          "title": "Set up the MITRE-ATT&CK framework",
          "url": __DOCS + "setup-mitre-profile.html"
        },
        {
          "title": "Review the MITRE-ATT&CK system properties",
          "url": __DOCS + "configure-mitre-att-ck-properties.html"
        }
      ],
      "module": "secops"
    },
    {
      "id": "misp",
      "name": "MISP",
      "area": "Threat Intelligence (TISC)",
      "what": "No TISC, ingere feeds MISP hospedados (formato manifest.json) e eventos de um servidor MISP via API para a biblioteca de inteligência. Existe também o app MISP integration for Security Operations, para sighting, enriquecimento e criação de eventos a partir do SIR.",
      "app": "Feeds MISP do Threat Intelligence Security Center · MISP integration for Security Operations (Store)",
      "builtBy": "ServiceNow",
      "compat": [
        "TISC já traz feeds MISP de base: DigitalSide OSINT, URLhaus, MalwareBazaar e ThreatFox (abuse.ch).",
        "O app MISP integration for Security Operations foi testado com MISP 2.4.137 ou superior e exige Security Incident Response, IntegrationHub Runtime e IntegrationHub Action Step - REST."
      ],
      "vendorSide": [
        "Feed hospedado: só a URL pública terminando em <code>/manifest.json</code>.",
        "Servidor MISP (feed via API ou app do SIR): URL do servidor e API Key (o Authkey do usuário no MISP), com um papel MISP adequado.",
        "Servidor MISP com certificado SSL válido, emitido por CA e não expirado."
      ],
      "snSide": [
        "TISC: <code>sn_sec_tisc.admin</code> para configurar feeds e <code>sn_sec_tisc.analyst</code> para ver.",
        "App do SIR: <code>sn_si.admin</code> ou <code>sn_ti.admin</code> para configurar e <code>sn_sec_misp.write</code> para o analista MISP."
      ],
      "setup": [
        {
          "title": "TISC: ativar o feed de eventos de um servidor MISP (API)",
          "path": "Workspaces &gt; Threat Intelligence Security Center &gt; Integrations &gt; Custom",
          "steps": [
            "No card <strong>MISP Feed</strong>, selecione <strong>Edit</strong>. Ele vem inativo por padrão.",
            "Em Configuration Details, preencha o <strong>REST endpoint URL</strong> e a autenticação do servidor.",
            "Em <strong>Additional Settings &gt; Edit Settings</strong>, defina os filtros: eventos não publicados, org criadora, tags, threat level e distribution level. Todos são aplicados juntos.",
            "Selecione <strong>Update</strong> e depois <strong>Enable</strong>. A data em <strong>Fetch data from</strong> é a linha de corte dos eventos."
          ]
        },
        {
          "title": "TISC: adicionar um feed MISP hospedado",
          "path": "Workspaces &gt; Threat Intelligence Security Center &gt; Integrations &gt; Threat Intel Feeds &gt; All Feeds &gt; Configure new source",
          "steps": [
            "Escolha o tipo <strong>MISP</strong>, dê nome, indústria e Source Type.",
            "Em Configuration: Expiry period (dias), confiança (0 a 100) e o <strong>REST endpoint URL</strong> terminando em <code>/manifest.json</code>.",
            "O script de integração padrão para esse tipo é <code>SimpleMISPFeedDatasourceIntegration</code>."
          ]
        },
        {
          "title": "SIR: conectar o app MISP integration for Security Operations",
          "path": "Security Operations &gt; Integrations &gt; Integration Configurations",
          "steps": [
            "Instale o app da Store e abra o tile <strong>MISP -SIR/TI Integration</strong> &gt; <strong>Configure</strong>.",
            "Preencha Name, <strong>MISP Server URL</strong> e <strong>API Key</strong>.",
            "Se o MISP for on-premises, marque <strong>On Premises Deployment</strong> e informe a <strong>MID Application</strong> (o MID Server é obrigatório nesse caso).",
            "Selecione <strong>Submit</strong>. O tile aparece na página Security Integrations."
          ]
        }
      ],
      "validate": [
        "TISC: os feeds aparecem em Integrations &gt; MISP com status. Cada evento importado ganha um registro External Reference com link para o evento no servidor MISP.",
        "SIR: após o Submit válido, o tile MISP aparece salvo nas Security Integrations."
      ],
      "issues": [
        {
          "level": "oficial",
          "problem": "Falha de conexão SSL com o servidor MISP",
          "fix": "Instale no servidor MISP um certificado válido, de CA e não expirado. Importe os certificados na plataforma se for o caso, e confira se o common name do certificado bate com o hostname.",
          "src": {
            "title": "Troubleshooting MISP integration",
            "url": __DOCS + "troubleshooting-misp-integration.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Feed MISP hospedado não importa nada",
          "fix": "Para o tipo MISP, só são aceitas URLs terminando em <code>/manifest.json</code>.",
          "src": {
            "title": "View MISP Feeds",
            "url": __DOCS + "threat-intelligence-security-center/view-oob-misp-feeds.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Feed de API do MISP configurado mas sem eventos",
          "fix": "O card vem inativo: é preciso selecionar <strong>Enable</strong>. Confira também a data em Fetch data from (publicados comparam com Published; não publicados, com Last updated) e se os filtros combinados não estão restritivos demais.",
          "src": {
            "title": "Configure custom MISP API feed",
            "url": __DOCS + "threat-intelligence-security-center/tisc-premium-misp.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "added": "2026-11-08",
          "level": "servicenow",
          "status": "resolvido",
          "date": "2026-01",
          "problem": "\"The Data source response processor only supports sys_attachments\" em feed customizado do TISC",
          "fix": "O usuário que roda a integração (credencial do MID Server ou do Connection &amp; Credential alias) não consegue gravar no registro de destino, então o anexo com a resposta não é criado. Dê a esse usuário só os papéis mínimos para criar e gravar os registros de destino. Não dê admin, e em geral não precisa de ACL separada de sys_attachment.",
          "src": {
            "title": "Fixing \"The Data source response processor only supports sys_attachments\" (funcionária ServiceNow, jan/2026)",
            "url": "https://www.servicenow.com/community/secops-articles/fixing-the-data-source-response-processor-only-supports-sys/ta-p/3469988"
          }
        },
        {
          "added": "2026-11-08",
          "level": "oficial",
          "status": "ver KB",
          "problem": "Compartilhamento de inteligência do TISC em formato MISP falha com 401",
          "fix": "Há um KB oficial: KB2927580 (conteúdo exige login). Pelo resumo público: o endpoint precisa ser um servidor MISP de verdade, a chave tem de ser o Auth Key do MISP e o perfil precisa estar ativo.",
          "src": {
            "title": "KB2927580 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2927580"
          }
        }
      ],
      "docs": [
        {
          "title": "TISC: Configure custom MISP API feed",
          "url": __DOCS + "threat-intelligence-security-center/tisc-premium-misp.html"
        },
        {
          "title": "TISC: View MISP Feeds",
          "url": __DOCS + "threat-intelligence-security-center/view-oob-misp-feeds.html"
        },
        {
          "title": "TISC: Configure a new threat intelligence feed",
          "url": __DOCS + "threat-intelligence-security-center/tisc-new-data-source.html"
        },
        {
          "title": "SIR: Getting started with MISP integration",
          "url": __DOCS + "get-started-with-misp-integration-for-security-operations.html"
        },
        {
          "title": "SIR: Install and configure the MISP integration",
          "url": __DOCS + "install-and-configure-misp.html"
        },
        {
          "title": "Troubleshooting MISP integration",
          "url": __DOCS + "troubleshooting-misp-integration.html"
        }
      ],
      "module": "secops"
    },
    {
      "id": "rss",
      "name": "RSS Feeds",
      "area": "Threat Intelligence (TISC)",
      "what": "Traz notícias e blogs de segurança via RSS/Atom para a biblioteca do TISC, como registros consultáveis com expiração.",
      "app": "Nativo do Threat Intelligence Security Center",
      "builtBy": "ServiceNow",
      "compat": [
        "Já vem com feeds de base, entre eles Krebs on Security, Schneier on Security, WeLiveSecurity, HelpNet Security, Security Affairs, Volexity e Cisco Newsroom Security."
      ],
      "vendorSide": [
        "Somente a URL pública do feed RSS ou Atom."
      ],
      "snSide": [
        "<code>sn_sec_tisc.admin</code> para ver e configurar fontes.",
        "<code>sn_sec_tisc.analyst</code> para ler os registros ingeridos."
      ],
      "setup": [
        {
          "title": "Revisar os feeds de base",
          "path": "Workspaces &gt; Threat Intelligence Security Center &gt; Integrations &gt; RSS",
          "steps": [
            "Revise a lista de feeds configurados e desative os que não interessam.",
            "Edite um feed para ajustar o Expiry period, que define quando os registros expiram."
          ]
        },
        {
          "title": "Adicionar uma fonte RSS nova",
          "path": "Workspaces &gt; Threat Intelligence Security Center &gt; Integrations &gt; Threat Intel Feeds &gt; All Feeds &gt; Configure new source",
          "steps": [
            "Escolha o tipo de feed RSS e preencha nome, descrição, indústria e Source Type.",
            "Informe o <strong>REST endpoint URL</strong> do feed e o Expiry period.",
            "Os scripts padrão são <code>RSSFeedDatasourceIntegration</code> (busca) e, para Atom, <code>AtomFeedDatasourceResponseProcessor</code> (processamento)."
          ]
        }
      ],
      "validate": [
        "Os registros aparecem em <strong>Threat Intel Library &gt; RSS Feeds &gt; All RSS Feeds</strong>, com título, link, fonte, data e autor.",
        "O campo <strong>Status</strong> e o <strong>Expiration time</strong> mostram se o registro ainda está válido."
      ],
      "issues": [
        {
          "level": "oficial",
          "problem": "Não consigo criar um registro em All RSS Feeds",
          "fix": "Por design: a lista da Threat Intel Library é só para consulta. Novas fontes são criadas em Integrations (Configure new source).",
          "src": {
            "title": "View RSS Feeds (biblioteca)",
            "url": __DOCS + "threat-intelligence-security-center/define-rss-feeds.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Registros RSS nunca expiram",
          "fix": "Sem Expiry period configurado na integração, o campo fica vazio e o registro permanece. Defina os dias de expiração no feed.",
          "src": {
            "title": "View RSS Feeds (biblioteca)",
            "url": __DOCS + "threat-intelligence-security-center/define-rss-feeds.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "oficial",
          "problem": "Feed \"Google Project Zero\" de base",
          "fix": "<em>Observação:</em> a tabela oficial lista esse feed apontando para um endpoint de mock (<code>rssmock.free.beeceptor.com</code>), e não para o blog do Google. <em>Sugestão:</em> confira a URL na sua instância e troque pelo feed oficial do Project Zero se for usar.",
          "src": {
            "title": "View RSS Feeds (integrações)",
            "url": __DOCS + "threat-intelligence-security-center/tisc-rss-feeds.html"
          },
          "added": "2026-11-08",
          "status": "observação"
        },
        {
          "added": "2026-11-08",
          "level": "servicenow",
          "status": "contorno",
          "date": "2026-02",
          "problem": "Feed RSS customizado roda sem erro, mas nenhum anexo aparece no Integration Process (<code>sn_sec_cmn_integration_process</code>)",
          "fix": "Uma propriedade da instância restringe as extensões de anexo permitidas, e a integração salvava a resposta sem extensão, então o anexo era bloqueado em silêncio. Contorno publicado: no Script Include <code>RSSFeedDatasourceIntegration</code>, acrescentar a extensão <code>.xml</code> ao nome passado para <code>saveResponseBodyAsAttachment</code>. <em>Sugestão:</em> alterar script de base cria skip em upgrade; documente a mudança.",
          "src": {
            "title": "TISC RSS Custom Feed: attachment not created (funcionária ServiceNow, fev/2026)",
            "url": "https://www.servicenow.com/community/secops-articles/tisc-rss-custom-feed-attachment-not-created-in-integration/ta-p/3498149"
          }
        },
        {
          "added": "2026-11-08",
          "level": "comunidade",
          "status": "resolvido",
          "date": "2024-10",
          "problem": "Feeds aparecem desativados e não há botão para editar",
          "fix": "Confira o escopo da sessão: com <strong>Threat Intelligence Support Common</strong> selecionado, o botão de editar aparece.",
          "src": {
            "title": "TISC MITRE Threat Intel Feeds - How to Enable? (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/tisc-mitre-threat-intel-feeds-how-to-enable/td-p/3019060"
          }
        }
      ],
      "docs": [
        {
          "title": "View RSS Feeds (configurações)",
          "url": __DOCS + "threat-intelligence-security-center/tisc-rss-feeds.html"
        },
        {
          "title": "View RSS Feeds (registros)",
          "url": __DOCS + "threat-intelligence-security-center/define-rss-feeds.html"
        },
        {
          "title": "Configure a new threat intelligence feed",
          "url": __DOCS + "threat-intelligence-security-center/tisc-new-data-source.html"
        }
      ],
      "module": "secops"
    },
    {
      "id": "checkmarx",
      "name": "Checkmarx One",
      "area": "Application VR",
      "what": "Importa resultados de scans do Checkmarx One (SAST, SCA, IaC e outros) como application vulnerable items (AVITs) na Application Vulnerability Response. O sync é só de ida.",
      "app": "Vulnerability Response Integration with Checkmarx One",
      "builtBy": "Documentação mantida pela Checkmarx (não está no docs da ServiceNow)",
      "compat": [
        "Exige Vulnerability Response instalado e ativo.",
        "Existe também uma integração separada para o Checkmarx SAST (legado), com documentação própria.",
        "Atualizações: reverta scripts customizados antes de subir de versão e confira a compatibilidade com a família da instância."
      ],
      "vendorSide": [
        "No Checkmarx One, crie um cliente OAuth2 (<strong>Client ID</strong> e <strong>Client Secret</strong>) com as permissões descritas em \"Preparing for the Checkmarx One Vulnerability Integration\".",
        "Tenha em mãos o <strong>Tenant</strong>, a <strong>IAM URL</strong> e a <strong>API Base URL</strong> (sem barra no final; em single-tenant, as duas são iguais)."
      ],
      "snSide": [
        "System Administrator para pedir e instalar o app e incluir usuários no grupo App-Sec Manager.",
        "App-Sec Manager (<code>sn_vul.app_sec_manager</code>) configura e acompanha as execuções."
      ],
      "setup": [
        {
          "title": "Pedir e instalar o app",
          "path": "ServiceNow Store &gt; Request App · depois System Applications &gt; Applications",
          "steps": [
            "Na Store, busque o app, selecione <strong>Request App</strong>, entre com a conta Now Support e selecione <strong>Get</strong>.",
            "Informe a instância, selecione <strong>Validate Instance</strong> e <strong>Request</strong>. Chega um e-mail com as instruções. Sub-prod e dev não precisam de entitlement.",
            "Na instância, em System Applications &gt; Applications, localize o app e selecione <strong>Install</strong>."
          ]
        },
        {
          "title": "Configurar",
          "path": "Busque \"Checkmarx One Vulnerability Integration\" &gt; Configuration",
          "steps": [
            "Preencha IAM URL, API Base URL, Tenant, Client ID e Client Secret.",
            "Escolha os scanners (SAST, SCA, IaC...), filtro de projetos, severidade, estado do resultado, tipo de scan, modo de sincronização e até 20 branches.",
            "Selecione <strong>Save and Test Credentials</strong>."
          ]
        }
      ],
      "validate": [
        "<strong>Save and Test Credentials</strong> confirma a conexão.",
        "Acompanhe as execuções da integração e confira se os AVITs aparecem vinculados às aplicações."
      ],
      "issues": [
        {
          "level": "fabricante",
          "problem": "Dados inconsistentes depois de trocar de tenant",
          "fix": "Use um único tenant Checkmarx One por instância de integração. Trocar de tenant não é suportado.",
          "src": {
            "title": "Configuring the Checkmarx One Vulnerability Integration",
            "url": "https://docs.checkmarx.com/en/34965-152367-configuring-the-checkmarx-one-vulnerability-integration.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "fabricante",
          "problem": "Não consigo mudar o modo de sincronização de scans",
          "fix": "Só é possível trocar quando a instância ainda não tem dados sincronizados.",
          "src": {
            "title": "Configuring the Checkmarx One Vulnerability Integration",
            "url": "https://docs.checkmarx.com/en/34965-152367-configuring-the-checkmarx-one-vulnerability-integration.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "fabricante",
          "problem": "Performance ruim nas execuções",
          "fix": "Ative \"Close AVITs of Obsolete Branches\" só uma vez: deixá-lo ligado em execuções seguintes pode causar problemas de performance. O filtro de projetos não mistura include com exclude. <em>Atenção:</em> a página de configuração ainda cita limite de 1000 projetos, mas o changelog da versão 1.0.35 (jan/2026) diz que o filtro passou a aceitar mais de 1000. Confira na sua versão.",
          "src": {
            "title": "Configuring the Checkmarx One Vulnerability Integration",
            "url": "https://docs.checkmarx.com/en/34965-152367-configuring-the-checkmarx-one-vulnerability-integration.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "level": "fabricante",
          "problem": "Triagem feita na ServiceNow não aparece no Checkmarx",
          "fix": "Por design: o sync é só de Checkmarx para ServiceNow.",
          "src": {
            "title": "Configuring the Checkmarx One Vulnerability Integration",
            "url": "https://docs.checkmarx.com/en/34965-152367-configuring-the-checkmarx-one-vulnerability-integration.html"
          },
          "added": "2026-11-08",
          "status": "resolvido"
        },
        {
          "added": "2026-11-08",
          "level": "fabricante",
          "status": "mudança",
          "date": "2026-05",
          "problem": "Findings SAST agregados ou com chave diferente depois da versão 1.0.36",
          "fix": "A 1.0.36 trouxe o Source AVIT ID Key configurável (padrão: similarityIdHash) e passou a agregar findings SAST com mesmo scan e chave. Há um processo de migração das findings existentes. O fabricante recomenda rodar a migração completa uma vez, em lotes, com apoio do CSM ou PS, e avisa que ela só considera scans obtidos depois da Start Date configurada.",
          "src": {
            "title": "Checkmarx One ServiceNow Plugin Change Log",
            "url": "https://docs.checkmarx.com/en/34965-183676-checkmarx-one-plugin-change-log.html"
          }
        }
      ],
      "docs": [
        {
          "title": "Checkmarx One Vulnerability Integration with ServiceNow (Checkmarx)",
          "url": "https://docs.checkmarx.com/en/34965-152364-checkmarx-one-vulnerability-integration-with-servicenow.html"
        },
        {
          "title": "Installing the integration (Checkmarx)",
          "url": "https://docs.checkmarx.com/en/34965-152366-installing-the-servicenow-vulnerability-response-integration-with-checkmarx-one.html"
        },
        {
          "title": "Configuring the integration (Checkmarx)",
          "url": "https://docs.checkmarx.com/en/34965-152367-configuring-the-checkmarx-one-vulnerability-integration.html"
        }
      ],
      "module": "secops"
    },
    {
      "id": "qualys",
      "module": "secops",
      "name": "Qualys",
      "area": "VR / USEM",
      "what": "Importa hosts, detecções e a base de conhecimento (KB) da Qualys Cloud Platform para a Vulnerability Response, criando VITs e third-party entries. Também alimenta Configuration Compliance.",
      "app": "Qualys Vulnerability Integration",
      "builtBy": "ServiceNow (assinatura separada)",
      "compat": [
        "Exige Vulnerability Response instalado e ativo (confira em Subscription Management &gt; Subscriptions).",
        "Os scanners Qualys vêm desativados por padrão: sem ativá-los, o botão Rescan não aparece.",
        "Suporta autenticação OAuth nas REST messages (página própria na doc)."
      ],
      "vendorSide": [
        "Credenciais da Qualys Cloud Platform com acesso à API.",
        "Saiba a URL da plataforma Qualys correta para a sua conta (há várias regiões)."
      ],
      "snSide": [
        "<code>admin</code> instala; <code>sn_vul.vulnerability_admin</code> configura no Setup Assistant.",
        "A doc pede usuários com <code>admin</code>, <code>sn_vuln.admin</code> e <code>sn_vul_qualys.admin</code>.",
        "Cada integração roda com o usuário <code>VR.System</code>: a doc diz para <strong>não</strong> trocar."
      ],
      "setup": [
        {
          "title": "Preparar antes do primeiro import",
          "steps": [
            "Valide o dimensionamento da instância para o volume de VITs esperado e use filtros para fazer o primeiro import em fases.",
            "Defina a data inicial do Host Detection para o começo do seu ciclo de scans (ex.: uma semana antes, se o ciclo leva uma semana).",
            "Desative calculadoras de vulnerabilidade que não usa e as business rules de notificação durante a carga inicial: elas pesam no desempenho."
          ]
        },
        {
          "title": "Instalar e configurar",
          "path": "All &gt; Vulnerability Response &gt; Administration &gt; Setup Assistant",
          "steps": [
            "Localize o card <strong>Qualys Vulnerability Integration</strong> e selecione <strong>Install</strong>.",
            "Vá em <strong>Integration Configuration &gt; Scanner Integrations</strong> e selecione <strong>Edit</strong> na integração Qualys.",
            "Em <strong>Account Credentials</strong>, informe as credenciais da Qualys Cloud Platform.",
            "Em Host Detection Configuration, decida se quer criar VITs para detecções Fixed e se usa Lookup By Network Partition.",
            "Ative os scanners Qualys (página \"Activate the Qualys scanners\") se for usar rescan."
          ]
        }
      ],
      "validate": [
        "Use o <strong>Qualys integration run status chart</strong> para acompanhar cada execução.",
        "Confira os data sources do Host Detection (registros de import) e o log de Outbound HTTP Requests para ver endpoint e códigos de resposta."
      ],
      "issues": [
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Anexos não aparecem nos data sources depois do import",
          "fix": "Restrição de IP: anexos só ficam visíveis a partir de um IP liberado. Inclua os usuários na lista segura antes do import. Cada import adiciona um anexo novo, o que pode gerar duplicados para limpar.",
          "src": {
            "title": "Resolving Qualys Vulnerability Integration issues",
            "url": __DOCS + "vulnerability-response/qualys-troubleshooting.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Falha com arquivos XML grandes",
          "fix": "Em System Properties &gt; Import Export &gt; Import Properties &gt; XML Format, aumente o valor (a doc sugere 250).",
          "src": {
            "title": "Resolving Qualys Vulnerability Integration issues",
            "url": __DOCS + "vulnerability-response/qualys-troubleshooting.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Qualys Knowledge Base Integration falha (payload grande demais)",
          "fix": "Em Qualys Vulnerability Integration &gt; Integration Instances &gt; Integration Instance Parameters, mude <code>max_delta_days</code> para 3. Se continuar, pule a execução do dia (Start time = hoje na Primary Integration Qualys Knowledge Base) e defina <code>kb_backfill_full_import</code> = true para o backfill atualizar os TPEs.",
          "src": {
            "title": "Resolving Qualys Vulnerability Integration issues",
            "url": __DOCS + "vulnerability-response/qualys-troubleshooting.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Volume enorme de vulnerabilidades de baixa severidade",
          "fix": "Na REST message <strong>Qualys Host Detection – Standard/post</strong>, adicione o parâmetro HTTP <code>severities</code> com o valor <code>3-5</code> (ou a faixa desejada).",
          "src": {
            "title": "Resolving Qualys Vulnerability Integration issues",
            "url": __DOCS + "vulnerability-response/qualys-troubleshooting.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Host Detection falha todo dia com \"Invalid XML response body received from Qualys\"",
          "fix": "KB oficial: KB2922891 (exige login). Pelo resumo público: inspecione o payload bruto primeiro; reduzir <code>truncation_limit</code> não corrige XML malformado gerado pela Qualys.",
          "src": {
            "title": "KB2922891 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2922891"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Integração falha com erro 409",
          "fix": "KB oficial: KB1579500 (exige login). Pelo resumo público, as causas são a mesma chave usada em vários ambientes, jobs rodando ao mesmo tempo ou limite de API. Não compartilhe a credencial entre instâncias e escalone os agendamentos.",
          "src": {
            "title": "KB1579500 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB1579500"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "resolvido",
          "problem": "Host Asset importa, mas Host Detection não",
          "fix": "O MID Server não processava o payload. Aumentar o parâmetro <code>mid.eccq.max_payload_size</code> do MID (no caso, para 50000000) resolveu.",
          "src": {
            "title": "ServiceNow - Qualys Integration, Host detection import failing (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/servicenow-qualys-integration-host-detection-import-failing/m-p/2339533"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "sem solução",
          "date": "2026-04",
          "problem": "Vulnerabilidade existe na Qualys mas não aparece na ServiceNow",
          "fix": "Sugestões na thread: verifique a qual CI o host (Discovered Item) foi associado e se outro host Qualys caiu no mesmo CI, porque o finding pode ter ido para o VIT existente. O autor também viu o ativo sumir do payload ao usar filtro <code>tag_set_include</code>. Sem solução confirmada.",
          "src": {
            "title": "Vulnerabilities present in Qualys but not showing in ServiceNow (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/vulnerabilities-present-in-qualys-but-not-showing-in-servicenow/td-p/3518110"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Preparing for the Qualys Vulnerability Integration",
          "url": __DOCS + "vulnerability-response/qualys-prerequisites.html"
        },
        {
          "title": "Install the Qualys Vulnerability Integration",
          "url": __DOCS + "vulnerability-response/install-and-configure-qualys.html"
        },
        {
          "title": "Configure using Setup Assistant",
          "url": __DOCS + "vulnerability-response/qualys-config-in-SA.html"
        },
        {
          "title": "Activate the Qualys scanners",
          "url": __DOCS + "vulnerability-response/activate-qualys-scanners.html"
        },
        {
          "title": "Resolving Qualys Vulnerability Integration issues",
          "url": __DOCS + "vulnerability-response/qualys-troubleshooting.html"
        },
        {
          "title": "Configure OAuth authentication for Qualys REST messages",
          "url": __DOCS + "vulnerability-response/configure-qualys-oauth-authentication.html"
        }
      ]
    },
    {
      "id": "rapid7",
      "module": "secops",
      "name": "Rapid7 InsightVM",
      "area": "VR / USEM",
      "what": "Importa ativos e vulnerabilidades do Rapid7 InsightVM (API REST na nuvem) ou do data warehouse do Rapid7 (PostgreSQL via MID Server) para a Vulnerability Response.",
      "app": "Rapid7 Vulnerability Integration",
      "builtBy": "ServiceNow",
      "compat": [
        "Dois tipos no mesmo app: <strong>InsightVM</strong> (REST, aceita várias instâncias) e <strong>data warehouse</strong> (exige MID Server e driver PostgreSQL, não aceita várias instâncias).",
        "Os scanners Rapid7 vêm desativados por padrão: sem ativá-los, não há Rescan."
      ],
      "vendorSide": [
        "InsightVM: <strong>região</strong> (URL do servidor) e <strong>API Key</strong> da conta Rapid7 Insight. A doc manda pedir os dois à Rapid7.",
        "Data warehouse: URL do servidor e credenciais de acesso ao banco."
      ],
      "snSide": [
        "<code>admin</code> instala; <code>sn_vul.vulnerability_admin</code> configura e confere os resultados."
      ],
      "setup": [
        {
          "title": "Configurar o tipo InsightVM",
          "path": "Rapid7 Vulnerability Integration &gt; Administration &gt; Configuration",
          "steps": [
            "Escolha o tipo de integração e a instância (a InsightVM padrão já vem selecionada).",
            "Na aba <strong>Integration Setup</strong>, informe InsightVM Region e API Key e selecione <strong>Test credentials</strong>. Depois, <strong>Save</strong>.",
            "Na aba <strong>Import Configuration</strong>, defina CVSS mínimo e máximo, filtro de sites (rode antes a Rapid7 Site Integration para preencher a lista), criação automática de CVE e reabertura por idade.",
            "Selecione <strong>Save</strong>."
          ]
        }
      ],
      "validate": [
        "Use o <strong>Rapid7 Vulnerability Integration run status chart</strong> e o dashboard de status dos imports."
      ],
      "issues": [
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Import do InsightVM fica parado em \"wait complete\" depois do transform",
          "fix": "KB oficial: KB0993998 (exige login). Pelo resumo público, a causa é um acúmulo de registros na fila <code>sn_vul_ds_import_q_entry</code>; o caminho é tratar essa fila e rodar o import de novo.",
          "src": {
            "title": "KB0993998 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0993998"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "\"Record Not Found\" ao configurar em instância com domain separation",
          "fix": "KB oficial para esse cenário: KB2469081 (exige login).",
          "src": {
            "title": "KB2469081 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2469081"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Job Comprehensive Vulnerable Item falha com \"Import job was canceled\"",
          "fix": "KB oficial: KB0960862 (exige login). Pelo resumo público, o processamento passa do timeout padrão de 60 minutos; reduzir o tamanho de página de ativos resolve.",
          "src": {
            "title": "KB0960862 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0960862"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "contorno",
          "problem": "Ativos efêmeros (ex.: VDI) criando CIs sem correspondência",
          "fix": "Em vez de editar o script include de base, ajuste o filtro de import da API do Rapid7. Exemplo citado: <code>{\"asset\":\"total_vulnerabilities != 0 &amp;&amp; tags STARTS WITH 'CROWN_JEWEL'\"}</code>.",
          "src": {
            "title": "Rapid7 InsightVM asset import (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/rapid7-insightvm-asset-import/td-p/3560071"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Preparing for the Rapid7 Vulnerability Integration",
          "url": __DOCS + "vulnerability-response/r7-prerequisites.html"
        },
        {
          "title": "Set up for the Rapid7 InsightVM Integration",
          "url": __DOCS + "vulnerability-response/r7-setup-ivm.html"
        },
        {
          "title": "Install the Rapid7 Vulnerability Integration",
          "url": __DOCS + "vulnerability-response/install-and-configure-r7.html"
        },
        {
          "title": "Configure the Rapid7 Vulnerability Integration",
          "url": __DOCS + "vulnerability-response/r7-config.html"
        },
        {
          "title": "Set additional filter parameters for InsightVM imports",
          "url": __DOCS + "vulnerability-response/r7-add-filters.html"
        }
      ]
    },
    {
      "id": "mstvm",
      "module": "secops",
      "name": "Microsoft Defender Vulnerability Management (TVM)",
      "area": "VR / USEM",
      "what": "Traz máquinas, vulnerabilidades e recomendações de segurança do Microsoft Defender (Threat and Vulnerability Management) e achados do Defender for Cloud para a Vulnerability Response/USEM.",
      "app": "Microsoft Defender Integration for Security Exposure Management",
      "builtBy": "ServiceNow",
      "compat": [
        "Substitui o app antigo Vulnerability Response Integration with Microsoft TVM. Há uma página oficial de migração.",
        "Suporta nuvem comercial por padrão. GCC High, DoD e outras exigem a configuração do KB3141167."
      ],
      "vendorSide": [
        "No Microsoft Entra ID (Azure AD), registre um app single tenant e anote <strong>Application (client) ID</strong> e <strong>Directory (tenant) ID</strong>.",
        "Em API permissions &gt; APIs my organization uses &gt; <strong>WindowsDefenderATP</strong>, adicione permissões como <code>Machine.Read.All</code> e <code>Machine.ReadWrite.All</code> e dê leitura de máquinas, vulnerabilidades e recomendações. Depois, <strong>Grant Admin Consent</strong>.",
        "Em Certificates &amp; Secrets, crie um <strong>Client secret</strong> e guarde o valor: ele não aparece de novo."
      ],
      "snSide": [
        "<code>admin</code> ativa o app; <code>sn_vul.vulnerability_admin</code> ou <code>sn_vul.access_setup_assistant</code> configura no Setup Assistant."
      ],
      "setup": [
        {
          "title": "Instalar e configurar",
          "path": "All &gt; Vulnerability Response &gt; Administration &gt; Setup Assistant &gt; Integration application Installation",
          "steps": [
            "Localize o card <strong>Microsoft Defender Integration for Security Exposure Management</strong> e selecione <strong>Install</strong>.",
            "Siga os prompts do Setup Assistant e informe Client ID, Tenant ID e Client Secret.",
            "Configure à parte as integrações do Defender for Cloud, que têm passos próprios."
          ]
        }
      ],
      "validate": [
        "Confira as execuções das integrações MS TVM (máquinas e vulnerabilidades) e os VITs criados."
      ],
      "issues": [
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Delta Import de Machine Vulnerabilities falha por \"Rate Limit Exceeded\" (429)",
          "fix": "KB oficial: KB2491031 (exige login). Pelo resumo público, o limite é da Microsoft (cerca de 30 chamadas por minuto por tenant e app). Escalone os agendamentos para não estourar a cota.",
          "src": {
            "title": "KB2491031 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2491031"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "resolvido",
          "problem": "Import falha com erro 400 ao usar filtro de máquinas",
          "fix": "O <code>machine_filter</code> precisa estar em sintaxe OData v4, por exemplo no formato <code>machineTags/any(...)</code>.",
          "src": {
            "title": "Microsoft Threat and Vulnerability Integration (Community)",
            "url": "https://www.servicenow.com/community/secops-vr-forum-read-only/microsoft-threat-and-vulnerability-integration-with/m-p/2413815"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "sem solução",
          "problem": "Execuções em fila do delta import falham com \"invalid response code\" 0 (só uma processa)",
          "fix": "Relato sem resposta na Community. <em>Sugestão:</em> confira se as execuções não estão rodando ao mesmo tempo e batendo no limite de chamadas.",
          "src": {
            "title": "Microsoft TVM Machine Vulnerabilities Integration error (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/microsoft-tvm-machine-vulnerabilities-integration-error/m-p/3530355"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Microsoft Defender Integration for Security Exposure Management",
          "url": __DOCS + "vulnerability-response/ms-defender-sem.html"
        },
        {
          "title": "Set up Microsoft Azure for the MS TVM integration",
          "url": __DOCS + "vulnerability-response/mstvm-azure-account.html"
        },
        {
          "title": "Install and configure MS TVM integrations",
          "url": __DOCS + "vulnerability-response/mstvm-install-and-configure.html"
        },
        {
          "title": "Migrate to the Microsoft Defender Integration for SEM",
          "url": __DOCS + "vulnerability-response/mstvm-migrate.html"
        },
        {
          "title": "Configure Defender for Cloud integrations",
          "url": __DOCS + "vulnerability-response/cc_asc_install_configure.html"
        }
      ]
    },
    {
      "id": "crowdstrike",
      "module": "secops",
      "name": "CrowdStrike Falcon Insight",
      "area": "SIR",
      "what": "Liga o SIR ao EDR da CrowdStrike: busca de sightings, isolamento e liberação de hosts, criação de indicadores e listas de bloqueio/permissão, com aprovação opcional.",
      "app": "CrowdStrike Falcon Insight for Security Operations",
      "builtBy": "ServiceNow",
      "compat": [
        "Exige IntegrationHub Enterprise Pack Installer (<code>com.glide.hub.integrations.enterprise</code>) e o plugin Security Incident Response (<code>com.snc.security_incident</code>).",
        "Instale, um por vez e nesta ordem: Security Incident Response Dependency, Security Integration Framework, Security Support Common, Security Support Orchestration, Threat Intelligence Support Common, Trusted Security Circles, Security Operations Setup Assistant e Security Incident Response.",
        "Uma capability só pode estar em um perfil. Perfis com a mesma capability precisam de servidores CrowdStrike diferentes."
      ],
      "vendorSide": [
        "No Falcon, em <strong>API Clients and Keys</strong>, crie um cliente OAuth2 (Add new API client).",
        "Escopos: <strong>Hosts</strong> leitura e escrita; <strong>Indicators</strong> leitura. Guarde Client ID e Secret."
      ],
      "snSide": [
        "<code>admin</code> instala e atribui <code>sn_si.admin</code>.",
        "<code>sn_si.admin</code> configura, cria e ativa perfis.",
        "<code>sn_si.analyst</code> dispara perfis e pede isolamento de host (com aprovação, se configurada)."
      ],
      "setup": [
        {
          "title": "Instalar e conectar",
          "path": "Security Operations &gt; Integrations &gt; Integration Configurations",
          "steps": [
            "Instale o app da Store.",
            "No tile <strong>CrowdStrike Falcon Insight for Security Operations</strong>, selecione <strong>Configure</strong>.",
            "Preencha Name, <strong>API URL</strong> (com HTTPS, ex.: https://api.crowdstrike.com), Client ID e Client Secret, e selecione <strong>Submit</strong>.",
            "Opcional: crie um grupo de aprovação para isolar e restaurar hosts e para sighting search.",
            "Crie o perfil, configure-o e defina as condições de disparo."
          ]
        }
      ],
      "validate": [
        "O módulo CrowdStrike Falcon Insight aparece no navegador da aplicação depois do Submit válido.",
        "Use \"Verify trigger conditions\" e dispare um perfil manualmente a partir de um security incident de teste."
      ],
      "issues": [
        {
          "level": "comunidade",
          "status": "sem solução",
          "problem": "Integração desativada quase todo dia por limite de API da CrowdStrike",
          "fix": "Segundo a CrowdStrike, muitos clientes ServiceNow compartilham o mesmo endpoint e estouram o limite. Ela sugeriu rotear as chamadas por um MID Server; o autor relatou que isso não cobria as chamadas de detecção, incidente e comportamento.",
          "src": {
            "title": "CrowdStrike Falcon Endpoint for Security Incident - API Rate Limit (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/crowdstrike-falcon-endpoint-for-security-incident-api-rate-limit/m-p/2906121"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Isolamento de host não executa",
          "fix": "Confira se a aprovação está habilitada no perfil e se o pedido foi aprovado pelo grupo, se o escopo Hosts está com escrita no cliente da API e se o host casa com um CI no incidente.",
          "src": {
            "title": "Getting started with the CrowdStrike Falcon Insight integration",
            "url": __DOCS + "security-incident-response/get-started-with-the-crowdstrike-falcon-insight-integration.html"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Getting started (checklist)",
          "url": __DOCS + "security-incident-response/get-started-with-the-crowdstrike-falcon-insight-integration.html"
        },
        {
          "title": "Generate client ID and secret key",
          "url": __DOCS + "security-incident-response/create-api-clients-and-keys.html"
        },
        {
          "title": "Install and configure",
          "url": __DOCS + "security-incident-response/install-and-configure-crowdstrike-falcon-insight.html"
        },
        {
          "title": "Create profile",
          "url": __DOCS + "security-incident-response/create-a-capability-profile-for-the-crowdstrike-falcon-insight-integration.html"
        },
        {
          "title": "Set trigger condition",
          "url": __DOCS + "security-incident-response/define-trigger-conditions.html"
        }
      ]
    },
    {
      "id": "splunk",
      "module": "secops",
      "name": "Splunk Enterprise Security",
      "area": "SIR",
      "what": "Ingere notable events do Splunk ES como security incidents no SIR (pull por perfil) e permite encaminhar eventos manualmente do console do Splunk via add-on.",
      "app": "Splunk Enterprise Security Notable Event Ingestion integration for Security Operations",
      "builtBy": "ServiceNow",
      "compat": [
        "Há apps diferentes com nomes parecidos (ES Integration, Enterprise Event Ingestion, ES Event Ingestion). Confirme qual está instalado antes de seguir um tutorial.",
        "Autenticação por token disponível a partir da versão 12.0.0.",
        "O encaminhamento manual exige o add-on \"ServiceNow Security Operations Event Ingestion Add-on for Splunk ES\" (Splunkbase 4770)."
      ],
      "vendorSide": [
        "Usuário de API no Splunk ES com o papel Security Analyst (<code>ess_analyst</code>).",
        "URL da API com a porta (ex.: https://servidor:8089) e usuário/senha ou token.",
        "Splunk on-premises: MID Server."
      ],
      "snSide": [
        "<code>admin</code> prepara a instância.",
        "<code>sn_si.ingestion_profile_admin</code> (ou <code>sn_si.admin</code>) e <code>sn_si.analyst</code>.",
        "Para encaminhamento manual: <code>sn_sec_splunkes.api_account_access</code> para o usuário que o Splunk usa."
      ],
      "setup": [
        {
          "title": "Conectar o Splunk ES",
          "path": "All &gt; Security Operations &gt; Integrations &gt; Integration Configurations",
          "steps": [
            "Instale o app da Store.",
            "No tile <strong>Splunk Enterprise Security- Event Ingestion</strong>, selecione <strong>Configure</strong>.",
            "Preencha Name (sem parênteses), Splunk API Base URL com a porta, autenticação (Basic ou Token), On Premises Deployment e MID Server, se for o caso.",
            "Crie um event profile com filtros e agregação. Para encaminhar sob demanda, crie um perfil Manual e instale o add-on no Splunk (até dois destinos: primário e secundário)."
          ]
        }
      ],
      "validate": [
        "Confira a tabela de import de eventos do Splunk e as tasks que ligam cada evento ao SIR criado.",
        "Siga o checklist oficial da integração na ordem em que aparece."
      ],
      "issues": [
        {
          "level": "comunidade",
          "status": "resolvido",
          "date": "2024-08",
          "problem": "Só parte dos notables vira security incident (ex.: 950 de 1.900)",
          "fix": "Há um limite padrão de 1.000 incidentes por dia, ajustável nas configurações da integração Splunk. Os registros pulados aparecem com a nota \"Row transform ignored by onBefore script\".",
          "src": {
            "title": "Why all the notables created in Splunk are not created as security incidents (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/why-all-the-notables-created-in-splunk-are-not-created-as/m-p/3018436"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Notables existem no Splunk mas nunca chegam à tabela de import",
          "fix": "KB oficial: KB0862536 (exige login). Pelo resumo público, a causa é atraso de indexação no Splunk, e a correção é atualizar o plugin \"Splunk ES Integration for Security Operations\" para 10.4.0 ou superior, que refaz a busca dos notables perdidos.",
          "src": {
            "title": "KB0862536 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0862536"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "contorno",
          "problem": "Timeout ao buscar notables via MID Server",
          "fix": "O timeout padrão do MID é de 30 segundos e a API do Splunk demorava mais. O autor ajustou uma propriedade do sistema. <em>Atenção:</em> mexer nesse timeout afeta todas as integrações.",
          "src": {
            "title": "Why all the notables created in Splunk are not created as security incidents (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/why-all-the-notables-created-in-splunk-are-not-created-as/m-p/3018553"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Add-on do Splunk não cria o security incident ou evento",
          "fix": "KB oficial: KB0719205 (exige login). Pelo resumo público, as workflow actions do add-on estavam mal configuradas; ajustar \"Run in app\" e \"Open in view\" para search resolve.",
          "src": {
            "title": "KB0719205 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0719205"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Splunk Enterprise Security event ingestion (visão geral)",
          "url": __DOCS + "security-incident-response/splunk-event-ingest-overview-security.html"
        },
        {
          "title": "Checklist da integração",
          "url": __DOCS + "security-incident-response/splunk-event-ingest-checklist-security.html"
        },
        {
          "title": "Install and configure",
          "url": __DOCS + "security-incident-response/splunk-event-ingest-install-and-configure-security.html"
        },
        {
          "title": "Create an event profile",
          "url": __DOCS + "security-incident-response/splunk-event-ingest-create-profile-security.html"
        },
        {
          "title": "Set up Splunk environment (add-on)",
          "url": __DOCS + "security-incident-response/splunk-es-addon.html"
        }
      ]
    },
    {
      "id": "qradar",
      "module": "secops",
      "name": "IBM QRadar",
      "area": "SIR",
      "what": "Ingere offenses do IBM QRadar como security incidents no SIR, com atualização e fechamento automáticos conforme o status do incidente.",
      "app": "IBM QRadar Offense Ingestion for Security Operations",
      "builtBy": "ServiceNow",
      "compat": [
        "API do QRadar versão 10 ou superior.",
        "On-premises: MID Server com uma MID Server Application. Use o <strong>nome da aplicação</strong>, e não o do MID, no tile."
      ],
      "vendorSide": [
        "<strong>Authorized service token</strong> (on-premises) com, no mínimo, os papéis Offenses, Log Activity e Network Activity e um security profile sem restrições. É gerado em Admin &gt; Authorized Services.",
        "URL da API com a porta (443 pode ser omitida) e URL do console, sem o <code>.jsp</code>."
      ],
      "snSide": [
        "<code>sn_si.admin</code> configura; <code>sn_si.analyst</code> acompanha as execuções."
      ],
      "setup": [
        {
          "title": "Configurar o tile e o perfil",
          "path": "Integrations &gt; Integrations Configurations &gt; IBM QRadar",
          "steps": [
            "Instale o app da Store.",
            "No tile IBM QRadar, selecione <strong>New</strong> (ou Configure, se já existir).",
            "Preencha Name (sem parênteses), API Base URL, Dashboard URL, versão da API e o token.",
            "Crie o perfil e selecione as regras. Em Additional Options, <strong>clique em Finish</strong>: só assim o perfil passa para o estado Waiting e começa a ingerir."
          ]
        }
      ],
      "validate": [
        "Cada execução agendada gera um integration run com logs, erros e a contagem de offenses e incidentes. Analistas podem consultar a tabela <code>sn_event_ingestion_integration_run</code>.",
        "Para validar, confira o estado do perfil, a data do último pull, a tabela de import de offenses e a de offense para task."
      ],
      "issues": [
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Perfil configurado, mas nada é ingerido",
          "fix": "Em Additional Options, é preciso clicar em <strong>Finish</strong> para o perfil ir para o estado Waiting.",
          "src": {
            "title": "Troubleshooting IBM QRadar offense ingestion integration",
            "url": __DOCS + "security-incident-response/ibm-qradar-trouble.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Erro de SSL ao conectar no QRadar em nuvem",
          "fix": "A instância QRadar precisa de certificado válido, de CA e não expirado, e o common name deve bater com o hostname. Importe certificados na plataforma se necessário.",
          "src": {
            "title": "Troubleshooting IBM QRadar offense ingestion integration",
            "url": __DOCS + "security-incident-response/ibm-qradar-trouble.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "\"ExecutionTimeoutException ... timeout of 30000 MILLISECONDS\" ao testar a configuração",
          "fix": "KB oficial: KB0860451 (exige login). Pelo resumo público, o passo de validação de credencial tem timeout padrão de 30 segundos; aumente o timeout na chamada ou a propriedade <code>com.glide.hub.flow_api.default_execution_time</code>.",
          "src": {
            "title": "KB0860451 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0860451"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Só aparecem regras criadas a partir de eventos",
          "fix": "KB oficial: KB0855742 (exige login). Pelo resumo público, é permissão do token: gere-o com papel Admin e security profile Admin, com validade longa.",
          "src": {
            "title": "KB0855742 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0855742"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "sem solução",
          "problem": "Várias instâncias QRadar com o mesmo offense ID: só o primeiro vira SIR",
          "fix": "O transform é ignorado para IDs repetidos entre integrações. A thread não traz solução.",
          "src": {
            "title": "Multiple QRadar Offense Ingestion Integrations - offense ID (Community)",
            "url": "https://www.servicenow.com/community/developer-forum/multiple-qradar-offense-ingestion-integrations-offense-id/m-p/2633971"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "IBM QRadar Offense Ingestion Integration",
          "url": __DOCS + "security-incident-response/qradar-ibm.html"
        },
        {
          "title": "Install and configure",
          "url": __DOCS + "security-incident-response/qradar-ibm-install-configure.html"
        },
        {
          "title": "Setup IBM QRadar profile",
          "url": __DOCS + "security-incident-response/qradar-ibm-create-profile.html"
        },
        {
          "title": "Troubleshoot",
          "url": __DOCS + "security-incident-response/ibm-qradar-trouble.html"
        }
      ]
    },
    {
      "id": "virustotal",
      "module": "secops",
      "name": "VirusTotal",
      "area": "SIR / Threat Intelligence",
      "what": "Faz threat lookup de observables (arquivos, URLs, IPs) no VirusTotal a partir do Threat Intelligence e dos security incidents. Usa a API v3.",
      "app": "VirusTotal integration",
      "builtBy": "ServiceNow",
      "compat": [
        "Exige o Threat Intelligence instalado e ativo.",
        "VT Private Scanning só funciona se a licença VirusTotal tiver esse recurso."
      ],
      "vendorSide": [
        "API Key do seu perfil VirusTotal. O plano gratuito é bem limitado para produção."
      ],
      "snSide": [
        "<code>admin</code> instala e configura."
      ],
      "setup": [
        {
          "title": "Configurar",
          "path": "Security Operations &gt; Integration Configuration",
          "steps": [
            "Instale o app da Store.",
            "No card <strong>VirusTotal</strong>, selecione <strong>Configure</strong>.",
            "Informe Name e API Key. Opcional: <strong>Enable VT Private Scanning</strong> e <strong>Send URL as SHA-256 Hash</strong> (sem essa opção, a URL vai em Base64).",
            "Selecione <strong>Submit</strong>."
          ]
        }
      ],
      "validate": [
        "VirusTotal passa a aparecer como fonte de lookup em observables do Threat Intelligence e dos incidentes.",
        "Quando encontra malware, cria um observable. Em lookups de IP, cria observables para as URLs que compartilham o IP."
      ],
      "issues": [
        {
          "level": "oficial",
          "status": "limitação",
          "problem": "Resultados de lookup aparecem em vários security incidents",
          "fix": "Known Error KB0749422: é esperado, porque observables são compartilhados entre incidentes e o lookup atualiza todos que usam aquele observable. Um lookup refeito pode mudar o score do incidente.",
          "src": {
            "title": "KB0749422 (Known Error)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0749422"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "resolvido",
          "problem": "\"No configured capability implementations\" ao rodar Threat Lookup",
          "fix": "A capability existe, mas nenhuma implementação está configurada. Instale o app VirusTotal e informe uma API Key.",
          "src": {
            "title": "Virus Total configuration issue (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/virus-total-configuration-issue/td-p/2640940"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "limitação",
          "problem": "Muitos falsos positivos de \"malicious\"",
          "fix": "Pelo relato, o script v3 marca como malicioso se qualquer engine reportar. Não há configuração nativa de número mínimo de engines.",
          "src": {
            "title": "SIR - VirusTotal Integration - Determination of malicious (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/sir-virustotal-integration-determination-of-malicious/m-p/1313874"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "limitação",
          "problem": "Observable criado manualmente não dispara lookup",
          "fix": "O lookup automático só roda quando o observable é vinculado a um security incident. Para os outros, peça o Threat Lookup manualmente no registro do observable. Rescan de IP não existe no módulo.",
          "src": {
            "title": "How is the threat lookup getting created? (Community)",
            "url": "https://www.servicenow.com/community/secops-forum/how-is-the-threat-lookup-getting-created-i-have-integrated-with/m-p/1320740"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "VirusTotal integration setup",
          "url": __DOCS + "virustotal-setup.html"
        },
        {
          "title": "Activate and configure the VirusTotal integration",
          "url": __DOCS + "activate-configure-virustotal.html"
        },
        {
          "title": "Threat Lookup - VirusTotal workflow",
          "url": __DOCS + "threat-lookup-virustotal-wf.html"
        }
      ]
    },
    {
      "id": "bitsight",
      "module": "irm",
      "name": "BitSight",
      "area": "IRM · TPRM",
      "what": "Traz o Security Rating da BitSight, as notas por risk vector e 12 meses de histórico para os fornecedores no Third-party Risk Management. Também cria Vendor Risk Issues a partir de alertas e sincroniza tiers com a BitSight.",
      "app": "Bitsight for Third-party Risk Management (Store) · Risk Intelligence Providers do TPRM",
      "builtBy": "BitSight (integração de parceiro certificada pela ServiceNow; documentação mantida pela BitSight)",
      "compat": [
        "A doc oficial do TPRM lista a BitSight entre as integrações de risk intelligence <strong>suportadas por parceiros</strong>, com o app na ServiceNow Store.",
        "Exige uma versão suportada da ServiceNow e a solução Bitsight for Third-party Risk Management contratada.",
        "Existe outro app de TPRM com dados BitSight, da Verterim, que grava na tabela \"Security Scores\" e dispara assessments por \"Score Based Submission Rules\". Confirme qual dos dois está instalado antes de seguir um tutorial.",
        "Também há apps BitSight separados para ITSM e para Security Incident Response, que não são este."
      ],
      "vendorSide": [
        "Gere ou recupere o <strong>API token</strong> na plataforma BitSight.",
        "Os alertas que viram Vendor Risk Issues seguem a <strong>configuração de alertas da BitSight associada a esse token</strong>, feita na própria BitSight.",
        "Para evitar fornecedores duplicados, deixe o nome da empresa na BitSight idêntico ao do registro de vendor na ServiceNow."
      ],
      "snSide": [
        "Um papel de administrador do app BitSight atribuído ao usuário que vai configurar.",
        "<code>admin</code> para definir os agendamentos dos imports.",
        "No framework nativo de risk intelligence do TPRM: <code>sn_vdr_risk_asmt.vendor_assessment_reviewer</code>."
      ],
      "setup": [
        {
          "title": "Instalar e configurar o app BitSight",
          "path": "Bitsight &gt; Application Configuration",
          "steps": [
            "Instale o app da ServiceNow Store e atribua o papel de admin do BitSight a um usuário.",
            "Em <strong>Application Configuration</strong>, cole o token no campo <strong>REST API Token</strong>.",
            "Decida: <strong>Insert Bitsight companies that do not match existing company records</strong> (desligado por padrão) e <strong>Mark all imported companies as Vendors</strong>.",
            "Configure os issues: <strong>Create Vendor Risk Issue on Score Change</strong> com o <strong>Score Drop Trigger Delta</strong>, issues para alertas <strong>Critical</strong> e <strong>Warning</strong> e a idade máxima do alerta (padrão: 7 dias).",
            "Opcional: selecione <strong>Push Tier Data</strong> para sincronizar os tiers e ativar o Tier Recommender, que pode ser desligado na mesma página."
          ]
        },
        {
          "title": "Agendar e rodar os imports",
          "path": "Bitsight &gt; Data Import Job Schedules",
          "steps": [
            "Abra <strong>Bitsight Portfolio Import</strong> e defina frequência e horário. A BitSight recomenda execução diária, porque os dados mudam todo dia. A primeira execução grava os fornecedores em <code>core_company</code>.",
            "Abra <strong>Bitsight Alerts Import</strong> e agende para 5 minutos depois do portfolio, para que todos os vendors existam antes dos alertas.",
            "Para testar fora do agendamento, rode como admin os dois imports na ordem listada no módulo: portfolio primeiro e alertas depois.",
            "Para ver o rating no registro do fornecedor, adicione o campo <strong>Bitsight Security Ratings</strong> via Configure &gt; Form Design. Garanta Bitsight Company Name, Bitsight Security Rating e Bitsight Rating Date preenchidos."
          ]
        },
        {
          "title": "Framework nativo do TPRM (normalização e regras)",
          "path": "All &gt; Third-party Risk Management &gt; Risk Intelligence Provider Setup",
          "steps": [
            "Em <strong>Providers</strong>, registre a BitSight (marque <strong>Order reports</strong> se for pedir relatórios por esse caminho).",
            "Em <strong>Provider Services</strong>, defina os serviços e o mapeamento da nota da BitSight para o rating do TPRM. Provedor multi-factor exige primeiro um serviço com Score type = <strong>Overall Score</strong>.",
            "Em <strong>Assessment Submission Rules &gt; Provider-based Submission</strong>, crie regras que disparam assessment, issue, task ou e-mail quando a nota normalizada muda (por percentual, score ou rating)."
          ]
        }
      ],
      "validate": [
        "Os fornecedores do portfolio aparecem em <code>core_company</code> com o GUID da BitSight preenchido na aba <strong>Bitsight Portfolio Information</strong>.",
        "O card da BitSight aparece na aba de risk intelligence scores do terceiro, com o valor \"Overall\" normalizado.",
        "Um alerta Critical ou Warning recente (dentro da janela de dias) gera um Vendor Risk Issue, se a opção estiver marcada."
      ],
      "issues": [
        {
          "level": "fabricante",
          "status": "resolvido",
          "problem": "Fornecedores duplicados ou casados com a empresa errada no import",
          "fix": "O import casa primeiro pelo GUID da BitSight e, sem GUID, por nome ou domínio. Com nomes diferentes e sem GUID, um vendor novo pode ser criado se \"Insert Bitsight companies that do not match...\" estiver ligado (vem desligado). Deixe o nome idêntico nas duas pontas. Se casou errado, corrija o GUID na aba <strong>Bitsight Portfolio Information</strong> do vendor.",
          "src": {
            "title": "Importing Your Portfolio and Alerts (BitSight)",
            "url": "https://help.bitsighttech.com/hc/en-us/articles/4411466539671-Bitsight-for-ServiceNow-Vendor-Risk-Management-Importing-Your-Portfolio-and-Alerts"
          },
          "added": "2026-11-08"
        },
        {
          "level": "fabricante",
          "status": "resolvido",
          "problem": "Alertas importados sem vincular ao fornecedor",
          "fix": "O import de alertas rodou antes de o portfolio terminar. Agende o Alerts Import 5 minutos depois do Portfolio Import e, nos testes manuais, siga a ordem do módulo Data Import Job Schedules.",
          "src": {
            "title": "Importing Your Portfolio and Alerts (BitSight)",
            "url": "https://help.bitsighttech.com/hc/en-us/articles/4411466539671-Bitsight-for-ServiceNow-Vendor-Risk-Management-Importing-Your-Portfolio-and-Alerts"
          },
          "added": "2026-11-08"
        },
        {
          "level": "fabricante",
          "status": "resolvido",
          "problem": "Nenhum Vendor Risk Issue é criado a partir dos alertas",
          "fix": "Confira três coisas: as opções \"Create Vendor Risk Issue...\" marcadas na Application Configuration; se o alerta está dentro da idade máxima (padrão 7 dias); e se a configuração de alertas na BitSight está associada ao <strong>mesmo token</strong> usado pela integração.",
          "src": {
            "title": "Setting Up Alerts (BitSight)",
            "url": "https://help.bitsighttech.com/hc/en-us/articles/4411468703511-Bitsight-for-ServiceNow-Third-party-Risk-Management-Setting-Up-Alerts"
          },
          "added": "2026-11-08"
        },
        {
          "level": "fabricante",
          "status": "resolvido",
          "problem": "O rating não aparece no formulário do fornecedor",
          "fix": "O campo não vem no layout padrão. Adicione <strong>Bitsight Security Ratings</strong> pelo Form Design do vendor.",
          "src": {
            "title": "Adding Bitsight data (BitSight)",
            "url": "https://help.bitsighttech.com/hc/en-us/articles/4411466192663-Bitsight-for-ServiceNow-Vendor-Risk-Management-Adding-Bitsight-Data"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Rating normalizado do TPRM não bate com a nota da BitSight",
          "fix": "A conversão usa o mapeamento definido no <strong>Provider Service</strong>. Revise o mapeamento e, para provedor multi-factor, confirme que o serviço Overall Score existe.",
          "src": {
            "title": "Set up a risk intelligence provider service",
            "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/third-party-risk-management/tprm-riskintelprvdr-set-up.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "BitSight não aparece para pedidos de risk intelligence report",
          "fix": "A opção <strong>Order reports</strong> precisa estar marcada no registro do provedor.",
          "src": {
            "title": "Register a risk intelligence provider",
            "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/third-party-risk-management/tprm-riskintelprvdr-register.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "observação",
          "problem": "Usando BitSight também na Vulnerability Response: dados duplicados com outro scanner (ex.: Qualys)?",
          "fix": "KB oficial sobre essa dúvida: KB3071735 (exige login). Pelo resumo público, a unicidade dos Vulnerable Items inclui a integration_instance, o que pode gerar registros duplicados entre fontes. Só se aplica se a BitSight também alimenta a VR.",
          "src": {
            "title": "KB3071735 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB3071735"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Bitsight for TPRM by ServiceNow: Integration Guide (BitSight)",
          "url": "https://help.bitsighttech.com/hc/en-us/articles/360026447914-Bitsight-for-Third-party-Risk-Management-by-ServiceNow-Integration-Guide"
        },
        {
          "title": "Importing Your Portfolio and Alerts (BitSight)",
          "url": "https://help.bitsighttech.com/hc/en-us/articles/4411466539671-Bitsight-for-ServiceNow-Vendor-Risk-Management-Importing-Your-Portfolio-and-Alerts"
        },
        {
          "title": "Setting Up Alerts (BitSight)",
          "url": "https://help.bitsighttech.com/hc/en-us/articles/4411468703511-Bitsight-for-ServiceNow-Third-party-Risk-Management-Setting-Up-Alerts"
        },
        {
          "title": "Continuous Monitoring for TPRM workflows (BitSight)",
          "url": "https://help.bitsighttech.com/hc/en-us/articles/360046482694-Bitsight-Continuous-Monitoring-for-Third-party-Risk-Management-TPRM-workflows-in-ServiceNow"
        },
        {
          "title": "TPRM: Integrating scores from risk intelligence providers (ServiceNow)",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/third-party-risk-management/tprm-riskintelprvdr-overview.html"
        },
        {
          "title": "TPRM: Automate actions upon risk intelligence updates (ServiceNow)",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/third-party-risk-management/tprm-riskintelprvdr-submissrule.html"
        }
      ]
    },
    {
      "id": "ucf",
      "module": "irm",
      "name": "UCF Common Controls Hub",
      "area": "IRM · Policy & Compliance",
      "what": "Baixa conteúdo do Unified Compliance Framework (Network Frontiers) para usar como authority documents, citations, controls e control objectives no Policy and Compliance, com atualização em intervalos definidos.",
      "app": "GRC: UCF (Unified Compliance Integration)",
      "builtBy": "ServiceNow",
      "compat": [
        "Exige o GRC configurado.",
        "Com domain separation, apague a configuração global padrão e crie uma específica do domínio.",
        "Para usar várias shared lists, a propriedade <code>sn_comp_ucf.deactivate_deprecated_docs</code> (true por padrão) precisa ser false."
      ],
      "vendorSide": [
        "Conta no UCF Common Controls Hub com acesso à API e shared lists criadas.",
        "Duas formas de autenticar: <strong>OAuth</strong> (Client ID, Secret e Redirect URL fornecidos pelo suporte da ServiceNow via caso) ou <strong>API Key</strong> (assinatura básica, chave tirada do API Key Manager do UCF).",
        "Quem autoriza precisa ser administrador do Common Controls Hub."
      ],
      "snSide": [
        "OAuth: <code>sn_comp_ucf.admin</code> e <code>oauth_admin</code>. Dê ao administrador UCF o papel de OAuth admin.",
        "API Key: <code>admin</code>."
      ],
      "setup": [
        {
          "title": "Configurar com OAuth (Common Controls Hub)",
          "path": "All &gt; Policy and Compliance &gt; Administration &gt; Unified Compliance Integration",
          "steps": [
            "Abra a configuração UCF e escolha Authentication type = <strong>Oauth</strong>.",
            "Preencha Client ID, Client Secret, OAuth2 profile (o padrão normalmente serve) e Redirect URL, e salve.",
            "No diálogo UCF Integration, selecione <strong>Request New Token</strong>, entre com as credenciais do Common Controls Hub e selecione <strong>Authorize</strong>.",
            "Escolha a shared list e selecione <strong>Save Configuration</strong>."
          ]
        },
        {
          "title": "Configurar com API Key",
          "path": "All &gt; Policy and Compliance &gt; Administration &gt; Unified Compliance Integration",
          "steps": [
            "Abra a configuração UCF, escolha a shared list e Authentication type = <strong>API Key</strong>.",
            "Cole a chave e selecione <strong>Save Configuration</strong>."
          ]
        }
      ],
      "validate": [
        "Confira se authority documents, citations e controls chegaram. Os staging tables (<code>sn_comp_ucf_authority_document</code>, <code>sn_comp_ucf_citation</code>, <code>sn_comp_ucf_control</code>...) mostram o que foi baixado."
      ],
      "issues": [
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Erro ao baixar novas versões de documentos do UCF",
          "fix": "KB oficial: KB0993129 (exige login). Pelo resumo público, falta <code>json</code> na propriedade <code>glide.attachment.extensions</code>, o que bloqueia o anexo baixado. Inclua a extensão.",
          "src": {
            "title": "KB0993129 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0993129"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "ver KB",
          "problem": "Problemas gerais no import do GRC UCF",
          "fix": "KB oficial de troubleshooting: KB0681888 (exige login).",
          "src": {
            "title": "KB0681888 (Now Support)",
            "url": "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0681888"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "resolvido",
          "problem": "Shared lists aparecem vazias depois de instalar o plugin",
          "fix": "É preciso uma conta ativa no Common Controls Hub <strong>com acesso à API</strong>. Sem isso, as listas não aparecem.",
          "src": {
            "title": "How to configure the UCF Integration (Community)",
            "url": "https://www.servicenow.com/community/developer-forum/how-to-configure-the-ucf-integration/m-p/2791912"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Integrate with UCF Common Controls Hub",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/policy-and-compliance-management/c_UCF.html"
        },
        {
          "title": "Configure UCF integration using UCF CCH (OAuth)",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/policy-and-compliance-management/configure-UCF-integration.html"
        },
        {
          "title": "Configure UCF integration through API key",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/policy-and-compliance-management/config_using_ucf_api_key.html"
        },
        {
          "title": "Manage UCF integration",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/policy-and-compliance-management/manage_compliance_frameworks.html"
        }
      ]
    },
    {
      "id": "everbridge",
      "module": "irm",
      "name": "Everbridge",
      "area": "IRM · BCM",
      "what": "Integra o Crisis Management do Business Continuity Management ao Everbridge para enviar notificações de emergência e coordenar respostas em duas vias.",
      "app": "GRC: Crisis Management integration with Everbridge Notifications",
      "builtBy": "ServiceNow",
      "compat": [
        "Licença do Everbridge é pré-requisito. A integração faz parte da licença BCM Enterprise.",
        "Pelo relato na Community, o conector de base só aceita Basic Auth."
      ],
      "vendorSide": [
        "Conta Everbridge com o organization ID, delivery channels e record types já criados do lado do Everbridge.",
        "Incident template publicado (live) no Everbridge."
      ],
      "snSide": [
        "Administrador de BCM configura os dados de pré-requisito."
      ],
      "setup": [
        {
          "title": "Passos de configuração (ordem da doc oficial)",
          "steps": [
            "Crie a conexão e autentique as credenciais do Everbridge.",
            "Importe os delivery channels e os record types do Everbridge.",
            "Defina um template de notificação de emergência (e-mail ou SMS).",
            "Crie os contatos, as regras de import de contatos (filtro da tabela de usuários) e os grupos de contato.",
            "Use o Crisis Management workspace para enviar a notificação e acompanhar o fluxo."
          ]
        }
      ],
      "validate": [
        "Envie uma notificação de teste para um grupo pequeno e acompanhe o workflow no Crisis Management workspace."
      ],
      "issues": [
        {
          "level": "comunidade",
          "status": "sem solução",
          "problem": "\"Specify valid Incident Template ID in the Connection and Credential Alias\" ao criar a notificação",
          "fix": "O template está live e o ID está no registro de conexão, segundo o autor. A resposta sugeriu usar o <strong>Sys ID</strong> do template, e não o nome, ao aplicá-lo (por exemplo, no Flow Action). Não houve confirmação de que resolveu.",
          "src": {
            "title": "ServiceNow-Everbridge Integration for BCM (Community)",
            "url": "https://www.servicenow.com/community/grc-forum/servicenow-everbridge-integration-for-bcm/m-p/3482236"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "contorno",
          "problem": "Incidente é criado no Everbridge, mas não na ServiceNow",
          "fix": "As variáveis precisam ser mapeadas do lado do Everbridge, com a ServiceNow passando os valores no payload.",
          "src": {
            "title": "ServiceNow-Everbridge Integration for BCM (Community)",
            "url": "https://www.servicenow.com/community/grc-forum/servicenow-everbridge-integration-for-bcm/m-p/3482236"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Integrating Crisis Management with Everbridge",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/BCM-integration-everbridge.html"
        },
        {
          "title": "Setup steps for emergency notification",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/setting-up-everbridge-emergency-notification.html"
        },
        {
          "title": "Create an emergency notification and monitor its workflow",
          "url": "https://www.servicenow.com/docs/r/governance-risk-compliance/create-emergency-notification-everbridge.html"
        }
      ]
    },
    {
      "id": "armis-ew",
      "module": "secops",
      "name": "Armis Early Warning (USEM)",
      "area": "VR / USEM",
      "what": "Enriquece o Central Vulnerability Database (CVDB) da USEM com inteligência de exploração iminente da Armis (honeypots, OSINT, pesquisa operacional), para priorizar CVEs antes de virarem ataque, mesmo quando o CVSS não reflete o risco real.",
      "app": "Early Warning for Security Exposure Management",
      "builtBy": "ServiceNow (\"powered by Armis\")",
      "compat": [
        "Exige Unified Security Exposure Management (Vulnerability Response v30.x) instalada e configurada.",
        "Exige o plugin Vulnerability Integration Framework ativo.",
        "Aparece no Security Exposure Management Workspace junto com outros enriquecimentos, como o CISA KEV."
      ],
      "vendorSide": [
        "Conta no <strong>Armis Intelligence Center</strong> (https://ic.armis.com). O login é por link enviado ao e-mail.",
        "Em <strong>API Credentials</strong>, revele e copie a API key. A URL da API é fixa e específica da sua organização."
      ],
      "snSide": [
        "<code>sn_sec_cvd.read</code> para ver os registros de saúde e de CVD do Early Warning.",
        "<code>sn_sec_calculator.admin</code> para incluir o Early Warning nas regras de risco.",
        "A tabela <code>sn_vul_ew_cvd_attributes</code> não tem escrita para nenhum papel: a integração cuida dela."
      ],
      "setup": [
        {
          "title": "Ativar a integração",
          "path": "Filter Navigator: sn_sec_int_integration.LIST &gt; Early Warning for Security Exposure Management &gt; Integration Instances",
          "steps": [
            "Em <strong>Integration Instance Parameters</strong>, preencha <code>armis_api_url</code> (Value) e <code>armis_api_key</code> (Password value).",
            "Confirme que a ingestão delta (incremental) está ligada: ela só processa registros novos ou alterados.",
            "Selecione <strong>Save and Activate</strong>. A sincronização começa na próxima execução agendada."
          ]
        },
        {
          "title": "Usar na priorização",
          "path": "Workspaces &gt; Security Exposure Management Workspace &gt; Administration &gt; Risk calculators &gt; Review",
          "steps": [
            "Abra a regra de risco (ex.: Default Risk Rule) e selecione <strong>+ New criteria</strong>.",
            "Reference table: Vulnerable Item --&gt; Vulnerability. Table: National Vulnerability Database Entry. Field: digite <code>armis</code> e escolha o flag de Early Warning ou o Admiralty score.",
            "Defina o <strong>Weightage %</strong> e selecione <strong>Update</strong>. Os campos só aparecem depois de pelo menos uma execução da integração."
          ]
        }
      ],
      "validate": [
        "O flag <code>ew_exists</code> aparece na lista e no formulário do CVDB.",
        "Acompanhe o histórico de execuções e a saúde da ingestão na página de overview da integração."
      ],
      "issues": [
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Campos do Early Warning não aparecem no construtor de critérios da regra de risco",
          "fix": "Eles só ficam disponíveis depois que o plugin está instalado e <strong>pelo menos uma execução</strong> da integração foi concluída.",
          "src": {
            "title": "Add Early Warning criteria to a risk rule",
            "url": __DOCS + "add-armis-early-warning-risk-rule.html"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Early Warning for Security Exposure Management",
          "url": __DOCS + "armis-early-warning-integration.html"
        },
        {
          "title": "Set up requirements (Armis Intelligence Center)",
          "url": __DOCS + "early-warning-integration-setup.html"
        },
        {
          "title": "Configure the integration",
          "url": __DOCS + "configure-early-warning-integration.html"
        },
        {
          "title": "Add Early Warning criteria to a risk rule",
          "url": __DOCS + "add-armis-early-warning-risk-rule.html"
        },
        {
          "title": "Early Warning CVD Attributes field reference",
          "url": __DOCS + "early-warning-cvd-attributes.html"
        }
      ]
    },
    {
      "id": "armis-sgc",
      "module": "secops",
      "name": "Armis Service Graph Connector (CMDB)",
      "area": "CMDB / ativos",
      "what": "Carrega no CMDB os dispositivos descobertos pela Armis: gerenciados, não gerenciados, IoT, médicos e de OT. É a base para casar vulnerabilidades e incidentes com CIs e donos.",
      "app": "Service Graph Connector for Armis",
      "builtBy": "Armis (no programa Service Graph Connector desde 2020; a Armis agora é da ServiceNow)",
      "compat": [
        "Pela ficha da Store: exige assinatura ITOM Visibility ou ITOM Discovery (baseada em Subscription Units).",
        "Dependências citadas na Store: IntegrationHub ETL 2.1.1+, CMDB CI Class Models 1.71.0+ e Integration Commons for CMDB 2.12.0+.",
        "Existe um app separado na Store, \"Import Armis Device Vulnerabilities into ServiceNow\", compatível com o conector, para levar vulnerabilidades à VR."
      ],
      "vendorSide": [
        "Acesso à API do Armis Centrix (credenciais de integração).",
        "Dados de dispositivos limpos na Armis (ativos offline ou inválidos atrapalham os imports agendados)."
      ],
      "snSide": [
        "Administrador de CMDB/ITOM para instalar e configurar o conector."
      ],
      "setup": [
        {
          "title": "Visão geral",
          "steps": [
            "Instale o app da Store com as dependências.",
            "Configure a conexão com o Armis Centrix pelo guided setup do conector.",
            "Revise as configurações de classificação, que permitem que o sistema operacional informado pela Armis ajuste dinamicamente a classe de destino no CMDB.",
            "<em>Observação:</em> não encontrei o passo a passo detalhado na documentação pública da ServiceNow; siga o guia do app na Store."
          ]
        }
      ],
      "validate": [
        "Confira os CIs criados ou atualizados e a classe atribuída a cada tipo de dispositivo."
      ],
      "issues": [
        {
          "level": "comunidade",
          "status": "sem solução",
          "date": "2025-08",
          "problem": "Import agendado de Devices falha com \"InvalidPathException: Could not find path in stream: $.data.results\" (o manual funciona)",
          "fix": "Sem solução confirmada. Sugestões da única resposta (de outro conector, não da Armis): manter o conector sem customização, limpar registros offline ou inválidos na Armis e não criar identificadores novos de classes filhas. A mensagem de ETL \"no import set\" somente leitura é normal.",
          "src": {
            "title": "Armis Service Graph Connector Error (Community)",
            "url": "https://www.servicenow.com/community/service-graph-connectors-forum/armis-service-graph-connector-error/m-p/3340760"
          },
          "added": "2026-11-08"
        },
        {
          "level": "comunidade",
          "status": "sem solução",
          "date": "2025-03",
          "problem": "Ativo de OT vira CI, mas o registro \"OT Device details\" não é criado",
          "fix": "Pergunta sem resposta na Community. <em>Sugestão:</em> verifique se o plugin de Operational Technology está instalado e se a classe de destino é uma classe de OT.",
          "src": {
            "title": "Service Graph Connector - Armis to ServiceNow integration (Community)",
            "url": "https://www.servicenow.com/community/service-graph-connectors-forum/service-graph-connector-armis-to-servicenow-integration/m-p/3204534"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Service Graph Connector for Armis (Store)",
          "url": "https://store.servicenow.com/store/app/e43a2fe21b246a50a85b16db234bcb55"
        },
        {
          "title": "Import Armis Device Vulnerabilities into ServiceNow (Store)",
          "url": "https://store.servicenow.com/store/app/6d4bef2a1b246a50a85b16db234bcb6c"
        }
      ]
    },
    {
      "id": "veza-aict",
      "module": "irm",
      "name": "Veza Access Intelligence (AI Control Tower)",
      "area": "IRM · Governança de IA",
      "what": "Mostra no mapa de agentes do AI Control Tower o risco e a severidade de acesso de cada agente de IA governado, calculados pela Veza. É um conector de enriquecimento: não importa ativos novos.",
      "app": "Conector Veza do AI Control Tower",
      "builtBy": "ServiceNow",
      "compat": [
        "Suporta agentes hospedados em AWS, Gemini Enterprise Agent Platform, Azure AI Foundry e Salesforce.",
        "ServiceNow e Veza mantêm conexões separadas com cada hyperscaler: as duas pontas precisam estar configuradas.",
        "O conector da Veza só aceita OAuth 2.0."
      ],
      "vendorSide": [
        "No tenant Veza, em Administration &gt; API Keys: um <strong>OAuth 2.0 client</strong> (client credential) e/ou um <strong>OAuth 2.0 app</strong> (authorization code), com escopo <code>servicenow:aict:read</code>. O secret só aparece uma vez.",
        "No app OAuth, a base URL é a URL da sua instância.",
        "Integrações da Veza com os mesmos hyperscalers configurados no AI Control Tower."
      ],
      "snSide": [
        "<code>admin</code> para criar os Application Registries de OAuth.",
        "<code>sn_ai_governance.ai_steward</code> para criar a conexão com a Veza."
      ],
      "setup": [
        {
          "title": "OAuth do lado da ServiceNow",
          "path": "All &gt; System OAuth &gt; Application Registries",
          "steps": [
            "Crie um registry Client Credentials (com o client da Veza) e/ou um Authorization Code (com o app da Veza, com PKCE e redirect para /oauth_redirect.do).",
            "Use os endpoints /oauth/authorize e /oauth/token do seu tenant Veza.",
            "Defina o <strong>refresh token lifespan em 2.592.000 segundos (30 dias)</strong> nos dois.",
            "Vincule ao connection alias pré-fornecido <strong>SN AI Security Veza Connector</strong> (um registry por vez)."
          ]
        },
        {
          "title": "Criar a conexão",
          "path": "AI Control Tower &gt; Settings &gt; Integrations &gt; Connectors",
          "steps": [
            "Configure primeiro os conectores dos hyperscalers (os mesmos configurados na Veza).",
            "Em Available connectors, selecione o tile <strong>Veza</strong> (security connectors) e confirme Provider type = Security.",
            "Marque as duas confirmações (configuração do lado Veza e do lado ServiceNow) e selecione <strong>Validate Connection</strong>."
          ]
        }
      ],
      "validate": [
        "Selecione um agente no mapa e abra a aba <strong>Access intelligence</strong> para ver o risk score. Se o token expirou, use <strong>Re-Authenticate</strong> na aba."
      ],
      "issues": [
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Token deixa de renovar depois de um tempo",
          "fix": "O refresh token lifespan na ServiceNow precisa ser igual ao da Veza (2.592.000 s). Se o valor da ServiceNow for maior, a renovação falha depois que o token da Veza expira.",
          "src": {
            "title": "Configure OAuth for Veza in ServiceNow",
            "url": "https://www.servicenow.com/docs/r/intelligent-experiences/gov-sec-configure-veza-servicenow.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Agente aparece no mapa, mas a aba Access intelligence fica vazia",
          "fix": "O agente precisa ser um ativo governado com <code>external_ref_id</code> preenchido e <code>model_category = Agentic AI</code>.",
          "src": {
            "title": "Configure Veza access intelligence in the agent map",
            "url": "https://www.servicenow.com/docs/r/intelligent-experiences/gov-sec-configure-veza-access-intelligence.html"
          },
          "added": "2026-11-08"
        },
        {
          "level": "oficial",
          "status": "resolvido",
          "problem": "Botão Validate Connection desabilitado",
          "fix": "Ele só habilita depois que as duas caixas de confirmação (configuração Veza e configuração ServiceNow) estão marcadas.",
          "src": {
            "title": "Create an AI connection for Veza access intelligence",
            "url": "https://www.servicenow.com/docs/r/intelligent-experiences/aict-create-ai-connection-veza.html"
          },
          "added": "2026-11-08"
        }
      ],
      "docs": [
        {
          "title": "Configure Veza access intelligence in the agent map",
          "url": "https://www.servicenow.com/docs/r/intelligent-experiences/gov-sec-configure-veza-access-intelligence.html"
        },
        {
          "title": "Configure OAuth in Veza",
          "url": "https://www.servicenow.com/docs/r/intelligent-experiences/gov-sec-configure-veza-oauth.html"
        },
        {
          "title": "Configure OAuth for Veza in ServiceNow",
          "url": "https://www.servicenow.com/docs/r/intelligent-experiences/gov-sec-configure-veza-servicenow.html"
        },
        {
          "title": "Create an AI connection for Veza access intelligence",
          "url": "https://www.servicenow.com/docs/r/intelligent-experiences/aict-create-ai-connection-veza.html"
        }
      ]
    }
  ]
};
