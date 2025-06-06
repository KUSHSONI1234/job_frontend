import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    password: '',
    skills: '',
    resume: null as File | null,
  };

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.user.resume = file;
    console.log("Resume selected:", file);
  }

  onSubmit() {
    console.log("Form Data:", this.user);
  }
}
