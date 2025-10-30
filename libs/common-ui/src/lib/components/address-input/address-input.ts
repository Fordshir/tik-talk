import {ChangeDetectionStrategy, Component, forwardRef, inject, signal} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {DadataService} from '@tt/data-access';
import {debounceTime, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: "tt-address-input",
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: "./address-input.html",
  styleUrl: "./address-input.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInput),
    }
    ],
})
export class AddressInput implements ControlValueAccessor{
  innerSearchControl = new FormControl();
  #dadataService = inject(DadataService)

  isDropdownOpened = signal<boolean>(true)

  suggestions$ = this.innerSearchControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap((value) => {
        return this.#dadataService.getSuggestion(value)
          .pipe(
            tap(res => {
              this.isDropdownOpened.set(!!res.length);
            })
          )
      })
    )

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  onChange(value: any) {

  }

  onTouched() {

  }

  onSuggestionPick(city: string) {
    this.isDropdownOpened.set(false)
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
    this.onChange(city)
  }

}
