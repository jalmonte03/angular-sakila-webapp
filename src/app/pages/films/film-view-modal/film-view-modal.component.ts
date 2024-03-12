import { Component, Inject, OnInit } from '@angular/core';
import { Film, FilmSummary } from '../../../types/models/film';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilmService } from '../../../services/film.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

interface DialogData {
  filmId: number
};

@Component({
  selector: 'app-film-view-modal',
  templateUrl: './film-view-modal.component.html',
  styleUrl: './film-view-modal.component.scss'
})
export class FilmViewModalComponent implements OnInit {
  film?: Film;
  filmCategories?: string;
  filmSummary?: FilmSummary;
  loading: boolean = true;
  notFound: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private filmService: FilmService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const filmSub =  this.filmService.getSingleFilm(this.data.filmId);
    const filmSummarySub = this.filmService.getFilmSummary(this.data.filmId);
    forkJoin({
      film: filmSub,
      filmSummary: filmSummarySub
    }).subscribe({
        next: (values) => {
          this.film = values.film;
          this.filmSummary = values.filmSummary
          
          // Convert category arrays to a string
          if(this.film.categories.length > 0) {
            this.filmCategories = this.film.categories.map(cat => cat.name).join(",");
          }

          this.loading = false;
        },
        error: (err) => {
          if (err.status == 404) {
            this.notFound = true;
            this.loading = false;
            
            this.alertService.sendWarning("Film not found.");
          } else {
            this.alertService.sendWarning("Unknown error occurred.");
          }
        }
      });
  }

  goToRentals() {
    this.router.navigate(["/rentals"], {
      queryParams: {
        filmId: this.film!.id.toString()
      }
    });
  }
}
