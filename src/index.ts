import { consumerDisconnect, consumerMain } from './consumer';
import { producerMain } from './producer';

const main = async () => {
  await consumerMain();
  await producerMain();
  await consumerDisconnect();
};

main().catch(console.error);
