//require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()

import { sleep, log } from './helpers';
//const log = require('./helpers');
// const sleep = require('./helpers');
const color = require('colors');
const { Kafka } = require('kafkajs');

//El topic lo debe crear primero el producer

const topic = 'customers'; //process.env.TOPIC ;
const clientId = 'subscriber02';
const brokers = process.env.BROKERS;
const groupId = process.env.GROUP_ID;

const kafkaConfig = {
  clientId: clientId,
  brokers: brokers,
};

async function subscriber() {
  console.log(
    color.blue(
      `------------------${clientId} listening   ${topic} --------------------`
    )
  );
  const kafka = new Kafka({
    clientId: clientId,
    brokers: ['localhost:9092', 'kafka:9092'],
  });
  const consumer = kafka.consumer({ groupId: groupId });

  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await log(message.value.toString(), topic, partition);
    },
  });
}

subscriber().catch((error) => {
  console.error(error);
  process.exit(1);
});

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// function log(message, topic, partition) {
//   return new Promise((resolve) => {
//     const f = new Date().toISOString();
//     console.log(color.blue(f + ` Received message from "${topic}" topic`));
//     console.log(color.yellow(message));
//     resolve();
//   });
// }
