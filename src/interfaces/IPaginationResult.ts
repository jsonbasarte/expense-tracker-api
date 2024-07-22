export interface IPaginationResult<T> {
  data: T;
  currentPage: number;
  totalPage: number;
  rowsPerPage: number;
}
