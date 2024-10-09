import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructor-students',
  templateUrl: './instructor-students.component.html',
  styleUrl: './instructor-students.component.css',
})
export class InstructorStudentsComponent implements OnInit {
  user: any;
  data: any = {};
  slug: any;
  loading: boolean = true;
  loadingTitle: string = '';

  filteredStudents: any = [];
  searchText: string = '';
  itemsPerPage = 50;
  currentPage = 1;
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getUser();
    this.getStudents();
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
    this.studentService.instructorStudents(this.slug).subscribe((res: any) => {
      this.data = res;
      this.loading = false;
    });
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }
  search() {
    let search = this.searchText.toLowerCase();
    this.filteredStudents = this.data.students.filter((element: any) => {
      return element.firstname.toLowerCase().includes(search);
    });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.students.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
