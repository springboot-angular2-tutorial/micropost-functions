const cleanEcrImages = require('./clean_ecr_images/index');

module.exports.handle = (event, context, callback) => {

  cleanEcrImages(event).then(() => {
    callback(null, {});
  }).catch(e => {
    console.error(e);
  });

};
