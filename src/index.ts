import { producerMain } from './producer';

const main = async () => {
  await producerMain();
};

main().catch(console.error);
