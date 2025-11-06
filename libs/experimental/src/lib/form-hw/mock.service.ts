import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";

export interface Address {
  city?: string;
  street?: string;
  building?: number;
  apartment?: number;
}

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({
  providedIn: "root",
})
export class MockService {
  getAddresses() {
    return of([
      {
        city: "Красноярск",
        street: "Копылова",
        building: 21,
        apartment: 230,
      },
      {
        city: "Ростов",
        street: "Мира",
        building: 1,
        apartment: 15,
      },
      {
        city: "Зеленогорск",
        street: "Парковая",
        building: 64,
        apartment: 64,
      },
    ]);
  }

  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: "save",
        label: "Сохранить данные",
        value: true,
      },
      {
        code: "clean",
        label: "Нужна чистка",
        value: true,
      },
      {
        code: "on-place",
        label: "Только на месте",
        value: false,
      },
    ]);
  }
}
