import { Component, model, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel',
  imports: [RouterModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  showPanel = model.required<boolean>();

  showHidePanel() {
    this.showPanel.set(!this.showPanel());
  }
}
