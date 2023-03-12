import { AppConstants } from "@common/commonConstants";
import { KafkaConfig } from "kafkajs";

export const kconfig: KafkaConfig = {
  brokers: AppConstants.KAFKA_BROKERS,
  ssl: false,
  clientId: AppConstants.KAFKA_CLIENT_ID,
}


