import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import BlogList from '../Blog/BlogList/BlogList'
import { blogList } from '../config/db'
import './user-blog.css'
import { DataContext } from '../DataProvider';
import axios from 'axios';
export default function UserBlog() {
  useEffect(() => {
    getBlogs();
  }, [])
  const { url, token } = useContext(DataContext);
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      await axios({
        method: 'GET',
        url: url + 'blog/users-blog',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        setBlogs(response.data.data);
      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <center>
        <h4 className='mb-3'>Your Blogs</h4>
        <Link class="badge rounded-pill text-white m-2 create-btn" to="/add-blog">Create Blog</Link>
      </center>
      {!blogs.length ? "No blog found" : <BlogList blogs={blogs} getBlogs={getBlogs}/>}
    </div>
  )
}
