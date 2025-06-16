import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
})
export class RegisterComponent implements AfterViewInit {
  // Form fields
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  // Alert UI
  alertMessage = '';
  alertType: 'success' | 'error' | '' = '';

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

  private isFormValid(): boolean {
    return this.firstName.trim() !== '' &&
           this.lastName.trim() !== '' &&
           this.email.trim() !== '' &&
           this.password.trim() !== '';
  }

  private extractBackendError(error: any): string {
    if (error?.error && typeof error.error === 'string') {
      return error.error;
    }
    if (error?.error?.message) {
      return error.error.message;
    }
    return 'Server error occurred.';
  }

  register() {
    if (!this.isFormValid()) {
      this.showAlert('Please fill in all fields.', 'error');
      return;
    }

    const userData = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      password: this.password,
    };

    this.http.post('http://localhost:5089/api/user/register', userData).subscribe({
      next: () => {
        this.showAlert('Registration successful!', 'success');
        setTimeout(() => this.router.navigateByUrl('/login'), 3000);
      },
      error: (err) => {
        const backendError = this.extractBackendError(err);
        console.error('Registration failed:', backendError);
        this.showAlert(backendError, 'error');
      },
    });
  }
}
