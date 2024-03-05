import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
import { GraphData } from '../../types/shared/graph';

@Component({
  selector: 'app-piegraph',
  templateUrl: './piegraph.component.html',
  styleUrl: './piegraph.component.scss'
})
export class PiegraphComponent implements OnInit {
  loading: boolean = true;
  chart: any;

  @Input() graphDataObs!: Observable<GraphData>;
  @Input() labelText: string = "Bar Graph";

  @ViewChild('pieGraph', { static: true }) canvasRef!: ElementRef;

  ngOnInit(): void {
    this.graphDataObs.subscribe({
      next: (graphData) => {
        this.chart = new Chart(this.canvasRef.nativeElement, {
          type: 'pie',
          data: {
            labels: graphData.labels,
            datasets: [
              {
                data: graphData.data
              }
            ]
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
                // position: 'right'
              }
            }
          }
        });

        this.loading = false;
      }
    })
    
  }
}
