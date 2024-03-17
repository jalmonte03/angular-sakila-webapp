import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Sakila.App.Client';
  openedSideBar: BooleanInput = true;

  constructor(private cdr: ChangeDetectorRef) {
    console.log("From environment: ", environment.apiUrl);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onToggleSideBar () {
    this.openedSideBar = !this.openedSideBar;
  }
}
