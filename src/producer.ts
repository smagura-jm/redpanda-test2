// import { POSDataReceivedV2 } from '@jm/coreserv.event-schemas/dist/event-schemas/POSDataReceived/v2';
// import { Kafka } from 'kafkajs';
// import { v4 as uuid } from 'uuid';

// const kafka = new Kafka({
//   clientId: 'PosDataProcessor',
//   brokers: ['localhost:19092'],
// });

// const producer = kafka.producer();

// const connect = async () => {
//   await producer.connect();
// };

// const disconnect = () => {
//   return producer.disconnect();
// };

// const sendMessage = (event: POSDataReceivedV2) => {
//   const bytes = POSDataReceivedV2.encode(event).finish();
//   const buffer = Buffer.from(bytes);

//   return producer.send({
//     topic: 'POSData_Received',
//     messages: [{ value: buffer }],
//   });
// };

// export const producerMain = async () => {
//   await connect();
//   //
//   await disconnect();
// };

export {};
