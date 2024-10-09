import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../../services/timetable.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css',
})
export class TimetableComponent implements OnInit {
  timetable: any;
  user: any;
  file: any
  loading: boolean = true;
  loadingTitle: string = 'Loading Timetable';
  constructor(
    private timetableService: TimetableService,
    private authService: AuthService,
    private router: Router, private sanitizer: DomSanitizer
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
      this.file = 'http://127.0.0.1:8000/timetables/' + this.timetable.file;

    });
  }

  getFile() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.file);
  }
}
