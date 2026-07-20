# 📈 Crypto Dashboard

A live cryptocurrency price dashboard with interactive charts, auto-refresh, multi-currency support, and Firebase-backed user authentication. Prices come from the public [CoinGecko API](https://www.coingecko.com/en/api); charts are rendered with Chart.js.

🔗 **[Live Demo](https://coderblockch.github.io/crypto-dashboard/)**

## Features

- **Live market data** for major coins (BTC, ETH, SOL, BNB, XRP, ADA, DOGE) via CoinGecko
- **Interactive price charts** with selectable time ranges (Chart.js)
- **Auto-refresh** every 60 seconds with a visible countdown
- **Multi-currency** display (e.g. USD and others)
- **User authentication** (sign up / log in / log out) with Firebase Auth, backed by Firestore

## Tech Stack

- HTML5, CSS3, JavaScript (ES6 modules)
- [Chart.js](https://www.chartjs.org/) for data visualization
- [CoinGecko API](https://www.coingecko.com/en/api) for market data
- [Firebase](https://firebase.google.com/) (Authentication + Firestore)

## Run Locally

```bash
git clone https://github.com/coderblockch/crypto-dashboard.git
cd crypto-dashboard
# Serve over HTTP (required for ES modules):
python3 -m http.server 8000
# then visit http://localhost:8000/login.html
```

## Project Structure

```
index.html        # Dashboard
login.html        # Auth screen
css/              # Styles
js/api.js         # CoinGecko API calls
js/app.js         # App orchestration + auth guard
js/chart.js       # Chart.js rendering
js/ui.js          # DOM rendering + countdown
js/firebase.js    # Firebase init + auth helpers
```

## A Note on the Firebase Config

The `firebaseConfig` values in `js/firebase.js` are **client-side identifiers**, not secrets — Firebase is designed to expose them in the browser. Access is controlled by [Firebase Security Rules](https://firebase.google.com/docs/rules), so make sure Firestore rules are locked down to authenticated users in the Firebase console.
