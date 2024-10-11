const express = require('express');
const router = express.Router();
const Crypto = require('../models/cryptoModel');

router.get('/stats', async (req, res) => {
  const { coin } = req.query;
  try {
    const data = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!data) {
      return res.status(404).json({ message: 'No data found for the specified coin' });
    }
    res.json({
      price: data.price,
      marketCap: data.marketCap,
      '24hChange': data['24hChange']
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

module.exports = router;
