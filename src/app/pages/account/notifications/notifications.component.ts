import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  user: any;
  notifications: any = [];

  loading: boolean = true;
  loadingTitle: string = 'Loading Notifications';
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService, private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getNotifications();
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

  getNotifications() {
    this.notificationService.notifications().subscribe((res: any) => {
      this.notifications = res;
      this.loading = false;
    });
  }

  delete(id: any){
    this.notificationService.destroy(id).subscribe((res: any) => {
      this.toast.success(res.message, 'Success')
      this.getNotifications()
    })
  }

  duration(date: any) {
    return moment(date).endOf('day').fromNow();
  }
}
