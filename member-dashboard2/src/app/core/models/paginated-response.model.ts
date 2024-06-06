export type PageParams = {
  sort?: string | string[];
  page?: number;
  size?: number;
  search?: string | string[];
};

export type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

export type Pageable = {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
};

export type PaginatedResponse<T> = {
  // Content array
  content: T[];
  // Page number
  number: number;
  // Page size
  size: number;
  // Number of elements in the content array
  numberOfElements: number;
  // Total elements in the query
  totalElements: number;
  // Is last page
  last: boolean;
  // Total pages in response
  totalPages: number;
  // Sort object
  sort: Sort;
  // Is first page
  first: boolean;
  // Is empty
  empty: boolean;
  // Pageable object
  pageable: Pageable;
};
