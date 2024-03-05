import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-readonly-checkbox',
  templateUrl: './readonly-checkbox.component.html',
  styleUrl: './readonly-checkbox.component.scss'
})
export class ReadonlyCheckboxComponent {
  @Input() label: string = "";
  @Input() checked: boolean = false;
}
