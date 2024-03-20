import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart, { ChartItem } from 'chart.js/auto';
import { Observable } from 'rxjs';
import { GraphData } from '../../types/shared/graph';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss'
})
export class LinechartComponent {
  error: boolean = false;
  loading: boolean = true;
  chart!: Chart;

  @Input() graphDataObs?: Observable<GraphData>;
  @Input() labelText: string = "Line Graph";

  @ViewChild('lineGraph', { static: true }) barGraph!: ElementRef;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    if (this.graphDataObs) {
      this.graphDataObs.subscribe({
        next: (graphData) => {
          this.chart = new Chart(this.barGraph.nativeElement as ChartItem, {
            type: 'line',
            data: {
              labels: graphData.labels,
              datasets: [{
                data: graphData.data,
                tension: 0.2
              }],
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: this.labelText
                },
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    label: (toolTipItem) => {
                      const {
                        dataIndex
                      } = toolTipItem;

                      // Dollars Formatted
                      let dollars = Intl.NumberFormat("en-us", {
                        style: "currency",
                        currency: "USD"
                      });

                      return dollars.format(toolTipItem.dataset.data[dataIndex] as number);
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback(tickValue, index, ticks) {
                      
                      // Dollars Formatted
                      let dollars = Intl.NumberFormat("en-us", {
                        style: "currency",
                        currency: "USD"
                      });

                      return dollars.format(+tickValue);
                    },
                  }
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
