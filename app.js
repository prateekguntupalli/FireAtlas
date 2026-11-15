/* ═══ FIREATLAS DASHBOARD ═══ */

// ── Country registry (from processed_data/) ──
const COUNTRIES = [
  { slug: "democratic_republic_of_the_congo", name: "Democratic Republic of the Congo" },
  { slug: "russia", name: "Russia" },
  { slug: "brazil", name: "Brazil" },
  { slug: "angola", name: "Angola" },
  { slug: "australia", name: "Australia" },
  { slug: "zambia", name: "Zambia" },
  { slug: "mozambique", name: "Mozambique" },
  { slug: "south_sudan", name: "South Sudan" },
  { slug: "united_states_of_america", name: "United States of America" },
  { slug: "central_african_republic", name: "Central African Republic" },
  { slug: "myanmar", name: "Myanmar" },
  { slug: "china", name: "China" },
  { slug: "india", name: "India" },
  { slug: "venezuela", name: "Venezuela" },
  { slug: "united_republic_of_tanzania", name: "United Republic of Tanzania" },
  { slug: "nigeria", name: "Nigeria" },
  { slug: "canada", name: "Canada" },
  { slug: "mexico", name: "Mexico" },
  { slug: "ethiopia", name: "Ethiopia" },
  { slug: "madagascar", name: "Madagascar" },
  { slug: "iraq", name: "Iraq" },
  { slug: "guinea", name: "Guinea" },
  { slug: "bolivia", name: "Bolivia" },
  { slug: "sudan", name: "Sudan" },
  { slug: "iran", name: "Iran" },
  { slug: "laos", name: "Laos" },
  { slug: "indonesia", name: "Indonesia" },
  { slug: "thailand", name: "Thailand" },
  { slug: "argentina", name: "Argentina" },
  { slug: "chad", name: "Chad" },
  { slug: "ghana", name: "Ghana" },
  { slug: "cameroon", name: "Cameroon" },
  { slug: "south_africa", name: "South Africa" },
  { slug: "colombia", name: "Colombia" },
  { slug: "ukraine", name: "Ukraine" },
  { slug: "mali", name: "Mali" },
  { slug: "cambodia", name: "Cambodia" },
  { slug: "paraguay", name: "Paraguay" },
  { slug: "kazakhstan", name: "Kazakhstan" },
  { slug: "ivory_coast", name: "Ivory Coast" },
  { slug: "zimbabwe", name: "Zimbabwe" },
  { slug: "turkey", name: "Turkey" },
  { slug: "algeria", name: "Algeria" },
  { slug: "vietnam", name: "Vietnam" },
  { slug: "uganda", name: "Uganda" },
  { slug: "sierra_leone", name: "Sierra Leone" },
  { slug: "republic_of_the_congo", name: "Republic of the Congo" },
  { slug: "senegal", name: "Senegal" },
  { slug: "benin", name: "Benin" },
  { slug: "botswana", name: "Botswana" },
  { slug: "peru", name: "Peru" },
  { slug: "burkina_faso", name: "Burkina Faso" },
  { slug: "namibia", name: "Namibia" },
  { slug: "saudi_arabia", name: "Saudi Arabia" },
  { slug: "malawi", name: "Malawi" },
  { slug: "pakistan", name: "Pakistan" },
  { slug: "egypt", name: "Egypt" },
  { slug: "togo", name: "Togo" },
  { slug: "honduras", name: "Honduras" },
  { slug: "guatemala", name: "Guatemala" },
  { slug: "liberia", name: "Liberia" },
  { slug: "libya", name: "Libya" },
  { slug: "turkmenistan", name: "Turkmenistan" },
  { slug: "syria", name: "Syria" },
  { slug: "chile", name: "Chile" },
  { slug: "philippines", name: "Philippines" },
  { slug: "italy", name: "Italy" },
  { slug: "nicaragua", name: "Nicaragua" },
  { slug: "cuba", name: "Cuba" },
  { slug: "mongolia", name: "Mongolia" },
  { slug: "nepal", name: "Nepal" },
  { slug: "romania", name: "Romania" },
  { slug: "bangladesh", name: "Bangladesh" },
  { slug: "guinea-bissau", name: "Guinea-Bissau" },
  { slug: "spain", name: "Spain" },
  { slug: "japan", name: "Japan" },
  { slug: "panama", name: "Panama" },
  { slug: "malaysia", name: "Malaysia" },
  { slug: "kenya", name: "Kenya" },
  { slug: "kuwait", name: "Kuwait" },
  { slug: "ecuador", name: "Ecuador" },
  { slug: "qatar", name: "Qatar" },
  { slug: "oman", name: "Oman" },
  { slug: "germany", name: "Germany" },
  { slug: "uzbekistan", name: "Uzbekistan" },
  { slug: "france", name: "France" },
  { slug: "bulgaria", name: "Bulgaria" },
  { slug: "azerbaijan", name: "Azerbaijan" },
  { slug: "guyana", name: "Guyana" },
  { slug: "gabon", name: "Gabon" },
  { slug: "portugal", name: "Portugal" },
  { slug: "belarus", name: "Belarus" },
  { slug: "greece", name: "Greece" },
  { slug: "yemen", name: "Yemen" },
  { slug: "united_arab_emirates", name: "United Arab Emirates" },
  { slug: "dominican_republic", name: "Dominican Republic" },
  { slug: "south_korea", name: "South Korea" },
  { slug: "niger", name: "Niger" },
  { slug: "republic_of_serbia", name: "Republic of Serbia" },
  { slug: "eswatini", name: "eSwatini" },
  { slug: "sri_lanka", name: "Sri Lanka" },
  { slug: "belize", name: "Belize" },
  { slug: "costa_rica", name: "Costa Rica" },
  { slug: "poland", name: "Poland" },
  { slug: "united_kingdom", name: "United Kingdom" },
  { slug: "el_salvador", name: "El Salvador" },
  { slug: "north_korea", name: "North Korea" },
  { slug: "georgia", name: "Georgia" },
  { slug: "gambia", name: "Gambia" },
  { slug: "tunisia", name: "Tunisia" },
  { slug: "east_timor", name: "East Timor" },
  { slug: "bosnia_and_herzegovina", name: "Bosnia and Herzegovina" },
  { slug: "belgium", name: "Belgium" },
  { slug: "uruguay", name: "Uruguay" },
  { slug: "albania", name: "Albania" },
  { slug: "burundi", name: "Burundi" },
  { slug: "new_zealand", name: "New Zealand" },
  { slug: "suriname", name: "Suriname" },
  { slug: "north_macedonia", name: "North Macedonia" },
  { slug: "taiwan", name: "Taiwan" },
  { slug: "eritrea", name: "Eritrea" },
  { slug: "morocco", name: "Morocco" },
  { slug: "moldova", name: "Moldova" },
  { slug: "austria", name: "Austria" },
  { slug: "netherlands", name: "Netherlands" },
  { slug: "armenia", name: "Armenia" },
  { slug: "israel", name: "Israel" },
  { slug: "somalia", name: "Somalia" },
  { slug: "slovakia", name: "Slovakia" },
  { slug: "mauritania", name: "Mauritania" },
  { slug: "hungary", name: "Hungary" },
  { slug: "fiji", name: "Fiji" },
  { slug: "trinidad_and_tobago", name: "Trinidad and Tobago" },
  { slug: "the_bahamas", name: "The Bahamas" },
  { slug: "croatia", name: "Croatia" },
  { slug: "montenegro", name: "Montenegro" },
  { slug: "lesotho", name: "Lesotho" },
  { slug: "haiti", name: "Haiti" },
  { slug: "vanuatu", name: "Vanuatu" },
  { slug: "bahrain", name: "Bahrain" },
  { slug: "sweden", name: "Sweden" },
  { slug: "afghanistan", name: "Afghanistan" },
  { slug: "new_caledonia", name: "New Caledonia" },
  { slug: "czechia", name: "Czechia" },
  { slug: "lebanon", name: "Lebanon" },
  { slug: "jamaica", name: "Jamaica" },
  { slug: "rwanda", name: "Rwanda" },
  { slug: "bhutan", name: "Bhutan" },
  { slug: "kosovo", name: "Kosovo" },
  { slug: "finland", name: "Finland" },
  { slug: "jordan", name: "Jordan" },
  { slug: "equatorial_guinea", name: "Equatorial Guinea" },
  { slug: "denmark", name: "Denmark" },
  { slug: "papua_new_guinea", name: "Papua New Guinea" },
  { slug: "cyprus", name: "Cyprus" },
  { slug: "norway", name: "Norway" },
  { slug: "palestine", name: "Palestine" },
  { slug: "tajikistan", name: "Tajikistan" },
  { slug: "ireland", name: "Ireland" },
  { slug: "switzerland", name: "Switzerland" },
  { slug: "luxembourg", name: "Luxembourg" },
  { slug: "lithuania", name: "Lithuania" },
  { slug: "latvia", name: "Latvia" },
  { slug: "puerto_rico", name: "Puerto Rico" },
  { slug: "northern_cyprus", name: "Northern Cyprus" },
  { slug: "estonia", name: "Estonia" },
  { slug: "slovenia", name: "Slovenia" },
  { slug: "brunei", name: "Brunei" },
  { slug: "comoros", name: "Comoros" },
  { slug: "hong_kong_s.a.r.", name: "Hong Kong S.A.R." },
  { slug: "somaliland", name: "Somaliland" },
  { slug: "curaçao", name: "Curaçao" },
  { slug: "djibouti", name: "Djibouti" },
  { slug: "falkland_islands", name: "Falkland Islands" },
  { slug: "montserrat", name: "Montserrat" },
  { slug: "greenland", name: "Greenland" },
  { slug: "barbados", name: "Barbados" },
  { slug: "cyprus_no_mans_area", name: "Cyprus No Mans Area" },
  { slug: "saint_kitts_and_nevis", name: "Saint Kitts and Nevis" },
  { slug: "saint_lucia", name: "Saint Lucia" },
  { slug: "saint_vincent_and_the_grenadines", name: "Saint Vincent and the Grenadines" },
  { slug: "singapore", name: "Singapore" },
  { slug: "malta", name: "Malta" },
  { slug: "antigua_and_barbuda", name: "Antigua and Barbuda" },
  { slug: "são_tomé_and_principe", name: "São Tomé and Principe" },
  { slug: "kyrgyzstan", name: "Kyrgyzstan" },
  { slug: "dominica", name: "Dominica" },
  { slug: "dhekelia_sovereign_base_area", name: "Dhekelia Sovereign Base Area" },
  { slug: "united_states_virgin_islands", name: "United States Virgin Islands" },
  { slug: "grenada", name: "Grenada" },
  { slug: "turks_and_caicos_islands", name: "Turks and Caicos Islands" },
  { slug: "akrotiri_sovereign_base_area", name: "Akrotiri Sovereign Base Area" },
  { slug: "british_virgin_islands", name: "British Virgin Islands" },
  { slug: "aruba", name: "Aruba" },
  { slug: "cayman_islands", name: "Cayman Islands" },
  { slug: "northern_mariana_islands", name: "Northern Mariana Islands" },
  { slug: "solomon_islands", name: "Solomon Islands" },
  { slug: "saint_martin", name: "Saint Martin" },
  { slug: "baykonur_cosmodrome", name: "Baykonur Cosmodrome" },
  { slug: "palau", name: "Palau" },
  { slug: "isle_of_man", name: "Isle of Man" },
  { slug: "sint_maarten", name: "Sint Maarten" },
  { slug: "us_naval_base_guantanamo_bay", name: "US Naval Base Guantanamo Bay" },
  { slug: "saint_helena", name: "Saint Helena" },
  { slug: "saint_pierre_and_miquelon", name: "Saint Pierre and Miquelon" },
  { slug: "andorra", name: "Andorra" },
  { slug: "anguilla", name: "Anguilla" },
  { slug: "united_states_minor_outlying_islands", name: "United States Minor Outlying Islands" },
  { slug: "federated_states_of_micronesia", name: "Federated States of Micronesia" },
  { slug: "jersey", name: "Jersey" },
  { slug: "aland", name: "Aland" },
  { slug: "guernsey", name: "Guernsey" },
  { slug: "french_southern_and_antarctic_lands", name: "French Southern and Antarctic Lands" },
  { slug: "bermuda", name: "Bermuda" },
  { slug: "faroe_islands", name: "Faroe Islands" },
  { slug: "norfolk_island", name: "Norfolk Island" },
  { slug: "saint_barthelemy", name: "Saint Barthelemy" },
  { slug: "san_marino", name: "San Marino" },
  { slug: "siachen_glacier", name: "Siachen Glacier" },
  { slug: "iceland", name: "Iceland" },
  { slug: "western_sahara", name: "Western Sahara" },
  { slug: "liechtenstein", name: "Liechtenstein" },
  { slug: "seychelles", name: "Seychelles" },
];

