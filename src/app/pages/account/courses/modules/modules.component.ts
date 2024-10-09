import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from '../../../../services/section.service';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ModuleService } from '../../../../services/module.service';
import { ResourceService } from '../../../../services/resource.service';
import { timeStamp } from 'node:console';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css',
})
export class ModulesComponent implements OnInit {
  user: any;
  id: any;
  add_section: boolean = false;
  edit_section: boolean = false;

  add_module: boolean = false;
  edit_module: boolean = false;
  add_resource: boolean = false;
  edit_resource: boolean = false;

  section_title!: string;

  module_title!: string;
  content!: string;
  video!: string;
  video_duration!: string;
  module_section!: any

  lock!: string;

  urls: any[] = [];
  titles: any[] = []
  module_id: any
  counts: number = 0;

  module_resources: any = [];

  loading1: boolean = false;
  loading2: boolean = false;
  loading3: boolean = false;
  loading4: boolean = false;
  loading5: boolean = false

  message: string = '';

  errors: any = [];

  sections: any = [];
  section: any;
  modules: any = [];
  module: any;

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
    private route: ActivatedRoute,
    private router: Router,
    private sectionService: SectionService,
    private toast: ToastrService,
    private moduleService: ModuleService,
    private resourceService: ResourceService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.getSections();

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

  addSection() {
    this.add_section = true;
  }
  closeSection() {
    this.add_section = false;
  }


  addModule() {
    this.add_module = true;

  }

  closeModule() {
    this.add_module = false;
  }

  closeEditSection() {
    this.edit_section = false;
  }

  editModule(id: any) {
    this.edit_module = true;
    this.moduleService.show(id).subscribe((res: any) => {
      this.module = res.module;
    });
  }

  addResource(id: any) {
    this.add_resource = true;
    this.moduleService.show(id).subscribe((res: any) => {
      this.module = res;
    });
  }

  closeAddResource() {
    this.add_resource = false;
  }

  submitResources(id: any){
   this.loading5 = true
    let inputData = {
      id: id,
      titles: this.titles,
      urls: this.urls
    }
    this.resourceService.store(inputData).subscribe((res: any) => {
      this.loading5 = false
      this.toast.success(res.message)
      this.message = res.message
    this.add_resource = false
    this.getSections()
    })

  }

  editResources(id: any) {
    this.edit_resource = true;
    this.moduleService.show(id).subscribe((res: any) => {
      this.module = res;
    });
    this.resourceService.resources(id).subscribe((res: any) => {
      this.module_resources = res;
    });
  }

  updateResource(resource: any, id: any) {
    let inputData = {
      url: resource.url,
      title: resource.title
    };
    this.resourceService.updateResource(inputData, id).subscribe((res: any) => {
      this.toast.success(res.message, 'Success');
      this.message = res.message;
      this.edit_resource = false;
      this.module_resources = ''
      this.getSections()
    });
  }

  lockResource(id: any) {
    this.resourceService.lockResource(id).subscribe((res: any) => {
      this.toast.success(res.message, 'Success');
      this.message = res.message;
      this.edit_resource = false;
      this.getSections()
    });
  }

  unlockResource(id: any) {
    this.resourceService.unlockResource(id).subscribe((res: any) => {
      this.toast.success(res.message, 'Success');
      this.message = res.message;
      this.edit_resource = false;
      this.getSections()
    });
  }

  deleteResource(id: any){
    this.resourceService.delete(id).subscribe((res: any) => {
      this.message = res.message
      this.toast.success(this.message, 'Success');
      this.edit_resource = false;
      this.getSections()
    })
  }

  closeEditResources() {
    this.edit_resource = false;
  }

  closeEditModule() {
    this.edit_module = false;
  }

  storeSection() {
    this.loading1 = true;
    let inputData = {
      title: this.section_title,
      course: this.id,
    };
    this.sectionService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading1 = false;
        this.toast.success(res.message, 'Success!');
        this.message = res.message;
        this.add_section = false;
        this.section_title = ''
        this.getSections();
      },
      error: (err: any) => {
        this.loading1 = false;
        this.errors = err.error.errors;
      },
    });
  }

  getSections() {
    this.sectionService.index(this.id).subscribe((res: any) => {
      this.sections = res;
    });
  }

  getModules(id: any) {
    this.moduleService.index(id).subscribe((res: any) => {
      this.modules = res;
    });
  }

  editSection(id: any) {
    this.edit_section = true;
    this.sectionService.show(id).subscribe((res: any) => {
      this.section = res;
    });
  }

  updateSection() {
    this.loading2 = true;
    let inputData = {
      title: this.section.title,
    };
    this.sectionService.update(inputData, this.section.id).subscribe({
      next: (res: any) => {
        this.loading2 = false;
        this.toast.success(res.message, 'Success!');
        this.message = res.message;
        this.edit_section = false;
        this.section = ''
        this.getSections();
      },
      error: (err: any) => {
        this.loading2 = false;
        this.errors = err.error.errors;
      },
    });
  }

  storeModule() {
    this.loading3 = true;
    let inputData = {
      course_id: this.id,
      section_id: this.module_section,
      title: this.module_title,
      content: this.content,
      video: this.video,
      video_duration: this.video_duration,
      lock: this.lock,
    };

    this.moduleService.store(inputData).subscribe({
      next: (res: any) => {
        this.loading3 = false;
        this.toast.success(res.message, 'Success!');
        this.message = res.message;
        this.add_module = false;
        this.module_section = ''
        this.module_title = ''
        this.content = ''
        this.video = ''
        this.video_duration = ''
        this.lock = ''
        this.getSections()


      },
      error: (err: any) => {
        this.loading3 = false;
        this.errors = err.error.errors;
      },
    });
  }

  updateModule() {
    this.loading4 = true;
    let inputData = {
      title: this.module.title,
      content: this.module.content,
      video: this.module.video,
      video_duration: this.module.video_duration,
      lock: this.module.lock,
    };

    this.moduleService.update(inputData, this.module.id).subscribe({
      next: (res: any) => {
        this.loading4 = false;
        this.toast.success(res.message, 'Success!');
        this.message = res.message;
        this.edit_module = false;
        this.module = ''
      },
      error: (err: any) => {
        this.loading4 = false;
        this.errors = err.error.errors;
      },
    });
  }
}
