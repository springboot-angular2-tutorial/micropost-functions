'use strict';

const notifyToSlack = require('./notify_to_slack/index');

module.exports.handle = (event, context, callback) => {

  notifyToSlack(event);
  callback(null, {});

};

