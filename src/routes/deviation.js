const express = require('express');
const router = express.Router();
const Crypto = require('../models/cryptoModel');

router.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  try {
    const prices = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100).select('price');
    const priceList = prices.map(record => record.price);
    
    if (priceList.length < 2) {
      return res.status(400).json({ message: 'Not enough data to calculate deviation' });
    }

    const mean = priceList.reduce((sum, price) => sum + price, 0) / priceList.length;
    const variance = priceList.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / priceList.length;
    const standardDeviation = Math.sqrt(variance).toFixed(2);

    res.json({ deviation: parseFloat(standardDeviation) });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating deviation' });
  }
});

module.exports = router;