// ── State ──
let currentData = null;
let currentCountry = "brazil";
let currentYear = 2024;
let currentMode = "raw"; // 'raw' or 'harmonized'
let highConfOnly = false;
let map = null;
let heatgridData = null;
let heatgridLayer = null;
let countryLayer = null;
let selectedCountryLayer = null;

// ── Init ──
document.addEventListener("DOMContentLoaded", () => {
  populateCountrySelect();
  initMap();
  loadHeatgrid();
  loadCountry("brazil");
});

function populateCountrySelect() {
  const sel = document.getElementById("country-select");
  COUNTRIES.sort((a, b) => a.name.localeCompare(b.name));
  COUNTRIES.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.slug;
    opt.textContent = c.name;
    if (c.slug === "brazil") opt.selected = true;
    sel.appendChild(opt);
  });
  sel.addEventListener("change", () => {
    const slug = sel.value;
    loadCountry(slug);
    highlightCountryOnMap(slug);
  });
}

function highlightCountryOnMap(slug) {
  if (!countryLayer) return;
  countryLayer.eachLayer((layer) => {
    if (layer.feature.properties.file === slug) {
      // Clear previous
      if (selectedCountryLayer && selectedCountryLayer !== layer) {
        selectedCountryLayer.setStyle({
          color: "transparent",
          weight: 2,
          fillColor: "transparent",
          fillOpacity: 0,
        });
      }
      layer.setStyle({
        color: "#E04E1C",
        weight: 2.5,
        fillColor: "#E04E1C",
        fillOpacity: 0.05,
      });
      selectedCountryLayer = layer;
    }
  });
}

async function loadCountry(slug) {
  currentCountry = slug;
  // Update map title with country name
  const country = COUNTRIES.find((c) => c.slug === slug);
  const titleEl = document.getElementById("map-title");
  if (titleEl && country)
    titleEl.textContent = `${country.name} — Fire Density`;
  try {
    const res = await fetch(`processed_data/${slug}.json`);
    if (!res.ok) throw new Error(`Failed to load ${slug}`);
    currentData = await res.json();
    onDataLoaded();
  } catch (err) {
    console.error(err);
    // Try without folder prefix (in case files are in same dir)
    try {
      const res = await fetch(`${slug}.json`);
      if (!res.ok) throw new Error(`Not found`);
      currentData = await res.json();
      onDataLoaded();
    } catch (e) {
      console.error("Could not load country data:", slug);
    }
  }
}

function onDataLoaded() {
  populateYearSelect();
  updateStats();
  renderSensorBreakdown();
  renderDailyChart();
  renderCalendar();
  renderYearlyChart();
  renderTrendChart();
  renderSeasonality();
  renderAnomalies();
  updateMap();
}

// ── Year selector ──
function populateYearSelect() {
  const sel = document.getElementById("year-select");
  sel.innerHTML = "";
  const years = Object.keys(currentData.yearly)
    .map(Number)
    .sort((a, b) => b - a);
  years.forEach((y) => {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    if (
      y === currentYear ||
      (currentYear > Math.max(...years) && y === years[0])
    ) {
      opt.selected = true;
      currentYear = y;
    }
    sel.appendChild(opt);
  });
  // Ensure currentYear is valid
  if (!years.includes(currentYear)) {
    currentYear = years[0];
    sel.value = currentYear;
  }
  sel.addEventListener("change", () => {
    currentYear = parseInt(sel.value);
    renderCalendar();
    updateStats();
    renderSensorBreakdown();
    renderDailyChart();
    renderAnomalies();
    renderYearlyChart();
    renderTrendChart();
    renderSeasonality();
    renderHeatgrid();
  });
}

// ── Mode toggle ──
function setMode(mode) {
  currentMode = mode;
  document.getElementById("btn-raw").classList.toggle("active", mode === "raw");
  document
    .getElementById("btn-harmonized")
    .classList.toggle("active", mode === "harmonized");

  const harmBtn = document.getElementById("btn-harmonized");
  if (mode === "harmonized") {
    harmBtn.classList.add("harmonized");
  } else {
    harmBtn.classList.remove("harmonized");
  }

  updateStats();
  renderSensorBreakdown();
  renderDailyChart();
  renderCalendar();
  renderYearlyChart();
  renderTrendChart();
  renderSeasonality();
  renderAnomalies();
  renderHeatgrid();
}

