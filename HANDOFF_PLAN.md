# HANDOFF PLAN: Unified Dark Topbar & Frameless Studio Workspace Overhaul (v5.0 — Runway AI / Apple Minimalist)

เอกสารฉบับนี้ออกแบบสถาปัตยกรรม UX/UI และรวบรวมโค้ดฉบับสมบูรณ์สำหรับ **Executor (Flash)** เพื่อนำไปอัปเดตไฟล์ในโปรเจกต์โดยตรงตามกฎ **Architect & Executor Handoff Protocol** โดย **ห้ามแตะต้องหรือทำลาย Logic การคำนวณกฎหมาย BMA, ระยะร่น Typology Setbacks, Two-Way Data Binding และ 3D Isometric Engine เดิมที่ทำงานถูกต้อง 100%**

---

## 1. สรุปสถาปัตยกรรม UX/UI ที่ปรับปรุง (Architectural Design Specification)

### 1.1 แถบนำทางด้านบน (Unified Dark Studio Topbar — Color Consistency 100%)
- **Dark Frosted Glassmorphism เสมอในทุกโหมด (Light & Dark):**
  - กำหนดความสูง `56px` (`h-14`), พื้นหลังกระจกฝ้าสีเข้ม `rgba(9, 9, 11, 0.92)` พร้อม `backdrop-filter: blur(24px)` และเส้นขอบล่าง `1px solid rgba(255, 255, 255, 0.08)` ตัวอักษรสีขาว `#FAFAFA` เหมือนหน้า Landing Page 100% ทั้งในโหมด Light และ Dark
- **Left (Brand & Live Engine Dot):**
  - ปุ่ม Monogram `📐` คู่กับโลโก้ `'ARCH // STUDIO'` และจุดเรืองแสงสีเขียวขนาดมินิมอล (`Real-time Engine Active`)
  - ตัดคำบรรยายยืดยาวและป้ายเวอร์ชันออกจากการแสดงผล (ซ่อน `#topbarSubtitle` และ `#topbarVersionTag` ไว้ด้วย `.sr-only` เพื่อรักษาความเข้ากันได้กับ `script.js`)
- **Center (Micro-Typography Telemetry):**
  - แสดงชุดข้อความ Micro-typography สีเทาโปร่งแสงตรงกลางเหมือนหน้าแรก:
    `BMA COMPREHENSIVE ZONING 2026  •  REG. 33 & 55  •  REAL-TIME 3D VIEWPORT`
- **Right (Unified Capsule Action Dock):**
  - **Capsule Toggle ภาษา `[ TH | EN ]`**: ตลับแคปซูลพื้นหลังโปร่งแสงขอบบางสำหรับสลับภาษา
  - **ปุ่ม Reset (`#resetWorkspaceBtn`)**: ปุ่มไอคอนแคปซูลมินิมอลพร้อม Tooltip (ซ่อน `#labelResetBtn` ใน `.sr-only`)
  - **ปุ่มสลับธีม (`#themeToggleBtn`)**: ตลับแคปซูลแสดงไอคอนและสถานะ `[ ☀️ Light ]` / `[ 🌙 Dark ]` สลับตามโหมดปัจจุบัน
  - **ปุ่มหลัก `'คัดลอกสรุป'` (`#copySummaryBtn`)**: ปุ่ม **White Pill** (`background: #FFFFFF; color: #09090B; border-radius: 9999px;`) ขอบมนเนียนตาโดดเด่นเป็น Primary CTA

### 1.2 โครงสร้าง Workspace ภายใน (Frameless Studio Viewport)
- **Frameless Inspector Sidebar (บอกลา Container Hell):**
  - ลบกรอบสี่เหลี่ยมซ้อนกัน (`border`, `border-radius`, `box-shadow` ของ `.inspector-card`) ในแผงซ้ายออกทั้งหมด
  - จัดกลุ่มพารามิเตอร์ `01` ถึง `04` ด้วยระยะห่าง (Spacing) และเส้นคั่นบางเฉียบ (**Hairline Dividers** `border-bottom: 1px solid var(--border-subtle)`)
  - ปรับช่องกรอกตัวเลขและแถบแสดงค่า FAR / OSR / BCR ให้เรียบเนียนไร้กรอบซ้อนทับ
- **Segmented Capsule Slider สไตล์ macOS สำหรับเลือกประเภทอาคาร:**
  - เปลี่ยน `#typologyGrid` จากปุ่มการ์ดสี่เหลี่ยม 3 กล่อง ให้เป็นรางแคปซูลแนวนอน (`border-radius: 9999px; padding: 3px; background: var(--bg-subtle);`)
  - เมื่อปุ่ม `.typo-pill` อยู่ในสถานะ `.active` จะแสดงพื้นหลังสีขาวนูนพร้อมเงานุ่มลึกสไตล์ macOS Segmented Control
