import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { GraphData } from '../../types/shared/graph';
import { Observable } from 'rxjs';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  mostWatchedFilmsObs: Observable<GraphData> = new Observable();
  mostWatchedCategoriesObs: Observable<GraphData> = new Observable();
  monthlyRentedSummaryObs: Observable<GraphData> = new Observable();
  monthlyRentalRevenueObs: Observable<GraphData> = new Observable();

  constructor(
    private filmService: FilmService,
    private rentalService: RentalService) {}

  ngOnInit() {
    const limit = 5;
    
    // Fetching the charts data
    this.mostWatchedFilmsObs = this.filmService.getMostWatchedFilms(limit);
    this.mostWatchedCategoriesObs = this.filmService.getMostWatchedCategories(limit);
    this.monthlyRentedSummaryObs = this.rentalService.getMonthlySummary();
    this.monthlyRentalRevenueObs = this.rentalService.getMonthlyRevenue("2005-05-24","2005-08-31");
  }
}
