import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CourseService } from '../../../../services/course.service';
import { ModuleService } from '../../../../services/module.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AssessmentService } from '../../../../services/assessment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrl: './create-assessment.component.css',
})
export class CreateAssessmentComponent implements OnInit {
  user: any;
  courses: any = [];
  modules: any = [];

  course!: any;
  module!: any;
  questions!: string;
  instructions!: string;
  deadline!: string;
  lock!: string

  loading: boolean = false;
  loadingTitle: string = 'Adding Assessment Question';
  errors: any = [];

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
    private courseService: CourseService,
    private moduleService: ModuleService,
    private router: Router,
    private assessmentService: AssessmentService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getCourses();
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

  submit() {
    this.loading = true;
    let inputData = {
      course: this.course,
      module: this.module,
      questions: this.questions,
      instructions: this.instructions,
      deadline: this.deadline,
      lock: this.lock
    };

    this.assessmentService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toast.success(res.message, 'Success!');
        this.router.navigate(['/account/assessment-questions']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errors = err.error.errors;
      },
    });
  }
}