// ── CSV Download (see main downloadCSV below) ──

// ── Harmonization math ──
function getDayCount(dayData) {
  if (!dayData) return 0;
  let total = 0;
  const ratio = currentData.harmonization?.viirs_modis_ratio || 1;

  for (const [source, vals] of Object.entries(dayData)) {
    const count = highConfOnly ? (vals.high_conf || 0) : (vals.count || 0);
    if (currentMode === "harmonized" && source.startsWith("MODIS")) {
      total += Math.round(count * ratio);
    } else {
      total += count;
    }
  }
  return total;
}

function toggleConfFilter() {
  highConfOnly = !highConfOnly;
  const btn = document.getElementById('conf-filter-btn');
  btn.classList.toggle('active', highConfOnly);
  updateStats();
  renderSensorBreakdown();
  renderDailyChart();
  renderCalendar();
  renderYearlyChart();
  renderTrendChart();
  renderSeasonality();
  renderAnomalies();
  renderHeatgrid();
}

// ── Stats ──
function updateStats() {
  const daily = currentData.daily;
  const yearDays = Object.entries(daily).filter(([d]) =>
    d.startsWith(String(currentYear)),
  );

  let totalYear = 0;
  let peakCount = 0;
  let peakDate = "";

  yearDays.forEach(([date, data]) => {
    const count = getDayCount(data);
    totalYear += count;
    if (count > peakCount) {
      peakCount = count;
      peakDate = date;
    }
  });

  const avgDay =
    yearDays.length > 0 ? Math.round(totalYear / yearDays.length) : 0;

  document.getElementById("stat-total").textContent = formatNumber(totalYear);
  document.getElementById("stat-peak-day").textContent =
    formatNumber(peakCount);
  document.getElementById("stat-peak-label").textContent = peakDate
    ? `Peak: ${formatDate(peakDate)}`
    : "Peak Day";
  document.getElementById("stat-avg").textContent = formatNumber(avgDay);

  // Compute weighted average FRP across the selected year
  let totalFrpWeighted = 0;
  let totalFrpDets = 0;
  yearDays.forEach(([date, data]) => {
    Object.values(data).forEach((src) => {
      if (src && src.avg_frp && src.count) {
        totalFrpWeighted += src.avg_frp * src.count;
        totalFrpDets += src.count;
      }
    });
  });
  const avgFrp = totalFrpDets > 0 ? (totalFrpWeighted / totalFrpDets) : 0;
  document.getElementById("stat-frp").textContent = avgFrp > 0
    ? avgFrp.toFixed(1) + " MW"
    : "—";

  // Show per-country ratio label near harmonized toggle
  const ratio = currentData.harmonization?.viirs_modis_ratio;
  const ratioEl = document.getElementById("ratio-label");
  if (ratioEl) {
    if (ratio && currentMode === "harmonized") {
      ratioEl.textContent = ratio.toFixed(2) + "× ratio";
      ratioEl.classList.add("visible");
    } else {
      ratioEl.classList.remove("visible");
    }
  }

  // Count active sensors for this year
  const yearData = currentData.yearly[String(currentYear)];
  const sensors = yearData ? Object.keys(yearData).length : 0;
  const sensorNames = yearData ? Object.keys(yearData).join(" + ") : "—";
  const sensorsEl = document.getElementById("stat-sensors");
  if (sensorsEl) sensorsEl.textContent = sensorNames;
}

// ── Sensor breakdown ──
function renderSensorBreakdown() {
  const container = document.getElementById("sensor-breakdown");
  if (!container) return;
  container.innerHTML = "";

  const daily = currentData.daily;
  const ratio = currentData.harmonization?.viirs_modis_ratio || 1;
  const yearStr = String(currentYear);

  let modisCount = 0, viirsCount = 0;
  let modisFrpSum = 0, viirsFrpSum = 0;
  let modisFrpN = 0, viirsFrpN = 0;
  let modisMaxFrp = 0, viirsMaxFrp = 0;

  Object.entries(daily).forEach(([date, data]) => {
    if (!date.startsWith(yearStr)) return;
    if (data.MODIS_SP) {
      const src = data.MODIS_SP;
      const c = highConfOnly ? (src.high_conf || 0) : (src.count || 0);
      modisCount += c;
      if (src.avg_frp && src.count) {
        modisFrpSum += src.avg_frp * src.count;
        modisFrpN += src.count;
      }
      if (src.max_frp > modisMaxFrp) modisMaxFrp = src.max_frp;
    }
    if (data.VIIRS_SNPP_SP) {
      const src = data.VIIRS_SNPP_SP;
      const c = highConfOnly ? (src.high_conf || 0) : (src.count || 0);
      viirsCount += c;
      if (src.avg_frp && src.count) {
        viirsFrpSum += src.avg_frp * src.count;
        viirsFrpN += src.count;
      }
      if (src.max_frp > viirsMaxFrp) viirsMaxFrp = src.max_frp;
    }
  });

  const modisDisplay = currentMode === "harmonized" ? Math.round(modisCount * ratio) : modisCount;
  const viirsDisplay = viirsCount;
  const total = modisDisplay + viirsDisplay;
  const modisPct = total > 0 ? ((modisDisplay / total) * 100) : 0;
  const viirsPct = total > 0 ? ((viirsDisplay / total) * 100) : 0;
  const modisAvgFrp = modisFrpN > 0 ? (modisFrpSum / modisFrpN) : 0;
  const viirsAvgFrp = viirsFrpN > 0 ? (viirsFrpSum / viirsFrpN) : 0;

  // Year label
  const yearLabel = document.getElementById("sensor-year-label");
  if (yearLabel) yearLabel.textContent = yearStr;

  // MODIS row
  const modisHtml = `
    <div class="sensor-row">
      <span class="sensor-name" style="color:var(--modis-color)">MODIS</span>
      <div class="sensor-bar-track">
        <div class="sensor-bar-fill ${currentMode === 'harmonized' ? 'harmonized-modis' : 'modis'}" style="width:${Math.max(2, modisPct)}%">
          <span class="sensor-bar-value">${formatNumber(modisDisplay)}${currentMode === 'harmonized' ? ' (scaled)' : ''}</span>
        </div>
      </div>
      <span class="sensor-pct">${modisPct.toFixed(1)}%</span>
    </div>
    <div class="sensor-frp-row">
      <span class="sensor-frp-item">Avg FRP: <strong>${modisAvgFrp > 0 ? modisAvgFrp.toFixed(1) + ' MW' : '—'}</strong></span>
      <span class="sensor-frp-item">Peak FRP: <strong>${modisMaxFrp > 0 ? modisMaxFrp.toFixed(1) + ' MW' : '—'}</strong></span>
    </div>
  `;

  // VIIRS row
  const viirsHtml = viirsCount > 0 || currentYear >= 2012 ? `
    <div class="sensor-row">
      <span class="sensor-name" style="color:var(--viirs-color)">VIIRS</span>
      <div class="sensor-bar-track">
        <div class="sensor-bar-fill viirs" style="width:${Math.max(viirsCount > 0 ? 2 : 0, viirsPct)}%">
          ${viirsCount > 0 ? `<span class="sensor-bar-value">${formatNumber(viirsDisplay)}</span>` : ''}
        </div>
      </div>
      <span class="sensor-pct">${viirsPct.toFixed(1)}%</span>
    </div>
    ${viirsCount > 0 ? `<div class="sensor-frp-row">
      <span class="sensor-frp-item">Avg FRP: <strong>${viirsAvgFrp > 0 ? viirsAvgFrp.toFixed(1) + ' MW' : '—'}</strong></span>
      <span class="sensor-frp-item">Peak FRP: <strong>${viirsMaxFrp > 0 ? viirsMaxFrp.toFixed(1) + ' MW' : '—'}</strong></span>
    </div>` : `<div class="sensor-note">No VIIRS data${currentYear < 2012 ? ' — Suomi NPP launched 2011, data starts 2012' : ''}</div>`}
  ` : '';

  // Note about harmonization
  const harmNote = currentMode === "harmonized" ? `
    <div class="sensor-note" style="margin-top:8px; color:var(--harmonized-color);">
      MODIS scaled by ${ratio.toFixed(2)}× to match VIIRS detection sensitivity
    </div>
  ` : '';

  container.innerHTML = modisHtml + viirsHtml + harmNote;
}

