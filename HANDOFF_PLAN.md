# HANDOFF PLAN: International Studio Grade UX/UI Overhaul (v4.0 — Runway AI Reference)

เอกสารฉบับนี้ออกแบบสถาปัตยกรรม UX/UI และรวบรวมโค้ดฉบับสมบูรณ์สำหรับ **Executor (Flash)** เพื่อนำไปอัปเดตไฟล์ในโปรเจกต์โดยตรงตามกฎ **Architect & Executor Handoff Protocol** โดย **ห้ามแตะต้องหรือทำลาย Logic การคำนวณกฎหมาย BMA, ระยะร่น Typology Setbacks, Two-Way Data Binding และระบบ Road Gatekeeper เดิมที่ทำงานถูกต้อง 100%**

---

## 1. สรุปสถาปัตยกรรม UX/UI ที่ปรับปรุง (Architectural Design Specification)

1. **Cinematic Landing Page (Runway AI Inner Bezel Frame)**:
   - **Inner Rounded Bezel**: ปรับโครงสร้าง `#landingView` ให้เป็นกรอบภาพยนตร์ `padding: 16px 24px` บนพื้นหลัง `#09090B` (Neutral-950) ล้อมรอบจอภาพหลัก `.landing-bezel-frame` ที่มีขอบมน `border-radius: 22px` พร้อมแถบ Navigation ด้านบนแบบ Runway
   - **Dark Atmospheric Architectural Canvas**: ตัดกราฟิก Neon Grid และลูกบาศก์ 3D Wireframe เดิมออกทั้งหมด เปลี่ยนเป็นพื้นหลังเกรเดียนท์เทา-ดำลึกระดับพรีเมียม (`#09090B` -> `#141418` -> `#1F1F26`) ผสานแสง Ambient Spotlight นวลตาและ Horizon Mist แบบภาพยนตร์
   - **Minimalist Editorial Hierarchy**: จัดวางข้อความที่มุมซ้ายล่างของเฟรมภาพยนตร์ (Editorial Bottom-Left Layout ตามภาพอ้างอิง Runway) เหลือเพียง Headline ใหญ่คมชัด 1 ประโยคเด่น และคำอธิบายย่อยสั้น ๆ 1 บรรทัด พร้อมรายการ Specification มินิมอลด้านขวา
   - **Runway Capsule CTA Pair**: ปุ่มหลัก `Launch Studio →` (แคปซูลขาวทึบ `#FFFFFF` ตัวอักษรดำ) คู่กับปุ่มรอง `Documentation` / `คู่มือกฎหมาย` (แคปซูลกระจกใส ขอบบาง)

2. **Studio Workspace (Full-Viewport Locked Web App `100vh`)**:
   - **Locked Screen Viewport**: ล็อก `.studio-app-shell` ที่ `height: 100vh; overflow: hidden;` ไม่มีการเลื่อนสกอร์ทั้งหน้าเว็บ الكامل
   - **Independent Scroll Sidebar**: คอลัมน์ซ้าย (`.inspector-column`) กว้าง `340px` เลื่อนสกอร์แยกอิสระเฉพาะพาเนลเครื่องมือ พร้อมซ่อนหัวข้อเทอะทะ (`+ PARAMETERS // 01-04`, `+ STUDIO VIEWPORT // REAL-TIME`) ด้วยคลาส `.sr-only` เพื่อความคลีนและไม่กระทบ DOM ID ใน `script.js`
   - **Sleek HUD Strip & Hero Viewport (75%+ Area)**: ย่อส่วนแจ้งเตือน Gatekeeper และการ์ดตัวเลข 4 ค่า (`MAX GFA`, `FOOTPRINT`, `OPEN SPACE`, `MAX HEIGHT`) ให้กลายเป็น **Sleek Compact HUD Strip** แถบแนวนอนเพรียวบางด้านบน เพื่อเปิดพื้นที่ให้ **2D/3D Interactive Canvas (`#schematicViewport`)** ขยายเต็มพื้นที่มากกว่า 75-80% ของหน้าจอ
   - **Slide-Over Collapsible Legal Drawer**: แปลงการ์ดข้อกำหนดกฎหมาย Tier 1 / Tier 2 (`#legalDrawerCard`) ให้พับเก็บเป็นแถบสถานะบางเฉียบชิดขอบล่างโดยค่าเริ่มต้น (`#drawerBody.hidden`) และสไลด์เลื่อนขึ้นมาเป็น **Slide-Over Glass Panel** เหนือขอบล่างของแคนวาสเมื่อคลิกเปิดดู

3. **Minimalist Typography & Monochrome Neutral Palette**:
   - บังคับใช้ฟอนต์ `'Plus Jakarta Sans'`, `'Inter'` คู่กับ `'IBM Plex Sans Thai'` ในน้ำหนัก `400` (Regular) และ `500` (Medium) ลดความหนาทึบเกินจำเป็น
   - คุมโทนสี **Monochrome Neutral Grayscale** (ขาว-เทา-ดำ) และใช้จุดเรืองแสงเล็ก ๆ (**Accent Dot**) แสดงสถานะกฎหมาย (เขียว `#10B981`, ส้ม `#F59E0B`, แดง `#F43F5E`)

---

## 2. รายชื่อไฟล์ที่ต้องแก้ไข (Files to Update)

1. `index.html` — แทนที่ด้วยโค้ดฉบับเต็มด้านล่าง
2. `style.css` — แทนที่ด้วยโค้ดฉบับเต็มด้านล่าง
3. `script.js` — อัปเดตเฉพาะจุดเชื่อมต่อ UI 2 จุดเล็ก ๆ (ดูรายละเอียดในหัวข้อที่ 5) โดยห้ามแตะต้องฟังก์ชันคำนวณ

---

## 3. โค้ดฉบับเต็มสำหรับไฟล์ `index.html`

ให้นำโค้ดด้านล่างนี้ไปเขียนทับไฟล์ `index.html` ทั้งหมด:

