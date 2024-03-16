import { BooleanInput } from '@angular/cdk/coercion';
import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  mode: MatDrawerMode = "side";
  hasBackdrop: boolean = false;

  @Input() openedSideBar: BooleanInput;
  @Output() openedSideBarChange = new EventEmitter<BooleanInput>();

  hideOnMobileBreakpoint: boolean = false;
  @ViewChild("sidenav") sidenav!: MatSidenav;

  ngAfterViewInit() {
    if (window.innerWidth <= 480)
    {
      this.hideOnMobileBreakpoint = true;
      this.sidenav.close();
      this.openedSideBarChange.emit(false);
      this.mode = "over";
      this.hasBackdrop = true;

      setTimeout(() => {
        this.hideOnMobileBreakpoint = false;
      }, 1000);
    } else {
      this.mode = "side";
    }
  }

  

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    if (window.innerWidth <= 480){
      this.sidenav.toggle(false);
      this.openedSideBarChange.emit(false);
      this.mode = "over";
      this.hasBackdrop = true;
    } else {
      this.mode = "side";
      this.hasBackdrop = false;
    }
  }

  onClickedHideOnMobileHandler() {
    if(window.innerWidth <= 480) {
      this.sidenav.close();
      this.openedSideBarChange.emit(false);
    }
  }
}
