import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../types/models/customer';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CustomerViewModalComponent } from './customer-view-modal/customer-view-modal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  loading: boolean = true;
  customers: Customer[] = [];
  
  // Search
  searchString = "";

  // Pagination
  currentPage = 0;
  total = 0;
  limit = 10;

  constructor(
    public customerViewModal: MatDialog,
    private customerService: CustomerService
  ) {}
  
  ngOnInit(): void {
    // Show modal on init (temporary)
    // const customerViewRef = this.customerViewModal.open(CustomerViewModalComponent);

    // Fetch all customers
    this.customerService.getCustomers()
      .subscribe({
        next: (response) => {
          this.customers = response.customers;
          this.currentPage = response.currentPage;
          this.total = response.total;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
        error: (error) => console.error(error)
      });
  }

  onPaginatorChangedHandler(e: PageEvent) {
    this.customerService.getCustomers(e.pageIndex, e.pageSize, this.searchString)
      .subscribe({
        next: (response) => {
          this.customers = response.customers;
          this.currentPage = response.currentPage;
          this.total = response.total;
          this.limit = e.pageSize;
        },
        error: (error) => console.error(error)
      })
  }

  onSearchFilterClickedHandler() {
    this.customerService.getCustomers(0, this.limit, this.searchString)
      .subscribe({
        next: (response) => {
          this.customers = response.customers;
          this.currentPage = response.currentPage;
          this.total = response.total;
        }
      })
  }

  onCustomerClickedHandler(customerId: number) {
    const customerViewRef = this.customerViewModal.open(CustomerViewModalComponent, {
      data: {
        customerId
      }
    });
  }
}
