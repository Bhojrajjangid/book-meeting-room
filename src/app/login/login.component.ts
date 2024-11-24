import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username === 'ADMIN' && password === 'Password123') {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/book-room']);
      } else {
        alert('Invalid Username or Password');
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
