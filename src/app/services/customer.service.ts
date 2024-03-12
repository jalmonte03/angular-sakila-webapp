import { Injectable } from '@angular/core';
import { Customer, CustomerSummary } from '../types/models/customer';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { CustomersResponse } from '../types/api/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private endpointUrl = '/customers';

  constructor(private httpService: HttpService) { }

  getCustomers(currentPage?: number, limit?: number, searchString?: string) {
    let queryParams = "";

    if (typeof currentPage == "number"){
      let searchParams = new URLSearchParams({
        page: (currentPage + 1).toString(),
        limit: limit?.toString() || "10"
      });

      if(searchString) {
        searchParams.append("name", searchString)
      }

      queryParams = `?${searchParams.toString()}`;
    }

    const req = this.httpService.GetMethod(this.endpointUrl + queryParams) as Observable<CustomersResponse>;
    
    return req;
  }

  getSingleCustomer(customerId: number){
    const req = this.httpService.GetMethod(this.endpointUrl + `/${customerId}`) as Observable<Customer>;

    return req;
  }

  getCustomerSummary(customerId: number){
    const req = this.httpService.GetMethod(this.endpointUrl + `/${customerId}/summary`) as Observable<CustomerSummary>;

    return req;
  }
}
