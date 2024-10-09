import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../../services/course.service';
import { SectionService } from '../../../../services/section.service';
import { ModuleService } from '../../../../services/module.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  user: any;
  slug: any;
  data: any = {};
  loading: boolean = true;
  modules: any = []

  loadingTitle: string = 'Loading Course Details';
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService, private sectionService: SectionService, private moduleService: ModuleService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.getCourseDetails();
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
  getCourseDetails() {
    this.courseService.courseDetails(this.slug).subscribe((res: any) => {
      this.data = res;
      this.loading = false;
    });
  }


  getModules(id: any) {
    this.moduleService.index(id).subscribe((res: any) => {
      this.modules = res;
    });
  }
}
