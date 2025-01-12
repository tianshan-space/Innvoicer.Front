import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Breadcrumb } from '../../models/breadcrumbModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  imports: [CommonModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements OnInit {

  breadcrumbConfig!: Breadcrumb;

  private breadcrumbService = inject(BreadcrumbService);
  private router = inject(Router);

  ngOnInit() {
    this.breadcrumbService.getConfig().subscribe((m) => {
      this.breadcrumbConfig = m;
    })
  };

  navigateToParent() {
    this.router.navigateByUrl(this.breadcrumbConfig.labelRoute as string);
  }
}
