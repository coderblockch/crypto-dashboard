let chartInstance = null;

const chartSection = document.getElementById("chart-section");
const chartTitle = document.getElementById("chart-title");
const closeBtn = document.getElementById("chart-close");
const rangeBtns = document.querySelectorAll(".chart-range-btn");

closeBtn.addEventListener("click", hideChart);

export function initChartControls(onRangeChange) {
  rangeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      rangeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      onRangeChange(Number(btn.dataset.days));
    });
  });
}

export function renderChart(coin, historyData, currency) {
  const prices = historyData.prices;
  const labels = prices.map(([timestamp]) => {
    const date = new Date(timestamp);
    return prices.length <= 48
      ? date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
  const values = prices.map(([, price]) => price);

  const isPositive = values.at(-1) >= values[0];
  const lineColor = isPositive ? "#22c55e" : "#ef4444";
  const fillColor = isPositive ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)";

  chartTitle.textContent = `${coin.name} — Price History`;
  chartSection.classList.remove("hidden");

  if (chartInstance) chartInstance.destroy();

  const ctx = document.getElementById("price-chart").getContext("2d");
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: currency.toUpperCase(),
          data: values,
          borderColor: lineColor,
          backgroundColor: fillColor,
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1a1d27",
          borderColor: "#2a2d3e",
          borderWidth: 1,
          titleColor: "#94a3b8",
          bodyColor: "#e2e8f0",
          callbacks: {
            label: (ctx) => {
              const symbol = currency === "usd" ? "$" : "€";
              return ` ${symbol}${ctx.parsed.y.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#94a3b8",
            maxTicksLimit: 8,
            maxRotation: 0,
          },
          grid: { color: "#2a2d3e" },
        },
        y: {
          ticks: {
            color: "#94a3b8",
            callback: (val) => {
              const symbol = currency === "usd" ? "$" : "€";
              return `${symbol}${val.toLocaleString("en-US")}`;
            },
          },
          grid: { color: "#2a2d3e" },
        },
      },
    },
  });
}

export function hideChart() {
  chartSection.classList.add("hidden");
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}
