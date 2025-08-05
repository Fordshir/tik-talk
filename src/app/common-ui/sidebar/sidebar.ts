import {Component} from '@angular/core';
import {SvgIcon} from '../svg-icon/svg-icon';
import {SubscriberCard} from './subscriber-card/subscriber-card';

@Component({
  selector: 'tt-sidebar',
  imports: [
    SvgIcon,
    SubscriberCard
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]
}
