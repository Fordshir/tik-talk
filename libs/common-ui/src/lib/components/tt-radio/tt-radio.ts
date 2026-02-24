import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: "tt-radio",
  imports: [
    NgClass
  ],
  templateUrl: "./tt-radio.html",
  styleUrl: "./tt-radio.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtRadio),
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtRadio implements ControlValueAccessor {
  cdr = inject(ChangeDetectorRef)
  selectedValue: string = ''
  radioList = input<{ value:string, label: string }[]>()

  onClick(value: string) {
    this.selectedValue = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string | null) {
    this.selectedValue = value ?? ''
    this.cdr.detectChanges()
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  onChange(value: any) {
  }

  onTouched() {
  }
}
