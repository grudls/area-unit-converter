/**
 * ARCH // STUDIO — Bangkok Zoning & 3D Envelope Simulator (v3.0)
 * Runway AI Studio Workspace + Apple Minimalist Design + Bilingual (TH / EN)
 * Preserves 100% of BMA Zoning, Typology-Specific Setbacks, Two-Way Data Binding & Gatekeeper Logic
 */

// --- 1. Bangkok Comprehensive Zoning Master Data (Bilingual TH / EN) ---
const BMA_ZONING_DATA = {
  Y1:  { code: 'ย.1',  codeEn: 'Y.1',  far: 1.0, osr: 40.0, bcr: 60.0, name: 'ที่อยู่อาศัยหนาแน่นน้อย (ย.1)', nameEn: 'Low-Density Residential (Y.1)', optTh: 'ย.1 (FAR 1.0 : OSR 40%) — ชานเมือง/บ้านเดี่ยว', optEn: 'Y.1 (FAR 1.0 : OSR 40%) — Low-Density / Single House' },
  Y2:  { code: 'ย.2',  codeEn: 'Y.2',  far: 1.5, osr: 25.0, bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นน้อย (ย.2)', nameEn: 'Low-Density Residential (Y.2)', optTh: 'ย.2 (FAR 1.5 : OSR 25%) — ที่อยู่อาศัยชานเมือง', optEn: 'Y.2 (FAR 1.5 : OSR 25%) — Suburban Residential' },
  Y3:  { code: 'ย.3',  codeEn: 'Y.3',  far: 2.5, osr: 12.5, bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นน้อย (ย.3)', nameEn: 'Low-Density Residential (Y.3)', optTh: 'ย.3 (FAR 2.5 : OSR 12.5%) — บ้านแถว/ทาวน์เฮาส์', optEn: 'Y.3 (FAR 2.5 : OSR 12.5%) — Townhouse / Row House' },
  Y4:  { code: 'ย.4',  codeEn: 'Y.4',  far: 3.0, osr: 10.0, bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นน้อย (ย.4)', nameEn: 'Low-Density Residential (Y.4)', optTh: 'ย.4 (FAR 3.0 : OSR 10%) — ที่อยู่อาศัยรอบใน', optEn: 'Y.4 (FAR 3.0 : OSR 10%) — Inner Suburban Residential' },
  Y5:  { code: 'ย.5',  codeEn: 'Y.5',  far: 4.0, osr: 7.5,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นปานกลาง (ย.5)', nameEn: 'Medium-Density Residential (Y.5)', optTh: 'ย.5 (FAR 4.0 : OSR 7.5%) — คอนโด/อาคารรวม', optEn: 'Y.5 (FAR 4.0 : OSR 7.5%) — Mid-Rise Condo / Collective' },
  Y6:  { code: 'ย.6',  codeEn: 'Y.6',  far: 4.5, osr: 6.5,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นปานกลาง (ย.6)', nameEn: 'Medium-Density Residential (Y.6)', optTh: 'ย.6 (FAR 4.5 : OSR 6.5%) — ชุมชนเมืองชั้นกลาง', optEn: 'Y.6 (FAR 4.5 : OSR 6.5%) — Urban District Residential' },
  Y7:  { code: 'ย.7',  codeEn: 'Y.7',  far: 5.0, osr: 6.0,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นปานกลาง (ย.7)', nameEn: 'Medium-Density Residential (Y.7)', optTh: 'ย.7 (FAR 5.0 : OSR 6.0%) — ใกล้รถไฟฟ้า', optEn: 'Y.7 (FAR 5.0 : OSR 6.0%) — Transit-Oriented District' },
  Y8:  { code: 'ย.8',  codeEn: 'Y.8',  far: 6.0, osr: 5.0,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นมาก (ย.8)', nameEn: 'High-Density Residential (Y.8)', optTh: 'ย.8 (FAR 6.0 : OSR 5.0%) — ย่านใจกลางเมือง', optEn: 'Y.8 (FAR 6.0 : OSR 5.0%) — Inner City High-Density' },
  Y9:  { code: 'ย.9',  codeEn: 'Y.9',  far: 7.0, osr: 4.5,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นมาก (ย.9)', nameEn: 'High-Density Residential (Y.9)', optTh: 'ย.9 (FAR 7.0 : OSR 4.5%) — ศูนย์กลางคมนาคม', optEn: 'Y.9 (FAR 7.0 : OSR 4.5%) — Major Transit Hub' },
  Y10: { code: 'ย.10', codeEn: 'Y.10', far: 8.0, osr: 4.0,  bcr: 70.0, name: 'ที่อยู่อาศัยหนาแน่นมาก (ย.10)', nameEn: 'High-Density Residential (Y.10)', optTh: 'ย.10 (FAR 8.0 : OSR 4.0%) — ย่าน CBD สูงพิเศษ', optEn: 'Y.10 (FAR 8.0 : OSR 4.0%) — Ultra-High Density CBD' },
  C1:  { code: 'พ.1',  codeEn: 'P.1',  far: 5.0, osr: 6.0,  bcr: 70.0, name: 'พาณิชยกรรมชุมชน (พ.1)', nameEn: 'Community Commercial (P.1)', optTh: 'พ.1 (FAR 5.0 : OSR 6.0%) — พาณิชยกรรมชุมชน', optEn: 'P.1 (FAR 5.0 : OSR 6.0%) — Community Commercial' },
  C3:  { code: 'พ.3',  codeEn: 'P.3',  far: 7.0, osr: 4.5,  bcr: 70.0, name: 'พาณิชยกรรมศูนย์กลาง (พ.3)', nameEn: 'Central Commercial (P.3)', optTh: 'พ.3 (FAR 7.0 : OSR 4.5%) — ย่านการค้าสำคัญ', optEn: 'P.3 (FAR 7.0 : OSR 4.5%) — Primary Commercial District' },
  C5:  { code: 'พ.5',  codeEn: 'P.5',  far: 10.0, osr: 3.0, bcr: 80.0, name: 'พาณิชยกรรมศูนย์กลางหลัก CBD (พ.5)', nameEn: 'Prime CBD Commercial (P.5)', optTh: 'พ.5 (FAR 10.0 : OSR 3.0%) — ศูนย์กลางพาณิชย์หลัก CBD', optEn: 'P.5 (FAR 10.0 : OSR 3.0%) — Prime Metropolis CBD' },
};

function resolveZoneKey(rawVal) {
  if (!rawVal) return 'Y1';
  const str = String(rawVal).trim();
  const upper = str.toUpperCase();
  if (BMA_ZONING_DATA[upper]) return upper;
  if (upper.startsWith('P')) {
    const mapped = 'C' + upper.slice(1);
    if (BMA_ZONING_DATA[mapped]) return mapped;
  }
  for (const [k, v] of Object.entries(BMA_ZONING_DATA)) {
    if (
      str === v.code ||
      str === v.codeEn ||
      str.startsWith(v.code + ' ') ||
      str.startsWith(v.codeEn + ' ') ||
      str.includes(`(${v.code})`)
    ) {
      return k;
    }
  }
  return 'Y1';
}

// --- 2. Workspace State ---
const state = {
  lang: 'th', // 'th' (Default) | 'en'
  totalSqm: 200.0,
  widthMeters: 10.0,
  depthMeters: 20.0,
  roadWidth: 6.0,
  zoneKey: 'Y1',
  far: 1.0,
  osr: 40.0,
  bcr: 60.0,
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
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDec
  });
}

function isEn() {
  return state.lang === 'en';
}

function showToast(msg) {
  const toast = document.getElementById('studioToast');
  const toastMsg = document.getElementById('studioToastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

// Smooth Number Pulse Animation on Metric Change
const prevMetrics = {};
function setAnimatedMetricText(id, formattedText, numericVal) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = formattedText;
  if (numericVal !== undefined && prevMetrics[id] !== undefined && Math.abs(prevMetrics[id] - numericVal) > 0.05) {
    el.classList.remove('value-pulse');
    void el.offsetWidth;
    el.classList.add('value-pulse');
    clearTimeout(el._pulseTimer);
    el._pulseTimer = setTimeout(() => el.classList.remove('value-pulse'), 220);
  }
  if (numericVal !== undefined) prevMetrics[id] = numericVal;
}

// --- 3. Seamless TH / EN Bilingual Dictionary & Static UI Translator ---
const I18N_STATIC = {
  th: {
    landingEyebrowText: 'ARCHITECTURAL CODE & MASSING ENGINE',
    landingTitleSub: 'Bangkok Zoning & 3D Envelope Simulator',
    landingTaglinePrimary: 'จำลองศักยภาพที่ดิน กฎหมายควบคุมอาคาร และมวลปริมาตร 3 มิติแบบเรียลไทม์',
    landingTaglineSecondary: 'Simulate Bangkok Building Codes & 3D Massing in Real-Time',
    launchStudioBtnText: 'เข้าสู่สตูดิโอทำงาน (Launch Studio)',
    landingChip1: 'ผังเมืองรวม กทม. (FAR / OSR / BCR)',
    landingChip2: 'กฎกระทรวง ฉบับที่ 33 & 55',
    landingChip3: 'Interactive 3D Isometric & 2D CAD',
    topbarSubtitle: 'Bangkok Zoning & 3D Envelope Simulator',
    labelResetBtn: 'รีเซ็ต',
    labelCopyBtn: 'คัดลอกสรุป',
    badgeInspector: 'PARAMETERS',
    headingInspector: 'พารามิเตอร์ที่ดินและกฎหมาย',
    titleCard01: 'ขนาดแปลงและมิติที่ดิน',
    tabUnitWah: 'ตร.วา',
    tabUnitDeed: 'ไร่-งาน-วา',
    tabUnitSqm: 'ตร.ม.',
    labelTotalWah: 'ขนาดที่ดินรวม',
    suffixWah: 'ตร.ว.',
    labelDeedRai: 'ไร่',
    labelDeedNgan: 'งาน',
    labelDeedWah: 'ตร.วา',
    labelTotalSqm: 'พื้นที่รวม (ตารางเมตร)',
    suffixSqm: 'ตร.ม.',
    labelPlotWidth: 'หน้ากว้างที่ดิน (W)',
    labelPlotDepth: 'ความลึกที่ดิน (D)',
    suffixWidthM: 'ม.',
    suffixDepthM: 'ม.',
    titleCard02: 'ความกว้างเขตทาง / ถนนสาธารณะ',
    titleCard03: 'ผังเมือง กทม. (Zoning) & ประเภทอาคาร',
    labelZoneSelect: 'บริเวณผังสี (Bangkok Comprehensive Zoning)',
    optGroupLowRes: 'ที่อยู่อาศัยหนาแน่นน้อย (สีเหลือง)',
    optGroupMedRes: 'ที่อยู่อาศัยหนาแน่นปานกลาง (สีส้ม)',
    optGroupHighRes: 'ที่อยู่อาศัยหนาแน่นมาก (สีน้ำตาล)',
    optGroupComm: 'พาณิชยกรรม (สีแดง)',
    labelTypology: 'ประเภทอาคาร (Building Typology)',
    typoNameResidential: 'บ้านเดี่ยว / พักอาศัย',
    typoNameShophouse: 'อาคารพาณิชย์ / ตึกแถว',
    typoNameHighrise: 'อาคารขนาดใหญ่ / คอนโด',
    titleCard04: 'ประเมินมูลค่าที่ดิน (Land Valuation)',
    suffixBaht: 'บาท',
    optPricePerWah: 'บาท / ตารางวา',
    optPricePerSqm: 'บาท / ตารางเมตร',
    optPricePerRai: 'บาท / ไร่',
    labelTotalLandValue: 'มูลค่าประเมินรวมทั้งแปลง',
    badgeBoard: 'STUDIO VIEWPORT',
    headingBoard: 'ผังวิเคราะห์ศักยภาพและมวลปริมาตรอาคาร 3 มิติ (Real-Time Envelope & Massing)',
    unitGfa: 'ตารางเมตร (SQ.M.)',
    unitBcr: 'ตารางเมตร (SQ.M.)',
    noteBcr: 'พื้นที่ปกคลุมดินชั้นล่างสุดตามผังสี',
    unitOsr: 'ตารางเมตร (SQ.M.)',
    noteOsr: 'ที่ว่างขั้นต่ำปราศจากสิ่งปกคลุมดิน',
    unitHeight: 'เมตร (~3 - 4 ชั้น)',
    labelView2D: '2D Plan',
    labelView3D: '3D Isometric',
    labelToggleSetbacks: 'ระยะร่น (Setbacks)',
    labelToggleDims: 'ระยะมิติ (Dims)',
    labelFitBtn: 'Fit',
    legendRoadText: 'เขตทาง/ถนนสาธารณะ',
    legendBoundaryText: 'แนวเขตที่ดิน (Plot Boundary)',
    legendSetbackText: 'ระยะร่นตามกฎหมาย (Setback Zone)',
    legendBuildableText: 'ขอบเขตก่อสร้างได้ (Buildable Envelope)',
    legendMassingText: 'ก้อนอาคาร 3D Massing (ตามความสูง H)',
    ribbonLabelW: 'หน้ากว้างที่ดิน:',
    ribbonLabelD: 'ความลึกที่ดิน:',
    ribbonLabelBW: 'หน้ากว้างอาคารสูงสุด:',
    ribbonLabelBD: 'ความลึกอาคารสูงสุด:',
    drawerTitleText: 'ข้อกำหนดกฎหมาย & รายละเอียดการวิเคราะห์ Tier 1 / Tier 2',
    dtabTier1: 'Tier 1: กฎกระทรวง ฉบับที่ 55 (พ.ร.บ. ควบคุมอาคาร)',
    dtabTier2: 'Tier 2: ผังเมืองรวม กทม. (FAR / OSR / โบนัส)',
    dtabMatrix: 'ตารางสรุป Feasibility Matrix',
    rule01Title: 'ระยะร่นด้านหน้า (แนวถนนสาธารณะ)',
    ruleFrontText: 'ถนนกว้างน้อยกว่า 6 ม. ต้องร่นจากกึ่งกลางถนนอย่างน้อย 3.00 ม. หากถนนกว้าง 6-10 ม. ร่นจากเขตที่ดิน 2.00 ม. และถนนกว้างเกิน 10 ม. ร่นอย่างน้อย 3.00-6.00 ม. ตามประเภทอาคาร',
    rule01SpecLabel: 'ค่าที่ใช้คำนวณปัจจุบัน:',
    rule02Title: 'ระยะร่นด้านข้างและด้านหลัง',
    rule02SpecLabel: 'ร่นข้าง / ร่นหลัง:',
    rule03Title: 'ความสูงอาคารสัมพันธ์กับเขตทาง (H ≤ 2W)',
    rule03Desc: 'ความสูงของอาคารไม่ว่าจากจุดใดจุดหนึ่ง ต้องไม่เกิน 2 เท่าของระยะราบจากจุดนั้นไปตั้งฉากกับแนวเขตด้านตรงข้ามของถนนสาธารณะที่อยู่ใกล้อาคารที่สุด (กฎกระทรวง ฉบับที่ 55 ข้อ 44)',
    rule03SpecLabel: 'เพดานความสูงตามถนน:',
    rule04Title: 'ที่ว่างปราศจากสิ่งปกคลุม (Open Space)',
    rule04Desc: 'อาคารอยู่อาศัยต้องมีที่ว่างอันปราศจากสิ่งปกคลุมไม่น้อยกว่า 30% ของพื้นที่ชั้นใดชั้นหนึ่งที่มากที่สุด (หรือสอดคล้องกับ OSR ของผังเมืองรวม กทม.)',
    rule04SpecLabel: 'ที่ว่างขั้นต่ำตามเกณฑ์:',
    tier2Card1Title: 'เกณฑ์ผังเมืองรวมกรุงเทพมหานคร (FAR & OSR)',
    tier2Card1Desc: 'การคำนวณศักยภาพสูงสุดของที่ดินแปลงนี้ อ้างอิงข้อกำหนดผังสีของกรุงเทพมหานคร โดยควบคุมอัตราส่วนพื้นที่อาคารรวมต่อพื้นที่ดิน (FAR) และอัตราส่วนของที่ว่างต่อพื้นที่อาคารรวม (OSR)',
    tier2Card2Title: 'มาตรการจูงใจ (FAR Bonus — เพิ่มพื้นที่สูงสุด +20%)',
    tier2Card2Desc: 'หากโครงการจัดให้มีพื้นที่สาธารณประโยชน์ การกักเก็บน้ำฝน หรือผ่านเกณฑ์อาคารเขียว (TREES / LEED) สามารถขอรับโบนัสพื้นที่ก่อสร้างเพิ่มได้สูงสุดไม่เกิน 20%',
    bonusLabelBase: 'FAR ปกติ',
    bonusLabelMaxFar: 'FAR รวมโบนัส (+20%)',
    bonusLabelMaxGfa: 'พื้นที่อาคารรวมศักยภาพสูงสุด',
    thMatrixMetric: 'ดัชนีชี้วัด (Feasibility Metric)',
    thMatrixCalc: 'ค่าคำนวณทางสถาปัตยกรรม',
    thMatrixStandard: 'เกณฑ์มาตรฐานกฎหมาย',
    thMatrixStatus: 'สถานะการประเมิน'
  },
  en: {
    landingEyebrowText: 'ARCHITECTURAL CODE & MASSING ENGINE',
    landingTitleSub: 'Bangkok Zoning & 3D Envelope Simulator',
    landingTaglinePrimary: 'Simulate Bangkok Building Codes & 3D Massing in Real-Time',
    landingTaglineSecondary: 'จำลองศักยภาพที่ดิน กฎหมายควบคุมอาคาร และมวลปริมาตร 3 มิติแบบเรียลไทม์',
    launchStudioBtnText: 'Launch Studio Workspace',
    landingChip1: 'BMA Comprehensive Zoning (FAR / OSR / BCR)',
    landingChip2: 'Ministerial Regulation No. 33 & 55',
    landingChip3: 'Interactive 3D Isometric & 2D CAD',
    topbarSubtitle: 'Bangkok Zoning & 3D Envelope Simulator',
    labelResetBtn: 'Reset',
    labelCopyBtn: 'Copy Summary',
    badgeInspector: 'PARAMETERS',
    headingInspector: 'Parcel & Building Code Parameters',
    titleCard01: 'Parcel Area & Dimensions',
    tabUnitWah: 'Sq.Wah',
    tabUnitDeed: 'Deed',
    tabUnitSqm: 'Sq.m.',
    labelTotalWah: 'Total Land Area (Sq.Wah)',
    suffixWah: 'sq.w.',
    labelDeedRai: 'Rai',
    labelDeedNgan: 'Ngan',
    labelDeedWah: 'Sq.Wah',
    labelTotalSqm: 'Total Land Area (Sq.m.)',
    suffixSqm: 'sq.m.',
    labelPlotWidth: 'Plot Frontage Width (W)',
    labelPlotDepth: 'Plot Depth (D)',
    suffixWidthM: 'm',
    suffixDepthM: 'm',
    titleCard02: 'Public Road Right-of-Way (ROW)',
    titleCard03: 'BMA Zoning & Building Typology',
    labelZoneSelect: 'BMA Comprehensive Zoning District',
    optGroupLowRes: 'Low-Density Residential (Yellow)',
    optGroupMedRes: 'Medium-Density Residential (Orange)',
    optGroupHighRes: 'High-Density Residential (Brown)',
    optGroupComm: 'Commercial District (Red)',
    labelTypology: 'Building Typology',
    typoNameResidential: 'Single Detached House',
    typoNameShophouse: 'Shophouse / Row',
    typoNameHighrise: 'High-Rise / Large Bldg',
    titleCard04: 'Land Valuation Estimator',
    suffixBaht: 'THB',
    optPricePerWah: 'THB / Sq.Wah',
    optPricePerSqm: 'THB / Sq.m.',
    optPricePerRai: 'THB / Rai',
    labelTotalLandValue: 'Estimated Total Land Value',
    badgeBoard: 'STUDIO VIEWPORT',
    headingBoard: 'Real-Time Feasibility & 3D Massing Envelope',
    unitGfa: 'SQUARE METERS (SQ.M.)',
    unitBcr: 'SQUARE METERS (SQ.M.)',
    noteBcr: 'Maximum ground coverage permitted by zoning & setbacks',
    unitOsr: 'SQUARE METERS (SQ.M.)',
    noteOsr: 'Minimum unobstructed open space required by OSR',
    unitHeight: 'METERS (EST. FLOORS)',
    labelView2D: '2D Plan',
    labelView3D: '3D Isometric',
    labelToggleSetbacks: 'Setbacks',
    labelToggleDims: 'Dimensions',
    labelFitBtn: 'Fit',
    legendRoadText: 'Public Road ROW',
    legendBoundaryText: 'Plot Boundary',
    legendSetbackText: 'Legal Setback Zone',
    legendBuildableText: 'Buildable Envelope',
    legendMassingText: '3D Building Massing (Height H)',
    ribbonLabelW: 'Plot Width:',
    ribbonLabelD: 'Plot Depth:',
    ribbonLabelBW: 'Max Building Width:',
    ribbonLabelBD: 'Max Building Depth:',
    drawerTitleText: 'Building Code Regulations & Tier 1 / Tier 2 Analysis',
    dtabTier1: 'Tier 1: Ministerial Reg. No. 55 (Building Control Act)',
    dtabTier2: 'Tier 2: BMA Comprehensive Plan (FAR / OSR / Bonus)',
    dtabMatrix: 'Feasibility Matrix Summary',
    rule01Title: 'Front Setback (Public Road ROW)',
    ruleFrontText: 'For roads < 6 m, setback at least 3.00 m from road centerline. For 6–10 m roads, setback 2.00 m from plot boundary. For > 10 m roads or large buildings, setback 3.00–6.00 m.',
    rule01SpecLabel: 'Active Front Setback:',
    rule02Title: 'Side & Rear Setbacks',
    rule02SpecLabel: 'Side / Rear Setback:',
    rule03Title: 'Height Limit vs Road Width (H ≤ 2W)',
    rule03Desc: 'Maximum building height at any point shall not exceed twice the horizontal distance to the opposite side of the nearest public road (Ministerial Reg. 55 Clause 44).',
    rule03SpecLabel: 'Road Height Ceiling:',
    rule04Title: 'Unobstructed Open Space (OSR)',
    rule04Desc: 'Residential buildings require at least 30% unobstructed open space on the largest floor plate, or in accordance with BMA OSR requirements.',
    rule04SpecLabel: 'Min Open Space Required:',
    tier2Card1Title: 'BMA Comprehensive Zoning Controls (FAR & OSR)',
    tier2Card1Desc: 'Maximum development potential is governed by Bangkok Comprehensive Plan color zones controlling Floor Area Ratio (FAR) and Open Space Ratio (OSR).',
    tier2Card2Title: 'Incentive Zoning (FAR Bonus up to +20%)',
    tier2Card2Desc: 'Projects providing public plaza space, rainwater retention, or Green Building certification (TREES / LEED) qualify for up to +20% bonus GFA.',
    bonusLabelBase: 'Base FAR',
    bonusLabelMaxFar: 'Bonus FAR (+20%)',
    bonusLabelMaxGfa: 'Max Potential GFA with Bonus',
    thMatrixMetric: 'Feasibility Metric',
    thMatrixCalc: 'Calculated Value',
    thMatrixStandard: 'Legal Code Standard',
    thMatrixStatus: 'Compliance Status'
  }
};

function applyLanguage(lang) {
  state.lang = lang === 'en' ? 'en' : 'th';
  document.documentElement.setAttribute('lang', state.lang);

  // Sync all [data-lang-switch] buttons
  document.querySelectorAll('[data-lang-switch]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-switch') === state.lang);
  });

  // Update static IDs
  const dict = I18N_STATIC[state.lang];
  Object.entries(dict).forEach(([id, txt]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'OPTGROUP') {
      el.setAttribute('label', txt);
    } else {
      el.textContent = txt;
    }
  });

  // Translate #zoneSelect options
  const zoneSelect = document.getElementById('zoneSelect');
  if (zoneSelect) {
    Array.from(zoneSelect.options).forEach(opt => {
      const z = BMA_ZONING_DATA[opt.value];
      if (z) {
        opt.textContent = isEn() ? z.optEn : z.optTh;
      }
    });
  }

  // Translate road range marks and road quick pills
  const marksEl = document.getElementById('roadRangeMarks');
  if (marksEl) {
    const u = isEn() ? 'm' : 'ม.';
    marksEl.innerHTML = `<span>&lt;6 ${u}</span><span>6 ${u}</span><span>10 ${u}</span><span>16 ${u}</span><span>&ge;30 ${u}</span>`;
  }
  const pillLabels = isEn()
    ? { '5': '< 6 m', '6': '6 - 8 m', '10': '10 m', '12': '12 m', '16': '16 m', '30': '≥ 30 m' }
    : { '5': '< 6 ม.', '6': '6 - 8 ม.', '10': '10 ม.', '12': '12 ม.', '16': '16 ม.', '30': '≥ 30 ม.' };
  document.querySelectorAll('#roadPillRow .tactile-pill').forEach(p => {
    const r = p.getAttribute('data-road');
    if (pillLabels[r]) p.textContent = pillLabels[r];
  });

  // Translate Tier 2 checklist
  const checkList = document.getElementById('tier2CheckList');
  if (checkList) {
    checkList.innerHTML = isEn()
      ? `<li><strong>FAR (Floor Area Ratio):</strong> Controls maximum total gross floor area across all stories.</li>
         <li><strong>OSR (Open Space Ratio):</strong> Controls minimum open space ratio relative to total floor area.</li>
         <li><strong>Road Width Gatekeeper:</strong> High-rise or extra-large buildings (&gt;10,000 sq.m.) require a public road ROW of at least 10.00 – 18.00 m (Ministerial Reg. No. 33).</li>`
      : `<li><strong>FAR (Floor Area Ratio):</strong> กำหนดเพดานพื้นที่ก่อสร้างรวมทุกชั้นสูงสุด</li>
         <li><strong>OSR (Open Space Ratio):</strong> กำหนดสัดส่วนพื้นที่ว่างเปิดโล่งเพื่อคุณภาพสิ่งแวดล้อมเมือง</li>
         <li><strong>Road Width Gatekeeper:</strong> อาคารสูงหรืออาคารขนาดใหญ่พิเศษ (&gt;10,000 ตร.ม.) ต้องตั้งอยู่บนถนนที่มีเขตทางกว้างไม่น้อยกว่า 10.00 - 18.00 ม. (กฎกระทรวง ฉบับที่ 33)</li>`;
  }

  // Drawer state tag
  const drawerBody = document.getElementById('drawerBody');
  const drawerStateTag = document.getElementById('drawerStateTag');
  if (drawerBody && drawerStateTag) {
    const hidden = drawerBody.classList.contains('hidden');
    drawerStateTag.textContent = isEn()
      ? (hidden ? 'Click to expand' : 'Hide details')
      : (hidden ? 'คลิกเพื่อดูรายละเอียด' : 'ซ่อนรายละเอียด');
  }

  updateDimensionLabels();
  updateChipMeta(false);
  updateRoadSliderUI(state.roadWidth);
  recalculateFeasibility();
}

// --- 4. Legal Setback Calculation Engine (MR 55 / MR 33 / BMA Regulations) ---
function calculateLegalSetbacks() {
  const road = state.roadWidth;
  const typo = state.typology;

  let frontSetback = 2.0;
  let rearSetback = 2.0;
  let sideLeftSetback = 2.0;
  let sideRightSetback = 2.0;
  let heightLimitMeters = 15.0;
  let heightRuleDesc = '';

  // 4.1 Front Setback from Road (กฎกระทรวง 55 ข้อ 34 / ข้อ 54)
  if (road < 6.0) {
    const halfRoad = road / 2.0;
    frontSetback = Math.max(0.5, 3.0 - halfRoad);
    heightLimitMeters = Math.min(road * 2.0, 12.0);
    heightRuleDesc = isEn()
      ? `Narrow road (< 6 m): setback 3.00 m from road center, max height ${fmt(heightLimitMeters, 1)} m (~3 fl.)`
      : `ถนนแคบ (< 6 ม.) ร่นจากกึ่งกลางถนน 3.00 ม. สูงไม่เกิน ${fmt(heightLimitMeters, 1)} ม. (~3 ชั้น)`;
  } else if (road <= 10.0) {
    frontSetback = 2.0;
    heightLimitMeters = Math.min(road * 2.0, 23.0);
    heightRuleDesc = isEn()
      ? `Road ROW ${fmt(road, 1)} m: front setback 2.00 m, max height ${fmt(heightLimitMeters, 1)} m (~4-7 fl.)`
      : `ถนนกว้าง ${fmt(road, 1)} ม. ร่นแนวถนน 2.00 ม. สูงจำกัด ${fmt(heightLimitMeters, 1)} ม. (~4-7 ชั้น)`;
  } else if (road <= 20.0) {
    frontSetback = 2.0;
    heightLimitMeters = Math.min(road * 2.0, 35.0);
    heightRuleDesc = isEn()
      ? `Road ROW ${fmt(road, 1)} m: front setback 2.00 m, max height ${fmt(heightLimitMeters, 1)} m`
      : `ถนนกว้าง ${fmt(road, 1)} ม. ร่นแนวถนน 2.00 ม. สูงจำกัด ${fmt(heightLimitMeters, 1)} ม.`;
  } else {
    frontSetback = 3.0;
    heightLimitMeters = road * 2.0;
    heightRuleDesc = isEn()
      ? `Arterial Road (${fmt(road, 1)} m): high-rise envelope permitted`
      : `ถนนสายหลัก (${fmt(road, 1)} ม.) ศักยภาพอาคารสูงพิเศษ`;
  }

  // 4.2 Side & Rear Setbacks based on Typology (Typology-Specific Setbacks)
  if (typo === 'residential') {
    sideLeftSetback = 2.0;
    sideRightSetback = 2.0;
    rearSetback = 2.0;
  } else if (typo === 'shophouse') {
    sideLeftSetback = 0.0;
    sideRightSetback = 0.0;
    rearSetback = 3.0;
  } else if (typo === 'highrise') {
    const baseSetback = 6.0;
    sideLeftSetback = baseSetback;
    sideRightSetback = baseSetback;
    rearSetback = baseSetback;
    frontSetback = Math.max(frontSetback, baseSetback);
  }

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

// --- 5. Hero Metric & Feasibility Calculation ---
function recalculateFeasibility() {
  const zoneSelectEl = document.getElementById('zoneSelect');
  if (zoneSelectEl && zoneSelectEl.value) {
    state.zoneKey = resolveZoneKey(zoneSelectEl.value);
    if (zoneSelectEl.value !== state.zoneKey && BMA_ZONING_DATA[state.zoneKey]) {
      zoneSelectEl.value = state.zoneKey;
    }
  }
  const zone = BMA_ZONING_DATA[state.zoneKey] || BMA_ZONING_DATA.Y1;
  state.far = zone.far;
  state.osr = zone.osr;
  state.bcr = zone.bcr;

  const setbacks = calculateLegalSetbacks();
  const unitM = isEn() ? 'm' : 'ม.';
  const unitSqm = isEn() ? 'sq.m.' : 'ตร.ม.';
  const unitFl = isEn() ? 'fl.' : 'ชั้น';

  // 5.1 Max GFA by FAR
  const maxGfa = state.totalSqm * state.far;

  // 5.2 Max Footprint by BCR and Setbacks
  const bcrFootprint = state.totalSqm * (state.bcr / 100.0);
  const legalFootprint = Math.min(bcrFootprint, setbacks.buildableFootprintGround);

  // 5.3 Min Open Space by OSR
  const minOpenSpace = state.totalSqm * (state.osr / 100.0);

  // 5.4 Max Estimated Floors
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
    if (noteGfaEl) {
      noteGfaEl.textContent = isEn()
        ? '⛔ Prohibited by Ministerial Regulation No. 33'
        : '⛔ ไม่อนุญาตให้ก่อสร้าง (ขัดต่อกฎกระทรวง)';
    }
  } else if (bannerStatus === 'warning') {
    valMaxGfaEl.classList.remove('gfa-violation');
    if (tileGfaEl) tileGfaEl.classList.remove('tile-violation');
    if (tagGfaEl) tagGfaEl.textContent = 'RESTRICTED';
    if (noteGfaEl) {
      if (state.roadWidth < 6.0) {
        noteGfaEl.textContent = isEn()
          ? '⚠️ Restricted to max 2,000 sq.m. GFA (Clause 54)'
          : '⚠️ จำกัดพื้นที่อาคารรวมไม่เกิน 2,000 ตร.ม. (ข้อ 54)';
      } else {
        noteGfaEl.textContent = isEn()
          ? '⚠️ Conditional GFA cap based on road ROW width'
          : '⚠️ มีเงื่อนไขข้อจำกัดขนาดอาคารตามเขตทาง';
      }
    }
  } else {
    valMaxGfaEl.classList.remove('gfa-violation');
    if (tileGfaEl) tileGfaEl.classList.remove('tile-violation');
    if (tagGfaEl) tagGfaEl.textContent = 'MAX ALLOWED';
    if (noteGfaEl) {
      noteGfaEl.textContent = isEn()
        ? 'Maximum gross floor area permitted by FAR'
        : 'พื้นที่อาคารรวมทุกชั้นสูงสุดตาม FAR';
    }
  }

  // --- Update Hero Metric Tiles (with Tactile Pulse) ---
  setAnimatedMetricText('valMaxGfa', fmt(maxGfa, 1), maxGfa);
  setAnimatedMetricText('valMaxFootprint', fmt(legalFootprint, 1), legalFootprint);
  setAnimatedMetricText('valMinOpenSpace', fmt(minOpenSpace, 1), minOpenSpace);
  document.getElementById('valHeightLimit').textContent = `${fmt(setbacks.heightLimitMeters, 1)} ${unitM} (~${estFloors} ${unitFl})`;
  document.getElementById('noteHeightRule').textContent = setbacks.heightRuleDesc;

  // --- Update Zoning Specs Bar ---
  document.getElementById('dispFar').textContent = `${zone.far.toFixed(1)} : 1`;
  document.getElementById('dispOsr').textContent = `${fmt(zone.osr, 1)}%`;
  document.getElementById('dispBcr').textContent = `${fmt(zone.bcr, 0)}%`;

  // --- Update Viewport Status Ribbon ---
  document.getElementById('ribbonWidth').textContent = `${fmt(state.widthMeters, 2)} ${unitM}`;
  document.getElementById('ribbonDepth').textContent = `${fmt(state.depthMeters, 2)} ${unitM}`;
  document.getElementById('ribbonBuildWidth').textContent = `${fmt(setbacks.buildWidth, 2)} ${unitM}`;
  document.getElementById('ribbonBuildDepth').textContent = `${fmt(setbacks.buildDepth, 2)} ${unitM}`;

  // --- Update Legal Drawer Text ---
  document.getElementById('specFrontSetback').textContent = `${fmt(setbacks.front, 2)} ${unitM}`;
  document.getElementById('specSideSetback').textContent = `${fmt(setbacks.sideLeft, 2)} ${unitM}`;
  document.getElementById('specRearSetback').textContent = `${fmt(setbacks.rear, 2)} ${unitM}`;
  document.getElementById('specRoadHeightLimit').textContent = `${fmt(setbacks.heightLimitMeters, 1)} ${unitM} (${estFloors} ${unitFl})`;
  document.getElementById('specOpenSpaceText').textContent = `${zone.osr}% (${fmt(minOpenSpace, 1)} ${unitSqm})`;

  const ruleSideTextEl = document.getElementById('ruleSideText');
  if (ruleSideTextEl) {
    if (state.typology === 'residential') {
      ruleSideTextEl.textContent = isEn()
        ? 'Single Detached House: minimum 2.00 m side setback (with openings) and 2.00 m rear setback from property boundaries.'
        : 'บ้านพักอาศัย / บ้านเดี่ยว: ด้านข้างร่น 2.00 ม. (ช่องเปิด) และด้านหลังร่น 2.00 ม. จากแนวเขตที่ดิน';
    } else if (state.typology === 'shophouse') {
      ruleSideTextEl.textContent = isEn()
        ? 'Shophouse / Commercial Row: zero-lot-line solid party wall (0.00 m) on sides, and minimum 3.00 m continuous rear open space.'
        : 'อาคารพาณิชย์ / ตึกแถว: ด้านข้างผนังทึบชิดเขตที่ดิน (0.00 ม.) หรือร่นตามกรณีมีช่องเปิด และด้านหลังร่น 3.00 ม. (ที่ว่างติดต่อกัน)';
    } else {
      ruleSideTextEl.textContent = isEn()
        ? 'High-Rise / Large Building: minimum 6.00 m perimeter setback on all sides for fire engine access (Ministerial Reg. No. 33/55).'
        : 'อาคารขนาดใหญ่ / คอนโดมิเนียม: ร่นรอบอาคารทุกด้าน 6.00 ม. โดยรอบแปลงที่ดิน (เขตทางวิ่งรถดับเพลิง กฎกระทรวง ฉบับที่ 33/55)';
    }
  }

  // Update Tier 2 Bonus calculations
  const bonusFar = zone.far * 1.2;
  const bonusGfa = state.totalSqm * bonusFar;
  document.getElementById('bonusBaseFar').textContent = `${zone.far.toFixed(1)} : 1`;
  document.getElementById('bonusMaxFar').textContent = `${bonusFar.toFixed(2)} : 1`;
  document.getElementById('bonusMaxGfa').textContent = `${fmt(bonusGfa, 1)} ${unitSqm}`;

  // Update Valuation Card
  updateValuation();

  // Update Feasibility Matrix Table
  updateMatrixTable(maxGfa, legalFootprint, minOpenSpace, setbacks, zone);

  // Re-render 2D Plan or 3D Isometric SVG
  renderSchematicSvg(setbacks);
}

// --- 5.5 Road Gatekeeper Alert Banner Engine (Bilingual TH / EN, Single Clean Header Line) ---
function updateRoadGatekeeperBanner(setbacks, zone) {
  const banner = document.getElementById('roadGatekeeperBanner');
  const iconBox = document.getElementById('gatekeeperIconBox');
  const pill = document.getElementById('gatekeeperPill');
  const title = document.getElementById('gatekeeperTitle');
  const desc = document.getElementById('gatekeeperDesc');

  if (!banner || !iconBox || !pill || !title || !desc) return 'pass';

  const road = state.roadWidth;
  const typo = state.typology;
  const typoNames = isEn()
    ? { residential: 'Single Detached House', shophouse: 'Shophouse / Commercial Row', highrise: 'High-Rise / Large Building' }
    : { residential: 'บ้านเดี่ยว / พักอาศัย', shophouse: 'อาคารพาณิชย์ / ตึกแถว', highrise: 'อาคารขนาดใหญ่ / คอนโด' };
  const typoName = typoNames[typo] || typoNames.residential;

  let status = 'pass';
  let pillText = isEn() ? '✓ Legal Compliant' : '✓ ถูกต้องตามกฎหมาย';
  let titleText = isEn()
    ? 'Public road ROW meets requirements for selected building typology'
    : 'ผ่านเกณฑ์ความกว้างเขตทางสำหรับประเภทอาคารที่เลือก';
  let descText = isEn()
    ? `Public road ROW of ${fmt(road, 1)} m complies with building control codes for ${typoName}. Development can proceed within zoning and setback envelopes.`
    : `ถนนสาธารณะกว้าง ${fmt(road, 1)} ม. สอดคล้องตามเกณฑ์ควบคุมอาคารสำหรับ${typoName} สามารถพัฒนาโครงการได้ตามข้อกำหนดผังเมืองและระยะร่น`;
  let iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>`;

  if (typo === 'highrise' && road < 10.0) {
    status = 'violation';
    pillText = isEn() ? '⛔ Code Violation' : '⛔ ผิดกฎหมาย';
    titleText = isEn()
      ? `Cannot construct this building typology — public road ROW is only ${fmt(road, 1)} m`
      : `ไม่สามารถก่อสร้างอาคารประเภทนี้ได้ เนื่องจากเขตทางถนนสาธารณะกว้างเพียง ${fmt(road, 1)} ม.`;
    descText = isEn()
      ? `(Minimum 10.00 m public road ROW required under Ministerial Regulation No. 33 for High-Rise / Large Buildings)`
      : `(ขั้นต่ำต้องไม่น้อยกว่า 10.00 ม. ตามกฎกระทรวง ฉบับที่ 33 สำหรับอาคารสูงหรืออาคารขนาดใหญ่ / คอนโดมิเนียม)`;
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`;
  } else if (road < 6.0) {
    status = 'warning';
    pillText = isEn() ? '⚠️ Conditional Limit' : '⚠️ ติดเงื่อนไข';
    titleText = isEn()
      ? `Narrow Road (< 6.0 m) — Height limited to 2×ROW and GFA capped at 2,000 sq.m.`
      : `ซอยแคบ (< 6.0 ม.) — จำกัดความสูงไม่เกิน 2 เท่าของเขตทาง และพื้นที่รวมไม่เกิน 2,000 ตร.ม.`;
    descText = isEn()
      ? `Current road width is ${fmt(road, 1)} m: front setback must be at least 3.00 m from road centerline. Building height > 15 m or large buildings are prohibited (MR 55 Clause 54).`
      : `ปัจจุบันเขตทางกว้าง ${fmt(road, 1)} ม. ต้องร่นแนวอาคารจากกึ่งกลางถนนอย่างน้อย 3.00 ม. และไม่อนุญาตให้สร้างอาคารสูงเกิน 15 ม. หรืออาคารขนาดใหญ่ (กฎกระทรวง ฉบับที่ 55 ข้อ 54)`;
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
  } else if (typo === 'highrise' && road >= 10.0 && road < 18.0) {
    status = 'warning';
    pillText = isEn() ? '⚠️ Conditional Limit' : '⚠️ ติดเงื่อนไข';
    titleText = isEn()
      ? `Total GFA capped at 10,000 sq.m. (for 10 – 18 m Road ROW)`
      : `จำกัดพื้นที่อาคารรวมไม่เกิน 10,000 ตร.ม. (เขตทาง 10 - 18 ม.)`;
    descText = isEn()
      ? `Extra-large buildings exceeding 10,000 sq.m. require a public road ROW ≥ 18.00 m (Current ROW: ${fmt(road, 1)} m permits up to 10,000 sq.m.).`
      : `หากพัฒนาเป็นอาคารขนาดใหญ่พิเศษเกิน 10,000 ตร.ม. ต้องอยู่ติดถนนสาธารณะกว้างตั้งแต่ 18.00 ม. ขึ้นไป (ปัจจุบัน ${fmt(road, 1)} ม. สามารถสร้างได้ไม่เกินเกณฑ์ 10,000 ตร.ม.)`;
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
  }

  banner.classList.remove('pass', 'warning', 'violation');
  banner.classList.add(status);
  iconBox.innerHTML = iconSvg;
  pill.textContent = pillText;
  title.textContent = titleText;
  desc.textContent = descText;

  const helpEl = document.getElementById('roadLegalHelpText');
  if (helpEl) {
    helpEl.textContent = `${pillText}: ${titleText}`;
  }

  return status;
}

// --- 6. Land Price Valuation Engine ---
function updateValuation() {
  const rate = parseFloat(document.getElementById('inputPriceRate').value) || 0;
  const mode = document.getElementById('selectPriceMode').value;
  state.priceRate = rate;
  state.priceMode = mode;

  const totalWah = state.totalSqm / SQM_PER_WAH;
  const totalRai = totalWah / WAH_PER_RAI;

  let totalBaht = 0;
  if (mode === 'perWah') {
    totalBaht = totalWah * rate;
  } else if (mode === 'perSqm') {
    totalBaht = state.totalSqm * rate;
  } else if (mode === 'perRai') {
    totalBaht = totalRai * rate;
  }

  const unitCurrency = isEn() ? 'THB' : 'บาท';
  setAnimatedMetricText('valTotalLandPrice', `${fmt(totalBaht, 0)} ${unitCurrency}`, totalBaht);
}

// --- 6.5 Feasibility Matrix Table Renderer (Bilingual TH / EN) ---
function updateMatrixTable(maxGfa, legalFootprint, minOpenSpace, setbacks, zone) {
  const tbody = document.getElementById('matrixTableBody');
  if (!tbody) return;

  const wah = state.totalSqm / SQM_PER_WAH;
  const uSqm = isEn() ? 'sq.m.' : 'ตร.ม.';
  const uWah = isEn() ? 'sq.w.' : 'ตร.ว.';
  const uM = isEn() ? 'm' : 'ม.';

  const rows = isEn()
    ? [
        { metric: 'Total Land Area', calc: `${fmt(state.totalSqm, 1)} ${uSqm} (${fmt(wah, 1)} ${uWah})`, standard: 'Title Deed / Survey', status: 'Verified' },
        { metric: 'Max Gross Floor Area (GFA)', calc: `${fmt(maxGfa, 1)} ${uSqm}`, standard: `FAR ${zone.far.toFixed(1)} : 1 (${zone.codeEn})`, status: 'Compliant' },
        { metric: 'Max Ground Coverage (BCR)', calc: `${fmt(legalFootprint, 1)} ${uSqm}`, standard: `BCR ≤ ${zone.bcr}% & Setbacks`, status: 'Compliant' },
        { metric: 'Min Unobstructed Open Space (OSR)', calc: `${fmt(minOpenSpace, 1)} ${uSqm}`, standard: `OSR ≥ ${zone.osr}%`, status: 'Compliant' },
        { metric: 'Buildable Envelope (W × D)', calc: `${fmt(setbacks.buildWidth, 2)} ${uM} × ${fmt(setbacks.buildDepth, 2)} ${uM}`, standard: '4-Side Legal Setbacks', status: setbacks.buildWidth > 0 && setbacks.buildDepth > 0 ? 'Buildable' : 'Plot Too Narrow' }
      ]
    : [
        { metric: 'ขนาดที่ดินรวม (Total Land Area)', calc: `${fmt(state.totalSqm, 1)} ตร.ม. (${fmt(wah, 1)} ตร.ว.)`, standard: 'ตามโฉนดที่ดิน', status: 'พร้อมประเมิน' },
        { metric: 'พื้นที่อาคารรวมสูงสุด (Max GFA)', calc: `${fmt(maxGfa, 1)} ตร.ม.`, standard: `FAR ${zone.far.toFixed(1)} : 1 (${zone.code})`, status: 'ตามเกณฑ์ผังสี' },
        { metric: 'พื้นที่ปกคลุมดินชั้นล่าง (Max Footprint)', calc: `${fmt(legalFootprint, 1)} ตร.ม.`, standard: `BCR ไม่เกิน ${zone.bcr}% และระยะร่น`, status: 'ผ่านเกณฑ์' },
        { metric: 'พื้นที่ว่างปราศจากสิ่งปกคลุม (Min Open Space)', calc: `${fmt(minOpenSpace, 1)} ตร.ม.`, standard: `OSR ไม่น้อยกว่า ${zone.osr}%`, status: 'ผ่านเกณฑ์' },
        { metric: 'ขนาดอาคารก่อสร้างได้จริง (W × D)', calc: `${fmt(setbacks.buildWidth, 2)} ม. × ${fmt(setbacks.buildDepth, 2)} ม.`, standard: 'ระยะร่นครบ 4 ด้าน', status: setbacks.buildWidth > 0 && setbacks.buildDepth > 0 ? 'สร้างอาคารได้' : 'แปลงที่ดินแคบเกินไป' }
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
    return `<text x="${rx0 + w / 2}" y="${ty}" text-anchor="middle" font-family="'Prompt', 'Inter', sans-serif" font-size="${i === 0 ? fs : subFs}" font-weight="${i === 0 ? 700 : 500}" fill="${o.color}">${svgEsc(l)}</text>`;
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

// 7.2 Typology-Specific Legal Setback Annotations (Bilingual TH / EN)
function getSetbackAnnotations(setbacks) {
  const typo = state.typology;
  const en = isEn();
  const fStr = setbacks.front % 1 === 0 ? setbacks.front.toFixed(1) : fmt(setbacks.front, 2);
  const front = {
    main: en ? `Front Setback ${fStr} m (Cl. 54)` : `ร่นหน้า ${fStr} ม. (ข้อ 54)`,
    sub: en ? 'Road-based front setback (Cl. 54)' : 'ร่นตามเกณฑ์ความกว้างถนน (ข้อ 54)'
  };

  if (typo === 'shophouse') {
    return {
      typo,
      front,
      rear: {
        main: en
          ? `Rear Setback ${setbacks.rear.toFixed(1)} m (Continuous Open Space)`
          : `ร่นหลัง ${setbacks.rear.toFixed(1)} ม. (ที่ว่างติดต่อกัน)`,
        sub: ''
      },
      side: {
        main: en ? 'Zero-Lot-Line Party Wall (0.00 m)' : 'ผนังทึบชิดเขตที่ดิน (0.00 ม.)',
        sub: en ? '(or setback if openings exist)' : '(หรือร่นตามกรณีมีช่องเปิด)'
      },
      partyWall: true,
      master: null
    };
  }
  if (typo === 'highrise') {
    const s = setbacks.sideLeft.toFixed(1);
    return {
      typo,
      front: { main: en ? `Front Setback ${setbacks.front.toFixed(1)} m` : `ร่นหน้า ${setbacks.front.toFixed(1)} ม.`, sub: '' },
      rear: { main: en ? `Rear Setback ${setbacks.rear.toFixed(1)} m` : `ร่นหลัง ${setbacks.rear.toFixed(1)} ม.`, sub: '' },
      side: { main: en ? `Side Setback ${s} m` : `ร่นข้าง ${s} ม.`, sub: '' },
      partyWall: false,
      master: en
        ? `All-Around Setback ${s} m (Fire Engine Access — MR 33/55)`
        : `ร่นรอบอาคาร ${s} ม. (เขตทางวิ่งรถดับเพลิง กฎกระทรวง ฉบับที่ 33/55)`
    };
  }
  return {
    typo: 'residential',
    front,
    rear: {
      main: en ? `Rear Setback ${setbacks.rear.toFixed(1)} m` : `ร่นหลัง ${setbacks.rear.toFixed(1)} ม.`,
      sub: ''
    },
    side: {
      main: en
        ? `Side Setback ${setbacks.sideLeft.toFixed(1)} m (Openings)`
        : `ร่นข้าง ${setbacks.sideLeft.toFixed(1)} ม. (ช่องเปิด)`,
      sub: ''
    },
    partyWall: false,
    master: null
  };
}

// 7.3 Parametric 3D Massing Specification per Typology (Bilingual TH / EN)
function getMassingSpec(setbacks) {
  const lim = setbacks.heightLimitMeters;
  const en = isEn();
  if (state.typology === 'residential') {
    const floorH = 3.2;
    const floors = Math.max(2, Math.min(3, Math.floor(lim / floorH)));
    const H = Number((floors * floorH).toFixed(1));
    return {
      floorH,
      floors,
      H,
      label: en ? 'Single Detached House (2–3 Stories)' : 'บ้านเดี่ยว / พักอาศัย (2–3 ชั้น)'
    };
  }
  if (state.typology === 'shophouse') {
    const floorH = 3.5;
    const maxAllowedH = Math.min(lim, 14.0);
    const floors = maxAllowedH >= 14.0 ? 4 : 3.5;
    const H = Number((floors * floorH).toFixed(1));
    return {
      floorH,
      floors,
      H,
      label: en ? 'Shophouse / Commercial Row (3.5–4 Stories)' : 'ตึกแถว / อาคารพาณิชย์ (3.5–4 ชั้น)'
    };
  }
  const floorH = 3.2;
  const floors = Math.max(4, Math.floor(lim / floorH));
  const H = Number((floors * floorH).toFixed(1));
  return {
    floorH,
    floors,
    H,
    label: en ? 'High-Rise / Large Building (Tower Massing)' : 'อาคารขนาดใหญ่ / คอนโดมิเนียม (Tower Massing)'
  };
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
  const en = isEn();
  const uM = en ? 'm' : 'ม.';
  const uSqm = en ? 'sq.m.' : 'ตร.ม.';
  const W = state.widthMeters;
  const D = state.depthMeters;
  const road = state.roadWidth;

  const viewW = 800;
  const viewH = 560;
  const leftCol = 195;
  const rightCol = 165;
  const maxPlotW = viewW - leftCol - rightCol;
  const maxPlotH = 290;

  // Offset top below Floating Glassmorphism Controls Dock
  const roadTop = 58;
  const roadH = 40;
  const roadBottom = roadTop + roadH;
  const roadCenterY = roadTop + roadH / 2;
  const plotStartY = roadBottom + 28;

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
    if (fPx > 0) {
      inside += `<rect x="${startX}" y="${plotStartY}" width="${pw}" height="${fPx}" fill="url(#setbackHatch)" stroke="${pal.setback}" stroke-dasharray="4 3" stroke-width="1" />`;
      const fLines = [ann.front.main];
      if (fits(fLines, pw, fPx)) {
        inside += badge(startX + pw / 2, plotStartY + fPx / 2, fLines).svg;
      } else {
        pushCallout([ann.front.main, ann.front.sub], startX + 8, plotStartY + Math.max(4, fPx / 2));
      }
    }

    if (rPx > 0) {
      inside += `<rect x="${startX}" y="${plotBottomY - rPx}" width="${pw}" height="${rPx}" fill="url(#setbackHatch)" stroke="${pal.setback}" stroke-dasharray="4 3" stroke-width="1" />`;
      const rLines = [ann.rear.main];
      if (fits(rLines, pw, rPx)) {
        inside += badge(startX + pw / 2, plotBottomY - rPx / 2, rLines).svg;
      } else {
        pushCallout([ann.rear.main, ann.rear.sub], startX + 8, plotBottomY - Math.max(4, rPx / 2));
      }
    }

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
        pushCallout([ann.side.main, en ? 'Both Left & Right Sides' : 'ระยะร่นด้านข้างทั้ง 2 ด้าน'], startX + Math.max(4, slPx / 2), midY);
      }
    }
  }

  // Render Left Callout Column with Leader Lines
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
    const env2 = `${fmt(setbacks.buildWidth, 2)} × ${fmt(setbacks.buildDepth, 2)} ${uM} (${fmt(setbacks.buildableFootprintGround, 1)} ${uSqm})`;
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
    envelope = svgBadge(startX + pw / 2, plotStartY + ph / 2, [en ? '⚠️ Setbacks Exceed Plot Dimensions' : '⚠️ ระยะร่นเกินขนาดแปลงที่ดิน'], {
      color: '#B91C1C', bg: '#FEE2E2', stroke: '#EF4444', fontSize: 12
    }).svg;
  }

  // Exterior Dimension Lines
  let dims = '';
  if (state.showDims) {
    const dy = plotBottomY + 30;
    const dx = plotRight + 32;
    const wLabel = en ? `Width ${fmt(W, 2)} m` : `หน้ากว้าง ${fmt(W, 2)} ม.`;
    const dLabel = en ? `Depth ${fmt(D, 2)} m` : `ความลึก ${fmt(D, 2)} ม.`;
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
      ${svgBadge(startX + pw / 2, dy, [wLabel], { color: pal.dim, bg: pal.card, fontSize: 10.5 }).svg}
      ${svgBadge(dx + 10, plotStartY + ph / 2, [dLabel], { color: pal.dim, bg: pal.card, fontSize: 10.5, align: 'start' }).svg}`;
  }

  // Master Highrise Fire-Engine Setback Annotation Banner
  const master = (ann.master && state.showSetbackHatch)
    ? svgBadge(startX + pw / 2, Math.min(viewH - 54, plotBottomY + (state.showDims ? 62 : 32)), [ann.master], {
        color: pal.setback, bg: pal.badgeBg, fontSize: 10.5, strokeWidth: 1.5
      }).svg
    : '';

  const roadLabelText = en ? `Public Road (ROW ${fmt(road, 1)} m)` : `ถนนสาธารณะ (เขตทาง ${fmt(road, 1)} ม.)`;
  const frontLineText = en ? 'Front Plot Boundary' : 'แนวเขตที่ดินด้านหน้า';

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
    ${svgBadge(startX + pw / 2, roadCenterY, [roadLabelText], { color: pal.text, bg: pal.card, stroke: pal.roadLine, fontSize: 10.5 }).svg}
    <text x="${startX + pw / 2}" y="${plotStartY - 8}" text-anchor="middle" font-family="'Prompt', 'Inter', sans-serif" font-size="10" font-weight="500" fill="${pal.dim}">${frontLineText}</text>
    <text x="${viewW - 20}" y="76" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${pal.stroke}">PLOT ${fmt(W, 1)} × ${fmt(D, 1)} ${uM}</text>

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
  const en = isEn();
  const uM = en ? 'm' : 'ม.';
  const uFl = en ? 'fl.' : 'ชั้น';
  const status = state.lastBannerStatus || 'pass';
  const violation = status === 'violation';

  const W = state.widthMeters;
  const D = state.depthMeters;
  const road = state.roadWidth;
  const H = spec.H;

  // 30° Isometric Axes
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
  const margin = { left: 185, right: 185, top: 108, bottom: ann.master ? 104 : 68 };
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
      if (p.x < 10 || p.x > viewW - 10 || p.y < 52 || p.y > viewH - 10) continue;
      dots += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="1.2" />`;
    }
  }

  // Public Road Strip in Foreground
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
    const hLine1 = en ? `Height H = ${fmt(H, 1)} m` : `ความสูง H = ${fmt(H, 1)} ม.`;
    const hLine2 = en
      ? `(${spec.floors} ${uFl} · Max Ceiling ${fmt(setbacks.heightLimitMeters, 1)} m)`
      : `(${spec.floors} ชั้น · เพดานสูงสุด ${fmt(setbacks.heightLimitMeters, 1)} ม.)`;
    hDim = `
      <g class="height-dim-line" stroke="${pal.dim}" stroke-width="1.2">
        <line x1="${base.x - 4}" y1="${base.y}" x2="${hx - 6}" y2="${base.y}" opacity="0.7" />
        <line x1="${topP.x - 4}" y1="${topP.y}" x2="${hx - 6}" y2="${topP.y}" opacity="0.7" />
        <line x1="${hx}" y1="${base.y}" x2="${hx}" y2="${topP.y}" stroke-width="1.6" />
        <line x1="${hx - 5}" y1="${base.y + 5}" x2="${hx + 5}" y2="${base.y - 5}" stroke-width="2.2" />
        <line x1="${hx - 5}" y1="${topP.y + 5}" x2="${hx + 5}" y2="${topP.y - 5}" stroke-width="2.2" />
      </g>
      ${svgBadge(hx - 8, (base.y + topP.y) / 2, [hLine1, hLine2], {
        color: violation ? pal.danger : pal.text,
        bg: pal.card,
        stroke: violation ? pal.danger : pal.dim,
        fontSize: 10,
        align: 'end',
        cls: 'h-dim-badge'
      }).svg}`;

    if (violation) {
      const tc = P((bu0 + bu1) / 2, (bw0 + bw1) / 2, H);
      massing += svgBadge(tc.x, tc.y, ['⛔ PROHIBITED', en ? 'Violates Ministerial Reg. No. 33' : 'ขัดต่อกฎกระทรวง ฉบับที่ 33'], {
        color: '#FFFFFF', bg: pal.danger, stroke: '#9F1239', fontSize: 10.5
      }).svg;
    }
  } else {
    const c = P(W / 2, D / 2);
    massing = svgBadge(c.x, c.y, [en ? '⚠️ Setbacks Exceed Plot Dimensions' : '⚠️ ระยะร่นเกินขนาดแปลงที่ดิน'], {
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
    layoutColumn(leftItems, 10, 96, viewH - 96).forEach(c => {
      calloutSvg += `<polyline points="${colL + 2},${c.y} ${colL + 10},${c.y} ${c.ax},${c.ay}" fill="none" stroke="${pal.setback}" stroke-width="1.1" />
        <circle cx="${c.ax}" cy="${c.ay}" r="2.8" fill="${pal.setback}" />
        ${svgBadge(colL, c.y, c.lines, { color: pal.setback, bg: pal.badgeBg, align: 'end', cls: 'iso-setback-badge' }).svg}`;
    });
    layoutColumn(rightItems, 10, 96, viewH - 96).forEach(c => {
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

  const infoSub = en
    ? `Plot ${fmt(W, 1)} × ${fmt(D, 1)} m · Footprint ${fmt(setbacks.buildWidth, 1)} × ${fmt(setbacks.buildDepth, 1)} m · H = ${fmt(H, 1)} m`
    : `แปลง ${fmt(W, 1)} × ${fmt(D, 1)} ม. · Footprint ${fmt(setbacks.buildWidth, 1)} × ${fmt(setbacks.buildDepth, 1)} ม. · สูง H = ${fmt(H, 1)} ม.`;
  const info = `
    <text x="${viewW - 20}" y="72" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${pal.text}">ISOMETRIC 30° — ${svgEsc(spec.label)}</text>
    <text x="${viewW - 20}" y="88" text-anchor="end" font-family="'Prompt', 'Inter', sans-serif" font-size="10" fill="${pal.dim}">${svgEsc(infoSub)}</text>`;

  const roadLabelText = en ? `Public Road (ROW ${fmt(road, 1)} m)` : `ถนนสาธารณะ (เขตทาง ${fmt(road, 1)} ม.)`;

  svg.setAttribute('viewBox', `0 0 ${viewW} ${viewH}`);
  svg.innerHTML = `
    <g fill="${pal.dot}" opacity="0.9">${dots}</g>
    ${roadSvg}
    ${ground}
    ${massing}
    ${state.showDims ? hDim : ''}
    ${svgBadge(roadLabelPt.x, roadLabelPt.y, [roadLabelText], { color: pal.text, bg: pal.card, stroke: pal.roadLine, fontSize: 10.5 }).svg}
    ${calloutSvg}
    ${master}
    ${info}
  `;
  document.getElementById('canvasScaleTag').textContent = `ISO 30° · H ${fmt(H, 1)} ${uM} (${spec.floors} ${uFl})`;
}

// --- 8. Road Slider Floating Pill Helper ---
function updateRoadSliderUI(val) {
  const slider = document.getElementById('roadWidthSlider');
  const pill = document.getElementById('roadFloatingPill');
  const badge = document.getElementById('roadCurrentBadge');
  const uM = isEn() ? 'm' : 'ม.';
  const uFull = isEn() ? 'Meters' : 'เมตร';

  if (badge) badge.textContent = `${fmt(val, 1)} ${uFull}`;
  if (!slider || !pill) return;

  const min = parseFloat(slider.min) || 3;
  const max = parseFloat(slider.max) || 35;
  const pct = Math.max(4, Math.min(96, ((val - min) / (max - min)) * 100));
  pill.style.left = `${pct}%`;
  pill.textContent = `${fmt(val, 1)} ${uM}`;

  document.querySelectorAll('#roadPillRow .tactile-pill').forEach(p => {
    const r = parseFloat(p.getAttribute('data-road'));
    const match =
      (r === 5 && val < 6) ||
      (r === 6 && val >= 6 && val < 9) ||
      (r === 10 && val >= 9 && val < 11) ||
      (r === 12 && val >= 11 && val < 14) ||
      (r === 16 && val >= 14 && val < 24) ||
      (r === 30 && val >= 24);
    p.classList.toggle('active', match);
  });
}

// --- 9. Event Listeners & Interactive Handlers ---
function initEventListeners() {
  // 9.0 Landing View Launch & Reopen + Bilingual Switcher
  const landingView = document.getElementById('landingView');
  const launchBtn = document.getElementById('launchStudioBtn');
  const reopenBtn = document.getElementById('reopenLandingBtn');

  if (launchBtn && landingView) {
    launchBtn.addEventListener('click', () => {
      landingView.classList.add('dismissed');
    });
  }
  if (reopenBtn && landingView) {
    reopenBtn.addEventListener('click', () => {
      landingView.classList.remove('dismissed');
    });
  }

  // Bilingual Switcher ([ TH | EN ]) on both Landing & Topbar
  document.querySelectorAll('[data-lang-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang-switch');
      applyLanguage(targetLang);
    });
  });

  // 9.1 Unit Mode Switcher (Wah / Deed / Sqm)
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

  // 9.2 View Mode Switcher ([ 2D Plan | 3D Isometric ])
  document.querySelectorAll('[data-view-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-view-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.viewMode = btn.getAttribute('data-view-mode');
      recalculateFeasibility();
    });
  });

  // 9.3 Input Total Wah
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

  // 9.4 Deed Inputs (Rai - Ngan - Wah) with Two-way Binding & Rollover
  const deedRai = document.getElementById('deedRai');
  const deedNgan = document.getElementById('deedNgan');
  const deedWah = document.getElementById('deedWah');

  function handleDeedInput(e) {
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

    if (w >= 100) {
      const extraNgan = Math.floor(w / 100);
      w = Number((w % 100).toFixed(1));
      n += extraNgan;
      rolledOver = true;
    }

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
      showToast(
        isEn()
          ? `Normalized deed units: ${r} Rai ${n} Ngan ${w} Sq.Wah`
          : `ปัดทดหน่วยโฉนด: ${r} ไร่ ${n} งาน ${w} ตร.ว.`
      );
    }
  }

  [deedRai, deedNgan, deedWah].forEach(el => {
    el.addEventListener('input', handleDeedInput);
    el.addEventListener('change', normalizeDeedInputs);
    el.addEventListener('blur', normalizeDeedInputs);
  });

  // 9.5 Input Total Sqm
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

  // 9.6 Width & Depth Inputs (Two-way Sync with Area & Deed Inputs)
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

  // 9.7 Sync Aspect Ratio Button
  document.getElementById('syncAspectBtn').addEventListener('click', () => {
    autoBalanceDimensions();
    recalculateFeasibility();
    showToast(isEn() ? 'Balanced plot aspect ratio to 1:2' : 'ปรับขนาดแปลงที่ดินให้สมดุลสัดส่วน 1:2 เรียบร้อย');
  });

  // 9.8 Interactive Road Width Slider & Quick Pills with Floating Value Pill
  const roadSlider = document.getElementById('roadWidthSlider');
  const roadWrap = document.getElementById('roadSliderWrap');

  roadSlider.addEventListener('input', () => {
    if (roadWrap) roadWrap.classList.add('dragging');
    setRoadWidth(parseFloat(roadSlider.value));
    clearTimeout(roadSlider._dragTimer);
    roadSlider._dragTimer = setTimeout(() => {
      if (roadWrap) roadWrap.classList.remove('dragging');
    }, 900);
  });

  document.querySelectorAll('#roadPillRow .tactile-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#roadPillRow .tactile-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = parseFloat(pill.getAttribute('data-road'));
      roadSlider.value = val;
      if (roadWrap) {
        roadWrap.classList.add('dragging');
        clearTimeout(roadSlider._dragTimer);
        roadSlider._dragTimer = setTimeout(() => roadWrap.classList.remove('dragging'), 900);
      }
      setRoadWidth(val);
    });
  });

  function setRoadWidth(val) {
    state.roadWidth = val;
    updateRoadSliderUI(val);
    recalculateFeasibility();
  }

  // 9.9 Zoning Selector (Real-time onChange / onInput binding)
  const zoneSelect = document.getElementById('zoneSelect');
  function applyZoneChange(rawVal) {
    const nextKey = resolveZoneKey(rawVal || (zoneSelect ? zoneSelect.value : 'Y1'));
    state.zoneKey = nextKey;
    const z = BMA_ZONING_DATA[nextKey] || BMA_ZONING_DATA.Y1;
    state.far = z.far;
    state.osr = z.osr;
    state.bcr = z.bcr;
    if (zoneSelect && zoneSelect.value !== nextKey) {
      zoneSelect.value = nextKey;
    }
    recalculateFeasibility();
  }
  window.handleZoneChange = applyZoneChange;
  if (zoneSelect) {
    ['change', 'input', 'keyup'].forEach(evtName => {
      zoneSelect.addEventListener(evtName, (e) => {
        applyZoneChange(e.target.value);
      });
    });
  }

  // 9.10 Typology Pills
  document.querySelectorAll('#typologyGrid .typo-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#typologyGrid .typo-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.typology = btn.getAttribute('data-typo');
      recalculateFeasibility();
    });
  });

  // 9.11 Price Valuation
  document.getElementById('inputPriceRate').addEventListener('input', updateValuation);
  document.getElementById('selectPriceMode').addEventListener('change', updateValuation);

  document.getElementById('togglePriceFoldBtn').addEventListener('click', () => {
    const btn = document.getElementById('togglePriceFoldBtn');
    const content = document.getElementById('priceFoldContent');
    content.classList.toggle('hidden');
    btn.classList.toggle('collapsed');
  });

  // 9.12 Schematic Board Viewport Toggles (Floating Glassmorphism Dock)
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
    showToast(isEn() ? 'Centered viewport (Fit to Screen)' : 'ปรับกึ่งกลางมุมมองผัง (Fit to Screen)');
  });

  // 9.13 Legal Drawer Toggle & Tabs
  const drawerHeader = document.getElementById('drawerHeaderToggle');
  const drawerBody = document.getElementById('drawerBody');
  drawerHeader.addEventListener('click', () => {
    drawerBody.classList.toggle('hidden');
    drawerHeader.classList.toggle('collapsed');
    const hidden = drawerBody.classList.contains('hidden');
    document.getElementById('drawerStateTag').textContent = isEn()
      ? (hidden ? 'Click to expand' : 'Hide details')
      : (hidden ? 'คลิกเพื่อดูรายละเอียด' : 'ซ่อนรายละเอียด');
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

  // 9.14 Copy Summary Button
  document.getElementById('copySummaryBtn').addEventListener('click', () => {
    const zone = BMA_ZONING_DATA[state.zoneKey];
    const setbacks = calculateLegalSetbacks();
    const wah = state.totalSqm / SQM_PER_WAH;
    const maxGfa = state.totalSqm * zone.far;
    const footprint = Math.min(state.totalSqm * (zone.bcr / 100), setbacks.buildableFootprintGround);
    const openSpace = state.totalSqm * (zone.osr / 100);

    const summaryText = isEn()
      ? `📐 ARCH // STUDIO — FEASIBILITY REPORT
==========================================
Land Area: ${fmt(wah, 1)} sq.w. (${fmt(state.totalSqm, 1)} sq.m.)
Plot Dimensions: Width ${fmt(state.widthMeters, 2)} m × Depth ${fmt(state.depthMeters, 2)} m
Public Road ROW: ${fmt(state.roadWidth, 1)} m
BMA Zoning: ${zone.nameEn} (FAR ${zone.far} : OSR ${zone.osr}%)

Architectural Feasibility Metrics:
- Max Gross Floor Area (GFA): ${fmt(maxGfa, 1)} sq.m.
- Max Ground Footprint (BCR): ${fmt(footprint, 1)} sq.m.
- Min Open Space (OSR): ${fmt(openSpace, 1)} sq.m.
- Max Height Limit: ${fmt(setbacks.heightLimitMeters, 1)} m
- Buildable Envelope: ${fmt(setbacks.buildWidth, 2)} m × ${fmt(setbacks.buildDepth, 2)} m
==========================================
Generated by ARCH // STUDIO Workspace`
      : `📐 ARCH // STUDIO — FEASIBILITY REPORT
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
      showToast(isEn() ? 'Copied feasibility report to clipboard' : 'คัดลอกสรุปศักยภาพที่ดินเรียบร้อยแล้ว');
    });
  });

  // 9.15 Reset Button
  document.getElementById('resetWorkspaceBtn').addEventListener('click', () => {
    state.totalSqm = 200.0;
    state.widthMeters = 10.0;
    state.depthMeters = 20.0;
    state.roadWidth = 6.0;
    state.zoneKey = 'Y1';
    state.far = 1.0;
    state.osr = 40.0;
    state.bcr = 60.0;
    state.typology = 'residential';
    state.priceRate = 65000;
    state.priceMode = 'perWah';
    state.deedDefaultWahUntouched = true;

    document.getElementById('inputTotalWah').value = 50;
    document.getElementById('inputTotalSqm').value = 200;
    document.getElementById('inputPlotWidth').value = 10;
    document.getElementById('inputPlotDepth').value = 20;
    document.getElementById('roadWidthSlider').value = 6;
    document.getElementById('zoneSelect').value = 'Y1';

    document.querySelectorAll('#roadPillRow .tactile-pill').forEach(pill => {
      pill.classList.toggle('active', parseFloat(pill.getAttribute('data-road')) === 6.0);
    });

    document.querySelectorAll('#typologyGrid .typo-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-typo') === 'residential');
    });

    updateRoadSliderUI(6.0);
    autoBalanceDimensions();
    updateChipMeta(true);
    recalculateFeasibility();
    showToast(isEn() ? 'Reset all parameters to default' : 'รีเซ็ตพารามิเตอร์ทั้งหมดเป็นค่าเริ่มต้น');
  });

  // 9.16 Theme Toggle (Dark / Light)
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
  const uM = isEn() ? 'm' : 'ม.';
  document.getElementById('tagPlotWidth').textContent = `${fmt(state.widthMeters, 2)} ${uM}`;
  document.getElementById('tagPlotDepth').textContent = `${fmt(state.depthMeters, 2)} ${uM}`;
  const ratio = (state.depthMeters / (state.widthMeters || 1)).toFixed(1);
  const syncBtnText = document.getElementById('syncAspectBtnText');
  if (syncBtnText) {
    syncBtnText.innerHTML = isEn()
      ? `🔗 Aspect Ratio W:D = 1:<strong id="aspectRatioLabel">${ratio}</strong> (Click to Balance)`
      : `🔗 อัตราส่วน W:D = 1:<strong id="aspectRatioLabel">${ratio}</strong> (คลิกเพื่อปรับสมดุล)`;
  }
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

  if (isEn()) {
    if (chipSqmEl) chipSqmEl.textContent = `${fmt(state.totalSqm, 2)} sq.m.`;
    if (chipWahEl) chipWahEl.textContent = `${fmt(roundedWah, 1)} sq.w.`;
    if (chipDeedEl) chipDeedEl.textContent = `${rai} Rai ${ngan} Ngan ${fmt(w, 1)} sq.w.`;
  } else {
    if (chipSqmEl) chipSqmEl.textContent = `${fmt(state.totalSqm, 2)} ตร.ม.`;
    if (chipWahEl) chipWahEl.textContent = `${fmt(roundedWah, 1)} ตร.ว.`;
    if (chipDeedEl) chipDeedEl.textContent = `${rai} ไร่ ${ngan} งาน ${fmt(w, 1)} ตร.ว.`;
  }

  if (syncInputs) {
    document.getElementById('deedRai').value = rai;
    document.getElementById('deedNgan').value = ngan;
    document.getElementById('deedWah').value = w;
  }
}

// --- 10. Bootstrap on DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  updateRoadSliderUI(state.roadWidth);
  autoBalanceDimensions();
  updateChipMeta(true);
  recalculateFeasibility();
});
