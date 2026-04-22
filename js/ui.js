const grid = document.getElementById("cards-grid");

const CURRENCY_SYMBOLS = { usd: "$", eur: "€" };

function formatPrice(price, currency) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "$";
  if (price >= 1000) {
    return `${symbol}${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  }
  return `${symbol}${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
}

function formatChange(change) {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

export function renderCards(coins, currency, onCardClick) {
  grid.innerHTML = "";
  coins.forEach((coin) => {
    const change = coin.price_change_percentage_24h ?? 0;
    const isPositive = change >= 0;

    const card = document.createElement("div");
    card.className = "crypto-card";
    card.dataset.id = coin.id;
    card.innerHTML = `
      <div class="card__header">
        <img class="card__icon" src="${coin.image}" alt="${coin.name}" />
        <div>
          <div class="card__name">${coin.name}</div>
          <div class="card__symbol">${coin.symbol}</div>
        </div>
      </div>
      <div class="card__price">${formatPrice(coin.current_price, currency)}</div>
      <div class="card__change card__change--${isPositive ? "positive" : "negative"}">
        ${formatChange(change)}
      </div>
    `;

    card.addEventListener("click", () => onCardClick(coin, card));
    grid.appendChild(card);
  });
}

export function setActiveCard(coinId) {
  document.querySelectorAll(".crypto-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.id === coinId);
  });
}

export function updateCountdown(seconds) {
  document.getElementById("countdown").textContent = `${seconds}s`;
}
