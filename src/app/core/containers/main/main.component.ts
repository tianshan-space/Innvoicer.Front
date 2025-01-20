import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelComponent } from "../../components/panel/panel.component";
import { ActionsComponent } from "../../components/actions/actions.component";
import { AuthModel, Company } from '../../../auth/models/AuthModel';

@Component({
  selector: 'app-main',
  imports: [ActionsComponent, PanelComponent, PanelComponent, RouterOutlet, ActionsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  companies!: Company[];
  selectedCompany!: Company;

  protected showPanel = signal(true);

  ngOnInit(): void {
    const auth: AuthModel = JSON.parse(localStorage.getItem('auth')!);
    if (auth) {
      this.companies = auth.companies;
      console.log(auth);
    }

    const selectedCompany = localStorage.getItem('selected');
    if (selectedCompany) {
      this.selectedCompany = JSON.parse(selectedCompany);
    }
  }

}
