import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

export type SortOrder = 'asc' | 'desc';
export type SortValue = {
  value: string;
  order: string;
};

@Component({
  selector: 'app-sort-toggle',
  template: `
    <button class="btn p-0 m-0 w-100 text-start d-inline-flex justify-content-between shadow-none"
            (click)="toggleOrder()">
      <span class="fw-bold">{{name}}</span>
      <fa-icon [icon]="sortIcon"></fa-icon>
    </button>
  `,
  styleUrls: ['./sort-toggle.component.sass']
})
export class SortToggleComponent {

  @Input()
  name!: string;

  @Input()
  sortValue!: string;

  orderBool: boolean = true;
  sortOrder: SortOrder = 'desc';
  sortIcon: IconProp = 'caret-down';

  @Output()
  applySort = new EventEmitter<SortValue>();

  constructor() { }

  toggleOrder() {
    this.orderBool = !this.orderBool;
    if (this.orderBool) {
      this.sortOrder = 'desc';
      this.sortIcon = 'caret-down';
    }
    else {
      this.sortOrder = 'asc';
      this.sortIcon = 'caret-up';
    }
    this.callReloadPage();
  }

  callReloadPage() {
    this.applySort.emit({
      value: this.sortValue,
      order: this.sortOrder
    });
  }

}
