import {Component, inject} from "@angular/core";
import {SubscriberCard} from "../subscriber-card/subscriber-card";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {firstValueFrom} from "rxjs";
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';
import {ProfileService} from '@tt/profile';

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
})
export class Sidebar {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

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

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
