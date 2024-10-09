import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { PolicyService } from '../../../../services/policy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrl: './edit-policy.component.css',
})
export class EditPolicyComponent implements OnInit {
  user: any;
  id: any;
  policy: any;

  loading: boolean = false;
  loadingTitle: string = 'Updating Policy';

  errors: any = [];
  audiences: any = ['Instructors', 'Students', 'Both']

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
    private router: Router,
    private route: ActivatedRoute, private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser()
    this.getPolicy()
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

  getPolicy(){
    this.policyService.show(this.id).subscribe((res: any) => {
      this.policy = res
    })
  }

  submit(){
    this.loading = true
    let inputData = {
      title: this.policy.title,
      content: this.policy.content,
      audience: this.policy.audience,
      compulsory: this.policy.compulsory
    }
    this.policyService.update(inputData, this.id).subscribe({
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
