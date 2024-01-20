import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../types/models/customer';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  
  customers: Customer[] = [];
  currentPage = 0;
  total = 0;
  limit = 10;

  constructor(private customerService: CustomerService) {}
  
  ngOnInit(): void {
    this.customerService.getCustomers()
      .subscribe({
        next: (response) => {
          this.customers = response.customers;
          this.currentPage = response.currentPage;
          this.total = response.total;
        },
        error: (error) => console.error(error)
      });
  }

  onPaginatorChangedHandler(e: PageEvent) {
    this.customerService.getCustomers(e.pageIndex, e.pageSize)
      .subscribe({
        next: (response) => {
          this.customers = response.customers;
          this.currentPage = response.currentPage;
          this.total = response.total;
        },
        error: (error) => console.error(error)
      })
  }
}
