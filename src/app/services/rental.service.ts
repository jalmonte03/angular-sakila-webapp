import { Injectable, Query } from "@angular/core";
import { HttpService } from "./http.service";
import { RentalsResponse } from "../types/api/rentals";
import { Observable, map } from "rxjs";
import { RentalMonthRevenue, RentalMonthSummary } from "../types/models/rental";
import { GraphData } from "../types/shared/graph";
import { getMonthAbv } from "../misc/date";

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

    getMonthlySummary(from?: string, to?: string): Observable<GraphData> {
        let queryParams = "";

        let searchParams = new URLSearchParams({
            from: from ?? '',
            to: to ?? ''
        });

        queryParams = `?${searchParams.toString()}`;

        const response = this.httpService.GetMethod<RentalMonthSummary[]>(this.endPointUrl + "/rentals_monthly_summary" + queryParams)
            .pipe(map(monthlyRentalsSummary => {
                return monthlyRentalsSummary.reduce((prev, curr) => {
                    prev.labels.push(
                        getMonthAbv(Number.parseInt(curr.month)));
                    prev.data.push(curr.amount);
                    
                    return prev;
                }, { data: [], labels: [] } as GraphData);
            }));

        return response;
    }

    getMonthlyRevenue(from?: string, to?: string): Observable<GraphData> {
        let queryParams = "";

        let searchParams = new URLSearchParams({
            from: from ?? '',
            to: to ?? ''
        });

        queryParams = `?${searchParams.toString()}`;

        const response = this.httpService.GetMethod<RentalMonthRevenue[]>(this.endPointUrl + "/monthly_rental_revenue" + queryParams)
            .pipe(map(monthlyRevenueData => {
                return monthlyRevenueData.reduce((prev, curr) => {
                    prev.labels.push(
                        getMonthAbv(Number.parseInt(curr.month)));
                    prev.data.push(curr.revenue);
                    return prev;
                }, { data: [], labels: [] } as GraphData);
            }));

        return response;
    }
}