import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Emitters } from '../../../emitters/emitters';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {
  user: any;
  authenticated: boolean = false;

  current_password!: string;
  new_password!: string;
  repeat_password!: string;

  loading: boolean = false;
  loadingTitle: string = 'Updating Password';
  msg: string = '';

  error: string = ''
  constructor(private authService: AuthService, private router: Router, private settingService: SettingsService) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.getUser();
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

  submit(){
    this.loading = true
    let inputData = {
      current_password: this.current_password,
      new_password: this.new_password,
      repeat_password: this.repeat_password
    }

    this.settingService.changePassword(inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.msg = 'Password successfully updated'
      },
      error: (err: any) => {
        this.loading = false
        this.error = err.error.error;
      }
    })
  }
}
