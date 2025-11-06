import {Component, input} from "@angular/core";
import {AvatarCircle} from '@tt/common-ui';
import {Profile} from '../../../../../data-access/src/lib/profile/interfaces/profile.interface';


@Component({
  selector: "tt-profile-header",
  imports: [AvatarCircle],
  templateUrl: "./profile-header.html",
  styleUrl: "./profile-header.scss",
})
export class ProfileHeader {
  profile = input<Profile>();
}
