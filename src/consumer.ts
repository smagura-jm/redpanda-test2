import { Kafka } from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

const kafka = new Kafka({
  clientId: 'CustomerService',
  brokers: ['localhost:19092'],
});

const consumer = kafka.consumer({ groupId: uuidv4() }); // we need a unique groupId I'll explain down

const handlePosDataReceived = (event: any) => {
  console.log(
    `Hello customer ${event.customer.firstName} ${event.customer.lastName}.`,
  );
};

const subscribe = async () => {
  await consumer.subscribe({ topic: 'PosDataReceived' }).then(() =>
    consumer.run({
      eachMessage: async ({ message }) => {
        const event = JSON.parse((message.value as Buffer).toString());
        handlePosDataReceived(event);
      },
    }),
  );
};

export const consumerMain = async () => {
  await consumer.connect();
  await subscribe();
};

export const consumerDisconnect = async () => {
  await consumer.disconnect();
};