- **Sleek Metric HUD แถบเตี้ย คืนพื้นที่ให้แคนวาส 3D:**
  - ยุบแบนเนอร์ Gatekeeper และการ์ดตัวเลข 4 ค่า (`MAX GFA`, `FOOTPRINT`, `OPEN SPACE`, `MAX HEIGHT`) ให้กลายเป็นแถบ **Frameless Low-Profile HUD Bar** ด้านบนของแคนวาส (สูงเพียง ~48px)
  - แสดงตัวเลขขนาดใหญ่คมชัด (`tabular-nums`) เรียงในแนวนอนคั่นด้วยเส้น Hairline แนวตั้ง พร้อมซ่อนคำอธิบายย่อยด้านล่างด้วย `.sr-only`
- **Full-Bleed 3D/2D Canvas & Floating Glass Toolbar:**
  - ขยายแคนวาส `#schematicViewport` ให้กางเต็มพื้นที่ฝั่งขวาแบบไร้กรอบกั้น (Edge-to-Edge Frameless Canvas)
  - ย้ายปุ่มสลับมุมมอง `[ 2D Plan | 3D Isometric ]`, ปุ่มเปิด/ปิด `ระยะร่น (Setbacks)`, `ระยะมิติ (Dims)`, และ `Fit` มารวมไว้ใน **Floating Glass Toolbar (`#floatingControlsDock`)** ทรงแคปซูลกระจกฝ้าลอยเด่นเหนือแคนวาส

---

## 2. รายชื่อไฟล์ที่ต้องแก้ไข (Files to Update)

1. `index.html` — แทนที่ด้วยโค้ดฉบับเต็มในหัวข้อที่ 3
2. `style.css` — แทนที่ด้วยโค้ดฉบับเต็มในหัวข้อที่ 4
3. `script.js` — อัปเดตเฉพาะข้อความป้ายประเภทอาคารให้กระชับรับกับ Segmented Capsule Slider ในหัวข้อที่ 5 (ห้ามแตะต้องฟังก์ชันคำนวณและ 3D Engine)

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
  <link rel="stylesheet" href="style.css?v=5.0">
