import { POSDataReceivedV1 } from '@jewelers-mutual-insurance/coreserv.event-schemas/dist/event-schemas/POSData_Received/v1.js';
import { Kafka } from 'kafkajs';
import { v4 as uuid } from 'uuid';

const kafka = new Kafka({
  clientId: 'CustomerService',
  brokers: ['localhost:19093'],
});

const consumer = kafka.consumer({ groupId: uuid() });

const handlePOSDataReceived = (event: POSDataReceivedV1) => {
  console.log('GOT MESSAGE:');

  console.log(JSON.stringify(event));
};

const subscribe = async () => {
  await consumer.subscribe({ topic: 'POSData_Received' }).then(() =>
    consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        const buffer = message.value;
        const event = POSDataReceivedV1.decode(
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
