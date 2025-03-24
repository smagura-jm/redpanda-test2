import { POSDataReceivedV2 } from '@jm/coreserv.event-schemas/dist/event-schemas/POSDataReceived/v2';
import { Kafka } from 'kafkajs';
import { v4 as uuid } from 'uuid';

const kafka = new Kafka({
  clientId: 'CustomerService',
  brokers: ['localhost:19092'],
});

const consumer = kafka.consumer({ groupId: uuid() });

const handlePOSDataReceived = (event: POSDataReceivedV2) => {
  console.log('GOT MESSAGE:');

  console.log(JSON.stringify(event));
};

const subscribe = async () => {
  await consumer.subscribe({ topic: 'POSDataReceived' }).then(() =>
    consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        const buffer = message.value;
        const event = POSDataReceivedV2.decode(
          new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength),
        );
        handlePOSDataReceived(event);
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
