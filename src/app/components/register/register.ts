import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements AfterViewInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  @ViewChild('firstNameInput') firstNameField!: ElementRef;

  ngAfterViewInit() {
    this.firstNameField.nativeElement.focus();
  }
  onSubmit() {
    console.log('Form Submitted:', this.user);
  }
}
