/**
 * ARCH // STUDIO — Land Feasibility & Schematic Workspace
 * Engine: Zoning Rules, Typology-Specific Legal Setbacks, 2D Schematic Plan & 3D Isometric Massing
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
  activeUnitMode: 'wah',
  viewMode: '2d', // '2d' | '3d'
  lastBannerStatus: 'pass',
  deedDefaultWahUntouched: true
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
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// --- 3. Legal Setback Calculation Engine (MR 55 / MR 33 / BMA Regulations) ---
function calculateLegalSetbacks() {
  const road = state.roadWidth;
  const typo = state.typology;

  let frontSetback = 2.0;
  let rearSetback = 2.0;
  let sideLeftSetback = 2.0;
  let sideRightSetback = 2.0;
  let heightLimitMeters = 15.0;
  let heightRuleDesc = '';

  // 3.1 Front Setback from Road (กฎกระทรวง 55 ข้อ 34 / ข้อ 54)
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

  // 3.2 Side & Rear Setbacks based on Typology (Typology-Specific Setbacks)
  if (typo === 'residential') {
    // บ้านพักอาศัย / บ้านเดี่ยว: ด้านข้าง 2.00 ม. (ช่องเปิด), ด้านหลัง 2.00 ม.
    sideLeftSetback = 2.0;
    sideRightSetback = 2.0;
    rearSetback = 2.0;
  } else if (typo === 'shophouse') {
    // อาคารพาณิชย์ / ตึกแถว: ผนังทึบชิดเขตที่ดิน (0.00 ม.), ด้านหลัง 3.00 ม. (ที่ว่างติดต่อกัน)
    sideLeftSetback = 0.0;
    sideRightSetback = 0.0;
    rearSetback = 3.0;
  } else if (typo === 'highrise') {
    // อาคารขนาดใหญ่ / คอนโดมิเนียม: ร่นรอบอาคารทุกด้าน 6.00 ม. (เขตทางวิ่งรถดับเพลิง กฎกระทรวง ฉบับที่ 33/55)
    const baseSetback = 6.0;
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
  const minOpenSpace = state.totalSqm * (zone.osr / 100.0);

  // 4.4 Max Estimated Floors
  const estFloors = Math.max(1, Math.floor(setbacks.heightLimitMeters / 3.2));

  // --- Update Road Gatekeeper Alert Banner & GFA Tile State ---
  const bannerStatus = updateRoadGatekeeperBanner(setbacks, zone);
  state.lastBannerStatus = bannerStatus;

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

  const ruleSideTextEl = document.getElementById('ruleSideText');
  if (ruleSideTextEl) {
    if (state.typology === 'residential') {
      ruleSideTextEl.textContent = 'บ้านพักอาศัย / บ้านเดี่ยว: ด้านข้างร่น 2.00 ม. (ช่องเปิด) และด้านหลังร่น 2.00 ม. จากแนวเขตที่ดิน';
    } else if (state.typology === 'shophouse') {
      ruleSideTextEl.textContent = 'อาคารพาณิชย์ / ตึกแถว: ด้านข้างผนังทึบชิดเขตที่ดิน (0.00 ม.) หรือร่นตามกรณีมีช่องเปิด และด้านหลังร่น 3.00 ม. (ที่ว่างติดต่อกัน)';
    } else {
      ruleSideTextEl.textContent = 'อาคารขนาดใหญ่ / คอนโดมิเนียม: ร่นรอบอาคารทุกด้าน 6.00 ม. โดยรอบแปลงที่ดิน (เขตทางวิ่งรถดับเพลิง กฎกระทรวง ฉบับที่ 33/55)';
    }
  }

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

  // Re-render 2D Plan or 3D Isometric SVG
  renderSchematicSvg(setbacks);
}

// --- 4.5 Road Gatekeeper Alert Banner Engine (Single Clean Header Line) ---
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
  let titleText = 'ผ่านเกณฑ์ความกว้างเขตทางสำหรับประเภทอาคารที่เลือก';
  let descText = `ถนนสาธารณะกว้าง ${fmt(road, 1)} ม. สอดคล้องตามเกณฑ์ควบคุมอาคารสำหรับ${typoName} สามารถพัฒนาโครงการได้ตามข้อกำหนดผังเมืองและระยะร่น`;
  let iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

  // 1. Error / Violation (สร้างไม่ได้ - ผิดกฎหมาย)
  if (typo === 'highrise' && road < 10.0) {
    status = 'violation';
    pillText = '⛔ ผิดกฎหมาย';
    titleText = `ไม่สามารถก่อสร้างอาคารประเภทนี้ได้ เนื่องจากเขตทางถนนสาธารณะกว้างเพียง ${fmt(road, 1)} ม. (ขั้นต่ำต้องไม่น้อยกว่า 10.00 ม. ตามกฎกระทรวง ฉบับที่ 33)`;
    descText = `ตามกฎกระทรวง ฉบับที่ 33 อาคารสูงหรืออาคารขนาดใหญ่พิเศษต้องมีเขตทางถนนสาธารณะกว้างไม่น้อยกว่า 10.00 ม. เชื่อมต่อไปยังถนนสาธารณะสายหลักที่มีเขตทางกว้างกว่า`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else if (setbacks.buildWidth <= 0 || setbacks.buildDepth <= 0) {
    status = 'violation';
    pillText = '⛔ ผิดกฎหมาย';
    titleText = 'ไม่สามารถก่อสร้างได้ เนื่องจากระยะร่นตามกฎหมายกินพื้นที่เกินขนาดแปลงที่ดิน';
    descText = `ขนาดที่ดิน ${fmt(state.widthMeters, 1)} × ${fmt(state.depthMeters, 1)} ม. เมื่อหักระยะร่นรอบแปลงแล้วไม่มีพื้นที่เหลือเพียงพอสำหรับก่อสร้างอาคาร`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else if (typo === 'shophouse' && road < 4.0) {
    status = 'violation';
    pillText = '⛔ ผิดกฎหมาย';
    titleText = `ไม่สามารถสร้างอาคารพาณิชย์/ตึกแถวได้ เนื่องจากเขตทางถนนกว้างเพียง ${fmt(road, 1)} ม. (ขั้นต่ำต้องไม่น้อยกว่า 4.00 ม. ตามกฎกระทรวง ฉบับที่ 55 ข้อ 36)`;
    descText = `อาคารพาณิชย์หรือตึกแถวต้องอยู่ติดถนนสาธารณะที่มีเขตทางกว้างไม่น้อยกว่า 4.00 ม. (ปัจจุบัน ${fmt(road, 1)} ม.)`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  }
  // 2. Warning (ติดเงื่อนไข)
  else if (road < 6.0) {
    status = 'warning';
    pillText = '⚠️ ติดเงื่อนไข';
    titleText = 'จำกัดพื้นที่อาคารรวมไม่เกิน 2,000 ตร.ม. (ข้อ 54)';
    descText = `ซอยหรือถนนสาธารณะแคบกว่า 6.00 ม. (ปัจจุบัน ${fmt(road, 1)} ม.) ตามกฎกระทรวง ฉบับที่ 55 ข้อ 54 ห้ามสร้างอาคารพาณิชย์ขนาดใหญ่หรืออาคารอยู่อาศัยรวม และต้องร่นจากกึ่งกลางถนนไม่น้อยกว่า 3.00 ม.`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  } else if (typo === 'highrise' && road >= 10.0 && road < 18.0) {
    status = 'warning';
    pillText = '⚠️ ติดเงื่อนไข';
    titleText = 'จำกัดพื้นที่อาคารรวมไม่เกิน 10,000 ตร.ม. (เขตทาง 10 - 18 ม.)';
    descText = `หากพัฒนาเป็นอาคารขนาดใหญ่พิเศษเกิน 10,000 ตร.ม. ต้องอยู่ติดถนนสาธารณะกว้างตั้งแต่ 18.00 ม. ขึ้นไป (ปัจจุบัน ${fmt(road, 1)} ม. สามารถสร้างได้ไม่เกินเกณฑ์ 10,000 ตร.ม.)`;
    iconSvg = `<svg class="gk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  } else if (setbacks.buildWidth < 4.0) {
    status = 'warning';
    pillText = '⚠️ ติดเงื่อนไข';
    titleText = `หน้ากว้างอาคารก่อสร้างได้แคบมาก (${fmt(setbacks.buildWidth, 2)} ม.)`;
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

// --- 7. Visualizer Engine: 2D Schematic Plan & 3D Isometric Massing (SVG) ---

const THAI_COMBINING = /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g;

function svgEsc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function estTextWidth(str, fontSize) {
  const visible = String(str).replace(THAI_COMBINING, '').length;
  return visible * fontSize * 0.6;
}

/**
 * Pill badge with solid background so text never sinks into hatch patterns.
 */
