import { Component, OnInit } from '@angular/core';
import { Film } from '../../types/models/film';
import { FilmService } from '../../services/film.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent implements OnInit {
  
  films: Film[] = [];
  currentPage: number = 0;
  total: number = 0;
  limit: number = 10;
  loading: boolean = true;
  
  constructor(private filmService: FilmService) { }
  
  ngOnInit(): void {
    this.filmService.getFilms()
      .subscribe(response => {
        this.films = response.films;
        this.currentPage = response.currentPage;
        this.total = response.total;

        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }

  onPaginatorChangedHandler = (e: PageEvent) => {
    this.filmService.getFilms(e.pageIndex, e.pageSize)
      .subscribe(response => {
        this.films = response.films;
        this.currentPage = response.currentPage;
        this.total = response.total;
      });
  }
}
