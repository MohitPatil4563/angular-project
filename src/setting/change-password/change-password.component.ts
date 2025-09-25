import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../service/user-auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangePasswordModel, ForgotPasswordModel } from '../../models/change-password';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule,FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  isLoading :boolean =false;
  isEdited :boolean =false;
  formData! : ChangePasswordModel;
  forgotPasswordData! : ForgotPasswordModel;
  showCurrentPassword = false;
  showPassword = false;
  showConfirmPassword = false;
  passType: string = 'password';
  showPasswordForm = false;
  constructor(public userService: UserAuthService,public toastr: ToastrService){
  }

  ngOnInit(): void {
    this.formData  = new ChangePasswordModel();
    this.forgotPasswordData = new ForgotPasswordModel();
  }

  async passwordChange(){
      if (this.formData.newPassword !== this.formData.confirmPassword) {
      this.toastr.error("New password and confirm password do not match", "Error");
      return;
    }
      if (this.formData.newPassword != null && this.formData.newPassword =='' ) {
      this.toastr.error("The New Password field is required", "Error");
      return;
    }
      if (this.formData.confirmPassword != null && this.formData.confirmPassword =='' ) {
      this.toastr.error("The Confirm Password field is required", "Error");
      return;
    }
    try{
      debugger
      this.isLoading = true;
      const response = await this.userService.changePassword(this.formData);
      this.toastr.success(response.data.message, 'Success');
      // this.formData = { ...response.data };
    }
    catch (error:any) {
    this.toastr.error(error.message, 'error');

    } finally {
      this.isLoading = false;
    }
  }
 async sendResetToken() {
  debugger
  try {
    this.isLoading = true;
    const response = await this.userService.forgotPassword(this.forgotPasswordData.email);

   
    console.log('Reset response:', response.data);

    this.toastr.success(response.data.message || 'Token sent to your email', 'Success');

    this.showPasswordForm = true;
    this.forgotPasswordData = { email: this.forgotPasswordData.email };
  } catch (error: any) {
    console.error('Reset token error:', error);
    this.toastr.error(error.message, 'error');
  } finally {
    this.isLoading = false;
  }
}

    cancelReset() {
    this.showPasswordForm = false;
    this.formData = {
      token :this.formData.token,
      email: this.formData.email, // preserve email
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
   onClickShowCurrentPassword() {
    if (this.passType == 'password') {
      this.passType = 'text';
      this.showCurrentPassword = true;
    } else {
      this.passType = 'password';
      this.showCurrentPassword = false;
    }
  }
 onClickShowPassword() {
    if (this.passType == 'password') {
      this.passType = 'text';
      this.showPassword = true;
    } else {
      this.passType = 'password';
      this.showPassword = false;
    }
  }

  onClickShowConfirmPassword() {
    if ( this.passType == 'password') {
      this.passType= 'text';
      this.showConfirmPassword = true;
    } else {
      this.passType = 'password';
      this.showConfirmPassword = false;
    }
  }
}
