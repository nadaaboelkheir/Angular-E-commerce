import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  standalone: true,
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        username: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        adresses: this.fb.array([]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }
  get adresses(): FormArray {
    return this.registerForm.get('adresses') as FormArray;
  }
  addAdress() {
    const AdressForm = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
    });

    this.adresses.push(AdressForm);
  }
  trackByFn(index: number): number {
    return index;
  }

  deleteAdress(AddressIndex: number) {
    this.adresses.removeAt(AddressIndex);
  }

  // Custom password match validator
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  Submit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log('Form Data:', this.registerForm.value);
    this.router.navigate(['/']);
  }
}
