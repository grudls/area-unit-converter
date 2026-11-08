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

  // --- Update Road Gatekeeper Alert Banner & GFA Tile State ---
  const bannerStatus = updateRoadGatekeeperBanner(setbacks, zone);

  const valMaxGfaEl = document.getElementById('valMaxGfa');
  const tileGfaEl = document.getElementById('tileGfa');
  const tagGfaEl = document.getElementById('tagGfa');
  const noteGfaEl = document.getElementById('noteGfa');

  if (bannerStatus === 'violation') {
    valMaxGfaEl.classList.add('gfa-violation');
    if (tileGfaEl) tileGfaEl.classList.add('tile-violation');
    if (tagGfaEl) tagGfaEl.textContent = 'PROHIBITED';
    if (noteGfaEl) noteGfaEl.textContent = '⛔ ไม่อนุญาตให้ก่อสร้าง (ขัดต่อกฎกระทรวง)';
  } else if (bannerStatus === 'warning') {
    valMaxGfaEl.classList.remove('gfa-violation');
    if (tileGfaEl) tileGfaEl.classList.remove('tile-violation');
    if (tagGfaEl) tagGfaEl.textContent = 'RESTRICTED';
    if (noteGfaEl) {
      if (state.roadWidth < 6.0) {
        noteGfaEl.textContent = '⚠️ จำกัดพื้นที่อาคารรวมไม่เกิน 2,000 ตร.ม. (ข้อ 54)';
      } else {
        noteGfaEl.textContent = '⚠️ มีเงื่อนไขข้อจำกัดขนาดอาคารตามเขตทาง';
      }
    }
  } else {
    valMaxGfaEl.classList.remove('gfa-violation');
    if (tileGfaEl) tileGfaEl.classList.remove('tile-violation');
    if (tagGfaEl) tagGfaEl.textContent = 'MAX ALLOWED';
    if (noteGfaEl) noteGfaEl.textContent = 'พื้นที่อาคารรวมทุกชั้นสูงสุดตาม FAR';
  }

  // --- Update Hero Metric Tiles ---
  valMaxGfaEl.textContent = fmt(maxGfa, 1);
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

