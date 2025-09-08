import {Component, input} from '@angular/core';
import {ImgUrlPipe} from "../../helpers/pipes/img-url-pipe";
import {Profile} from '../../data/interfaces/profile.interface';

@Component({
  selector: 'tt-avatar-circle',
    imports: [
        ImgUrlPipe
    ],
  templateUrl: './avatar-circle.html',
  styleUrl: './avatar-circle.scss'
})
export class AvatarCircle {
  avatarUrl = input<string | null>()
}
