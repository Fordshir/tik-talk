import {ChangeDetectionStrategy, Component, inject, ViewChild, ViewContainerRef} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {PortalService} from '@tt/common-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  #portalService = inject(PortalService);

  @ViewChild('portalHost', {read: ViewContainerRef})
  set PortalHost(portalHost: ViewContainerRef) {
    if (!portalHost) return

    this.#portalService.registerContainer(portalHost)
  }
}
