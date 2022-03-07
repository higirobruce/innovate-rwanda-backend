import { Router } from 'express';

import BlogController from '../../controllers/BlogController';

import auth from '../../middlewares/authorization_authentication';
import checkPermissions from '../../middlewares/checkPermissions';
import asyncHandler from '../../middlewares/asyncErrorHandler';

const blog = Router();

blog.post(
  '/blog/post',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(BlogController.blogPost)
);

blog.put(
  '/blog/approve-decline',
  auth.verifyToken,
  checkPermissions(['admin-blog']),
  asyncHandler(BlogController.approveOrDeclineBlogPost)
);

blog.put(
  '/blog/manage',
  auth.verifyToken,
  checkPermissions('admin-blog'),
  asyncHandler(BlogController.manageBlogPost)
);

blog.get(
  '/blog/public',
  asyncHandler(BlogController.getApprovedBlogsList)
);

blog.get(
  '/blog/company/:companyId',
  auth.verifyToken,
  checkPermissions('normal'),
  asyncHandler(BlogController.getBlogsListPerCompany)
);

blog.get(
  '/blog/:status',
  auth.verifyToken,
  checkPermissions(['admin-blog']),
  asyncHandler(BlogController.getBlogsList)
);

blog.get(
  '/blog/info/:blogId',
  asyncHandler(BlogController.getBlogInfo)
);

blog.patch(
  '/blog/edit/:blogId',
  auth.verifyToken,
  asyncHandler(BlogController.editBlogInfo)
);

blog.delete(
  '/blog/delete/:blogId',
  auth.verifyToken,
  checkPermissions(['normal', 'admin-blog']),
  asyncHandler(BlogController.deleteBlog)
);

/*
 * FilterBy ---   company       | topic                 | year             | company-type
 * FilterValue--  id of company | activity id           | a year-eg.2020   |
 */
blog.get(
  '/blogs/public/filter',
  asyncHandler(BlogController.getBlogsFiltered)
);

/*
 * SortBy ---    date or  title
 * SortValue--   desc or asc
 */
blog.get(
  '/blogs/public/sort',
  asyncHandler(BlogController.getBlogsSorted)
);

// Search in Title, Description and Category
blog.get(
  '/blogs/search',
  asyncHandler(BlogController.searchForBlogs)
);

export default blog;
