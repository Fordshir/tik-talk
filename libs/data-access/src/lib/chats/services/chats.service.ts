import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Chat, GroupedMessages, lastMessageRes, Message,} from "../interfaces/chats.interface";
import {map, Observable, switchMap, timer} from "rxjs";
import {DateTime} from "ts-luxon";
import {ChatWsService} from '../interfaces/chat-ws-service.interface';
import {ChatWSMessage} from '../interfaces/chat-ws-message.interface';
import {isNewMessage, isUnreadMessage} from '../interfaces/type-guards';
import {ChatWsRxjsService} from './chat-ws-rxjs.service';
import { Auth } from "../../auth/auth";
import { ProfileService } from "../../profile";
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: "root",
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;
  #authService = inject(Auth);

  wsAdapter: ChatWsService = new ChatWsRxjsService();

  activeChatMessages = signal<GroupedMessages[]>([]);
  unreadMessagesCounter = signal(0);
  activeChat = signal<Chat | null>(null);

  baseApiUrl = "/yt-course/";
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  connectWS () {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage
    }) as Observable<ChatWSMessage>;
  }

  handleWSMessage = (message: ChatWSMessage)=> {
    if (!('action' in message)) return

    if (isUnreadMessage(message)) {
      this.unreadMessagesCounter.set(message.data.count)
    }

    if (isNewMessage(message)) {
      const me = this.me()
      const activeChat = this.activeChat()

      if (!me || !activeChat) return

      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          date: formatDate(message.data.created_at, "dd.MM.yyyy", "en-US"), // поменять
          messages: [{
            id: message.data.id,
            userFromId: message.data.author,
            personalChatId: message.data.chat_id,
            text: message.data.message,
            createdAt: message.data.created_at,
            isRead: false,
            isMine: message.data.author === me.id,
            user: activeChat.userFirst.id === message.data.author
              ? activeChat.userFirst
              : activeChat.userSecond
          }]}
      ])
    }
  }

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return timer(0, 10000).pipe(
      switchMap(() =>
        this.http.get<lastMessageRes[]>(`${this.chatsUrl}get_my_chats/`)
      )
    );
  }

  getGroupedMessages(messages: Message[]) {
    const messagesArray = messages;
    const groupedMessages = new Map<string, Message[]>();

    const today = DateTime.now().startOf("day");
    const yesterday = today.minus({ days: 1 });

    messagesArray.forEach((message) => {
      const messageDate = DateTime.fromISO(message.createdAt, { zone: "utc" })
        .setZone(DateTime.local().zone)
        .startOf("day");

      let dateLabel: string;
      if (messageDate.equals(today)) {
        dateLabel = "Сегодня";
      } else if (messageDate.equals(yesterday)) {
        dateLabel = "Вчера";
      } else {
        dateLabel = messageDate.toFormat("dd.MM.yyyy");
      }

      if (!groupedMessages.has(dateLabel)) {
        groupedMessages.set(dateLabel, []);
      }
        groupedMessages.get(dateLabel)?.push(message);
      });

    return Array.from(groupedMessages.entries()).map(([date, messages]) => ({
      date,
      messages,
    }));
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`)
      .pipe(
        map((chat) => {
          this.activeChat.set(chat)
          const patchedMessages = chat.messages.map((message) => {
            return {
              ...message,
              user:
                chat.userFirst.id === message.userFromId
                  ? chat.userFirst
                  : chat.userSecond,
              isMine: message.userFromId === this.me()!.id,
            };
          });

          const groupedMessages = this.getGroupedMessages(patchedMessages);

          this.activeChatMessages.set(groupedMessages);

          return {
            ...chat,
            companion:
              chat.userFirst.id === this.me()!.id
                ? chat.userSecond
                : chat.userFirst,
            messages: patchedMessages,
          };
        })
      );
  }
}
