import { Component, inject, Input, OnInit } from '@angular/core';
import { Breadcrumb, BreadcrumbService } from '../../services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Company } from '../../../auth/models/AuthModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actions',
  imports: [CommonModule, ButtonModule, SelectModule, FormsModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements OnInit {

  @Input() set dataForChild(data: any) {
    if (data?.companies) {
      this.comp = data.companies;
    } 
    if (data?.selectedCompany) {
      this.selectedComp = data.selectedCompany;
    }
  }

  comp!: Company[];
  selectedComp!: Company;
  breadcrumbConfig!: Breadcrumb;

  private breadcrumbService = inject(BreadcrumbService);
  private router = inject(Router);

  ngOnInit() {
    this.breadcrumbService.getConfig().subscribe((m) => {
      this.breadcrumbConfig = m;
    });
  };

  navigateToParent() {
    this.router.navigateByUrl(this.breadcrumbConfig.labelRoute as string);
  }

  changeSelect() {
    localStorage.setItem('selected', JSON.stringify(this.selectedComp));
    window.location.reload();
  }

  logOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('selected');
    this.router.navigateByUrl('/login');
  }
}

