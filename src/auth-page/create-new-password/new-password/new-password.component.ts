import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../../service/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordModel } from '../../../models/change-password';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../common-service/storage.service';

@Component({
  selector: 'app-new-password',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent implements OnInit {
   formData! : ChangePasswordModel;
   isLoading :boolean = false;
  showPassword = false;
  showConfirmPassword = false;
  passType: string = 'password';
  showCurrentPassword = false;
  constructor(private route: ActivatedRoute,public userService: UserAuthService,private toastr: ToastrService,private localStorage : StorageService,private router :Router){
    }

  ngOnInit(): void {
    debugger
     this.formData  = new ChangePasswordModel();
  //    const savedEmail =  this.localStorage.getItem('email');
  //    if (savedEmail) {
  //    this.formData.email = savedEmail;
  // }
   this.route.queryParams.subscribe(params => {
    const token = params['token'];
    const email = params['email'];

    if (token && email) {
      this.formData.token = token;
      this.formData.email = email;

      this.localStorage.setItem('resetToken', token);
      this.localStorage.setItem('resetEmail', email);
    } else {
    
      this.formData.token = this.localStorage.getItem('resetToken') || '';
      this.formData.email = this.localStorage.getItem('resetEmail') || '';
    }
  });
  }
 async passwordChange() {
  if (!this.formData.newPassword || !this.formData.confirmPassword) {
    this.toastr.error("All password fields are required", "Error");
    return;
  }

  if (this.formData.newPassword !== this.formData.confirmPassword) {
    this.toastr.error("New password and confirm password do not match", "Error");
    return;
  }
 const payload = {
    email: this.formData.email,
    token: this.formData.token,
    newPassword: this.formData.newPassword,
    confirmPassword: this.formData.confirmPassword,
    currentPassword: this.formData.currentPassword
  };
  try {
    this.isLoading = true;
    const response = await this.userService.changePassword(payload);

    this.toastr.success(response.data.message, 'Success');
    this.router.navigate(['/layout/dashboard']); 
  } catch (error: any) {
    this.toastr.error(error.message, 'Error');
  } finally {
    this.isLoading = false;
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
  onClickShowCurrentPassword() {
    if (this.passType == 'password') {
      this.passType = 'text';
      this.showCurrentPassword = true;
    } else {
      this.passType = 'password';
      this.showCurrentPassword = false;
    }
  }
}
