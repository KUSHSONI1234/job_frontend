import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css',
})
export class AdminRegisterComponent implements AfterViewInit {
  @ViewChild('firstNameInput') firstNameElement!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    this.firstNameElement.nativeElement.focus();
  }

  showPassword: boolean = false;

  recruiter = {
    email: '',
    password: '',
  };

  alertMessage: string = '';
  alertType: 'success' | 'danger' | '' = '';
  showAlertBox: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.recruiter.email || !this.recruiter.password) {
      this.showAlert('Email and password are required.', 'danger');
      return;
    }

    this.http
      .post('http://localhost:5186/api/recruiter/register', this.recruiter)
      .subscribe({
        next: (res: any) => {
          this.showAlert('Admin registered successfully!', 'success');
          setTimeout(() => {
            this.router.navigateByUrl('/admin-login');
          }, 1500);
        },
        error: (err) => {
          const msg =
            err.error?.message || 'Registration failed. Please try again.';
          this.showAlert(msg, 'danger');
        },
      });
  }

  showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlertBox = true;
    setTimeout(() => {
      this.showAlertBox = false;
    }, 4000);
  }
}
