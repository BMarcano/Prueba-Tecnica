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

  it('Given the registerForm control name with an empty value, it should display "Este campo es requerido."', () => {
    const name = component.registerForm.controls['name'];
    name.setValue("");
    expect(component.getErrorMessage('name')).toBe('Este campo es requerido.');
  });

  it('Given the registerForm control name with a value "J@hn", it should display "Formato del nombre no es válido."', () => {
    const name = component.registerForm.controls['name'];
    name.setValue("J@hn");
    expect(component.getErrorMessage('name')).toBe('Formato del nombre no es válido.');
  });


  it('Given the registerForm control name, when no value is set, it should be invalid.', () => {
    const name = component.registerForm.controls['name'];
    expect(name.valid).toBeFalsy();
  });

  it('Given the registerForm control name, when set to "John", it should be valid.', () => {
    const name = component.registerForm.controls['name'];
    name.setValue("John");
    expect(name.valid).toBeTruthy();
  });

  it('Given the registerForm control document with value "a", it should display "Formato inválido. Solo se permiten números."', () => {
    const document = component.registerForm.controls['document'];
    document.setValue("a");
    expect(component.getErrorMessage('document')).toBe('Formato inválido. Solo se permiten números.');
  });

  it('Given the registerForm control document with value "1234567", it should display "El número debe ser de 8 dígitos."', () => {
    const document = component.registerForm.controls['document'];
    document.setValue("1234567");
    expect(component.getErrorMessage('document')).toBe('El número debe ser de 8 dígitos.');
  });


  it('Given the registerForm control document, when no value is set, it should be invalid.', () => {
    const document = component.registerForm.controls['document'];
    expect(document.valid).toBeFalsy();
  });

  it('Given the registerForm control document, when set to "12345678", it should be valid.', () => {
    const document = component.registerForm.controls['document'];

    document.setValue("12345678");
    expect(document.valid).toBeTruthy();
  });

  it('Given the registerForm control birthDate with no value and marked as touched, it should display "Este campo es requerido."', () => {
    const birthDate = component.registerForm.controls['birthDate'];
    birthDate.setValue('');
    birthDate.markAsTouched();
    expect(component.getErrorMessage('birthDate')).toBe('Este campo es requerido.');
  });

  it('Given the registerForm control birthDate with underage year and marked as touched, it should display "Tiene que ser mayor de edad."', () => {
    const birthDate = component.registerForm.controls['birthDate'];
    const currentDate = new Date();
    const underageYear = currentDate.getFullYear() - 17;
    birthDate.setValue(`${underageYear}-01-01`);
    birthDate.markAsTouched();
    expect(component.getErrorMessage('birthDate')).toBe('Tiene que ser mayor de edad.');
  });

  it('Given the registerForm control birthDate, when no value is set, it should be invalid.', () => {
    const birthDate = component.registerForm.controls['birthDate'];
    expect(birthDate.valid).toBeFalsy();
  });

  it('Given the registerForm control birthDate with adult year, it should be valid.', () => {
    const birthDate = component.registerForm.controls['birthDate'];
    const adultYear = (new Date()).getFullYear() - 18;
    birthDate.setValue(`${adultYear}-01-01`);
    expect(birthDate.valid).toBeTruthy();
  });

  it('Given the registerForm control country with no value, it should display "Este campo es requerido."', () => {
    const country = component.registerForm.controls['country'];
    country.setValue('');
    expect(component.getErrorMessage('country')).toBe('Este campo es requerido.');
  });

  it('Given the registerForm control country, when no value is set, it should be invalid.', () => {
    const country = component.registerForm.controls['country'];
    expect(country.valid).toBeFalsy();
  });

  it('Given the registerForm control country, when set to "Venezuela", it should be valid.', () => {
    const country = component.registerForm.controls['country'];
    country.setValue('Venezuela');
    expect(country.valid).toBeTruthy();
  });
});
