import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
})
export class LoginComponent implements AfterViewInit {
  email = '';
  password = '';

  alertMessage = '';
  alertType: 'success' | 'error' | '' = '';

  fullName: string = ''; // 💡 holds user full name

  @ViewChild('emailInput') emailInputRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    this.emailInputRef.nativeElement.focus();
  }

  private showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 3000);
  }

  private extractBackendError(error: any): string {
    if (error?.error && typeof error.error === 'string') {
      return error.error;
    }
    if (error?.error?.message) {
      return error.error.message;
    }
    return 'Invalid credentials.';
  }

  login() {
    if (!this.email.trim() || !this.password.trim()) {
      this.showAlert('Please fill in both email and password.', 'error');
      return;
    }

    const loginData = {
      email: this.email.trim(),
      password: this.password,
    };

    this.http.post('http://localhost:5089/api/user/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful!', response);
        localStorage.setItem('token', response.token);
        this.showAlert('Login successful!', 'success');

        // 🔄 Get user info after login
        this.getUserInfo();

        setTimeout(() => this.router.navigateByUrl('/home'), 3000);
      },
      error: (error) => {
        const backendError = this.extractBackendError(error);
        console.error('Login failed:', backendError);
        this.showAlert(backendError, 'error');
      },
    });
  }

  // 🔽 New Method: Fetch full name using token
  getUserInfo() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:5089/api/user/me', { headers }).subscribe({
      next: (res: any) => {
        this.fullName = res.fullName;
        console.log('Full Name:', this.fullName);
        // Optionally display it in UI or store in service/localStorage
      },
      error: (err) => {
        console.error('Failed to fetch user info:', err);
      },
    });
  }
}
