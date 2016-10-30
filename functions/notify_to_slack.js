'use strict';

const notifyToSlack = require('./notify_to_slack/index');

module.exports.handle = (event, context, callback) => {

  let notification = event;

  if(event.Records[0].Sns) {
    notification = parseSnsEvent(event);
  }

  notifyToSlack(notification);
  callback(null, {});

};

function parseSnsEvent(event) {
  const sns = event.Records[0].Sns;

  return {
    Subject: sns.Subject,
    Message: JSON.parse(sns.Message),
  }
}

