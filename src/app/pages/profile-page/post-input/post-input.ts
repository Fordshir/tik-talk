import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2} from '@angular/core';
import {AvatarCircle} from '../../../common-ui/avatar-circle/avatar-circle';
import {ProfileService} from '../../../data/services/profile';
import {NgIf} from '@angular/common';
import {SvgIcon} from '../../../common-ui/svg-icon/svg-icon';
import {PostService} from '../../../data/services/post.service';
import {FormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'tt-post-input',
  imports: [
    AvatarCircle,
    NgIf,
    SvgIcon,
    FormsModule
  ],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss'
})
export class PostInput {
  r2 = inject(Renderer2)
  postService = inject(PostService);

  isCommentInput = input(false)
  postId = input<number>(0)
  profile = inject(ProfileService).me

  @Output() created = new EventEmitter();

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

  onCreatePost() {
    if (!this.postText) return

    if (this.isCommentInput()) {
      firstValueFrom(this.postService.createComment({
        text: this.postText,
        authorId: this.profile()!.id,
        postId: this.postId(),
      })).then(() => {
        this.postText = ''
      })
      return;
    }

    firstValueFrom(this.postService.createPost({
      title: 'клёвый пост',
      content: this.postText,
      authorId: this.profile()!.id
    })).then(() => {
      this.postText = ''
      this.created.emit()
    })
  }
}
