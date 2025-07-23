import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin implements AfterViewInit {
  admin = {
    email: '',
    password: '',
  };

  successMessage: string = '';
  errorMessage: string = '';

  @ViewChild('firstNameInput') firstNameField!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    this.firstNameField.nativeElement.focus();
  }

  onLogin() {
    console.log('Admin Login Data:', this.admin);

    if (this.admin.email && this.admin.password) {
      this.http
        .post('http://localhost:5097/api/Admin/admin-login', this.admin)
        .subscribe({
          next: (response: any) => {
            console.log('Login successful:', response);
            this.successMessage = response.message || 'Login successful!';
            this.errorMessage = '';

             if (response.token) {
              localStorage.setItem('adminToken', response.token);
            }

            this.autoClearMessages();

            // Redirect to Admin Dashboard or wherever
            setTimeout(() => {
              this.router.navigateByUrl('/admin-dashboard');
            }, 2000);
          },
          error: (error) => {
            console.error('Login failed:', error);
            this.errorMessage =
              error.error?.message || 'Login failed. Please try again.';
            this.successMessage = '';
            this.autoClearMessages();
          },
        });
    } else {
      this.errorMessage = 'Please enter email and password.';
      this.successMessage = '';
      this.autoClearMessages();
    }
  }

  autoClearMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
