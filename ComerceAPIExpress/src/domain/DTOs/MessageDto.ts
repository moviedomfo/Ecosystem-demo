import {Schema} from "mongoose";

export interface ImessageDto {
  content: string;
  origin: string;
  key: string;
}
export interface IKafkaMessageDto {
  key: string;
  content: string;
  ///schema: string;
  origin: string;
  command: string;
}
