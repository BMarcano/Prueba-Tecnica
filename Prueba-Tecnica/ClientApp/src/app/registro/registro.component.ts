import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm = this.fb.group({
    name: ['', [Validators.required, nameValidator]],
    document: ['', [Validators.required, documentValidator]],
    birthDate: ['', [Validators.required, adultValidator]],
    country: ['', Validators.required]
  });

  countries: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  isNombreInvalid(): boolean {
    return this.isControlInvalid('name');
  }

  isDocumentoInvalid(): boolean {
    return this.isControlInvalid('document');
  }

  isFechaNacimientoInvalid(): boolean {
    return this.isControlInvalid('birthDate');
  }

  isPaisInvalid(): boolean {
    return this.isControlInvalid('country');
  }


  ngOnInit(): void {
    this.loadData();
  }

  onBlur(controlName: string): void {
    const control = this.registerForm.get(controlName);
    if (control) {
      control.markAsTouched();
    }
  }


  loadData() {
    this.apiService.getData().subscribe(data => {
      this.countries = data;
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      alert('Usuario registrado con éxito!');
    }
    else {
      alert('Por favor, corrige los errores en el formulario.');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es requerido.';
    }
    if (control?.hasError('invalidNameLength')) {
      return 'El nombre debe tener entre 3 y 20 caracteres.';
    }
    if (control?.hasError('invalidNameFormat')) {
      return 'Formato del nombre no es válido.';
    }
    if (control?.hasError('invalidFormat')) {
      return 'Formato inválido. Solo se permiten números.';
    }
    if (control?.hasError('invalidLength')) {
      return 'El número debe ser de 8 dígitos.';
    }
    if (control?.hasError('minor')) {
      return 'Tiene que ser mayor de edad.';
    }

    return '';
  }
}

function nameValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value;

  if (value.length < 3 || value.length > 20) {
    return { 'invalidNameLength': true };
  }

  if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(value)) {
    return { 'invalidNameFormat': true };
  }

  return null;
}

function documentValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value;

  if (!/^[0-9]*$/.test(value)) {
    return { 'invalidFormat': true };
  }

  if (value.length !== 8) {
    return { 'invalidLength': true };
  }

  return null;
}

function calculateAge(birthDate: Date, currentDate: Date): number {
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function adultValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const birthDate = new Date(control.value);
  const currentDate = new Date();
  const age = calculateAge(birthDate, currentDate);

  if (age < 18) {
    return { 'minor': true };
  }
  return null;
}
