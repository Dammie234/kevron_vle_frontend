import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from '../../../../emitters/emitters';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css',
})
export class EditStudentComponent implements OnInit {
  user: any;
  student: any;
  id: any;

  loading1: boolean = true;
  loading2: boolean = false;
  loadingTitle: string = 'Updating Student Profile';
  authenticated: boolean = false;
  message: string = ''

  errors: any = []
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.getUser();
    this.getStudent()
  }

  getUser() {
    this.authService.user().subscribe(
      (res: any) => {
        this.user = res;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/']);
      }
    );
  }

  getStudent(){
    this.studentService.student(this.id).subscribe((res: any) => {
      this.student = res
      this.loading1 = false
    })
  }
  submit(){
    this.loading2 = true
    let inputData = {
      firstname: this.student.firstname,
      lastname: this.student.lastname,
      email: this.student.email,
      date_of_birth: this.student.date_of_birth,
      nationality: this.student.nationality,
      gender: this.student.gender,
      address: this.student.address,
      city: this.student.city,
      postal_code: this.student.postal_code,
      mobile_phone: this.student.mobile_phone,
      country: this.student.country,
      name: this.student.name,
      contact_email: this.student.contact_email,
      phone: this.student.phone,
      contact_address: this.student.contact_address,
    };
    this.studentService.update(inputData, this.id).subscribe({
      next: (res: any) => {
        this.loading2 = false;
        this.toast.success(res.message, 'Success');
        this.message = res.message
      },
      error: (err: any) => {
        this.loading2 = false;
        this.errors = err.error.errors;
      },
    });
  }
}
