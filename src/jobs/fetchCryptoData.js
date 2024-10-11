const axios = require('axios');
const Crypto = require('../models/cryptoModel');

const fetchCryptoData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    const response = await axios.get(url);
    const data = response.data;

    coins.forEach(async (coin) => {
      const priceData = {
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        '24hChange': data[coin].usd_24h_change
      };
      await Crypto.create(priceData);
    });
    console.log('Cryptocurrency data fetched and stored');
  } catch (err) {
    console.error('Error fetching crypto data:', err);
  }
};

module.exports = fetchCryptoData;
