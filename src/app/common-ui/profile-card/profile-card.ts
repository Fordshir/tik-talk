import {Component, Input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url-pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [
    ImgUrlPipe,
    RouterLink
  ],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss'
})
export class ProfileCard {
  @Input() profile!: Profile;
}
