export type {
  Message,
  MessageId,
  Template,
  TemplateId,
  Timestamp,
} from "./backend.d";

export interface MessageGroup {
  date: string;
  messages: import("./backend.d").Message[];
}
