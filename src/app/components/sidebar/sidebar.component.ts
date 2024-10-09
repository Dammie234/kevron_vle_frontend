import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  policies: any = [];
  unread_policies: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private policyService: PolicyService
  ) {}
  @Input()
  user!: any;
  ngOnInit(): void {
    this.getPolicies();
    this.unreadPolicies()
  }
  logout() {
    this.authService.logout().subscribe((res: any) => {});
  }
  getPolicies() {
    this.policyService.policies().subscribe((res: any) => {
      this.policies = res;
    });
  }

  unreadPolicies() {
    this.policyService.unreadPolicies().subscribe((res: any) => {
      this.unread_policies = res;
    });


  }
}
