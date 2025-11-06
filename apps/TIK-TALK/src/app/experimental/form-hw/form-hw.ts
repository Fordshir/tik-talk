import {Component, inject} from "@angular/core";
import {FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators,} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Address, Feature, MockService} from "./mock.service";
import {KeyValuePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SvgIconComponent} from '../../../../../../libs/common-ui/src';

enum receiverType {
  PERSON = "PERSON",
  LEGAL = "LEGAL",
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ""),
    street: new FormControl<string>(initialValue.street ?? ""),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

@Component({
  selector: "tt-form-hw",
  imports: [ReactiveFormsModule, KeyValuePipe, RouterLink, SvgIconComponent],
  templateUrl: "./form-hw.html",
  styleUrl: "./form-hw.scss",
})

export class FormHw {
  receiverType = receiverType;

  mockService = inject(MockService);

  features: Feature[] = [];

  form = new FormGroup({
    type: new FormControl<receiverType>(receiverType.PERSON),
    name: new FormControl<string>("", Validators.required),
    lastName: new FormControl<string>(""),
    inn: new FormControl<string>(""),
    organization: new FormControl<string>(""),
    description: new FormControl<string>(""),
    telephone: new FormControl<number | null>(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    addresses: new FormArray([getAddressForm()]),
    features: new FormRecord({}),
  });

  initialValues = {
    type: receiverType.PERSON,
    name: "",
    lastName: "",
    inn: "",
    organization: "",
    description: "",
    telephone: null,
    address: {
      city: "",
      street: "",
      building: null,
      apartment: null,
    },
  };

  constructor() {
    this.mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addrs) => {
        this.form.controls.addresses.clear();
        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr));
        }
        this.form.controls.addresses.disable();
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.features.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.form.controls.name.setValidators(Validators.required);
        this.form.controls.inn.clearValidators();

        if (value === receiverType.LEGAL) {
          this.form.controls.name.clearValidators();
          this.form.controls.name.updateValueAndValidity();
          this.form.controls.inn.setValidators(Validators.required);
        }
      });
  }

  onSubmit(event: Event) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log(this.form.valid);
    console.log(this.form.value);
    this.form.reset(this.initialValues);
  }

  addAddress() {
    this.form.controls.addresses.insert(0, getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;
}
