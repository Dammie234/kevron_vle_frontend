import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../services/policy.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css',
})
export class PoliciesComponent implements OnInit {
  user: any
  policies: any =  []
  loading: boolean = true
  loadingTitle: string = 'Loading Policies'
  constructor(
    private policyService: PolicyService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser()
    this.getPolicies()
  }

  getUser() {
    this.authService.user().subscribe(
      (res: any) => {
        this.user = res;
      },
      (err) => {
        this.router.navigate(['/']);
      }
    );
  }
  getPolicies(){
    this.policyService.index().subscribe((res: any) => {
      this.policies = res
      this.loading = false
    })
  }
}
