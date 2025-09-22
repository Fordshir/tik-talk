import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

enum receiverType {
  PERSON= 'PERSON',
  LEGAL= 'LEGAL'
}

@Component({
  selector: 'tt-form-hw',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-hw.html',
  styleUrl: './form-hw.scss'
})
export class FormHw {
  receiverType = receiverType
  form = new FormGroup({
    type: new FormControl<receiverType>(receiverType.PERSON),
    name: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    organization: new FormControl<string>(''),
    description: new FormControl<string>(''),
    telephone: new FormControl<number | null>(null),
    address: new FormGroup({
      city: new FormControl<string>(''),
      street: new FormControl<string>(''),
      building: new FormControl<number | null>(null),
      apartment: new FormControl<number | null>(null),
    })
  })

  initialValues = {
    type: receiverType.PERSON,
    name: '',
    lastName: '',
    inn: '',
    organization: '',
    description: '',
    telephone: null,
    address: {
      city: '',
      street: '',
      building: null,
      apartment: null
    }
  }

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.form.controls.name.clearValidators()
        this.form.controls.inn.clearValidators()
        this.form.controls.telephone.clearValidators()

        if (value === receiverType.LEGAL) {
          this.form.controls.inn.setValidators([Validators.required, Validators.minLength(10)]);
          this.form.controls.telephone.setValidators([Validators.required, Validators.minLength(10)])
        }

        if ( value === receiverType.PERSON ) {
          this.form.controls.name.setValidators(Validators.required);
          this.form.controls.telephone.setValidators([Validators.required, Validators.minLength(10)])
        }
      })


  }

  onSubmit(event: Event) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    console.log(this.form.valid)
    console.log(this.form.value)
    this.form.reset(this.initialValues)
  }
}
