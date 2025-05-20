import { AppConstants } from "@common/CommonConstants";
import { KafkaConfig } from "kafkajs";

export const kconfig: KafkaConfig = {
  brokers: AppConstants.KAFKA_BROKERS,
  ssl: false,
  clientId: AppConstants.KAFKA_CLIENT_ID,
};
