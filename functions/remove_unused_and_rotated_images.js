'use strict';

const removeUnusedAndRotatedImages = require('./remove_unused_and_rotated_images/index');

module.exports.handle = (event, context, callback) => {

  removeUnusedAndRotatedImages().then(() => {
    callback(null, {});
  }).catch(e => {
    console.error(e);
  });

};

