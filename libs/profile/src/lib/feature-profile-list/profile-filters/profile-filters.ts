import {Component, inject} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, startWith, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ProfileService} from '../../../index';

@Component({
  selector: "tt-profile-filters",
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./profile-filters.html",
  styleUrl: "./profile-filters.scss",
})
export class ProfileFilters {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  searchForm = this.fb.group({
    firstName: [""],
    city: [""],
    stack: [""],
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap((formValue) => {
          return this.profileService.filterProfiles(formValue);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
