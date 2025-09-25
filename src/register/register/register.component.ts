import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/user-auth.service';
// import { StorageService } from '../../service/local-storage.service';
import { RegisterModel } from '../../models/register';
import { LoginComponent } from '../../login/login/login.component';
 import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerFormData!: RegisterModel;
  isSubmitting:boolean = false;
   isLoading: boolean = false; // Spinner flag
  cars:any=[];
  constructor(public userAuthService: UserAuthService, private router: Router,private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.registerFormData = new RegisterModel();
  }
  
// registerAction() {
//   this.isSubmitting = true;

//   this.userAuthService.register(this.registerFormData).subscribe({
//     next: (data) => {
//       this.storageService.setItem('token', data.token);
//       this.router.navigateByUrl('/dashboard');
//     },
//     error: (error) => {
//       this.isSubmitting = false;
//       this.validationErrors = error.error?.message || "Invalid Data";
//     }
//   });
// }
//  registerAction() {
//   if (
//     !this.registerFormData.firstName ||
//     !this.registerFormData.lastName ||
//      !this.registerFormData.email||
//      !this.registerFormData.password ||
//     !this.registerFormData.role
//   ) {
//     alert('Please fill all required fields.');
//     return;
//   }

//   const body = {
//     firstName: this.registerFormData.firstName,
//     lastName: this.registerFormData.lastName,
//     email: this.registerFormData.email,
//     password: this.registerFormData.password,
//     role: this.registerFormData.role,
//     phoneNumber: this.registerFormData.phoneNumber,
//     streetAddress: this.registerFormData.streetAddress,
//     suburb: this.registerFormData.suburb,
//     postcode: this.registerFormData.postcode
//   };

//   this.userAuthService.register(body)
//     .then(({ data }) => {
//       this.storageService.setItem('token', data.token);
//       this.router.navigate([`/login`]);
//     })
//     .catch(() => {
//       // alert("Invalid Data");
//     });
// }
registerAction() {
  if (!this.registerFormData.firstName) {
    this.toastr.error("Please fill First name field");
    return;
  }
  if (!this.registerFormData.lastName) {
    this.toastr.error("Please fill Last name field");
    return;
  }
  if (!this.registerFormData.password) {
    this.toastr.error("Please fill Password field");
    return;
  }
  if (!this.registerFormData.email) {
    this.toastr.error("Please fill Email field");
    return;
  }
  if (!this.registerFormData.role) {
    this.toastr.error("Please select Role");
    return;
  }
this.isLoading = true;
  const body = {
    firstName: this.registerFormData.firstName,
    lastName: this.registerFormData.lastName,
    email: this.registerFormData.email,
    password: this.registerFormData.password,
    role: this.registerFormData.role,
    phoneNumber: this.registerFormData.phoneNumber,
    streetAddress: this.registerFormData.streetAddress,
    suburb: this.registerFormData.suburb,
    postcode: this.registerFormData.postcode
  };

  this.userAuthService.register(body)
    .then(({ data }) => {
      this.isLoading = true;
      this.toastr.success('Registration successful!');
      this.router.navigateByUrl('/login');
    })
    .catch(() => {
      this.isLoading = false;;



      this.toastr.error('Registration failed');
    });
}

}