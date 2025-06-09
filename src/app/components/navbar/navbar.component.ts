import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [FormsModule, CommonModule, RouterLink],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  dropdownOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile() {
    this.dropdownOpen = false;
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.dropdownOpen = false;
    this.router.navigate(['/home']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.dropdownOpen = false;
  }
}
