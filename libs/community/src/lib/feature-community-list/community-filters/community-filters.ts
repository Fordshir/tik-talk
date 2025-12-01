import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms'
import {debounceTime, startWith} from 'rxjs'
import {Store} from '@ngrx/store'
import {communityActions, CommunityThemes} from '@tt/data-access'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {Select, StackInput, TtInput} from '@tt/common-ui'

@Component({
  selector: 'tt-community-filters',
  imports: [FormsModule, ReactiveFormsModule, StackInput, Select, TtInput],
  templateUrl: './community-filters.html',
  styleUrl: './community-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityFilters {
  fb = inject(FormBuilder)
  store = inject(Store)
  themes = Object.values(CommunityThemes)

  communitySearchForm = this.fb.group({
    name: [''],
    themes: [''],
    tags: ['']
  })

  constructor() {
    this.communitySearchForm.valueChanges
      .pipe(
        startWith(this.communitySearchForm.value),
        debounceTime(500),
        takeUntilDestroyed()
      )
      .subscribe((formValue) => {
        this.store.dispatch(
          communityActions.filterEvents({filters: formValue})
        )
      })
  }
}
