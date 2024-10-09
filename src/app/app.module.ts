import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotComponent } from './pages/auth/forgot/forgot.component';
import { DashboardComponent } from './pages/account/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './pages/account/students/students.component';
import { CreateStudentComponent } from './pages/account/students/create-student/create-student.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { EditStudentComponent } from './pages/account/students/edit-student/edit-student.component';
import { SettingsComponent } from './pages/account/settings/settings.component';
import { ChangePasswordComponent } from './pages/account/change-password/change-password.component';
import { CategoriesComponent } from './pages/account/categories/categories.component';
import { CreateCategoryComponent } from './pages/account/categories/create-category/create-category.component';
import { EditCategoryComponent } from './pages/account/categories/edit-category/edit-category.component';
import { CoursesComponent } from './pages/account/courses/courses.component';
import { CreateCourseComponent } from './pages/account/courses/create-course/create-course.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { InstructorsComponent } from './pages/account/instructors/instructors.component';
import { CreateInstructorComponent } from './pages/account/instructors/create-instructor/create-instructor.component';
import { EditInstructorComponent } from './pages/account/instructors/edit-instructor/edit-instructor.component';
import { EditCourseComponent } from './pages/account/courses/edit-course/edit-course.component';
import { ModulesComponent } from './pages/account/courses/modules/modules.component';
import { StudentCoursesComponent } from './pages/account/student-courses/student-courses.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { InstructorCoursesComponent } from './pages/account/instructor-courses/instructor-courses.component';
import { InstructorModulesComponent } from './pages/account/instructor-courses/instructor-modules/instructor-modules.component';
import { InstructorStudentsComponent } from './pages/account/instructors/instructor-students/instructor-students.component';
import { AssessmentQuestionsComponent } from './pages/account/assessment-questions/assessment-questions.component';
import { CreateAssessmentComponent } from './pages/account/assessment-questions/create-assessment/create-assessment.component';
import { EditAssessmentComponent } from './pages/account/assessment-questions/edit-assessment/edit-assessment.component';
import { MyCoursesComponent } from './pages/account/my-courses/my-courses.component';
import { CourseDetailsComponent } from './pages/account/my-courses/course-details/course-details.component';
import { MyCourseComponent } from './pages/account/my-courses/my-course/my-course.component';
import { AsssessmentAnswersComponent } from './pages/account/asssessment-answers/asssessment-answers.component';
import { StudentAsssessmentsComponent } from './pages/account/student-asssessments/student-asssessments.component';
import { InstructorQuestionsComponent } from './pages/account/instructor-questions/instructor-questions.component';
import { MyQuestionsComponent } from './pages/account/my-questions/my-questions.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NotificationsComponent } from './pages/account/notifications/notifications.component';
import { TimetablesComponent } from './pages/account/timetables/timetables.component';
import { CreateTimetableComponent } from './pages/account/timetables/create-timetable/create-timetable.component';
import { EditTimetableComponent } from './pages/account/timetables/edit-timetable/edit-timetable.component';
import { TimetableComponent } from './pages/account/timetable/timetable.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PoliciesComponent } from './pages/account/policies/policies.component';
import { CreatePolicyComponent } from './pages/account/policies/create-policy/create-policy.component';
import { EditPolicyComponent } from './pages/account/policies/edit-policy/edit-policy.component';
import { PolicyComponent } from './pages/account/policies/policy/policy.component';
import { UserPoliciesComponent } from './pages/account/policies/user-policies/user-policies.component';
import { VleCoursesComponent } from './pages/vle-courses/vle-courses.component';
import { FrontendHeaderComponent } from './components/frontend-header/frontend-header.component';
import { VleCourseDetailsComponent } from './pages/vle-courses/vle-course-details/vle-course-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    SidebarComponent,
    LoaderComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    StudentsComponent,
    CreateStudentComponent,
    EditStudentComponent,
    SettingsComponent,
    ChangePasswordComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CoursesComponent,
    CreateCourseComponent,
    InstructorsComponent,
    CreateInstructorComponent,
    EditInstructorComponent,
    EditCourseComponent,
    ModulesComponent,
    StudentCoursesComponent,
    ResetPasswordComponent,
    InstructorCoursesComponent,
    InstructorModulesComponent,
    InstructorStudentsComponent,
    AssessmentQuestionsComponent,
    CreateAssessmentComponent,
    EditAssessmentComponent,
    MyCoursesComponent,
    CourseDetailsComponent,
    MyCourseComponent,
    AsssessmentAnswersComponent,
    StudentAsssessmentsComponent,
    InstructorQuestionsComponent,
    MyQuestionsComponent,
    PaginationComponent,
    NotificationsComponent,
    TimetablesComponent,
    CreateTimetableComponent,
    EditTimetableComponent,
    TimetableComponent,
    PrivacyPolicyComponent,
    PoliciesComponent,
    CreatePolicyComponent,
    EditPolicyComponent,
    PolicyComponent,
    UserPoliciesComponent,
    VleCoursesComponent,
    FrontendHeaderComponent,
    VleCourseDetailsComponent,
    CheckoutComponent,

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, AngularEditorModule, ReactiveFormsModule],
  providers: [provideClientHydration(), provideAnimations(), provideToastr()],
  bootstrap: [AppComponent],
})
export class AppModule {}
