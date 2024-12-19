// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await userServices.createUserIntoDB(userData);

  sendResponse(res, {
    success: true,
    message: 'User registered  sucessfully',
    statusCode: 201,
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
