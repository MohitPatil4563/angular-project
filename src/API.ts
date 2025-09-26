import { environment } from "./environment/environment";

// Authentication
export const Register_API = environment.BaseURL +   `/api/Auth/register`;
export const Login_API = environment.BaseURL +   `/api/Auth/login`;
export const Verify_OTP_API = environment.BaseURL +   `/api/Auth/verify-otp`;
export const Create_Pin_API = environment.BaseURL +   `/api/Auth/create-pin`;
export const Create_Pin_Login_API = environment.BaseURL +   `/api/Auth/pin-login`;
export const Forgot_Password_API = environment.BaseURL +   `/api/Auth/forgot-password`;
export const Reset_Password_API = environment.BaseURL +   `/api/Auth/reset-password`;
export const Google_Login_API = environment.BaseURL +   `/api/Auth/google-login`;
export const Google_Response_API = environment.BaseURL +   `/api/Auth/google-response`;

//Dashboard
export const Dashboard_Summary_API = environment.BaseURL +   `/api/Dashboard/summary`;
export const Weekly_Horus_API = environment.BaseURL +   `/api/Dashboard/weekly-hours`;
export const Roster_Attendance_API = environment.BaseURL +   `/api/Dashboard/roster-attendance`;
export const Leave_Breakdown_API = environment.BaseURL +   `/api/Dashboard/leave-breakdown`;
export const Recent_Activity_API = environment.BaseURL +   `/api/Dashboard/recent-activity`;

//Employee
export const Clock_In = environment.BaseURL +   `/api/Employee/clock-in`;
export const Clock_Out = environment.BaseURL +   `/api/Employee/clock-out`;
export const Add_Break = environment.BaseURL +   `/api/Employee//Add-Break`;
export const Update_Break = environment.BaseURL +   `/api/Employee/update-break`;
export const Delete_Break = environment.BaseURL +   `/api/Employee/delete-break`;
export const Get_Break = environment.BaseURL +   `/api/Employee/get-break`;
export const Employee_Shift = environment.BaseURL +   `/api/Employee/employee-shift`;

export const Create_Leave_Request_API = environment.BaseURL +   `/api/Employee/create-leaveRequest`;
export const My_Leave_Request_API = environment.BaseURL +   `/api/Employee/my-leave-request`;



//Employer
export const Create_Employee_API = environment.BaseURL +   `/api/Employer/create-employee`;
export const Get_All_Employees_API = environment.BaseURL +   `/api/Employer/get-all-employees`;
export const Get_Employee_Details_API = environment.BaseURL +   `/api/Employer/get-employee-details`;
export const Update_Employee_Details_API = environment.BaseURL +   `/api/Employer/update-employee-details`;
export const Delete_Employee_API = environment.BaseURL +   `/api/Employer/delete-employee`;
export const Pending_LeaveRequest_API = environment.BaseURL +   `/api/Employer/pending-leaveRequest`;
export const Approve_LeaveRequest_API = environment.BaseURL +   `/api/Employer/approve-leaveRequest`;
export const Approve_Shift_API = environment.BaseURL +   `/api/Employer/approve-shift`;
export const Pending_Shifts_API = environment.BaseURL +   `/api/Employer/pending-shifts`;
export const Update_Shift_Times_API = environment.BaseURL +   `/api/Employer/update-shift-times`;
export const Approve_Shifts_API = environment.BaseURL +   `/api/Employer/approve-shifts`;

//Holiday
export const Holiday_API = environment.BaseURL +   `/api/Holiday`;

//Roster
export const Roster_API = environment.BaseURL +   `/api/Roster`;


//Setting
export const Business_Setting_API = environment.BaseURL +   `/api/Setting/business-settings`;
export const Assign_Shift_API = environment.BaseURL +   `/api/Setting/assign-shift`;
export const Set_Employee_Shift_API = environment.BaseURL +   `/api/Setting/set-employee-shift`;
export const Change_Employee_Password_API = environment.BaseURL +   `/api/Setting/change-employee-password`;
export const Change_Employee_Pin_API = environment.BaseURL +   `/api/Setting/cange-employee-pin`;
export const TimeZone_API = environment.BaseURL +   `/api/Setting/timezone`;
export const Profile_API = environment.BaseURL +   `/api/Setting/profile`;
export const Update_Profile_API = environment.BaseURL +   `/api/Setting/update-profile`;




