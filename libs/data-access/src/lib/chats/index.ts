import {ChatConnectionWSParams, ChatWsService } from "./interfaces/chat-ws-service.interface";
import { Chat, GroupedMessages, lastMessageRes, Message } from "./interfaces/chats.interface";
import { chatWSNativeService } from "./services/chat-ws-native.service";
import { ChatWsRxjsService } from "./services/chat-ws-rxjs.service";
import { ChatsService } from "./services/chats.service";

export * from "./interfaces/type-guards"
export * from "./interfaces/chat-ws-message.interface"

export {
  ChatsService,
  ChatWsRxjsService,
  chatWSNativeService
}

export type {
  Chat,
  Message,
  lastMessageRes,
  GroupedMessages,
  ChatWsService,
  ChatConnectionWSParams
}
