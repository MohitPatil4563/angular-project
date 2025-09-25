import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../service/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../../common-service/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-employer-request',
  imports: [CommonModule, NgbModalModule],
  templateUrl: './leave-employer-request.component.html',
  styleUrl: './leave-employer-request.component.css'
})
export class LeaveEmployerRequestComponent implements OnInit {
  isLoading = false;              
  approvingId: string | null = null; 
  leavePendingRequestList: any[] = [];
  leaveRequestList: any = [];

  constructor(
    private leaveRequestService: UserAuthService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private localStorage: StorageService
  ) { }

  ngOnInit(): void {
    this.fetchLeaveRequests();
  }

  async fetchLeaveRequests() {
    this.isLoading = true;
    try {
      this.leavePendingRequestList = await this.leaveRequestService.getPendingLeaveRequests();
    } catch (err) {
      this.toastr.error('Failed to fetch leave requests');
    } finally {
      this.isLoading = false;
    }
  }

  async approveLeave(id: string) {
    this.approvingId = id; 
    try {
      await this.leaveRequestService.approveLeaveRequest(id, 'Approved');
      this.toastr.success('Leave approved');
      this.fetchLeaveRequests(); 
    } catch (err) {
      this.toastr.error('Failed to approve leave');
    } finally {
      this.approvingId = null;
    }
  }
}
