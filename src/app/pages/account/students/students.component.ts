import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Emitters } from '../../../emitters/emitters';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  user: any;
  students: any;

  filteredStudents: any = [];
  searchText: string = '';
  authenticated: boolean = false;
  loading: boolean = true;

  itemsPerPage = 50;
  currentPage = 1;
  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Students');
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.getUser();
    this.getStudents();
  }

  getUser() {
    this.authService.user().subscribe(
      (res: any) => {
        this.user = res;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/']);
      }
    );
  }

  getStudents() {
    this.studentService.students().subscribe((res: any) => {
      this.students = res;
      this.loading = false;
    });
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }
  search() {
    let search = this.searchText.toLowerCase();
    this.filteredStudents = this.students.filter((element: any) => {
      return element.firstname.toLowerCase().includes(search);
    });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.students.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
