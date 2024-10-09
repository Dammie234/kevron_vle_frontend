import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  loading: boolean = false
  user: any
  email!: string
  password!: string
  password_confirmation!: string

  token: any
  error: string = ''
  constructor(private authService: AuthService, private router: Router, private toast: ToastrService, private route: ActivatedRoute){}
  ngOnInit(): void {
      this.token = this.route.snapshot.paramMap.get('token')
      this.getUser()
  }

  getUser(){
    this.authService.userByToken(this.token).subscribe((res: any) => {
      this.user = res
      this.email = this.user.email
    })
  }

  submit(){
    this.loading = true
    let inputData = {
      password: this.password,
      password_confirmation: this.password_confirmation,
      token: this.token
    }

    this.authService.changePassword(inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success!')
        this.router.navigate(['/'])
      },
      error: (err: any) => {
        this.loading = false
        this.error = err.error.message
        this.toast.error(this.error, 'Error!')
      }
    })

  }

}
