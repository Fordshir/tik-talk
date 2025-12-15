import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, input} from '@angular/core'
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'tt-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tt-input.html',
  styleUrl: './tt-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInput)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TtInput implements ControlValueAccessor {
  type = input<'text' | 'password'>('text')
  placeholder = input<string>()

  cdr = inject(ChangeDetectorRef)

  value: string = ''

  writeValue(value: string) {
    this.value = value ?? ''
    this.cdr.detectChanges()
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean) {
  }

  onChange(value: string) {
  }

  onTouched() {
  }
}
