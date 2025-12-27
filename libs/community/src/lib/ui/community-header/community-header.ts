import {AfterViewInit, ChangeDetectionStrategy, Component, input} from '@angular/core'
import {AvatarCircle, SvgIconComponent} from '@tt/common-ui'
import {Community} from '@tt/data-access'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'tt-community-header',
  imports: [AvatarCircle, SvgIconComponent, ReactiveFormsModule],
  templateUrl: './community-header.html',
  styleUrl: './community-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityHeader implements AfterViewInit {
  community = input.required<Community>()
  myId = input<number>()

  form = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
  })

  ngAfterViewInit() {
    this.form.controls.name.setValue(this.community().name)
  }

  onDelete(){
    this.form.reset()
  }
}
