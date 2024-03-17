import { Component, OnInit } from '@angular/core';
import { Rental } from '../../types/models/rental';
import { RentalService } from '../../services/rental.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchFilter } from '../../components/search-filters-bar/search-filters-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { RentalViewModalComponent } from './rental-view-modal/rental-view-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss'
})
export class RentalsComponent implements OnInit {
  errorMessage = `Either "Customer Id" or "Film Id" have an invalid id`;
  loading: boolean = true;
  rentals: Rental[] = [];
  

  // Filters Property
  filters: SearchFilter[] = [
    {
      name: 'customer-id',
      label: 'Customer ID',
      value: '',
      placeholder: 'eg: 23'
    },
    {
      name: 'film-id',
      label: 'Film ID',
      value: '',
      placeholder: 'eg: 23'
    }
  ];

  currentPage: number = 0;
  total: number = 0;
  limit: number = 10;
  
  constructor(
    private rentalModal: MatDialog,
    private rentalService: RentalService,
    private alertService: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get Query Params
    this.route.queryParams.subscribe({
      next: (params) => {
        const customerIdFilter = this.filters.find(f => f.name === "customer-id")!;
        const filmIdFilter = this.filters.find(f => f.name === "film-id")!;

        // Update filters if there is a query params in the route
        customerIdFilter.value = params["customerId"] ?? "";
        filmIdFilter.value = params["filmId"] ?? "";

        const rentalsObs = this.rentalService.getRentals(this.currentPage, this.limit, {
          customerId: customerIdFilter.value,
          filmId: filmIdFilter.value
        });

        if(rentalsObs !== null)
        {
          rentalsObs
            .pipe(
              finalize(() => {
                this.loading = false;
              })
            )
            .subscribe({
              next: response => {
                this.rentals = response.rentals;
                this.currentPage = response.currentPage;
                this.total = response.total;
              },
              error: (err) => {
                this.alertService.sendHttpError(err);
              }
            });
        } else {
          this.sendSnackbarErrorMessage();
        }
      }
    });

    
  }

  onPaginatorChangedHandler = (e: PageEvent) => {
    const rentalObs = this.rentalService.getRentals(e.pageIndex, e.pageSize, {
      customerId: this.filters.find(f => f.name === "customer-id")!.value,
      filmId: this.filters.find(f => f.name === "film-id")!.value
    });

    if(rentalObs !== null) {
      this.loading = true;

      rentalObs
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({ 
        next: response => {
          this.rentals = response.rentals;
          this.currentPage = response.currentPage;
          this.total = response.total;
        },
        error: (err) => {
          this.alertService.sendHttpError(err);
          this.resetState();
        }
      });
    } else {
      this.sendSnackbarErrorMessage();
    }
  }

  onSearchButtonClickedHandler = () => {
    const rentalObs = this.rentalService.getRentals(0, this.limit, {
      customerId: this.filters.find(f => f.name === "customer-id")!.value,
      filmId: this.filters.find(f => f.name === "film-id")!.value
    });
    
    if (rentalObs !== null) {
      this.loading = true;

      rentalObs
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (response) => {
            this.rentals = response.rentals,
            this.currentPage = response.currentPage,
            this.total = response.total
          },
          error: (err) => {
            this.alertService.sendHttpError(err);
            this.resetState();
          }
      });
    } else {
      this.sendSnackbarErrorMessage();
    }
  }

  onRentalClickedHandler(rentalId: number) {
    const rentalViewRef = this.rentalModal.open(RentalViewModalComponent, {
      data: {
        rentalId
      }
    });
  }

  sendSnackbarErrorMessage() {
    this.alertService.sendWarning(this.errorMessage);
  }

  resetState() {
    this.rentals = [];
    this.currentPage = 1;
    this.total = 0;
  }
}
