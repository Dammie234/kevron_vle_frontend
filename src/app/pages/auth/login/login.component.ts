import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
constructor(private titleService: Title, private authService: AuthService, private router: Router){}

email!: string
password!: string
loading: boolean = false

error: string = ''

ngOnInit(): void {
    this.titleService.setTitle('Login Page')
}

login(){
  this.loading = true
  let inputData = {
    email: this.email,
    password: this.password
  }
  this.authService.login(inputData).subscribe({
    next: (res: any) => {
      this.loading = false
      this.router.navigate(['/account/dashboard'])
    },
    error: (err: any) => {
      this.loading = false
      this.error = err.error.message

    }
  })
}

}
