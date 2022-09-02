import React from 'react';
import BlogItem from '../BlogItem/BlogItem';
import './blog-list.css';

const BlogList = (props) => {
  return (
    <div className='blogList-wrap'>
      {props.blogs.map((blog) => (
        <BlogItem blog={blog} getBlogs={props.getBlogs} />
      ))}
    </div>
  );
};

export default BlogList;
