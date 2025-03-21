import { Kafka } from 'kafkajs';
import { PosDataReceivedEvent } from './events';

const kafka = new Kafka({
  clientId: 'PosDataProcessor',
  brokers: ['localhost:19092'],
});

const producer = kafka.producer();

const connect = async () => {
  await producer.connect();
};

const disconnect = () => {
  return producer.disconnect();
};

// TODO use proto
const sendMessage = (event: PosDataReceivedEvent) => {
  return producer.send({
    topic: 'PosDataReceived',
    messages: [{ value: JSON.stringify(event) }],
  });
};

export const producerMain = async () => {
  await connect();
  await sendMessage({
    customer: {
      firstName: 'Sam',
      lastName: 'Magura',
    },
  });
  await disconnect();
};
