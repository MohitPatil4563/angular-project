import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../common-service/storage.service';
import { UserAuthService } from '../../../service/user-auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  profileData: any = {};
  constructor(private router: Router, private userAuthService: UserAuthService) { }
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


  logoutAction() {
    this.userAuthService.logout();
    this.router.navigateByUrl('/login');
  }
}
