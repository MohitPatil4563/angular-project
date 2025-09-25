import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  getTimeZoneValue() {
    return [
      { 'value': 'UTC', 'name': 'UTC' },
      { 'value': 'Australia/Adelaide', 'name': 'Australia/Adelaide' },
      { 'value': 'Australia/Brisbane', 'name': 'Australia/Brisbane' },
      { 'value': 'Australia/Broken_Hill', 'name': 'Australia/Broken_Hill' },
      { 'value': 'Australia/Currie', 'name': 'Australia/Currie' },
      { 'value': 'Australia/Melbourne', 'name': 'Australia/Melbourne' },
      { 'value': 'Australia/Perth', 'name': 'Australia/Perth' },
      { 'value': 'Australia/Sydney', 'name': 'Australia/Sydney' }

    ]
  }
   getLeaveRequestListValue() {
    return [
      { 'value': 'Annual ', 'name': 'Annual ' },
      { 'value': 'Sick', 'name': 'Sick' },
       { 'value': 'Casual', 'name': 'Casual' },

    ]
  }
}

 

