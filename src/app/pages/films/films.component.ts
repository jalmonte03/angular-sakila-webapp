import { Component, OnInit } from '@angular/core';
import { Film } from '../../types/models/film';
import { FilmService } from '../../services/film.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FilmViewModalComponent } from './film-view-modal/film-view-modal.component';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent implements OnInit {
  searchString: string = "";

  films: Film[] = [];
  currentPage: number = 0;
  total: number = 0;
  limit: number = 10;
  loading: boolean = true;
  
  constructor(
    public filmViewModal: MatDialog,
    private filmService: FilmService) { }
  
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
    this.filmService.getFilms(e.pageIndex, e.pageSize, this.searchString)
      .subscribe(response => {
        this.films = response.films;
        this.currentPage = response.currentPage;
        this.total = response.total;
        this.limit = e.pageSize;
      });
  }

  onSearchFilterClickedHandler() {
    this.filmService.getFilms(0, this.limit, this.searchString)
      .subscribe({
        next: (response) => {
          this.films = response.films;
          this.currentPage = response.currentPage;
          this.total = response.total;
        }
      })
  }

  onFilmClickedHandler(filmId: number) {
    const customerViewRef = this.filmViewModal.open(FilmViewModalComponent, {
      data: {
        filmId
      }
    });
  }
}
