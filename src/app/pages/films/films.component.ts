import { Component, OnInit } from '@angular/core';
import { Film } from '../../types/models/film';
import { FilmService } from '../../services/film.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FilmViewModalComponent } from './film-view-modal/film-view-modal.component';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { finalize } from 'rxjs';

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
    private filmService: FilmService,
    private route: ActivatedRoute,
    private alertService: AlertService) { }
  
  ngOnInit(): void {
    // Load film when there is a valid id on the query
    this.route.queryParams.subscribe({
      next: (params) => {
        if(params["id"] && Number.isInteger(+params["id"])) {
          const filmId = +params["id"];

          this.filmViewModal.open(FilmViewModalComponent, {
            data: {
              filmId
            }
          });
        }
      }
    });


    this.filmService.getFilms()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: response => {
          this.films = response.films;
          this.currentPage = response.currentPage;
          this.total = response.total;
       },
       error: (err) => {
        this.alertService.sendHttpError(err);
      }
    });
  }

  onPaginatorChangedHandler = (e: PageEvent) => {
    this.loading = true;

    this.filmService.getFilms(e.pageIndex, e.pageSize, this.searchString)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next:response => {
          this.films = response.films;
          this.currentPage = response.currentPage;
          this.total = response.total;
          this.limit = e.pageSize;
        },
        error: (err) => {
          this.alertService.sendHttpError(err);
          this.resetState();
        }
      });
  }

  onSearchFilterClickedHandler() {
    this.loading = true;

    this.filmService.getFilms(0, this.limit, this.searchString)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.films = response.films;
          this.currentPage = response.currentPage;
          this.total = response.total;
        },
        error: (err) => {
          this.alertService.sendHttpError(err);
          this.resetState();
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

  resetState() {
    this.films = [];
    this.currentPage = 1;
    this.total = 0;
  }
}
