import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordModel } from '../../models/change-password';
import { UserAuthService } from '../../service/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../../common-service/storage.service';
@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  isLoading: boolean = false;
  forgotPasswordData!: ForgotPasswordModel;
  constructor(public userService: UserAuthService, public toastr: ToastrService, private router: Router, private localStorage: StorageService) { }

  ngOnInit(): void {
    this.forgotPasswordData = new ForgotPasswordModel();
    const savedEmail = this.localStorage.getItem('email');
    if (savedEmail) {
      this.forgotPasswordData.email = savedEmail;
    }
  }
  async sendResetToken() {
    debugger
    try {
      this.isLoading = true;
      const response = await this.userService.forgotPassword(this.forgotPasswordData.email);


      console.log('Reset response:', response.data);

      this.toastr.success(response.data.message || 'Token sent to your email', 'Success');
      this.forgotPasswordData = { email: this.forgotPasswordData.email };
      this.router.navigate(['create-new-password'], {
        queryParams: {
          token: response.data.token,
          email: this.forgotPasswordData.email   // Email from form input
        }
      });
    } catch (error: any) {
      console.error('Reset token error:', error);
      this.toastr.error(error.message, 'error');
    } finally {
      this.isLoading = false;
    }
  }

}
