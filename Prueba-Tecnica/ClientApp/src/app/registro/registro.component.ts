import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$')]],
    documento: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    fechaNacimiento: ['', [Validators.required, mayorDeEdadValidator]],
    pais: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  onSubmit() {
    if (this.registroForm.valid) {
      alert('Usuario registrado con éxito!');
    }
    else {
      alert('Por favor, corrige los errores en el formulario.');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.registroForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido.';
    } else if (control?.hasError('minlength')) {
      return 'El nombre es demasiado corto.';
    } else if (control?.hasError('maxlength')) {
      return 'El nombre es demasiado largo.';
    } else if (control?.hasError('pattern')) {
      return 'El formato es incorrecto.';
    } else if (control?.hasError('menorDeEdad')) {
      return 'Tiene que ser mayor de edad.';
    }
    return '';
  }
}

function mayorDeEdadValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const fechaNacimiento = new Date(control.value);
  const fechaActual = new Date();
  const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  if (edad < 18) {
    return { 'menorDeEdad': true };
  }
  return null;
}
