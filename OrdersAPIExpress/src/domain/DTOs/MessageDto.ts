import { Schema } from 'mongoose';


export interface ImessageDto {
  key: string;
  content: string;
  // schema: string;
  origin: string;
  command: string;
}
