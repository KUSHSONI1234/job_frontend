import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    NavbarComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('emailInput') firstNameElement!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  showPassword: boolean = false;

  loginData = {
    email: '',
    password: '',
  };

  alertMessage = '';
  alertType: 'success' | 'danger' | '' = '';
  showAlertBox: boolean = false;

  ngAfterViewInit() {
    this.firstNameElement.nativeElement.focus();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.showAlert('Please fill in all required fields.', 'danger');
      return;
    }

    this.http
      .post('http://localhost:5186/api/User/login', this.loginData)
      .subscribe({
        next: (res: any) => {
          this.showAlert('Login successful!', 'success');
          if (res.token) localStorage.setItem('token', res.token);
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 1000);
        },
        error: (err) => {
          const msg =
            err.error?.message ||
            'Login failed. Invalid credentials or server error.';
          this.showAlert(msg, 'danger');
        },
      });
  }

  showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlertBox = true;
    setTimeout(() => {
      this.showAlertBox = false;
    }, 4000);
  }
}
