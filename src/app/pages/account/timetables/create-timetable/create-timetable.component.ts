import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { TimetableService } from '../../../../services/timetable.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-timetable',
  templateUrl: './create-timetable.component.html',
  styleUrl: './create-timetable.component.css',
})
export class CreateTimetableComponent implements OnInit {
  user: any;
  categories: any = [];

  category!: any;
  title!: any;
  file!: File;

  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  loading: boolean = false;
  error: any = '';
  loadingTitle: string = 'Uploading Timetable';
  constructor(
    private authService: AuthService,
    private router: Router,
    private timetableService: TimetableService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUser();

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



  onFileChange(event: any) {

    this.file = event.target.files[0];
    if (this.file) {
      this.status = 'initial';
      this.toast.success('Timetable successfully selected', 'Success')
      console.log('File selected: ' + this.file)
    }
  }

  submit() {
    this.loading = true
    let inputData = {
      title: this.title,
      file: this.file
    }

    this.timetableService.store(inputData).subscribe({
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
