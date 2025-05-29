import { AppConstants } from '../utils/AppConstants';
import OrdersService from './orders.service';
import { Helper } from '../utils/helper';
import { Kafka, KafkaConfig, Consumer } from 'kafkajs';
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
      allowAutoTopicCreation: false
    });
    // await this.retryKafkaConnection(consumer, 5, 3000); // max 5 intentos, 3s de espera inicial
    await this.connectKafkaIndefinitely(consumer);

    await consumer.subscribe({
      topic: AppConstants.TOPIC,
      fromBeginning: true,
    });

    Helper.LogConsole(`------------------ ClientId : ${clientId} listening TOPIC : ${AppConstants.TOPIC} --------------------`);

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


  }

  static sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private async connectKafkaIndefinitely(consumer: Consumer) {
    let delay = 3000; // comienza con 3 segundos
    const maxDelay = 30000; // 30 segundos máximo

    while (true) {
      try {
        Helper.LogConsole(`🔌 Intentando conectar a Kafka...`);
        await consumer.connect();
        Helper.LogConsole(`✅ Conexión a Kafka establecida.`);
        break;
      } catch (err) {
        Helper.LogErrorFull(`❌ Error al conectar a Kafka`, err);
        Helper.LogConsole(`⏳ Reintentando en ${delay / 1000}s...`);
        await OrderSubscriptor.sleep(delay);
        delay = Math.min(delay * 2, maxDelay); // backoff exponencial con tope
      }
    }
  }

  private async retryKafkaConnection(
    consumer,
    maxRetries: number,
    initialDelayMs: number
  ) {
    let attempts = 0;
    let delay = initialDelayMs;

    while (attempts < maxRetries) {
      try {
        attempts++;
        Helper.LogConsole(`🔌 Intentando conectar a Kafka (Intento ${attempts})...`);
        await consumer.connect();
        Helper.LogConsole(`✅ Conexión a Kafka establecida.`);
        return;
      } catch (err) {
        Helper.LogErrorFull(`❌ Error al conectar a Kafka (Intento ${attempts})`, err);
        if (attempts === maxRetries) {
          throw new Error(`❌ Falló la conexión a Kafka después de ${maxRetries} intentos`);
        }
        Helper.LogConsole(`⏳ Reintentando en ${delay} ms...`);
        await OrderSubscriptor.sleep(delay);
        delay *= 2; // backoff exponencial
      }
    }
  }
}
