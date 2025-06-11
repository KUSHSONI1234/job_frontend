import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
export class AdminLoginComponent implements AfterViewInit {
  @ViewChild('emailInput') emailInputRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

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

  onLogin() {
    this.http.post<any>('http://localhost:5092/api/admin/admin-login', this.loginData)
      .subscribe({
        next: (response) => {
          localStorage.setItem('adminToken', response.token);

          this.alertType = 'success';
          this.alertMessage = 'Login successful!';
          this.triggerAlert();

          setTimeout(() => {
            this.router.navigate(['/admin-dashboard']);
          }, 1000);
        },
        error: (err) => {
          // Extract error message properly from server
          if (err.error && typeof err.error === 'string') {
            this.alertMessage = err.error;
          } else if (err.error && err.error.message) {
            this.alertMessage = err.error.message;
          } else {
            this.alertMessage = 'Invalid email or password!';
          }

          this.alertType = 'danger';
          this.triggerAlert();
        }
      });
  }

  triggerAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // hide after 3 seconds
  }
}
