import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {ImgUrlPipe} from '@tt/common-ui';
import {Profile} from '@tt/data-access';

@Component({
  selector: "app-profile-card",
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: "./profile-card.html",
  styleUrl: "./profile-card.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCard {
  @Input() profile!: Profile;
}
