import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent implements OnInit {
  user: any;
  policies: any = []
  loading: boolean = true
  loadingTitle: string = 'Loading Policies'
  constructor(private authService: AuthService, private router: Router, private policyService: PolicyService) {}
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
    this.policyService.allPolicies().subscribe((res: any) => {
      this.policies = res
      this.loading = false
    })
  }
}