// ── Calendar heatmap ──
function renderCalendar() {
  const grid = document.getElementById("calendar-grid");
  const monthsEl = document.getElementById("calendar-months");
  grid.innerHTML = "";
  monthsEl.innerHTML = "";

  const year = currentYear;
  const daily = currentData.daily;

  // Get all days in the year
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  // Collect counts for the year to compute scale
  const counts = [];
  const dayEntries = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const dayData = daily[dateStr];
    const count = getDayCount(dayData);
    counts.push(count);
    dayEntries.push({ date: dateStr, count, data: dayData, dow: d.getDay() });
  }

  // Compute percentiles for heat scale
  const nonZero = counts.filter((c) => c > 0).sort((a, b) => a - b);
  const p25 = nonZero[Math.floor(nonZero.length * 0.25)] || 1;
  const p50 = nonZero[Math.floor(nonZero.length * 0.5)] || 10;
  const p75 = nonZero[Math.floor(nonZero.length * 0.75)] || 100;
  const p95 = nonZero[Math.floor(nonZero.length * 0.95)] || 1000;

  // Compute historical median per day-of-year for anomaly detection
  const doyMedians = computeDOYMedians();

  // Pad start to align with correct day of week (Mon = 0)
  const firstDow = (startDate.getDay() + 6) % 7; // Mon=0
  for (let i = 0; i < firstDow; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-cell";
    empty.style.visibility = "hidden";
    grid.appendChild(empty);
  }

  // Render cells
  dayEntries.forEach((entry) => {
    const cell = document.createElement("div");
    cell.className = "cal-cell";

    // Heat level
    if (entry.count === 0) {
      // default heat-0
    } else if (entry.count <= p25) {
      cell.classList.add("heat-1");
    } else if (entry.count <= p50) {
      cell.classList.add("heat-2");
    } else if (entry.count <= p75) {
      cell.classList.add("heat-3");
    } else if (entry.count <= p95) {
      cell.classList.add("heat-4");
    } else {
      cell.classList.add("heat-5");
    }

    // Anomaly check
    const doy = getDOY(entry.date);
    const median = doyMedians[doy] || 0;
    if (median > 0 && entry.count > median * 2) {
      cell.classList.add("anomaly");
    }

    // Tooltip
    cell.addEventListener("mouseenter", (e) => showTooltip(e, entry));
    cell.addEventListener("mouseleave", hideTooltip);
    cell.addEventListener("mousemove", moveTooltip);

    grid.appendChild(cell);
  });

  // Month labels — position based on actual column where each month starts
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const cellSize = 14;
  const gapSize = 3;
  const colWidth = cellSize + gapSize;
  const dayLabelWidth = 32 + 8; // day-labels min-width + container gap

  // Calculate which column each month's first day lands in
  // Column = (dayOfYear + firstDow) / 7, but we need the week index
  monthsEl.style.position = 'relative';
  monthsEl.style.height = '16px';
  monthsEl.style.marginLeft = dayLabelWidth + 'px';
  monthsEl.style.paddingLeft = '0';

  months.forEach((m, i) => {
    const firstOfMonth = new Date(year, i, 1);
    const dayOfYear = Math.floor((firstOfMonth - startDate) / 86400000);
    const col = Math.floor((dayOfYear + firstDow) / 7);

    const span = document.createElement("span");
    span.textContent = m;
    span.style.position = 'absolute';
    span.style.left = (col * colWidth) + 'px';
    monthsEl.appendChild(span);
  });
}

// ── Anomaly detection ──
function computeDOYMedians() {
  const daily = currentData.daily;
  const doyValues = {};

  Object.entries(daily).forEach(([date, data]) => {
    const doy = getDOY(date);
    const count = getDayCount(data);
    if (!doyValues[doy]) doyValues[doy] = [];
    doyValues[doy].push(count);
  });

  const medians = {};
  Object.entries(doyValues).forEach(([doy, vals]) => {
    vals.sort((a, b) => a - b);
    medians[doy] = vals[Math.floor(vals.length / 2)];
  });

  return medians;
}

function getDOY(dateStr) {
  const d = new Date(dateStr);
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d - start;
  return Math.floor(diff / 86400000);
}

function renderAnomalies() {
  const list = document.getElementById("anomaly-list");
  list.innerHTML = "";

  const daily = currentData.daily;
  const doyMedians = computeDOYMedians();

  const anomalies = [];
  Object.entries(daily).forEach(([date, data]) => {
    if (!date.startsWith(String(currentYear))) return;
    const count = getDayCount(data);
    const doy = getDOY(date);
    const median = doyMedians[doy] || 0;
    if (median > 0 && count > median * 2) {
      anomalies.push({
        date,
        count,
        median,
        ratio: (count / median).toFixed(1),
      });
    }
  });

  anomalies.sort((a, b) => b.count - a.count);

  if (anomalies.length === 0) {
    list.innerHTML =
      '<div style="color: var(--text-400); padding: 20px; text-align: center;">No anomalies detected for this year</div>';
    return;
  }

  anomalies.slice(0, 20).forEach((a) => {
    const item = document.createElement("div");
    item.className = "anomaly-item";
    item.innerHTML = `
      <span class="anomaly-date">${formatDate(a.date)}</span>
      <span class="anomaly-count">${formatNumber(a.count)}</span>
      <span class="anomaly-ratio">${a.ratio}× median</span>
    `;
    list.appendChild(item);
  });
}

// ── Yearly bar chart ──
function renderYearlyChart() {
  const chart = document.getElementById("yearly-chart");
  chart.innerHTML = "";

  const yearly = currentData.yearly;
  const years = Object.keys(yearly).sort();
  const ratio = currentData.harmonization?.viirs_modis_ratio || 1;

  // Find max for scaling
  let maxTotal = 0;
  years.forEach((yr) => {
    const d = yearly[yr];
    let total = 0;
    if (currentMode === "harmonized") {
      total = (d.MODIS || 0) * ratio + (d.VIIRS || 0);
    } else {
      total = (d.MODIS || 0) + (d.VIIRS || 0);
    }
    if (total > maxTotal) maxTotal = total;
  });

  years.forEach((yr) => {
    const d = yearly[yr];
    const modisRaw = d.MODIS || 0;
    const viirsRaw = d.VIIRS || 0;

    const modisDisplay =
      currentMode === "harmonized" ? Math.round(modisRaw * ratio) : modisRaw;
    const viirsDisplay = viirsRaw;
    const total = modisDisplay + viirsDisplay;

    const group = document.createElement("div");
    group.className =
      "year-bar-group" + (parseInt(yr) === currentYear ? " selected" : "");
    group.onclick = () => {
      currentYear = parseInt(yr);
      document.getElementById("year-select").value = yr;
      renderCalendar();
      updateStats();
      renderSensorBreakdown();
      renderDailyChart();
      renderAnomalies();
      renderYearlyChart();
      renderTrendChart();
      renderSeasonality();
      renderHeatgrid();
    };

    const stack = document.createElement("div");
    stack.className = "year-bar-stack";

    const maxH = 140; // px

    // Mark 2012 as VIIRS start
    if (yr === "2012") {
      group.classList.add("viirs-start");
    }

    if (viirsDisplay > 0) {
      const bar = document.createElement("div");
      bar.className = "year-bar viirs-bar";
      bar.style.height = Math.max(1, (viirsDisplay / maxTotal) * maxH) + "px";
      stack.appendChild(bar);
    }

    if (modisDisplay > 0) {
      const bar = document.createElement("div");
      bar.className = currentMode === "harmonized"
        ? "year-bar harmonized-bar"
        : "year-bar modis-bar";
      bar.style.height = Math.max(1, (modisDisplay / maxTotal) * maxH) + "px";
      bar.style.borderRadius = "0";
      stack.appendChild(bar);
    }

    const label = document.createElement("span");
    label.className = "year-bar-label";
    label.textContent = yr.slice(2); // '00', '01', etc.

    // Tooltip on hover
    group.addEventListener("mouseenter", (e) => {
      const tip = document.getElementById("tooltip");
      tip.innerHTML = `
        <div class="tooltip-date">${yr}</div>
        <div class="tooltip-row"><span class="tooltip-source">MODIS</span><span class="tooltip-count" style="color:var(--modis-color)">${formatNumber(modisDisplay)}${currentMode === "harmonized" ? " (scaled)" : ""}</span></div>
        ${viirsRaw > 0 ? `<div class="tooltip-row"><span class="tooltip-source">VIIRS</span><span class="tooltip-count" style="color:var(--viirs-color)">${formatNumber(viirsDisplay)}</span></div>` : ""}
        <div class="tooltip-row" style="border-top:1px solid var(--border); padding-top:4px; margin-top:4px;"><span class="tooltip-source">Total</span><span class="tooltip-count">${formatNumber(total)}</span></div>
      `;
      tip.classList.add("visible");
    });
    group.addEventListener("mouseleave", hideTooltip);
    group.addEventListener("mousemove", moveTooltip);

    group.appendChild(stack);
    group.appendChild(label);
    chart.appendChild(group);
  });

  // Update legend — always show both sensors
  const legendEl = document.getElementById("yearly-legend");
  if (currentMode === "harmonized") {
    legendEl.innerHTML = `
      <span class="yearly-legend-item"><span class="dot" style="background:var(--harmonized-color)"></span> MODIS (scaled ${ratio.toFixed(2)}×)</span>
      <span class="yearly-legend-item"><span class="dot viirs-dot"></span> VIIRS (Suomi NPP)</span>
    `;
  } else {
    legendEl.innerHTML = `
      <span class="yearly-legend-item"><span class="dot modis-dot"></span> MODIS (Terra/Aqua)</span>
      <span class="yearly-legend-item"><span class="dot viirs-dot"></span> VIIRS (Suomi NPP)</span>
    `;
  }

  // Update subtitle
  const subtitleEl = document.getElementById("yearly-subtitle");
  if (subtitleEl) {
    subtitleEl.textContent = currentMode === "harmonized"
      ? `MODIS detections scaled by ${ratio.toFixed(2)}× to match VIIRS sensitivity`
      : "Raw detection counts by sensor";
  }
}

