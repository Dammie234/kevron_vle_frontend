import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-vle-courses',
  templateUrl: './vle-courses.component.html',
  styleUrl: './vle-courses.component.css',
})
export class VleCoursesComponent implements OnInit {
  courses: any = [];
  filteredCourses: any = [];
  searchText: string = '';
  loading: boolean = true;
  loadingTitle: string = 'Loading Courses';
  location: any

  itemsPerPage = 20;
  currentPage = 1;
  constructor(private courseService: CourseService, private cartService: CartService, private toast: ToastrService, private router: Router, private locationService: LocationService) {}
  ngOnInit(): void {
    this.getCourses();
    this.getLocation()
  }

  getCourses() {
    this.courseService.vleCourses().subscribe((res: any) => {
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

  addToCart(course_id: number, country: any) {
    this.cartService.addToCart(course_id, country).subscribe({
      next: (res: any) => {
        this.toast.success(res.message);
        this.router.navigate(['/checkout']);
      },
      error: (err: any) => {
        this.toast.error(err.errors.error);
      },
    });
  }
  getLocation(){
    this.locationService.location().subscribe((res: any) => {
      this.location = res
    })
  }
}
