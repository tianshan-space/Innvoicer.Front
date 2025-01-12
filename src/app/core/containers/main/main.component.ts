import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelComponent } from "../../components/panel/panel.component";
import { ActionsComponent } from "../../components/actions/actions.component";

@Component({
  selector: 'app-main',
  imports: [ActionsComponent, PanelComponent, PanelComponent, RouterOutlet, ActionsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  protected showPanel = signal(true);

}
