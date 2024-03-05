import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-readonly-input',
  templateUrl: './readonly-input.component.html',
  styleUrl: './readonly-input.component.scss'
})
export class ReadonlyInputComponent {
  @Input() label: string = "";
  @Input() value: string = "";


}
