import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

let config = new pulumi.Config();
let prefix = config.require("prefix");

for (let i = 0; i < 3; i++) {
    const s3bucket = new aws.s3.Bucket(`${prefix}-s3TargetBucket-${i}`);
    const s3bucketNotification = new aws.s3.BucketNotification(`${prefix}-s3TargetBucketNotification-${i}`, {
        bucket: s3bucket.id,
        eventbridge: true
    });
}

for (let i = 0; i < 3; i++) {
    const queue = new aws.sqs.Queue(`${prefix}-SQSTarget-${i}`);
}

