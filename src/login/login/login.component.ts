import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/user-auth.service';
import { LoginModel } from '../../models/login';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../common-service/storage.service';
import { LoginPinModel } from '../../models/change-password';
// import { LoginPinModel } from '../../models/change-password';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginFormData!: LoginModel;
  isSubmitting: boolean = false
  isLoading: boolean = false;
  viaPinLoginData !: LoginPinModel;
  showPassword = false;
  showPassPinLogin = false;
  passType: string = 'password';
  isPinLogin: boolean = false;
  profileData: any = {};
  constructor(private route: ActivatedRoute, public userAuthService: UserAuthService, private router: Router, public toastr: ToastrService, private localStorage: StorageService) { }

  ngOnInit(): void {
    this.loginFormData = new LoginModel();
    this.viaPinLoginData = new LoginPinModel();
    // this.loadProfile();
    // this.isPinLogin = this.route.snapshot.queryParamMap.get('mode') === 'pin';
  }


  loginAction() {
    if (this.isPinLogin) {
      this.loginWithPin();
    } else {
      this.loginWithPassword();
    }
  }

 loginWithPassword() {
  const body = {
    emailOrMobile: this.loginFormData.emailOrMobile,
    password: this.loginFormData.password
  };

  this.isLoading = true;

  this.userAuthService.login(body)
    .then(async ({ data }) => {
      if (data.requiresOtp === true) {
        this.localStorage.setItem('token', data.tempToken);
        this.router.navigateByUrl('/otp-verify');
        this.toastr.success(data.message);
      } else {
        this.localStorage.setItem('token', data.token);
        this.localStorage.setItem('email', body.emailOrMobile);

        // fetch profile after login
        const profileRes = await this.userAuthService.getProfile();
        this.profileData = profileRes.data;

        if (this.profileData.roleName === 'Employer') {
          this.router.navigateByUrl('/layout/dashboard');   // Employer → Dashboard
        } else {
          this.router.navigateByUrl('/layout/leave-request'); // Others → Leave request
        }

        this.toastr.success("Login successfully");
      }
    })
    .catch(() => {
      this.toastr.error("Invalid credentials");
    })
    .finally(() => {
      this.isLoading = false;
    });
}

async loginWithPin() {
  this.isLoading = true;
  const body = {
    emailOrMobile: this.viaPinLoginData.emailOrMobile,
    pin: this.viaPinLoginData.pin
  };

  this.userAuthService.viaPinLogin(body)
    .then(async ({ data }) => {
      this.localStorage.setItem('token', data.token.token);
      this.localStorage.setItem('email', body.emailOrMobile);

      // fetch profile after pin login
      const profileRes = await this.userAuthService.getProfile();
      this.profileData = profileRes.data;

      if (this.profileData.roleName === 'Employer') {
        this.router.navigateByUrl('/layout/dashboard');   // Employer → Dashboard
      } else {
        this.router.navigateByUrl('/layout/leave-request'); // Others → Leave request
      }

      this.toastr.success(data.message);
    })
    .catch(() => {
      this.toastr.error("Invalid credentials");
    })
    .finally(() => {
      this.isLoading = false;
    });
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
  onClickShowPasswordWihPin() {
    if (this.passType == 'password') {
      this.passType = 'text';
      this.showPassPinLogin = true;
    } else {
      this.passType = 'password';
      this.showPassPinLogin = false;
    }
  }



}

