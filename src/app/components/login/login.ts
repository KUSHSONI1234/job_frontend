import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  user = {
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
    console.log('Login Data:', this.user);

    if (this.user.email && this.user.password) {
      this.http
        .post('http://localhost:5097/api/User/login', this.user)
        .subscribe({
          next: (response: any) => {
            console.log('Login successful:', response);
            this.successMessage = response.message || 'Login successful!';
            this.errorMessage = '';

            if (response.token) {
              localStorage.setItem('authToken', response.token);
            }

            this.autoClearMessages();
            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 1500);
            
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
      this.errorMessage = 'Please fill in both email and password.';
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
