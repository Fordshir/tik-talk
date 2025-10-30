import {ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener} from "@angular/core";
import { SvgIconComponent } from "../svg-icon/svg-icon";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: "tt-stack-input",
  imports: [
    SvgIconComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: "./stack-input.html",
  styleUrl: "./stack-input.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInput),
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StackInput implements ControlValueAccessor {
  value$ = new BehaviorSubject<string[]>([])

  innerInput = ''

  #disabled = false

  @HostBinding('class.disabled')
  get disabled() {
    return this.#disabled
  }

  @HostListener ('keydown.enter', ['$event'])
  onEnter (event: Event) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.innerInput) return

    this.value$.next([...this.value$.value, this.innerInput])
    this.innerInput = ''
    this.onChange(this.value$.value)
  }

  writeValue(stack: string[] | null) {
    if (!stack) {
      this.value$.next([])
      return
    }

    this.value$.next(stack)
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

  onChange(value: string[] | null) {

  }

  onTouched() {

  }

  onTagDelete(i: number) {
    const tags = this.value$.value
    tags.splice(i, 1)
    this.value$.next(tags)
    this.onChange(this.value$.value)
  }
}
