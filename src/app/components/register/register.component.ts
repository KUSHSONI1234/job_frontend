import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HttpClientModule,
    NavbarComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('firstNameInput') firstNameElement!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    this.firstNameElement.nativeElement.focus();
  }

  alertMessage: string | null = null;
  alertType: 'success' | 'danger' = 'success';

  showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = null;
    }, 3000); // Hide alert after 3 seconds
  }

  showPassword: boolean = false;

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (
      this.user.firstName &&
      this.user.lastName &&
      this.user.email &&
      this.user.password
    ) {
      this.http
        .post('http://localhost:5045/api/User/register', this.user)
        .subscribe({
          next: (res) => {
            console.log('User registered:', res);
            this.showAlert('Registration successful!', 'success');
            this.resetForm();
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 1000);
          },
          error: (err) => {
            console.error('Registration failed:', err);
            this.showAlert('Registration failed. Try again.', 'danger');
          },
        });
    } else {
      this.showAlert('Please fill in all required fields.', 'danger');
    }
  }

  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }
}
