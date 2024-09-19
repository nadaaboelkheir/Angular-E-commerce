import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };
  constructor(private router: Router) {}

  formSubmitted = false;

  onSubmit(form: any) {
    this.formSubmitted = true;

    if (form.valid) {
      console.log('Form submitted successfully:', this.user);
      this.router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
}
