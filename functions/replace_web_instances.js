'use strict';

const replaceAutoScalingInstances = require('./replace_web_instances/index');

module.exports.handle = (event, context, callback) => {

  replaceAutoScalingInstances().then(() => {
    callback(null, {});
  }).catch(e => {
    console.error(e);
  });

};
