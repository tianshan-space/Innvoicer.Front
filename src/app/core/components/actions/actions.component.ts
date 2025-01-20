import { Component, inject, Input, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Breadcrumb } from '../../models/breadcrumbModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Company } from '../../../auth/models/AuthModel';

@Component({
  selector: 'app-actions',
  imports: [CommonModule, ButtonModule, SelectModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements OnInit {

  @Input() set companies(companies: Company[]) {
    this.comp = companies;
  }
  @Input() set selectedCompany(selectedCompany: Company) {
    this.selectedComp = selectedCompany;
    console.log(this.selectedComp);
  }

  comp!: Company[];
  selectedComp!: Company;
  breadcrumbConfig!: Breadcrumb;

  private breadcrumbService = inject(BreadcrumbService);
  private router = inject(Router);

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  ngOnInit() {
    this.breadcrumbService.getConfig().subscribe((m) => {
      this.breadcrumbConfig = m;
    });
  };

  navigateToParent() {
    this.router.navigateByUrl(this.breadcrumbConfig.labelRoute as string);
  }

  logOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('selected');
    this.router.navigateByUrl('/login');
  }
}
