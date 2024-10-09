import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../../services/course.service';
import { ModuleService } from '../../../../services/module.service';
import { ToastrService } from 'ngx-toastr';
import { AssessmentService } from '../../../../services/assessment.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-edit-assessment',
  templateUrl: './edit-assessment.component.html',
  styleUrl: './edit-assessment.component.css',
})
export class EditAssessmentComponent implements OnInit {
  user: any;
  id: any;
  courses: any = [];
  modules: any = [];
  assessment: any;

  errors: any = [];
  loading: boolean = false;
  loadingTitle: string = 'Updating Assessment Question';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private moduleService: ModuleService,
    private toast: ToastrService,
    private assessmentService: AssessmentService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.getCourses();
    this.getAssessment();
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

  getCourses() {
    this.courseService.instructorCourses().subscribe((res: any) => {
      this.courses = res;
    });
  }

  selectCourse(event: any) {
    let module = event.target.value;
    this.moduleService.index(module).subscribe((res: any) => {
      this.modules = res;
    });
  }

  getAssessment() {
    this.assessmentService.show(this.id).subscribe((res: any) => {
      this.assessment = res;
    });
  }

  submit() {
    this.loading = true
    let inputData = {
      course: this.assessment.course_id,
      module: this.assessment.module_id,
      questions: this.assessment.questions,
      instructions: this.assessment.instructions,
      deadline: this.assessment.deadline,
      lock: this.assessment.lock
    }

    this.assessmentService.update(this.id, inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success!')
        this.router.navigate(['/account/assessment-questions'])
      },
      error: (err: any) => {
        this.loading = false
        this.errors = err.error.errors
      }
    })
  }
}
