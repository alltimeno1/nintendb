import { Request, Response } from 'express'

function errorMiddleware(err: Types.customError, req: Request, res: Response) {
  const { message, status } = err

  return res.send({ message, status })
}

export default errorMiddleware
