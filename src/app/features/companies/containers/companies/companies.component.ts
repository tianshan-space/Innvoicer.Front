import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CompaniesService } from '../../services/companies.service';
import { BreadcrumbService } from '../../../../core/services/breadcrumb.service';

@Component({
  selector: 'app-companies',
  imports: [
    ButtonModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule,
  ],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent {
  private companiesService = inject(CompaniesService);
  private breadcrumbService = inject(BreadcrumbService);

  companies: any = [];

  ngOnInit() {
    this.breadcrumbService.setConfig({
      icon: 'pi pi-building',
      label: 'კომპანიები',
    });

    this.loadList();
  }

  loadList() {
    const selected = JSON.parse(localStorage.getItem('selected')!);
    this.companiesService.loadList(selected.id).subscribe((m) => {
      this.companies = m as any;
      this.companies = this.companies.reverse();
    });
  }

  editCompany(id: number): void {
    console.log('Edit company with ID:', id);
  }

  deleteCompany(id: number): void {
    console.log('Delete company with ID:', id);
  }
}
