import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true,
})
export class RegisterComponent implements AfterViewInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  @ViewChild('emailInput') emailInputRef!: ElementRef;

  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.emailInputRef.nativeElement.focus();
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 3000); // 3 seconds
  }

  register() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:5089/api/user/register', userData).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        this.showAlert('Registration successful!', 'success');
      },
      error: (err) => {
        const backendError = err?.error ?? 'Server error occurred.';
        console.error('Registration failed:', backendError);
        this.showAlert(backendError, 'error');
      },
    });
  }
}
