import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { FilmsResponse } from "../types/api/films";

@Injectable({
    providedIn: "root"
})
export class FilmService
{
    private endPointUrl = "/films";

    constructor(private httpService: HttpService) { }

    getFilms(currentPage?: number, limit?: number, title?: string) {
        let queryParams = "";

        if(typeof currentPage == "number") {
            let searchParams = new URLSearchParams({
                page: (currentPage + 1).toString(),
                limit: limit?.toString() || "10"
            });

            if(title) {
                searchParams.append("title", title);
            }

            queryParams = `?${searchParams.toString()}`;
        }

        const response = this.httpService.GetMethod(this.endPointUrl + queryParams) as Observable<FilmsResponse>;
        
        return response;
    }
}