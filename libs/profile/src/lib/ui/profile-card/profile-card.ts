import {Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ImgUrlPipe} from '@tt/common-ui';
import {Profile} from '../../../../../data-access/src/lib/profile/interfaces/profile.interface';

@Component({
  selector: "app-profile-card",
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: "./profile-card.html",
  styleUrl: "./profile-card.scss",
})
export class ProfileCard {
  @Input() profile!: Profile;
}