```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>ARCH // STUDIO — Bangkok Zoning &amp; 3D Envelope Simulator</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📐</text></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css?v=4.0">
</head>
<body>

  <!-- ========================================================================
       1. CINEMATIC ENTRY LANDING VIEW (Runway AI Inner Rounded Bezel & Editorial Layout)
       ======================================================================== -->
  <section class="landing-overlay" id="landingView" aria-label="ARCH // STUDIO Intro">
    <!-- Top Minimal Bar Outside the Rounded Bezel -->
    <header class="landing-outer-nav">
      <div class="landing-brand-left">
        <span class="landing-brand-wordmark">ARCH // STUDIO</span>
      </div>

      <div class="landing-nav-center" aria-hidden="true">
        <span id="landingChip1">BMA ZONING 2026</span>
        <span id="landingChip2">MINISTERIAL REG. 33 &amp; 55</span>
        <span id="landingChip3">3D PARAMETRIC ENVELOPE</span>
      </div>

      <div class="landing-nav-right">
        <div class="lang-switcher landing-lang" role="group" aria-label="Language Switcher">
          <button type="button" class="lang-btn active" data-lang-switch="th">TH</button>
          <button type="button" class="lang-btn" data-lang-switch="en">EN</button>
        </div>
        <button type="button" class="landing-top-try-btn" id="landingTopLaunchBtn" onclick="document.getElementById('launchStudioBtn').click()">
          <span>Try Studio</span>
        </button>
      </div>
    </header>

    <!-- Runway Inner Rounded Bezel Stage -->
    <div class="landing-bezel-frame">
      <!-- Dark Atmospheric Architectural Canvas (Soft Spotlight & Horizon Mist, No Neon Grid/Cube) -->
      <div class="landing-atmospheric-canvas" aria-hidden="true">
        <div class="ambient-spotlight spot-primary"></div>
        <div class="ambient-spotlight spot-horizon"></div>
        <div class="ambient-architectural-silhouette"></div>
        <div class="ambient-vignette"></div>
      </div>

      <!-- Editorial Bottom Content Grid (Runway Style) -->
      <div class="landing-editorial-grid">
        <div class="landing-editorial-left">
          <!-- Hidden legacy hooks for script.js compatibility -->
          <span class="sr-only" id="landingEyebrowText">SPATIAL INTELLIGENCE</span>
          <span class="sr-only" id="landingTitleSub">ARCH // STUDIO</span>
          <span class="sr-only" id="landingTaglinePrimary">จำลองศักยภาพผังเมืองและมวลอาคารแห่งอนาคต</span>

          <h1 class="landing-editorial-headline" id="landingHeroHeadline">
            Building Spatial Intelligence for Bangkok
          </h1>

          <p class="landing-editorial-subline" id="landingTaglineSecondary">
            Simulate Bangkok Building Codes, Setbacks &amp; 3D Massing Envelopes in Real-Time
          </p>

          <!-- Paired Runway Capsule CTA Buttons -->
          <div class="landing-cta-group">
            <button type="button" class="launch-studio-btn" id="launchStudioBtn">
              <span class="launch-btn-text" id="launchStudioBtnText">Launch Studio</span>
              <span class="launch-btn-arrow" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </button>
            <button type="button" class="secondary-studio-btn" id="viewRegsBtn">
              <span id="viewRegsBtnText">Documentation</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="landing-editorial-right" aria-hidden="true">
          <ul class="landing-pillar-list">
            <li>BANGKOK COMPREHENSIVE PLAN (FAR &amp; OSR)</li>
            <li>MINISTERIAL REGULATION NO. 33 &amp; 55 SETBACKS</li>
            <li>REAL-TIME 2D CAD &amp; 3D ISOMETRIC MASSING</li>
            <li>AUTOMATED ROAD WIDTH GATEKEEPER ENGINE</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================
       2. RUNWAY STUDIO WORKSPACE (Locked 100vh Full-Viewport Web Application)
       ======================================================================== -->
  <div class="studio-app-shell" id="studioWorkspace">

    <!-- Ultra-Clean Compact Top Bar -->
    <header class="studio-topbar">
      <div class="topbar-left">
        <button type="button" class="studio-monogram" id="reopenLandingBtn" title="เปิดหน้าแนะนำ (Intro View)">
          <span class="mono-symbol">📐</span>
        </button>
        <div class="studio-brand-meta">
          <div class="studio-title-row">
            <span class="studio-brand">ARCH // STUDIO</span>
            <span class="studio-status-dot" title="Live Parametric Engine"></span>
            <span class="studio-tag" id="topbarVersionTag">v4.0</span>
          </div>
          <span class="studio-divider-slash">/</span>
          <p class="studio-subtitle" id="topbarSubtitle">Bangkok Zoning &amp; 3D Envelope Simulator</p>
        </div>
      </div>

      <!-- Right Controls Dock -->
      <div class="topbar-right studio-controls-dock">
        <div class="lang-switcher" id="topbarLangSwitcher" role="group" aria-label="สลับภาษา TH / EN">
          <button type="button" class="lang-btn active" data-lang-switch="th" id="btnLangTh">TH</button>
          <button type="button" class="lang-btn" data-lang-switch="en" id="btnLangEn">EN</button>
        </div>

        <button class="tactile-btn secondary" id="resetWorkspaceBtn" title="รีเซ็ตค่าเริ่มต้น">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          <span class="btn-label-desktop" id="labelResetBtn">รีเซ็ต</span>
        </button>

        <button class="tactile-btn primary" id="copySummaryBtn" title="คัดลอกสรุปศักยภาพที่ดิน">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span class="btn-label-desktop" id="labelCopyBtn">คัดลอกสรุป</span>
        </button>

        <button class="icon-toggle-btn" id="themeToggleBtn" title="สลับโหมดสว่าง/มืด (Studio Dark/Light)">
          <svg id="themeIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>
      </div>
    </header>

    <!-- Studio Main 2-Pane Split: Left Inspector Sidebar + Right Hero Viewport -->
    <main class="workspace-grid">

      <!-- LEFT COLUMN: Clean Parameter Sidebar (Independently Scrollable) -->
      <aside class="inspector-column" aria-label="Parameter Inspector">
        <!-- Visually hidden legacy headers to keep UI ultra-clean while preserving script.js IDs -->
        <div class="sr-only">
          <span id="badgeInspector">PARAMETERS</span>
          <h2 id="headingInspector">พารามิเตอร์ที่ดินและกฎหมาย</h2>
        </div>

        <!-- Card 1: ขนาดแปลงและมิติที่ดิน (Parcel Dimensions & Area) -->
        <section class="inspector-card">
          <div class="card-bar">
            <div class="card-caption">
              <span class="caption-index">01</span>
              <span class="caption-title" id="titleCard01">ขนาดแปลงและมิติที่ดิน</span>
            </div>
            <div class="mini-tab-group" id="unitModeGroup">
              <button class="mini-tab active" data-unit-mode="wah" id="tabUnitWah">ตร.วา</button>
              <button class="mini-tab" data-unit-mode="deed" id="tabUnitDeed">ไร่-งาน-วา</button>
              <button class="mini-tab" data-unit-mode="sqm" id="tabUnitSqm">ตร.ม.</button>
            </div>
          </div>

          <!-- Mode A: ตารางวา -->
          <div class="unit-mode-content" id="modeWahContent">
            <div class="numeric-field-hero">
              <label for="inputTotalWah" id="labelTotalWah">ขนาดที่ดินรวม</label>
              <div class="input-with-suffix">
                <input type="number" step="any" min="1" id="inputTotalWah" value="50" class="hero-input">
                <span class="input-suffix" id="suffixWah">ตร.ว.</span>
              </div>
            </div>
          </div>

          <!-- Mode B: โฉนดที่ดิน ไร่-งาน-วา -->
          <div class="unit-mode-content hidden" id="modeDeedContent">
            <div class="deed-tri-inputs">
              <div class="deed-col">
                <label for="deedRai" id="labelDeedRai">ไร่</label>
                <input type="number" min="0" id="deedRai" value="0" class="sub-input">
              </div>
              <div class="deed-col">
                <label for="deedNgan" id="labelDeedNgan">งาน</label>
                <input type="number" min="0" max="3" id="deedNgan" value="0" class="sub-input">
              </div>
              <div class="deed-col">
                <label for="deedWah" id="labelDeedWah">ตร.วา</label>
                <input type="number" step="any" min="0" max="99.9" id="deedWah" value="50" class="sub-input">
              </div>
            </div>
          </div>

          <!-- Mode C: ตารางเมตร -->
          <div class="unit-mode-content hidden" id="modeSqmContent">
            <div class="numeric-field-hero">
              <label for="inputTotalSqm" id="labelTotalSqm">พื้นที่รวม (ตารางเมตร)</label>
              <div class="input-with-suffix">
                <input type="number" step="any" min="4" id="inputTotalSqm" value="200" class="hero-input">
                <span class="input-suffix" id="suffixSqm">ตร.ม.</span>
              </div>
            </div>
          </div>

          <!-- Live Conversion Chips -->
          <div class="field-meta-chips">
            <span class="meta-chip" id="chipSqm">200.00 ตร.ม.</span>
            <span class="meta-chip" id="chipWah">50.0 ตร.ว.</span>
            <span class="meta-chip" id="chipDeed">0 ไร่ 0 งาน 50 ตร.ว.</span>
          </div>

          <!-- Parcel Geometry: Width x Depth -->
          <div class="geometry-dimensions-box">
            <div class="dimension-col">
              <div class="dim-label-row">
                <label for="inputPlotWidth" id="labelPlotWidth">หน้ากว้าง (W)</label>
                <span class="dim-tag" id="tagPlotWidth">10.0 ม.</span>
              </div>
              <div class="input-with-suffix compact">
                <input type="number" step="0.5" min="2" id="inputPlotWidth" value="10" class="sub-input">
                <span class="input-suffix" id="suffixWidthM">ม.</span>
              </div>
            </div>

            <div class="dimension-col">
              <div class="dim-label-row">
                <label for="inputPlotDepth" id="labelPlotDepth">ความลึก (D)</label>
                <span class="dim-tag" id="tagPlotDepth">20.0 ม.</span>
              </div>
              <div class="input-with-suffix compact">
                <input type="number" step="0.5" min="2" id="inputPlotDepth" value="20" class="sub-input">
                <span class="input-suffix" id="suffixDepthM">ม.</span>
              </div>
            </div>
          </div>

          <div class="aspect-link-bar">
            <button type="button" class="aspect-sync-btn" id="syncAspectBtn" title="ปรับสัดส่วน กว้าง:ลึก อัตโนมัติตามพื้นที่รวม">
              <span id="syncAspectBtnText">🔗 อัตราส่วน W:D = 1:<strong id="aspectRatioLabel">2.0</strong> (คลิกเพื่อปรับสมดุล)</span>
            </button>
          </div>
        </section>

        <!-- Card 2: เขตทางถนนสาธารณะ (Public Road ROW) -->
        <section class="inspector-card">
          <div class="card-bar">
            <div class="card-caption">
              <span class="caption-index">02</span>
              <span class="caption-title" id="titleCard02">ความกว้างเขตทาง / ถนนสาธารณะ</span>
            </div>
            <span class="road-current-badge" id="roadCurrentBadge">6.00 เมตร</span>
          </div>

          <div class="road-control-wrap" id="roadSliderWrap">
            <div class="road-floating-pill" id="roadFloatingPill" aria-hidden="true">6.0 ม.</div>
            <input type="range" min="3" max="35" step="0.5" value="6" id="roadWidthSlider" class="tactile-range">
            <div class="range-marks" id="roadRangeMarks">
              <span>&lt;6 ม.</span>
              <span>6 ม.</span>
              <span>10 ม.</span>
              <span>16 ม.</span>
              <span>&ge;30 ม.</span>
            </div>
          </div>

          <div class="segmented-pill-row" id="roadPillRow">
            <button class="tactile-pill" data-road="5">&lt; 6 ม.</button>
            <button class="tactile-pill active" data-road="6">6 - 8 ม.</button>
            <button class="tactile-pill" data-road="10">10 ม.</button>
            <button class="tactile-pill" data-road="12">12 ม.</button>
            <button class="tactile-pill" data-road="16">16 ม.</button>
            <button class="tactile-pill" data-road="30">&ge; 30 ม.</button>
          </div>
          <p class="field-help-text" id="roadLegalHelpText">
            ถนนกว้าง 6.00 ม. — ระยะร่นด้านหน้าอย่างน้อย 2.00 ม. จากแนวเขตที่ดิน
          </p>
        </section>

        <!-- Card 3: ผังสี กทม. & ประเภทอาคาร (BMA Zoning & Typology) -->
        <section class="inspector-card">
          <div class="card-bar">
            <div class="card-caption">
              <span class="caption-index">03</span>
              <span class="caption-title" id="titleCard03">ผังเมือง กทม. &amp; ประเภทอาคาร</span>
            </div>
          </div>

          <div class="form-group">
            <label for="zoneSelect" class="form-label" id="labelZoneSelect">บริเวณผังสี (Bangkok Comprehensive Zoning)</label>
            <div class="custom-select-shell">
              <select id="zoneSelect" class="tactile-select" onchange="window.handleZoneChange && window.handleZoneChange(this.value)">
                <optgroup label="ที่อยู่อาศัยหนาแน่นน้อย (สีเหลือง)" id="optGroupLowRes">
                  <option value="Y1" selected>ย.1 (FAR 1.0 : OSR 40%) — ชานเมือง/บ้านเดี่ยว</option>
                  <option value="Y2">ย.2 (FAR 1.5 : OSR 25%) — ที่อยู่อาศัยชานเมือง</option>
                  <option value="Y3">ย.3 (FAR 2.5 : OSR 12.5%) — บ้านแถว/ทาวน์เฮาส์</option>
                  <option value="Y4">ย.4 (FAR 3.0 : OSR 10%) — ที่อยู่อาศัยรอบใน</option>
                </optgroup>
                <optgroup label="ที่อยู่อาศัยหนาแน่นปานกลาง (สีส้ม)" id="optGroupMedRes">
                  <option value="Y5">ย.5 (FAR 4.0 : OSR 7.5%) — คอนโด/อาคารรวม</option>
                  <option value="Y6">ย.6 (FAR 4.5 : OSR 6.5%) — ชุมชนเมืองชั้นกลาง</option>
                  <option value="Y7">ย.7 (FAR 5.0 : OSR 6.0%) — ใกล้รถไฟฟ้า</option>
                </optgroup>
                <optgroup label="ที่อยู่อาศัยหนาแน่นมาก (สีน้ำตาล)" id="optGroupHighRes">
                  <option value="Y8">ย.8 (FAR 6.0 : OSR 5.0%) — ย่านใจกลางเมือง</option>
                  <option value="Y9">ย.9 (FAR 7.0 : OSR 4.5%) — ศูนย์กลางคมนาคม</option>
                  <option value="Y10">ย.10 (FAR 8.0 : OSR 4.0%) — ย่าน CBD สูงพิเศษ</option>
                </optgroup>
                <optgroup label="พาณิชยกรรม (สีแดง)" id="optGroupComm">
                  <option value="C1">พ.1 (FAR 5.0 : OSR 6.0%) — พาณิชยกรรมชุมชน</option>
                  <option value="C3">พ.3 (FAR 7.0 : OSR 4.5%) — ย่านการค้าสำคัญ</option>
                  <option value="C5">พ.5 (FAR 10.0 : OSR 3.0%) — ศูนย์กลางพาณิชย์หลัก CBD</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div class="zoning-specs-strip">
            <div class="spec-cell">
              <span class="spec-key">FAR RATIO</span>
              <span class="spec-val" id="dispFar">1.0 : 1</span>
            </div>
            <div class="spec-divider"></div>
            <div class="spec-cell">
              <span class="spec-key">MIN OSR</span>
              <span class="spec-val" id="dispOsr">40%</span>
            </div>
            <div class="spec-divider"></div>
            <div class="spec-cell">
              <span class="spec-key">MAX BCR</span>
              <span class="spec-val" id="dispBcr">60%</span>
            </div>
          </div>

          <div class="form-group" style="margin-top: 12px;">
            <label class="form-label" id="labelTypology">ประเภทอาคาร (Building Typology)</label>
            <div class="typology-grid" id="typologyGrid">
              <button class="typo-pill active" data-typo="residential" id="btnTypoResidential">
                <span class="typo-icon">🏡</span>
                <span class="typo-name" id="typoNameResidential">บ้านเดี่ยว / พักอาศัย</span>
              </button>
              <button class="typo-pill" data-typo="shophouse" id="btnTypoShophouse">
                <span class="typo-icon">🏬</span>
                <span class="typo-name" id="typoNameShophouse">อาคารพาณิชย์ / ตึกแถว</span>
              </button>
              <button class="typo-pill" data-typo="highrise" id="btnTypoHighrise">
                <span class="typo-icon">🏢</span>
                <span class="typo-name" id="typoNameHighrise">อาคารขนาดใหญ่ / คอนโด</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Card 4: ประมาณการมูลค่าที่ดิน (Land Price Estimator) -->
        <section class="inspector-card">
          <div class="card-bar">
            <div class="card-caption">
              <span class="caption-index">04</span>
              <span class="caption-title" id="titleCard04">ประเมินมูลค่าที่ดิน (Land Valuation)</span>
            </div>
            <button type="button" class="fold-toggle-btn" id="togglePriceFoldBtn" aria-expanded="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>

          <div class="foldable-content" id="priceFoldContent">
            <div class="price-input-grid">
              <div class="input-with-suffix compact">
                <input type="number" step="1000" min="0" id="inputPriceRate" value="65000" class="sub-input">
                <span class="input-suffix" id="suffixBaht">บาท</span>
              </div>
              <select id="selectPriceMode" class="tactile-select compact">
                <option value="perWah" id="optPricePerWah">บาท / ตารางวา</option>
                <option value="perSqm" id="optPricePerSqm">บาท / ตารางเมตร</option>
                <option value="perRai" id="optPricePerRai">บาท / ไร่</option>
              </select>
            </div>
            <div class="price-summary-badge">
              <span class="ps-label" id="labelTotalLandValue">มูลค่าประเมินรวมทั้งแปลง</span>
              <strong class="ps-value" id="valTotalLandPrice">3,250,000 บาท</strong>
            </div>
          </div>
        </section>
      </aside>

      <!-- CENTER / RIGHT HERO STAGE: Sleek HUD Strip + Full-Height Interactive Canvas + Slide-Over Drawer -->
      <section class="visualizer-column">
        <!-- Visually hidden legacy headers -->
        <div class="sr-only">
          <span id="badgeBoard">STUDIO VIEWPORT</span>
          <h2 id="headingBoard">ผังวิเคราะห์ศักยภาพและมวลปริมาตรอาคาร 3 มิติ</h2>
        </div>

        <!-- TOP SLEEK HUD STRIP: Compact Gatekeeper Status + 4 Inline Metric Cells -->
        <div class="studio-hud-strip">
          <!-- Compact Gatekeeper Status Pill Bar -->
          <div class="road-gatekeeper-banner pass" id="roadGatekeeperBanner" role="status" aria-live="polite">
            <div class="gatekeeper-icon-box" id="gatekeeperIconBox">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div class="gatekeeper-body">
              <div class="gatekeeper-header-row">
                <span class="gatekeeper-pill" id="gatekeeperPill">✓ ถูกต้องตามกฎหมาย</span>
                <strong class="gatekeeper-title" id="gatekeeperTitle">ผ่านเกณฑ์ความกว้างเขตทางสำหรับประเภทอาคารที่เลือก</strong>
              </div>
              <p class="gatekeeper-desc" id="gatekeeperDesc">
                ถนนสาธารณะกว้าง 6.00 ม. สอดคล้องตามเกณฑ์ควบคุมอาคารสำหรับบ้านเดี่ยว / พักอาศัย
              </p>
            </div>
          </div>

          <!-- Sleek 4-Metric Ribbon Grid -->
          <div class="hero-metrics-grid">
            <div class="metric-tile primary-tile" id="tileGfa">
              <div class="tile-header">
                <span class="tile-code" id="codeGfa">MAX GFA // FAR</span>
                <span class="tile-tag" id="tagGfa">MAX ALLOWED</span>
              </div>
              <div class="tile-main-row">
                <div class="tile-metric-value" id="valMaxGfa">200</div>
                <div class="tile-metric-unit" id="unitGfa">SQ.M.</div>
              </div>
              <div class="tile-footer-note" id="noteGfa">พื้นที่อาคารรวมทุกชั้นสูงสุดตาม FAR</div>
            </div>

            <div class="metric-tile">
              <div class="tile-header">
                <span class="tile-code" id="codeBcr">BCR // FOOTPRINT</span>
                <span class="tile-tag" id="tagBcr">GROUND COVER</span>
              </div>
              <div class="tile-main-row">
                <div class="tile-metric-value" id="valMaxFootprint">96</div>
                <div class="tile-metric-unit" id="unitBcr">SQ.M.</div>
              </div>
              <div class="tile-footer-note" id="noteBcr">พื้นที่ปกคลุมดินชั้นล่างสุดตามผังสี</div>
            </div>

            <div class="metric-tile">
              <div class="tile-header">
                <span class="tile-code" id="codeOsr">OSR // OPEN SPACE</span>
                <span class="tile-tag" id="tagOsr">MIN REQUIRED</span>
              </div>
              <div class="tile-main-row">
                <div class="tile-metric-value" id="valMinOpenSpace">80</div>
                <div class="tile-metric-unit" id="unitOsr">SQ.M.</div>
              </div>
              <div class="tile-footer-note" id="noteOsr">ที่ว่างขั้นต่ำปราศจากสิ่งปกคลุมดิน</div>
            </div>

            <div class="metric-tile">
              <div class="tile-header">
                <span class="tile-code" id="codeHeight">MAX HEIGHT // H</span>
                <span class="tile-tag" id="tagHeight">ROAD ANGLE</span>
              </div>
              <div class="tile-main-row">
                <div class="tile-metric-value" id="valHeightLimit">12 ม. (~3 ชั้น)</div>
                <div class="tile-metric-unit sr-only" id="unitHeight">เมตร</div>
              </div>
              <div class="tile-footer-note" id="noteHeightRule">อิงกฎหมายระยะร่นและเขตทาง 6.00 ม.</div>
            </div>
          </div>
        </div>

        <!-- CENTER HERO 3D / 2D VIEWPORT (Expands to fill 75%+ of Viewport) -->
        <div class="schematic-board-shell">
          <div class="board-toolbar">
            <div class="board-title-group">
              <span class="board-dot"></span>
              <span class="board-heading" id="boardHeadingText">2D SCHEMATIC PLAN &amp; LEGAL SETBACKS</span>
              <span class="board-scale-tag" id="canvasScaleTag">SCALE 1:200</span>
            </div>
            <div class="board-live-pill">
              <span class="live-pulse"></span>
              <span id="liveEngineBadge">REAL-TIME PARAMETRIC ENGINE</span>
            </div>
          </div>

          <div class="schematic-viewport" id="schematicViewport">
            <!-- Floating Controls Dock -->
            <div class="floating-controls-dock" id="floatingControlsDock" role="toolbar" aria-label="Viewport Controls">
              <div class="view-mode-switcher" id="viewModeSwitcher" role="tablist" aria-label="สลับมุมมอง 2D / 3D">
                <button class="view-switch-btn active" data-view-mode="2d" id="btnView2D" type="button">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                  <span id="labelView2D">2D Plan</span>
                </button>
                <button class="view-switch-btn" data-view-mode="3d" id="btnView3D" type="button">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  <span id="labelView3D">3D Isometric</span>
                </button>
              </div>

              <span class="toolbar-v-divider"></span>

              <button class="board-tool-btn active" id="btnToggleSetbackHatch" type="button" title="เปิด/ปิดเส้นแรเงาระยะร่น">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                <span id="labelToggleSetbacks">ระยะร่น (Setbacks)</span>
              </button>
              <button class="board-tool-btn active" id="btnToggleDims" type="button" title="เปิด/ปิดเส้นบอกขนาด Dimension">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 6H3"/><path d="M21 18H3"/><path d="M6 3v6"/><path d="M18 3v6"/><path d="M6 15v6"/><path d="M18 15v6"/></svg>
                <span id="labelToggleDims">ระยะมิติ (Dims)</span>
              </button>
              <button class="board-tool-btn" id="btnCenterPlan" type="button" title="จัดกึ่งกลางผัง">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="m16 12-4 4-4-4"/></svg>
                <span id="labelFitBtn">Fit</span>
              </button>
            </div>

            <svg id="schematicSvg" class="schematic-svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 800 560">
              <!-- Dynamic architectural drawing injected by script.js -->
            </svg>

            <!-- Floating Legend inside Viewport -->
            <div class="viewport-legend">
              <div class="legend-item">
                <span class="legend-swatch road"></span>
                <span id="legendRoadText">เขตทาง/ถนนสาธารณะ</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch boundary"></span>
                <span id="legendBoundaryText">แนวเขตที่ดิน (Plot Boundary)</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch setback"></span>
                <span id="legendSetbackText">ระยะร่นตามกฎหมาย (Setback Zone)</span>
              </div>
              <div class="legend-item">
                <span class="legend-swatch buildable"></span>
                <span id="legendBuildableText">ขอบเขตก่อสร้างได้ (Buildable Envelope)</span>
              </div>
              <div class="legend-item hidden" id="legendMassingItem">
                <span class="legend-swatch massing"></span>
                <span id="legendMassingText">ก้อนอาคาร 3D Massing (ตามความสูง H)</span>
              </div>
            </div>

            <!-- Viewport Bottom Status Ribbon -->
            <div class="viewport-status-ribbon">
              <span class="ribbon-item"><span id="ribbonLabelW">หน้ากว้างที่ดิน:</span> <strong id="ribbonWidth">10.0 ม.</strong></span>
              <span class="ribbon-item"><span id="ribbonLabelD">ความลึกที่ดิน:</span> <strong id="ribbonDepth">20.0 ม.</strong></span>
              <span class="ribbon-item"><span id="ribbonLabelBW">หน้ากว้างอาคารสูงสุด:</span> <strong id="ribbonBuildWidth">6.0 ม.</strong></span>
              <span class="ribbon-item"><span id="ribbonLabelBD">ความลึกอาคารสูงสุด:</span> <strong id="ribbonBuildDepth">16.0 ม.</strong></span>
            </div>
          </div>

          <!-- COLLAPSIBLE SLIDE-OVER BOTTOM DRAWER: Tier 1 & Tier 2 Regulations (Collapsed by default) -->
          <div class="legal-drawer-card" id="legalDrawerCard">
            <div class="drawer-header collapsed" id="drawerHeaderToggle">
              <div class="drawer-header-left">
                <span class="drawer-accent-dot"></span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                <span class="drawer-title" id="drawerTitleText">ข้อกำหนดกฎหมาย &amp; รายละเอียดการวิเคราะห์ Tier 1 / Tier 2</span>
              </div>
              <div class="drawer-header-right">
                <span class="drawer-state-tag" id="drawerStateTag">คลิกเพื่อดูรายละเอียด</span>
                <button class="drawer-arrow-btn" aria-label="Toggle Legal Details">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m18 15-6-6-6 6"/></svg>
                </button>
              </div>
            </div>

            <div class="drawer-body hidden" id="drawerBody">
              <div class="drawer-tabs">
                <button class="drawer-tab active" data-dtab="tier1" id="dtabTier1">Tier 1: กฎกระทรวง ฉบับที่ 55 (พ.ร.บ. ควบคุมอาคาร)</button>
                <button class="drawer-tab" data-dtab="tier2" id="dtabTier2">Tier 2: ผังเมืองรวม กทม. (FAR / OSR / โบนัส)</button>
                <button class="drawer-tab" data-dtab="matrix" id="dtabMatrix">ตารางสรุป Feasibility Matrix</button>
              </div>

              <!-- Tier 1 Content -->
              <div class="dtab-pane active" id="paneTier1">
                <div class="legal-rules-grid">
                  <div class="rule-box">
                    <div class="rule-header">
                      <span class="rule-badge">RULE 01</span>
                      <h4 id="rule01Title">ระยะร่นด้านหน้า (แนวถนนสาธารณะ)</h4>
                    </div>
                    <p id="ruleFrontText">ถนนกว้างน้อยกว่า 6 ม. ต้องร่นจากกึ่งกลางถนนอย่างน้อย 3.00 ม. หากถนนกว้าง 6-10 ม. ร่นจากเขตที่ดิน 2.00 ม. และถนนกว้างเกิน 10 ม. ร่นอย่างน้อย 3.00-6.00 ม. ตามประเภทอาคาร</p>
                    <div class="rule-spec-tag"><span id="rule01SpecLabel">ค่าที่ใช้คำนวณปัจจุบัน:</span> <strong id="specFrontSetback">2.00 ม.</strong></div>
                  </div>

                  <div class="rule-box">
                    <div class="rule-header">
                      <span class="rule-badge">RULE 02</span>
                      <h4 id="rule02Title">ระยะร่นด้านข้างและด้านหลัง</h4>
                    </div>
                    <p id="ruleSideText">อาคารพักอาศัยทั่วไปที่มีช่องเปิด (หน้าต่าง/ระเบียง) ต้องเว้นระยะร่นจากแนวเขตที่ดินด้านข้างอย่างน้อย 2.00 ม. (หากสูงเกิน 9 ม. แต่ไม่เกิน 23 ม. ต้องร่นอย่างน้อย 3.00 ม.)</p>
                    <div class="rule-spec-tag"><span id="rule02SpecLabel">ร่นข้าง / ร่นหลัง:</span> <strong id="specSideSetback">2.00 ม.</strong> / <strong id="specRearSetback">2.00 ม.</strong></div>
                  </div>

                  <div class="rule-box">
                    <div class="rule-header">
                      <span class="rule-badge">RULE 03</span>
                      <h4 id="rule03Title">ความสูงอาคารสัมพันธ์กับเขตทาง (H &le; 2W)</h4>
                    </div>
                    <p id="rule03Desc">ความสูงของอาคารไม่ว่าจากจุดใดจุดหนึ่ง ต้องไม่เกิน 2 เท่าของระยะราบจากจุดนั้นไปตั้งฉากกับแนวเขตด้านตรงข้ามของถนนสาธารณะที่อยู่ใกล้อาคารที่สุด (กฎกระทรวง ฉบับที่ 55 ข้อ 44)</p>
                    <div class="rule-spec-tag"><span id="rule03SpecLabel">เพดานความสูงตามถนน:</span> <strong id="specRoadHeightLimit">12.0 ม. (3 ชั้น)</strong></div>
                  </div>

                  <div class="rule-box">
                    <div class="rule-header">
                      <span class="rule-badge">RULE 04</span>
                      <h4 id="rule04Title">ที่ว่างปราศจากสิ่งปกคลุม (Open Space)</h4>
                    </div>
                    <p id="rule04Desc">อาคารอยู่อาศัยต้องมีที่ว่างอันปราศจากสิ่งปกคลุมไม่น้อยกว่า 30% ของพื้นที่ชั้นใดชั้นหนึ่งที่มากที่สุด (หรือสอดคล้องกับ OSR ของผังเมืองรวม กทม.)</p>
                    <div class="rule-spec-tag"><span id="rule04SpecLabel">ที่ว่างขั้นต่ำตามเกณฑ์:</span> <strong id="specOpenSpaceText">40% (80.0 ตร.ม.)</strong></div>
                  </div>
                </div>
              </div>

              <!-- Tier 2 Content -->
              <div class="dtab-pane" id="paneTier2">
                <div class="tier2-layout">
                  <div class="tier2-card">
                    <h4 id="tier2Card1Title">เกณฑ์ผังเมืองรวมกรุงเทพมหานคร (FAR &amp; OSR)</h4>
                    <p id="tier2Card1Desc">การคำนวณศักยภาพสูงสุดของที่ดินแปลงนี้ อ้างอิงข้อกำหนดผังสีของกรุงเทพมหานคร โดยควบคุมอัตราส่วนพื้นที่อาคารรวมต่อพื้นที่ดิน (FAR) และอัตราส่วนของที่ว่างต่อพื้นที่อาคารรวม (OSR)</p>
                    <ul class="studio-check-list" id="tier2CheckList">
                      <li><strong>FAR (Floor Area Ratio):</strong> กำหนดเพดานพื้นที่ก่อสร้างรวมทุกชั้นสูงสุด</li>
                      <li><strong>OSR (Open Space Ratio):</strong> กำหนดสัดส่วนพื้นที่ว่างเปิดโล่งเพื่อคุณภาพสิ่งแวดล้อมเมือง</li>
                      <li><strong>Road Width Gatekeeper:</strong> อาคารสูงหรืออาคารขนาดใหญ่พิเศษ (&gt;10,000 ตร.ม.) ต้องตั้งอยู่บนถนนที่มีเขตทางกว้างไม่น้อยกว่า 10.00 - 18.00 ม. (กฎกระทรวง ฉบับที่ 33)</li>
                    </ul>
                  </div>

                  <div class="tier2-card">
                    <h4 id="tier2Card2Title">มาตรการจูงใจ (FAR Bonus — เพิ่มพื้นที่สูงสุด +20%)</h4>
                    <p id="tier2Card2Desc">หากโครงการจัดให้มีพื้นที่สาธารณประโยชน์ การกักเก็บน้ำฝน หรือผ่านเกณฑ์อาคารเขียว (TREES / LEED) สามารถขอรับโบนัสพื้นที่ก่อสร้างเพิ่มได้สูงสุดไม่เกิน 20%</p>
                    <div class="bonus-calc-strip">
                      <div class="bc-item">
                        <span id="bonusLabelBase">FAR ปกติ</span>
                        <strong id="bonusBaseFar">1.0 : 1</strong>
                      </div>
                      <span class="bc-arrow">&rarr;</span>
                      <div class="bc-item">
                        <span id="bonusLabelMaxFar">FAR รวมโบนัส (+20%)</span>
                        <strong id="bonusMaxFar">1.20 : 1</strong>
                      </div>
                      <span class="bc-arrow">&rarr;</span>
                      <div class="bc-item highlight">
                        <span id="bonusLabelMaxGfa">พื้นที่อาคารรวมศักยภาพสูงสุด</span>
                        <strong id="bonusMaxGfa">240.0 ตร.ม.</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Feasibility Matrix Content -->
              <div class="dtab-pane" id="paneMatrix">
                <div class="matrix-table-wrap">
                  <table class="matrix-table">
                    <thead>
                      <tr>
                        <th id="thMatrixMetric">ดัชนีชี้วัด (Feasibility Metric)</th>
                        <th id="thMatrixCalc">ค่าคำนวณทางสถาปัตยกรรม</th>
                        <th id="thMatrixStandard">เกณฑ์มาตรฐานกฎหมาย</th>
                        <th id="thMatrixStatus">สถานะการประเมิน</th>
                      </tr>
                    </thead>
                    <tbody id="matrixTableBody">
                      <!-- Injected via script.js -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <!-- Studio Floating Toast -->
  <div class="studio-toast" id="studioToast">
    <span class="toast-indicator"></span>
    <span id="studioToastMsg">คัดลอกข้อมูลสำเร็จ</span>
  </div>

  <script src="script.js?v=4.0"></script>
</body>
</html>
```

