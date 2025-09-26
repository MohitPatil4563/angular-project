import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployerProfileComponent } from '../employer-profile/employer-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { TimeZoneComponent } from '../time-zone/time-zone/time-zone.component';
import { CreatePinComponent } from '../create-pin/create-pin/create-pin.component';
import { UserAuthService } from '../../service/user-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting',
  imports: [MatTabsModule, EmployerProfileComponent, TimeZoneComponent, CreatePinComponent, CommonModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {
 profileData: any = {};
  constructor(private userAuthService: UserAuthService) { }
ngOnInit(): void {
  this.loadProfile();
}
   async loadProfile() {
    try {

      const response = await this.userAuthService.getProfile();
      this.profileData = { ...response.data };
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
    }
  }
}
