import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart, { ChartItem } from 'chart.js/auto';
import { getGraphColors } from '../../misc/graph-colors';
import { GraphData } from '../../types/shared/graph';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-horizontal-bargraph',
  templateUrl: './horizontal-bargraph.component.html',
  styleUrl: './horizontal-bargraph.component.scss'
})
export class HorizontalBargraphComponent {
  error: boolean = false;
  loading: boolean = true;
  chart!: Chart;

  @Input() graphDataObs?: Observable<GraphData>;
  @Input() labelText: string = "Bar Graph";

  @ViewChild('barGraph', { static: true }) barGraph!: ElementRef;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    if (this.graphDataObs) {
      this.graphDataObs.subscribe({
        next: (graphData) => {
          this.chart = new Chart(this.barGraph.nativeElement as ChartItem, {
            type: 'bar',
            data: {
              labels: graphData.labels,
              datasets: [{
                data: graphData.data,
                backgroundColor: getGraphColors(graphData.labels.length)
              }],
            },
            options: {
              responsive: true,
              indexAxis: 'y',
              plugins: {
                title: {
                  display: true,
                  text: this.labelText
                },
                legend: {
                  display: false
                }
              }
            }
          });
        
          this.loading = false;
        },
        error: (err) => {
          this.error = true;
          this.loading = false;
          this.alertService.sendHttpError(err);
        }
      });
    }
  }
}
