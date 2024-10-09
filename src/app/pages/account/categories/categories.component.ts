import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import { Emitters } from '../../../emitters/emitters';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  user: any;
  authenticated: boolean = false;
  categories: any = [];
  loading: boolean =  true
  loadingTitle: string = 'Loading categories'
  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.getUser()
    this.getCategories()
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

  getCategories(){
    this.categoryService.categories().subscribe((res: any) => {
      this.categories = res
      this.loading = false
    })
  }
}
