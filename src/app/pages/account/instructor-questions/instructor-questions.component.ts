import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-instructor-questions',
  templateUrl: './instructor-questions.component.html',
  styleUrl: './instructor-questions.component.css',
})
export class InstructorQuestionsComponent implements OnInit {
  user: any;
  questions: any = [];

  message: string = '';

  question: any;
  answer!: string;

  openQuestion: boolean = false;
  errors: any = [];

  filteredQuestions: any = [];
  searchText: string = '';

  itemsPerPage = 50;
  currentPage = 1;

  loading1: boolean = true;
  loading2: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private questionService: QuestionService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getQuestions();
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

  getQuestions() {
    this.questionService.instructorQuestions().subscribe((res: any) => {
      this.questions = res;
      this.loading1 = false;
    });
  }

  provideAnswer(id: any) {
    this.openQuestion = true;
    this.questionService.show(id).subscribe((res: any) => {
      this.question = res;
    });
  }

  closeAnswer() {
    this.openQuestion = false;
  }

  submit() {
    this.loading2 = true;
    let inputData = {
      answer: this.answer,
    };
    this.questionService.update(inputData, this.question.id).subscribe({
      next: (res: any) => {
        this.loading2 = false;
        this.toast.success(res.message, 'Success');
        this.message = res.message;
        this.openQuestion = false;
        this.getQuestions();
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
    this.filteredQuestions = this.questions.filter((element: any) => {
      return element.firstname.toLowerCase().includes(search);
    });
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.questions.slice(start, end);
  }
  changePage(page: number) {
    this.currentPage = page;
  }
}
