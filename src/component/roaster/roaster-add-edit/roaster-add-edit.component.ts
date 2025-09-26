import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthService } from '../../../service/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../../common-service/storage.service';
import { RoasterModel } from '../../../models/roaster';
import { DropdownService } from '../../../common-service/dropdown.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roaster-add-edit',
  imports: [FormsModule, CommonModule, NgbModalModule,PaginationModule],
  templateUrl: './roaster-add-edit.component.html',
  styleUrl: './roaster-add-edit.component.css'
})
export class RoasterAddEditComponent implements OnInit {
  roasters: any[] = [];            
  timeZoneList: any = [];

  modalOpen: boolean = false;
  isEditMode: boolean = false;
  isLoading: boolean = false;

  roasterFormData: RoasterModel = {
    userIds: [],
    startDate: '',
    endDate: '',
    dates: [],
    startTimes: [],
    endTimes: [],
    timeZone: '',
    includeDays: [],
    shiftName: ''
  };

  employees: any[] = [];

  maTableRoster = {
  pageSizeList: [10,20,30,50],
  maxLinkSize: 5,
  setCurrentPage: 1,
  paging: {
    pageSize: 10,
    totalItems: 0
  }
};
  constructor(
    private userDropdown: DropdownService,
    private userAuth: UserAuthService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private localStorage: StorageService
  ) { }

  ngOnInit() {
    this.roasterFormData = new RoasterModel();
    this.loadRoasters();
    this.timeZoneList = this.userDropdown.getTimeZoneValue();
    this.loadEmployees();
  }

   openModal(edit = false, id: string = '') {
    this.roasterFormData = new RoasterModel(); 
    this.modalOpen = true;
    // Ensure at least one empty field is available
    this.roasterFormData.userIds.push('');
    this.roasterFormData.dates.push('');
    this.roasterFormData.startTimes.push('');
    this.roasterFormData.endTimes.push('');
    this.roasterFormData.includeDays.push(0);
  }

  async loadRoasters() {
    const page = this.maTableRoster.setCurrentPage;
    const pageSize = this.maTableRoster.paging.pageSize;
    this.isLoading = true;
    try {
      const res = await this.userAuth.getRosters(page, pageSize);

      this.roasters = res.data.items;
      this.roasterFormData = res.data.items;
      this.maTableRoster.paging.totalItems = res.data.totalCount;
    } catch (err) {
      this.toastr.error('Failed to load employees');
    }

    this.isLoading = false;
  }

  maTableEventRoster(event: any, type: string) {

    if (type === 'PageChanged') {
      this.maTableRoster.setCurrentPage = event.page;
      this.loadRoasters();
    }

    if (type === 'PageSizeChanged') {
      this.maTableRoster.setCurrentPage = 1;
      this.loadRoasters();
    }
  }

  

 


  closeModal() {
    this.modalOpen = false;
  }

  async loadEmployees() {
    try {
      const res = await this.userAuth.getAllEmployees();
      this.employees = res.items;
    } catch (err) {
      console.error('Failed to load employees', err);
    }
  }
 
async onSubmit(form: any) {
  if (form.invalid) return;

  this.isLoading = true;

  try {
    const payload = {
      userIds: this.roasterFormData.userIds.filter(x => x),  
      dates: this.roasterFormData.dates.filter(x => x),    
      startTimes: this.roasterFormData.startTimes.filter(x => x),
      endTimes: this.roasterFormData.endTimes.filter(x => x),
      timeZone: this.roasterFormData.timeZone,
      shiftName: this.roasterFormData.shiftName,
      includeDays: this.roasterFormData.includeDays.filter(d => d !== null && d !== undefined)
    };

    console.log('Payload to API:', payload);

    await this.userAuth.createRoster(payload);

    this.closeModal();
    this.toastr.success('Roster saved successfully');
    await this.loadRoasters();

  } catch (err) {
    console.error(err);
    this.toastr.error('Error saving roster');
  } finally {
    this.isLoading = false;
  }
}


    async deleteRoster(id: string) {
    const result = await Swal.fire({
      position: 'top',
      title: 'Are you sure?',
      // text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      
    });
  
    if (result.isConfirmed) {
      this.isLoading = true;
  
      try {
        const response = await this.userAuth.deleteRoster(id);
        this.toastr.success(response.message, 'Success');
        await this.loadRoasters();
        await Swal.fire('Deleted!', 'Roster has been deleted.', 'success');
      } catch (error: any) {
        this.toastr.error(error.message || 'Something went wrong');
      }
  
      this.isLoading = false;
    }
  }


  // Array helpers
  addUserId() 
  { this.roasterFormData.userIds.push(''); 

  }

  removeUserId(i: number) 
  { this.roasterFormData.userIds.splice(i, 1); 

  }

  addDate() 
  { this.roasterFormData.dates.push('');

   }
  removeDate(i: number) 
  { this.roasterFormData.dates.splice(i, 1); 

  }

  addStartTime()
   { this.roasterFormData.startTimes.push(''); 

   }
  removeStartTime(i: number) 
  { this.roasterFormData.startTimes.splice(i, 1); 

  }

  addEndTime()
   { this.roasterFormData.endTimes.push(''); 

   }
  removeEndTime(i: number) 
  { this.roasterFormData.endTimes.splice(i, 1); 
    
  }

  addIncludeDay() {
  this.roasterFormData.includeDays.push(0); // default number 0
}

// Remove a specific includeDay
removeIncludeDay(i: number) {
  this.roasterFormData.includeDays.splice(i, 1);
}
}

