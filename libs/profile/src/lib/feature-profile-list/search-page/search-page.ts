import {Component, inject} from "@angular/core";
import {ProfileCard} from "../../ui/profile-card/profile-card";
import {ProfileFilters} from "../profile-filters/profile-filters";
import {selectFilteredProfiles} from '../../../index';
import {Store} from '@ngrx/store';

@Component({
  selector: "tt-search-page",
  imports: [ProfileCard, ProfileFilters],
  templateUrl: "./search-page.html",
  styleUrl: "./search-page.scss",
})
export class SearchPage {
  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {}
}