// --- 4.5 Road Gatekeeper Alert Banner Engine ---
function updateRoadGatekeeperBanner(setbacks, zone) {
  const banner = document.getElementById('roadGatekeeperBanner');
  const iconBox = document.getElementById('gatekeeperIconBox');
  const pill = document.getElementById('gatekeeperPill');
  const title = document.getElementById('gatekeeperTitle');
  const desc = document.getElementById('gatekeeperDesc');

  if (!banner || !iconBox || !pill || !title || !desc) return 'pass';

  const road = state.roadWidth;
  const typo = state.typology;
  const typoNames = {
    residential: 'บ้านเดี่ยว / พักอาศัย',
    shophouse: 'อาคารพาณิชย์ / ตึกแถว',
    highrise: 'อาคารขนาดใหญ่ / คอนโด'
  };
  const typoName = typoNames[typo] || 'อาคารพักอาศัย';

  let status = 'pass';
  let pillText = '✓ ถูกต้องตามกฎหมาย';
  let titleText = '✓ ถูกต้องตามกฎหมาย: ผ่านเกณฑ์ความกว้างเขตทางสำหรับประเภทอาคารที่เลือก';
  let descText = `ถนนสาธารณะกว้าง ${fmt(road, 1)} ม. สอดคล้องตามเกณฑ์ควบคุมอาคารสำหรับ${typoName} สามารถพัฒนาโครงการได้ตามข้อกำหนดผังเมืองและระยะร่น`;
  let iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

  // 1. Error / Violation (สร้างไม่ได้ - ผิดกฎหมาย)
  if (typo === 'highrise' && road < 10.0) {
    status = 'violation';
    pillText = '⛔ ผิดกฎหมาย';
    titleText = `⛔ ผิดกฎหมาย: ไม่สามารถก่อสร้างอาคารประเภทนี้ได้ เนื่องจากเขตทางถนนสาธารณะกว้างเพียง ${fmt(road, 1)} ม. (ขั้นต่ำต้องไม่น้อยกว่า 10.00 ม. ตามกฎกระทรวง ฉบับที่ 33)`;
    descText = `ตามกฎกระทรวง ฉบับที่ 33 อาคารสูงหรืออาคารขนาดใหญ่พิเศษต้องมีเขตทางถนนสาธารณะกว้างไม่น้อยกว่า 10.00 ม. เชื่อมต่อไปยังถนนสาธารณะสายหลักที่มีเขตทางกว้างกว่า`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else if (setbacks.buildWidth <= 0 || setbacks.buildDepth <= 0) {
    status = 'violation';
    pillText = '⛔ ผิดกฎหมาย';
    titleText = '⛔ ผิดกฎหมาย: ไม่สามารถก่อสร้างได้ เนื่องจากระยะร่นตามกฎหมายกินพื้นที่เกินขนาดแปลงที่ดิน';
    descText = `ขนาดที่ดิน ${fmt(state.widthMeters, 1)} × ${fmt(state.depthMeters, 1)} ม. เมื่อหักระยะร่นรอบแปลงแล้วไม่มีพื้นที่เหลือเพียงพอสำหรับก่อสร้างอาคาร`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else if (typo === 'shophouse' && road < 4.0) {
    status = 'violation';
    pillText = '⛔ ผิดกฎหมาย';
    titleText = `⛔ ผิดกฎหมาย: ไม่สามารถสร้างอาคารพาณิชย์/ตึกแถวได้ เนื่องจากเขตทางถนนกว้างเพียง ${fmt(road, 1)} ม. (ขั้นต่ำต้องไม่น้อยกว่า 4.00 ม. ตามกฎกระทรวง ฉบับที่ 55 ข้อ 36)`;
    descText = `อาคารพาณิชย์หรือตึกแถวต้องอยู่ติดถนนสาธารณะที่มีเขตทางกว้างไม่น้อยกว่า 4.00 ม. (ปัจจุบัน ${fmt(road, 1)} ม.)`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  }
  // 2. Warning (ติดเงื่อนไข)
  else if (road < 6.0) {
    status = 'warning';
    pillText = '⚠️ ติดเงื่อนไข';
    titleText = 'ติดเงื่อนไข: จำกัดพื้นที่อาคารรวมไม่เกิน 2,000 ตร.ม. (ข้อ 54)';
    descText = `ซอยหรือถนนสาธารณะแคบกว่า 6.00 ม. (ปัจจุบัน ${fmt(road, 1)} ม.) ตามกฎกระทรวง ฉบับที่ 55 ข้อ 54 ห้ามสร้างอาคารพาณิชย์ขนาดใหญ่หรืออาคารอยู่อาศัยรวม และต้องร่นจากกึ่งกลางถนนไม่น้อยกว่า 3.00 ม.`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  } else if (typo === 'highrise' && road >= 10.0 && road < 18.0) {
    status = 'warning';
    pillText = '⚠️ ติดเงื่อนไข';
    titleText = 'ติดเงื่อนไข: จำกัดพื้นที่อาคารรวมไม่เกิน 10,000 ตร.ม. (เขตทาง 10 - 18 ม.)';
    descText = `หากพัฒนาเป็นอาคารขนาดใหญ่พิเศษเกิน 10,000 ตร.ม. ต้องอยู่ติดถนนสาธารณะกว้างตั้งแต่ 18.00 ม. ขึ้นไป (ปัจจุบัน ${fmt(road, 1)} ม. สามารถสร้างได้ไม่เกินเกณฑ์ 10,000 ตร.ม.)`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  } else if (setbacks.buildWidth < 4.0) {
    status = 'warning';
    pillText = '⚠️ ติดเงื่อนไข';
    titleText = `ติดเงื่อนไข: หน้ากว้างอาคารก่อสร้างได้แคบมาก (${fmt(setbacks.buildWidth, 2)} ม.)`;
    descText = `ระยะร่นด้านข้างทำให้เหลือความกว้างก่อสร้างน้อยกว่า 4.00 ม. ควรพิจารณาทำผนังทึบชิดเขตที่ดินโดยได้รับความยินยอมเป็นหนังสือ`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  }

  banner.className = `road-gatekeeper-banner ${status}`;
  pill.textContent = pillText;
  title.textContent = titleText;
  desc.textContent = descText;
  iconBox.innerHTML = iconSvg;

  return status;
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

  // Layout Boundaries & Clear Architectural Offsets
  const roadTop = 26;
  const roadH = 46;
  const roadBottom = roadTop + roadH;
  const roadCenterY = roadTop + roadH / 2;
  const roadGap = 32; // Vertical offset between road and plot front
  const plotStartY = roadBottom + roadGap; // 104px

  // Maximum domain for plot to leave ample room for external dimensions and margins
  const maxPlotW = 460;
  const maxPlotH = 320;
  const scale = Math.min(maxPlotW / Math.max(W, 8), maxPlotH / Math.max(D, 10));

  const plotPixelW = W * scale;
  const plotPixelH = D * scale;
  const plotBottomY = plotStartY + plotPixelH;

  // Position plot horizontally with room on left and right for dimensions
  const startX = (viewW - 140 - plotPixelW) / 2 + 30;

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
  const roadBg = isDark ? '#1C222A' : '#E8ECEF';
  const roadLineColor = isDark ? '#64748B' : '#94A3B8';
  const dimColor = isDark ? '#94A3B8' : '#475569';
  const setbackStroke = isDark ? '#F87171' : '#DC2626';
  const setbackFill = isDark ? 'rgba(248, 113, 113, 0.14)' : 'rgba(220, 38, 38, 0.08)';
  const buildStroke = isDark ? '#4ADE80' : '#16A34A';
  const buildFill = isDark ? 'rgba(74, 222, 128, 0.18)' : 'rgba(34, 197, 94, 0.14)';
  const badgeCardBg = isDark ? '#14181E' : '#FFFFFF';
  const setbackBadgeBg = isDark ? '#1C1617' : '#FFFFFF';

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

    <!-- 1. PUBLIC ROAD STRIP (TOP ZONE) -->
    <rect x="${startX - 70}" y="${roadTop}" width="${plotPixelW + 140}" height="${roadH}" rx="4" fill="${roadBg}" opacity="0.9" />
    <!-- Road Centerline -->
    <line x1="${startX - 80}" y1="${roadCenterY}" x2="${startX + plotPixelW + 80}" y2="${roadCenterY}" stroke="${roadLineColor}" stroke-dasharray="8 6" stroke-width="1.5" />
    <!-- Road Boundary Line (South edge of road) -->
    <line x1="${startX - 70}" y1="${roadBottom}" x2="${startX + plotPixelW + 70}" y2="${roadBottom}" stroke="${roadLineColor}" stroke-width="1.5" />

    <!-- Road Title Pill Badge (Center over road, prevents line clash) -->
    <g transform="translate(${startX + plotPixelW / 2}, ${roadCenterY})">
      <rect x="-115" y="-12" width="230" height="24" rx="12" fill="${badgeCardBg}" stroke="${roadLineColor}" stroke-width="1.2" />
      <text x="0" y="4" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${isDark ? '#E2E8F0' : '#1E293B'}">
        ถนนสาธารณะ (เขตทาง ${fmt(road, 1)} ม.)
      </text>
    </g>

    <!-- Visual Gap / Offset Indicator between Road and Plot -->
    <text x="${startX + plotPixelW / 2}" y="${roadBottom + 19}" text-anchor="middle" font-family="'Prompt', sans-serif" font-size="10" font-weight="500" fill="${dimColor}" opacity="0.85">
      แนวเขตทางถนนสาธารณะ ⮯
    </text>

    <!-- 2. PLOT BOUNDARY (MAIN SITE) -->
    <!-- Plot Identity Tag placed outside top-left -->
    <text x="${startX}" y="${plotStartY - 8}" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${strokeColor}">
      แนวเขตที่ดิน (${fmt(W, 1)}ม. × ${fmt(D, 1)}ม.)
    </text>
    <!-- Plot Boundary Rectangle -->
    <rect x="${startX}" y="${plotStartY}" width="${plotPixelW}" height="${plotPixelH}" fill="${badgeCardBg}" stroke="${strokeColor}" stroke-width="2.5" />

    <!-- Corner Survey Marks (Tick Crosses) -->
    <g stroke="${strokeColor}" stroke-width="1.2">
      <line x1="${startX - 5}" y1="${plotStartY}" x2="${startX + 5}" y2="${plotStartY}" />
      <line x1="${startX}" y1="${plotStartY - 5}" x2="${startX}" y2="${plotStartY + 5}" />
      <line x1="${startX + plotPixelW - 5}" y1="${plotStartY}" x2="${startX + plotPixelW + 5}" y2="${plotStartY}" />
      <line x1="${startX + plotPixelW}" y1="${plotStartY - 5}" x2="${startX + plotPixelW}" y2="${plotStartY + 5}" />
      <line x1="${startX - 5}" y1="${plotBottomY}" x2="${startX + 5}" y2="${plotBottomY}" />
      <line x1="${startX}" y1="${plotBottomY - 5}" x2="${startX}" y2="${plotBottomY + 5}" />
      <line x1="${startX + plotPixelW - 5}" y1="${plotBottomY}" x2="${startX + plotPixelW + 5}" y2="${plotBottomY}" />
      <line x1="${startX + plotPixelW}" y1="${plotBottomY - 5}" x2="${startX + plotPixelW}" y2="${plotBottomY + 5}" />
    </g>

    <!-- 3. SETBACK REGIONS WITH PROTECTED PILL BADGES (NO HATCH CUTTING) -->
    ${state.showSetbackHatch ? `
      <!-- Front Setback Strip -->
      <rect x="${startX}" y="${plotStartY}" width="${plotPixelW}" height="${frontSetbackPx}" fill="url(#setbackHatch)" stroke="${setbackStroke}" stroke-dasharray="4 3" stroke-width="1" />
      <g transform="translate(${startX + plotPixelW / 2}, ${plotStartY + frontSetbackPx / 2})">
        <rect x="-62" y="-10" width="124" height="20" rx="10" fill="${setbackBadgeBg}" stroke="${setbackStroke}" stroke-width="1.2" />
        <text x="0" y="4" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${setbackStroke}" text-anchor="middle">
          ร่นหน้า ${fmt(setbacks.front, 2)} ม.
        </text>
      </g>

      <!-- Rear Setback Strip -->
      <rect x="${startX}" y="${plotBottomY - rearSetbackPx}" width="${plotPixelW}" height="${rearSetbackPx}" fill="url(#setbackHatch)" stroke="${setbackStroke}" stroke-dasharray="4 3" stroke-width="1" />
      <g transform="translate(${startX + plotPixelW / 2}, ${plotBottomY - rearSetbackPx / 2})">
        <rect x="-62" y="-10" width="124" height="20" rx="10" fill="${setbackBadgeBg}" stroke="${setbackStroke}" stroke-width="1.2" />
        <text x="0" y="4" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="${setbackStroke}" text-anchor="middle">
          ร่นหลัง ${fmt(setbacks.rear, 2)} ม.
        </text>
      </g>

      <!-- Left Side Setback Strip -->
      ${setbacks.sideLeft > 0 ? `
        <rect x="${startX}" y="${plotStartY + frontSetbackPx}" width="${sideLeftSetbackPx}" height="${buildH}" fill="url(#setbackHatch)" stroke="${setbackStroke}" stroke-dasharray="4 3" stroke-width="1" />
        ${sideLeftSetbackPx >= 22 ? `
          <g transform="translate(${startX + sideLeftSetbackPx / 2}, ${plotStartY + frontSetbackPx + buildH / 2}) rotate(-90)">
            <rect x="-56" y="-9" width="112" height="18" rx="9" fill="${setbackBadgeBg}" stroke="${setbackStroke}" stroke-width="1" />
            <text x="0" y="4" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${setbackStroke}" text-anchor="middle">
              ร่นข้าง ${fmt(setbacks.sideLeft, 2)} ม.
            </text>
          </g>
        ` : ''}
      ` : ''}

      <!-- Right Side Setback Strip -->
      ${setbacks.sideRight > 0 ? `
        <rect x="${startX + plotPixelW - sideRightSetbackPx}" y="${plotStartY + frontSetbackPx}" width="${sideRightSetbackPx}" height="${buildH}" fill="url(#setbackHatch)" stroke="${setbackStroke}" stroke-dasharray="4 3" stroke-width="1" />
        ${sideRightSetbackPx >= 22 ? `
          <g transform="translate(${startX + plotPixelW - sideRightSetbackPx / 2}, ${plotStartY + frontSetbackPx + buildH / 2}) rotate(90)">
            <rect x="-56" y="-9" width="112" height="18" rx="9" fill="${setbackBadgeBg}" stroke="${setbackStroke}" stroke-width="1" />
            <text x="0" y="4" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="${setbackStroke}" text-anchor="middle">
              ร่นข้าง ${fmt(setbacks.sideRight, 2)} ม.
            </text>
          </g>
        ` : ''}
      ` : ''}
    ` : ''}

    <!-- 4. BUILDABLE ENVELOPE (POLYGON WITH HATCH) -->
    ${buildW > 0 && buildH > 0 ? `
      <rect x="${buildX}" y="${buildY}" width="${buildW}" height="${buildH}" fill="${buildFill}" stroke="${buildStroke}" stroke-width="2.5" />
      <rect x="${buildX}" y="${buildY}" width="${buildW}" height="${buildH}" fill="url(#buildableHatch)" />
      
      <!-- Center Buildable Badge (Elevated Card with Shadow) -->
      <g transform="translate(${buildX + buildW / 2}, ${buildY + buildH / 2})">
        <rect x="-95" y="-22" width="190" height="44" rx="8" fill="${badgeCardBg}" stroke="${buildStroke}" stroke-width="2" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.14))" />
        <text x="0" y="-4" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="${buildStroke}" letter-spacing="0.06em" text-anchor="middle">
          BUILDABLE ENVELOPE
        </text>
        <text x="0" y="13" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" fill="${isDark ? '#F1F5F9' : '#1E293B'}" text-anchor="middle">
          ${fmt(setbacks.buildWidth, 2)}ม. × ${fmt(setbacks.buildDepth, 2)}ม. (${fmt(setbacks.buildableFootprintGround, 1)} ตร.ม.)
        </text>
      </g>
    ` : `
      <g transform="translate(${startX + plotPixelW / 2}, ${plotStartY + plotPixelH / 2})">
        <rect x="-115" y="-18" width="230" height="36" rx="8" fill="#FEE2E2" stroke="#EF4444" stroke-width="1.8" />
        <text x="0" y="5" font-family="'Prompt', sans-serif" font-size="12" font-weight="700" fill="#B91C1C" text-anchor="middle">
          ⚠️ ระยะร่นเกินขนาดแปลงที่ดิน
        </text>
      </g>
    `}

    <!-- 5. ARCHITECTURAL EXTERIOR DIMENSION LINES (OUTSIDE PLOT) -->
    ${state.showDims ? `
      <!-- Bottom Width Dimension Line (Below Plot) -->
      <g stroke="${dimColor}" stroke-width="1.2">
        <!-- Witness Lines extending from plot bottom corners down -->
        <line x1="${startX}" y1="${plotBottomY + 4}" x2="${startX}" y2="${plotBottomY + 44}" opacity="0.65" />
        <line x1="${startX + plotPixelW}" y1="${plotBottomY + 4}" x2="${startX + plotPixelW}" y2="${plotBottomY + 44}" opacity="0.65" />
        <!-- Dimension Line -->
        <line x1="${startX}" y1="${plotBottomY + 34}" x2="${startX + plotPixelW}" y2="${plotBottomY + 34}" stroke-width="1.5" />
        <!-- 45-degree Architectural Tick Marks -->
        <line x1="${startX - 5}" y1="${plotBottomY + 39}" x2="${startX + 5}" y2="${plotBottomY + 29}" stroke-width="2.2" />
        <line x1="${startX + plotPixelW - 5}" y1="${plotBottomY + 39}" x2="${startX + plotPixelW + 5}" y2="${plotBottomY + 29}" stroke-width="2.2" />
      </g>
      <!-- Width Dimension Text Pill Badge -->
      <g transform="translate(${startX + plotPixelW / 2}, ${plotBottomY + 34})">
        <rect x="-65" y="-11" width="130" height="22" rx="4" fill="${badgeCardBg}" stroke="${dimColor}" stroke-width="1" />
        <text x="0" y="4" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${dimColor}" text-anchor="middle">
          หน้ากว้าง ${fmt(W, 2)} ม.
        </text>
      </g>

      <!-- Right Depth Dimension Line (To the Right of Plot) -->
      <g stroke="${dimColor}" stroke-width="1.2">
        <!-- Witness Lines extending from plot right corners out -->
        <line x1="${startX + plotPixelW + 4}" y1="${plotStartY}" x2="${startX + plotPixelW + 46}" y2="${plotStartY}" opacity="0.65" />
        <line x1="${startX + plotPixelW + 4}" y1="${plotBottomY}" x2="${startX + plotPixelW + 46}" y2="${plotBottomY}" opacity="0.65" />
        <!-- Dimension Line -->
        <line x1="${startX + plotPixelW + 36}" y1="${plotStartY}" x2="${startX + plotPixelW + 36}" y2="${plotBottomY}" stroke-width="1.5" />
        <!-- 45-degree Architectural Tick Marks -->
        <line x1="${startX + plotPixelW + 31}" y1="${plotStartY + 5}" x2="${startX + plotPixelW + 41}" y2="${plotStartY - 5}" stroke-width="2.2" />
        <line x1="${startX + plotPixelW + 31}" y1="${plotBottomY + 5}" x2="${startX + plotPixelW + 41}" y2="${plotBottomY - 5}" stroke-width="2.2" />
      </g>
      <!-- Depth Dimension Text Pill Badge (Upright beside line) -->
      <g transform="translate(${startX + plotPixelW + 48}, ${plotStartY + plotPixelH / 2})">
        <rect x="0" y="-12" width="116" height="24" rx="4" fill="${badgeCardBg}" stroke="${dimColor}" stroke-width="1" />
        <text x="58" y="4" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${dimColor}" text-anchor="middle">
          ความลึก ${fmt(D, 2)} ม.
        </text>
      </g>
    ` : ''}
  `;

  svg.innerHTML = svgContent;
  document.getElementById('canvasScaleTag').textContent = `SCALE ~1:${Math.round(100 / (scale / 4))}`;
}

// --- 8. Event Listeners & Interactive Handlers ---
function initEventListeners() {
  // 8.1 Unit Mode Switcher (Wah / Deed / Sqm)
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

  // 8.4 Deed Inputs (Rai - Ngan - Wah) with Rollover & Validation
  const deedRai = document.getElementById('deedRai');
  const deedNgan = document.getElementById('deedNgan');
  const deedWah = document.getElementById('deedWah');

  function calculateFromDeed() {
    const r = Math.max(0, parseInt(deedRai.value) || 0);
    const n = Math.max(0, parseInt(deedNgan.value) || 0);
    const w = Math.max(0, parseFloat(deedWah.value) || 0);
    const totalWah = (r * WAH_PER_RAI) + (n * WAH_PER_NGAN) + w;
    state.totalSqm = totalWah * SQM_PER_WAH;
    document.getElementById('inputTotalWah').value = totalWah;
    document.getElementById('inputTotalSqm').value = state.totalSqm;
    autoBalanceDimensions();
    updateChipMeta(false);
    recalculateFeasibility();
  }

  function normalizeDeedInputs() {
    let r = Math.max(0, parseInt(deedRai.value) || 0);
    let n = Math.max(0, parseInt(deedNgan.value) || 0);
    let w = Math.max(0, parseFloat(deedWah.value) || 0);
    let rolledOver = false;

    // ตารางวา: สูงสุดไม่เกิน 99.9 (ถ้ากรอกตั้งแต่ 100 ให้ปัดทดเป็นงาน)
    if (w >= 100) {
      const extraNgan = Math.floor(w / 100);
      w = Number((w % 100).toFixed(1));
      n += extraNgan;
      rolledOver = true;
    }

    // งาน: สูงสุดไม่เกิน 3 (ถ้ากรอกเกิน 3 ให้ปัดทดเป็นไร่)
    if (n > 3) {
      const extraRai = Math.floor(n / 4);
      n = n % 4;
      r += extraRai;
      rolledOver = true;
    }

    deedRai.value = r;
    deedNgan.value = n;
    deedWah.value = w;

    const totalWah = (r * WAH_PER_RAI) + (n * WAH_PER_NGAN) + w;
    state.totalSqm = totalWah * SQM_PER_WAH;
    document.getElementById('inputTotalWah').value = totalWah;
    document.getElementById('inputTotalSqm').value = state.totalSqm;

    autoBalanceDimensions();
    updateChipMeta(true);
    recalculateFeasibility();

    if (rolledOver) {
      showToast(`ปัดทดหน่วยโฉนด: ${r} ไร่ ${n} งาน ${w} ตร.ว.`);
    }
  }

  [deedRai, deedNgan, deedWah].forEach(el => {
    el.addEventListener('input', calculateFromDeed);
    el.addEventListener('change', normalizeDeedInputs);
    el.addEventListener('blur', normalizeDeedInputs);
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
    state.totalSqm = 200.0;
    state.widthMeters = 10.0;
    state.depthMeters = 20.0;
    state.roadWidth = 6.0;
    state.zoneKey = 'Y1';
    state.typology = 'residential';
    state.priceRate = 65000;
    state.priceMode = 'perWah';

    document.getElementById('inputTotalWah').value = 50;
    document.getElementById('inputTotalSqm').value = 200;
    document.getElementById('inputPlotWidth').value = 10;
    document.getElementById('inputPlotDepth').value = 20;
    document.getElementById('roadWidthSlider').value = 6;
    document.getElementById('roadCurrentBadge').textContent = '6.0 เมตร';
    document.getElementById('zoneSelect').value = 'Y1';

    document.querySelectorAll('#roadPillRow .tactile-pill').forEach(pill => {
      pill.classList.toggle('active', parseFloat(pill.getAttribute('data-road')) === 6.0);
    });

    document.querySelectorAll('#typologyGrid .typo-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-typo') === 'residential');
    });

    autoBalanceDimensions();
    updateChipMeta();
    recalculateFeasibility();
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

function updateChipMeta(syncInputs = true) {
  const wah = state.totalSqm / SQM_PER_WAH;
  const roundedWah = Math.round(wah * 10) / 10;
  const rai = Math.floor(roundedWah / WAH_PER_RAI);
  const remWahAfterRai = Math.round((roundedWah - (rai * WAH_PER_RAI)) * 10) / 10;
  const ngan = Math.floor(remWahAfterRai / WAH_PER_NGAN);
  const w = Math.round((remWahAfterRai - (ngan * WAH_PER_NGAN)) * 10) / 10;

  document.getElementById('chipSqm').textContent = `${fmt(state.totalSqm, 2)} ตร.ม.`;
  document.getElementById('chipDeed').textContent = `${rai} ไร่ ${ngan} งาน ${fmt(w, 1)} ตร.ว.`;

  if (syncInputs) {
    document.getElementById('deedRai').value = rai;
    document.getElementById('deedNgan').value = ngan;
    document.getElementById('deedWah').value = w;
  }
}

// --- 9. Bootstrap on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  autoBalanceDimensions();
  updateChipMeta();
  recalculateFeasibility();
});
