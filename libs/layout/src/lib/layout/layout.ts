import {ChangeDetectionStrategy, Component,} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {Sidebar} from '../sidebar/sidebar'
import {ModalHost} from '@tt/common-ui';

@Component({
  selector: 'tt-layout',
  imports: [RouterOutlet, Sidebar, ModalHost],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout{}