</head>
<body>

  <!-- ========================================================================
       1. CINEMATIC ENTRY LANDING VIEW (Runway AI Inner Rounded Bezel & Bangkok Skyline)
       ======================================================================== -->
  <section class="landing-overlay" id="landingView" aria-label="ARCH // STUDIO Intro">
    <!-- Top Minimal Bar Outside the Rounded Bezel -->
    <header class="landing-outer-nav">
      <div class="landing-brand-left">
        <span class="landing-brand-wordmark">ARCH // STUDIO</span>
        <span class="studio-status-dot" title="Real-time Engine Active"></span>
      </div>

      <div class="landing-nav-center" aria-hidden="true">
        <span id="landingChip1">BMA COMPREHENSIVE ZONING 2026</span>
        <span class="nav-dot-sep">&bull;</span>
        <span id="landingChip2">REG. 33 &amp; 55</span>
        <span class="nav-dot-sep">&bull;</span>
        <span id="landingChip3">REAL-TIME 3D VIEWPORT</span>
      </div>

      <div class="landing-nav-right">
        <div class="lang-switcher dark-glass-lang" role="group" aria-label="Language Switcher">
          <button type="button" class="lang-btn active" data-lang-switch="th">TH</button>
          <button type="button" class="lang-btn" data-lang-switch="en">EN</button>
        </div>
        <button type="button" class="landing-top-try-btn" id="landingTopLaunchBtn" onclick="document.getElementById('launchStudioBtn').click()">
          <span>Launch Studio</span>
        </button>
      </div>
    </header>

    <!-- Runway Inner Rounded Bezel Stage -->
    <div class="landing-bezel-frame">
      <!-- Bangkok Skyline Hero Background Image with Cinematic Gradient & Vignette Overlay -->
      <div class="landing-hero-media" aria-hidden="true">
        <img src="public/bangkok-skyline.jpg" onerror="this.onerror=null; this.src='bangkok-skyline.jpg';" alt="Bangkok Skyline" class="landing-hero-bg-img" loading="eager">
        <div class="landing-hero-gradient-overlay"></div>
        <div class="landing-hero-vignette-overlay"></div>
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
       2. RUNWAY STUDIO WORKSPACE (Unified Dark Topbar + Frameless Viewport)
       ======================================================================== -->
  <div class="studio-app-shell" id="studioWorkspace">

    <!-- UNIFIED DARK FROSTED GLASS TOPBAR (Consistent with Landing Page in both Light & Dark modes) -->
    <header class="studio-topbar">
      <!-- Left: Brand Wordmark + Minimal Glowing Green Dot -->
      <div class="topbar-left">
        <button type="button" class="studio-monogram" id="reopenLandingBtn" title="เปิดหน้าแนะนำ (Intro View)">
          <span class="mono-symbol">📐</span>
        </button>
        <div class="studio-brand-meta">
          <span class="studio-brand">ARCH // STUDIO</span>
          <span class="studio-status-dot" title="Real-time Engine Active"></span>
          <!-- Preserved in sr-only for script.js compatibility -->
          <span class="sr-only" id="topbarVersionTag">v5.0</span>
          <p class="sr-only" id="topbarSubtitle">Bangkok Zoning &amp; 3D Envelope Simulator</p>
        </div>
      </div>

      <!-- Center: Translucent Micro-Typography Telemetry (Matches Landing Page) -->
      <div class="topbar-center" aria-hidden="true">
        <span>BMA COMPREHENSIVE ZONING 2026</span>
        <span class="nav-dot-sep">&bull;</span>
        <span>REG. 33 &amp; 55</span>
        <span class="nav-dot-sep">&bull;</span>
        <span>REAL-TIME 3D VIEWPORT</span>
      </div>

      <!-- Right: Unified Capsule Action Buttons -->
      <div class="topbar-right studio-controls-dock">
        <!-- 1. Capsule Language Toggle [ TH | EN ] -->
        <div class="lang-switcher dark-glass-lang" id="topbarLangSwitcher" role="group" aria-label="สลับภาษา TH / EN">
          <button type="button" class="lang-btn active" data-lang-switch="th" id="btnLangTh">TH</button>
          <button type="button" class="lang-btn" data-lang-switch="en" id="btnLangEn">EN</button>
        </div>

        <!-- 2. Minimalist Icon Reset Capsule Button with Tooltip -->
        <button type="button" class="topbar-icon-capsule" id="resetWorkspaceBtn" title="รีเซ็ตค่าเริ่มต้น (Reset Parameters)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          <span class="sr-only" id="labelResetBtn">รีเซ็ต</span>
        </button>

        <!-- 3. Theme Toggle Capsule [ ☀️ Light / 🌙 Dark ] -->
        <button type="button" class="topbar-theme-capsule" id="themeToggleBtn" title="สลับโหมดสว่าง/มืด (Switch Light / Dark Mode)">
          <svg id="themeIcon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          <span class="theme-label-light">Light</span>
          <span class="theme-label-dark">Dark</span>
        </button>

        <!-- 4. Primary Export Summary Button (Sleek White Pill) -->
        <button type="button" class="topbar-white-pill" id="copySummaryBtn" title="คัดลอกสรุปศักยภาพที่ดิน (Export Summary)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <span id="labelCopyBtn">คัดลอกสรุป</span>
        </button>
      </div>
    </header>

    <!-- Studio Main 2-Pane Split: Frameless Left Sidebar + Full-Bleed Right Viewport -->
    <main class="workspace-grid">

      <!-- LEFT COLUMN: Frameless Parameter Inspector (Hairline Dividers, Zero Container Hell) -->
      <aside class="inspector-column" aria-label="Parameter Inspector">
        <div class="sr-only">
          <span id="badgeInspector">PARAMETERS</span>
          <h2 id="headingInspector">พารามิเตอร์ที่ดินและกฎหมาย</h2>
        </div>

        <!-- Section 01: ขนาดแปลงและมิติที่ดิน (Parcel Dimensions & Area) -->
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

        <!-- Section 02: เขตทางถนนสาธารณะ (Public Road ROW) -->
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

        <!-- Section 03: ผังสี กทม. & ประเภทอาคาร (BMA Zoning & macOS Segmented Capsule Typology) -->
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

          <!-- macOS-Style Segmented Capsule Slider for Building Typology -->
          <div class="form-group" style="margin-top: 12px;">
            <label class="form-label" id="labelTypology">ประเภทอาคาร (Building Typology)</label>
            <div class="typology-segmented-slider" id="typologyGrid" role="radiogroup" aria-label="Building Typology">
              <button type="button" class="typo-pill active" data-typo="residential" id="btnTypoResidential">
                <span class="typo-icon">🏡</span>
                <span class="typo-name" id="typoNameResidential">บ้านพักอาศัย</span>
              </button>
              <button type="button" class="typo-pill" data-typo="shophouse" id="btnTypoShophouse">
                <span class="typo-icon">🏬</span>
                <span class="typo-name" id="typoNameShophouse">ตึกแถว/พาณิชย์</span>
              </button>
              <button type="button" class="typo-pill" data-typo="highrise" id="btnTypoHighrise">
                <span class="typo-icon">🏢</span>
                <span class="typo-name" id="typoNameHighrise">อาคารสูง/คอนโด</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Section 04: ประมาณการมูลค่าที่ดิน (Land Price Estimator) -->
        <section class="inspector-card inspector-card-last">
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

      <!-- CENTER / RIGHT FRAMELESS VIEWPORT STAGE -->
      <section class="visualizer-column">
        <div class="sr-only">
          <span id="badgeBoard">STUDIO VIEWPORT</span>
          <h2 id="headingBoard">ผังวิเคราะห์ศักยภาพและมวลปริมาตรอาคาร 3 มิติ</h2>
          <span id="boardHeadingText">2D SCHEMATIC PLAN &amp; LEGAL SETBACKS</span>
          <span id="canvasScaleTag">SCALE 1:200</span>
          <span id="liveEngineBadge">REAL-TIME PARAMETRIC ENGINE</span>
        </div>

        <!-- SLEEK LOW-PROFILE METRIC HUD RIBBON (Frameless, Crisp Large Numbers) -->
        <div class="studio-hud-strip">
          <!-- Compact Gatekeeper Status Pill -->
          <div class="road-gatekeeper-banner pass" id="roadGatekeeperBanner" role="status" aria-live="polite">
            <div class="gatekeeper-icon-box" id="gatekeeperIconBox">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div class="gatekeeper-body">
              <div class="gatekeeper-header-row">
                <span class="gatekeeper-pill" id="gatekeeperPill">✓ ถูกต้องตามกฎหมาย</span>
                <strong class="gatekeeper-title" id="gatekeeperTitle">ผ่านเกณฑ์ความกว้างเขตทางสำหรับประเภทอาคารที่เลือก</strong>
              </div>
              <p class="sr-only" id="gatekeeperDesc">
                ถนนสาธารณะกว้าง 6.00 ม. สอดคล้องตามเกณฑ์ควบคุมอาคารสำหรับบ้านเดี่ยว / พักอาศัย
              </p>
            </div>
          </div>

          <!-- 4 Sleek Inline Metric Cells -->
          <div class="hero-metrics-grid">
            <div class="metric-tile primary-tile" id="tileGfa">
              <div class="tile-header">
                <span class="tile-code" id="codeGfa">MAX GFA // FAR</span>
                <span class="tile-tag" id="tagGfa">MAX</span>
              </div>
              <div class="tile-main-row">
                <div class="tile-metric-value" id="valMaxGfa">200</div>
                <div class="tile-metric-unit" id="unitGfa">SQ.M.</div>
              </div>
              <div class="sr-only" id="noteGfa">พื้นที่อาคารรวมทุกชั้นสูงสุดตาม FAR</div>
            </div>

            <div class="metric-tile">
              <div class="tile-header">
                <span class="tile-code" id="codeBcr">BCR // FOOTPRINT</span>
                <span class="tile-tag" id="tagBcr">COVER</span>
              </div>
              <div class="tile-main-row">
                <div class="tile-metric-value" id="valMaxFootprint">96</div>
                <div class="tile-metric-unit" id="unitBcr">SQ.M.</div>
              </div>
              <div class="sr-only" id="noteBcr">พื้นที่ปกคลุมดินชั้นล่างสุดตามผังสี</div>
            </div>

            <div class="metric-tile">
              <div class="tile-header">
                <span class="tile-code" id="codeOsr">OSR // OPEN SPACE</span>
                <span class="tile-tag" id="tagOsr">MIN</span>
              </div>
              <div class="tile-main-row">
                <div class="tile-metric-value" id="valMinOpenSpace">80</div>
                <div class="tile-metric-unit" id="unitOsr">SQ.M.</div>
              </div>
              <div class="sr-only" id="noteOsr">ที่ว่างขั้นต่ำปราศจากสิ่งปกคลุมดิน</div>
            </div>

            <div class="metric-tile">
              <div class="tile-header">
                <span class="tile-code" id="codeHeight">MAX HEIGHT // H</span>
                <span class="tile-tag" id="tagHeight">LIMIT</span>
              </div>
              <div class="tile-main-row">
                <div class="tile-metric-value" id="valHeightLimit">12 ม. (~3 ชั้น)</div>
                <div class="tile-metric-unit sr-only" id="unitHeight">เมตร</div>
              </div>
              <div class="sr-only" id="noteHeightRule">อิงกฎหมายระยะร่นและเขตทาง 6.00 ม.</div>
            </div>
          </div>
        </div>

        <!-- FULL-BLEED FRAMELESS 3D / 2D VIEWPORT CANVAS -->
        <div class="schematic-board-shell">
          <div class="schematic-viewport" id="schematicViewport">

            <!-- FLOATING GLASS TOOLBAR OVER CANVAS -->
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

  <script src="script.js?v=5.0"></script>
