import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { PolicyService } from '../../../../services/policy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrl: './user-policies.component.css',
})
export class UserPoliciesComponent implements OnInit {
  user: any;
  policies: any = [];

  loading: boolean = true;
  loadingTitle: string = 'Loading Accepted Policies';

  itemsPerPage = 50;
  currentPage = 1;

  filteredPolicies: any = [];
  searchText: string = '';
  constructor(
    private authService: AuthService,
    private policyService: PolicyService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getPolicies();
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

  getPolicies() {
    this.policyService.userPolicies().subscribe((res: any) => {
      this.policies = res;
      this.loading = false;
    });
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }
  search() {
    let search = this.searchText.toLowerCase();
    this.filteredPolicies = this.policies.filter((element: any) => {
      return element.lastname.toLowerCase().includes(search);
    });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.policies.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
