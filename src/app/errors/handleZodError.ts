import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      details: issue?.path[issue.path.length - 1], //geting last index
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'ZOD Validation Error',
    errorSources,
  };
};
export default handleZodError;