</body>
</html>
```

---

## 4. โค้ดฉบับเต็มสำหรับไฟล์ `style.css`

ให้นำโค้ดด้านล่างนี้ไปเขียนทับไฟล์ `style.css` ทั้งหมด:

```css
/* ==========================================================================
   ARCH // STUDIO (v5.0) — Unified Dark Frosted Topbar & Frameless Workspace
   Runway AI Studio + Apple Minimalist Segmented Controls & Floating Glass HUD
   ========================================================================== */

:root {
  /* Monochrome Neutral Light Palette (Runway Studio Light) */
  --bg-workspace: #F4F4F5;
  --bg-card: #FFFFFF;
  --bg-subtle: #F4F4F5;
  --bg-hover: #E4E4E7;
  --bg-input: #F8F8FA;

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
  --shadow-active: 0 3px 10px rgba(0, 0, 0, 0.09), 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.03);
  --shadow-dock: 0 12px 32px rgba(0, 0, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.05);

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
  --glass-bg: rgba(255, 255, 255, 0.84);
  --glass-border: rgba(9, 9, 11, 0.08);

  /* Minimalist Typography */
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
  --bg-card: #111114;
  --bg-subtle: #18181C;
  --bg-hover: #27272A;
  --bg-input: #141418;

  --text-main: #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-muted: #71717A;
  --text-inverse: #09090B;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-focus: #FAFAFA;
  --border-strong: #FAFAFA;

  --shadow-tactile: 0 4px 14px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-active: 0 4px 12px rgba(0, 0, 0, 0.55), 0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-card: 0 2px 6px rgba(0, 0, 0, 0.3);
  --shadow-dock: 0 14px 36px rgba(0, 0, 0, 0.65), 0 2px 8px rgba(0, 0, 0, 0.45);

  --dot-grid-bg: #0C0C0F;
  --dot-grid-color: #27272A;
  --cad-road-bg: #18181B;
  --cad-road-line: #52525B;
  --cad-boundary-stroke: #E4E4E7;
  --cad-setback-fill: rgba(244, 63, 94, 0.14);
  --cad-setback-stroke: #FB7185;
  --cad-buildable-fill: rgba(52, 211, 153, 0.14);
  --cad-buildable-stroke: #34D399;

  --glass-bg: rgba(18, 18, 22, 0.84);
  --glass-border: rgba(255, 255, 255, 0.10);
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
   1. CINEMATIC LANDING VIEW (Runway AI Inner Bezel & Bangkok Skyline)
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

