import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule, NavbarComponent, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements AfterViewInit {
  @ViewChild('emailInput') emailInputRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit(): void {
    this.emailInputRef.nativeElement.focus();
  }
  loginData = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMessage = '';
  alertType = '';

}
