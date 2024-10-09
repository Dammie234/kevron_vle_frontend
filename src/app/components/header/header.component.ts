import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input()
  user!: any;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
  }
  logout() {
    this.authService.logout().subscribe((res: any) => {});
  }
}
