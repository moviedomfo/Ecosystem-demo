import { OrderSubscriptor } from './service/orders.subscriber';

const subscribber = new OrderSubscriptor();

subscribber.Start().then((res) => {
  console.log('subscriber starter');
});
