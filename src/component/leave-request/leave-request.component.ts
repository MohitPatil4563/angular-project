import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeRequestModel } from '../../models/employeeDetails';
import { UserAuthService } from '../../service/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import bootstrap from '../../main.server';
import { DropdownService } from '../../common-service/dropdown.service';
import { StorageService } from '../../common-service/storage.service';

@Component({
  selector: 'app-leave-request',
  imports: [FormsModule, CommonModule, NgbModalModule],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent implements OnInit {
  @ViewChild('leaveRequestModal') leaveRequestModal!: TemplateRef<any>;
  formData !: EmployeeRequestModel;
  isLoading = false;
  modalRef: any;
  leaveList: any[] = [];
  isModalVisible = false;
  leaveRequestList: any = [];
  
  userRole: string = '';
  constructor(private userDropdown: DropdownService, private leaveRequestService: UserAuthService, private toastr: ToastrService, private modalService: NgbModal,private  localStorage : StorageService) { }

  ngOnInit(): void {
    debugger
   this.formData = new EmployeeRequestModel();
  // this.userRole = this.leaveRequestService.getUserRole(); // 
  this.leaveRequestList = this.userDropdown.getLeaveRequestListValue();
  this.fetchLeaveRequests(); 
  // this.userRole = localStorage.getItem('roleName');
  }

  openModal() {
    this.isModalVisible = true;
    this.formData = new EmployeeRequestModel();
  }

  closeModal() {
    this.isModalVisible = false;
  }

  async onSubmit(form: any) {
    this.isLoading = true;
    try {
      await this.leaveRequestService.createLeaveRequest(this.formData);
      this.toastr.success('Leave request submitted');
      this.fetchLeaveRequests();
      this.closeModal();
    } catch (err) {
      this.toastr.error('Failed to submit leave request');
    } finally {
      this.isLoading = false;
    }
  }

  async fetchLeaveRequests() {
    this.isLoading = true;
    try {
      this.leaveList = await this.leaveRequestService.getLeaveRequests();
    } catch (err) {
      this.toastr.error('Failed to fetch leave requests');
    } finally {
      this.isLoading = false;
    }
  }
  //   async fetchLeaveRequests() {
  //   this.isLoading = true;
  //   try {
  //     if (this.userRole == 'employer') {
  //       // Employer gets only pending requests
  //       this.leaveList = await this.leaveRequestService.getPendingLeaveRequests();
  //     } else {
  //       // Employee sees their full request list
  //       this.leaveList = await this.leaveRequestService.getLeaveRequests();
  //       //  this.leaveList = await this.leaveRequestService.getPendingLeaveRequests();
  //     }
  //   } catch (err) {
  //     this.toastr.error('Failed to fetch leave requests');
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }

    async approveLeave(id: string) {
    this.isLoading = true;
    try {
      await this.leaveRequestService.approveLeaveRequest(id,'Approved');
      this.toastr.success('Leave approved');
      this.fetchLeaveRequests(); // Refresh list after approval
    } catch (err) {
      this.toastr.error('Failed to approve leave');
    } finally {
      this.isLoading = false;
    }
  }
}
