// HU-10: CRITERIOS 1 Y 2
// 1) Mostrar total de reservaciones activas.
// 2) Mostrar ingresos totales de pagos simulados.

const ZONES = [
  { id: 'ZN-001', name: 'Zona Centro A', reservations: 14 },
  { id: 'ZN-002', name: 'Zona Norte B', reservations: 17 },
  { id: 'ZN-003', name: 'Zona Sur C', reservations: 12 },
  { id: 'ZN-004', name: 'Zona Occidental D', reservations: 0 }
];

const PAYMENTS = [
  { id: 'PAY-001', amount: 187500 },
  { id: 'PAY-002', amount: 204000 },
  { id: 'PAY-003', amount: 162000 },
  { id: 'PAY-004', amount: 44000 }
];

function getTotalActiveReservations() {
  return ZONES.reduce((total, zone) => total + zone.reservations, 0);
}

function getTotalRevenue() {
  return PAYMENTS.reduce((total, payment) => total + payment.amount, 0);
}

function renderCriterionOne() {
  const kpiEl = document.getElementById('kpi-reservations');
  if (!kpiEl) return;
  kpiEl.textContent = getTotalActiveReservations().toLocaleString('es-CO');
}

function renderCriterionTwo() {
  const kpiEl = document.getElementById('kpi-revenue');
  if (!kpiEl) return;
  kpiEl.textContent = '$' + getTotalRevenue().toLocaleString('es-CO');
}

renderCriterionOne();
renderCriterionTwo();