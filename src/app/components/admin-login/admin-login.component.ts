import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  imports:[FormsModule,CommonModule]
})
export class AdminLoginComponent implements AfterViewInit {
  adminEmail: string = '';
  adminPassword: string = '';

  @ViewChild('adminEmailInput') emailInputRef!: ElementRef;

  ngAfterViewInit() {
    this.emailInputRef.nativeElement.focus();
  }

  adminLogin() {
    console.log("Admin Login:", {
      email: this.adminEmail,
      password: this.adminPassword
    });
    alert("Admin login successful!");
  }
}
