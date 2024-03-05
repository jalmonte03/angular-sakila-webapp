import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { getGraphColors } from '../../misc/graph-colors';
import { Observable } from 'rxjs';
import { GraphData } from '../../types/shared/graph';

@Component({
  selector: 'app-vertical-bargraph',
  templateUrl: './vertical-bargraph.component.html',
  styleUrl: './vertical-bargraph.component.scss'
})
export class VerticalBargraphComponent {
  loading: boolean = true;
  chart: any;
  
  @Input() graphDataObs!: Observable<GraphData>;
  @Input() labelText: string = "Vertical Bar Graph";

  @ViewChild('barGraph', { static: true }) barGraph!: ElementRef;

  ngOnInit(): void {
    this.graphDataObs.subscribe({
      next: (graphData) => {
        this.chart = new Chart(this.barGraph.nativeElement, {
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
            indexAxis: 'x',
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
      }
    });
    
  }
}