.landing-outer-nav {
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.landing-brand-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.landing-brand-wordmark {
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #FAFAFA;
}

.landing-nav-center,
.topbar-center {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-sans);
  font-size: 0.66rem;
  font-weight: 400;
  letter-spacing: 0.11em;
  color: rgba(250, 250, 250, 0.52);
  text-transform: uppercase;
}

.nav-dot-sep {
  color: rgba(250, 250, 250, 0.25);
}

.landing-nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.landing-top-try-btn {
  background: #FFFFFF;
  color: #09090B;
  border: none;
  border-radius: var(--radius-full);
  padding: 6px 14px;
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

/* Bangkok Skyline Hero Background & Cinematic Overlays */
.landing-hero-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.landing-hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 36%;
  display: block;
  filter: brightness(0.85) contrast(1.06) saturate(0.95);
  transform: scale(1.008);
  transition: transform 0.8s var(--ease-spring);
}

.landing-bezel-frame:hover .landing-hero-bg-img {
  transform: scale(1.025);
}

.landing-hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    #09090B 0%,
    rgba(9, 9, 11, 0.94) 18%,
    rgba(9, 9, 11, 0.65) 48%,
    rgba(9, 9, 11, 0.40) 74%,
    rgba(9, 9, 11, 0.28) 100%
  );
  z-index: 2;
}

.landing-hero-vignette-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 95% 85% at 50% 35%, transparent 35%, rgba(9, 9, 11, 0.62) 100%);
  z-index: 3;
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
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.75);
}

.landing-editorial-subline {
  font-family: var(--font-thai);
  font-size: clamp(0.92rem, 1.25vw, 1.05rem);
  font-weight: 400;
  color: #D4D4D8;
  margin-bottom: 28px;
  max-width: 580px;
  line-height: 1.5;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.65);
}

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
   2. UNIFIED DARK FROSTED GLASS TOPBAR & CAPSULE CONTROLS
   ========================================================================== */
