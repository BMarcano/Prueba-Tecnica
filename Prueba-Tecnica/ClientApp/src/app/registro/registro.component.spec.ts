import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { of } from 'rxjs';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: spy }
      ]
    })
      .compileComponents();
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    apiService.getData.and.returnValue(of([])); 
    fixture.detectChanges();
  });

  it('name field error message', () => {
    const name = component.registerForm.controls['name'];
    name.setValue("");
    expect(component.getErrorMessage('name')).toBe('Este campo es requerido.');

    name.setValue("J@hn");
    expect(component.getErrorMessage('name')).toBe('Formato del nombre no es válido.');
  });

  it('name field validity', () => {
    const name = component.registerForm.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue("John");
    expect(name.valid).toBeTruthy();
  });

  it('document field error message', () => {
    const document = component.registerForm.controls['document'];
    document.setValue("a");
    expect(component.getErrorMessage('document')).toBe('Formato inválido. Solo se permiten números.');

    document.setValue("1234567")
    expect(component.getErrorMessage('document')).toBe('El número debe ser de 8 dígitos.');

  });

  it('document field validity', () => {
    const document = component.registerForm.controls['document'];
    expect(document.valid).toBeFalsy();

    document.setValue("12345678");
    expect(document.valid).toBeTruthy();
  });

  it('birthDate field error message', () => {
    const birthDate = component.registerForm.controls['birthDate'];

    birthDate.setValue('');
    birthDate.markAsTouched();
    expect(component.getErrorMessage('birthDate')).toBe('Este campo es requerido.');

    const currentDate = new Date();
    const underageYear = currentDate.getFullYear() - 17;
    birthDate.setValue(`${underageYear}-01-01`);
    birthDate.markAsTouched();
    expect(component.getErrorMessage('birthDate')).toBe('Tiene que ser mayor de edad.');
  });

  it('birthDate field validity', () => {
    const birthDate = component.registerForm.controls['birthDate'];
    expect(birthDate.valid).toBeFalsy();

    const adultYear = (new Date()).getFullYear() - 18; 
    birthDate.setValue(`${adultYear}-01-01`);
    expect(birthDate.valid).toBeTruthy();
  });

  it('country field error message', () => {
    const country = component.registerForm.controls['country'];

    country.setValue('');
    expect(component.getErrorMessage('country')).toBe('Este campo es requerido.');
  });

  it('country field validity', () => {
    const country = component.registerForm.controls['country'];
    expect(country.valid).toBeFalsy();

    country.setValue('Venezuela');
    expect(country.valid).toBeTruthy();
  });
});
