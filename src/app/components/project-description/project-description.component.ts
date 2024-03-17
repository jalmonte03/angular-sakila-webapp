import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.scss'
})
export class ProjectDescriptionComponent {
  frontendURLSource: string = environment.frontendSource;
  backendURLSource: string = environment.backendSource;
  testingBEURLSource: string = environment.testingBESource;
  swaggerEndpointURL: string = environment.swaggerEndpoint;

  hide: boolean = false;

  onCloseButtonClicked() {
    this.hide = true;
  }
}