.studio-app-shell {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--bg-workspace);
}

/* Always Dark Frosted Glassmorphism in BOTH Light & Dark Modes */
.studio-topbar {
  height: 56px;
  flex-shrink: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  background: rgba(9, 9, 11, 0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #FAFAFA;
  gap: 16px;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.studio-monogram {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.studio-monogram:hover {
  background: rgba(255, 255, 255, 0.15);
}

.studio-brand-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.studio-brand {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.86rem;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  text-transform: uppercase;
}

.studio-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.85);
}

/* Right Action Capsules inside Dark Topbar */
.topbar-right.studio-controls-dock {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Dark Glass Language Switcher [ TH | EN ] */
.lang-switcher.dark-glass-lang {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-full);
  padding: 2px;
  gap: 2px;
}

.dark-glass-lang .lang-btn {
  border: none;
  background: transparent;
  color: rgba(250, 250, 250, 0.6);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--ease-tactile);
}

.dark-glass-lang .lang-btn:hover {
  color: #FFFFFF;
}

.dark-glass-lang .lang-btn.active {
  background: #FFFFFF;
  color: #09090B;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

/* Reset Icon Capsule */
.topbar-icon-capsule {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(250, 250, 250, 0.85);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.topbar-icon-capsule:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
}

/* Theme Mode Capsule [ ☀️ Light / 🌙 Dark ] */
.topbar-theme-capsule {
  height: 30px;
  padding: 0 12px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(250, 250, 250, 0.9);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--ease-tactile);
}

.topbar-theme-capsule:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
}

html:not([data-theme="dark"]) .theme-label-dark {
  display: none;
}

[data-theme="dark"] .theme-label-light {
  display: none;
}

/* Primary Export Summary White Pill */
.topbar-white-pill {
  height: 30px;
  padding: 0 14px;
  border-radius: var(--radius-full);
  background: #FFFFFF;
  color: #09090B;
  border: 1px solid #FFFFFF;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-thai);
  font-size: 0.74rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--ease-tactile);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.topbar-white-pill:hover {
  background: #E4E4E7;
  transform: translateY(-1px);
}

/* ==========================================================================
   3. FRAMELESS WORKSPACE SPLIT LAYOUT (340px Sidebar + Full-Bleed Stage)
   ========================================================================== */
.workspace-grid {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  overflow: hidden;
}

/* LEFT COLUMN: Frameless Inspector Sidebar with Hairline Dividers */
.inspector-column {
  height: 100%;
  overflow-y: auto;
  background: var(--bg-card);
  border-right: 1px solid var(--border-subtle);
  padding: 4px 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
  scrollbar-width: thin;
}

.inspector-column::-webkit-scrollbar {
  width: 4px;
}

.inspector-column::-webkit-scrollbar-thumb {
  background: var(--border-subtle);
  border-radius: 999px;
}

/* Frameless Section Block (Zero Container Hell) */
.inspector-card {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-subtle);
  border-radius: 0;
  padding: 15px 0;
  box-shadow: none;
}

.inspector-card.inspector-card-last {
  border-bottom: none;
}

.card-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 6px;
}

.card-caption {
  display: flex;
  align-items: center;
  gap: 7px;
}

.caption-index {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 500;
  color: var(--text-muted);
}

.caption-title {
  font-weight: 500;
  font-size: 0.8rem;
  color: var(--text-main);
}

/* Mini Unit Mode Segmented Capsule */
.mini-tab-group {
  display: inline-flex;
  background: var(--bg-subtle);
  padding: 2px;
  border-radius: var(--radius-full);
}

.mini-tab {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-thai);
  font-size: 0.67rem;
  font-weight: 400;
  padding: 2px 8px;
  border-radius: var(--radius-full);
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
  font-size: 0.71rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: 5px;
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
  padding: 7px 44px 7px 11px;
  font-family: var(--font-sans);
  font-size: 1.12rem;
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
  padding: 6px 28px 6px 9px;
  font-family: var(--font-sans);
  font-size: 0.84rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
  outline: none;
  transition: var(--ease-tactile);
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
  gap: 5px;
  margin-top: 8px;
}

.meta-chip {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  color: var(--text-secondary);
  background: var(--bg-subtle);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-variant-numeric: tabular-nums;
}

.geometry-dimensions-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 10px;
}

