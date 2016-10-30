'use strict';

const AWS = require('aws-sdk');
const _ = require('lodash');

const EC2 = new AWS.EC2();
const AutoScaling = new AWS.AutoScaling();

module.exports = function () {
  return Promise.all([rotatedImages(), usedImageIds()])
    .then(_.spread((rotatedImages, usedImageIds) => {
      return _.reject(rotatedImages, image => {
        return _.includes(usedImageIds, image.ImageId);
      });
    }))
    .then(images => {
      const promises = images.map(image => {
        return deregisterImage(image)
          .then(deleteSnapShot)
      });
      return Promise.all(promises);
    });
};

function rotatedImages() {
  return EC2.describeImages({
    Filters: [
      {
        Name: 'tag:Rotated',
        Values: ['true'],
      },
    ],
  }).promise()
    .then(data => data.Images);
}

function usedImageIds() {
  return AutoScaling.describeLaunchConfigurations({}).promise()
    .then(data => {
      return data.LaunchConfigurations.map(lc => lc.ImageId);
    });
}

function deregisterImage(image) {
  return EC2.deregisterImage({
    ImageId: image.ImageId,
  }).promise()
    .then(() => {
      console.log(`deregistered ${image.ImageId}`);
      return image;
    })
    // ignore error and continue
    .catch(() => image)
}

function deleteSnapShot(image) {
  const snapShotId = _.chain(image.BlockDeviceMappings)
    .flatten()
    .map(m => m.Ebs)
    .compact()
    .map(m => m.SnapshotId)
    .first()
    .value();

  return EC2.deleteSnapshot({
    SnapshotId: snapShotId,
  }).promise()
    .then(() => {
      console.log(`deleted ${snapShotId}`);
      return image;
    })
    .catch(() => image)
}

