import { NextFunction, Request, Response } from 'express'

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res)

  res.json = (data: any) => {
    if (data?.status === 'error') {
      return originalJson(data) // Không ghi đè lỗi
    }

    return originalJson({
      status: 'success',
      statusCode: res.statusCode,
      data
    })
  }

  next()
}