.dim-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dim-tag {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.aspect-link-bar {
  margin-top: 8px;
}

.aspect-sync-btn {
  width: 100%;
  background: transparent;
  border: 1px dashed var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 5px 8px;
  font-family: var(--font-thai);
  font-size: 0.68rem;
  font-weight: 400;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--ease-tactile);
}

.aspect-sync-btn:hover {
  background: var(--bg-subtle);
  color: var(--text-main);
}

/* Section 02: Road Controls */
.road-current-badge {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  background: var(--bg-subtle);
  color: var(--text-main);
  padding: 2px 9px;
  border-radius: var(--radius-full);
}

.road-control-wrap {
  position: relative;
  margin: 10px 0 6px;
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
  gap: 3px;
  background: var(--bg-subtle);
  padding: 3px;
  border-radius: var(--radius-full);
  margin-top: 6px;
}

.tactile-pill {
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  padding: 4px 2px;
  font-family: var(--font-mono);
  font-size: 0.63rem;
  font-weight: 400;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--ease-tactile);
}

.tactile-pill.active {
  background: var(--bg-card);
  color: var(--text-main);
  font-weight: 500;
  box-shadow: var(--shadow-active);
}

.field-help-text {
  margin-top: 7px;
  font-size: 0.68rem;
  color: var(--text-muted);
  line-height: 1.35;
}

/* Section 03: Zoning & macOS Segmented Capsule Slider */
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
  padding: 8px 4px;
  margin-top: 8px;
  border-bottom: 1px solid var(--border-subtle);
}

.spec-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.spec-key {
  font-family: var(--font-mono);
  font-size: 0.57rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.spec-val {
  font-family: var(--font-sans);
  font-size: 0.84rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
}

.spec-divider {
  width: 1px;
  height: 16px;
  background: var(--border-subtle);
}

/* macOS-Style Segmented Capsule Slider for Typology */
.typology-segmented-slider {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  background: var(--bg-subtle);
  padding: 3px;
  border-radius: var(--radius-full);
}

.typo-pill {
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  padding: 6px 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: var(--ease-tactile);
  white-space: nowrap;
  overflow: hidden;
}

.typo-icon {
  font-size: 0.82rem;
  line-height: 1;
}

.typo-name {
  font-family: var(--font-thai);
  font-size: 0.67rem;
  font-weight: 400;
  color: var(--text-secondary);
  text-overflow: ellipsis;
  overflow: hidden;
}

.typo-pill.active {
  background: var(--bg-card);
  box-shadow: var(--shadow-active);
}

.typo-pill.active .typo-name {
  color: var(--text-main);
  font-weight: 500;
}

/* Section 04: Valuation */
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
  margin-top: 9px;
  padding: 7px 2px 0;
  border-top: 1px dashed var(--border-subtle);
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
  font-size: 0.88rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
}

/* ==========================================================================
   4. RIGHT STAGE: SLEEK LOW-PROFILE METRIC HUD + FULL-BLEED 3D/2D CANVAS
   ========================================================================== */
.visualizer-column {
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 0;
  overflow: hidden;
  position: relative;
}

/* Sleek Low-Profile Metric HUD Ribbon (Frameless Bar) */
.studio-hud-strip {
  flex-shrink: 0;
  min-height: 48px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-subtle);
  padding: 6px 16px;
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(0, 2fr);
  gap: 16px;
  align-items: center;
}

