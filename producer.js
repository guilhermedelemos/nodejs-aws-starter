require('dotenv').config();
var Producer = require('sqs-producer');
var md5 = require('md5');

console.log('REGION', process.env.REGION);
console.log('QUEUE', process.env.QUEUE_URL);
console.log('ACCESS_KEY', process.env.ACCESS_KEY);
console.log('SECRET_KEY', process.env.SECRET_KEY);

function produceMsg(producer) {
    let currentDate = (new Date()).toISOString();
    console.log(`${currentDate}: Producing new message`);

    let msg = `New message (${currentDate})`;

    producer.send([{
        id: md5(msg),
        body: msg
    }], function (err) {
        if (err) console.log(err);
    });

    producer.queueSize(function (err, size) {
        if (err) console.log(err);
        console.log('There are', size, 'messages on the queue.');
    });

    setTimeout(produceMsg, 5000, producer);
}

let producer = Producer.create({
    queueUrl: process.env.QUEUE_URL,
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
});

produceMsg(producer);