/**
 * ARCH // STUDIO — Land Feasibility & Schematic Workspace
 * Engine: Zoning Rules, Legal Setbacks & Dynamic 2D Schematic SVG Renderer
 */

// --- 1. Bangkok Comprehensive Zoning Master Data ---
const BMA_ZONING_DATA = {
  Y1: { code: 'ย.1', far: 1.0, osr: 40.0, bcr: 60.0, name: 'ที่อยู่อาศัยหนาแน่นน้อย (ย.1)' },
  Y2: { code: 'ย.2', far: 1.5, osr: 25.0, bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นน้อย (ย.2)' },
  Y3: { code: 'ย.3', far: 2.5, osr: 12.5, bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นน้อย (ย.3)' },
  Y4: { code: 'ย.4', far: 3.0, osr: 10.0, bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นน้อย (ย.4)' },
  Y5: { code: 'ย.5', far: 4.0, osr: 7.5,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นปานกลาง (ย.5)' },
  Y6: { code: 'ย.6', far: 4.5, osr: 6.5,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นปานกลาง (ย.6)' },
  Y7: { code: 'ย.7', far: 5.0, osr: 6.0,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นปานกลาง (ย.7)' },
  Y8: { code: 'ย.8', far: 6.0, osr: 5.0,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นมาก (ย.8)' },
  Y9: { code: 'ย.9', far: 7.0, osr: 4.5,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นมาก (ย.9)' },
  Y10: { code: 'ย.10', far: 8.0, osr: 4.0, bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นมาก (ย.10)' },
  C1: { code: 'พ.1', far: 5.0, osr: 6.0,  bcr: 70.0, name: 'พาณิชยกรรมชุมชน (พ.1)' },
  C3: { code: 'พ.3', far: 7.0, osr: 4.5,  bcr: 70.0, name: 'พาณิชยกรรมศูนย์กลาง (พ.3)' },
  C5: { code: 'พ.5', far: 10.0, osr: 3.0, bcr: 80.0, name: 'พาณิชยกรรมศูนย์กลางหลัก CBD (พ.5)' },
};

// --- 2. Workspace State ---
const state = {
  totalSqm: 200.0,
  widthMeters: 10.0,
  depthMeters: 20.0,
  roadWidth: 6.0,
  zoneKey: 'Y1',
  typology: 'residential', // 'residential', 'shophouse', 'highrise'
  priceRate: 65000,
  priceMode: 'perWah',
  showSetbackHatch: true,
  showDims: true,
  activeUnitMode: 'wah'
};

// Math constants
const SQM_PER_WAH = 4;
const WAH_PER_RAI = 400;
const WAH_PER_NGAN = 100;

// Formatters
function fmt(num, maxDec = 2) {
  if (isNaN(num) || num === null) return '0';
  return Number(num).toLocaleString('th-TH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDec
  });
}

function showToast(msg) {
  const toast = document.getElementById('studioToast');
  const toastMsg = document.getElementById('studioToastMsg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// --- 3. Legal Setback Calculation Engine (MR 55 / BMA Regulations) ---
function calculateLegalSetbacks() {
  const road = state.roadWidth;
  const typo = state.typology;

  let frontSetback = 2.0;
  let rearSetback = 2.0;
  let sideLeftSetback = 2.0;
  let sideRightSetback = 2.0;
  let heightLimitMeters = 15.0;
  let heightRuleDesc = '';

  // 3.1 Front Setback from Road (กฎกระทรวง 55 ข้อ 34)
  if (road < 6.0) {
    // ถนนกว้างน้อยกว่า 6 เมตร: ร่นจากกึ่งกลางถนนอย่างน้อย 3 เมตร
    const halfRoad = road / 2.0;
    frontSetback = Math.max(0.5, 3.0 - halfRoad);
    heightLimitMeters = Math.min(road * 2.0, 12.0);
    heightRuleDesc = `ถนนแคบ (< 6 ม.) ร่นจากกึ่งกลางถนน 3.00 ม. สูงไม่เกิน ${fmt(heightLimitMeters, 1)} ม. (~3 ชั้น)`;
  } else if (road <= 10.0) {
    frontSetback = 2.0;
    heightLimitMeters = Math.min(road * 2.0, 23.0);
    heightRuleDesc = `ถนนกว้าง ${fmt(road, 1)} ม. ร่นแนวถนน 2.00 ม. สูงจำกัด ${fmt(heightLimitMeters, 1)} ม. (~4-7 ชั้น)`;
  } else if (road <= 20.0) {
    frontSetback = 2.0;
    heightLimitMeters = Math.min(road * 2.0, 35.0);
    heightRuleDesc = `ถนนกว้าง ${fmt(road, 1)} ม. ร่นแนวถนน 2.00 ม. สูงจำกัด ${fmt(heightLimitMeters, 1)} ม.`;
  } else {
    frontSetback = 3.0;
    heightLimitMeters = road * 2.0;
    heightRuleDesc = `ถนนสายหลัก (${fmt(road, 1)} ม.) ศักยภาพอาคารสูงพิเศษ`;
  }

  // 3.2 Side & Rear Setbacks based on Typology (ข้อ 50)
  if (typo === 'residential') {
    sideLeftSetback = 2.0;
    sideRightSetback = 2.0;
    rearSetback = 2.0;
  } else if (typo === 'shophouse') {
    // อาคารพาณิชย์: ด้านข้างชิดเขตได้ (ผนังทึบ) หรือร่น 1.0 ม., ด้านหลังร่น 3.0 ม.
    sideLeftSetback = 1.0;
    sideRightSetback = 1.0;
    rearSetback = 3.0;
  } else if (typo === 'highrise') {
    // อาคารขนาดใหญ่ / คอนโด: ระยะร่นรอบอาคารอย่างน้อย 6.00 ม. (หรือ 3.00 ม. สำหรับอาคารทั่วไป)
    const baseSetback = state.totalSqm >= 1600 ? 6.0 : 3.0;
    sideLeftSetback = baseSetback;
    sideRightSetback = baseSetback;
    rearSetback = baseSetback;
    frontSetback = Math.max(frontSetback, baseSetback);
  }

  // Prevent negative buildable dimensions
  const buildWidth = Math.max(0, state.widthMeters - (sideLeftSetback + sideRightSetback));
  const buildDepth = Math.max(0, state.depthMeters - (frontSetback + rearSetback));
  const buildableFootprintGround = buildWidth * buildDepth;

  return {
    front: frontSetback,
    rear: rearSetback,
    sideLeft: sideLeftSetback,
    sideRight: sideRightSetback,
    buildWidth,
    buildDepth,
    buildableFootprintGround,
    heightLimitMeters,
    heightRuleDesc
  };
}

// --- 4. Hero Metric & Feasibility Calculation ---
function recalculateFeasibility() {
  const zone = BMA_ZONING_DATA[state.zoneKey] || BMA_ZONING_DATA.Y1;
  const setbacks = calculateLegalSetbacks();

  // 4.1 Max GFA by FAR
  const maxGfa = state.totalSqm * zone.far;

  // 4.2 Max Footprint by BCR and Setbacks
  const bcrFootprint = state.totalSqm * (zone.bcr / 100.0);
  const legalFootprint = Math.min(bcrFootprint, setbacks.buildableFootprintGround);

  // 4.3 Min Open Space by OSR
  // OSR คือ สัดส่วนที่ว่างปราศจากสิ่งปกคลุมดิน = (พื้นที่ที่ดิน x OSR%)
  const minOpenSpace = state.totalSqm * (zone.osr / 100.0);

  // 4.4 Max Estimated Floors
  const estFloors = Math.max(1, Math.floor(setbacks.heightLimitMeters / 3.2));

  // --- Update Hero Metric Tiles ---
  document.getElementById('valMaxGfa').textContent = fmt(maxGfa, 1);
  document.getElementById('valMaxFootprint').textContent = fmt(legalFootprint, 1);
  document.getElementById('valMinOpenSpace').textContent = fmt(minOpenSpace, 1);
  document.getElementById('valHeightLimit').textContent = `${fmt(setbacks.heightLimitMeters, 1)} ม. (~${estFloors} ชั้น)`;
  document.getElementById('noteHeightRule').textContent = setbacks.heightRuleDesc;

  // --- Update Zoning Specs Bar ---
  document.getElementById('dispFar').textContent = `${zone.far.toFixed(1)} : 1`;
  document.getElementById('dispOsr').textContent = `${zone.osr.toFixed(1)}%`;
  document.getElementById('dispBcr').textContent = `${zone.bcr.toFixed(0)}%`;

  // --- Update Viewport Status Ribbon ---
  document.getElementById('ribbonWidth').textContent = `${fmt(state.widthMeters, 2)} ม.`;
  document.getElementById('ribbonDepth').textContent = `${fmt(state.depthMeters, 2)} ม.`;
  document.getElementById('ribbonBuildWidth').textContent = `${fmt(setbacks.buildWidth, 2)} ม.`;
  document.getElementById('ribbonBuildDepth').textContent = `${fmt(setbacks.buildDepth, 2)} ม.`;

  // --- Update Legal Drawer Text ---
  document.getElementById('specFrontSetback').textContent = `${fmt(setbacks.front, 2)} ม.`;
  document.getElementById('specSideSetback').textContent = `${fmt(setbacks.sideLeft, 2)} ม.`;
  document.getElementById('specRearSetback').textContent = `${fmt(setbacks.rear, 2)} ม.`;
  document.getElementById('specRoadHeightLimit').textContent = `${fmt(setbacks.heightLimitMeters, 1)} ม. (${estFloors} ชั้น)`;
  document.getElementById('specOpenSpaceText').textContent = `${zone.osr}% (${fmt(minOpenSpace, 1)} ตร.ม.)`;

  // Update Tier 2 Bonus calculations
  const bonusFar = zone.far * 1.2;
  const bonusGfa = state.totalSqm * bonusFar;
  document.getElementById('bonusBaseFar').textContent = `${zone.far.toFixed(1)} : 1`;
  document.getElementById('bonusMaxFar').textContent = `${bonusFar.toFixed(2)} : 1`;
  document.getElementById('bonusMaxGfa').textContent = `${fmt(bonusGfa, 1)} ตร.ม.`;

  // Update Valuation Card
  updateValuation();

  // Update Feasibility Matrix Table
  updateMatrixTable(maxGfa, legalFootprint, minOpenSpace, setbacks, zone);

  // Re-render 2D Schematic SVG
  renderSchematicSvg(setbacks);
}

// --- 5. Valuation Calculation ---
function updateValuation() {
  const totalWah = state.totalSqm / SQM_PER_WAH;
  const rate = parseFloat(document.getElementById('inputPriceRate').value) || 0;
  const mode = document.getElementById('selectPriceMode').value;

  let totalPrice = 0;
  if (mode === 'perWah') {
    totalPrice = totalWah * rate;
  } else if (mode === 'perRai') {
    totalPrice = (totalWah / WAH_PER_RAI) * rate;
  } else {
    totalPrice = rate;
  }

  document.getElementById('dispTotalPrice').textContent = `${fmt(Math.round(totalPrice))} บาท`;
}

// --- 6. Feasibility Matrix Table Renderer ---
function updateMatrixTable(maxGfa, footprint, openSpace, setbacks, zone) {
  const tbody = document.getElementById('matrixTableBody');
  if (!tbody) return;

  const rows = [
    {
      metric: 'พื้นที่อาคารรวมสูงสุด (Max GFA)',
      calc: `${fmt(maxGfa, 1)} ตร.ม.`,
      standard: `FAR ${zone.far.toFixed(1)} เท่า`,
      status: 'ผ่านเกณฑ์ ผังสี กทม.'
    },
    {
      metric: 'พื้นที่ปกคลุมดินชั้นล่าง (Footprint)',
      calc: `${fmt(footprint, 1)} ตร.ม.`,
      standard: `BCR ไม่เกิน ${zone.bcr}%`,
      status: setbacks.buildableFootprintGround >= footprint ? 'ผ่านระยะร่นอาคาร' : 'ถูกจำกัดด้วยระยะร่น'
    },
    {
      metric: 'ที่ว่างปราศจากสิ่งปกคลุมดิน (OSR)',
      calc: `${fmt(openSpace, 1)} ตร.ม.`,
      standard: `OSR ขั้นต่ำ ${zone.osr}%`,
      status: 'บังคับตามกฎหมาย'
    },
    {
      metric: 'ความสูงอาคารจำกัดตามเขตทาง',
      calc: `${fmt(setbacks.heightLimitMeters, 1)} เมตร`,
      standard: `ไม่เกิน 2 เท่าของเขตทาง (${fmt(state.roadWidth, 1)} ม.)`,
      status: 'ผ่านเกณฑ์ข้อ 44'
    },
    {
      metric: 'ขนาดอาคารก่อสร้างได้จริง (W × D)',
      calc: `${fmt(setbacks.buildWidth, 2)} ม. × ${fmt(setbacks.buildDepth, 2)} ม.`,
      standard: 'ระยะร่นครบ 4 ด้าน',
      status: setbacks.buildWidth > 0 && setbacks.buildDepth > 0 ? 'สร้างอาคารได้' : 'แปลงที่ดินแคบเกินไป'
    }
  ];

  tbody.innerHTML = rows.map(r => `
    <tr>
      <td style="font-family: var(--font-thai); font-weight: 500;">${r.metric}</td>
      <td style="font-weight: 700;">${r.calc}</td>
      <td style="color: var(--text-muted);">${r.standard}</td>
      <td><span class="status-badge pass">${r.status}</span></td>
    </tr>
  `).join('');
}

// --- 7. Dynamic 2D Schematic Plan Renderer (SVG Vector Engine) ---
function renderSchematicSvg(setbacks) {
  const svg = document.getElementById('schematicSvg');
  if (!svg) return;

  const W = state.widthMeters;
  const D = state.depthMeters;
  const road = state.roadWidth;

  // Viewport Dimensions
  const viewW = 800;
  const viewH = 560;

  // Total domain includes road depth in front + plot depth
  const roadVisualDepth = Math.max(4.0, road);
  const totalWorldH = D + roadVisualDepth + 4.0; // padding
  const totalWorldW = W + 8.0; // padding

  // Calculate Scale Factor (Pixels per meter)
  const scaleX = (viewW - 120) / totalWorldW;
  const scaleY = (viewH - 120) / totalWorldH;
  const scale = Math.min(scaleX, scaleY);

  // Pixel coordinates calculation
  const plotPixelW = W * scale;
  const plotPixelH = D * scale;
  const roadPixelH = roadVisualDepth * scale;

  // Center the plot horizontally and vertically
  const startX = (viewW - plotPixelW) / 2;
  const roadStartY = 50;
  const plotStartY = roadStartY + roadPixelH;

  // Setback Pixel dimensions
  const frontSetbackPx = setbacks.front * scale;
  const rearSetbackPx = setbacks.rear * scale;
  const sideLeftSetbackPx = setbacks.sideLeft * scale;
  const sideRightSetbackPx = setbacks.sideRight * scale;

  // Buildable Box Pixel coordinates
  const buildX = startX + sideLeftSetbackPx;
  const buildY = plotStartY + frontSetbackPx;
  const buildW = Math.max(0, plotPixelW - (sideLeftSetbackPx + sideRightSetbackPx));
  const buildH = Math.max(0, plotPixelH - (frontSetbackPx + rearSetbackPx));

  // Determine dark mode colors
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const strokeColor = isDark ? '#E2E8F0' : '#1E293B';
  const roadLineColor = isDark ? '#475569' : '#94A3B8';
  const dimColor = isDark ? '#94A3B8' : '#475569';
  const setbackStroke = isDark ? '#F87171' : '#DC2626';
  const setbackFill = isDark ? 'rgba(248, 113, 113, 0.12)' : 'rgba(220, 38, 38, 0.08)';
  const buildStroke = isDark ? '#4ADE80' : '#16A34A';
  const buildFill = isDark ? 'rgba(74, 222, 128, 0.18)' : 'rgba(34, 197, 94, 0.14)';

  let svgContent = `
    <!-- Defs for Cross-Hatch Pattern -->
    <defs>
      <pattern id="buildableHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="12" stroke="${buildStroke}" stroke-width="1.2" opacity="0.45" />
      </pattern>
      <pattern id="setbackHatch" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="8" stroke="${setbackStroke}" stroke-width="0.8" opacity="0.35" />
      </pattern>
    </defs>

    <!-- 1. PUBLIC ROAD STRIP -->
    <rect x="${startX - 60}" y="${roadStartY}" width="${plotPixelW + 120}" height="${roadPixelH}" fill="${isDark ? '#1E242C' : '#E2E8F0'}" opacity="0.75" />
    <!-- Road Centerline -->
    <line x1="${startX - 60}" y1="${roadStartY + roadPixelH / 2}" x2="${startX + plotPixelW + 60}" y2="${roadStartY + roadPixelH / 2}" stroke="${roadLineColor}" stroke-dasharray="6,4" stroke-width="1.5" />
    <text x="${startX + plotPixelW / 2}" y="${roadStartY + roadPixelH / 2 - 6}" font-family="JetBrains Mono" font-size="11" font-weight="600" fill="${roadLineColor}" text-anchor="middle">
      ถนนสาธารณะ (เขตทาง ${fmt(road, 1)} ม.)
    </text>

    <!-- 2. PLOT BOUNDARY -->
    <rect x="${startX}" y="${plotStartY}" width="${plotPixelW}" height="${plotPixelH}" fill="${isDark ? '#181C22' : '#FFFFFF'}" stroke="${strokeColor}" stroke-width="2.5" />
    <text x="${startX + 12}" y="${plotStartY + 20}" font-family="JetBrains Mono" font-size="11" font-weight="700" fill="${strokeColor}" opacity="0.7">
      แนวเขตที่ดิน (${fmt(W, 1)}ม. × ${fmt(D, 1)}ม.)
    </text>

    <!-- 3. SETBACK REGIONS -->
    ${state.showSetbackHatch ? `
      <!-- Front Setback Strip -->
      <rect x="${startX}" y="${plotStartY}" width="${plotPixelW}" height="${frontSetbackPx}" fill="url(#setbackHatch)" stroke="${setbackStroke}" stroke-dasharray="4,3" stroke-width="1" />
      <text x="${startX + plotPixelW / 2}" y="${plotStartY + frontSetbackPx / 2 + 4}" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="${setbackStroke}" text-anchor="middle">
        ร่นหน้า ${fmt(setbacks.front, 2)} ม.
      </text>

      <!-- Rear Setback Strip -->
      <rect x="${startX}" y="${plotStartY + plotPixelH - rearSetbackPx}" width="${plotPixelW}" height="${rearSetbackPx}" fill="url(#setbackHatch)" stroke="${setbackStroke}" stroke-dasharray="4,3" stroke-width="1" />
      <text x="${startX + plotPixelW / 2}" y="${plotStartY + plotPixelH - rearSetbackPx / 2 + 4}" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="${setbackStroke}" text-anchor="middle">
        ร่นหลัง ${fmt(setbacks.rear, 2)} ม.
      </text>

      <!-- Left Side Setback Strip -->
      <rect x="${startX}" y="${plotStartY + frontSetbackPx}" width="${sideLeftSetbackPx}" height="${buildH}" fill="url(#setbackHatch)" stroke="${setbackStroke}" stroke-dasharray="4,3" stroke-width="1" />
      <text x="${startX + sideLeftSetbackPx / 2}" y="${plotStartY + frontSetbackPx + buildH / 2}" font-family="JetBrains Mono" font-size="9" font-weight="600" fill="${setbackStroke}" text-anchor="middle" transform="rotate(-90 ${startX + sideLeftSetbackPx / 2} ${plotStartY + frontSetbackPx + buildH / 2})">
        ร่นข้าง ${fmt(setbacks.sideLeft, 2)} ม.
      </text>

      <!-- Right Side Setback Strip -->
      <rect x="${startX + plotPixelW - sideRightSetbackPx}" y="${plotStartY + frontSetbackPx}" width="${sideRightSetbackPx}" height="${buildH}" fill="url(#setbackHatch)" stroke="${setbackStroke}" stroke-dasharray="4,3" stroke-width="1" />
      <text x="${startX + plotPixelW - sideRightSetbackPx / 2}" y="${plotStartY + frontSetbackPx + buildH / 2}" font-family="JetBrains Mono" font-size="9" font-weight="600" fill="${setbackStroke}" text-anchor="middle" transform="rotate(90 ${startX + plotPixelW - sideRightSetbackPx / 2} ${plotStartY + frontSetbackPx + buildH / 2})">
        ร่นข้าง ${fmt(setbacks.sideRight, 2)} ม.
      </text>
    ` : ''}

    <!-- 4. BUILDABLE ENVELOPE (POLYGON WITH HATCH) -->
    ${buildW > 0 && buildH > 0 ? `
      <rect x="${buildX}" y="${buildY}" width="${buildW}" height="${buildH}" fill="${buildFill}" stroke="${buildStroke}" stroke-width="2" />
      <rect x="${buildX}" y="${buildY}" width="${buildW}" height="${buildH}" fill="url(#buildableHatch)" />
      
      <!-- Center Buildable Badge -->
      <g transform="translate(${buildX + buildW / 2}, ${buildY + buildH / 2})">
        <rect x="-85" y="-18" width="170" height="36" rx="6" fill="${isDark ? '#0F172A' : '#FFFFFF'}" stroke="${buildStroke}" stroke-width="1.5" />
        <text x="0" y="-3" font-family="Space Grotesk" font-size="11" font-weight="700" fill="${buildStroke}" text-anchor="middle">
          BUILDABLE ENVELOPE
        </text>
        <text x="0" y="11" font-family="JetBrains Mono" font-size="10" font-weight="600" fill="${isDark ? '#E2E8F0' : '#1E293B'}" text-anchor="middle">
          ${fmt(setbacks.buildWidth, 2)}ม. × ${fmt(setbacks.buildDepth, 2)}ม. (${fmt(setbacks.buildableFootprintGround, 1)} ตร.ม.)
        </text>
      </g>
    ` : `
      <g transform="translate(${startX + plotPixelW / 2}, ${plotStartY + plotPixelH / 2})">
        <rect x="-100" y="-16" width="200" height="32" rx="6" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.5" />
        <text x="0" y="4" font-family="Prompt" font-size="12" font-weight="600" fill="#B91C1C" text-anchor="middle">
          ⚠️ ระยะร่นเกินขนาดแปลงที่ดิน
        </text>
      </g>
    `}

    <!-- 5. DIMENSION LINES & TICK MARKS -->
    ${state.showDims ? `
      <!-- Top Width Dimension -->
      <g stroke="${dimColor}" stroke-width="1.2">
        <line x1="${startX}" y1="${plotStartY - 18}" x2="${startX + plotPixelW}" y2="${plotStartY - 18}" />
        <line x1="${startX}" y1="${plotStartY - 24}" x2="${startX}" y2="${plotStartY - 12}" />
        <line x1="${startX + plotPixelW}" y1="${plotStartY - 24}" x2="${startX + plotPixelW}" y2="${plotStartY - 12}" />
      </g>
      <text x="${startX + plotPixelW / 2}" y="${plotStartY - 22}" font-family="JetBrains Mono" font-size="11" font-weight="700" fill="${dimColor}" text-anchor="middle">
        หน้ากว้าง ${fmt(W, 2)} ม.
      </text>

      <!-- Right Depth Dimension -->
      <g stroke="${dimColor}" stroke-width="1.2">
        <line x1="${startX + plotPixelW + 24}" y1="${plotStartY}" x2="${startX + plotPixelW + 24}" y2="${plotStartY + plotPixelH}" />
        <line x1="${startX + plotPixelW + 18}" y1="${plotStartY}" x2="${startX + plotPixelW + 30}" y2="${plotStartY}" />
        <line x1="${startX + plotPixelW + 18}" y1="${plotStartY + plotPixelH}" x2="${startX + plotPixelW + 30}" y2="${plotStartY + plotPixelH}" />
      </g>
      <text x="${startX + plotPixelW + 32}" y="${plotStartY + plotPixelH / 2 + 4}" font-family="JetBrains Mono" font-size="11" font-weight="700" fill="${dimColor}" text-anchor="start">
        ความลึก ${fmt(D, 2)} ม.
      </text>
    ` : ''}
  `;

  svg.innerHTML = svgContent;
  document.getElementById('canvasScaleTag').textContent = `SCALE ~1:${Math.round(100 / (scale / 4))}`;
}

// --- 8. Event Listeners & Interactive Handlers ---
function initEventListeners() {
  // 8.1 Segmented Presets (Top bar)
  const presets = {
    '50wah': { wah: 50, width: 10, depth: 20, road: 6, zone: 'Y1', typo: 'residential' },
    '100wah': { wah: 100, width: 16, depth: 25, road: 10, zone: 'Y4', typo: 'shophouse' },
    '1rai': { wah: 400, width: 32, depth: 50, road: 12, zone: 'Y7', typo: 'residential' },
    '3rai': { wah: 1200, width: 50, depth: 96, road: 16, zone: 'C3', typo: 'highrise' }
  };

  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pKey = btn.getAttribute('data-preset');
      const p = presets[pKey];
      if (!p) return;

      state.totalSqm = p.wah * SQM_PER_WAH;
      state.widthMeters = p.width;
      state.depthMeters = p.depth;
      state.roadWidth = p.road;
      state.zoneKey = p.zone;
      state.typology = p.typo;

      // Update Form Inputs
      document.getElementById('inputTotalWah').value = p.wah;
      document.getElementById('inputTotalSqm').value = state.totalSqm;
      document.getElementById('inputPlotWidth').value = p.width;
      document.getElementById('inputPlotDepth').value = p.depth;
      document.getElementById('roadWidthSlider').value = p.road;
      document.getElementById('roadCurrentBadge').textContent = `${fmt(p.road, 1)} เมตร`;
      document.getElementById('zoneSelect').value = p.zone;

      // Update road pill
      document.querySelectorAll('#roadPillRow .tactile-pill').forEach(pill => {
        pill.classList.toggle('active', parseFloat(pill.getAttribute('data-road')) === p.road);
      });

      // Update typo pill
      document.querySelectorAll('#typologyGrid .typo-pill').forEach(pill => {
        pill.classList.toggle('active', pill.getAttribute('data-typo')) === p.typo;
      });

      updateDimensionLabels();
      updateChipMeta();
      recalculateFeasibility();
      showToast(`โหลด Preset: ${btn.textContent}`);
    });
  });

  // 8.2 Unit Mode Switcher (Wah / Deed / Sqm)
  document.querySelectorAll('[data-unit-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-unit-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-unit-mode');
      state.activeUnitMode = mode;

      document.getElementById('modeWahContent').classList.toggle('hidden', mode !== 'wah');
      document.getElementById('modeDeedContent').classList.toggle('hidden', mode !== 'deed');
      document.getElementById('modeSqmContent').classList.toggle('hidden', mode !== 'sqm');
    });
  });

  // 8.3 Input Total Wah
  const inputTotalWah = document.getElementById('inputTotalWah');
  inputTotalWah.addEventListener('input', () => {
    const wah = Math.max(1, parseFloat(inputTotalWah.value) || 0);
    state.totalSqm = wah * SQM_PER_WAH;
    autoBalanceDimensions();
    updateChipMeta();
    recalculateFeasibility();
  });

  // 8.4 Deed Inputs
  const deedRai = document.getElementById('deedRai');
  const deedNgan = document.getElementById('deedNgan');
  const deedWah = document.getElementById('deedWah');
  [deedRai, deedNgan, deedWah].forEach(el => {
    el.addEventListener('input', () => {
      const r = parseFloat(deedRai.value) || 0;
      const n = parseFloat(deedNgan.value) || 0;
      const w = parseFloat(deedWah.value) || 0;
      const totalWah = (r * WAH_PER_RAI) + (n * WAH_PER_NGAN) + w;
      state.totalSqm = totalWah * SQM_PER_WAH;
      document.getElementById('inputTotalWah').value = totalWah;
      document.getElementById('inputTotalSqm').value = state.totalSqm;
      autoBalanceDimensions();
      updateChipMeta();
      recalculateFeasibility();
    });
  });

  // 8.5 Input Total Sqm
  const inputTotalSqm = document.getElementById('inputTotalSqm');
  inputTotalSqm.addEventListener('input', () => {
    const sqm = Math.max(4, parseFloat(inputTotalSqm.value) || 0);
    state.totalSqm = sqm;
    document.getElementById('inputTotalWah').value = sqm / SQM_PER_WAH;
    autoBalanceDimensions();
    updateChipMeta();
    recalculateFeasibility();
  });

  // 8.6 Width & Depth Inputs
  const inputPlotWidth = document.getElementById('inputPlotWidth');
  const inputPlotDepth = document.getElementById('inputPlotDepth');

  inputPlotWidth.addEventListener('input', () => {
    state.widthMeters = Math.max(2, parseFloat(inputPlotWidth.value) || 0);
    // sync depth to keep total area or update total area
    state.totalSqm = state.widthMeters * state.depthMeters;
    document.getElementById('inputTotalWah').value = state.totalSqm / SQM_PER_WAH;
    document.getElementById('inputTotalSqm').value = state.totalSqm;
    updateDimensionLabels();
    updateChipMeta();
    recalculateFeasibility();
  });

  inputPlotDepth.addEventListener('input', () => {
    state.depthMeters = Math.max(2, parseFloat(inputPlotDepth.value) || 0);
    state.totalSqm = state.widthMeters * state.depthMeters;
    document.getElementById('inputTotalWah').value = state.totalSqm / SQM_PER_WAH;
    document.getElementById('inputTotalSqm').value = state.totalSqm;
    updateDimensionLabels();
    updateChipMeta();
    recalculateFeasibility();
  });

  // 8.7 Sync Aspect Ratio Button
  document.getElementById('syncAspectBtn').addEventListener('click', () => {
    autoBalanceDimensions();
    recalculateFeasibility();
    showToast('ปรับขนาดแปลงที่ดินให้สมดุลสัดส่วน 1:2 เรียบร้อย');
  });

  // 8.8 Road Width Slider & Pills
  const roadSlider = document.getElementById('roadWidthSlider');
  roadSlider.addEventListener('input', () => {
    setRoadWidth(parseFloat(roadSlider.value));
  });

  document.querySelectorAll('#roadPillRow .tactile-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#roadPillRow .tactile-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = parseFloat(pill.getAttribute('data-road'));
      roadSlider.value = val;
      setRoadWidth(val);
    });
  });

  function setRoadWidth(val) {
    state.roadWidth = val;
    document.getElementById('roadCurrentBadge').textContent = `${fmt(val, 1)} เมตร`;
    recalculateFeasibility();
  }

  // 8.9 Zoning Selector
  const zoneSelect = document.getElementById('zoneSelect');
  zoneSelect.addEventListener('change', () => {
    state.zoneKey = zoneSelect.value;
    recalculateFeasibility();
  });

  // 8.10 Typology Pills
  document.querySelectorAll('#typologyGrid .typo-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#typologyGrid .typo-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.typology = btn.getAttribute('data-typo');
      recalculateFeasibility();
    });
  });

  // 8.11 Price Valuation
  document.getElementById('inputPriceRate').addEventListener('input', updateValuation);
  document.getElementById('selectPriceMode').addEventListener('change', updateValuation);

  // Fold toggle for price
  document.getElementById('togglePriceFoldBtn').addEventListener('click', () => {
    const btn = document.getElementById('togglePriceFoldBtn');
    const content = document.getElementById('priceFoldContent');
    content.classList.toggle('hidden');
    btn.classList.toggle('collapsed');
  });

  // 8.12 Schematic Board Viewport Toggles
  const btnToggleSetback = document.getElementById('btnToggleSetbackHatch');
  btnToggleSetback.addEventListener('click', () => {
    state.showSetbackHatch = !state.showSetbackHatch;
    btnToggleSetback.classList.toggle('active', state.showSetbackHatch);
    recalculateFeasibility();
  });

  const btnToggleDims = document.getElementById('btnToggleDims');
  btnToggleDims.addEventListener('click', () => {
    state.showDims = !state.showDims;
    btnToggleDims.classList.toggle('active', state.showDims);
    recalculateFeasibility();
  });

  document.getElementById('btnCenterPlan').addEventListener('click', () => {
    recalculateFeasibility();
    showToast('ปรับกึ่งกลางมุมมองผัง (Fit to Screen)');
  });

  // 8.13 Legal Drawer Toggle & Tabs
  const drawerHeader = document.getElementById('drawerHeaderToggle');
  const drawerBody = document.getElementById('drawerBody');
  drawerHeader.addEventListener('click', () => {
    drawerBody.classList.toggle('hidden');
    drawerHeader.classList.toggle('collapsed');
    document.getElementById('drawerStateTag').textContent = drawerBody.classList.contains('hidden') ? 'คลิกเพื่อดูรายละเอียด' : 'ซ่อนรายละเอียด';
  });

  document.querySelectorAll('.drawer-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.dtab-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-dtab');
      if (target === 'tier1') document.getElementById('paneTier1').classList.add('active');
      if (target === 'tier2') document.getElementById('paneTier2').classList.add('active');
      if (target === 'matrix') document.getElementById('paneMatrix').classList.add('active');
    });
  });

  // 8.14 Copy Summary Button
  document.getElementById('copySummaryBtn').addEventListener('click', () => {
    const zone = BMA_ZONING_DATA[state.zoneKey];
    const setbacks = calculateLegalSetbacks();
    const wah = state.totalSqm / SQM_PER_WAH;
    const maxGfa = state.totalSqm * zone.far;
    const footprint = Math.min(state.totalSqm * (zone.bcr / 100), setbacks.buildableFootprintGround);
    const openSpace = state.totalSqm * (zone.osr / 100);

    const summaryText = `📐 ARCH // STUDIO — FEASIBILITY REPORT
==========================================
ขนาดที่ดิน: ${fmt(wah, 1)} ตร.ว. (${fmt(state.totalSqm, 1)} ตร.ม.)
มิติแปลงที่ดิน: หน้ากว้าง ${fmt(state.widthMeters, 2)} ม. × ลึก ${fmt(state.depthMeters, 2)} ม.
เขตทาง/ถนน: ${fmt(state.roadWidth, 1)} เมตร
ผังสี กทม.: ${zone.name} (FAR ${zone.far} : OSR ${zone.osr}%)

ดัชนีศักยภาพทางสถาปัตยกรรม:
- พื้นที่อาคารรวมสูงสุด (Max GFA): ${fmt(maxGfa, 1)} ตร.ม.
- พื้นที่ปกคลุมดินชั้นล่าง (Footprint): ${fmt(footprint, 1)} ตร.ม.
- พื้นที่ว่างขั้นต่ำ (Min Open Space): ${fmt(openSpace, 1)} ตร.ม.
- ความสูงอาคารจำกัด: ${fmt(setbacks.heightLimitMeters, 1)} เมตร
- ขอบเขตก่อสร้างได้ (Buildable Envelope): ${fmt(setbacks.buildWidth, 2)} ม. × ${fmt(setbacks.buildDepth, 2)} ม.
==========================================
สร้างรายงานโดย ARCH // STUDIO Workspace`;

    navigator.clipboard.writeText(summaryText).then(() => {
      showToast('คัดลอกสรุปศักยภาพที่ดินเรียบร้อยแล้ว');
    });
  });

  // 8.15 Reset Button
  document.getElementById('resetWorkspaceBtn').addEventListener('click', () => {
    const btn = document.querySelector('[data-preset="50wah"]');
    if (btn) btn.click();
    showToast('รีเซ็ตพารามิเตอร์ทั้งหมดเป็นค่าเริ่มต้น');
  });

  // 8.16 Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`;
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
    }
    recalculateFeasibility();
  }

  const savedTheme = localStorage.getItem('archStudioTheme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  applyTheme(isDark);

  themeToggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme(isDark);
    localStorage.setItem('archStudioTheme', isDark ? 'dark' : 'light');
  });
}

