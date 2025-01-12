import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  private breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-user',
      label: 'პროფილი'
    });
  }
}
