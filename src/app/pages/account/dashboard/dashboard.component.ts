import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { Emitters } from '../../../emitters/emitters';
import { Router } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import moment from 'moment';
import { PolicyService } from '../../../services/policy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService,
    private policyService: PolicyService
  ) {}
  user: any;
  authenticated: boolean = false;
  title: string = 'Dashboard';
  admin: any = {};
  instructor: any = {};
  student: any = {};
  policies: any = [];
  unread_policies: any = 0;
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });

    this.getUser();
    this.getPolicies();
    this.unreadPolicies();
    this.getAdminDetails();
    this.getInstructorDetails();
    this.getStudentDetails();

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

  getAdminDetails() {
    this.dashboardService.admin().subscribe((res: any) => {
      this.admin = res;
    });
  }

  getInstructorDetails() {
    this.dashboardService.instructor().subscribe((res: any) => {
      this.instructor = res;
    });
  }

  getStudentDetails() {
    this.dashboardService.student().subscribe((res: any) => {
      this.student = res;
    });
  }

  duration(date: any) {
    return moment(date).endOf('hour').fromNow();
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
  //  console.log(typeof this.unread_policies);

  }
}
