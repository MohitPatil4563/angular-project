import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // isBrowser(): boolean {
  //   return typeof window !== 'undefined';
  // }

  // getItem(key: string): string | null {
  //   return this.isBrowser() ? localStorage.getItem(key) : null;
  // }

  // setItem(key: string, value: string): void {
  //   if (this.isBrowser()) {
  //     localStorage.setItem(key, value);
  //   }
  // }

  // removeItem(key: string): void {
  //   if (this.isBrowser()) {
  //     localStorage.removeItem(key);
  //   }
  // }


  
    setItem(key: string, value: any): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  getItem<T = any>(key: string): T | null {
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value as any;
    }
  }

  removeItem(key: string): void {
    debugger
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
