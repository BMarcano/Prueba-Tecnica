import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  static nameValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    if (value.length < 3 || value.length > 20) {
      return { 'invalidNameLength': true };
    }

    if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(value)) {
      return { 'invalidNameFormat': true };
    }

    return null;
  }

  static documentValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    if (!/^[0-9]*$/.test(value)) {
      return { 'invalidFormat': true };
    }

    if (value.length !== 8) {
      return { 'invalidLength': true };
    }

    return null;
  }

  static adultValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const birthDate = new Date(control.value);
    const currentDate = new Date();
    const age = CustomValidators.calculateAge(birthDate, currentDate);

    if (age < 18) {
      return { 'minor': true };
    }
    return null;
  }

  private static calculateAge(birthDate: Date, currentDate: Date): number {
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const m = currentDate.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

}