function svgBadge(x, y, lines, o = {}) {
  const fs = o.fontSize || 10;
  const subFs = Math.max(8.5, fs - 1.2);
  const padX = 9;
  const lineH = fs + 4;
  const arr = (Array.isArray(lines) ? lines : [lines]).filter(Boolean);
  const widths = arr.map((l, i) => estTextWidth(l, i === 0 ? fs : subFs));
  const w = Math.ceil(Math.max(...widths) + padX * 2);
  const h = Math.ceil(arr.length * lineH + 6);
  const align = o.align || 'middle';
  const rx0 = align === 'middle' ? -w / 2 : align === 'end' ? -w : 0;
  const rot = o.rotate ? ` rotate(${o.rotate})` : '';
  const texts = arr.map((l, i) => {
    const ty = -h / 2 + 3 + lineH * i + (i === 0 ? fs : subFs) + 0.5;
    return `<text x="${rx0 + w / 2}" y="${ty}" text-anchor="middle" font-family="'Prompt', sans-serif" font-size="${i === 0 ? fs : subFs}" font-weight="${i === 0 ? 700 : 500}" fill="${o.color}">${svgEsc(l)}</text>`;
  }).join('');
  const svg = `<g class="${o.cls || 'svg-badge'}" transform="translate(${x}, ${y})${rot}">
      <rect x="${rx0}" y="${-h / 2}" width="${w}" height="${h}" rx="${Math.min(10, h / 2)}" fill="${o.bg}" stroke="${o.stroke || o.color}" stroke-width="${o.strokeWidth || 1.2}" />
      ${texts}
    </g>`;
  return { svg, w, h };
}

function measureBadge(lines, fontSize = 10) {
  return svgBadge(0, 0, lines, { fontSize, color: '#000', bg: '#fff' });
}

function layoutColumn(items, gap, yMin, yMax) {
  items.sort((a, b) => a.targetY - b.targetY);
  let cursor = yMin;
  items.forEach(it => {
    it.y = Math.max(it.targetY, cursor + it.h / 2);
    cursor = it.y + it.h / 2 + gap;
  });
  const overflow = cursor - gap - yMax;
  if (overflow > 0) items.forEach(it => { it.y -= overflow; });
  return items;
}

// 7.2 Typology-Specific Legal Setback Annotations
function getSetbackAnnotations(setbacks) {
  const typo = state.typology;
  const fStr = setbacks.front % 1 === 0 ? setbacks.front.toFixed(1) : fmt(setbacks.front, 2);
  const front = {
    main: `ร่นหน้า ${fStr} ม. (ข้อ 54)`,
    sub: 'ร่นตามเกณฑ์ความกว้างถนน (ข้อ 54)'
  };

  if (typo === 'shophouse') {
    return {
      typo,
      front,
      rear: {
        main: `ร่นหลัง ${setbacks.rear.toFixed(1)} ม. (ที่ว่างติดต่อกัน)`,
        sub: ''
      },
      side: {
        main: 'ผนังทึบชิดเขตที่ดิน (0.00 ม.)',
        sub: '(หรือร่นตามกรณีมีช่องเปิด)'
      },
      partyWall: true,
      master: null
    };
  }
  if (typo === 'highrise') {
    const s = setbacks.sideLeft.toFixed(1);
    return {
      typo,
      front: { main: `ร่นหน้า ${setbacks.front.toFixed(1)} ม.`, sub: '' },
      rear: { main: `ร่นหลัง ${setbacks.rear.toFixed(1)} ม.`, sub: '' },
      side: { main: `ร่นข้าง ${s} ม.`, sub: '' },
      partyWall: false,
      master: `ร่นรอบอาคาร ${s} ม. (เขตทางวิ่งรถดับเพลิง กฎกระทรวง ฉบับที่ 33/55)`
    };
  }
  return {
    typo: 'residential',
    front,
    rear: {
      main: `ร่นหลัง ${setbacks.rear.toFixed(1)} ม.`,
      sub: ''
    },
    side: {
      main: `ร่นข้าง ${setbacks.sideLeft.toFixed(1)} ม. (ช่องเปิด)`,
      sub: ''
    },
    partyWall: false,
    master: null
  };
}

