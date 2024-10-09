import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { ModuleService } from '../../../services/module.service';
import { AssessmentService } from '../../../services/assessment.service';

@Component({
  selector: 'app-asssessment-answers',
  templateUrl: './asssessment-answers.component.html',
  styleUrl: './asssessment-answers.component.css',
})
export class AsssessmentAnswersComponent implements OnInit {
  user: any;
  slug: any;
  data: any = {};
  modules: any = []
  loading: boolean = true
  loadingTitle: string = 'Loading Modules'
  answers: any = []
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private moduleService: ModuleService, private assessmentService: AssessmentService
  ) {}
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getUser();
    this.getCourseDetails()
    this.getModules()
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

  getCourseDetails() {
    this.courseService.courseDetails(this.slug).subscribe((res: any) => {
      this.data = res;

    });
  }

  getModules(){
    this.moduleService.courseModules(this.slug).subscribe((res: any) => {
      this.modules = res
      this.loading = false
    })
  }

  getStudents(id: any){
    this.assessmentService.assessmentAnswers(id).subscribe((res: any) => {
      this.answers = res
    })
  }

}
