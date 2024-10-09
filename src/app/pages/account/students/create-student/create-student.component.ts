import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { StudentService } from '../../../../services/student.service';
import { Router } from '@angular/router';
import { Emitters } from '../../../../emitters/emitters';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css',
})
export class CreateStudentComponent implements OnInit {
  user: any;
  loading: boolean = false;
  loadingTitle: string = 'Adding Student';
  authenticated: boolean = false;

  firstname!: string
  lastname!: string
  email!: string
  password!: string
  mobile_phone!: string
  address!: string
  city!: string
  postal_code!: string
  country!: string
  gender!: string
  date_of_birth!: any
  nationality!: string
  name!: string
  contact_email!: string
  phone!: string
  contact_address!: string

  errors: any = []
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router, private toast: ToastrService
  ) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.getUser()
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
  generatePassword(){
    let result = '';
    let length = 10
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.password =  result;
  }
  submit(){
    this.loading = true
    let inputData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      date_of_birth: this.date_of_birth,
      nationality: this.nationality,
      gender: this.gender,
      address: this.address,
      city: this.city,
      postal_code: this.postal_code,
      mobile_phone: this.mobile_phone,
      country: this.country,
      name: this.name,
      contact_email: this.contact_email,
      phone: this.phone,
      contact_address: this.contact_address,
      role: 3
    }
    this.studentService.register(inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success');
        this.router.navigate(['/account/students'])
      },
      error: (err: any) => {
        this.loading = false
        this.errors = err.error.errors
      }
    })
  }
}
