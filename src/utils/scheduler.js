const cron = require('node-cron');
const fetchCryptoData = require('../jobs/fetchCryptoData');

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
  console.log('Running crypto fetch job every 2 hours...');
  fetchCryptoData();
});
