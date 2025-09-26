import { Injectable } from '@angular/core';
import axios from 'axios';
import {
  Approve_LeaveRequest_API,
  Create_Employee_API,
  Create_Leave_Request_API,
  Create_Pin_API,
  Create_Pin_Login_API,
  Dashboard_Summary_API,
  Delete_Employee_API,
  Forgot_Password_API,
  Get_All_Employees_API,
  Get_Employee_Details_API,
  Leave_Breakdown_API,
  Login_API,
  My_Leave_Request_API,
  Pending_LeaveRequest_API,
  Profile_API,
  Recent_Activity_API,
  Register_API,
  Reset_Password_API,
  Roster_API,
  Roster_Attendance_API,
  Update_Employee_Details_API,
  Update_Profile_API,
  Verify_OTP_API,
  Weekly_Horus_API
} from '../API';
import { StorageService } from '../common-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private localStorage: StorageService) { }

  private getToken(): string {
    return this.localStorage.getItem('token') || '';
  }

  // private getAuthHeaders() {
  //   return {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.getToken()}`
  //   };
  // }

  getAuthHeaders() {
  // const token = localStorage.getItem('token');
  if (!this.getToken()) {
    throw new Error('No token found in storage. Please login again.');
  }

  return {
    Authorization: `Bearer ${this.getToken()}`,
    'Content-Type': 'application/json',
  };
}


  // LOGIN
  login(data: any): Promise<any> {
    const payload = {
      emailOrMobile: data.emailOrMobile,
      password: data.password
    };

    return axios.post(Login_API, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      const token = response.data.token;
      if (token) {
        this.localStorage.setItem('token', token);
        this.localStorage.setItem('email', data.emailOrMobile);
      }
      return response;
    });
  }

  // REGISTER
  register(data: any): Promise<any> {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
      phoneNumber: data.phoneNumber,
      streetAddress: data.streetAddress,
      suburb: data.suburb,
      postcode: data.postcode
    };

    return axios.post(Register_API, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response);
  }

  // OTP VERIFY
  otp_Verify(data: any): Promise<any> {
    const payload = {
      otp: data.otp,
      tempToken: data.tempToken
    };

    return axios.post(Verify_OTP_API, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      const token = response.data.token;
      if (token) this.localStorage.setItem('token', token);
      return response;
    });
  }

  // GET PROFILE
  getProfile() {
    return axios.get(Profile_API, {
      headers: this.getAuthHeaders()
    }).then(response => {
      const user = response.data;
      return response;
    }).catch(error => {
      console.error('Failed to get profile:', error);
      throw error;
    });
  }

  // CREATE PIN
  createPin(data: any): Promise<any> {
    const payload = {
      emailOrMobile: data.emailOrMobile,
      pin: data.pin
    };

    return axios.post(Create_Pin_API, JSON.stringify(payload), {
      headers: this.getAuthHeaders()
    });
  }

  // PIN LOGIN
  viaPinLogin(data: any): Promise<any> {
    debugger
    const payload = {
      emailOrMobile: data.emailOrMobile,
      pin: data.pin
    };

    return axios.post(Create_Pin_Login_API, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      const token = response.data.token;
      if (token) {
        this.localStorage.setItem('token', token);
        this.localStorage.setItem('email', data.emailOrMobile);
      }
      return response;
    });
  }

  // LOGOUT
  logout() {
    this.localStorage.removeItem('token');
    this.localStorage.removeItem('email');
    console.log('Logged out successfully');
  }

  // UPDATE PROFILE
  updateProfile(updatedData: any) {
    return axios.put(Update_Profile_API, JSON.stringify(updatedData), {
      headers: this.getAuthHeaders()
    });
  }

  // FORGOT PASSWORD
  forgotPassword(email: string) {
    return axios.post(Forgot_Password_API, JSON.stringify({ email }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // CHANGE PASSWORD
  changePassword(data: any): Promise<any> {
    const email = this.localStorage.getItem('email');
    const payload = {
      token: data.token,
      email: email,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword
    };

    return axios.post(Reset_Password_API, JSON.stringify(payload), {
      headers: this.getAuthHeaders()
    });
  }

  // CREATE EMPLOYEE
  async createEmployee(employeeData: any): Promise<any> {
    try {
      const response = await axios.post(Create_Employee_API, JSON.stringify(employeeData), {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET ALL EMPLOYEES
  async getAllEmployees(page: number = 1, pageSize: number = 10): Promise<any> {
    try {
      const response = await axios.get(Get_All_Employees_API, {
        params: { pageNumber: page, pageSize },
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET EMPLOYEE DETAILS
  getEmployeeDetails(id: string): Promise<any> {
    return axios.get(`${Get_Employee_Details_API}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // UPDATE EMPLOYEE
  updateEmployee(id: string, data: any): Promise<any> {
    return axios.put(`${Update_Employee_Details_API}/${id}`, JSON.stringify(data), {
      headers: this.getAuthHeaders()
    });
  }

  // DELETE EMPLOYEE
  deleteEmployee(id: string): Promise<any> {
    return axios.delete(`${Delete_Employee_API}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // CREATE LEAVE REQUEST
  async createLeaveRequest(leaveRequestData: any): Promise<any> {
    try {
      const response = await axios.post(Create_Leave_Request_API, JSON.stringify(leaveRequestData), {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET MY LEAVE REQUESTS
  async getLeaveRequests(): Promise<any> {
    try {
      const response = await axios.get(My_Leave_Request_API, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // APPROVE LEAVE REQUEST
  async approveLeaveRequest(id: string, status: string): Promise<any> {
    try {
      const response = await axios.put(
        `${Approve_LeaveRequest_API}/${id}`,
        JSON.stringify({ status }),
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET PENDING LEAVE REQUESTS
  async getPendingLeaveRequests(): Promise<any> {
    try {
      const response = await axios.get(Pending_LeaveRequest_API, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET ROSTERS
  async getRosters(page: number = 1, pageSize: number = 100): Promise<any> {
    try {
      const response = await axios.get(Roster_API, {
        params: { pageNumber: page, pageSize },
        headers: this.getAuthHeaders()
      });
      return response.data.items;
    } catch (error) {
      throw error;
    }
  }

  // CREATE ROSTER
  async createRoster(rosterData: any): Promise<any> {
    try {
      const response = await axios.post(Roster_API, JSON.stringify(rosterData), {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // GET USER ROLE
  getUserRole(): string {
    return this.localStorage.getItem('role') || 'employer';
  }



  // DASHBOARD API

  async getDashBoardSummary(): Promise<any> {
    try {
      const response = await axios.get(Dashboard_Summary_API, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  async getWeaklyHrs(): Promise<any> {
    try {
      const response = await axios.get(Weekly_Horus_API, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getRoasterHrs(): Promise<any> {
    try {
      const response = await axios.get(Roster_Attendance_API, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getBreakDownLeave(): Promise<any> {
    try {
      const response = await axios.get(Leave_Breakdown_API, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getRecentActivity(): Promise<any> {
    try {
      const response = await axios.get(Recent_Activity_API, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
