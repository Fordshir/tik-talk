import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  inject,
  Input
} from '@angular/core'
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms'
import {SvgIconComponent} from '../svg-icon/svg-icon'
import {NgClass} from '@angular/common'

@Component({
  selector: 'tt-select',
  imports: [FormsModule, SvgIconComponent, NgClass],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Select)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Select implements ControlValueAccessor {
  @Input() options: string[] | undefined

  #disabled = false

  selectedValue: string[] = []

  isDropdownOpened = false

  cdr = inject(ChangeDetectorRef)

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened
  }

  @HostBinding('class.disabled')
  get disabled() {
    return this.#disabled
  }

  onClick(event: Event) {
    event.stopPropagation()
    event.preventDefault()

    const target = event.target as HTMLElement

    if (!target.closest('button')) {
      this.toggleDropdown()
      if (target.className.includes('select-option') && target.textContent) {
        this.onChange((this.selectedValue = [target.textContent.trim()]))
      }
    }
  }

  onDelete() {
    this.selectedValue = []
    this.onChange(this.selectedValue)
    this.cdr.detectChanges()
  }

  writeValue(value: string[] | null) {
    this.selectedValue = value ?? []
    this.cdr.detectChanges()
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
}
