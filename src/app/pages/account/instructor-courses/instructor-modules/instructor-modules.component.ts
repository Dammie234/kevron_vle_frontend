import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../../services/course.service';
import { SectionService } from '../../../../services/section.service';
import { ModuleService } from '../../../../services/module.service';

@Component({
  selector: 'app-instructor-modules',
  templateUrl: './instructor-modules.component.html',
  styleUrl: './instructor-modules.component.css',
})
export class InstructorModulesComponent implements OnInit {
  user: any;
  slug: any;
  course: any ;
  modules: any = [];
  sections: any = [];
  loading: boolean = true;
  loadingTitle: string = '';
  constructor(
    private authService: AuthService,
    private sectionService: SectionService,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService, private moduleService: ModuleService
  ) {}
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getUser();
    this.getSections();
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
      this.course = res.course;
      this.loading = false;
    });
  }

  getSections() {
    this.sectionService.sections(this.slug).subscribe((res: any) => {
      this.sections = res;
    });
  }

  getModules(id: any) {
    this.moduleService.index(id).subscribe((res: any) => {
      this.modules = res;
    });
  }
}
