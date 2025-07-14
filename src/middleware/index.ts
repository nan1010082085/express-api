import { query } from 'express-validator'

// 分页
const PaginationValid = () => {
  return [query('limit').notEmpty().isInt(), query('page').notEmpty().isInt()]
}

export { PaginationValid }
