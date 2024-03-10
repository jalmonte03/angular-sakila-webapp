import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-readonly-input',
  templateUrl: './readonly-input.component.html',
  styleUrl: './readonly-input.component.scss'
})
export class ReadonlyInputComponent {
  @Input() label: string = "";
  @Input() value: string = "";
  
  // Getter and Setter to allow just adding the attribute
  @Input() get textarea(): boolean {
    return this._textarea;
  } set textarea(value: boolean | '') {
    this._textarea = value === '' || value;
  }

  _textarea = false;
}
