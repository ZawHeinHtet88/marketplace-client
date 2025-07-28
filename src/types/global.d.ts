export interface BaseApiResponse {
  isSuccess: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  details?: string[] | null;
}


export interface BasePagination {
  page: number;
  entriesPerPage: number;
}

export interface Pagination {
  entriesPerPage: number;
  page: number;
  totalResult: number;
  foundResult: number;
}

