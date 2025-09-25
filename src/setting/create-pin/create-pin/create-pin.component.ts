import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatePinModel, LoginPinModel } from '../../../models/change-password';
import { UserAuthService } from '../../../service/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../common-service/storage.service';

@Component({
  selector: 'app-create-pin',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './create-pin.component.html',
  styleUrl: './create-pin.component.css'
})
export class CreatePinComponent implements OnInit {
  createPinData !: CreatePinModel;
  viaPinLoginData !: LoginPinModel;
  isCreatePinForm: boolean = false;
  isLoading: boolean = false;
   isEditing: boolean = false;
    originalData!: CreatePinModel;
  constructor(private userService: UserAuthService, private toastr: ToastrService, public router: Router,private localStorage : StorageService) { }

  ngOnInit(): void {
    debugger
    this.createPinData = new CreatePinModel();
    this.viaPinLoginData = new LoginPinModel();
     this.originalData = { ...this.createPinData };
    const savedEmail =  this.localStorage.getItem('email');
     if (savedEmail) {
    this.createPinData.emailOrMobile = savedEmail;
  }
  
  }

// createPinAdd() {
//   this.isLoading = true;

//   const data = {
//     emailOrMobile: this.localStorage.getItem('email'),
//     pin: this.createPinData.pin
//   };

//   this.userService.createPin(data)
//     .then((response) => {
//       this.toastr.success(response?.data?.message);
//       this.router.navigate(['/login'], { queryParams: { mode: 'pin' } }); // Go to PIN login
//     })
//     .catch((error) => {
//       this.toastr.error(error?.response?.data?.message || "Error");
//     })
//     .finally(() => {
//       this.isLoading = false;
//     });
// }
 createPinAdd() {
    this.isLoading = true;

    const data = {
      emailOrMobile: this.createPinData.emailOrMobile,
      pin: this.createPinData.pin
    };

    this.userService.createPin(data)
      .then((response) => {
        this.toastr.success(response?.data?.message);
        this.originalData = { ...this.createPinData };
        this.isEditing = false;
        // this.router.navigate(['/login'], { queryParams: { mode: 'pin' } });
      })
      .catch((error) => {
        this.toastr.error(error?.response?.data?.message || "Error");
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  enableEditing() {
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.createPinData = { ...this.originalData };
  }
}
