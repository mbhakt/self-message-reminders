import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    id: MessageId;
    content: string;
    timestamp: Timestamp;
}
export type Timestamp = bigint;
export type MessageId = bigint;
export interface Template {
    id: TemplateId;
    name: string;
    text: string;
}
export type TemplateId = bigint;
export interface backendInterface {
    createTemplate(name: string, text: string): Promise<Template>;
    deleteMessage(id: MessageId): Promise<boolean>;
    deleteTemplate(id: TemplateId): Promise<boolean>;
    listMessages(): Promise<Array<Message>>;
    listTemplates(): Promise<Array<Template>>;
    sendMessage(content: string): Promise<Message>;
    updateTemplate(id: TemplateId, name: string, text: string): Promise<boolean>;
}
