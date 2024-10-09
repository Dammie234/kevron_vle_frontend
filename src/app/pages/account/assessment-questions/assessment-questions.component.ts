import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AssessmentService } from '../../../services/assessment.service';


@Component({
  selector: 'app-assessment-questions',
  templateUrl: './assessment-questions.component.html',
  styleUrl: './assessment-questions.component.css',
})
export class AssessmentQuestionsComponent implements OnInit {
  user: any;
  assessments: any = [];
  filteredAssessments: any = [];
  searchText: string = '';

  loading: boolean = true;

  itemsPerPage = 50;
  currentPage = 1;
  constructor(
    private authService: AuthService,
    private router: Router,
    private assessmentService: AssessmentService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getAssessments();
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

  getAssessments() {
    this.assessmentService.index().subscribe((res: any) => {
      this.assessments = res;
      this.loading = false;
    });
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }
  search() {
    let search = this.searchText.toLowerCase();
    this.filteredAssessments = this.assessments.filter((element: any) => {
      return element.course.toLowerCase().includes(search);
    });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.assessments.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
