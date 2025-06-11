import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-reg',
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './admin-reg.component.html',
  styleUrl: './admin-reg.component.css',
  standalone: true,
})
export class AdminRegComponent implements AfterViewInit {
  @ViewChild('emailInput') emailInputRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit(): void {
    this.emailInputRef.nativeElement.focus();
  }

  admin = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

  registerAdmin() {
    const apiUrl = 'http://localhost:5092/api/admin/admin-register';

    this.http.post(apiUrl, this.admin).subscribe({
      next: (res: any) => {
        this.alertMessage = 'Admin registered successfully!';
        this.alertType = 'success';
        this.triggerAlert();

        setTimeout(() => {
          this.router.navigate(['/admin-login']);
        }, 3000);
      },
      error: (err) => {
        // Try to get a meaningful error message from the response
        if (err.error && typeof err.error === 'string') {
          this.alertMessage = err.error;
        } else if (err.error && err.error.message) {
          this.alertMessage = err.error.message;
        } else {
          this.alertMessage = 'Registration failed.';
        }

        this.alertType = 'error';
        this.triggerAlert();
      },
    });
  }

  triggerAlert() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
