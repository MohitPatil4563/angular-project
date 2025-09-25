import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../service/user-auth.service';
import { EmployeeDetailsModel } from '../../../models/employeeDetails';
import { ToastrService } from 'ngx-toastr';
import { RegexValidation } from '../../../constant/validation';
import { Messages } from '../../../constant/message';
import Swal from 'sweetalert2';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-employee',

  imports: [CommonModule, FormsModule,PaginationModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  @ViewChild('employeeFormModal') employeeFormModal!: TemplateRef<any>;
  employeeFormData !: EmployeeDetailsModel;
  employees: any[] = [];
  maTableEmployee = {
  pageSizeList: [10, 20, 40, 50],
  maxLinkSize: 5,
  setCurrentPage: 1,
  paging: {
    pageSize: 10,
    totalItems: 0
  }
};
  modalOpen = false;
  editEmployeeId = '';
  isLoading = false;
  isEditMode = false;
  regexValidation = RegexValidation;
  messages = Messages;
  constructor(private employeeService: UserAuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.employeeFormData = new EmployeeDetailsModel();
    this.loadEmployees();
  }

  async loadEmployees() {
  const page = this.maTableEmployee.setCurrentPage;
  const pageSize = this.maTableEmployee.paging.pageSize;

  this.isLoading = true;

  try {
    const res = await this.employeeService.getAllEmployees(page, pageSize);

    this.employees = res.items ;
    this.maTableEmployee.paging.totalItems = res.totalCount;
  } catch (err) {
    this.toastr.error('Failed to load employees');
  }

  this.isLoading = false;
}
maTableEventEmployee(event: any, type: string) {
  
  if (type === 'PageChanged') {
    this.maTableEmployee.setCurrentPage = event.page;
    this.loadEmployees();
  }

  if (type === 'PageSizeChanged') {
    this.maTableEmployee.setCurrentPage = 1;
    this.loadEmployees();
  }
}


  openModal(edit = false, id: string = '') {
    this.modalOpen = true;
    this.isEditMode = edit;

    if (edit && id) {
      this.editEmployeeId = id;
      this.fetchEmployeeDetails(id);
    } else {
      this.resetFormData();
    }
  }

  closeModal() {
    this.modalOpen = false;
    this.isEditMode = false;
    this.editEmployeeId = '';
    this.resetFormData();
  }

  resetFormData() {
    this.employeeFormData = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      streetAddress: '',
      suburb: '',
      postcode: ''
    };
  }

  async fetchEmployeeDetails(id: string) {
    try {
      debugger
      const res = await this.employeeService.getEmployeeDetails(id);
      this.employeeFormData = res.data;
    } catch (err) {
      this.toastr.error('Failed to fetch employee details');
    }
  }

  async onSubmit(form: NgForm) {
 this.isLoading = true;
 if (this.employeeFormData.firstName != null && this.employeeFormData.firstName == '') {
      this.toastr.error(this.messages.PleaseEnterFirstName, "Error");
      return;
    }
  if (this.employeeFormData.lastName != null && this.employeeFormData.lastName == '') {
      this.toastr.error(this.messages.PleaseEnterLastName, "Error");
      return;
    }
    if (this.employeeFormData.email != null && this.employeeFormData.email == '') {
      this.toastr.error(this.messages.EmailRequired, "Error");
      return;
    }
    if (!this.regexValidation.EmailPattern.test(this.employeeFormData.email)) {
      this.toastr.error(this.messages.InvalidEmail, "Error");
      return;
    }
     if (this.employeeFormData.phoneNumber != null && this.employeeFormData.phoneNumber == '') {
      this.toastr.error(this.messages.PleaseEnterYourPhoneNumber, "Error");
      return;
    }
    try {
      if (this.isEditMode) {
        debugger
       
       const res= await this.employeeService.updateEmployee(this.editEmployeeId, this.employeeFormData);
        this.toastr.success(res.message,"Success");
      } else {
         const res = await this.employeeService.createEmployee(this.employeeFormData);
         this.toastr.success(res.message,"Success");
      }
      this.loadEmployees();
      this.closeModal();
    } catch (err :any) {
      this.toastr.error(err.error ,"Error");
    }

    this.isLoading = false;
  }

  // async deleteEmployee(id: string) {
  //   this.isLoading = true;
  //   try {
  //     const response = await this.employeeService.deleteEmployee(id);
  //     this.toastr.success(response.message, "Success");
  //     this.loadEmployees();
  //   } catch (error: any) {
  //     this.toastr.error(error.message,);
  //   }
  //   this.isLoading = false;
  // }
  async deleteEmployee(id: string) {
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
      const response = await this.employeeService.deleteEmployee(id);
      this.toastr.success(response.message, 'Success');
      await this.loadEmployees();

     
      await Swal.fire('Deleted!', 'Employee has been deleted.', 'success');

    } catch (error: any) {
      this.toastr.error(error.message || 'Something went wrong');
    }

    this.isLoading = false;
  }
}

  // changePage(offset: number) {
  //   const nextPage = this.currentPage + offset;
  //   if (nextPage >= 1 && nextPage <= this.totalPages) {
  //     this.loadEmployees(nextPage);
  //   }
  // }
//   changePage(offset: number) {
//   const nextPage = this.currentPage + offset;
//   if (nextPage >= 1 && nextPage <= this.totalPages) {
//     this.loadEmployees(nextPage);
//   }
// }
// onPageSizeChange(newLimit: number) {
//   this.limit = +newLimit;
//   this.currentPage = 1;
//   this.loadEmployees();
// }
}
