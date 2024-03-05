import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable, map } from "rxjs";
import { FilmsResponse } from "../types/api/films";
import { FilmWatched } from "../types/models/film";
import { GraphData } from "../types/shared/graph";
import { CategoryWatched } from "../types/models/category";

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

    getMostWatchedFilms(limit: number = 5, from?: string, to?: string): Observable<GraphData> {
        let queryParams = "";
        const searchParams = new URLSearchParams({
            limit: limit.toString()
        });

        if(from) {
            searchParams.append("from", from);
        }
        
        if(to) {
            searchParams.append("to", to);
        }

        queryParams = `?${searchParams.toString()}`;

        const response = this.httpService.GetMethod<FilmWatched[]>(this.endPointUrl + "/most_rented_films" + queryParams)
        .pipe(
            map(val => {
    
              const mostWatchedFilmsData: GraphData = val.reduce((prev, curr, i) => {
                prev.labels.push(curr.filmTitle);
                prev.data.push(curr.rented);
    
                return prev;
              }, { labels: [], data: [] } as GraphData)
    
              return mostWatchedFilmsData;
            })
          );

        return response;
    }
    
    getMostWatchedCategories(limit: number = 5, from?: string, to?: string): Observable<GraphData> {
        let queryParams = "";
        const searchParams = new URLSearchParams({
            limit: limit.toString()
        });

        if(from) {
            searchParams.append("from", from);
        }
        
        if(to) {
            searchParams.append("to", to);
        }

        queryParams = `?${searchParams.toString()}`;

        const response = this.httpService.GetMethod<CategoryWatched[]>(this.endPointUrl + "/most_watched_categories" + queryParams)
        .pipe(
            map(val => {
    
              const mostWatchedCategoriesData: GraphData = val.reduce((prev, curr, i) => {
                prev.labels.push(curr.categoryName);
                prev.data.push(curr.amount);
    
                return prev;
              }, { labels: [], data: [] } as GraphData)
    
              return mostWatchedCategoriesData;
            })
          );

        return response;
    }
}