/* Compact Inline Gatekeeper Status */
.road-gatekeeper-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.gatekeeper-icon-box {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.road-gatekeeper-banner.pass .gatekeeper-icon-box {
  background: rgba(16, 185, 129, 0.14);
  color: #10B981;
}

.road-gatekeeper-banner.warning .gatekeeper-icon-box {
  background: rgba(245, 158, 11, 0.14);
  color: #F59E0B;
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
  gap: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gatekeeper-pill {
  font-family: var(--font-thai);
  font-size: 0.65rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: var(--bg-subtle);
  color: var(--text-main);
}

.road-gatekeeper-banner.pass .gatekeeper-pill {
  color: #10B981;
  background: rgba(16, 185, 129, 0.12);
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
  font-size: 0.73rem;
  font-weight: 500;
  color: var(--text-main);
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Sleek 4-Metric Inline HUD Cells */
.hero-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

.metric-tile {
  padding: 2px 14px;
  border-left: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.tile-code {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.tile-tag {
  font-family: var(--font-mono);
  font-size: 0.52rem;
  font-weight: 400;
  color: var(--text-muted);
}

.tile-main-row {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.tile-metric-value {
  font-family: var(--font-sans);
  font-size: 1.22rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--text-main);
  font-variant-numeric: tabular-nums;
}

#valHeightLimit {
  font-size: 1.02rem;
}

.tile-metric-value.gfa-violation {
  color: #F43F5E !important;
  text-decoration: line-through;
}

.tile-metric-unit {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  color: var(--text-muted);
}

/* ==========================================================================
   5. FULL-BLEED VIEWPORT CANVAS & FLOATING GLASS TOOLBAR
   ========================================================================== */
.schematic-board-shell {
  flex: 1;
  min-height: 0;
  background: var(--dot-grid-bg);
  border: none;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* Edge-to-Edge Interactive Canvas */
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

/* Floating Glass Toolbar Over Canvas */
.floating-controls-dock {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 25;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-dock);
}

.view-mode-switcher {
  display: inline-flex;
  background: var(--bg-subtle);
  padding: 2px;
  border-radius: var(--radius-full);
  gap: 2px;
}

.view-switch-btn,
.board-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 11px;
  border-radius: var(--radius-full);
  border: none;
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
  font-weight: 500;
  box-shadow: var(--shadow-active);
}

.toolbar-v-divider {
  width: 1px;
  height: 16px;
  background: var(--border-subtle);
  margin: 0 3px;
}

/* Floating Legend */
.viewport-legend {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 15;
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
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
  font-size: 0.65rem;
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
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--border-subtle);
  padding: 5px 18px;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.67rem;
  color: var(--text-secondary);
}

.ribbon-item strong {
  color: var(--text-main);
  font-family: var(--font-sans);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

/* ==========================================================================
   6. SLIDE-OVER COLLAPSIBLE LEGAL DRAWER
   ========================================================================== */
.legal-drawer-card {
  position: relative;
  z-index: 30;
  background: var(--bg-card);
  border-top: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.drawer-header {
  height: 34px;
  padding: 0 18px;
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
  background: #10B981;
}

.drawer-title {
  font-size: 0.73rem;
  font-weight: 500;
  color: var(--text-main);
}

.drawer-header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.drawer-state-tag {
  font-size: 0.65rem;
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
  bottom: 34px;
  left: 0;
  right: 0;
  max-height: 58vh;
  overflow-y: auto;
  background: var(--glass-bg);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
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
  background: #09090B;
  color: #FAFAFA;
  border: 1px solid rgba(255, 255, 255, 0.12);
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
    gap: 8px;
  }
  .schematic-viewport {
    min-height: 460px;
  }
  .landing-editorial-grid {
    grid-template-columns: 1fr;
    padding: 28px 24px;
    gap: 20px;
  }
  .landing-nav-center,
  .topbar-center {
    display: none;
  }
}
```

---

## 5. การแก้ไขเฉพาะจุดในไฟล์ `script.js` (Targeted Edits Only)

**ห้ามลบหรือแก้ไขฟังก์ชันคำนวณกฎหมาย BMA, ระยะร่น Typology, หรือ 3D Isometric Engine ใน `script.js` โดยเด็ดขาด** ให้ปรับเฉพาะคำแปลป้ายประเภทอาคารใน `I18N_STATIC` ให้กระชับพอดีกับ **macOS Segmented Capsule Slider** ดังนี้:

### จุดเดียวที่ต้องแก้ใน `script.js`: ใน `I18N_STATIC`
ค้นหา `typoNameResidential`, `typoNameShophouse`, `typoNameHighrise` ทั้งในบล็อก `th:` (ประมาณบรรทัดที่ 153–155) และ `en:` (ประมาณบรรทัดที่ 250–252) แล้วปรับให้กระชับดังนี้:

**ในบล็อก `th:`**
```javascript
    typoNameResidential: 'บ้านพักอาศัย',
    typoNameShophouse: 'ตึกแถว/พาณิชย์',
    typoNameHighrise: 'อาคารสูง/คอนโด',
```

**ในบล็อก `en:`**
```javascript
    typoNameResidential: 'Residential',
    typoNameShophouse: 'Shophouse',
    typoNameHighrise: 'High-Rise',
```

---

## 6. ขั้นตอนสำหรับ Executor (เมื่อได้รับคำสั่ง `[รันงาน]`)

1. นำโค้ดจากหัวข้อที่ 3 ไปเขียนทับลงใน `index.html`
2. นำโค้ดจากหัวข้อที่ 4 ไปเขียนทับลงใน `style.css`
3. แก้ไขเฉพาะจุดตามหัวข้อที่ 5 ลงใน `script.js`
4. รันทดสอบความเรียบร้อย (ตรวจสอบว่าไม่มี Console Error และฟังก์ชันคำนวณทำงานครบ 100%)
5. Commit ขึ้น GitHub (`main`) และรัน `npx.cmd vercel deploy --prod --yes` เพื่ออัปเดต Production บน Vercel
