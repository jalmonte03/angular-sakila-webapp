import { Component, Input } from '@angular/core';
import { Customer } from '../../types/models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  @Input() customer?: Customer;

  constructor() {

  }
}
