import {ChangeDetectionStrategy, Component, forwardRef, input, signal} from "@angular/core";
import {SvgIconComponent} from "@tt/common-ui";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: "tt-textarea",
	imports: [
		SvgIconComponent
	],
  templateUrl: "./tt-textarea.html",
  styleUrl: "./tt-textarea.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(()=> TtTextarea)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtTextarea implements ControlValueAccessor {
  placeholder = input<string>()

  value = signal<string>('')

  writeValue(value: string) {
    this.value.set(value)
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean) {
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.value.set(value)
    this.onChange(value)
  }

  onChange(value: string) {

  }

  onTouched() {
  }
}
