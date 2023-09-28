import {kconfig} from "../db/kafka.config";
import {Kafka, Partitioners} from "kafkajs";

import {ImessageDto} from "@domain/DTOs/MessageDto";
import {IEventBusRepository} from "@application/interfases/IEventBusRepository";
import {AppConstants} from "@common/CommonConstants";

export default class KafkaEventBusRepository implements IEventBusRepository {
  PushToQueue = async (req: ImessageDto, topic: string) => {
    try {
      const kafka = new Kafka(kconfig);
      const producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner,
      });
      await producer.connect();

      await producer.send({
        topic,
        messages: [
          {
            key: req.key,
            value: JSON.stringify(req.content),
          },
        ],
      });
      console.log(`message was sended to TOPIC ${topic} from ${AppConstants.KAFKA_BROKERS}, message origin : ${req.origin}`);
    } catch (err) {
      throw err;

      // console.log(
      //   "*****************************Error from KAFKA *****************************        "
      // );
      // console.log(err.message);

      // console.log(
      //   "*****************************End ERROR  KAFKA *****************************        "
      // );
    }
  };
}
