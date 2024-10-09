import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit {
  user: any;
  category: any;
  id: any;
  loading: boolean = false;
  loadingTitle: string = 'Updating Category';
  errors: any = [];
  url: any;
  msg: string = '';
  success: string = ''

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.getCategory();
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

  getCategory() {
    this.categoryService.show(this.id).subscribe((res: any) => {
      this.category = res;
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

  submit() {
    this.loading = true
    let inputData = {
      title: this.category.title,
      image: this.url
    }

    this.categoryService.update(inputData, this.id).subscribe({
      next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success')
        this.success = res.message
      },
      error: (err: any) => {
        this.loading = false
        this.errors = err.error.errors
      }
    })
  }
}
