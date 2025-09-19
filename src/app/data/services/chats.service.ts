import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chat, lastMessageRes, Message} from '../interfaces/chats.interface';
import {ProfileService} from './profile';
import {map, switchMap, timer} from 'rxjs';
import {DateTime} from 'ts-luxon';

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<Message[]>([])

  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  chatsUrl = `${this.baseApiUrl}chat/`
  messageUrl = `${this.baseApiUrl}message/`

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return timer(0, 10000)
      .pipe(
        switchMap(() =>
          this.http.get<lastMessageRes[]>(`${this.chatsUrl}get_my_chats/`)
        ))
  }

  getChatById(chatId: number) {
    return timer(0, 10000)
      .pipe(
        switchMap(() =>
          this.http.get<Chat>(`${this.chatsUrl}${chatId}`)
        ))
      .pipe(
        map(chat => {
          const patchedMessages = chat.messages.map(message => {
            return {
              ...message,
              user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
              isMine: message.userFromId === this.me()!.id
            }
          })

          this.activeChatMessages.set(patchedMessages)

          return {
            ...chat,
            companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
            messages: patchedMessages
          }
        })
      )
  }

  getGroupedMessages() {
    const messagesArray = this.activeChatMessages()
    const groupedMessages = new Map<string, Message[]>();

    const today = DateTime.now().startOf('day')
    const yesterday = today.minus({days: 1})

    messagesArray.forEach(message => {
      const messageDate = DateTime.fromISO(message.createdAt, {zone: 'utc'})
        .setZone(DateTime.local().zone)
        .startOf('day')

      let dateLabel: string
      if (messageDate.equals(today)) {
        dateLabel = 'Сегодня'
      }
      else if (messageDate.equals(yesterday)) {
        dateLabel = 'Вчера'
      }
      else {
        dateLabel = messageDate.toFormat('dd.MM.yyyy')
      }

      if (!groupedMessages.has(dateLabel)) {
        groupedMessages.set(dateLabel, [])
      }
      groupedMessages.get(dateLabel)?.push(message)
    })

    return Array.from(groupedMessages.entries())
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(`${this.messageUrl}send/${chatId}`, {}, {
      params: {
        message
      }
    });
  }
}
