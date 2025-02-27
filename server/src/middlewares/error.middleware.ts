import { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorMiddleware = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message
    })
  }

  // Lỗi không xác định
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Lỗi máy chủ nội bộ'
  })
}
