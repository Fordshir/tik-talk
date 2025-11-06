import {Profile} from '../../profile/interfaces/profile.interface';

export interface Chat {
  id: number
  userFirst: Profile
  userSecond: Profile
  messages: Message[]
  companion?: Profile
  unreadMessages: number
}

export interface Message {
  id: number
  userFromId: number
  personalChatId: number
  text: string
  createdAt: string
  isRead: boolean
  updatedAt: string
  user?: Profile
  isMine?: boolean
}

export interface lastMessageRes {
  id: number
  userFrom: Profile
  message: string | null
  createdAt: string
  unreadMessages: number
}

export interface GroupedMessages {
  date: string
  messages: Message[]
}
