// --- State & Constants ---
const SQM_PER_WAH = 4;
const SQM_PER_NGAN = 400;
const SQM_PER_RAI = 1600;
const WAH_PER_RAI = 400;
const WAH_PER_NGAN = 100;

// Elements - Realtime Tab
const inputSqm = document.getElementById('inputSqm');
const inputWah = document.getElementById('inputWah');
const inputNgan = document.getElementById('inputNgan');
const inputRai = document.getElementById('inputRai');

const labelFormattedSqm = document.getElementById('labelFormattedSqm');
const labelFormattedWah = document.getElementById('labelFormattedWah');
const labelFormattedNgan = document.getElementById('labelFormattedNgan');
const labelFormattedRai = document.getElementById('labelFormattedRai');

// Number formatter
function formatNumber(num, maxDecimals = 4) {
  if (isNaN(num) || num === null || num === undefined) return '0';
  return Number(num).toLocaleString('th-TH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals
  });
}

// Toast function
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// --- Tab Navigation ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = {
  realtime: document.getElementById('tab-realtime'),
  deed: document.getElementById('tab-deed'),
  price: document.getElementById('tab-price'),
};

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const targetTab = btn.getAttribute('data-tab');
    Object.keys(tabPanels).forEach(tabKey => {
      if (tabKey === targetTab) {
        tabPanels[tabKey].classList.remove('hidden');
      } else {
        tabPanels[tabKey].classList.add('hidden');
      }
    });
  });
});

// --- Realtime Converter Logic ---
function updateRealtimeFromSqm(sqm, originId) {
  if (isNaN(sqm) || sqm < 0) {
    sqm = 0;
  }

  const wah = sqm / SQM_PER_WAH;
  const ngan = sqm / SQM_PER_NGAN;
  const rai = sqm / SQM_PER_RAI;

  if (originId !== 'inputSqm') {
    inputSqm.value = sqm === 0 ? '' : parseFloat(sqm.toFixed(4));
  }
  if (originId !== 'inputWah') {
    inputWah.value = wah === 0 ? '' : parseFloat(wah.toFixed(4));
  }
  if (originId !== 'inputNgan') {
    inputNgan.value = ngan === 0 ? '' : parseFloat(ngan.toFixed(4));
  }
  if (originId !== 'inputRai') {
    inputRai.value = rai === 0 ? '' : parseFloat(rai.toFixed(6));
  }

  labelFormattedSqm.textContent = `${formatNumber(sqm)} ตารางเมตร`;
  labelFormattedWah.textContent = `${formatNumber(wah)} ตารางวา`;
  labelFormattedNgan.textContent = `${formatNumber(ngan)} งาน`;
  labelFormattedRai.textContent = `${formatNumber(rai)} ไร่`;
}

inputSqm.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value) || 0;
  updateRealtimeFromSqm(val, 'inputSqm');
});

inputWah.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value) || 0;
  updateRealtimeFromSqm(val * SQM_PER_WAH, 'inputWah');
});

inputNgan.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value) || 0;
  updateRealtimeFromSqm(val * SQM_PER_NGAN, 'inputNgan');
});

inputRai.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value) || 0;
  updateRealtimeFromSqm(val * SQM_PER_RAI, 'inputRai');
});

// Clear realtime
document.getElementById('clearRealtimeBtn').addEventListener('click', () => {
  inputSqm.value = '';
  inputWah.value = '';
  inputNgan.value = '';
  inputRai.value = '';
  updateRealtimeFromSqm(0, null);
  showToast('ล้างค่าการคำนวณเรียบร้อย');
});

// Presets
document.querySelectorAll('[data-set-wah]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = parseFloat(btn.getAttribute('data-set-wah'));
    updateRealtimeFromSqm(val * SQM_PER_WAH, null);
  });
});

document.querySelectorAll('[data-set-rai]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = parseFloat(btn.getAttribute('data-set-rai'));
    updateRealtimeFromSqm(val * SQM_PER_RAI, null);
  });
});

