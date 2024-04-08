import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from '../service/auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    role: ['', Validators.required]
  }, {
    validator: this.checkPasswords
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {}

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true } 
  }

  onlyLetters(event: KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
      return true;
    else
      return false;
  }

  validateEmail(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9@._-]+$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // Carácter inválido, previene la entrada
      event.preventDefault();
    }
  }

  validatePassword(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // Carácter inválido, previene la entrada
      event.preventDefault();
    }
  }

  onSubmit(): void {
    console.log('onSubmit fue llamado');
    if (this.registerForm.valid) {
      console.log('El formulario es válido');
      const { firstName, lastName, email, password, role } = this.registerForm.value;
      console.log('Valores del formulario:', {firstName, lastName, email, password, role});
      this.authService.register({firstName, lastName, email, password, role}).subscribe({
        next: response => {
          // Maneja la respuesta de registro exitoso aquí
          console.log('Registro exitoso:', response);
          alert('Registro exitoso!');
          this.registerForm.reset();
        },
        error: error => {
          // Maneja el error de registro aquí
          console.log('Error en el registro:', error);
          alert('Error en el registro: ' + error.message);
        }
      });
    }
  }
}