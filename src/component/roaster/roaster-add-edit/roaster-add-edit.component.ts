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
@Component({
  selector: 'app-roaster-add-edit',
  imports: [FormsModule, CommonModule, NgbModalModule],
  templateUrl: './roaster-add-edit.component.html',
  styleUrl: './roaster-add-edit.component.css'
})
export class RoasterAddEditComponent implements OnInit {

 roasters: any[] = [];             // roster list
  // roasterFormData: RoasterModel = new RoasterModel();
  timeZoneList :any = [];

  modalOpen: boolean = false;
  isEditMode: boolean = false;
  isLoading: boolean = false;
  editIndex: number | null = null; 
   roasterFormData: RoasterModel =  {
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
  constructor(private userDropdown : DropdownService,private userAuth: UserAuthService, private toastr: ToastrService, private modalService: NgbModal,private  localStorage : StorageService) { }
   ngOnInit() {
    this.roasterFormData = new  RoasterModel();
    this.loadRoasters();
    this.timeZoneList = this.userDropdown.getTimeZoneValue();
    this.loadEmployees();
   }

    loadRoasters(): void {
      debugger
    this.isLoading = true;
    this.userAuth.getRosters(1, 100).then(data => {
      this.roasters = data; 
      this.isLoading = false;
    }).catch(() => this.isLoading = false);
  }

  /**  Open modal for Add/Edit */
 openModal() {
    this.roasterFormData = new RoasterModel(); // reset form
    this.modalOpen = true;
  }

  //  Close modal
  closeModal() {
    this.modalOpen = false;
  }

   async loadEmployees() {
    try {
      const res = await this.userAuth.getAllEmployees();
    this.employees = res.items ;
    } catch (err) {
      console.error('Failed to load employees', err);
    }
  }

//  async createRoster() {
//   debugger
//     this.isLoading = true;

//     try {
//       // build dates array from startDate for API
//      this.rosterData.dates = [this.rosterData.startDate, this.rosterData.endDate];

//       const result = await this.userAuth.createRoster(this.rosterData);
//       console.log('Roster created:', result);
//     } catch (err) {
//       console.error('Failed to create roster', err);
//     } finally {
//       this.isLoading = false;
//     }
//   }
  //  Submit form (create only)
  async onSubmit(form: any) {
    if (form.invalid) return;

    this.isLoading = true;
    try {
       this.roasterFormData.dates = [this.roasterFormData.startDate, this.roasterFormData.endDate];
            const result = await this.userAuth.createRoster(this.roasterFormData);
      await this.userAuth.createRoster(this.roasterFormData);
      // await this.loadRoasters(); 
      this.closeModal();
      alert('Roster saved successfully ✅');
    } catch (err) {
      console.error(err);
      alert('Error saving roster ❌');
    } finally {
      this.isLoading = false;
    }
  }

  onIncludeDaysChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.value) {
    this.roasterFormData.includeDays = input.value.split(',').map(Number);
  } else {
    this.roasterFormData.includeDays = [];
  }
}

}
