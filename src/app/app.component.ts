import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Sakila.App.Client';
  openedSideBar: BooleanInput = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onToggleSideBar () {
    this.openedSideBar = !this.openedSideBar;
  }
}
