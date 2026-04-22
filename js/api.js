const BASE_URL = "https://api.coingecko.com/api/v3";

const COINS = [
  "bitcoin",
  "ethereum",
  "solana",
  "binancecoin",
  "ripple",
  "cardano",
  "dogecoin",
];

export async function fetchMarkets(currency = "usd") {
  const ids = COINS.join(",");
  const url = `${BASE_URL}/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}

export async function fetchHistory(coinId, currency = "usd", days = 1) {
  const url = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}
