import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, startWith} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {profileActions, profileFeature} from '../../../index';
import {Store} from '@ngrx/store';

@Component({
  selector: "tt-profile-filters",
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: "./profile-filters.html",
  styleUrl: "./profile-filters.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFilters {
  fb = inject(FormBuilder);
  store = inject(Store);

  searchForm = this.fb.group({
    firstName: [""],
    city: [""],
    stack: [""],
  });

  constructor() {
    this.store.select(profileFeature.selectProfileFilters)
      .pipe(takeUntilDestroyed())
      .subscribe(filters => {
        if (filters) {
          this.searchForm.patchValue(filters, { emitEvent: false });
        }
      });

    this.searchForm.valueChanges
      .pipe(
        startWith(this.searchForm.value),
        debounceTime(500),
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(profileActions.filterEvents({filters: formValue}))
      });
  }
}
