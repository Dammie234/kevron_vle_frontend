import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotComponent } from './pages/auth/forgot/forgot.component';
import { DashboardComponent } from './pages/account/dashboard/dashboard.component';
import { StudentsComponent } from './pages/account/students/students.component';
import { CreateStudentComponent } from './pages/account/students/create-student/create-student.component';
import { EditStudentComponent } from './pages/account/students/edit-student/edit-student.component';
import { SettingsComponent } from './pages/account/settings/settings.component';
import { ChangePasswordComponent } from './pages/account/change-password/change-password.component';
import { CategoriesComponent } from './pages/account/categories/categories.component';
import { CreateCategoryComponent } from './pages/account/categories/create-category/create-category.component';
import { EditCategoryComponent } from './pages/account/categories/edit-category/edit-category.component';
import { CoursesComponent } from './pages/account/courses/courses.component';
import { CreateCourseComponent } from './pages/account/courses/create-course/create-course.component';
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
import { VleCourseDetailsComponent } from './pages/vle-courses/vle-course-details/vle-course-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';



const routes: Routes = [

  {path: '', component: VleCoursesComponent, title: 'Courses'},
  {path: 'course-details/:slug', component: VleCourseDetailsComponent, title: 'Course Details' },
  {path: 'checkout', component: CheckoutComponent, title: 'Checkout'},
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotComponent },
  {path: 'change-password/:token', component: ResetPasswordComponent, title: 'Change Password'},
  {path: 'account/all-policies', component: PrivacyPolicyComponent, title: 'Privacy Policy'},

  { path: 'account/dashboard', component: DashboardComponent },
  { path: 'account/instructors', component: InstructorsComponent, title: 'Instructors'},
  {path: 'account/instructors/create', component: CreateInstructorComponent, title: 'Add Instructor'},
  {path: 'account/instructors/:id/edit', component: EditInstructorComponent, title: 'Edit Instructor'},
  { path: 'account/students', component: StudentsComponent },
  {
    path: 'account/students/create',
    component: CreateStudentComponent,
    title: 'Add Student',
  },
  {
    path: 'account/students/:id/edit',
    component: EditStudentComponent,
    title: 'Edit Student',
  },
  {
    path: 'account/settings',
    component: SettingsComponent,
    title: 'Profile Settings',
  },
  {
    path: 'account/change-password',
    component: ChangePasswordComponent,
    title: 'Change Password',
  },
  {
    path: 'account/categories',
    component: CategoriesComponent,
    title: 'Categories',
  },
  {
    path: 'account/categories/create',
    component: CreateCategoryComponent,
    title: 'Add Category',
  },
  {
    path: 'account/categories/:id/edit',
    component: EditCategoryComponent,
    title: 'Edit Category',
  },
  { path: 'account/courses', component: CoursesComponent, title: 'Courses' },
  {
    path: 'account/courses/create',
    component: CreateCourseComponent,
    title: 'Add Course',
  },
  {path: 'account/courses/:id/edit', component: EditCourseComponent, title: 'Edit Course'},
  {path: 'account/courses/:id/learning-outcomes', component: ModulesComponent, title: 'Learning Outcomes'},
  {path: 'account/student-courses', component: StudentCoursesComponent, title: 'Student Courses'},
  {path: 'account/instructor/courses', component: InstructorCoursesComponent, title: 'Instructor Courses'},
  {path: 'account/instructor/courses/:slug', component: InstructorModulesComponent, title: 'Course Details'},
  {path: 'account/instructor/students/:slug', component: InstructorStudentsComponent, title: 'Students'},
  {path: 'account/assessment-questions', component: AssessmentQuestionsComponent, title: 'Assessment Questions'},
  {path: 'account/assessment-questions/create', component: CreateAssessmentComponent, title: 'Add Assessments'},
  {path: 'account/assessment-questions/:id/edit', component: EditAssessmentComponent, title: 'Edit Assessments'},
  {path: 'account/my-courses', component: MyCoursesComponent, title: 'My Courses'},
  {path: 'account/my-courses/:slug', component: CourseDetailsComponent, title: 'Course Details'},
  {path: 'account/my-courses/course/:key', component: MyCourseComponent, title: 'Course'},
  {path: 'account/instructor/assessment-answers/:slug', component: AsssessmentAnswersComponent, title: 'Assessment Answers'},
  {path: 'account/student-assessments', component: StudentAsssessmentsComponent, title: 'Student Assessments'},
  {path: 'account/instructor/questions', component: InstructorQuestionsComponent, title: 'Questions'},
  {path: 'account/my-questions', component: MyQuestionsComponent, title: 'My Questions'},
  {path: 'account/notifications', component: NotificationsComponent, title: 'Notifications'},
  {path: 'account/timetables', component: TimetablesComponent, title: 'Timetables'},
  {path: 'account/timetables/create', component: CreateTimetableComponent, title: 'Add Timetable'},
  {path: 'account/timetables/:id/edit', component: EditTimetableComponent, title: 'Edit Timetable'},
  {path: 'account/timetable', component: TimetableComponent, title: 'Timetable'},
  {path: 'account/policies', component: PoliciesComponent, title: 'Policies'},
  {path: 'account/policies/create', component: CreatePolicyComponent, title: 'Add Policy'},
  {path: 'account/policies/:id/edit', component: EditPolicyComponent, title: 'Edit Policy'},
  {path: 'account/policy', component: PolicyComponent, title: 'Policies'},
  {path: 'account/agreed-policies', component: UserPoliciesComponent, title: 'Agreed Policies'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
