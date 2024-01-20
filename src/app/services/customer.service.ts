import { Injectable } from '@angular/core';
import { Customer } from '../types/models/customer';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { CustomersResponse } from '../types/api/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private endpointUrl = '/customers';

  private customers: Customer[] = [
    {
      "id": 1,
      "first_Name": "MARY",
      "last_Name": "SMITH",
      "email": "MARY.SMITH@sakilacustomer.org",
      "active": "1",
      "streetAddress": "1913 Hanoi Way",
      "streetAddress2": null,
      "city": "Sasebo",
      "country": "Japan",
      "zipcode": null
    },
    {
      "id": 2,
      "first_Name": "PATRICIA",
      "last_Name": "JOHNSON",
      "email": "PATRICIA.JOHNSON@sakilacustomer.org",
      "active": "1",
      "streetAddress": "1121 Loja Avenue",
      "streetAddress2": null,
      "city": "San Bernardino",
      "country": "United States",
      "zipcode": null
    },
    {
      "id": 3,
      "first_Name": "LINDA",
      "last_Name": "WILLIAMS",
      "email": "LINDA.WILLIAMS@sakilacustomer.org",
      "active": "1",
      "streetAddress": "692 Joliet Street",
      "streetAddress2": null,
      "city": "Athenai",
      "country": "Greece",
      "zipcode": null
    },
    {
      "id": 4,
      "first_Name": "BARBARA",
      "last_Name": "JONES",
      "email": "BARBARA.JONES@sakilacustomer.org",
      "active": "1",
      "streetAddress": "1566 Inegl Manor",
      "streetAddress2": null,
      "city": "Myingyan",
      "country": "Myanmar",
      "zipcode": null
    },
    {
      "id": 5,
      "first_Name": "ELIZABETH",
      "last_Name": "BROWN",
      "email": "ELIZABETH.BROWN@sakilacustomer.org",
      "active": "1",
      "streetAddress": "53 Idfu Parkway",
      "streetAddress2": null,
      "city": "Nantou",
      "country": "Taiwan",
      "zipcode": null
    },
    {
      "id": 6,
      "first_Name": "JENNIFER",
      "last_Name": "DAVIS",
      "email": "JENNIFER.DAVIS@sakilacustomer.org",
      "active": "1",
      "streetAddress": "1795 Santiago de Compostela Way",
      "streetAddress2": null,
      "city": "Laredo",
      "country": "United States",
      "zipcode": null
    },
    {
      "id": 7,
      "first_Name": "MARIA",
      "last_Name": "MILLER",
      "email": "MARIA.MILLER@sakilacustomer.org",
      "active": "1",
      "streetAddress": "900 Santiago de Compostela Parkway",
      "streetAddress2": null,
      "city": "Kragujevac",
      "country": "Yugoslavia",
      "zipcode": null
    },
    {
      "id": 8,
      "first_Name": "SUSAN",
      "last_Name": "WILSON",
      "email": "SUSAN.WILSON@sakilacustomer.org",
      "active": "1",
      "streetAddress": "478 Joliet Way",
      "streetAddress2": null,
      "city": "Hamilton",
      "country": "New Zealand",
      "zipcode": null
    },
    {
      "id": 9,
      "first_Name": "MARGARET",
      "last_Name": "MOORE",
      "email": "MARGARET.MOORE@sakilacustomer.org",
      "active": "1",
      "streetAddress": "613 Korolev Drive",
      "streetAddress2": null,
      "city": "Masqat",
      "country": "Oman",
      "zipcode": null
    },
    {
      "id": 10,
      "first_Name": "DOROTHY",
      "last_Name": "TAYLOR",
      "email": "DOROTHY.TAYLOR@sakilacustomer.org",
      "active": "1",
      "streetAddress": "1531 Sal Drive",
      "streetAddress2": null,
      "city": "Esfahan",
      "country": "Iran",
      "zipcode": null
    }
  ];

  constructor(private httpService: HttpService) { }

  getCustomers(currentPage?: number, limit?: number) {
    let queryParams = "";

    if (typeof currentPage == "number"){
      let searchParams = new URLSearchParams({
        page: (currentPage + 1).toString(),
        limit: limit?.toString() || "10"
      });

      queryParams = `?${searchParams.toString()}`;
    }

    const response = this.httpService.GetMethod(this.endpointUrl + queryParams) as Observable<CustomersResponse>;
    
    return response;
  }
}
