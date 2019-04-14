require('dotenv').config();

console.log('REGION', process.env.REGION);
console.log('QUEUE', process.env.QUEUE_URL);
console.log('ACCESS_KEY', process.env.ACCESS_KEY);
console.log('SECRET_KEY', process.env.SECRET_KEY);

const {
    Consumer
} = require('sqs-consumer');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
});

const app = Consumer.create({
    queueUrl: process.env.QUEUE_URL,
    handleMessage: async (message) => {
        console.log(message);
    }
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

app.start();