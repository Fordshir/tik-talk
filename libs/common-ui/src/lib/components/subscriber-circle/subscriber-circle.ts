import {ChangeDetectionStrategy, Component, HostListener, input, signal} from "@angular/core";
import {Profile} from '@tt/data-access';
import {RouterLink} from '@angular/router';
import {ImgUrlPipe} from '../../pipes/img-url-pipe';
import {Portal} from '../portal/portal'
import {NgClass} from '@angular/common';

@Component({
  selector: "tt-subscriber-circle",
  imports: [
    ImgUrlPipe,
    RouterLink,
    Portal,
    NgClass
  ],
  templateUrl: "./subscriber-circle.html",
  styleUrl: "./subscriber-circle.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriberCircle {
  isDisabled = input(false)
  profile = input<Profile>()
  mouseOver = signal(false)
  isChosen = signal(false)
  arr: Array<number> = []

  @HostListener('mouseover')
  onMouseOver() {
    this.mouseOver.set(true)
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseOver.set(false)
  }

  onClick() {
    this.isChosen.set(!this.isChosen())
  }
}
