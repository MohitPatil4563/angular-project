import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login/login.component';
import { RegisterComponent } from '../register/register/register.component';
// import { DashboardComponent } from '../dashbaord/dashboard/dashboard.component';
import { OtpComponent } from '../otp/otp/otp.component';
import { authGuard } from '../auth-gaurd/auth.guard';
import { NavbarComponent } from '../pages/navbar/navbar/navbar.component';
import { EmployerProfileComponent } from '../setting/employer-profile/employer-profile.component';
import { LayoutComponent } from '../layout/layout/layout.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { SettingComponent } from '../setting/setting/setting.component';
import { TimeZoneComponent } from '../setting/time-zone/time-zone/time-zone.component';
import { CreatePinComponent } from '../setting/create-pin/create-pin/create-pin.component';
import { ForgotPasswordComponent } from '../auth-page/forgot-password/forgot-password.component';
import { NewPasswordComponent } from '../auth-page/create-new-password/new-password/new-password.component';
import { EmployeeComponent } from '../component/employee/employee/employee.component';
import { LeaveRequestComponent } from '../component/leave-request/leave-request.component';
import { LeaveEmployerRequestComponent } from '../component/leave-employer-request/leave-employer-request/leave-employer-request.component';
import { RoasterAddEditComponent } from '../component/roaster/roaster-add-edit/roaster-add-edit.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'create-new-password', component: NewPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'otp-verify', component: OtpComponent },
  {
    path: 'layout', component: LayoutComponent, canActivate: [authGuard],
    children: [
      { path: 'nav-bar', component: NavbarComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'leave-request', component: LeaveRequestComponent },
     { path: 'leave-pending-request', component: LeaveEmployerRequestComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'roaster', component: RoasterAddEditComponent },
      { path: 'setting-page', component: SettingComponent },

    ],
  },


];
