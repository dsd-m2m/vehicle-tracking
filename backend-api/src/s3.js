require('dotenv').config('');
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

// Move these names to env vars
const keyName = '2c85921b45-private.pem.key';
const certName = '2c85921b45-certificate.pem.crt';
const bucket = 'm2m-dev';

const cert = fs.createWriteStream(keyName);
const key = fs.createWriteStream(certName);

s3.getObject({ Bucket: bucket, Key: certName })
	.on('httpData', chunk => cert.write(chunk))
	.on('httpDone', () => cert.end())
	.send();

s3.getObject({ Bucket: bucket, Key: keyName })
	.on('httpData', chunk => key.write(chunk))
	.on('httpDone', () => key.end())
	.send();
