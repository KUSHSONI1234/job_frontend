import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-admin-register',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent implements AfterViewInit {

  @ViewChild('firstNameInput') firstNameElement!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.firstNameElement.nativeElement.focus();
  }
    showPassword: boolean = false;

  recruiter = {
    email: '',
    password: '',
  };

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    console.log('Recruiter Login Data:', this.recruiter);
  }
}
