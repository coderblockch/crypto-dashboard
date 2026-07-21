# Crypto Dashboard

Dashboard de criptomonedas en tiempo real con autenticación de usuarios. Muestra precios de mercado en vivo desde la API de **CoinGecko**, gráficos históricos interactivos y login/registro con **Firebase Authentication**. Construido con **JavaScript puro (ES Modules)** y **Chart.js**.

🔗 **[Demo en vivo](https://coderblockch.github.io/crypto-dashboard/)** *(activa GitHub Pages para publicarla)*

<!-- Agrega una captura de pantalla: ![Crypto Dashboard](docs/screenshot.png) -->

## Funcionalidades

- **Precios en vivo:** tarjetas con las principales criptomonedas (BTC, ETH, SOL, BNB, XRP, ADA, DOGE) desde CoinGecko.
- **Gráficos históricos:** rangos de 24 h, 7 d y más con Chart.js.
- **Selector de moneda:** USD y EUR.
- **Auto-refresh:** actualización periódica con cuenta regresiva.
- **Autenticación:** registro, login y logout con Firebase Auth; perfil de usuario en Firestore.
- **Estados de carga:** *skeletons* mientras llegan los datos.

## Stack técnico

- **JavaScript (ES6+ / ES Modules)** — lógica de la app.
- **[CoinGecko API](https://www.coingecko.com/es/api)** — datos de mercado (sin API key).
- **[Firebase](https://firebase.google.com/)** — Authentication + Firestore.
- **[Chart.js](https://www.chartjs.org/)** — gráficos.
- **HTML5 + CSS3** — estructura y estilos (con arquitectura BEM).

## Cómo ejecutarlo

Como el proyecto usa **ES Modules**, debe servirse por HTTP (no abras `index.html` con `file://`):

```bash
git clone https://github.com/coderblockch/crypto-dashboard.git
cd crypto-dashboard
python3 -m http.server 8000
```

Luego abre [http://localhost:8000/login.html](http://localhost:8000/login.html), crea una cuenta y entra al dashboard.

> Nota: la configuración de Firebase en `js/firebase.js` es la configuración **pública** del cliente web (no es un secreto). Las reglas de seguridad se controlan desde la consola de Firebase.

## Estructura

```
crypto-dashboard/
├── index.html       # Dashboard principal
├── login.html       # Pantalla de login / registro
├── css/             # Estilos (styles.css, auth.css)
└── js/
    ├── api.js       # Llamadas a la API de CoinGecko
    ├── auth.js      # Flujo de autenticación
    ├── firebase.js  # Inicialización de Firebase
    ├── chart.js     # Renderizado de gráficos
    ├── ui.js        # Actualizaciones del DOM
    └── app.js       # Punto de entrada / orquestación
```
