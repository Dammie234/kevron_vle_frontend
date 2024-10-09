import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrl: './instructor-courses.component.css',
})
export class InstructorCoursesComponent implements OnInit {
  user: any;
  courses: any = [];
  loading: boolean = true;
  loadingTitle: string = 'Loading Courses';


  filteredCourses: any = [];
  searchText: string = '';
  itemsPerPage = 12;
  currentPage = 1;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router,

  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getCourses();
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

  getCourses() {
    this.courseService.instructorCourses().subscribe((res: any) => {
      this.courses = res;
      this.loading = false;
    });
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }
  search() {
    let search = this.searchText.toLowerCase();
    this.filteredCourses = this.courses.filter((element: any) => {
      return element.title.toLowerCase().includes(search);
    });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.courses.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }


}
