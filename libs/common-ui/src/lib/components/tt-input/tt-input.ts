import {ChangeDetectionStrategy, Component, forwardRef, input, signal} from '@angular/core'
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms'
import {SvgIconComponent} from '@tt/common-ui';

@Component({
  selector: 'tt-input',
  imports: [FormsModule, ReactiveFormsModule, SvgIconComponent],
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
  type = input<'text' | 'password' | 'comment'>('text')
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
