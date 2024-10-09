import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { PolicyService } from '../../../../services/policy.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrl: './create-policy.component.css',
})
export class CreatePolicyComponent implements OnInit {
  user: any;

  title!: string;
  content!: string;
  audience!: string;
  compulsory!: boolean;

  errors: any = [];
  audiences: any = ['Instructors', 'Students', 'Both'];

  loading: boolean = false;
  loadingTitle: string = 'Adding Policy';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  constructor(
    private authService: AuthService,
    private policyService: PolicyService,
    private router: Router, private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUser()
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

  submit(){
    this.loading = true
    let inputData = {
      title: this.title,
      content: this.content,
      audience: this.audience,
      compulsory: this.compulsory
    }

    this.policyService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading = false
        this.toast.success(res.message, 'Success')
        this.router.navigate(['/account/policies'])
      },
      error: (err: any) => {
        this.loading = false
        this.errors = err.error.errors
      }
    })
  }
}
