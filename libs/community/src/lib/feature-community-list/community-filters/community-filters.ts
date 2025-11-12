import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, startWith} from "rxjs";
import {Store} from '@ngrx/store';
import {communityActions, communityFeature} from '../../../../../data-access/src/lib/community';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {StackInput, TtInput} from '@tt/common-ui';
import {SelectInput} from '../../../../../common-ui/src/lib/components/select-input/select-input';

@Component({
  selector: "tt-community-filters",
  imports: [FormsModule, ReactiveFormsModule, StackInput, SelectInput, TtInput],
  templateUrl: "./community-filters.html",
  styleUrl: "./community-filters.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityFilters {
  fb = inject(FormBuilder);
  store = inject(Store);

  communitySearchForm = this.fb.group({
    name: [""],
    themes: [""],
    tags: [""],
  });

  constructor() {
    this.store.select(communityFeature.selectCommunityFilters)
      .pipe(takeUntilDestroyed())
      .subscribe(filters => {
        if (filters) {
          this.communitySearchForm.patchValue(filters, { emitEvent: false });
        }
      });

    this.communitySearchForm.valueChanges
      .pipe(
        startWith(this.communitySearchForm.value),
        debounceTime(500),
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(communityActions.filterEvents({filters: formValue}))
      });
  }
}