---

## 4. โค้ดฉบับเต็มสำหรับไฟล์ `style.css`

ให้นำโค้ดด้านล่างนี้ไปเขียนทับไฟล์ `style.css` ทั้งหมด:

```css
/* ==========================================================================
   ARCH // STUDIO (v4.0) — International Studio Grade (Runway AI Reference)
   Monochrome Neutral Palette + Locked 100vh Viewport + Minimalist Typography
   ========================================================================== */

:root {
  /* Monochrome Neutral Light Palette (Runway Studio Light) */
  --bg-workspace: #F4F4F5;
  --bg-card: #FFFFFF;
  --bg-subtle: #F4F4F5;
  --bg-hover: #E4E4E7;
  --bg-input: #FAFAFA;

  /* Typography Colors */
  --text-main: #09090B;
  --text-secondary: #52525B;
  --text-muted: #71717A;
  --text-inverse: #FFFFFF;

  /* Borders & Hairlines */
  --border-subtle: rgba(9, 9, 11, 0.08);
  --border-focus: #18181B;
  --border-strong: #09090B;

  /* Soft Ambient Occlusion Shadows */
  --shadow-tactile: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  --shadow-active: 0 6px 16px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-Hover: 0 8px 20px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03);
  --shadow-inset: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.03);
  --shadow-dock: 0 10px 28px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);

  /* Blueprint / CAD Canvas Tokens */
  --dot-grid-bg: #FAFAFA;
  --dot-grid-color: #D4D4D8;
  --cad-road-bg: #E4E4E7;
  --cad-road-line: #A1A1AA;
  --cad-boundary-stroke: #18181B;
  --cad-setback-fill: rgba(244, 63, 94, 0.07);
  --cad-setback-stroke: #E11D48;
  --cad-buildable-fill: rgba(16, 185, 129, 0.11);
  --cad-buildable-stroke: #059669;

  /* Glassmorphism Tokens */
  --glass-bg: rgba(255, 255, 255, 0.88);
  --glass-border: rgba(9, 9, 11, 0.08);

  /* Minimalist Typography (Regular 400 to Medium 500) */
  --font-sans: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-thai: 'IBM Plex Sans Thai', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Radii & Physics Transitions */
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 9999px;
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-tactile: all 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Monochrome Neutral Dark Palette (Runway Studio Dark) */
[data-theme="dark"] {
  --bg-workspace: #09090B;
  --bg-card: #121215;
  --bg-subtle: #18181B;
  --bg-hover: #27272A;
  --bg-input: #0D0D10;

  --text-main: #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-muted: #71717A;
  --text-inverse: #09090B;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-focus: #FAFAFA;
  --border-strong: #FAFAFA;

  --shadow-tactile: 0 4px 14px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-active: 0 8px 24px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4);
  --shadow-Hover: 0 8px 22px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.35);
  --shadow-inset: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  --shadow-card: 0 2px 6px rgba(0, 0, 0, 0.3);
  --shadow-dock: 0 12px 32px rgba(0, 0, 0, 0.65), 0 2px 8px rgba(0, 0, 0, 0.4);

  --dot-grid-bg: #0C0C0E;
  --dot-grid-color: #27272A;
  --cad-road-bg: #18181B;
  --cad-road-line: #52525B;
  --cad-boundary-stroke: #E4E4E7;
  --cad-setback-fill: rgba(244, 63, 94, 0.14);
  --cad-setback-stroke: #FB7185;
  --cad-buildable-fill: rgba(52, 211, 153, 0.14);
  --cad-buildable-stroke: #34D399;

  --glass-bg: rgba(18, 18, 21, 0.88);
  --glass-border: rgba(255, 255, 255, 0.1);
}

/* ==========================================================================
   BASE RESET & SCREEN-READER UTILITY
   ========================================================================== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-workspace);
  color: var(--text-main);
  font-family: var(--font-thai);
  font-weight: 400;
  font-size: 13.5px;
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hidden {
  display: none !important;
}

/* ==========================================================================
   1. CINEMATIC LANDING VIEW (Runway AI Inner Rounded Bezel & Atmospheric Canvas)
   ========================================================================== */
.landing-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background-color: #09090B;
  color: #FAFAFA;
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.55s var(--ease-spring),
    transform 0.55s var(--ease-spring),
    visibility 0.55s;
}

.landing-overlay.dismissed {
  opacity: 0;
  transform: scale(1.02);
  pointer-events: none;
  visibility: hidden;
}

/* Top Minimal Bar Above Bezel */
.landing-outer-nav {
  height: 54px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.landing-brand-wordmark {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: #FAFAFA;
}

.landing-nav-center {
  display: flex;
  align-items: center;
  gap: 28px;
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #A1A1AA;
  text-transform: uppercase;
}

.landing-nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.landing-top-try-btn {
  background: #FAFAFA;
  color: #09090B;
  border: none;
  border-radius: var(--radius-xs);
  padding: 6px 13px;
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.landing-top-try-btn:hover {
  background: #E4E4E7;
}

/* Inner Rounded Bezel Stage */
.landing-bezel-frame {
  position: relative;
  flex: 1;
  width: 100%;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: #0C0C0F;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75);
}

/* Dark Atmospheric Architectural Canvas */
.landing-atmospheric-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 90% 65% at 52% 28%, rgba(63, 63, 70, 0.42) 0%, rgba(24, 24, 27, 0.2) 55%, transparent 85%),
    radial-gradient(ellipse 65% 50% at 22% 75%, rgba(82, 82, 91, 0.22) 0%, transparent 70%),
    linear-gradient(180deg, #121216 0%, #18181D 42%, #0D0D11 76%, #070709 100%);
}

.ambient-spotlight.spot-primary {
  position: absolute;
  top: -15%;
  left: 25%;
  width: 55%;
  height: 75%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(244, 244, 245, 0.14) 0%, rgba(161, 161, 170, 0.05) 45%, transparent 72%);
  filter: blur(70px);
}

.ambient-spotlight.spot-horizon {
  position: absolute;
  bottom: 18%;
  left: 8%;
  right: 8%;
  height: 240px;
  background: radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212, 212, 216, 0.11) 0%, rgba(113, 113, 122, 0.04) 55%, transparent 80%);
  filter: blur(50px);
}

/* Subtle Architectural Monolith Horizon Silhouette */
.ambient-architectural-silhouette {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.025) 38%, rgba(255,255,255,0.06) 38.1%, transparent 38.2%),
    linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 62%, rgba(255,255,255,0.045) 62.1%, transparent 62.2%),
    linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 64%, transparent 64.2%);
  opacity: 0.7;
}

.ambient-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 45%, transparent 45%, rgba(9, 9, 11, 0.65) 100%);
}

/* Runway Editorial Bottom Layout */
.landing-editorial-grid {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  padding: 48px 56px;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  align-items: end;
  gap: 48px;
}

.landing-editorial-headline {
  font-family: var(--font-sans);
  font-size: clamp(2.35rem, 4.4vw, 3.85rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: #FFFFFF;
  margin-bottom: 14px;
  max-width: 680px;
}

.landing-editorial-subline {
  font-family: var(--font-thai);
  font-size: clamp(0.92rem, 1.25vw, 1.05rem);
  font-weight: 400;
  color: #A1A1AA;
  margin-bottom: 28px;
  max-width: 580px;
  line-height: 1.5;
}

/* Paired Runway Capsule CTA Buttons */
.landing-cta-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.launch-studio-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 22px;
  border-radius: var(--radius-full);
  background: #FFFFFF;
  color: #09090B;
  border: 1px solid #FFFFFF;
  font-family: var(--font-sans);
  font-size: 0.86rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.launch-studio-btn:hover {
  background: #E4E4E7;
  transform: translateY(-1px);
}

.launch-btn-arrow {
  display: inline-flex;
  align-items: center;
  transition: transform 0.18s var(--ease-spring);
}

.launch-studio-btn:hover .launch-btn-arrow {
  transform: translateX(3px);
}

.secondary-studio-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.06);
  color: #FAFAFA;
  border: 1px solid rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: var(--font-sans);
  font-size: 0.86rem;
  font-weight: 400;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.secondary-studio-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.45);
  transform: translateY(-1px);
}

.landing-editorial-right {
  justify-self: start;
  padding-bottom: 6px;
}

.landing-pillar-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.landing-pillar-list li {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: rgba(250, 250, 250, 0.68);
  text-transform: uppercase;
}

/* ==========================================================================
   LANGUAGE SWITCHER ([ TH | EN ])
   ========================================================================== */
.lang-switcher {
  display: inline-flex;
  align-items: center;
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 2px;
  gap: 2px;
}

.landing-lang {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.14);
}

.lang-btn {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  padding: 3px 9px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--ease-tactile);
}

.landing-lang .lang-btn {
  color: #A1A1AA;
}

.lang-btn.active {
  background: var(--bg-card);
  color: var(--text-main);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.landing-lang .lang-btn.active {
  background: #FAFAFA;
  color: #09090B;
}

/* ==========================================================================
   2. STUDIO WORKSPACE SHELL (Locked 100vh Full-Screen Web Application)
   ========================================================================== */
.studio-app-shell {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--bg-workspace);
}

/* Ultra-Clean Compact Topbar (48px Height) */
.studio-topbar {
  height: 48px;
  flex-shrink: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-subtle);
  gap: 12px;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.studio-monogram {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-xs);
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.studio-monogram:hover {
  background: var(--bg-hover);
}

.studio-brand-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.studio-title-row {
  display: flex;
  align-items: center;
  gap: 7px;
}

.studio-brand {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  color: var(--text-main);
  text-transform: uppercase;
}

.studio-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.65);
}

.studio-tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 400;
  padding: 1px 6px;
  border-radius: var(--radius-xs);
  background: var(--bg-subtle);
  color: var(--text-muted);
  border: 1px solid var(--border-subtle);
}

.studio-divider-slash {
  color: var(--border-subtle);
  font-size: 0.8rem;
}

.studio-subtitle {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-weight: 400;
}

/* Right Controls Dock */
.topbar-right.studio-controls-dock {
  display: flex;
  align-items: center;
  gap: 5px;
}

.tactile-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 11px;
  border-radius: var(--radius-xs);
  font-family: var(--font-thai);
  font-size: 0.74rem;
  font-weight: 400;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.tactile-btn.secondary {
  background: var(--bg-subtle);
  color: var(--text-main);
  border: 1px solid var(--border-subtle);
}

.tactile-btn.secondary:hover {
  background: var(--bg-hover);
}

.tactile-btn.primary {
  background: var(--text-main);
  color: var(--text-inverse);
  border: 1px solid var(--border-strong);
}

.tactile-btn.primary:hover {
  opacity: 0.9;
}

.icon-toggle-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-xs);
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.icon-toggle-btn:hover {
  background: var(--bg-hover);
}

/* ==========================================================================
   3. WORKSPACE SPLIT LAYOUT (340px Sidebar + 75%+ Hero Stage)
   ========================================================================== */
.workspace-grid {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  overflow: hidden;
}

/* LEFT COLUMN: Independently Scrollable Tool Sidebar */
.inspector-column {
  height: 100%;
  overflow-y: auto;
  background: var(--bg-card);
  border-right: 1px solid var(--border-subtle);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scrollbar-width: thin;
}

.inspector-column::-webkit-scrollbar {
  width: 4px;
}

.inspector-column::-webkit-scrollbar-thumb {
  background: var(--border-subtle);
  border-radius: 999px;
}

.inspector-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 12px;
}

.card-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
  gap: 6px;
}

.card-caption {
  display: flex;
  align-items: center;
  gap: 6px;
}

.caption-index {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--bg-subtle);
  padding: 1px 5px;
  border-radius: 4px;
}

.caption-title {
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--text-main);
}

/* Mini Unit Mode Tabs */
.mini-tab-group {
  display: inline-flex;
  background: var(--bg-subtle);
  padding: 2px;
  border-radius: var(--radius-xs);
  border: 1px solid var(--border-subtle);
}

.mini-tab {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-thai);
  font-size: 0.68rem;
  font-weight: 400;
  padding: 2px 7px;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.mini-tab.active {
  background: var(--bg-card);
  color: var(--text-main);
  font-weight: 500;
  box-shadow: var(--shadow-card);
}

/* Inputs & Fields */
.numeric-field-hero label,
.deed-col label,
.dim-label-row label,
.form-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.input-with-suffix {
  position: relative;
  display: flex;
  align-items: center;
}

.hero-input {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 6px 44px 6px 10px;
  font-family: var(--font-sans);
  font-size: 1.1rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
  outline: none;
  transition: var(--ease-tactile);
}

.sub-input {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 5px 28px 5px 8px;
  font-family: var(--font-sans);
  font-size: 0.84rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
  outline: none;
}

.hero-input:focus, .sub-input:focus {
  background: var(--bg-card);
  border-color: var(--border-strong);
}

.input-suffix {
  position: absolute;
  right: 9px;
  font-size: 0.7rem;
  color: var(--text-muted);
  pointer-events: none;
}

.deed-tri-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.field-meta-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 7px;
}

.meta-chip {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-secondary);
  background: var(--bg-subtle);
  padding: 2px 7px;
  border-radius: 4px;
  font-variant-numeric: tabular-nums;
}

.geometry-dimensions-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 9px;
  padding-top: 9px;
  border-top: 1px solid var(--border-subtle);
}

.dim-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dim-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.aspect-link-bar {
  margin-top: 7px;
}

.aspect-sync-btn {
  width: 100%;
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xs);
  padding: 4px 8px;
  font-family: var(--font-thai);
  font-size: 0.68rem;
  font-weight: 400;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--ease-tactile);
}

.aspect-sync-btn:hover {
  background: var(--bg-hover);
  color: var(--text-main);
}

/* Card 2: Road Controls */
.road-current-badge {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.road-control-wrap {
  position: relative;
  margin: 12px 0 6px;
}

.road-floating-pill {
  position: absolute;
  top: -20px;
  left: 10%;
  transform: translateX(-50%);
  background: var(--text-main);
  color: var(--text-inverse);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 1px 7px;
  border-radius: var(--radius-full);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.road-control-wrap:hover .road-floating-pill {
  opacity: 1;
}

.tactile-range {
  width: 100%;
  height: 4px;
  appearance: none;
  background: var(--bg-hover);
  border-radius: 999px;
  outline: none;
}

.tactile-range::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--text-main);
  border: 2px solid var(--bg-card);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  cursor: pointer;
}

.range-marks {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--text-muted);
  margin-top: 3px;
}

.segmented-pill-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  margin-top: 6px;
}

.tactile-pill {
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xs);
  padding: 4px 2px;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 400;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--ease-tactile);
}

.tactile-pill.active {
  background: var(--text-main);
  color: var(--text-inverse);
  border-color: var(--border-strong);
  font-weight: 500;
}

.field-help-text {
  margin-top: 7px;
  font-size: 0.68rem;
  color: var(--text-muted);
  line-height: 1.35;
}

/* Card 3: Zoning & Typology */
.tactile-select {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  font-family: var(--font-thai);
  font-size: 0.76rem;
  font-weight: 400;
  color: var(--text-main);
  outline: none;
  cursor: pointer;
}

.zoning-specs-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  margin-top: 8px;
}

.spec-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.spec-key {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.spec-val {
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
}

.spec-divider {
  width: 1px;
  height: 18px;
  background: var(--border-subtle);
}

.typology-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.typo-pill {
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 7px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.typo-icon {
  font-size: 1rem;
}

.typo-name {
  font-family: var(--font-thai);
  font-size: 0.66rem;
  font-weight: 400;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.2;
}

.typo-pill.active {
  background: var(--bg-card);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-active);
}

.typo-pill.active .typo-name {
  color: var(--text-main);
  font-weight: 500;
}

/* Card 4: Valuation */
.fold-toggle-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.price-input-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 6px;
}

.price-summary-badge {
  margin-top: 8px;
  padding: 6px 10px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ps-label {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.ps-value {
  font-family: var(--font-sans);
  font-size: 0.86rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
}

/* ==========================================================================
   4. RIGHT STAGE: SLEEK HUD STRIP + FULL VIEWPORT 3D/2D CANVAS (75%+ Area)
   ========================================================================== */
.visualizer-column {
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  gap: 8px;
  overflow: hidden;
  position: relative;
}

/* Sleek Top HUD Strip */
.studio-hud-strip {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: minmax(260px, 1.15fr) minmax(0, 2.2fr);
  gap: 8px;
  align-items: stretch;
}

/* Monochrome Gatekeeper Status Bar with Accent Status Dot */
.road-gatekeeper-banner {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: var(--shadow-card);
}

.gatekeeper-icon-box {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.road-gatekeeper-banner.pass .gatekeeper-icon-box {
  background: rgba(16, 185, 129, 0.12);
  color: #10B981;
}

.road-gatekeeper-banner.warning .gatekeeper-icon-box {
  background: rgba(245, 158, 11, 0.14);
  color: #F59E0B;
}

.road-gatekeeper-banner.violation {
  border-color: rgba(244, 63, 94, 0.45);
}

.road-gatekeeper-banner.violation .gatekeeper-icon-box {
  background: rgba(244, 63, 94, 0.14);
  color: #F43F5E;
}

.gatekeeper-body {
  min-width: 0;
  flex: 1;
}

.gatekeeper-header-row {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gatekeeper-pill {
  font-family: var(--font-thai);
  font-size: 0.65rem;
  font-weight: 500;
  padding: 1px 7px;
  border-radius: var(--radius-full);
  background: var(--bg-subtle);
  color: var(--text-main);
}

.road-gatekeeper-banner.pass .gatekeeper-pill {
  color: #10B981;
  background: rgba(16, 185, 129, 0.1);
}

.road-gatekeeper-banner.warning .gatekeeper-pill {
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.12);
}

.road-gatekeeper-banner.violation .gatekeeper-pill {
  color: #F43F5E;
  background: rgba(244, 63, 94, 0.12);
}

.gatekeeper-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-main);
  overflow: hidden;
  text-overflow: ellipsis;
}

.gatekeeper-desc {
  font-size: 0.68rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Sleek 4-Metric Ribbon */
.hero-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.metric-tile {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 7px 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: var(--shadow-card);
}

.tile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.tile-code {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.tile-tag {
  font-family: var(--font-mono);
  font-size: 0.54rem;
  font-weight: 400;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--bg-subtle);
  color: var(--text-secondary);
}

.tile-main-row {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin: 1px 0;
}

.tile-metric-value {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--text-main);
  font-variant-numeric: tabular-nums;
}

#valHeightLimit {
  font-size: 1.05rem;
}

.tile-metric-value.gfa-violation {
  color: #F43F5E !important;
  text-decoration: line-through;
}

.metric-tile.tile-violation {
  border-color: rgba(244, 63, 94, 0.45) !important;
}

.tile-metric-unit {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--text-muted);
}

.tile-footer-note {
  font-size: 0.62rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ==========================================================================
   5. HERO VIEWPORT CANVAS (Expands to 75-80%+ of Screen Height)
   ========================================================================== */
.schematic-board-shell {
  flex: 1;
  min-height: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-tactile);
}

.board-toolbar {
  height: 36px;
  flex-shrink: 0;
  padding: 0 14px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.board-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.board-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
}

.board-heading {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--text-main);
}

.board-scale-tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--text-muted);
  background: var(--bg-subtle);
  padding: 1px 7px;
  border-radius: var(--radius-full);
}

.board-live-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.live-pulse {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10B981;
}

/* Interactive Canvas Stage */
.schematic-viewport {
  flex: 1;
  min-height: 0;
  position: relative;
  background-color: var(--dot-grid-bg);
  background-image: radial-gradient(var(--dot-grid-color) 1px, transparent 1px);
  background-size: 18px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.schematic-svg {
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: block;
}

/* Floating Controls Dock on Canvas */
.floating-controls-dock {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-dock);
}

.view-mode-switcher {
  display: inline-flex;
  gap: 2px;
}

.view-switch-btn,
.board-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  background: transparent;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--ease-tactile);
}

.view-switch-btn.active,
.board-tool-btn.active {
  background: var(--bg-card);
  color: var(--text-main);
  border-color: var(--border-subtle);
  font-weight: 500;
  box-shadow: var(--shadow-card);
}

.toolbar-v-divider {
  width: 1px;
  height: 16px;
  background: var(--border-subtle);
  margin: 0 2px;
}

/* Floating Legend */
.viewport-legend {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 15;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 8px 11px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.66rem;
  color: var(--text-secondary);
}

.legend-swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-swatch.road { background: var(--cad-road-bg); border: 1px solid var(--cad-road-line); }
.legend-swatch.boundary { background: transparent; border: 1.5px solid var(--cad-boundary-stroke); }
.legend-swatch.setback { background: var(--cad-setback-fill); border: 1px dashed var(--cad-setback-stroke); }
.legend-swatch.buildable { background: var(--cad-buildable-fill); border: 1.5px solid var(--cad-buildable-stroke); }
.legend-swatch.massing { background: rgba(161, 161, 170, 0.35); border: 1.5px solid var(--text-main); }

/* Bottom Status Ribbon inside Canvas */
.viewport-status-ribbon {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 15;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-subtle);
  padding: 5px 16px;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-secondary);
}

.ribbon-item strong {
  color: var(--text-main);
  font-family: var(--font-sans);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

/* ==========================================================================
   6. SLIDE-OVER COLLAPSIBLE LEGAL DRAWER (Anchored at Bottom of Viewport)
   ========================================================================== */
.legal-drawer-card {
  position: relative;
  z-index: 30;
  background: var(--bg-card);
  border-top: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.drawer-header {
  height: 36px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  background: var(--bg-card);
  transition: background-color 0.15s ease;
}

.drawer-header:hover {
  background: var(--bg-subtle);
}

.drawer-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.drawer-accent-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-main);
}

.drawer-title {
  font-size: 0.74rem;
  font-weight: 500;
  color: var(--text-main);
}

.drawer-header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.drawer-state-tag {
  font-size: 0.66rem;
  color: var(--text-muted);
}

.drawer-arrow-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.drawer-header.collapsed .drawer-arrow-btn {
  transform: rotate(180deg);
}

/* Slide-Over Panel Body when Expanded */
.drawer-body {
  position: absolute;
  bottom: 36px;
  left: 0;
  right: 0;
  max-height: 58vh;
  overflow-y: auto;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border-subtle);
  box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.15);
  padding: 14px 18px 18px;
  z-index: 40;
}

.drawer-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 8px;
}

.drawer-tab {
  background: var(--bg-subtle);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 4px 12px;
  font-family: var(--font-thai);
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--text-secondary);
  cursor: pointer;
}

.drawer-tab.active {
  background: var(--text-main);
  color: var(--text-inverse);
  border-color: var(--border-strong);
  font-weight: 500;
}

.dtab-pane {
  display: none;
}

.dtab-pane.active {
  display: block;
}

.legal-rules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.rule-box {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
}

.rule-header {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 4px;
}

.rule-badge {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 500;
  background: var(--bg-subtle);
  padding: 1px 5px;
  border-radius: 4px;
  color: var(--text-secondary);
}

.rule-header h4 {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-main);
}

.rule-box p {
  font-size: 0.72rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.rule-spec-tag {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.rule-spec-tag strong {
  color: var(--text-main);
  font-weight: 500;
}

.tier2-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.tier2-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 12px;
}

.tier2-card h4 {
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 6px;
}

.tier2-card p, .studio-check-list li {
  font-size: 0.72rem;
  color: var(--text-secondary);
}

.studio-check-list {
  padding-left: 16px;
  margin-top: 6px;
}

.bonus-calc-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-subtle);
  padding: 8px 12px;
  border-radius: var(--radius-xs);
  margin-top: 8px;
}

.bc-item {
  display: flex;
  flex-direction: column;
  font-size: 0.68rem;
}

/* Matrix Table */
.matrix-table-wrap {
  overflow-x: auto;
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.72rem;
}

.matrix-table th, .matrix-table td {
  padding: 7px 10px;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
}

.matrix-table th {
  font-weight: 500;
  color: var(--text-muted);
  background: var(--bg-subtle);
}

.status-chip {
  display: inline-flex;
  align-items: center;
  padding: 1px 7px;
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 500;
}

.status-chip.ok { color: #10B981; background: rgba(16, 185, 129, 0.1); }
.status-chip.warn { color: #F59E0B; background: rgba(245, 158, 11, 0.12); }

/* Floating Toast */
.studio-toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 3000;
  background: var(--text-main);
  color: var(--text-inverse);
  padding: 8px 14px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-dock);
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: var(--ease-tactile);
}

.studio-toast.show {
  opacity: 1;
  transform: translateY(0);
}

.toast-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
}

/* Responsive fallback for mobile/tablet */
@media (max-width: 1024px) {
  html, body, .studio-app-shell {
    height: auto;
    overflow: auto;
  }
  .workspace-grid {
    grid-template-columns: 1fr;
    overflow: visible;
  }
  .studio-hud-strip {
    grid-template-columns: 1fr;
  }
  .hero-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .schematic-viewport {
    min-height: 440px;
  }
  .landing-editorial-grid {
    grid-template-columns: 1fr;
    padding: 28px 24px;
    gap: 20px;
  }
  .landing-nav-center {
    display: none;
  }
}
```

