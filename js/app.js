import { fetchMarkets, fetchHistory } from "./api.js";
import { renderCards, setActiveCard, updateCountdown } from "./ui.js";
import { renderChart, hideChart, initChartControls } from "./chart.js";

const REFRESH_INTERVAL = 60;

let currency = "usd";
let selectedCoin = null;
let selectedDays = 1;
let countdown = REFRESH_INTERVAL;
let countdownTimer = null;

const currencySelector = document.getElementById("currency-selector");

async function loadMarkets() {
  try {
    const coins = await fetchMarkets(currency);
    renderCards(coins, currency, handleCardClick);
    if (selectedCoin) {
      const updated = coins.find((c) => c.id === selectedCoin.id);
      if (updated) selectedCoin = updated;
      setActiveCard(selectedCoin.id);
    }
  } catch (err) {
    console.error("Failed to load markets:", err);
  }
}

async function loadChart(coin, days) {
  try {
    const history = await fetchHistory(coin.id, currency, days);
    renderChart(coin, history, currency);
    setActiveCard(coin.id);
  } catch (err) {
    console.error("Failed to load chart:", err);
  }
}

function handleCardClick(coin, _cardEl) {
  if (selectedCoin?.id === coin.id) {
    selectedCoin = null;
    hideChart();
    setActiveCard(null);
    return;
  }
  selectedCoin = coin;
  selectedDays = 1;
  document.querySelectorAll(".chart-range-btn").forEach((b) => {
    b.classList.toggle("active", Number(b.dataset.days) === 1);
  });
  loadChart(coin, selectedDays);
}

function startCountdown() {
  clearInterval(countdownTimer);
  countdown = REFRESH_INTERVAL;
  updateCountdown(countdown);

  countdownTimer = setInterval(() => {
    countdown -= 1;
    updateCountdown(countdown);
    if (countdown <= 0) {
      countdown = REFRESH_INTERVAL;
      loadMarkets();
      if (selectedCoin) loadChart(selectedCoin, selectedDays);
    }
  }, 1000);
}

currencySelector.addEventListener("change", (e) => {
  currency = e.target.value;
  loadMarkets();
  if (selectedCoin) loadChart(selectedCoin, selectedDays);
});

initChartControls((days) => {
  selectedDays = days;
  if (selectedCoin) loadChart(selectedCoin, selectedDays);
});

loadMarkets();
startCountdown();
