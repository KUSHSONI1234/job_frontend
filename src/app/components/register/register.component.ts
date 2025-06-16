import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule, RouterLink],
})
export class RegisterComponent implements AfterViewInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  @ViewChild('emailInput') emailInputRef!: ElementRef;

  ngAfterViewInit() {
    this.emailInputRef.nativeElement.focus();
  }

  register() {
    console.log('Form submitted:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
    alert('Registration successful!');
  }
}
