const app = require('./index'); // Your Express app

module.exports = (req, res) => {
  app(req, res); // Let Express handle the request
};
