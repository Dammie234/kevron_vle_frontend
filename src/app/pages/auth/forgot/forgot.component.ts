import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent implements OnInit{
  email!: string
  loading: boolean = false
  success: string = ''
  error: string = ''
  constructor(private titleService: Title, private authService: AuthService, private toast: ToastrService){}
  ngOnInit(): void {
      this.titleService.setTitle('Forgot Password Page')
  }

  submit(){
    this.loading = true
    let inputData = {
      email: this.email
    }
    this.authService.forgetPassword(inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success!')
        this.success = res.message
      },
      error: (err: any) => {
        this.loading = false
        this.error = err.error.message
        this.toast.error(this.error, 'Error!')
      }
    })
  }
}
