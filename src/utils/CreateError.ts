interface CustomError extends Error {
  statusCode?: number;
}

export const CreateError = (message: string, statusCode: number): never => {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  throw error;
};