// 7.3 Parametric 3D Massing Specification per Typology
function getMassingSpec(setbacks) {
  const lim = setbacks.heightLimitMeters;
  if (state.typology === 'residential') {
    // บ้านเดี่ยว: ทรง Massing ความสูง 2–3 ชั้น (~9–10 ม.)
    const floorH = 3.2;
    const floors = Math.max(2, Math.min(3, Math.floor(lim / floorH)));
    const H = Number((floors * floorH).toFixed(1));
    return { floorH, floors, H, label: 'บ้านเดี่ยว / พักอาศัย (2–3 ชั้น)' };
  }
  if (state.typology === 'shophouse') {
    // ตึกแถว: ทรงกล่องโมดูลาร์ ความสูง 3.5–4 ชั้น (~12–15 ม.)
    const floorH = 3.5;
    const maxAllowedH = Math.min(lim, 14.0);
    const floors = maxAllowedH >= 14.0 ? 4 : 3.5;
    const H = Number((floors * floorH).toFixed(1));
    return { floorH, floors, H, label: 'ตึกแถว / อาคารพาณิชย์ (3.5–4 ชั้น)' };
  }
  // คอนโด / อาคารสูง: ทรงทาวเวอร์สูงตามเขตทาง มีเส้นแบ่งระดับชั้น (Floor Slices) ชัดเจน
  const floorH = 3.2;
  const floors = Math.max(4, Math.floor(lim / floorH));
  const H = Number((floors * floorH).toFixed(1));
  return { floorH, floors, H, label: 'อาคารขนาดใหญ่ / คอนโดมิเนียม (Tower Massing)' };
}

function getVisualizerPalette() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    isDark,
    stroke: isDark ? '#E2E8F0' : '#1E293B',
    text: isDark ? '#E2E8F0' : '#1E293B',
    roadBg: isDark ? '#1C222A' : '#E3E8EC',
    roadLine: isDark ? '#64748B' : '#94A3B8',
    dim: isDark ? '#94A3B8' : '#475569',
    setback: isDark ? '#F87171' : '#DC2626',
    setbackFill: isDark ? 'rgba(248, 113, 113, 0.18)' : 'rgba(220, 38, 38, 0.11)',
    build: isDark ? '#4ADE80' : '#16A34A',
    buildFill: isDark ? 'rgba(74, 222, 128, 0.18)' : 'rgba(34, 197, 94, 0.14)',
    card: isDark ? '#14181E' : '#FFFFFF',
    badgeBg: isDark ? '#1A1D22' : '#FFFFFF',
    plotFill: isDark ? '#151A20' : '#FFFFFF',
    dot: isDark ? '#334155' : '#CBD5E1',
    wall: isDark ? '#CBD5E1' : '#0F172A',
    faceTop: isDark ? '#3B4450' : '#FAFBFC',
    faceFront: isDark ? '#2C343E' : '#EBF0F4',
    faceRight: isDark ? '#20262E' : '#D5DCE3',
    slice: isDark ? 'rgba(226, 232, 240, 0.30)' : 'rgba(15, 23, 42, 0.24)',
    sliceStrong: isDark ? 'rgba(226, 232, 240, 0.58)' : 'rgba(15, 23, 42, 0.48)',
    danger: '#E11D48'
  };
}

// 7.4 Dispatcher
function renderSchematicSvg(setbacks) {
  const svg = document.getElementById('schematicSvg');
  if (!svg) return;

  const headingEl = document.getElementById('boardHeadingText');
  const legendMassingEl = document.getElementById('legendMassingItem');

  if (state.viewMode === '3d') {
    if (headingEl) headingEl.textContent = '3D ISOMETRIC MASSING & LEGAL ENVELOPE';
    if (legendMassingEl) legendMassingEl.classList.remove('hidden');
    renderIsometricSvg(svg, setbacks);
  } else {
    if (headingEl) headingEl.textContent = '2D SCHEMATIC PLAN & LEGAL SETBACKS';
    if (legendMassingEl) legendMassingEl.classList.add('hidden');
    renderPlan2DSvg(svg, setbacks);
  }
}

