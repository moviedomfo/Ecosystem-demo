import { TopicPartitionDTO } from '@domain/DTOs/TopicPartitionDTO';
import { kconfig } from '@infra/db/kafka.config';
import { Kafka } from 'kafkajs';

// const kafka = new Kafka({
//   clientId: 'admin-tool',
//   brokers: ['127.0.0.1:9092'],
// });
const kafka = new Kafka(kconfig);

/**s */
export default class KafkaAdminRepository {


  /**
   * ¿Cómo saber cuántos mensajes tiene un topic o partición en Kafka?
   * kafka-run-class.sh kafka.tools.GetOffsetShell \
   * --broker-list localhost:9092 \
   * --topic orders \
   * --time -1
   * @param topic 
   * @returns TopicPartitionDTO[]
   */
  public async GetTopicInfo(topic: string): Promise<TopicPartitionDTO[]> {
    const admin = kafka.admin();
    try {
      await admin.connect();
      // Validamos metadata antes de consultar offsets
      const metadata = await admin.fetchTopicMetadata({ topics: [topic] });

      if (metadata.topics.length === 0 || metadata.topics[0].partitions.length === 0) {
        throw new Error(`Topic '${topic}' no tiene particiones visibles`);
      }
      const partitions = await admin.fetchTopicOffsets(topic);

      const result = partitions.map((p) => {
        const partition = p.partition;
        const startOffset = parseInt(p.low);
        const endOffset = parseInt(p.high);
        const totalMessages = endOffset - startOffset;

        return new TopicPartitionDTO(partition, totalMessages, startOffset, endOffset - 1);
      });

      return result;
    } catch (error) {
      // Manejo específico de partición inexistente
      if ((error.name as string).startsWith("Kafka") && error.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
        console.error(`Error: El topic '${topic}' o alguna de sus particiones no existe`);
        throw new Error(`El topic '${topic}' o alguna partición no existe (Kafka error code 3)`);
      }
      console.error('Error al consultar offsets:', error);
      throw error;
    } finally {
      await admin.disconnect();
    }
  }

/**
 * kafka-topics.sh --bootstrap-server=localhost:9092 --list
 * @returns 
 */
  public async GetAllTopics(): Promise<String[]> {
    const admin = kafka.admin();
    try {
      await admin.connect();
      const topics = await admin.listTopics();

      const result = topics.map((t) => {
        return t;
      });


      return result;
    } catch (error) {
      // Manejo específico de partición inexistente
      // if ((error.name as string).startsWith("Kafka") && error.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
      //   console.error(`Error: El topic '${topic}' o alguna de sus particiones no existe`);
      //   throw new Error(`El topic '${topic}' o alguna partición no existe (Kafka error code 3)`);
      // }
      console.error('Error al consultar offsets:', error);
      throw error;
    } finally {
      await admin.disconnect();
    }
  }

}
