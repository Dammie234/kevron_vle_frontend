import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { StudentCourseService } from '../../../services/student-course.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css',
})
export class MyCoursesComponent implements OnInit {
  user: any;
  courses: any = [];
  loading: boolean = true
  loadingTitle: string = 'Loading Courses'

  constructor(
    private authService: AuthService,
    private studentCourseService: StudentCourseService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser()
    this.getCourses()
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

  getCourses(){
    this.studentCourseService.courses().subscribe((res: any) => {
      this.courses = res
      this.loading = false
    })
  }




}
