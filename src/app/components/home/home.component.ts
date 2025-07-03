import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('JobInput') firstNameElement!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.firstNameElement.nativeElement.focus();
  }
}
