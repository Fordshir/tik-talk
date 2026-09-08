import {ChangeDetectionStrategy, Component, forwardRef, input, signal} from "@angular/core";
import {SubscriberCircle} from "@tt/common-ui";
import {Profile} from '@tt/data-access';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: "tt-choose-control",
	imports: [
		SubscriberCircle
	],
  templateUrl: "./choose-control.html",
  styleUrl: "./choose-control.scss",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => ChooseControl),
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseControl implements ControlValueAccessor{
  subscribers = input<Profile[]>([])

  selectedValues = signal<number[]>([])

  onClick(id: number) {
    const isSelected = this.selectedValues().includes(id);
    const updated = isSelected
      ? this.selectedValues().filter(num => num !== id)
      : [...this.selectedValues(), id];

    this.selectedValues.set(updated)
    this.onChange(updated);
  }

  writeValue(value: number[]) {
    this.selectedValues.set(value ?? [])
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  onChange(value: any) {

  }

  onTouched() {
  }
}