// ── Daily Time Series (canvas line chart) ──
function renderDailyChart() {
  const canvas = document.getElementById("daily-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.parentElement.getBoundingClientRect();
  const w = rect.width - 40; // padding
  const h = 220;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const daily = currentData.daily;
  const ratio = currentData.harmonization?.viirs_modis_ratio || 1;
  const yearStr = String(currentYear);
  const yearDays = Object.entries(daily)
    .filter(([d]) => d.startsWith(yearStr))
    .sort(([a], [b]) => a.localeCompare(b));

  if (yearDays.length === 0) return;

  // Build series
  const modisVals = [];
  const viirsVals = [];
  const dates = [];
  yearDays.forEach(([date, data]) => {
    dates.push(date);
    let m = highConfOnly ? (data.MODIS_SP?.high_conf || 0) : (data.MODIS_SP?.count || 0);
    let v = highConfOnly ? (data.VIIRS_SNPP_SP?.high_conf || 0) : (data.VIIRS_SNPP_SP?.count || 0);
    if (currentMode === "harmonized") m = Math.round(m * ratio);
    modisVals.push(m);
    viirsVals.push(v);
  });

  const allVals = [...modisVals, ...viirsVals];
  const maxVal = Math.max(...allVals, 1);

  const pad = { top: 20, right: 10, bottom: 24, left: 45 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  // Y axis
  ctx.strokeStyle = "#e7e5e4";
  ctx.lineWidth = 1;
  const yTicks = 4;
  ctx.font = "10px 'JetBrains Mono'";
  ctx.fillStyle = "#a8a29e";
  ctx.textAlign = "right";
  for (let i = 0; i <= yTicks; i++) {
    const val = Math.round((maxVal / yTicks) * i);
    const y = pad.top + plotH - (i / yTicks) * plotH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillText(val >= 1000 ? (val / 1000).toFixed(0) + "k" : val, pad.left - 6, y + 3);
  }

  // Month labels on x axis
  ctx.textAlign = "center";
  ctx.fillStyle = "#a8a29e";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  months.forEach((m, mi) => {
    const target = `${yearStr}-${String(mi + 1).padStart(2, "0")}-01`;
    const idx = dates.findIndex(d => d >= target);
    if (idx >= 0) {
      const x = pad.left + (idx / dates.length) * plotW;
      ctx.fillText(m, x, h - 6);
    }
  });

  // Draw line helper
  function drawLine(vals, color, lineW) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineW || 1.5;
    ctx.lineJoin = "round";
    vals.forEach((v, i) => {
      const x = pad.left + (i / (vals.length - 1)) * plotW;
      const y = pad.top + plotH - (v / maxVal) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  // Smooth with moving average for readability
  function smooth(arr, windowSize) {
    const result = [];
    const half = Math.floor(windowSize / 2);
    for (let i = 0; i < arr.length; i++) {
      let sum = 0, count = 0;
      for (let j = Math.max(0, i - half); j <= Math.min(arr.length - 1, i + half); j++) {
        sum += arr[j]; count++;
      }
      result.push(sum / count);
    }
    return result;
  }

  // Draw faint raw data
  ctx.globalAlpha = 0.15;
  drawLine(modisVals, "#3b82f6", 0.5);
  drawLine(viirsVals, "#e04e1c", 0.5);

  // Draw smoothed (7-day moving avg)
  ctx.globalAlpha = 1;
  const smoothM = smooth(modisVals, 7);
  const smoothV = smooth(viirsVals, 7);
  drawLine(smoothM, "#3b82f6", 2);
  drawLine(smoothV, "#e04e1c", 2);

  // Subtitle
  const sub = document.getElementById("daily-subtitle");
  if (sub) sub.textContent = `${yearStr} · 7-day moving average`;
}

// ── Trend Analysis (canvas line chart — 25-year view) ──
function renderTrendChart() {
  const canvas = document.getElementById("trend-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.parentElement.getBoundingClientRect();
  const w = rect.width - 40;
  const h = 260;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const yearly = currentData.yearly;
  const years = Object.keys(yearly).sort();
  const ratio = currentData.harmonization?.viirs_modis_ratio || 1;

  if (years.length < 2) return;

  // Build series: raw total, harmonized total
  const rawTotals = [];
  const harmTotals = [];
  const yearLabels = [];

  years.forEach(yr => {
    const d = yearly[yr];
    const modis = d.MODIS || 0;
    const viirs = d.VIIRS || 0;
    rawTotals.push(modis + viirs);
    harmTotals.push(Math.round(modis * ratio) + viirs);
    yearLabels.push(yr);
  });

  // ── Linear regression ──
  function linReg(vals) {
    const n = vals.length;
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (let i = 0; i < n; i++) {
      sx += i; sy += vals[i];
      sxx += i * i; sxy += i * vals[i];
    }
    const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    const intercept = (sy - slope * sx) / n;
    const yMean = sy / n;
    let ssTot = 0, ssRes = 0;
    for (let i = 0; i < n; i++) {
      const pred = intercept + slope * i;
      ssTot += (vals[i] - yMean) ** 2;
      ssRes += (vals[i] - pred) ** 2;
    }
    const r2 = ssTot > 0 ? 1 - ssRes / ssTot : 0;
    return { slope, intercept, r2, predict: i => intercept + slope * i };
  }

  const rawReg = linReg(rawTotals);
  const harmReg = linReg(harmTotals);

  const pad = { top: 24, right: 20, bottom: 30, left: 55 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  // Determine which series to show based on mode
  const showRaw = rawTotals;
  const showHarm = harmTotals;
  const maxVal = Math.max(...showRaw, ...showHarm, 1);

  // Y axis grid
  ctx.strokeStyle = "#e7e5e4";
  ctx.lineWidth = 1;
  ctx.font = "10px 'JetBrains Mono'";
  ctx.fillStyle = "#a8a29e";
  ctx.textAlign = "right";
  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const val = Math.round((maxVal / yTicks) * i);
    const y = pad.top + plotH - (i / yTicks) * plotH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    const label = val >= 1000000 ? (val / 1000000).toFixed(1) + "M"
                : val >= 1000 ? (val / 1000).toFixed(0) + "k"
                : val;
    ctx.fillText(label, pad.left - 8, y + 3);
  }

  // X axis labels (every 5 years + first/last)
  ctx.textAlign = "center";
  ctx.fillStyle = "#a8a29e";
  yearLabels.forEach((yr, i) => {
    const n = parseInt(yr);
    if (n % 5 === 0 || i === 0 || i === yearLabels.length - 1) {
      const x = pad.left + (i / (yearLabels.length - 1)) * plotW;
      ctx.fillText(yr, x, h - 8);
    }
  });

  // Draw 2012 VIIRS annotation line
  const viirs2012Idx = yearLabels.indexOf("2012");
  if (viirs2012Idx >= 0) {
    const x2012 = pad.left + (viirs2012Idx / (yearLabels.length - 1)) * plotW;
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#e04e1c";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(x2012, pad.top);
    ctx.lineTo(x2012, pad.top + plotH);
    ctx.stroke();
    ctx.restore();
    // Label
    ctx.save();
    ctx.font = "bold 9px 'JetBrains Mono'";
    ctx.fillStyle = "#e04e1c";
    ctx.globalAlpha = 0.7;
    ctx.textAlign = "left";
    ctx.fillText("VIIRS online →", x2012 + 4, pad.top + 12);
    ctx.restore();
  }

  // Line drawing helper
  function drawSeries(vals, color, lineWidth, dashed) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    if (dashed) ctx.setLineDash([6, 4]);
    else ctx.setLineDash([]);
    vals.forEach((v, i) => {
      const x = pad.left + (i / (vals.length - 1)) * plotW;
      const y = pad.top + plotH - (v / maxVal) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Dots
    ctx.fillStyle = color;
    vals.forEach((v, i) => {
      const x = pad.left + (i / (vals.length - 1)) * plotW;
      const y = pad.top + plotH - (v / maxVal) * plotH;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Always draw both lines so the difference is visible
  if (currentMode === "harmonized") {
    // Show raw as faded dashed, harmonized as solid
    ctx.globalAlpha = 0.35;
    drawSeries(showRaw, "#78716c", 1.5, true);
    ctx.globalAlpha = 1;
    drawSeries(showHarm, "#059669", 2.5, false);
  } else {
    // Show harmonized as faded dashed, raw as solid
    ctx.globalAlpha = 0.35;
    drawSeries(showHarm, "#059669", 1.5, true);
    ctx.globalAlpha = 1;
    drawSeries(showRaw, "#e04e1c", 2.5, false);
  }

  // ── Draw regression lines ──
  function drawRegLine(reg, color) {
    ctx.save();
    ctx.setLineDash([2, 3]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    const y0 = pad.top + plotH - (reg.predict(0) / maxVal) * plotH;
    const yN = pad.top + plotH - (reg.predict(yearLabels.length - 1) / maxVal) * plotH;
    ctx.moveTo(pad.left, y0);
    ctx.lineTo(pad.left + plotW, yN);
    ctx.stroke();
    ctx.restore();
  }

  if (currentMode === "harmonized") {
    drawRegLine(harmReg, "#059669");
  } else {
    drawRegLine(rawReg, "#e04e1c");
  }

  // ── R² + slope annotation ──
  const activeReg = currentMode === "harmonized" ? harmReg : rawReg;
  const otherReg = currentMode === "harmonized" ? rawReg : harmReg;
  const slopePerYear = activeReg.slope;
  const slopeDir = slopePerYear > 0 ? "+" : "";
  ctx.save();
  ctx.font = "bold 10px 'JetBrains Mono'";
  ctx.fillStyle = currentMode === "harmonized" ? "#059669" : "#e04e1c";
  ctx.textAlign = "right";
  ctx.globalAlpha = 0.85;
  ctx.fillText(
    `R² = ${activeReg.r2.toFixed(3)}  ·  ${slopeDir}${formatNumber(Math.round(slopePerYear))}/yr`,
    w - pad.right, pad.top + 12
  );
  // Show other R² for comparison
  ctx.font = "10px 'JetBrains Mono'";
  ctx.fillStyle = "#a8a29e";
  ctx.globalAlpha = 0.6;
  const otherLabel = currentMode === "harmonized" ? "Raw" : "Harmonized";
  ctx.fillText(
    `${otherLabel} R² = ${otherReg.r2.toFixed(3)}`,
    w - pad.right, pad.top + 26
  );
  ctx.restore();

  // Highlight current year dot
  const curIdx = yearLabels.indexOf(String(currentYear));
  if (curIdx >= 0) {
    const activeVals = currentMode === "harmonized" ? showHarm : showRaw;
    const x = pad.left + (curIdx / (yearLabels.length - 1)) * plotW;
    const y = pad.top + plotH - (activeVals[curIdx] / maxVal) * plotH;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.strokeStyle = currentMode === "harmonized" ? "#059669" : "#e04e1c";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();
  }

  // Legend
  const legendEl = document.getElementById("trend-legend");
  if (legendEl) {
    if (currentMode === "harmonized") {
      legendEl.innerHTML = `
        <span class="trend-legend-item"><span class="line-swatch" style="background:var(--harmonized-color)"></span> Harmonized total</span>
        <span class="trend-legend-item"><span class="line-swatch dashed" style="color:var(--text-300)"></span> Raw total</span>
      `;
    } else {
      legendEl.innerHTML = `
        <span class="trend-legend-item"><span class="line-swatch" style="background:var(--viirs-color)"></span> Raw total</span>
        <span class="trend-legend-item"><span class="line-swatch dashed" style="color:var(--harmonized-color)"></span> Harmonized total</span>
      `;
    }
  }
}

// ── Monthly Seasonality Heatmap (month × year grid) ──
function renderSeasonality() {
  const canvas = document.getElementById("seasonality-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.parentElement.getBoundingClientRect();
  const w = rect.width - 40;
  const h = 340;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const daily = currentData.daily;
  const ratio = currentData.harmonization?.viirs_modis_ratio || 1;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // Gather all years present
  const allYears = [...new Set(Object.keys(daily).map(d => d.slice(0,4)))].sort();
  if (allYears.length < 2) return;

  // Build month×year matrix
  const matrix = {};
  let globalMax = 0;
  allYears.forEach(yr => { matrix[yr] = new Array(12).fill(0); });

  Object.entries(daily).forEach(([date, data]) => {
    const yr = date.slice(0,4);
    const mo = parseInt(date.slice(5,7)) - 1;
    if (!matrix[yr]) return;

    let count = 0;
    for (const [source, vals] of Object.entries(data)) {
      const c = highConfOnly ? (vals.high_conf || 0) : (vals.count || 0);
      if (currentMode === "harmonized" && source.startsWith("MODIS")) {
        count += Math.round(c * ratio);
      } else {
        count += c;
      }
    }
    matrix[yr][mo] += count;
  });

  // Find max for color scaling
  allYears.forEach(yr => {
    matrix[yr].forEach(v => { if (v > globalMax) globalMax = v; });
  });

  const pad = { top: 28, right: 60, bottom: 12, left: 40 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const cellW = plotW / 12;
  const cellH = plotH / allYears.length;
  const gap = 1.5;

  // Color scale (white → warm yellow → orange → deep red)
  function heatColor(val) {
    if (val === 0) return "#f5f5f4";
    const t = Math.pow(val / globalMax, 0.5); // sqrt scale for better spread
    if (t < 0.25) {
      return lerpColor("#fef3c7", "#fbbf24", t / 0.25);
    } else if (t < 0.5) {
      return lerpColor("#fbbf24", "#f97316", (t - 0.25) / 0.25);
    } else if (t < 0.75) {
      return lerpColor("#f97316", "#dc2626", (t - 0.5) / 0.25);
    } else {
      return lerpColor("#dc2626", "#7f1d1d", (t - 0.75) / 0.25);
    }
  }

  function lerpColor(a, b, t) {
    const ah = parseInt(a.slice(1), 16);
    const bh = parseInt(b.slice(1), 16);
    const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
    const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
    const r = Math.round(ar + (br - ar) * t);
    const g = Math.round(ag + (bg - ag) * t);
    const b2 = Math.round(ab + (bb - ab) * t);
    return `rgb(${r},${g},${b2})`;
  }

  // Draw cells
  allYears.forEach((yr, yi) => {
    for (let mi = 0; mi < 12; mi++) {
      const val = matrix[yr][mi];
      const x = pad.left + mi * cellW + gap / 2;
      const y = pad.top + yi * cellH + gap / 2;
      const cw = cellW - gap;
      const ch = cellH - gap;

      ctx.fillStyle = heatColor(val);
      const radius = 2;
      ctx.beginPath();
      ctx.roundRect(x, y, cw, ch, radius);
      ctx.fill();
    }
  });

  // Year labels (left)
  ctx.font = "9px 'JetBrains Mono'";
  ctx.fillStyle = "#a8a29e";
  ctx.textAlign = "right";
  allYears.forEach((yr, yi) => {
    // Show every year if few, or every 2 years + first/last if many
    const show = allYears.length <= 15 || yi === 0 || yi === allYears.length - 1 || parseInt(yr) % 2 === 0;
    if (show) {
      const y = pad.top + yi * cellH + cellH / 2 + 3;
      ctx.fillText(yr, pad.left - 6, y);
    }
  });

  // Month labels (top)
  ctx.textAlign = "center";
  months.forEach((m, mi) => {
    const x = pad.left + mi * cellW + cellW / 2;
    ctx.fillText(m, x, pad.top - 8);
  });

  // Color scale legend (right side)
  const legendX = w - pad.right + 16;
  const legendH = plotH * 0.6;
  const legendY = pad.top + (plotH - legendH) / 2;
  const legendW = 10;
  const steps = 50;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const val = globalMax * t;
    ctx.fillStyle = heatColor(val);
    const sy = legendY + legendH - (i / steps) * legendH;
    ctx.fillRect(legendX, sy, legendW, legendH / steps + 1);
  }
  ctx.font = "9px 'JetBrains Mono'";
  ctx.fillStyle = "#a8a29e";
  ctx.textAlign = "left";
  ctx.fillText(formatNumber(globalMax), legendX + legendW + 4, legendY + 4);
  ctx.fillText("0", legendX + legendW + 4, legendY + legendH + 4);

  // Find peak fire month across all data
  const monthTotals = new Array(12).fill(0);
  allYears.forEach(yr => {
    matrix[yr].forEach((v, mi) => { monthTotals[mi] += v; });
  });
  const peakMonth = monthTotals.indexOf(Math.max(...monthTotals));
  const seasonLabel = document.getElementById("season-label");
  if (seasonLabel) {
    seasonLabel.textContent = `Peak fire month: ${months[peakMonth]}`;
  }
}

// ── Sensor timeline ──
function renderSensorTimeline() {
  const container = document.getElementById("sensor-timeline");
  container.innerHTML = "";

  const sensors = [
    {
      name: "Terra",
      type: "modis",
      start: 2000,
      end: 2024,
      label: "2000–2024",
    },
    { name: "Aqua", type: "modis", start: 2002, end: 2024, label: "2002–2024" },
    {
      name: "S-NPP",
      type: "viirs",
      start: 2012,
      end: 2024,
      label: "2012–2024",
    },
  ];

  const minYear = 2000;
  const maxYear = 2025;
  const range = maxYear - minYear;

  sensors.forEach((s) => {
    const row = document.createElement("div");
    row.className = "sensor-row";

    const name = document.createElement("span");
    name.className = "sensor-name";
    name.textContent = s.name;

    const track = document.createElement("div");
    track.className = "sensor-bar-track";

    const fill = document.createElement("div");
    fill.className = `sensor-bar-fill ${s.type === "modis" ? "modis-fill" : "viirs-fill"}`;
    fill.style.left = ((s.start - minYear) / range) * 100 + "%";
    fill.style.width = ((s.end - s.start) / range) * 100 + "%";

    const label = document.createElement("span");
    label.textContent = s.label;
    fill.appendChild(label);

    track.appendChild(fill);
    row.appendChild(name);
    row.appendChild(track);
    container.appendChild(row);
  });

  // Year axis
  const axis = document.createElement("div");
  axis.className = "sensor-year-axis";
  [2000, 2004, 2008, 2012, 2016, 2020, 2024].forEach((y) => {
    const span = document.createElement("span");
    span.textContent = y;
    axis.appendChild(span);
  });
  container.appendChild(axis);
}

// ── Map ──
function initMap() {
  map = L.map("map", {
    center: [20, 0],
    zoom: 2,
    zoomControl: true,
    attributionControl: false,
    preferCanvas: true,
    maxBounds: [
      [-85, -180],
      [85, 180],
    ],
    maxBoundsViscosity: 1.0,
    minZoom: 2,
    maxZoom: 12,
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: "© OpenStreetMap contributors",
    noWrap: true,
  }).addTo(map);

  // Load country boundaries for click-to-select
  loadCountryBoundaries();
}

async function loadCountryBoundaries() {
  try {
    let res = await fetch("countries.geojson");
    if (!res.ok) {
      console.warn("No countries.geojson");
      return;
    }
    const geojson = await res.json();

    countryLayer = L.geoJSON(geojson, {
      style: () => ({
        color: "transparent",
        weight: 2,
        fillColor: "transparent",
        fillOpacity: 0,
      }),
      onEachFeature: (feature, layer) => {
        const name = feature.properties.name;
        const fileSlug = name.toLowerCase().replace(/ /g, "_").replace(/'/g, "");

        // Tooltip on hover
        layer.bindTooltip(name, {
          sticky: true,
          className: "country-tooltip",
          direction: "top",
          offset: [0, -10],
        });

        layer.on("mouseover", () => {
          if (selectedCountryLayer !== layer) {
            layer.setStyle({
              color: "#E04E1C",
              weight: 2,
              fillColor: "#E04E1C",
              fillOpacity: 0.08,
            });
          }
        });

        layer.on("mouseout", () => {
          if (selectedCountryLayer !== layer) {
            layer.setStyle({
              color: "transparent",
              weight: 2,
              fillColor: "transparent",
              fillOpacity: 0,
            });
          }
        });

        layer.on("click", () => {
          // Clear previous selection
          if (selectedCountryLayer) {
            selectedCountryLayer.setStyle({
              color: "transparent",
              weight: 2,
              fillColor: "transparent",
              fillOpacity: 0,
            });
          }

          // Highlight selected country
          layer.setStyle({
            color: "#E04E1C",
            weight: 2.5,
            fillColor: "#E04E1C",
            fillOpacity: 0.05,
          });
          selectedCountryLayer = layer;

          // Update dropdown to match
          const sel = document.getElementById("country-select");
          if (sel) sel.value = fileSlug;

          // Load the country data
          loadCountry(fileSlug);
        });

        // Mark Brazil as initially selected
        if (fileSlug === "brazil") {
          setTimeout(() => {
            layer.setStyle({
              color: "#E04E1C",
              weight: 2.5,
              fillColor: "#E04E1C",
              fillOpacity: 0.05,
            });
            selectedCountryLayer = layer;
          }, 500);
        }
      },
    }).addTo(map);

    // Bring country layer to front so clicks work over heatgrid
    countryLayer.bringToFront();
  } catch (e) {
    console.error("Could not load country boundaries:", e);
  }
}

// ── Heatgrid ──
async function loadHeatgrid() {
  try {
    const cacheBust = "?v=" + Date.now();
    const NUM_CHUNKS = 4;
    let allCells = [];
    let years = null;
    let numYears = 0;
    let loaded = 0;

    for (let i = 0; i < NUM_CHUNKS; i++) {
      let res = await fetch(`processed_data/heatgrid_${i}.json${cacheBust}`);
      if (!res.ok) res = await fetch(`heatgrid_${i}.json${cacheBust}`);
      if (!res.ok) {
        console.warn(`Heatgrid chunk ${i} not found, trying single file fallback`);
        let fb = await fetch("processed_data/heatgrid.json" + cacheBust);
        if (!fb.ok) fb = await fetch("heatgrid.json" + cacheBust);
        if (!fb.ok) { console.warn("No heatgrid found"); return; }
        heatgridData = await fb.json();
        console.log(`Heatgrid loaded (single): ${heatgridData.cells.length.toLocaleString()} cells`);
        renderHeatgrid();
        return;
      }
      const chunk = await res.json();
      if (!years) { years = chunk.years; numYears = chunk.num_years; }
      allCells = allCells.concat(chunk.cells);
      loaded++;
      console.log(`Heatgrid chunk ${i}: ${chunk.cells.length.toLocaleString()} cells`);
    }

    heatgridData = { years, num_years: numYears, cells: allCells };
    console.log(`Heatgrid loaded: ${allCells.length.toLocaleString()} cells across ${loaded} chunks`);
    renderHeatgrid();
  } catch (e) {
    console.error("Could not load heatgrid:", e);
  }
}

function renderHeatgrid() {
  if (!heatgridData || !map) return;

  // Remove old layer
  if (heatgridLayer) {
    map.removeLayer(heatgridLayer);
  }

  const cells = heatgridData.cells;
  const years = heatgridData.years || [];
  const numYears = heatgridData.num_years || years.length;
  const ratio = currentData?.harmonization?.viirs_modis_ratio || 3.64;

  // Determine which column to use: total (index 2) or a specific year
  let yearCol = 2; // default: total
  const yearIdx = years.indexOf(currentYear);
  if (yearIdx !== -1) {
    yearCol = 3 + yearIdx; // per-year columns start at index 3
  }

  // Offsets for high-confidence columns in the cell array
  // Cell layout: [lat, lon, total, y0..y24, m0..m24, h0..h24, hm0..hm24]
  const hcOffset = 3 + 2 * numYears;   // h0 starts here
  const hmOffset = 3 + 3 * numYears;   // hm0 starts here

  // Compute display count for a cell based on raw/harmonized mode + confidence filter
  function getDisplayCount(cell) {
    if (currentMode === "harmonized") {
      if (yearCol === 2) {
        // All years total: sum harmonized across all years
        let total = 0;
        for (let yi = 0; yi < numYears; yi++) {
          let yt, mt;
          if (highConfOnly) {
            yt = cell[hcOffset + yi] || 0;
            mt = cell[hmOffset + yi] || 0;
          } else {
            yt = cell[3 + yi] || 0;
            mt = cell[3 + numYears + yi] || 0;
          }
          const vt = yt - mt;
          total += Math.round(mt * ratio) + vt;
        }
        return total;
      } else {
        // Specific year
        let yt, mt;
        if (highConfOnly) {
          yt = cell[hcOffset + yearIdx] || 0;
          mt = cell[hmOffset + yearIdx] || 0;
        } else {
          yt = cell[yearCol] || 0;
          mt = cell[3 + numYears + yearIdx] || 0;
        }
        const vt = yt - mt;
        return Math.round(mt * ratio) + vt;
      }
    } else {
      // Raw mode
      if (highConfOnly) {
        if (yearCol === 2) {
          // Sum all high-conf years
          let total = 0;
          for (let yi = 0; yi < numYears; yi++) {
            total += cell[hcOffset + yi] || 0;
          }
          return total;
        } else {
          return cell[hcOffset + yearIdx] || 0;
        }
      }
      return cell[yearCol] || 0;
    }
  }

  // (subtitle removed)

  // Extract display counts for active cells, filtering out zeros
  const activeCells = [];
  const activeCounts = [];
  for (let i = 0; i < cells.length; i++) {
    const count = getDisplayCount(cells[i]);
    if (count > 0) {
      activeCells.push(cells[i]);
      activeCounts.push(count);
    }
  }

  // FIXED thresholds from pooled per-year-cell distribution across all years
  // This means: 2011 (few fires) looks pale, 2012+ (VIIRS spike) looks red,
  // and harmonized pre-2012 scales up to match post-2012 raw — the whole point
  const p50 = 8,
    p75 = 25,
    p90 = 66,
    p99 = 277;

  function getCellColor(count) {
    if (count <= p50) return [254, 243, 199, 0.45];
    if (count <= p75) return [251, 191, 36, 0.55];
    if (count <= p90) return [249, 115, 22, 0.65];
    if (count <= p99) return [220, 38, 38, 0.75];
    return [127, 29, 29, 0.85];
  }

  // Precompute colors in cell order (activeCounts[i] corresponds to activeCells[i])
  const cellColors = activeCounts.map((count) => {
    const [r, g, b, a] = getCellColor(count);
    return `rgba(${r},${g},${b},${a})`;
  });

  // Custom canvas overlay — no DOM elements, pure pixel painting
  const CanvasHeatgrid = L.Layer.extend({
    onAdd(map) {
      this._map = map;
      this._canvas = L.DomUtil.create("canvas", "heatgrid-canvas");
      const pane = map.getPane("overlayPane");
      pane.appendChild(this._canvas);
      this._canvas.style.position = "absolute";
      this._canvas.style.pointerEvents = "none";
      // Hide canvas during zoom animation to avoid the stretch glitch
      map.on("zoomanim", this._hideOnZoom, this);
      map.on("moveend zoomend resize", this._redraw, this);
      this._redraw();
    },

    onRemove(map) {
      L.DomUtil.remove(this._canvas);
      map.off("zoomanim", this._hideOnZoom, this);
      map.off("moveend zoomend resize", this._redraw, this);
    },

    _hideOnZoom() {
      this._canvas.style.opacity = "0";
    },

    _redraw() {
      const map = this._map;
      const size = map.getSize();
      const canvas = this._canvas;
      canvas.width = size.x;
      canvas.height = size.y;

      // Position canvas at map container origin
      const topLeft = map.containerPointToLayerPoint([0, 0]);
      L.DomUtil.setPosition(canvas, topLeft);

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, size.x, size.y);

      const bounds = map.getBounds();
      const zoom = map.getZoom();

      // Cell pixel size: at least 3px, grows with zoom
      const cellSize = Math.max(3, Math.round(Math.pow(2, zoom - 2)));
      const halfCell = cellSize / 2;

      // Expand bounds check slightly
      const south = bounds.getSouth() - 0.5;
      const north = bounds.getNorth() + 0.5;
      const west = bounds.getWest() - 0.5;
      const east = bounds.getEast() + 0.5;

      for (let i = 0; i < activeCells.length; i++) {
        const lat = activeCells[i][0];
        const lon = activeCells[i][1];

        // Quick bounds check
        if (lat < south || lat > north || lon < west || lon > east) continue;

        const point = map.latLngToContainerPoint([lat, lon]);
        ctx.fillStyle = cellColors[i];
        ctx.fillRect(
          point.x - halfCell,
          point.y - halfCell,
          cellSize,
          cellSize,
        );
      }

      // Fade canvas back in after redraw
      canvas.style.opacity = "1";
      canvas.style.transition = "opacity 0.15s";
    },
  });

  heatgridLayer = new CanvasHeatgrid();
  heatgridLayer.addTo(map);

  // Keep country boundaries above heatgrid so clicks work
  if (countryLayer) countryLayer.bringToFront();
}

function updateMap() {
  // Fly to the selected country's bounds from the GeoJSON layer
  if (countryLayer) {
    countryLayer.eachLayer((layer) => {
      const name = layer.feature.properties.name;
      const slug = name.toLowerCase().replace(/ /g, "_").replace(/'/g, "");
      if (slug === currentCountry) {
        map.fitBounds(layer.getBounds(), { padding: [30, 30], maxZoom: 6 });
        return;
      }
    });
  }
}

// ── Tooltip ──
function showTooltip(e, entry) {
  const tip = document.getElementById("tooltip");
  let html = `<div class="tooltip-date">${formatDate(entry.date)}</div>`;

  if (entry.data) {
    const ratio = currentData.harmonization?.viirs_modis_ratio || 1;
    Object.entries(entry.data).forEach(([source, vals]) => {
      const displayName = source.startsWith("MODIS") ? "MODIS" : "VIIRS";
      const color = source.startsWith("MODIS")
        ? "var(--modis-color)"
        : "var(--viirs-color)";
      let count = vals.count;
      let suffix = "";
      if (currentMode === "harmonized" && source.startsWith("MODIS")) {
        count = Math.round(count * ratio);
        suffix = " (scaled)";
      }
      html += `<div class="tooltip-row"><span class="tooltip-source">${displayName}</span><span class="tooltip-count" style="color:${color}">${formatNumber(count)}${suffix}</span></div>`;
    });
    html += `<div class="tooltip-row" style="border-top:1px solid var(--border);padding-top:4px;margin-top:4px"><span class="tooltip-source">Total</span><span class="tooltip-count">${formatNumber(entry.count)}</span></div>`;
    if (entry.data.MODIS_SP && currentMode === "harmonized") {
      html += `<div style="font-size:10px;color:var(--harmonized-color);margin-top:4px">MODIS scaled by ${ratio.toFixed(2)}×</div>`;
    }
  } else {
    html += `<div class="tooltip-row"><span class="tooltip-source">No detections</span></div>`;
  }

  tip.innerHTML = html;
  tip.classList.add("visible");
}

function hideTooltip() {
  document.getElementById("tooltip").classList.remove("visible");
}

function moveTooltip(e) {
  const tip = document.getElementById("tooltip");
  tip.style.left = e.clientX + 12 + "px";
  tip.style.top = e.clientY - 12 + "px";
}

// ── CSV Export ──
function downloadCSV() {
  if (!currentData) return;

  const daily = currentData.daily;
  const ratio = currentData.harmonization?.viirs_modis_ratio || 1;
  const isHarm = currentMode === "harmonized";
  const hc = highConfOnly;
  const yearPrefix = String(currentYear);

  // Header reflects current settings
  const confLabel = hc ? "high_conf" : "all_conf";
  const modeLabel = isHarm ? "harmonized" : "raw";
  let csv = `date,modis,viirs,total\n`;

  Object.keys(daily)
    .sort()
    .filter((date) => date.startsWith(yearPrefix))
    .forEach((date) => {
      const d = daily[date];
      // Pick count based on confidence filter
      let modis = hc ? (d.MODIS_SP?.high_conf || 0) : (d.MODIS_SP?.count || 0);
      let viirs = hc ? (d.VIIRS_SNPP_SP?.high_conf || 0) : (d.VIIRS_SNPP_SP?.count || 0);

      // Apply harmonization if needed
      if (isHarm) {
        modis = Math.round(modis * ratio);
      }

      const total = modis + viirs;
      csv += `${date},${modis},${viirs},${total}\n`;
    });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fireatlas_${currentCountry}_${currentYear}_${modeLabel}_${confLabel}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Helpers ──
function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Methodology toggle ──
function toggleMethodology() {
  const panel = document.getElementById("methodology-panel");
  panel.classList.toggle("expanded");
}
