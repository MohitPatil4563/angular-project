import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimeZoneModel } from '../../../models/time-zone';
import { FormsModule } from '@angular/forms';
import { TimeZone_API } from '../../../API';
import axios from 'axios';
import { DropdownService } from '../../../common-service/dropdown.service';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from '../../../service/user-auth.service';

@Component({
  selector: 'app-time-zone',
  imports: [CommonModule,FormsModule],
  templateUrl: './time-zone.component.html',
  styleUrl: './time-zone.component.css'
})
export class TimeZoneComponent implements OnInit {
  timeZoneList :any = [];
  timeZoneFormData !: TimeZoneModel;
  isLoading :boolean = false;
  constructor(private userDropdown : DropdownService,public toastr: ToastrService){}
  ngOnInit(): void {
    this.timeZoneFormData = new TimeZoneModel();
    this.timeZoneList = this.userDropdown.getTimeZoneValue();
    this.getUserTimeZone();
  }

 async updateTimeZone() {
    this.isLoading = true;
    debugger
    const apiUrl = TimeZone_API;
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await axios.put(apiUrl, this.timeZoneFormData, { headers });
      this.toastr.success(response.data.message, 'Success');
    } catch (error:any) {
      this.toastr.success(error, 'error')
    } finally {
      this.isLoading = false;
    }
  }
  getUserTimeZone() {
  const token = localStorage.getItem('token');

  axios.get(TimeZone_API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    this.timeZoneFormData.timezoneId = response.data.timezoneId || 'UTC';
  }).catch(error => {
    console.error('Error fetching time zone:', error);
  });
}
}
