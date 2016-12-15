const AWS = require('aws-sdk');
const _ = require('lodash');

const ecr = new AWS.ECR();

module.exports = function (params) {
  const repositoryName = params.repositoryName;
  const age = params.age || 2;

  return ecr.describeImages({repositoryName: repositoryName})
    .promise()
    .then(data => findImagesToClear(data.imageDetails, age))
    .then(imagesToClear => deleteImages(imagesToClear, repositoryName))
    .then(data => console.log(data))
    ;
};

function findImagesToClear(images, age) {
  return _.chain(images)
    .sortBy('imagePushedAt')
    .take(images.length - age)
    .value();
}

function deleteImages(images, repositoryName) {
  const imageIds = images.map(i => _.pick(i, 'imageDigest'));

  return ecr.batchDeleteImage({
    imageIds: imageIds,
    repositoryName: repositoryName,
  }).promise();
}
