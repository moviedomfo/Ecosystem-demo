import { AppConstants } from "@common/commonConstants";
import { KafkaConfig } from "kafkajs";

export const kconfig: KafkaConfig = {
  brokers: AppConstants.Brokers,
  ssl: false,
  clientId: AppConstants.CLIENT_ID,
}


