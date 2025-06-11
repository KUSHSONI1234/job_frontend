import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit, AfterViewInit {
  @ViewChild('emailInput') emailInputRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  // Auto-redirect if already logged in
  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (token) {
      this.router.navigate(['/admin-dashboard']);
    }
  } 

  // Focus on email input when view is initialized
  ngAfterViewInit(): void {
    this.emailInputRef.nativeElement.focus();
  }

  loginData = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMessage = '';
  alertType = ''; // 'success' or 'danger'

  // Login API call
  onLogin() {
    this.http.post<any>('http://localhost:5092/api/admin/admin-login', this.loginData).subscribe({
      next: (response) => {
        localStorage.setItem('adminToken', response.token);

        this.alertType = 'success';
        this.alertMessage = 'Login successful!';
        this.triggerAlert();

        setTimeout(() => {
          this.router.navigate(['/admin-dashboard']);
        }, 3000);
      },
      error: (err) => {
        // Clean error extraction
        if (err.error && typeof err.error === 'string') {
          this.alertMessage = err.error;
        } else if (err.error && err.error.message) {
          this.alertMessage = err.error.message;
        } else {
          this.alertMessage = 'Invalid email or password!';
        }

        this.alertType = 'danger';
        this.triggerAlert();
      },
    });
  }

  // Alert popup for 3 seconds
  triggerAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
