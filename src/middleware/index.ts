import { query } from 'express-validator'

// 分页
const PaginationValid = () => {
  return [query('limit').notEmpty(), query('page').notEmpty()]
}

export {
  PaginationValid
}