---

## 5. การแก้ไขเฉพาะจุดในไฟล์ `script.js` (Targeted Edits Only)

**ห้ามลบหรือแก้ไขฟังก์ชันคำนวณกฎหมาย BMA, ระยะร่น Typology, หรือ SVG Renderer ใน `script.js` โดยเด็ดขาด** ให้แก้ไขเฉพาะข้อความคำแปลปุ่ม `viewRegsBtnText` และตัวเปิด Drawer ของปุ่ม `#viewRegsBtn` ดังนี้:

### จุดที่ 1: ใน `I18N_STATIC` (ประมาณบรรทัดที่ 114–125 และ 211–222)
แก้ไขข้อความ `launchStudioBtnText` และ `viewRegsBtnText` ให้กระชับตามสไตล์ Runway:

**ในบล็อก `th:`**
```javascript
    launchStudioBtnText: 'Launch Studio',
    viewRegsBtnText: 'Documentation (ข้อกำหนดกฎหมาย)',
```

**ในบล็อก `en:`**
```javascript
    launchStudioBtnText: 'Launch Studio',
    viewRegsBtnText: 'Documentation',
```

### จุดที่ 2: ใน `initEventListeners()` ส่วน `if (viewRegsBtn && landingView)` (ประมาณบรรทัดที่ 1407–1425)
อัปเดตให้เมื่อคลิกปุ่ม `Documentation` (`#viewRegsBtn`) จะทำการเปิด Slide-over Drawer (`#drawerBody`) ทันที:

