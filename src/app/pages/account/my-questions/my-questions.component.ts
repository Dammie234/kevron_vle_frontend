import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrl: './my-questions.component.css',
})
export class MyQuestionsComponent implements OnInit {
  user: any;
  questions: any = [];

  loading: boolean = true;
  loadingTitle: string = 'Loading Questions';
  constructor(
    private authService: AuthService,
    private router: Router,
    private questionService: QuestionService
  ) {}
  ngOnInit(): void {
    this.getUser()
    this.getQuestions()
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

  getQuestions(){
    this.questionService.myQuestions().subscribe((res: any) => {
      this.questions = res
      this.loading = false
    })
  }
}
