const ZONES = [
  { id: 'ZN-001', name: 'Zona Centro A', reservations: 14, capacity: 20, available: 6 },
  { id: 'ZN-002', name: 'Zona Norte B', reservations: 17, capacity: 20, available: 3 },
  { id: 'ZN-003', name: 'Zona Sur C', reservations: 12, capacity: 20, available: 8 },
  { id: 'ZN-004', name: 'Zona Occidental D', reservations: 0, capacity: 20, available: 20 }
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

function getZoneOccupancyPct(zone) {
  const occupied = zone.capacity - zone.available;
  return Math.round((occupied / zone.capacity) * 100);
}

function getAverageOccupancyPct() {
  const totalPct = ZONES.reduce((sum, zone) => sum + getZoneOccupancyPct(zone), 0);
  return Math.round(totalPct / ZONES.length);
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

function renderCriterionThree() {
  const avgEl = document.getElementById('kpi-occupancy');
  if (avgEl) avgEl.textContent = `${getAverageOccupancyPct()}%`;

  const bodyEl = document.getElementById('zone-occupancy-body');
  if (!bodyEl) return;

  bodyEl.innerHTML = ZONES.map(zone => {
    const pct = getZoneOccupancyPct(zone);
    const occupied = zone.capacity - zone.available;
    return `
      <div class="zone-row">
        <div class="zone-row-header">
          <div class="zone-row-name">${zone.name}</div>
          <div class="zone-row-info">
            <span class="zone-row-spots">${occupied}/${zone.capacity}</span>
            <span class="zone-row-pct">${pct}%</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

renderCriterionOne();
renderCriterionTwo();
renderCriterionThree();