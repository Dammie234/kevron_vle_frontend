import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { PolicyService } from '../../../../services/policy.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css',
})
export class PolicyComponent implements OnInit {
  user: any
  policies: any = []


  loading: boolean = true
  loadingTitle: string = 'Loading Policies'
  constructor(
    private authService: AuthService,
    private policyService: PolicyService,
    private router: Router, private toast: ToastrService
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
    this.policyService.policies().subscribe((res: any) => {
      this.policies = res
      this.loading = false
    })
  }

  readPolicy(id: any){
    this.policyService.readPolicy(id).subscribe((res: any) => {
      this.toast.success(res.message, 'Success')
      this.router.navigate(['/account/dashboard']);

    })
  }
}