// 7.5 2D Schematic Plan Renderer
function renderPlan2DSvg(svg, setbacks) {
  const pal = getVisualizerPalette();
  const ann = getSetbackAnnotations(setbacks);
  const W = state.widthMeters;
  const D = state.depthMeters;
  const road = state.roadWidth;

  const viewW = 800;
  const viewH = 560;
  const leftCol = 195;   // reserved column for non-overlapping setback callouts
  const rightCol = 165;  // reserved column for exterior depth dimension
  const maxPlotW = viewW - leftCol - rightCol;
  const maxPlotH = 310;

  const roadTop = 22;
  const roadH = 44;
  const roadBottom = roadTop + roadH;
  const roadCenterY = roadTop + roadH / 2;
  const plotStartY = roadBottom + 32;

  const scale = Math.min(maxPlotW / Math.max(W, 8), maxPlotH / Math.max(D, 10));
  const pw = W * scale;
  const ph = D * scale;
  const startX = leftCol + (maxPlotW - pw) / 2;
  const plotRight = startX + pw;
  const plotBottomY = plotStartY + ph;

  const fPx = setbacks.front * scale;
  const rPx = setbacks.rear * scale;
  const slPx = setbacks.sideLeft * scale;
  const srPx = setbacks.sideRight * scale;
  const buildX = startX + slPx;
  const buildY = plotStartY + fPx;
  const buildW = Math.max(0, pw - slPx - srPx);
  const buildH = Math.max(0, ph - fPx - rPx);
  const midY = plotStartY + fPx + buildH / 2;

  const badge = (x, y, lines, extra = {}) => svgBadge(x, y, lines, {
    color: pal.setback, bg: pal.badgeBg, fontSize: 10, ...extra
  });

  let inside = '';
  const callouts = [];
  const pushCallout = (lines, anchorX, anchorY) => {
    const m = measureBadge(lines, 10);
    callouts.push({ lines, anchorX, anchorY, targetY: anchorY, w: m.w, h: m.h });
  };
  const fits = (lines, along, thick) => {
    const m = measureBadge(lines, 10);
    return thick >= m.h + 4 && along >= m.w + 10;
  };

  if (state.showSetbackHatch) {
    // Front Setback Strip
    if (fPx > 0) {
      inside += `<rect x="${startX}" y="${plotStartY}" width="${pw}" height="${fPx}" fill="url(#setbackHatch)" stroke="${pal.setback}" stroke-dasharray="4 3" stroke-width="1" />`;
      const fLines = [ann.front.main];
      if (fits(fLines, pw, fPx)) {
        inside += badge(startX + pw / 2, plotStartY + fPx / 2, fLines).svg;
      } else {
        pushCallout([ann.front.main, ann.front.sub], startX + 8, plotStartY + Math.max(4, fPx / 2));
      }
    }

    // Rear Setback Strip
    if (rPx > 0) {
      inside += `<rect x="${startX}" y="${plotBottomY - rPx}" width="${pw}" height="${rPx}" fill="url(#setbackHatch)" stroke="${pal.setback}" stroke-dasharray="4 3" stroke-width="1" />`;
      const rLines = [ann.rear.main];
      if (fits(rLines, pw, rPx)) {
        inside += badge(startX + pw / 2, plotBottomY - rPx / 2, rLines).svg;
      } else {
        pushCallout([ann.rear.main, ann.rear.sub], startX + 8, plotBottomY - Math.max(4, rPx / 2));
      }
    }

    // Side Setback Strips or Shophouse Party Walls
    if (ann.partyWall) {
      inside += `
        <line x1="${startX}" y1="${plotStartY}" x2="${startX}" y2="${plotBottomY}" stroke="${pal.wall}" stroke-width="6" stroke-linecap="square" />
        <line x1="${plotRight}" y1="${plotStartY}" x2="${plotRight}" y2="${plotBottomY}" stroke="${pal.wall}" stroke-width="6" stroke-linecap="square" />`;
      pushCallout([ann.side.main, ann.side.sub], startX, midY);
    } else {
      if (slPx > 0) {
        inside += `<rect x="${startX}" y="${plotStartY + fPx}" width="${slPx}" height="${buildH}" fill="url(#setbackHatch)" stroke="${pal.setback}" stroke-dasharray="4 3" stroke-width="1" />`;
      }
      if (srPx > 0) {
        inside += `<rect x="${plotRight - srPx}" y="${plotStartY + fPx}" width="${srPx}" height="${buildH}" fill="url(#setbackHatch)" stroke="${pal.setback}" stroke-dasharray="4 3" stroke-width="1" />`;
      }
      const sLines = [ann.side.main];
      if (slPx > 0 && fits(sLines, buildH, slPx) && fits(sLines, buildH, srPx)) {
        inside += badge(startX + slPx / 2, midY, sLines, { rotate: -90 }).svg;
        inside += badge(plotRight - srPx / 2, midY, sLines, { rotate: 90 }).svg;
      } else if (slPx > 0) {
        pushCallout([ann.side.main, 'ระยะร่นด้านข้างทั้ง 2 ด้าน'], startX + Math.max(4, slPx / 2), midY);
      }
    }
  }

  // Render Left Callout Column with Leader Lines (Guaranteed No Overlap with Frame)
  const calloutRight = startX - 18;
  let calloutSvg = '';
  layoutColumn(callouts, 8, plotStartY - 8, Math.max(plotBottomY, plotStartY + 80) + 8).forEach(c => {
    const b = badge(calloutRight, c.y, c.lines, { align: 'end' });
    calloutSvg += `
      <polyline points="${calloutRight + 2},${c.y} ${calloutRight + 9},${c.y} ${c.anchorX},${c.anchorY}" fill="none" stroke="${pal.setback}" stroke-width="1.1" />
      <circle cx="${c.anchorX}" cy="${c.anchorY}" r="2.8" fill="${pal.setback}" />
      ${b.svg}`;
  });

  // Buildable Envelope
  let envelope = '';
  if (buildW > 0 && buildH > 0) {
    const env1 = 'BUILDABLE ENVELOPE';
    const env2 = `${fmt(setbacks.buildWidth, 2)} × ${fmt(setbacks.buildDepth, 2)} ม. (${fmt(setbacks.buildableFootprintGround, 1)} ตร.ม.)`;
    const card = svgBadge(buildX + buildW / 2, buildY + buildH / 2, [env1, env2], {
      color: pal.build, bg: pal.card, fontSize: 10.5, strokeWidth: 1.8
    });
    const cardRot = svgBadge(buildX + buildW / 2, buildY + buildH / 2, [env1, env2], {
      color: pal.build, bg: pal.card, fontSize: 10.0, strokeWidth: 1.8, rotate: -90
    });
    let cardSvg = '';
    if (card.w < buildW - 6 && card.h < buildH - 6) {
      cardSvg = card.svg;
    } else if (cardRot.w < buildH - 6 && cardRot.h < buildW - 4) {
      cardSvg = cardRot.svg;
    }
    envelope = `
      <rect x="${buildX}" y="${buildY}" width="${buildW}" height="${buildH}" fill="${pal.buildFill}" stroke="${pal.build}" stroke-width="2.2" />
      <rect x="${buildX}" y="${buildY}" width="${buildW}" height="${buildH}" fill="url(#buildableHatch)" />
      ${cardSvg}`;
  } else {
    envelope = svgBadge(startX + pw / 2, plotStartY + ph / 2, ['⚠️ ระยะร่นเกินขนาดแปลงที่ดิน'], {
      color: '#B91C1C', bg: '#FEE2E2', stroke: '#EF4444', fontSize: 12
    }).svg;
  }

  // Exterior Dimension Lines
  let dims = '';
  if (state.showDims) {
    const dy = plotBottomY + 34;
    const dx = plotRight + 34;
    dims = `
      <g stroke="${pal.dim}" stroke-width="1.2">
        <line x1="${startX}" y1="${plotBottomY + 4}" x2="${startX}" y2="${dy + 10}" opacity="0.65" />
        <line x1="${plotRight}" y1="${plotBottomY + 4}" x2="${plotRight}" y2="${dy + 10}" opacity="0.65" />
        <line x1="${startX}" y1="${dy}" x2="${plotRight}" y2="${dy}" stroke-width="1.5" />
        <line x1="${startX - 5}" y1="${dy + 5}" x2="${startX + 5}" y2="${dy - 5}" stroke-width="2.2" />
        <line x1="${plotRight - 5}" y1="${dy + 5}" x2="${plotRight + 5}" y2="${dy - 5}" stroke-width="2.2" />
        <line x1="${plotRight + 4}" y1="${plotStartY}" x2="${dx + 10}" y2="${plotStartY}" opacity="0.65" />
        <line x1="${plotRight + 4}" y1="${plotBottomY}" x2="${dx + 10}" y2="${plotBottomY}" opacity="0.65" />
        <line x1="${dx}" y1="${plotStartY}" x2="${dx}" y2="${plotBottomY}" stroke-width="1.5" />
        <line x1="${dx - 5}" y1="${plotStartY + 5}" x2="${dx + 5}" y2="${plotStartY - 5}" stroke-width="2.2" />
        <line x1="${dx - 5}" y1="${plotBottomY + 5}" x2="${dx + 5}" y2="${plotBottomY - 5}" stroke-width="2.2" />
      </g>
      ${svgBadge(startX + pw / 2, dy, [`หน้ากว้าง ${fmt(W, 2)} ม.`], { color: pal.dim, bg: pal.card, fontSize: 10.5 }).svg}
      ${svgBadge(dx + 10, plotStartY + ph / 2, [`ความลึก ${fmt(D, 2)} ม.`], { color: pal.dim, bg: pal.card, fontSize: 10.5, align: 'start' }).svg}`;
  }

  // Master Highrise Fire-Engine Setback Annotation Banner
  const master = (ann.master && state.showSetbackHatch)
    ? svgBadge(startX + pw / 2, plotBottomY + (state.showDims ? 68 : 34), [ann.master], {
        color: pal.setback, bg: pal.badgeBg, fontSize: 10.5, strokeWidth: 1.5
      }).svg
    : '';

  svg.setAttribute('viewBox', `0 0 ${viewW} ${viewH}`);
  svg.innerHTML = `
    <defs>
      <pattern id="buildableHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="12" stroke="${pal.build}" stroke-width="1.2" opacity="0.45" />
      </pattern>
      <pattern id="setbackHatch" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="8" stroke="${pal.setback}" stroke-width="0.8" opacity="0.35" />
      </pattern>
    </defs>

    <!-- Public Road -->
    <rect x="${startX - 70}" y="${roadTop}" width="${pw + 140}" height="${roadH}" rx="4" fill="${pal.roadBg}" />
    <line x1="${startX - 80}" y1="${roadCenterY}" x2="${plotRight + 80}" y2="${roadCenterY}" stroke="${pal.roadLine}" stroke-dasharray="8 6" stroke-width="1.5" />
    <line x1="${startX - 70}" y1="${roadBottom}" x2="${plotRight + 70}" y2="${roadBottom}" stroke="${pal.roadLine}" stroke-width="1.5" />
    ${svgBadge(startX + pw / 2, roadCenterY, [`ถนนสาธารณะ (เขตทาง ${fmt(road, 1)} ม.)`], { color: pal.text, bg: pal.card, stroke: pal.roadLine, fontSize: 10.5 }).svg}
    <text x="${startX + pw / 2}" y="${plotStartY - 8}" text-anchor="middle" font-family="'Prompt', sans-serif" font-size="10" font-weight="500" fill="${pal.dim}">แนวเขตที่ดินด้านหน้า</text>
    <text x="${viewW - 20}" y="28" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${pal.stroke}">PLOT ${fmt(W, 1)} × ${fmt(D, 1)} ม.</text>

    <!-- Plot Boundary -->
    <rect x="${startX}" y="${plotStartY}" width="${pw}" height="${ph}" fill="${pal.plotFill}" stroke="${pal.stroke}" stroke-width="2.5" />

    ${inside}
    ${envelope}
    ${calloutSvg}
    ${dims}
    ${master}
  `;
  document.getElementById('canvasScaleTag').textContent = `SCALE ~1:${Math.round(100 / (scale / 4))}`;
}

