import { AppConstants } from '../utils/AppConstants';
import OrdersService from './Orders.service';
import { Helper } from '../utils/helper';
import { Kafka, KafkaConfig } from 'kafkajs';
import { ImessageDto } from '../models/MessageDto';
import { OrderDTO } from '../models';

export class OrderSubscriptor {
  private readonly ordersService: OrdersService;
  constructor() {
    this.ordersService = new OrdersService();
  }

  public async Start() {
    const publisherName = AppConstants.APP_NAME;

    const kconfig: KafkaConfig = {
      brokers: ['localhost:9092'],
      ssl: false,
      clientId: 'order-subs-0001',
    };
    const kafka = new Kafka(kconfig);
    const consumer = kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();
    await consumer.subscribe({
      topic: AppConstants.TOPIC,
      fromBeginning: true,
    });
    Helper.LogConsole(
      `------------------Order subscribber started  ${publisherName} and listening ${AppConstants.TOPIC} 
      } --------------------`
    );

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        Helper.LogConsole(`TOPIC ${topic}`);
        const orderMessageJson = message.value.toString();
        await Helper.LogConsole(orderMessageJson);

        const order: OrderDTO = JSON.parse(JSON.parse(orderMessageJson));

        await this.ordersService.Insert(order);
      },
    });

    //this.ordersService.Insert();
    //Helper.LogConsole(`API url ${AppSettings.BASE_ORDERS_URL}`);
  }

  static sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
