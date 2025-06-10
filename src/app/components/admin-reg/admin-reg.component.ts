import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reg',
  imports: [NavbarComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-reg.component.html',
  styleUrl: './admin-reg.component.css',
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

  registerAdmin() {
    console.log('Admin Data:', this.admin);
    // Send HTTP POST to backend API
  }
}
