import {Component, EventEmitter, HostBinding, inject, Input, input, Output, Renderer2} from '@angular/core';
import {AvatarCircle} from '../../../common-ui/avatar-circle/avatar-circle';
import {SvgIcon} from '../../../common-ui/svg-icon/svg-icon';
import {FormsModule} from '@angular/forms';
import {Profile} from '../../../data/interfaces/profile.interface';

@Component({
  selector: 'tt-post-input',
  imports: [
    AvatarCircle,
    SvgIcon,
    FormsModule
  ],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss'
})
export class PostInput {
  r2 = inject(Renderer2)

  isCommentInput = input(false)
  postId = input<number>(0)
  @Input() profile: Profile | null | undefined

  @Output() created = new EventEmitter<string>();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  postText = ''

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onSend() {
    if (this.postText.trim()) {
      this.created.emit(this.postText);
      this.postText = '';
    }
  }
}
