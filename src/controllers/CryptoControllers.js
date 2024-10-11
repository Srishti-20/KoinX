// controllers/cryptoController.js
const CryptoData = require('../src/models/cryptoModules');

exports.getStats = async (req, res) => {
  try {
    const { coin } = req.query;
    const latestData = await CryptoData.findOne({ coin }).sort({ createdAt: -1 });

    if (!latestData) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData.change24h,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDeviation = async (req, res) => {
  try {
    const { coin } = req.query;
    const priceData = await CryptoData.find({ coin }).sort({ createdAt: -1 }).limit(100);

    if (priceData.length < 2) {
      return res.status(400).json({ message: 'Not enough data' });
    }

    const prices = priceData.map((data) => data.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const squaredDiffs = prices.map((price) => Math.pow(price - mean, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);

    res.json({ deviation: standardDeviation.toFixed(2) });
  } catch (error) {
    console.error('Error calculating deviation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
