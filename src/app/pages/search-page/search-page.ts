import {Component, inject} from '@angular/core';
import {ProfileCard} from '../../common-ui/profile-card/profile-card';
import {ProfileService} from '../../data/services/profile';
import {ProfileFilters} from './profile-filters/profile-filters';

@Component({
  selector: 'tt-search-page',
  imports: [
    ProfileCard,
    ProfileFilters
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles;

  constructor() {

  }
}
