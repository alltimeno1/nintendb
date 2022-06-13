export default function throwError(status: number, message: string) {
  const error: Types.customError = new Error(message)

  error.status = status

  throw error
}
