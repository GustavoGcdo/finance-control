export type PaginateOptions = {
  skip?: number,
  limit?: number,
  order?: 'asc' | 'desc',
}

export type PaginateResult<T> = {
  results: T[],
  total: number
}
