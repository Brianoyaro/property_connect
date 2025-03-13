const app = require("./backend");
const serverless = require("serverless-http");

module.exports.handler = serverless(app);
