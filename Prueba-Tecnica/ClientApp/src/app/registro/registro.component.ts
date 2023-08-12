import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CustomValidators } from './Validators/Validators'


type ErrorMessageType = 'required' | 'invalidNameLength' | 'invalidNameFormat' | 'invalidFormat' | 'invalidLength' | 'minor';

const ErrorMessages: Record<ErrorMessageType, string> = {
  required: "Este campo es requerido.",
  invalidNameLength: "El nombre debe tener entre 3 y 20 caracteres.",
  invalidNameFormat: "Formato del nombre no es válido.",
  invalidFormat: "Formato inválido. Solo se permiten números.",
  invalidLength: "El número debe ser de 8 dígitos.",
  minor: "Tiene que ser mayor de edad."
};


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm = this.fb.group({
    name: ['', [Validators.required, CustomValidators.nameValidator]],
    document: ['', [Validators.required, CustomValidators.documentValidator]],
    birthDate: ['', [Validators.required, CustomValidators.adultValidator]],
    country: ['', Validators.required]
  });

  countries: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
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

    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0] as ErrorMessageType;
      return ErrorMessages[firstErrorKey] || '';
    }

    return '';
  }

}

