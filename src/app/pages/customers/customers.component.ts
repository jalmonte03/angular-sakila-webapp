import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../types/models/customer';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CustomerViewModalComponent } from './customer-view-modal/customer-view-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { finalize } from 'rxjs';

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
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}
  
  ngOnInit(): void {
    // Load customer when there is a valid id on the query
    this.route.queryParams.subscribe({
      next: (params) => {
        if(params["id"] && Number.isInteger(+params["id"])) {
          const customerId = +params["id"];

          this.customerViewModal.open(CustomerViewModalComponent, {
            data: {
              customerId
            }
          });
        }
      }
    });

    // Fetch all customers
    this.customerService.getCustomers()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.customers = response.customers;
          this.currentPage = response.currentPage;
          this.total = response.total;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
        error: (err) => {
          this.alertService.sendHttpError(err);
        }
      });
  }

  onPaginatorChangedHandler(e: PageEvent) {
    this.loading = true;

    this.customerService.getCustomers(e.pageIndex, e.pageSize, this.searchString)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.customers = response.customers;
          this.currentPage = response.currentPage;
          this.total = response.total;
          this.limit = e.pageSize;
        },
        error: (err) => {
          this.alertService.sendHttpError(err);
          this.resetState();
        },
      })
  }

  onSearchFilterClickedHandler() {
    this.loading = true;

    this.customerService.getCustomers(0, this.limit, this.searchString)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.customers = response.customers;
          this.currentPage = response.currentPage;
          this.total = response.total;
        },
        error: (err) => {
          this.alertService.sendHttpError(err);
          this.resetState();
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

  resetState() {
    this.customers = [];
    this.currentPage = 1;
    this.total = 0;
  }
}
