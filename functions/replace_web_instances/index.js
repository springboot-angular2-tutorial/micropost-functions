const AWS = require('aws-sdk');

// AWS.config.region = process.env.AWS_DEFAULT_REGION;
const AutoScaling = new AWS.AutoScaling();

module.exports = function () {
  return AutoScaling.describeAutoScalingGroups({
    AutoScalingGroupNames: ['web'],
  }).promise()
    .then(data => data.AutoScalingGroups[0])
    .then(validateAsgCapacity)
    .then(multipleDesiredCapacity);
};

function validateAsgCapacity(asg) {
  if (asg.DesiredCapacity * 2 > asg.MaxSize) {
    throw 'Max capacity is too small so that it can not replace instances.';
  }
  console.log(`Current desired capacity is ${asg.DesiredCapacity}`);

  return asg;
}

function multipleDesiredCapacity(asg) {
  console.log(`Scale out to ${asg.DesiredCapacity * 2}.`);

  return AutoScaling.setDesiredCapacity({
    AutoScalingGroupName: asg.AutoScalingGroupName,
    DesiredCapacity: asg.DesiredCapacity * 2,
    HonorCooldown: false,
  }).promise();
}

