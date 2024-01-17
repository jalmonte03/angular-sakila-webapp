import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() onHamburgerClicked  = new EventEmitter();

  onHamburgerClickedHandler = () => {
    this.onHamburgerClicked.emit();
  }
}
