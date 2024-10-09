import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AssessmentService } from '../../../services/assessment.service';

@Component({
  selector: 'app-student-asssessments',
  templateUrl: './student-asssessments.component.html',
  styleUrl: './student-asssessments.component.css',
})
export class StudentAsssessmentsComponent implements OnInit {
  user: any;
  assessments: any = [];

  loading: boolean = true;
  loadingTitle: string = 'Loading Assessments';
  constructor(
    private authService: AuthService,
    private router: Router,
    private assessmentService: AssessmentService
  ) {}
  ngOnInit(): void {
    this.getUser()
    this.getAssessments()
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

  getAssessments(){
    this.assessmentService.studentAssessmentAnswers().subscribe((res: any) => {
      this.assessments = res
      this.loading = false
    })
  }
}
