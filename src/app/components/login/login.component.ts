import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink],
})
export class LoginComponent implements AfterViewInit {
  loginData = {
    email: '',
    password: '',
  };

  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;

  @ViewChild('emailInput') emailInputRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit(): void {
    this.emailInputRef.nativeElement.focus();
  }

  showTemporaryAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;

    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  onLogin() {
    this.http
      .post('http://localhost:5092/api/User/login', this.loginData)
      .subscribe({
        next: (res: any) => {
          console.log('Login Success:', res);

          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          localStorage.setItem('userId', res.user.id);


          this.showTemporaryAlert(
            res?.message || 'Login successful!',
            'success'
          );

          // ✅ Navigate after 3 seconds
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 3000);
        },

        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Blob && err.error.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = () => {
              const errorMessage =
                reader.result?.toString() || 'Something went wrong!';
              console.error('Server Error:', errorMessage);
              this.showTemporaryAlert(errorMessage, 'error');
            };
            reader.readAsText(err.error);
          } else {
            const errorMessage =
              typeof err.error === 'string'
                ? err.error
                : err.error?.message || 'Something went wrong!';
            console.error('Server Error:', errorMessage);
            this.showTemporaryAlert(errorMessage, 'error');
          }
        },
      });
  }
}
