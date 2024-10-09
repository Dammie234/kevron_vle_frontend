import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { StudentService } from '../../../services/student.service';
import { StudentCourseService } from '../../../services/student-course.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css',
})
export class StudentCoursesComponent implements OnInit {
  user: any;
  students: any = [];
  courses: any = [];
  student_courses: any = [];
  loading1: boolean = true;
  loading2: boolean = false;
  add_student: boolean = false;

  student!: any;
  course!: any;
  errors: any = [];

  filteredStudents: any = [];
  searchText: string = '';

  itemsPerPage = 50;
  currentPage = 1;
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private studentCourseService: StudentCourseService,
    private router: Router,
    private toast: ToastrService,
    private courseService: CourseService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getStudents();
    this.getCourses();
    this.getStudentCourses();
  }

  addStudent() {
    this.add_student = true;
  }
  closeStudent() {
    this.add_student = false;
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

  getStudents() {
    this.studentService.students().subscribe((res: any) => {
      this.students = res;
    });
  }

  getCourses() {
    this.courseService.courses().subscribe((res: any) => {
      this.courses = res;
    });
  }

  getStudentCourses() {
    this.studentCourseService.index().subscribe((res: any) => {
      this.student_courses = res;
      this.loading1 = false;
    });
  }

  submit() {
    this.loading2 = true;
    let inputData = {
      user: this.student,
      course: this.course,
    };
    this.studentCourseService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading2 = false;
        this.toast.success(res.message, 'Success!');
        this.getStudentCourses();
        this.add_student = false;
      },
      error: (err: any) => {
        this.loading2 = false;
        this.errors = err.error.errors;
      },
    });
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }
  search() {
    let search = this.searchText.toLowerCase();
    this.filteredStudents = this.student_courses.filter((element: any) => {
      return element.firstname.toLowerCase().includes(search);
    });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.student_courses.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
