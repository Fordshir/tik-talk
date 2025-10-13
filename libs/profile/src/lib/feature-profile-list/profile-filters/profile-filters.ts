import {Component, inject} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, startWith, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {profileActions, ProfileService} from '../../../index';
import {Store} from '@ngrx/store';

@Component({
  selector: "tt-profile-filters",
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./profile-filters.html",
  styleUrl: "./profile-filters.scss",
})
export class ProfileFilters {
  fb = inject(FormBuilder);
  store = inject(Store);
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
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(profileActions.filterEvents({filters: formValue}))
      });
  }
}
