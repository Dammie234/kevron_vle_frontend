import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CourseService } from '../../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { SettingsService } from '../../../../services/settings.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css',
})
export class EditCourseComponent implements OnInit {
  id: any;
  user: any;
  course: any;
  categories: any = [];
  instructors: any = [];
  instructor!: any
  category!: any

  loading1: boolean = true;
  loading2: boolean = false;

  url: any;
  msg: string = '';
  message: string = '';
  errors: any = []

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
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private settingService: SettingsService, private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.getCategories();
    this.getInstructors();
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
    this.courseService.show(this.id).subscribe((res: any) => {
      this.course = res;
      this.loading1 = false;
    });
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

  submit(){
    this.loading2 = true
    let inputData = {
      instructor: this.instructor,
      category: this.category,
      title: this.course.title,
      local_price: this.course.local_price,
      foreign_price: this.course.forign_price,
      image: this.url,
      description: this.course.description,
    };

    this.courseService.update(inputData, this.id).subscribe({
      next: (res: any) => {
        this.loading2 = false
        this.toast.success(res.message, 'Success!')
        this.message = res.message
      },
      error: (err: any) => {
        this.loading2 = false
        this.errors = err.error.errors
      }
    })
  }
}