// 7.6 3D Isometric Massing Renderer (30° Isometric Projection + Parametric Massing)
function renderIsometricSvg(svg, setbacks) {
  const pal = getVisualizerPalette();
  const ann = getSetbackAnnotations(setbacks);
  const spec = getMassingSpec(setbacks);
  const status = state.lastBannerStatus || 'pass';
  const violation = status === 'violation';

  const W = state.widthMeters;
  const D = state.depthMeters;
  const road = state.roadWidth;
  const H = spec.H;

  // 30° Isometric Axes: u = width along road frontage, w = depth from rear (0) toward front road (D)
  const C = Math.cos(Math.PI / 6);
  const S = Math.sin(Math.PI / 6);
  const proj = (u, w, z = 0) => ({ x: (u - w) * C, y: (u + w) * S - z });

  const bu0 = setbacks.sideLeft;
  const bu1 = W - setbacks.sideRight;
  const bw0 = setbacks.rear;
  const bw1 = D - setbacks.front;
  const hasBuild = bu1 > bu0 && bw1 > bw0;

  const pad = Math.max(2, 0.12 * Math.max(W, D));

  const viewW = 800;
  const viewH = 560;
  const margin = { left: 185, right: 185, top: 52, bottom: ann.master ? 104 : 68 };
  const fitPts = [
    proj(0, 0), proj(W, 0), proj(0, D), proj(W, D),
    proj(-pad, D), proj(W + pad, D), proj(-pad, D + road), proj(W + pad, D + road)
  ];
  if (hasBuild) {
    fitPts.push(proj(bu0, bw0, H), proj(bu1, bw0, H), proj(bu0, bw1, H), proj(bu1, bw1, H));
  }
  const minX = Math.min(...fitPts.map(p => p.x));
  const maxX = Math.max(...fitPts.map(p => p.x));
  const minY = Math.min(...fitPts.map(p => p.y));
  const maxY = Math.max(...fitPts.map(p => p.y));
  const availW = viewW - margin.left - margin.right;
  const availH = viewH - margin.top - margin.bottom;
  const k = Math.min(availW / Math.max(1, maxX - minX), availH / Math.max(1, maxY - minY));
  const ox = margin.left + (availW - (maxX - minX) * k) / 2 - minX * k;
  const oy = margin.top + (availH - (maxY - minY) * k) / 2 - minY * k;

  const P = (u, w, z = 0) => {
    const p = proj(u, w, z);
    return { x: ox + p.x * k, y: oy + p.y * k };
  };
  const poly = pts => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const quad = (u0, w0, u1, w1, z = 0) => poly([P(u0, w0, z), P(u1, w0, z), P(u1, w1, z), P(u0, w1, z)]);

  // Isometric Dot Grid on Ground Plane
  const rawStep = Math.max(W, D + road) / 14;
  const step = [1, 2, 2.5, 5, 10, 20].find(s => s >= rawStep) || 20;
  let dots = '';
  for (let u = -Math.ceil(pad * 2 / step) * step; u <= W + pad * 2; u += step) {
    for (let w = -Math.ceil(pad * 2 / step) * step; w <= D + road + pad; w += step) {
      const p = P(u, w);
      if (p.x < 10 || p.x > viewW - 10 || p.y < 10 || p.y > viewH - 10) continue;
      dots += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="1.2" />`;
    }
  }

  // Public Road Strip in Foreground (w in [D, D + road])
  const roadSvg = `
    <polygon points="${quad(-pad, D, W + pad, D + road)}" fill="${pal.roadBg}" stroke="${pal.roadLine}" stroke-width="1.1" />
    <line x1="${P(-pad, D + road / 2).x}" y1="${P(-pad, D + road / 2).y}" x2="${P(W + pad, D + road / 2).x}" y2="${P(W + pad, D + road / 2).y}" stroke="${pal.roadLine}" stroke-width="1.5" stroke-dasharray="8 6" />`;
  const roadLabelPt = P(W / 2, D + road / 2);

  // Plot Surface & Translucent Red Setback Zones
  let ground = `<polygon points="${quad(0, 0, W, D)}" fill="${pal.plotFill}" fill-opacity="0.94" stroke="${pal.stroke}" stroke-width="2.2" stroke-linejoin="round" />`;
  const zoneStyle = `fill="${pal.setbackFill}" stroke="${pal.setback}" stroke-width="1.1" stroke-dasharray="4 3"`;
  if (state.showSetbackHatch) {
    if (setbacks.front > 0) ground += `<polygon points="${quad(0, D - setbacks.front, W, D)}" ${zoneStyle} />`;
    if (setbacks.rear > 0) ground += `<polygon points="${quad(0, 0, W, setbacks.rear)}" ${zoneStyle} />`;
    if (setbacks.sideLeft > 0) ground += `<polygon points="${quad(0, setbacks.rear, setbacks.sideLeft, D - setbacks.front)}" ${zoneStyle} />`;
    if (setbacks.sideRight > 0) ground += `<polygon points="${quad(W - setbacks.sideRight, setbacks.rear, W, D - setbacks.front)}" ${zoneStyle} />`;
    if (ann.partyWall) {
      const l0 = P(0, 0), l1 = P(0, D), r0 = P(W, 0), r1 = P(W, D);
      ground += `
        <line x1="${l0.x}" y1="${l0.y}" x2="${l1.x}" y2="${l1.y}" stroke="${pal.wall}" stroke-width="5" stroke-linecap="square" />
        <line x1="${r0.x}" y1="${r0.y}" x2="${r1.x}" y2="${r1.y}" stroke="${pal.wall}" stroke-width="5" stroke-linecap="square" />`;
    }
  }
  if (hasBuild) {
    ground += `<polygon points="${quad(bu0, bw0, bu1, bw1)}" fill="${pal.buildFill}" stroke="${pal.build}" stroke-width="1.6" stroke-dasharray="6 3" />`;
  }

  // Parametric 3D Building Massing
  let massing = '';
  let hDim = '';
  if (hasBuild) {
    const top = violation ? 'rgba(225, 29, 72, 0.12)' : pal.faceTop;
    const front = violation ? 'rgba(225, 29, 72, 0.18)' : pal.faceFront;
    const right = violation ? 'rgba(225, 29, 72, 0.25)' : pal.faceRight;
    const edge = violation ? pal.danger : pal.stroke;
    const dash = violation ? 'stroke-dasharray="6 4"' : '';

    const frontFace = poly([P(bu0, bw1, 0), P(bu1, bw1, 0), P(bu1, bw1, H), P(bu0, bw1, H)]);
    const rightFace = poly([P(bu1, bw1, 0), P(bu1, bw0, 0), P(bu1, bw0, H), P(bu1, bw1, H)]);
    const topFace = poly([P(bu0, bw0, H), P(bu1, bw0, H), P(bu1, bw1, H), P(bu0, bw1, H)]);

    // Floor Slices
    let slices = '';
    const fullFloors = Math.floor(spec.floors);
    for (let i = 1; i <= fullFloors; i++) {
      const z = i * spec.floorH;
      if (z >= H - 0.1) continue;
      const strong = state.typology === 'highrise' && i % 5 === 0;
      const col = violation ? 'rgba(225, 29, 72, 0.45)' : (strong ? pal.sliceStrong : pal.slice);
      const a = P(bu0, bw1, z), b = P(bu1, bw1, z), c = P(bu1, bw0, z);
      slices += `<polyline class="floor-slice" points="${a.x.toFixed(1)},${a.y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)}" fill="none" stroke="${col}" stroke-width="${strong ? 1.4 : 0.95}" />`;
    }

    // Shophouse Modular Box Vertical Divisions (~4.0m per unit) & Mezzanine
    if (state.typology === 'shophouse') {
      const bays = Math.max(2, Math.round((bu1 - bu0) / 4));
      for (let j = 1; j < bays; j++) {
        const u = bu0 + ((bu1 - bu0) / bays) * j;
        const a = P(u, bw1, 0), b = P(u, bw1, H), c = P(u, bw0, H);
        slices += `<polyline points="${a.x.toFixed(1)},${a.y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)}" fill="none" stroke="${violation ? 'rgba(225,29,72,0.45)' : pal.sliceStrong}" stroke-width="1.1" />`;
      }
    }

    massing = `
      <g class="massing-group" filter="drop-shadow(0 10px 14px rgba(0,0,0,${pal.isDark ? 0.45 : 0.14}))">
        <polygon points="${rightFace}" fill="${right}" stroke="${edge}" stroke-width="1.4" stroke-linejoin="round" ${dash} />
        <polygon points="${frontFace}" fill="${front}" stroke="${edge}" stroke-width="1.4" stroke-linejoin="round" ${dash} />
        <polygon points="${topFace}" fill="${top}" stroke="${edge}" stroke-width="1.6" stroke-linejoin="round" ${dash} />
        ${slices}
      </g>`;

    // Vertical Height Dimension H on the Side of the Building
    const base = P(bu0, bw1, 0);
    const topP = P(bu0, bw1, H);
    const hx = base.x - 24;
    hDim = `
      <g class="height-dim-line" stroke="${pal.dim}" stroke-width="1.2">
        <line x1="${base.x - 4}" y1="${base.y}" x2="${hx - 6}" y2="${base.y}" opacity="0.7" />
        <line x1="${topP.x - 4}" y1="${topP.y}" x2="${hx - 6}" y2="${topP.y}" opacity="0.7" />
        <line x1="${hx}" y1="${base.y}" x2="${hx}" y2="${topP.y}" stroke-width="1.6" />
        <line x1="${hx - 5}" y1="${base.y + 5}" x2="${hx + 5}" y2="${base.y - 5}" stroke-width="2.2" />
        <line x1="${hx - 5}" y1="${topP.y + 5}" x2="${hx + 5}" y2="${topP.y - 5}" stroke-width="2.2" />
      </g>
      ${svgBadge(hx - 8, (base.y + topP.y) / 2, [
        `ความสูง H = ${fmt(H, 1)} ม.`,
        `(${spec.floors} ชั้น · เพดานสูงสุด ${fmt(setbacks.heightLimitMeters, 1)} ม.)`
      ], {
        color: violation ? pal.danger : pal.text,
        bg: pal.card,
        stroke: violation ? pal.danger : pal.dim,
        fontSize: 10,
        align: 'end',
        cls: 'h-dim-badge'
      }).svg}`;

    if (violation) {
      const tc = P((bu0 + bu1) / 2, (bw0 + bw1) / 2, H);
      massing += svgBadge(tc.x, tc.y, ['⛔ PROHIBITED', 'ขัดต่อกฎกระทรวง ฉบับที่ 33'], {
        color: '#FFFFFF', bg: pal.danger, stroke: '#9F1239', fontSize: 10.5
      }).svg;
    }
  } else {
    const c = P(W / 2, D / 2);
    massing = svgBadge(c.x, c.y, ['⚠️ ระยะร่นเกินขนาดแปลงที่ดิน'], {
      color: '#B91C1C', bg: '#FEE2E2', stroke: '#EF4444', fontSize: 12
    }).svg;
  }

  // Setback Callouts Around Plot in 3D Isometric
  let calloutSvg = '';
  if (state.showSetbackHatch) {
    const items = [];
    const add = (lines, anchor) => {
      const m = measureBadge(lines, 10);
      items.push({ lines, ax: anchor.x, ay: anchor.y, targetY: anchor.y, w: m.w, h: m.h });
    };
    const lines = a => (a.sub ? [a.main, a.sub] : [a.main]);
    if (setbacks.front > 0) add([ann.front.main], P(W * 0.35, D - setbacks.front / 2));
    if (setbacks.rear > 0) add([ann.rear.main], P(W - Math.max(0.4, setbacks.sideRight / 2), setbacks.rear / 2));
    if (ann.partyWall) {
      add(lines(ann.side), P(W, D * 0.55));
    } else if (setbacks.sideLeft > 0) {
      add([ann.side.main], P(W - setbacks.sideRight / 2, D * 0.55));
    }

    const centerX = viewW / 2;
    const leftItems = items.filter(i => i.ax < centerX);
    const rightItems = items.filter(i => i.ax >= centerX);
    const colL = margin.left - 20;
    const colR = viewW - margin.right + 20;
    layoutColumn(leftItems, 10, 56, viewH - 96).forEach(c => {
      calloutSvg += `<polyline points="${colL + 2},${c.y} ${colL + 10},${c.y} ${c.ax},${c.ay}" fill="none" stroke="${pal.setback}" stroke-width="1.1" />
        <circle cx="${c.ax}" cy="${c.ay}" r="2.8" fill="${pal.setback}" />
        ${svgBadge(colL, c.y, c.lines, { color: pal.setback, bg: pal.badgeBg, align: 'end', cls: 'iso-setback-badge' }).svg}`;
    });
    layoutColumn(rightItems, 10, 56, viewH - 96).forEach(c => {
      calloutSvg += `<polyline points="${colR - 2},${c.y} ${colR - 10},${c.y} ${c.ax},${c.ay}" fill="none" stroke="${pal.setback}" stroke-width="1.1" />
        <circle cx="${c.ax}" cy="${c.ay}" r="2.8" fill="${pal.setback}" />
        ${svgBadge(colR, c.y, c.lines, { color: pal.setback, bg: pal.badgeBg, align: 'start', cls: 'iso-setback-badge' }).svg}`;
    });
  }

  const master = (ann.master && state.showSetbackHatch)
    ? svgBadge(viewW / 2, viewH - 64, [ann.master], {
        color: pal.setback, bg: pal.badgeBg, fontSize: 10.5, strokeWidth: 1.5
      }).svg
    : '';

  const info = `
    <text x="${viewW - 20}" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${pal.text}">ISOMETRIC 30° — ${svgEsc(spec.label)}</text>
    <text x="${viewW - 20}" y="42" text-anchor="end" font-family="'Prompt', sans-serif" font-size="10" fill="${pal.dim}">แปลง ${fmt(W, 1)} × ${fmt(D, 1)} ม. · Footprint ${fmt(setbacks.buildWidth, 1)} × ${fmt(setbacks.buildDepth, 1)} ม. · สูง H = ${fmt(H, 1)} ม.</text>`;

  svg.setAttribute('viewBox', `0 0 ${viewW} ${viewH}`);
  svg.innerHTML = `
    <g fill="${pal.dot}" opacity="0.9">${dots}</g>
    ${roadSvg}
    ${ground}
    ${massing}
    ${state.showDims ? hDim : ''}
    ${svgBadge(roadLabelPt.x, roadLabelPt.y, [`ถนนสาธารณะ (เขตทาง ${fmt(road, 1)} ม.)`], { color: pal.text, bg: pal.card, stroke: pal.roadLine, fontSize: 10.5 }).svg}
    ${calloutSvg}
    ${master}
    ${info}
  `;
  document.getElementById('canvasScaleTag').textContent = `ISO 30° · H ${fmt(H, 1)} ม. (${spec.floors} ชั้น)`;
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

      updateChipMeta(true);
    });
  });

  // 8.2 View Mode Switcher ([ 2D Plan | 3D Isometric ])
  document.querySelectorAll('[data-view-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-view-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.viewMode = btn.getAttribute('data-view-mode');
      recalculateFeasibility();
    });
  });

  // 8.3 Input Total Wah
  const inputTotalWah = document.getElementById('inputTotalWah');
  inputTotalWah.addEventListener('input', () => {
    const wah = Math.max(1, parseFloat(inputTotalWah.value) || 0);
    state.totalSqm = wah * SQM_PER_WAH;
    state.deedDefaultWahUntouched = false;
    document.getElementById('inputTotalSqm').value = state.totalSqm;
    autoBalanceDimensions();
    updateChipMeta(true);
    recalculateFeasibility();
  });

  // 8.4 Deed Inputs (Rai - Ngan - Wah) with Two-way Binding & Rollover
  const deedRai = document.getElementById('deedRai');
  const deedNgan = document.getElementById('deedNgan');
  const deedWah = document.getElementById('deedWah');

  function handleDeedInput(e) {
    // If the user starts typing Rai or Ngan while the startup 50-wah default has never been touched,
    // clear the startup 50 wah to 0 so entering "1 ไร่" immediately yields 1,600 ตร.ม.
    if (state.deedDefaultWahUntouched && e && (e.target === deedRai || e.target === deedNgan)) {
      const enteredVal = parseFloat(e.target.value) || 0;
      if (enteredVal > 0) {
        deedWah.value = 0;
        state.deedDefaultWahUntouched = false;
      }
    } else if (e && e.target === deedWah) {
      state.deedDefaultWahUntouched = false;
    }

    const r = Math.max(0, parseInt(deedRai.value, 10) || 0);
    const n = Math.max(0, parseInt(deedNgan.value, 10) || 0);
    const w = Math.max(0, parseFloat(deedWah.value) || 0);
    const totalWah = (r * WAH_PER_RAI) + (n * WAH_PER_NGAN) + w;

    if (totalWah > 0) {
      state.totalSqm = totalWah * SQM_PER_WAH;
      document.getElementById('inputTotalWah').value = totalWah;
      document.getElementById('inputTotalSqm').value = state.totalSqm;
      autoBalanceDimensions();
      updateChipMeta(false);
      recalculateFeasibility();
    }
  }

  function normalizeDeedInputs(e) {
    if (state.deedDefaultWahUntouched && e && (e.target === deedRai || e.target === deedNgan)) {
      const enteredVal = parseFloat(e.target.value) || 0;
      if (enteredVal > 0) {
        deedWah.value = 0;
        state.deedDefaultWahUntouched = false;
      }
    }

    let r = Math.max(0, parseInt(deedRai.value, 10) || 0);
    let n = Math.max(0, parseInt(deedNgan.value, 10) || 0);
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

    const totalWah = Math.max(1, (r * WAH_PER_RAI) + (n * WAH_PER_NGAN) + w);
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
    el.addEventListener('input', handleDeedInput);
    el.addEventListener('change', normalizeDeedInputs);
    el.addEventListener('blur', normalizeDeedInputs);
  });

  // 8.5 Input Total Sqm
  const inputTotalSqm = document.getElementById('inputTotalSqm');
  inputTotalSqm.addEventListener('input', () => {
    const sqm = Math.max(4, parseFloat(inputTotalSqm.value) || 0);
    state.totalSqm = sqm;
    state.deedDefaultWahUntouched = false;
    document.getElementById('inputTotalWah').value = Number((sqm / SQM_PER_WAH).toFixed(2));
    autoBalanceDimensions();
    updateChipMeta(true);
    recalculateFeasibility();
  });

  // 8.6 Width & Depth Inputs (Two-way Sync with Area & Deed Inputs)
  const inputPlotWidth = document.getElementById('inputPlotWidth');
  const inputPlotDepth = document.getElementById('inputPlotDepth');

  inputPlotWidth.addEventListener('input', () => {
    state.widthMeters = Math.max(2, parseFloat(inputPlotWidth.value) || 2);
    state.totalSqm = Number((state.widthMeters * state.depthMeters).toFixed(2));
    state.deedDefaultWahUntouched = false;
    document.getElementById('inputTotalWah').value = Number((state.totalSqm / SQM_PER_WAH).toFixed(2));
    document.getElementById('inputTotalSqm').value = state.totalSqm;
    updateDimensionLabels();
    updateChipMeta(true);
    recalculateFeasibility();
  });

  inputPlotDepth.addEventListener('input', () => {
    state.depthMeters = Math.max(2, parseFloat(inputPlotDepth.value) || 2);
    state.totalSqm = Number((state.widthMeters * state.depthMeters).toFixed(2));
    state.deedDefaultWahUntouched = false;
    document.getElementById('inputTotalWah').value = Number((state.totalSqm / SQM_PER_WAH).toFixed(2));
    document.getElementById('inputTotalSqm').value = state.totalSqm;
    updateDimensionLabels();
    updateChipMeta(true);
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
    state.deedDefaultWahUntouched = true;

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
    updateChipMeta(true);
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

// Helper: Auto balance dimensions to 1:2 aspect ratio without mutating state.totalSqm
function autoBalanceDimensions() {
  const area = Math.max(4, state.totalSqm || 4);
  const rawW = Math.sqrt(area / 2.0);
  const w = Math.max(2, Math.round(rawW * 10) / 10);
  const d = Math.max(2, Math.round((area / w) * 10) / 10);
  state.widthMeters = w;
  state.depthMeters = d;

  document.getElementById('inputPlotWidth').value = w;
  document.getElementById('inputPlotDepth').value = d;
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

  const chipSqmEl = document.getElementById('chipSqm');
  const chipWahEl = document.getElementById('chipWah');
  const chipDeedEl = document.getElementById('chipDeed');

  if (chipSqmEl) chipSqmEl.textContent = `${fmt(state.totalSqm, 2)} ตร.ม.`;
  if (chipWahEl) chipWahEl.textContent = `${fmt(roundedWah, 1)} ตร.ว.`;
  if (chipDeedEl) chipDeedEl.textContent = `${rai} ไร่ ${ngan} งาน ${fmt(w, 1)} ตร.ว.`;

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
  updateChipMeta(true);
  recalculateFeasibility();
});
