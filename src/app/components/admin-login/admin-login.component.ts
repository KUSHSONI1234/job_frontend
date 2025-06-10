import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule,CommonModule,NavbarComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
    loginData = {
    email: '',
    password: ''
  };

  showAlert = false;
  alertMessage = '';
  alertType = '';

  constructor(private router: Router) {}
}
