import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrl: './sidebar-content.component.scss'
})
export class SidebarContentComponent {
  @Input() title: string = "";
}
