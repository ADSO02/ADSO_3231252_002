// HU-10: CRITERIO 1
// Mostrar total de reservaciones activas.

const ZONES = [
  { id: 'ZN-001', name: 'Zona Centro A', reservations: 14 },
  { id: 'ZN-002', name: 'Zona Norte B', reservations: 17 },
  { id: 'ZN-003', name: 'Zona Sur C', reservations: 12 },
  { id: 'ZN-004', name: 'Zona Occidental D', reservations: 0 }
];

function getTotalActiveReservations() {
  return ZONES.reduce((total, zone) => total + zone.reservations, 0);
}

function renderCriterionOne() {
  const kpiEl = document.getElementById('kpi-reservations');
  if (!kpiEl) return;
  kpiEl.textContent = getTotalActiveReservations().toLocaleString('es-CO');
}

renderCriterionOne();