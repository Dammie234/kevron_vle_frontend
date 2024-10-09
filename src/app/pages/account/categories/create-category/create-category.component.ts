import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent implements OnInit {
  user: any;

  title!: string;
  url!: any;

  loading: boolean = false;
  loadingTitle: string = 'Adding Category';

  errors: any = [];
  msg: string = ''
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router, private toast: ToastrService
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

  submit() {
    this.loading = true
    let inputData = {
      title: this.title,
      image: this.url
    }

    this.categoryService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success!')
        this.router.navigate(['/account/categories'])
      },
      error: (err: any) => {
        this.loading = false
        this.errors = err.error.errors
      }
    })
  }
}
