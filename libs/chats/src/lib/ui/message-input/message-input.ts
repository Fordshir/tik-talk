import {Component, EventEmitter, inject, Output, Renderer2,} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AvatarCircle, SvgIconComponent} from '@tt/common-ui';
import {ProfileService} from '@tt/profile';

@Component({
  selector: "tt-message-input",
  imports: [AvatarCircle, ReactiveFormsModule, SvgIconComponent, FormsModule],
  templateUrl: "./message-input.html",
  styleUrl: "./message-input.scss",
})
export class MessageInput {
  r2 = inject(Renderer2);
  me = inject(ProfileService).me;

  @Output() created = new EventEmitter<string>();

  postText = "";

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, "height", "auto");
    this.r2.setStyle(textarea, "height", textarea.scrollHeight + "px");
  }

  onSend() {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = "";
  }
}
