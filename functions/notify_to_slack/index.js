'use strict';

require('dotenv').config();
const IncomingWebhooks = require('@slack/client').IncomingWebhook;

module.exports = function (obj) {
  const wh = new IncomingWebhooks(process.env.SLACK_WEBHOOK_URL);

  wh.send(JSON.stringify(obj, null, 2));
};
