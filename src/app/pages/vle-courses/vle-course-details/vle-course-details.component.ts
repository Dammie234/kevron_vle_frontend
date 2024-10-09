import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../services/module.service';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-vle-course-details',
  templateUrl: './vle-course-details.component.html',
  styleUrl: './vle-course-details.component.css',
})
export class VleCourseDetailsComponent implements OnInit {
  data: any = {};
  modules: any = [];
  slug: any = '';
  loading: boolean = true;
  loadingTitle: string = 'Loading Course Details';
  location: any;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private cartService: CartService,
    private toast: ToastrService,
    private router: Router,
    private locationService: LocationService
  ) {}
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getCourseDetails();
    this.getLocation()
  }

  getCourseDetails() {
    this.courseService.vleCourseDetails(this.slug).subscribe((res: any) => {
      this.data = res;
      this.loading = false;
    });
  }

  getModules(id: any) {
    this.moduleService.vleModules(id).subscribe((res: any) => {
      this.modules = res;
    });
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

  getLocation() {
    this.locationService.location().subscribe((res: any) => {
      this.location = res;
    });
  }
}
