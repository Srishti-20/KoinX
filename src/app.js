const express = require('express');
const mongoose = require('./database');
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');
const scheduler = require('./utils/scheduler');

const app = express();
const port = process.env.PORT || 3000;

// Use routes
app.use(statsRoute);
app.use(deviationRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
