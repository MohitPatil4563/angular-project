import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../pages/sidebar/sidebar/sidebar.component';
import { NavbarComponent } from '../../pages/navbar/navbar/navbar.component';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule, FormsModule,SidebarComponent,NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
