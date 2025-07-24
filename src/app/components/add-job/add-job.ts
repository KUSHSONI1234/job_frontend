import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-job.html',
  styleUrl: './add-job.css',
})
export class AddJob implements AfterViewInit {
  job = {
    title: '',
    description: '',
    category: '',
    location: '',
    level: '',
    salary: null,
  };

    @ViewChild('firstNameInput') firstNameField!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    this.firstNameField.nativeElement.focus();
  }


  onSubmit() {
    console.log('Job Submitted:', this.job);
    // TODO: you can call API here to save the job
  }
}
