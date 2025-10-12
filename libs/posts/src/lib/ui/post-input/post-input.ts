import {Component, EventEmitter, HostBinding, inject, input, Output, Renderer2,} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AvatarCircle, SvgIconComponent} from '@tt/common-ui';
import {GlobalStoreService} from '@tt/data-access';


@Component({
  selector: "tt-post-input",
  imports: [AvatarCircle, SvgIconComponent, FormsModule],
  templateUrl: "./post-input.html",
  styleUrl: "./post-input.scss",
})
export class PostInput {
  r2 = inject(Renderer2);

  isCommentInput = input(false);
  postId = input<number>(0);
  profile = inject(GlobalStoreService).me;

  @Output() created = new EventEmitter<string>();

  @HostBinding("class.comment")
  get isComment() {
    return this.isCommentInput();
  }

  postText = "";

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, "height", "auto");
    this.r2.setStyle(textarea, "height", textarea.scrollHeight + "px");
  }

  onSend() {
    if (this.postText.trim()) {
      this.created.emit(this.postText);
      this.postText = "";
    }
  }
}
