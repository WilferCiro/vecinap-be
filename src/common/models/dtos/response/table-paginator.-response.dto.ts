export interface TablePaginatorResponseDto<T> {
  data: T[];
  pagination: {
    count: number;
  }
}