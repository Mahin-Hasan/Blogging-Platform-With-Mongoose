// @ts-ignore
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminServices.blockUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    // data: result,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog Deleted successfully',
    statusCode: 201,
    // data: result,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
