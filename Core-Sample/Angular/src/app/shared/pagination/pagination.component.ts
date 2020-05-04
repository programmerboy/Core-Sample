import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'my-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() pageChangedEmitter: EventEmitter<PageEvent>;
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() previousText = '&lsaquo;';
  @Input() nextText = '&rsaquo;';
  @Input() firstText = '&laquo;';
  @Input() lastText = '&raquo;';
  @Input() blnBoundaryLinks = true;
  @Input() blnDirectionLinks = true;

  pageSizeOptions: number[] = [5, 10, 25];

  public numOfPages: number;

  constructor() {
    this.pageChangedEmitter = new EventEmitter<PageEvent>();
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
  }

  public pageChanged(event: PageEvent) {
    this.pageChangedEmitter.emit(event);
  }
}
