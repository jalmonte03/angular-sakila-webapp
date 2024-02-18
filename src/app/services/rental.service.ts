import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { RentalsResponse } from "../types/api/rentals";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RentalService
{
    private endPointUrl = "/rentals";

    constructor(private httpService: HttpService) {}

    getRentals(currentPage?: number, limit?: number) {
        let queryParams = "";

        if(typeof currentPage == "number") {
            let searchParams = new URLSearchParams({
                page: (currentPage + 1).toString(),
                limit: limit?.toString() || "10"
            });

            queryParams = `?${searchParams.toString()}`;
        }

        const response = this.httpService.GetMethod(this.endPointUrl + queryParams) as Observable<RentalsResponse>;
        
        return response;
    }
}