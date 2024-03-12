import { Component, Inject, OnInit } from '@angular/core';
import { Rental } from '../../../types/models/rental';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RentalService } from '../../../services/rental.service';
import { Router } from '@angular/router';

type DialogData = {
  rentalId: number
};

@Component({
  selector: 'app-rental-view-modal',
  templateUrl: './rental-view-modal.component.html',
  styleUrl: './rental-view-modal.component.scss'
})
export class RentalViewModalComponent implements OnInit {
  loading: boolean = true;
  rental?: Rental;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private rentalService: RentalService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.rentalService.getRental(this.data.rentalId)
      .subscribe({
        next: (rental) => {
          this.rental = rental;
          this.loading = false;
        }
      })
  }

  goToCustomer() {
    this.router.navigate(["/customers"], {
      queryParams: {
        id: this.rental!.customerId.toString()
      }
    });
  }

  goToFilm() {
    this.router.navigate(["/films"], {
      queryParams: {
        id: this.rental!.filmId.toString()
      }
    });
  }
}