// Helper: Auto balance dimensions to 1:2 aspect ratio
function autoBalanceDimensions() {
  // W : D = 1 : 2 => W * 2W = Area => 2W^2 = Area => W = sqrt(Area / 2)
  const area = state.totalSqm;
  const w = Math.round(Math.sqrt(area / 2.0) * 10) / 10;
  const d = Math.round((area / w) * 10) / 10;
  state.widthMeters = Math.max(3, w);
  state.depthMeters = Math.max(3, d);

  document.getElementById('inputPlotWidth').value = state.widthMeters;
  document.getElementById('inputPlotDepth').value = state.depthMeters;
  updateDimensionLabels();
}

function updateDimensionLabels() {
  document.getElementById('tagPlotWidth').textContent = `${fmt(state.widthMeters, 2)} ม.`;
  document.getElementById('tagPlotDepth').textContent = `${fmt(state.depthMeters, 2)} ม.`;
  const ratio = (state.depthMeters / (state.widthMeters || 1)).toFixed(1);
  document.getElementById('aspectRatioLabel').textContent = ratio;
}

function updateChipMeta() {
  const wah = state.totalSqm / SQM_PER_WAH;
  const rai = Math.floor(wah / WAH_PER_RAI);
  const remWahAfterRai = wah - (rai * WAH_PER_RAI);
  const ngan = Math.floor(remWahAfterRai / WAH_PER_NGAN);
  const w = remWahAfterRai - (ngan * WAH_PER_NGAN);

  document.getElementById('chipSqm').textContent = `${fmt(state.totalSqm, 2)} ตร.ม.`;
  document.getElementById('chipDeed').textContent = `${rai} ไร่ ${ngan} งาน ${fmt(w, 1)} ตร.ว.`;

  document.getElementById('deedRai').value = rai;
  document.getElementById('deedNgan').value = ngan;
  document.getElementById('deedWah').value = parseFloat(w.toFixed(1));
}

// --- 9. Bootstrap on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  autoBalanceDimensions();
  updateChipMeta();
  recalculateFeasibility();
});
