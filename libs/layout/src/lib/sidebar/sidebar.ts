import {ChangeDetectionStrategy, Component, DestroyRef, inject} from "@angular/core";
import {SubscriberCard} from "../subscriber-card/subscriber-card";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {firstValueFrom, Subscription, timer} from "rxjs";
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';
import {Auth, ChatsService, ChatWSMessage, ProfileService} from '@tt/data-access';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: "tt-sidebar",
  imports: [
    SvgIconComponent,
    SubscriberCard,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: "./sidebar.html",
  styleUrl: "./sidebar.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
  profileService = inject(ProfileService);
  #chatService = inject(ChatsService);
  #authService = inject(Auth);
  destroyRef = inject(DestroyRef);

  subscribers$ = this.profileService.getSubscribersShortList();
  wsSubscribe!: Subscription;

  unreadMessages = this.#chatService.unreadMessagesCounter
  me = this.profileService.me;

  constructor() {

  }

  menuItems = [
    {
      label: "Моя страница",
      icon: "home",
      link: "profile/me",
    },
    {
      label: "Чаты",
      icon: "chats",
      link: "chats",
    },
    {
      label: "Поиск",
      icon: "search",
      link: "search",
    },
  ];

  connect() {
    this.wsSubscribe = this.#chatService.connectWS()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message: ChatWSMessage) => {
        if ('status' in message && message.status === 'error') {
          this.reconnect()
        }
      })
    console.log('ws connected');
  }

  async reconnect() {
    await firstValueFrom(this.#authService.refreshAuthToken())
    await firstValueFrom(timer(2000))

    this.wsSubscribe.unsubscribe();
    console.log('ws disconnected');

    this.connect()
  }

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())

    this.connect()
  }
}