```javascript
  if (viewRegsBtn && landingView) {
    viewRegsBtn.addEventListener('click', () => {
      landingView.classList.add('dismissed');
      const drawerBody = document.getElementById('drawerBody');
      const drawerHeader = document.getElementById('drawerHeaderToggle');
      const drawerStateTag = document.getElementById('drawerStateTag');
      if (drawerBody) {
        drawerBody.classList.remove('hidden', 'collapsed');
      }
      if (drawerHeader) {
        drawerHeader.classList.remove('collapsed');
      }
      if (drawerStateTag) {
        drawerStateTag.textContent = isEn() ? 'Hide details' : 'ซ่อนรายละเอียด';
      }
    });
  }
```

---

## 6. ขั้นตอนสำหรับ Executor (เมื่อได้รับคำสั่ง `[รันงาน]`)

1. นำโค้ดจากหัวข้อที่ 3 ไปเขียนทับลงใน `index.html`
2. นำโค้ดจากหัวข้อที่ 4 ไปเขียนทับลงใน `style.css`
3. แก้ไขเฉพาะจุดตามหัวข้อที่ 5 ลงใน `script.js`
4. รันทดสอบความเรียบร้อย (ตรวจสอบว่าไม่มี Console Error และฟังก์ชันคำนวณทำงานครบ 100%)
5. Commit ขึ้น GitHub (`main`) และรัน `npx.cmd vercel deploy --prod --yes` เพื่ออัปเดต Production บน Vercel
