import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../service/user-auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.css'
})
export class EmployerProfileComponent implements OnInit {
  profileData: any = {};
  originalData: any = {}; 
   isLoading: boolean = false;
  isEditMode: boolean = false;
   constructor(private authService: UserAuthService,public toastr: ToastrService,public router :Router) {}

   ngOnInit(){
    this.loadProfile();
   }
    async loadProfile() {
    try {
      this.isLoading = true;
      const response = await this.authService.getProfile();
      this.profileData = { ...response.data }; 
      this.originalData = { ...response.data };
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      this.isLoading = false;
    }
  }

  enableEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.profileData = { ...this.originalData };
    this.isEditMode = false;
  }

  async updateProfile() {
    try {
      this.isLoading = true;
      const response = await this.authService.updateProfile(this.profileData);
      this.toastr.success(response.data.message, 'Success');
      this.originalData = { ...this.profileData }; // Update original
      this.isEditMode = false;
      
    } catch (error) {
      this.toastr.error("Failed to update profile!");
    } finally {
      this.isLoading = false;
    }
  }
    enableEditMode() {
    this.isEditMode = true;
  }
}
