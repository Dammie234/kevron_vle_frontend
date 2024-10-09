import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCourseService } from '../../../../services/student-course.service';
import { ModuleService } from '../../../../services/module.service';
import { AssessmentService } from '../../../../services/assessment.service';
import { UploadService } from '../../../../services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from '../../../../services/resource.service';
import { QuestionService } from '../../../../services/question.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.css',
})
export class MyCourseComponent implements OnInit {
  user: any;
  key: any;
  modules: any = [];
  resources: any = []
  module: any;
  section: any
  question!: string

  questions: any = []

  file!: File;

  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  success: string = ''
  error: string = ''
  errors: any = []
  assessment: any;
  openAssessment: boolean = false;
  attendModule: boolean = false;
  askQuestion: boolean = false
  openResources: boolean = false
  data: any = {};
  loading: boolean = true;
  loadingTitle: string = 'Loading Course Modules';
  loading2: boolean = false
  loading3: boolean = false
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private studentCourseService: StudentCourseService,
    private moduleService: ModuleService,
    private assessmentService: AssessmentService,
    private uploadService: UploadService, private toast: ToastrService, private resourceService: ResourceService, private questionService: QuestionService, private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key');
    this.getUser();
    this.getQuestions();
    this.getCourse();

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

  getCourse() {
    this.studentCourseService.classroom(this.key).subscribe((res: any) => {
      this.data = res;
      this.loading = false;
    });
  }
  getModules(id: any) {
    this.moduleService.index(id).subscribe((res: any) => {
      this.modules = res;
    });
  }



  getModule(id: any) {
    this.moduleService.show(id).subscribe((res: any) => {
      this.module = res.module;
      this.section = res.section
      this.attendModule = true;
    });
  }

  getQuestions(){
    this.questionService.allQuestions(this.key).subscribe((res: any) => {
      this.questions = res
    })
  }
  openQuestion(){
    this.askQuestion = true
  }
  getAssessment(id: any) {
    this.openAssessment = true;
    this.assessmentService.assessment(id).subscribe((res: any) => {
      this.assessment = res;
    });
  }
  getResources(id: any){
    this.openResources = true
    this.resourceService.resources(id).subscribe((res: any) => {
      this.resources = res
    })
  }

  closeResources(){
    this.openResources = false
    this.resources = []
  }

  closeAssessment(){
    this.openAssessment = false
    this.assessment = ''
  }

  onFilechange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
   if (this.file) {
    this.status = 'initial';
   }
  }

  upload() {
    if (this.file) {
      this.loading2 = true
      let inputData = {
        file: this.file,
        module: this.module.id,
        assessment: this.assessment.id
      }
      this.uploadService.uploadFile(inputData).subscribe({
        next: (res: any) => {
          this.loading2 = false
           this.openAssessment = false;
           this.success = res.message;
           this.toast.success(this.success, 'Success');
        },
        error: (err: any) => {
          this.loading2 = false
          this.openAssessment = false
          this.error = err.error.message
          this.toast.error(this.error, 'Error')
        }
      });
    } else {
      alert('Please select a file first');
    }
  }

  getVimeoUrl(url: any){
    let safeUrl: SafeResourceUrl
    safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    return safeUrl
  }
  submit(){
    this.loading3 = true
    let inputData = {
      key: this.key,
      module: this.module.id,
      question: this.question
    }

    this.questionService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading3 = false
        this.askQuestion = false
        this.success = res.message
        this.toast.success(this.success, 'Success')
      },
      error: (err: any) => {
        this.loading3 = false
        this.errors = err.error.errors
      }
    })
  }
}
