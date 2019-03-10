let es_Messages = {
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Todo el día',
  week: 'Semana',
  work_week: 'Semana laboral',
  day: 'Día',
  month: 'Mes',
  previous: 'Atrás',
  next: 'Siguiente',
  yesterday: 'Ayer',
  tomorrow: 'Mañana',
  today: 'Hoy',
  agenda: 'Agenda',

  noEventsInRange: 'No hay eventos en este rango',

  showMore: total => `+${total} más`,
}

export default function messages(msgs) {
  return {
    ...es_Messages,
    ...msgs,
  }
}
