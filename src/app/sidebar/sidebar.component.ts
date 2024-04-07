// sidebar.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  selectedItem: number = 0;

  constructor(private authService: AuthService, private router: Router) { }

  selectItem(index: number) {
    this.selectedItem = index;
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}