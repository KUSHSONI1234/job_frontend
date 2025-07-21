import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements AfterViewInit {
  user = {
    firstName: '',
    lastName: '',
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

  onSubmit() {
    console.log('Submitting:', this.user);

    if (
      this.user.firstName &&
      this.user.lastName &&
      this.user.email &&
      this.user.password
    ) {
      this.http
        .post('http://localhost:5097/api/User/register', this.user)
        .subscribe({
          next: (response: any) => {
            console.log('Registration successful:', response);
            this.successMessage =
              response.message || 'Registration successful!';
            this.errorMessage = '';
            this.autoClearMessages();
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 1500);
          },
          //server backend error
          error: (error) => {
            console.error('Registration failed:', error);
            this.errorMessage =
              error.error?.message || 'Registration failed. Please try again.';
            this.successMessage = '';
            this.autoClearMessages();
          },
        });
    } else {
      this.errorMessage = 'Please fill in all the required fields.';
      this.successMessage = '';
      this.autoClearMessages();
    }
  }

  autoClearMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000); // 3 seconds
  }
}
