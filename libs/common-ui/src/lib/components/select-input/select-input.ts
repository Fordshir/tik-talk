import {ChangeDetectionStrategy, Component, forwardRef, HostBinding, input} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: "tt-select-input",
  imports: [
    FormsModule
  ],
  templateUrl: "./select-input.html",
  styleUrl: "./select-input.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectInput),
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectInput implements ControlValueAccessor {
  list = ["PROGRAMMING","TECHNOLOGY","EDUCATION","SPORT","OTHER"]

  #disabled = false

  selectedValue: string | null = null;

  @HostBinding('class.disabled')
  get disabled() {
    return this.#disabled
  }

  writeValue(value: string | null) {
    this.selectedValue = value
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean) {
    this.#disabled = isDisabled
  }

  onChange(value: any) {

  }

  onTouched() {

  }

  onSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedValue = select.value;
    this.onChange(this.selectedValue);
    this.onTouched();
  }

}