document.querySelectorAll('[data-set-sqm]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = parseFloat(btn.getAttribute('data-set-sqm'));
    updateRealtimeFromSqm(val, null);
  });
});

// Copy chip button in realtime
document.querySelectorAll('.copy-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-copy');
    const input = document.getElementById(targetId);
    if (input && input.value) {
      navigator.clipboard.writeText(input.value).then(() => {
        showToast(`คัดลอกค่า ${input.value} เรียบร้อยแล้ว`);
      });
    }
  });
});

// --- Tab 2: Deed Mode (โฉนดที่ดิน) ---
const deedRai = document.getElementById('deedRai');
const deedNgan = document.getElementById('deedNgan');
const deedWah = document.getElementById('deedWah');
const deedResultSqm = document.getElementById('deedResultSqm');
const deedResultWahTotal = document.getElementById('deedResultWahTotal');

function calculateDeedForward() {
  const r = parseFloat(deedRai.value) || 0;
  const n = parseFloat(deedNgan.value) || 0;
  const w = parseFloat(deedWah.value) || 0;

  const totalWah = (r * WAH_PER_RAI) + (n * WAH_PER_NGAN) + w;
  const totalSqm = totalWah * SQM_PER_WAH;
  const totalRaiDec = totalWah / WAH_PER_RAI;

  deedResultSqm.textContent = `${formatNumber(totalSqm)} ตารางเมตร`;
  deedResultWahTotal.textContent = `= ${formatNumber(totalWah)} ตารางวา (${formatNumber(totalRaiDec, 4)} ไร่)`;
}

[deedRai, deedNgan, deedWah].forEach(el => {
  el.addEventListener('input', calculateDeedForward);
});

// Reverse Deed Mode (ตารางเมตร -> ไร่-งาน-วา)
const reverseSqm = document.getElementById('reverseSqm');
const reverseResultText = document.getElementById('reverseResultText');
const reverseResultSub = document.getElementById('reverseResultSub');

function calculateDeedReverse() {
  const sqm = parseFloat(reverseSqm.value) || 0;
  if (sqm <= 0) {
    reverseResultText.textContent = `0 ไร่ 0 งาน 0 ตร.ว.`;
    reverseResultSub.textContent = `กรอกตารางเมตรด้านบนเพื่อแสดงผล`;
    return;
  }

  const totalWah = sqm / SQM_PER_WAH;
  const rai = Math.floor(totalWah / WAH_PER_RAI);
  const remainWahAfterRai = totalWah - (rai * WAH_PER_RAI);
  const ngan = Math.floor(remainWahAfterRai / WAH_PER_NGAN);
  const wah = remainWahAfterRai - (ngan * WAH_PER_NGAN);

  const formattedWah = parseFloat(wah.toFixed(2));
  reverseResultText.textContent = `${rai} ไร่ ${ngan} งาน ${formattedWah} ตารางวา`;
  reverseResultSub.textContent = `คิดเป็น ${formatNumber(totalWah)} ตารางวา หรือ ${formatNumber(totalWah / WAH_PER_RAI, 4)} ไร่`;
}

reverseSqm.addEventListener('input', calculateDeedReverse);

// Clear Deed tab
document.getElementById('clearDeedBtn').addEventListener('click', () => {
  deedRai.value = '';
  deedNgan.value = '';
  deedWah.value = '';
  reverseSqm.value = '';
  calculateDeedForward();
  calculateDeedReverse();
  showToast('ล้างค่าการคำนวณโฉนดแล้ว');
});

// Copy Deed summary
document.getElementById('copyDeedSummaryBtn').addEventListener('click', () => {
  const r = deedRai.value || '0';
  const n = deedNgan.value || '0';
  const w = deedWah.value || '0';
  const sqmText = deedResultSqm.textContent;
  const text = `ขนาดที่ดิน: ${r} ไร่ ${n} งาน ${w} ตร.ว. (รวม ${sqmText})`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('คัดลอกสรุปขนาดที่ดินแล้ว');
  });
});

