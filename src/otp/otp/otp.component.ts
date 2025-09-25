import { Component, OnInit } from '@angular/core';
import { OtpVerify } from '../../models/otp-verify';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {
  formData!:OtpVerify;

  constructor(public userAuthService: UserAuthService, private router: Router){}


   ngOnInit(): void {
    this.formData = new OtpVerify();
    // if(this.storageService.getItem('token') != "" && this.storageService.getItem('token') != null){
    //   this.router.navigateByUrl('/otp-verify')
    // }
  }
  verifyOtp(){
    debugger
    const tempToken = localStorage.getItem('token');
        let body ={
      "otp": this.formData.otp,
      "tempToken": tempToken
   }
    this.userAuthService.otp_Verify(body)
    .then(({data}) => {
      this.router.navigateByUrl('/layout')
      return data
    }).catch(error => {
      alert("Invalid Data");
        return error

    })
  }
}
