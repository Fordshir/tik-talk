import {ChangeDetectionStrategy, Component, inject, signal} from "@angular/core";
import {ProfileHeader} from "../../ui/profile-header/profile-header";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";
import {ImgUrlPipe, SvgIconComponent} from '@tt/common-ui';
import {ProfileService} from '@tt/data-access';
import {PostFeed} from '@tt/posts';

@Component({
  selector: "tt-profile-page",
  imports: [
    ProfileHeader,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    PostFeed
  ],
  templateUrl: "./profile-page.html",
  styleUrl: "./profile-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);

  isMyPage = signal(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === "me" || id === this.profileService.me()?.id);
      if (id === "me") return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
      this.router.navigate(["/chats", 'new'], {queryParams: {userId}});
  }
}
