import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user/user';
import { UserAuthService } from '../../service/user-auth.service';
import { SidebarComponent } from '../../pages/sidebar/sidebar/sidebar.component';
import { NavbarComponent } from '../../pages/navbar/navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, MatTabsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private userAuthService: UserAuthService, public toastr: ToastrService) { }
  employeesActiveToday = 0;
  currentlyClockedIn = 0;
  upcomingShiftsToday = 0;
  onLeaveToday = 0;
  pendingApprovals = 0;

  currentWeekHours: any = {};
  previousWeekHours: any = {};

  rosterShifts: any = {};
  actualAttendance: any = {};

  annualLeave = 0;
  sickLeave = 0;
  otherLeave = 0;

  activities: any[] = [];;
  isLoading = false;

  ngOnInit(): void {
    this.loadSummary();
    this.loadWeeklyHours();
    this.loadRosterShiftsHours();
    this.loadLeaveBreakdown();
    this.loadRecentActivity();
  }


  async loadSummary() {
    this.isLoading = true;
    try {
      const res = await this.userAuthService.getDashBoardSummary();
      this.employeesActiveToday = res.employeesActiveToday;
      this.currentlyClockedIn = res.currentlyClockedIn;
      this.upcomingShiftsToday = res.upcomingShiftsToday;
      this.onLeaveToday = res.onLeaveToday;
      this.pendingApprovals = res.pendingApprovals;

    } catch (err) {
      this.toastr.error('Failed to load leave breakdown');
    } finally {
      this.isLoading = false;
    }
  }

  async loadWeeklyHours() {
    this.isLoading = true;
    try {
      const res = await this.userAuthService.getWeaklyHrs();
      this.currentWeekHours = res.currentWeekHours;
      this.previousWeekHours = res.previousWeekHours;
    } catch (err) {
      this.toastr.error('Failed to load weekly hours');
    } finally {
      this.isLoading = false;
    }
  }

  async loadRosterShiftsHours() {
    this.isLoading = true;
    try {
      const res = await this.userAuthService.getRoasterHrs();
      this.rosterShifts = res.rosteredShifts;
      this.actualAttendance = res.actualAttendance;
    } catch (err) {
      this.toastr.error('Failed to load roster shift');
    } finally {
      this.isLoading = false;
    }
  }

  async loadLeaveBreakdown() {
    this.isLoading = true;
    try {
      const res = await this.userAuthService.getBreakDownLeave();
      this.annualLeave = res.annualLeave;
      this.sickLeave = res.sickLeave;
      this.otherLeave = res.otherLeave;

    } catch (err) {
      this.toastr.error('Failed to load leave breakdown');
    } finally {
      this.isLoading = false;
    }
  }

  async loadRecentActivity() {
    debugger
    this.isLoading = true;
    try {
      const res = await this.userAuthService.getRecentActivity();
      this.activities = res;

    } catch (err) {
      this.toastr.error('Failed to recent activity data');
    } finally {
      this.isLoading = false;
    }
  }
}