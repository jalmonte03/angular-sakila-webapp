import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart, { ChartItem } from 'chart.js/auto';
import { getGraphColors } from '../../misc/graph-colors';

@Component({
  selector: 'app-horizontal-bargraph',
  templateUrl: './horizontal-bargraph.component.html',
  styleUrl: './horizontal-bargraph.component.scss'
})
export class HorizontalBargraphComponent implements OnInit {
  chart: any;
  @Input() graphId: string = "Bar-Graph";
  @Input() labelText: string = "Bar Graph";
  @Input() labels: string[] = ["Movie 1", "Movie 2", "Movie 3", "Movie 4"];
  @Input() data: number[] = [2, 4, 5, 6];

  @ViewChild('barGraph', { static: true }) barGraph!: ElementRef;

  ngOnInit(): void {
    this.chart = new Chart(this.barGraph.nativeElement as ChartItem, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.labelText,
          data: this.data,
          backgroundColor: getGraphColors(this.labels.length)
        }],
      },
      options: {
        indexAxis: 'y'
      }
    });
  }
}
