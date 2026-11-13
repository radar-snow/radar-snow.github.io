/* Comunicados: faixa verde na página inicial (3 mais recentes) e página própria em comunicados/ (todos).
   Para publicar um aviso: adicione um objeto no INÍCIO de window.RADAR_COM e rode `node build.js`.
   Campos: date "AAAA-MM-DD" (dia em que entrou no Radar), title, text (resumo de uma linha; pode ter HTML simples),
   slug (opcional: âncora fixa, vira #c-<slug>), ref (opcional: número do comunicado, ex. "COMM3378032"), source (opcional: ex. "ServiceNow"),
   prazo (opcional: data ou janela de ação), body (opcional: HTML com <h3> e <ul>, só aparece na página),
   links (opcional: [{ title, url, note }]), url (opcional: link "Saiba mais").
   As tarefas semanais não mexem neste arquivo. */
var KB = "https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=";
window.RADAR_COM = [
  {
    date: "2026-11-13",
    slug: "basic-auth",
    ref: "COMM3378032",
    source: "ServiceNow",
    title: "Basic Authentication deixa de ser suportada em integrações de entrada",
    prazo: "agir até novembro de 2027 (release Denmark)",
    text: "A partir da Denmark, usuário e senha em requisições de API de entrada (REST, SOAP e outras) deixam de ter suporte. A recomendação é migrar para OAuth 2.0, mTLS ou token federado.",
    body:
      "<h3>O que muda</h3><ul>" +
      "<li>A partir da release <strong>Denmark</strong>, planejada para novembro de 2027, a ServiceNow encerra o suporte a <strong>Basic Authentication para integrações de entrada</strong>: credenciais de usuário e senha enviadas em requisições de API de entrada (REST, SOAP e outras interfaces).</li>" +
      "<li>Pode continuar funcionando na instância, inclusive depois de upgrades, mas <strong>sem suporte</strong>: a ServiceNow não vai atender problemas ligados a ela.</li>" +
      "<li>Nas releases antes e depois da Denmark podem entrar controles adicionais sobre o uso, incluindo mudanças na configuração padrão de novas integrações. A ServiceNow diz que vai avisar antes.</li></ul>" +
      "<h3>O que fazer</h3><ul>" +
      "<li>Migrar as integrações para um método suportado: <strong>OAuth 2.0</strong>, <strong>mutual TLS (mTLS)</strong> ou <strong>autenticação federada por token</strong>.</li>" +
      "<li>Usar o KB3220405 para identificar quais integrações da instância usam Basic Authentication e como migrar, inclusive recursos da plataforma que dependem dela.</li>" +
      "<li>Se nenhuma integração usa Basic Authentication, não é preciso fazer nada.</li></ul>" +
      "<h3>Bom saber</h3><ul>" +
      "<li>É separado e mais amplo que a atualização de segurança de junho de 2026 (KB3025707), que restringiu Basic Authentication para contas de login interativo. Este vale para <strong>todas</strong> as integrações de entrada, inclusive contas de serviço (Web Service Access Only).</li>" +
      "<li>Converter a conta para <strong>Machine identity</strong> (antigo Web Service Access) continua valendo como passo de curto prazo, mas não substitui a migração.</li>" +
      "<li>Motivo citado pela ServiceNow: Basic Authentication envia usuário e senha em toda requisição e não aceita MFA, por isso é o alvo mais comum de ataques automatizados de abuso de credenciais.</li>" +
      "<li>Dúvidas técnicas: abrir case no suporte da ServiceNow ou falar com o representante ou parceiro.</li></ul>",
    links: [
      { title: "KB3220405: identificar e migrar integrações com Basic Authentication", url: KB + "KB3220405", note: "exige login no Now Support" },
      { title: "KB3025707: atualização de segurança de junho de 2026", url: KB + "KB3025707", note: "exige login no Now Support" }
    ]
  },
  {
    date: "2026-11-13",
    slug: "getrefrecord",
    ref: "COMM3443886",
    source: "ServiceNow",
    title: "getRefRecord() entre escopos ganha checagem de segurança na Brazil",
    prazo: "release Brazil (novembro de 2026)",
    text: "Uma nova propriedade controla a checagem de escopo quando getRefRecord() é usado entre aplicações: ligada por padrão em instâncias novas na Brazil e desligada em instâncias que fizerem upgrade.",
    body:
      "<h3>O que muda</h3><ul>" +
      "<li>Nova glide property <code>glide.script.enforce_scope_checks_on_get_ref_record</code>, que controla a checagem quando a API JavaScript <code>getRefRecord()</code> é usada entre escopos de aplicação.</li>" +
      "<li><strong>Instâncias novas na Brazil:</strong> a checagem já vem ativada.</li>" +
      "<li><strong>Instâncias que fizerem upgrade para a Brazil:</strong> o padrão é <code>false</code>; você ativa quando estiver pronto.</li>" +
      "<li>Amplia a proteção de fronteira de escopo que a release Australia trouxe para dot-walking entre escopos por campos de referência (KB2793170).</li></ul>" +
      "<h3>O que fazer</h3><ul>" +
      "<li>Ler o KB3142985 para entender como a checagem funciona e para avaliar e corrigir os usos de <code>getRefRecord()</code> entre escopos <strong>antes</strong> de ativar.</li>" +
      "<li>Dúvidas técnicas: abrir case no Now Support com o assunto <em>Cross-Scope Access Security Enhancement (Glide Element API: getRefRecord())</em>.</li></ul>",
    links: [
      { title: "KB3142985: como funciona e como corrigir o acesso entre escopos", url: KB + "KB3142985", note: "exige login no Now Support" },
      { title: "KB2793170: proteção de dot-walking entre escopos (Australia)", url: KB + "KB2793170", note: "exige login no Now Support" }
    ]
  }
];
