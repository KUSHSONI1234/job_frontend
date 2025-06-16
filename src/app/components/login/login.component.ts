import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  @ViewChild('emailInput') emailInputRef!: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.emailInputRef.nativeElement.focus();
  }

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:5089/api/user/login', loginData)
      .subscribe({
        next: (response: any) => {
          console.log('Login successful!', response);
          alert('Login successful!');
          // Optionally store token:
          // localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed: ' + (error.error || 'Invalid credentials.'));
        }
      });
  }
}
