import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";

export interface PageInformation {
  numberOfItems: number;
  currentPage: number;
  size: number;
}

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @ViewChild(MatPaginator, {static: true})
  public paginator!: MatPaginator;
  @Input()
  public pageInfo!: PageInformation;
  @Output()
  public pageEvent = new EventEmitter<PageEvent>();

  handlePageEvent(event: PageEvent) {
    this.pageEvent.emit({...event, pageIndex: event.pageIndex + 1})
  }

}
