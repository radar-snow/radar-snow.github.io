/* Comunicados: faixa verde na página inicial (3 mais recentes) e página própria em comunicados/ (todos).
   Para publicar um aviso: adicione um objeto em window.RADAR_COM e rode `node build.js`.
   Campos: date "AAAA-MM-DD", title, text (resumo de uma linha; pode ter HTML simples, como <strong>),
   body (opcional: texto longo em HTML, só aparece na página), url (opcional: link "Saiba mais").
   As tarefas semanais não mexem neste arquivo. */
window.RADAR_COM = [
  {
    date: "2026-11-13",
    title: "Radar agora com 12 módulos",
    text: "Entraram ITOM, APM/EA, Otto, DPM/DPR e ITAM. Cada módulo é atualizado uma vez por semana, no dia indicado no bloco.",
    url: ""
  }
];
