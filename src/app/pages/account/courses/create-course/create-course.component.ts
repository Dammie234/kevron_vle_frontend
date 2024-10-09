import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CourseService } from '../../../../services/course.service';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css',
})
export class CreateCourseComponent implements OnInit {
  user: any;
  categories: any = [];
  loading: boolean = false;
  loadingTitle: string = 'Adding Course';

  title!: string;
  category!: string;
  description!: string;
  local_price!: number;
  foreign_price!: number;
  instructor!: any;
  url: any;
  msg: string = '';
  errors: any = [];
  instructors: any = [];

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
    private categoryService: CategoryService,
    private router: Router,
    private toast: ToastrService,
    private courseService: CourseService,
    private settingService: SettingsService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getCategories();
    this.getInstructors();
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

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      this.toast.error(this.msg, 'Error!');
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      this.toast.error(this.msg, 'Error!');
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
      this.toast.success('Image successfully selected', 'Success!');
    };
  }

  getCategories() {
    this.categoryService.categories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  getInstructors() {
    this.settingService.instructors().subscribe((res: any) => {
      this.instructors = res;
    });
  }

  submit() {
    this.loading = true;
    let inputData = {
      title: this.title,
      instructor: this.instructor,
      category: this.category,
      description: this.description,
      local_price: this.local_price,
      foreign_price: this.foreign_price,
      image: this.url,
    };
    this.courseService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toast.success(res.message, 'Success!');
        this.router.navigate(['/account/courses']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errors = err.error.errors;
      },
    });
  }
}
