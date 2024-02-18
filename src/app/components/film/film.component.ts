import { Component, Input } from '@angular/core';
import { Film } from '../../types/models/film';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent {
  @Input() film?: Film;

}
