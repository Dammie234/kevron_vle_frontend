import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimetableService } from '../../../../services/timetable.service';

@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrl: './edit-timetable.component.css',
})
export class EditTimetableComponent implements OnInit {
  categories: any = [];
  timetable: any;
  file!: File;
  user: any;
  id: any

  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';

  loading: boolean = false;
  loadingTitle: string = '';
  error: any = '';
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router, private toast: ToastrService, private route: ActivatedRoute, private timetableService: TimetableService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getUser();
    this.getCategories();
    this.getTimetable()
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

  getCategories() {
    this.categoryService.categories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.status = 'initial';
      this.toast.success('Timetable successfully selected', 'Success');
      console.log('File selected: ' + this.file);
    }
  }

  getTimetable(){
    this.timetableService.show(this.id).subscribe((res: any) => {
      this.timetable = res
    })
  }

  submit(){
    this.loading = true
    let inputData = {
      category_id: this.timetable.category_id,
      title: this.timetable.title,
      file: this.file
    }

    this.timetableService.update(inputData, this.id).subscribe({
     next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success')
        this.router.navigate(['/account/timetables'])
      },
      error: (err: any) => {
        this.loading = false
        this.error = err.error.message
      }
    })
  }
}
