import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterLink],
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  @ViewChild('emailInput') emailInputRef!: ElementRef;

  ngAfterViewInit() {
    this.emailInputRef.nativeElement.focus();
  }
  login() {
    console.log('Login form submitted:', {
      email: this.email,
      password: this.password,
    });
    alert('Login successful!');
  }
}
