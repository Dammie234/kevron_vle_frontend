import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SettingsService } from '../../../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.css',
})
export class InstructorsComponent implements OnInit {
  user: any
  instructors: any = []
  loading: boolean = true
  loadingTitle: string = 'Loading Instructors'
  constructor(
    private authService: AuthService,
    private settingService: SettingsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser()
    this.getInstructors()
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

  getInstructors(){
    this.settingService.instructors().subscribe((res: any) => {
      this.instructors = res
      this.loading = false
    })
  }
}
