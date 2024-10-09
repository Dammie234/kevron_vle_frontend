import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  user: any;
  courses: any;
  filteredCourses: any = [];
  searchText: string = '';

  loading: boolean = true;
  loadingTitle: string = 'Loading Courses';

  itemsPerPage = 12;
  currentPage = 1;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router,
    private settingService: SettingsService
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
    this.courseService.courses().subscribe((res: any) => {
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
