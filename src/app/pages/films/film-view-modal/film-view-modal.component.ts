import { Component, Inject, OnInit } from '@angular/core';
import { Film, FilmSummary } from '../../../types/models/film';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilmService } from '../../../services/film.service';
import { forkJoin } from 'rxjs';

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
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private filmService: FilmService
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
        }
      });
  }
}
