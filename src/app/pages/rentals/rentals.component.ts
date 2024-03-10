import { Component, OnInit } from '@angular/core';
import { Rental } from '../../types/models/rental';
import { RentalService } from '../../services/rental.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchFilter } from '../../components/search-filters-bar/search-filters-bar.component';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss'
})
export class RentalsComponent implements OnInit {
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
  
  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.rentalService.getRentals(this.currentPage, this.limit)
      .subscribe(response => {
        this.rentals = response.rentals;
        this.currentPage = response.currentPage;
        this.total = response.total;

        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }

  onPaginatorChangedHandler = (e: PageEvent) => {
    this.rentalService.getRentals(e.pageIndex, e.pageSize)
      .subscribe(response => {
        this.rentals = response.rentals;
        this.currentPage = response.currentPage;
        this.total = response.total;
      });
  }
}
