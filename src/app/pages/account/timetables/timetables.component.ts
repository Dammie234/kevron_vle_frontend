import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../../services/timetable.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrl: './timetables.component.css',
})
export class TimetablesComponent implements OnInit {
  timetable: any ;
  loading: boolean = true;
  user: any;
  loadingTitle: string = 'Loading Timetables';

  constructor(
    private timetableService: TimetableService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getTimetable();
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

  getTimetable() {
    this.timetableService.index().subscribe((res: any) => {
      this.timetable = res;
      this.loading = false;
    });
  }


}
