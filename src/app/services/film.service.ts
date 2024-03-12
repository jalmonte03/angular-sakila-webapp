import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable, map } from "rxjs";
import { FilmsResponse } from "../types/api/films";
import { Film, FilmSummary, FilmWatched } from "../types/models/film";
import { GraphData } from "../types/shared/graph";
import { CategoryWatched } from "../types/models/category";

@Injectable({
    providedIn: "root"
})
export class FilmService
{
    private endPointUrl = "/films";

    constructor(private httpService: HttpService) { }

    getSingleFilm(filmId: number) {
        const req = this.httpService.GetMethod(this.endPointUrl + `/${filmId}`) as Observable<Film>;

        return req;
    }

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

        const req = this.httpService.GetMethod(this.endPointUrl + queryParams) as Observable<FilmsResponse>;
        
        return req;
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

        const req = this.httpService.GetMethod<FilmWatched[]>(this.endPointUrl + "/most_rented_films" + queryParams)
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

        return req;
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

        const req = this.httpService.GetMethod<CategoryWatched[]>(this.endPointUrl + "/most_watched_categories" + queryParams)
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

        return req;
    }

    getFilmSummary(filmId: number) {
        const req = this.httpService.GetMethod(this.endPointUrl + `/${filmId}/summary`) as Observable<FilmSummary>;

        return req;
    }
}