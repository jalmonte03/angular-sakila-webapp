import { Component, Input } from '@angular/core';
import { Rental } from '../../types/models/rental';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.scss'
})
export class RentalComponent {
  @Input() rental?: Rental;
}