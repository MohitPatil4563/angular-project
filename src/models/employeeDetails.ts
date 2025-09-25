export class EmployeeDetailsModel {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  streetAddress: string = '';
  suburb: string = '';
  postcode: string = '';
  // standardShiftStartTime: string = '';
  // standardShiftEndTime: string = ''
}

export class EmployeeRequestModel {
  leaveType: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
}