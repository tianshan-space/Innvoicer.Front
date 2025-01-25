import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelComponent } from '../../components/panel/panel.component';
import { ActionsComponent } from '../../components/actions/actions.component';
import { AuthModel, Company } from '../../../auth/models/AuthModel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  imports: [
    ActionsComponent,
    PanelComponent,
    PanelComponent,
    RouterOutlet,
    ActionsComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [MessageService],
})
export class MainComponent implements OnInit {

  dataForChild!: {
    companies?: Company[];
    selectedCompany?: Company;
  };

  protected showPanel = signal(true);

  ngOnInit(): void {
    const auth: AuthModel = JSON.parse(localStorage.getItem('auth')!);
    let com = null;
    let sel = null;
    if (auth) {
      com = auth.companies;
    }

    const selectedCompany = JSON.parse(localStorage.getItem('selected')!);
    if (selectedCompany) {
      sel = selectedCompany;
    }

    this.dataForChild = {
      companies: com as Company[],
      selectedCompany: sel,
    };
  }
}
