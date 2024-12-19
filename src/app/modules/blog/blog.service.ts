import { Blog } from "./blog.model";

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();
  return result;
};
export const BlogServices = {
  getAllBlogsFromDB,
};
