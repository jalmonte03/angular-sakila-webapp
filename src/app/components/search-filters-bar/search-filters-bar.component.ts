import { BooleanInput } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-filters-bar',
  templateUrl: './search-filters-bar.component.html',
  styleUrl: './search-filters-bar.component.scss'
})
export class FiltersBarComponent {
  // Private Properties
  private _multiple = false;

  // Multiple Filters Properties
  @Input() filters?: SearchFilter[];
  @Input() get multiple() {
    return this._multiple;
  }
  set multiple(v: BooleanInput) {
    this._multiple = typeof(v) === "string" ? v === "" : !!v;
  }

  // Single Search Filter Properties
  @Input() searchFilter?: string;
  @Output() searchFilterChange = new EventEmitter<string>();
  @Input() inputLabel: string = "Search";
  @Input() inputPlaceholder: string = "Search";
  @Output() onSearchEvent = new EventEmitter();
  
  // Pagination Properties
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() limit: number = 10;
  @Input() pageOptions: number[] = [10,25,50];
  @Output() onPageChangeEvent = new EventEmitter<PageEvent>();

  onEnterKeyPressed(event: KeyboardEvent) {
    if (event.key === "Enter"){
      this.onSearchEvent.emit();
    }
  }
}

export type SearchFilter = {
  name: string,
  label?: string,
  value: string,
  placeholder: string
};