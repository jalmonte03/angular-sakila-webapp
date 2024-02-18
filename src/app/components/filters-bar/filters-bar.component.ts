import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.scss'
})
export class FiltersBarComponent {
  // Search Filter Properties
  @Input() searchFilter: string = "";
  @Input() inputLabel: string = "Search";
  @Input() inputPlaceholder: string = "Search";
  @Output() onSearchEvent = new EventEmitter();
  
  // Pagination Properties
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() limit: number = 10;
  @Input() pageOptions: number[] = [10,25,50];
  @Output() onPageChangeEvent = new EventEmitter<PageEvent>();
}
