import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  user = {
    email: '',
    password: '',
  };

  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';
  showAlert: boolean = false;

  @ViewChild('fullNameInput') fullNameInputRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    this.fullNameInputRef.nativeElement.focus();
  }

  showAlertMessage(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  onSubmit() {
    if (!this.user.email.trim() || !this.user.password.trim()) {
      this.showAlertMessage('Please enter email and password.', 'error');
      return;
    }

    this.http.post<any>('http://localhost:5279/api/user/login', this.user).subscribe({
      next: (res) => {
        console.log('Login Success:', res);
        localStorage.setItem('token', res.token);
        this.showAlertMessage('Login Successful!', 'success');
        this.router.navigate(['/dashboard']); // Change if needed
      },
      error: (err) => {
        console.error('Login Failed:', err);
        let message = 'Login failed.';
        if (err?.error) {
          message = typeof err.error === 'string' ? err.error : 'Invalid credentials.';
        }
        this.showAlertMessage(message, 'error');
      }
    });
  }
}
