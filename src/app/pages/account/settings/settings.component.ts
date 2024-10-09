import { StudentService } from './../../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Emitters } from '../../../emitters/emitters';
import { Router } from '@angular/router';
import { SettingsService } from '../../../services/settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  user: any;
  profile: any;
  authenticated: boolean = false;

  url: any;
  msg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private settingService: SettingsService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.getUser();
    this.getProfile();
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

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      this.toast.error(this.msg, 'Error!');
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      this.toast.error(this.msg, 'Error!');
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
      this.toast.success('Image successfully selected', 'Success!');
    };



  }

  getProfile() {
    this.settingService.profile().subscribe((res: any) => {
      this.profile = res;
    });
  }

  uploadPicture(){
    console.log(this.url)
    let inputData = {
      profile_picture: this.url,
    };
    this.settingService.profilePicture(inputData).subscribe((res: any) => {
      this.toast.success(res.message, 'Success!');
      this.getUser();
    });
  }
}
