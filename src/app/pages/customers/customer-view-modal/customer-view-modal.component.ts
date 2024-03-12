import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer, CustomerSummary } from '../../../types/models/customer';
import { CustomerService } from '../../../services/customer.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

interface DialogData {
  customerId: number;
}

@Component({
  selector: 'app-customer-view-modal',
  templateUrl: './customer-view-modal.component.html',
  styleUrl: './customer-view-modal.component.scss'
})
export class CustomerViewModalComponent implements OnInit {
  customer?: Customer;
  customerSummary?: CustomerSummary;
  loading: boolean = true;
  notFound: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private customerService: CustomerService,
    private router: Router,
    private alertService: AlertService) {}
  
  ngOnInit(): void {
    // Search for customer basic info
    const customerSub = this.customerService.getSingleCustomer(this.data.customerId);

    // Search for customer summary
    const customerSummarySub = this.customerService.getCustomerSummary(this.data.customerId);

    // Remove loading spinner after all reqare finished
    forkJoin({
      customer: customerSub,
      customerSummary: customerSummarySub
    }).subscribe({
      next: (values => {
        this.customer = values.customer;
        this.customerSummary = values.customerSummary;

        this.loading = false;
      }),
      error: (err) => {
        if (err.status == 404) {
          this.notFound = true;
          this.loading = false;
          
          this.alertService.sendWarning("User not found.");
        } else {
          this.alertService.sendWarning("Unknown error occurred.");
        }
      }
    });
  }

  goToRentals() {
    this.router.navigate(["/rentals"], {
      queryParams: {
        customerId: this.customer!.id.toString()
      }
    });
  }
}
