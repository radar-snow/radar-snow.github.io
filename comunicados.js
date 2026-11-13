/* Comunicados da página inicial (faixa verde acima dos módulos).
   Para publicar um aviso: adicione um objeto em window.RADAR_COM e rode `node build.js`.
   Campos: date "AAAA-MM-DD", title, text (pode ter HTML simples, como <strong>), url (opcional).
   Aparecem os 3 mais recentes. Lista vazia = a faixa some.
   As tarefas semanais não mexem neste arquivo. */
window.RADAR_COM = [
  {
    date: "2026-11-13",
    title: "Radar agora com 12 módulos",
    text: "Entraram ITOM, APM/EA, Otto, DPM/DPR e ITAM. Cada módulo é atualizado uma vez por semana, no dia indicado no bloco.",
    url: ""
  }
];
