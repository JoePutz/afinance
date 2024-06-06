import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-transactions',
  templateUrl: './search-transactions.component.html',
  styleUrls: ['./search-transactions.component.sass']
})
export class SearchTransactionsComponent {

  @Output()
  search = new EventEmitter<string[]>();

  searchTerm?: string;
  searchTerms: string[] = [];

  constructor() { }

  deleteSearchTerm(index: number) {
    this.searchTerms.splice(index, 1);
    this.applySearch();
  }

  applySearch() {
    if (this.searchTerm) {
      this.searchTerms.push(this.searchTerm);
      this.searchTerm = undefined;
    }
    this.search.emit(this.searchTerms);
  }

}
