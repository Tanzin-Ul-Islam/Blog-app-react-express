import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import BlogList from '../Blog/BlogList/BlogList'
import { blogList } from '../config/db'
import { DataContext } from '../DataProvider';
export default function Home() {
  useEffect(() => {
    getBlogs();
  }, [])
  const { url, token } = useContext(DataContext);
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      await axios({
        method: 'GET',
        url: url + 'blog'
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
      {!blogs.length ? "No blog found" : <BlogList blogs={blogs} />}
    </div>
  )
}
