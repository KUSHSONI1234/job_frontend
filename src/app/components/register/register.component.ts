import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  user = {
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    password: '',
    skills: '',
    resume: null as File | null,
  };

  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';
  showAlert: boolean = false;

  @ViewChild('fullNameInput') fullNameInputRef!: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.fullNameInputRef.nativeElement.focus();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.user.resume = file;
    console.log('📄 Resume Selected:', file);
  }

  showAlertMessage(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  onSubmit() {
    // Manual validation (frontend)
    if (
      !this.user.fullName.trim() ||
      !this.user.email.trim() ||
      !this.user.phone.trim() ||
      !this.user.bio.trim() ||
      !this.user.password.trim() ||
      !this.user.skills.trim() ||
      !this.user.resume
    ) {
      this.showAlertMessage('Please fill out all required fields.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('FullName', this.user.fullName);
    formData.append('Email', this.user.email);
    formData.append('Phone', this.user.phone);
    formData.append('Bio', this.user.bio);
    formData.append('Password', this.user.password);
    formData.append('Skills', this.user.skills);
    formData.append('Resume', this.user.resume);

    this.http
      .post('http://localhost:5279/api/user/register', formData)
      .subscribe({
        next: (res: any) => {
          console.log('Registered:', res);
          this.showAlertMessage(
            res.message || 'Registered Successfully!',
            'success'
          );
          this.resetBtn();
        },
        error: (err) => {
          console.error('Error:', err);
          let message = 'Something went wrong.';

          if (typeof err.error === 'string') {
            message = err.error;
          } else if (err.error?.message) {
            message = err.error.message;
          } else if (err.error?.errors) {
            const keys = Object.keys(err.error.errors);
            message = err.error.errors[keys[0]][0];
          }

          this.showAlertMessage(message, 'error');
        },
      });
  }

  resetBtn() {
    this.user = {
      fullName: '',
      email: '',
      phone: '',
      bio: '',
      password: '',
      skills: '',
      resume: null,
    };
  }
}
