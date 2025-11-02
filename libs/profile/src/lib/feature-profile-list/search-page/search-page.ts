import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {ProfileCard} from "../../ui/profile-card/profile-card";
import {ProfileFilters} from "../profile-filters/profile-filters";
import {Store} from '@ngrx/store';
import {InfiniteScrollTrigger} from '@tt/common-ui';
import {profileActions, selectFilteredProfiles} from '@tt/data-access';

@Component({
  selector: "tt-search-page",
  imports: [ProfileCard, ProfileFilters, InfiniteScrollTrigger],
  templateUrl: "./search-page.html",
  styleUrl: "./search-page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage {
  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {}

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }
}
