import { BooleanInput } from '@angular/cdk/coercion';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Sakila.App.Client';
  openedSideBar: BooleanInput = true;

  onToggleSideBar () {
    this.openedSideBar = !this.openedSideBar;
  }
}
