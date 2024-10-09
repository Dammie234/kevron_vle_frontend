import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrl: './edit-instructor.component.css',
})
export class EditInstructorComponent implements OnInit {
  id: any;
  user: any;
  instructor: any;

  errors: any = [];
  loading1: boolean = true;
  loading2: boolean = false
  loadingTitle: string = 'Updating Instructor Profile';
  message: string = '';
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.getInstructor();
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

  getInstructor() {
    this.studentService.student(this.id).subscribe((res: any) => {
      this.instructor = res;
      this.loading1 = false
    });
  }

  submit() {
    this.loading2 = true;
    let inputData = {
      firstname: this.instructor.firstname,
      lastname: this.instructor.lastname,
      email: this.instructor.email,
      date_of_birth: this.instructor.date_of_birth,
      nationality: this.instructor.nationality,
      gender: this.instructor.gender,
      specialization: this.instructor.specialization,
      address: this.instructor.address,
      city: this.instructor.city,
      postal_code: this.instructor.postal_code,
      mobile_phone: this.instructor.mobile_phone,
      country: this.instructor.country,
      bio: this.instructor.bio,
      name: this.instructor.name,
      contact_email: this.instructor.contact_email,
      phone: this.instructor.phone,
      contact_address: this.instructor.contact_address,
    };
    this.studentService.update(inputData, this.id).subscribe({
      next: (res: any) => {
        this.loading2 = false;
        this.toast.success('Instructor Profile Successfully Updated', 'Success');
        this.message = 'Instructor Profile Successfully Updated';
      },
      error: (err: any) => {
        this.loading2 = false;
        this.errors = err.error.errors;
      },
    });
  }
}
