import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../../types/models/customer';
import { MaterialModule } from '../../modules/material.module';

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
