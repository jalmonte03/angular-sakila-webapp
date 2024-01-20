import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() limit: number = 10;
  @Input() pageOptions: number[] = [10,25,50];
  @Output() onPageChangeEvent = new EventEmitter<PageEvent>();
}
