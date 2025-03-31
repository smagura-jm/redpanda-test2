import { consumerDisconnect, consumerMain } from './consumer';

const main = async () => {
  await consumerMain();
  //await producerMain();
  //await consumerDisconnect();
};

main().catch(console.error);
