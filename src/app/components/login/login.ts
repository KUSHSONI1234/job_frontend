import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {
  user = {
    email: '',
    password: '',
  };

  @ViewChild('firstNameInput') firstNameField!: ElementRef;

  ngAfterViewInit() {
    this.firstNameField.nativeElement.focus();
  }

  onLogin() {
    console.log('Login Data:', this.user);
  }
}
