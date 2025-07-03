import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements AfterViewInit {
  @ViewChild('firstNameInput') firstNameElement!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    this.firstNameElement.nativeElement.focus();
  }

  showPassword: boolean = false;

  recruiter = {
    email: '',
    password: '',
  };

  alertMessage: string = '';
  alertType: 'success' | 'danger' | '' = '';
  showAlertBox: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.recruiter.email || !this.recruiter.password) {
      this.showAlert('Email and password are required.', 'danger');
      return;
    }

    this.http.post('http://localhost:5186/api/recruiter/login', this.recruiter).subscribe({
      next: (res: any) => {
        this.showAlert('Admin login successful!', 'success');

        // ✅ Store token if returned
        if (res.token) {
          localStorage.setItem('admin-token', res.token);
        }

        setTimeout(() => {
          this.router.navigateByUrl('/admin-dashboard');
        }, 1500);
      },
      error: (err) => {
        const msg = err.error?.message || 'Login failed. Please try again.';
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