document.getElementById('copyReverseBtn').addEventListener('click', () => {
  const text = `${reverseResultText.textContent} (${reverseSqm.value || 0} ตร.ม.)`;
  navigator.clipboard.writeText(text).then(() => {
    showToast('คัดลอกผลลัพธ์แล้ว');
  });
});

// --- Tab 3: Price Estimator ---
const priceAreaInput = document.getElementById('priceAreaInput');
const priceAreaUnit = document.getElementById('priceAreaUnit');
const priceRateInput = document.getElementById('priceRateInput');
const priceRateType = document.getElementById('priceRateType');

const resTotalPrice = document.getElementById('resTotalPrice');
const resPerWah = document.getElementById('resPerWah');
const resPerRai = document.getElementById('resPerRai');

function calculatePrice() {
  const areaVal = parseFloat(priceAreaInput.value) || 0;
  const areaUnit = priceAreaUnit.value;
  const rateVal = parseFloat(priceRateInput.value) || 0;
  const rateType = priceRateType.value;

  let totalWah = 0;
  if (areaUnit === 'wah') {
    totalWah = areaVal;
  } else if (areaUnit === 'rai') {
    totalWah = areaVal * WAH_PER_RAI;
  } else if (areaUnit === 'sqm') {
    totalWah = areaVal / SQM_PER_WAH;
  }

  if (totalWah <= 0 || rateVal <= 0) {
    resTotalPrice.textContent = '0 บาท';
    resPerWah.textContent = '0 บาท';
    resPerRai.textContent = '0 บาท';
    return;
  }

  let totalPrice = 0;
  if (rateType === 'perWah') {
    totalPrice = totalWah * rateVal;
  } else if (rateType === 'perRai') {
    const totalRai = totalWah / WAH_PER_RAI;
    totalPrice = totalRai * rateVal;
  } else if (rateType === 'total') {
    totalPrice = rateVal;
  }

  const pricePerWah = totalPrice / totalWah;
  const pricePerRai = pricePerWah * WAH_PER_RAI;

  resTotalPrice.textContent = `${formatNumber(Math.round(totalPrice))} บาท`;
  resPerWah.textContent = `${formatNumber(Math.round(pricePerWah))} บาท/ตร.ว.`;
  resPerRai.textContent = `${formatNumber(Math.round(pricePerRai))} บาท/ไร่`;
}

[priceAreaInput, priceAreaUnit, priceRateInput, priceRateType].forEach(el => {
  el.addEventListener('input', calculatePrice);
  el.addEventListener('change', calculatePrice);
});

document.getElementById('clearPriceBtn').addEventListener('click', () => {
  priceAreaInput.value = '';
  priceRateInput.value = '';
  calculatePrice();
  showToast('ล้างค่าการประเมินราคาแล้ว');
});

document.getElementById('copyPriceSummaryBtn').addEventListener('click', () => {
  const areaVal = priceAreaInput.value || 0;
  const unitText = priceAreaUnit.options[priceAreaUnit.selectedIndex].text;
  const total = resTotalPrice.textContent;
  const perWah = resPerWah.textContent;
  const perRai = resPerRai.textContent;

  const summary = `📊 สรุปประเมินราคาที่ดิน
- ขนาดพื้นที่: ${areaVal} ${unitText}
- ราคารวมทั้งแปลง: ${total}
- ราคาเฉลี่ย: ${perWah} (${perRai})`;

  navigator.clipboard.writeText(summary).then(() => {
    showToast('คัดลอกสรุปส่ง LINE เรียบร้อยแล้ว');
  });
});

// --- Dark/Light Mode ---
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
}

const savedTheme = localStorage.getItem('landCalcTheme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
applyTheme(isDark);

themeToggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  applyTheme(isDark);
  localStorage.setItem('landCalcTheme', isDark ? 'dark' : 'light');
});

// Initialize Default States
updateRealtimeFromSqm(1600, null);
calculateDeedForward();
calculatePrice();
