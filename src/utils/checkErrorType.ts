export default function errorType(error: unknown) {
  if (error instanceof Error) {
    return error
  } else {
    return new Error('Unknown Error')
  }
}
