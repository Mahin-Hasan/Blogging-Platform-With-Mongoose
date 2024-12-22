import { TErrorSources, TGenericErrorResponse } from '../interface/error';
//4th layer - triggern when we want to create a dept with same name
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      details: 'Duplicate Encountered',
      message: `${extractedMessage} already Exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleDuplicateError;
