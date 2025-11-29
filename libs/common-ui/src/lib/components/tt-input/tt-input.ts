import {ChangeDetectionStrategy, Component, forwardRef, input} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: "tt-input",
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: "./tt-input.html",
  styleUrl: "./tt-input.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInput),
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TtInput implements ControlValueAccessor {
  type  = input<'text'|'password'>('text');
  placeholder = input<string>();

  value: string | null = null

  writeValue(value: string | null) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean) {
  }

  onChange(value: string | null) {

  }

  onTouched() {

  }

}
