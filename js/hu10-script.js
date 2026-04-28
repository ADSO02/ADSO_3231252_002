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

const USERS = [
  { id: 'USR-001', username: 't_vxrgas' },
  { id: 'USR-002', username: 'carlos_m' },
  { id: 'USR-003', username: 'laura_p' },
  { id: 'USR-004', username: 'andres_v' },
  { id: 'USR-005', username: 'nuevo_usuario' }
];

const CURRENT_USER = {
  username: 't_vxrgas',
  role: 'admin'
};

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

function getRegisteredUsersCount() {
  return USERS.length;
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

function renderCriterionFour() {
  const kpiEl = document.getElementById('kpi-users');
  if (!kpiEl) return;
  kpiEl.textContent = getRegisteredUsersCount().toLocaleString('es-CO');
}

function enforceAdminAccess() {
  if (CURRENT_USER.role === 'admin') return true;

  const content = document.querySelector('.content');
  if (content) {
    content.innerHTML = `
      <div class="panel-card" style="max-width:640px; margin: 24px auto;">
        <div class="panel-header">
          <div class="panel-title">
            <div class="panel-dot"></div>
            Acceso restringido
          </div>
        </div>
        <div class="panel-body">
          <p style="font-size:14px; color:var(--text); line-height:1.6;">
            Este modulo solo esta disponible para usuarios con rol administrador.
          </p>
          <p style="font-size:12px; color:var(--muted); margin-top:10px;">
            Usuario actual: <strong>${CURRENT_USER.username}</strong> (${CURRENT_USER.role})
          </p>
        </div>
      </div>
    `;
  }

  return false;
}

function renderAllCriteria() {
  renderCriterionOne();
  renderCriterionTwo();
  renderCriterionThree();
  renderCriterionFour();
}

function refreshDashboard() {
  ZONES.forEach(zone => {
    const delta = Math.floor(Math.random() * 3) - 1;
    zone.available = Math.max(0, Math.min(zone.capacity, zone.available + delta));
    zone.reservations = zone.capacity - zone.available;
  });

  renderAllCriteria();

  const updateEl = document.getElementById('last-update-text');
  if (!updateEl) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  updateEl.textContent = `Actualizado ${h}:${m}:${s}`;
}

if (enforceAdminAccess()) {
  renderAllCriteria();
  const refreshBtn = document.getElementById('btn-refresh');
  if (refreshBtn) refreshBtn.addEventListener('click', refreshDashboard);
  setInterval(refreshDashboard, 30000);
}