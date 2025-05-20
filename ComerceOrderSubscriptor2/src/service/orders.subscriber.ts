import { AppConstants } from '../utils/AppConstants';
import OrdersService from './orders.service';
import { Helper } from '../utils/helper';
import { Kafka, KafkaConfig } from 'kafkajs';
import { ImessageDto } from '../models/MessageDto';
import { OrderDTO } from '../models';
import os from 'os';

export class OrderSubscriptor {
  private readonly ordersService: OrdersService;
  constructor() {
    this.ordersService = new OrdersService();
  }

  public async Start() {

    //clientId en la configuración de Kafka (KafkaConfig) es un identificador único para el cliente Kafka (ya sea producer o consumer). 
    // No afecta directamente la lógica de suscripción ni los mensajes que se reciben, pero tiene roles importantes en monitoreo, logging y métricas.
    const groupId = AppConstants.GROUP_ID;
    const hostname = os.hostname();              // ej: 'node-api-01'

    const clientId = `${AppConstants.APP_NAME}-${hostname}`;


    const kconfig: KafkaConfig = {
      brokers: [AppConstants.BROKERS],
      ssl: false,
      clientId: clientId,
    };
    const kafka = new Kafka(kconfig);
    const consumer = kafka.consumer({
      groupId: groupId,
      // Si el topic 'orders' no existe, KafkaJS revisa si puede crear el topic automáticamente.
      // false : recomendado para producción
       allowAutoTopicCreation:false
    });
    await consumer.connect();
    await consumer.subscribe({
      topic: AppConstants.TOPIC,
      fromBeginning: true,
    });

    Helper.LogConsole(
      `------------------ ClientId : ${clientId} listening TOPIC : ${AppConstants.TOPIC} --------------------`
       
    );

    // Usá autoCommit: false si querés controlar errores y evitar perder mensajes.
    // autoCommit: true (default), Kafka hará el commit automáticamente cada autoCommitInterval, que podés configurar así:

    await consumer.run({
      autoCommit: true, // ✅ true para q si todo va bien no los traae mas
      eachMessage: async ({ topic, partition, message }) => {
        Helper.LogConsole(`TOPIC ${topic} - PARTITION ${partition}`);
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
