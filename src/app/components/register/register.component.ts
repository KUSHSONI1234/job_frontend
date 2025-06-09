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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterLink],
})
export class RegisterComponent implements AfterViewInit {
  formData = {
    fullname: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    skills: '',
    resume: null,
  };

  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;

  @ViewChild('fullnameInput') fullnameInputRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit(): void {
    this.fullnameInputRef.nativeElement.focus();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.formData.resume = file;
  }

  showTemporaryAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  onSubmit() {
    const form = new FormData();
    form.append('FullName', this.formData.fullname);
    form.append('Email', this.formData.email);
    form.append('Password', this.formData.password);
    form.append('Phone', this.formData.phone);
    form.append('Bio', this.formData.bio);
    form.append('Skills', this.formData.skills);
    if (this.formData.resume) {
      form.append('Resume', this.formData.resume);
    }

    this.http.post('http://localhost:5092/api/User/register', form).subscribe({
      next: (res: any) => {
        console.log('Success:', res);
        this.showTemporaryAlert(
          res?.message || 'Registration successful!',
          'success'
        );

        setTimeout(() => {
          this.router.navigateByUrl('/login');
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
