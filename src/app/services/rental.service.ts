import { Injectable, Query } from "@angular/core";
import { HttpService } from "./http.service";
import { RentalsResponse } from "../types/api/rentals";
import { Observable, map } from "rxjs";
import { Rental, RentalMonthRevenue, RentalMonthSummary } from "../types/models/rental";
import { GraphData } from "../types/shared/graph";
import { getMonthAbv } from "../misc/date";

type RentalFilters = {
    customerId: string,
    filmId: string
};

@Injectable({
    providedIn: 'root'
})
export class RentalService
{
    private endPointUrl = "/rentals";

    constructor(private httpService: HttpService) {}

    getRental(rentalId: number) {
        const req= this.httpService.GetMethod(this.endPointUrl + `/${rentalId}`) as Observable<Rental>;

        return req;
    }

    getRentals(currentPage?: number, limit?: number, filters?: RentalFilters) {
        let queryParams = "";
        let searchParams = new URLSearchParams();

        if(typeof currentPage == "number") {
            searchParams.append("page", (currentPage + 1).toString());
            searchParams.append("limit", limit?.toString() || "10");
        }

        if (filters !== undefined) {
            if (Number.isInteger(+filters.customerId)) {
                searchParams.append("customerId", filters.customerId);
            } else if(filters.customerId.trim().length !== 0) {
                return null;
            }
            
            if (Number.isInteger(+filters.filmId)) {
                searchParams.append("filmId", filters.filmId);
            } else if(filters.filmId.trim().length !== 0) {
                return null;
            }
        }
        
        queryParams = `?${searchParams.toString()}`;

        const req= this.httpService.GetMethod(this.endPointUrl + queryParams) as Observable<RentalsResponse>;
        
        return req;
    }

    getMonthlySummary(from?: string, to?: string): Observable<GraphData> {
        let queryParams = "";

        let searchParams = new URLSearchParams({
            from: from ?? '',
            to: to ?? ''
        });

        queryParams = `?${searchParams.toString()}`;

        const req= this.httpService.GetMethod<RentalMonthSummary[]>(this.endPointUrl + "/rentals_monthly_summary" + queryParams)
            .pipe(map(monthlyRentalsSummary => {
                return monthlyRentalsSummary.reduce((prev, curr) => {
                    prev.labels.push(
                        getMonthAbv(Number.parseInt(curr.month)));
                    prev.data.push(curr.amount);
                    
                    return prev;
                }, { data: [], labels: [] } as GraphData);
            }));

        return req;
    }

    getMonthlyRevenue(from?: string, to?: string): Observable<GraphData> {
        let queryParams = "";

        let searchParams = new URLSearchParams({
            from: from ?? '',
            to: to ?? ''
        });

        queryParams = `?${searchParams.toString()}`;

        const req= this.httpService.GetMethod<RentalMonthRevenue[]>(this.endPointUrl + "/monthly_rental_revenue" + queryParams)
            .pipe(map(monthlyRevenueData => {
                return monthlyRevenueData.reduce((prev, curr) => {
                    prev.labels.push(
                        getMonthAbv(Number.parseInt(curr.month)));
                    prev.data.push(curr.revenue);
                    return prev;
                }, { data: [], labels: [] } as GraphData);
            }));

        return req;
    }
}