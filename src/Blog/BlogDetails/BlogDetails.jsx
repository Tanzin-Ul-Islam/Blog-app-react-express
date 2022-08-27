import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../../config/db';
import './blog-details.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../../DataProvider';
import axios from 'axios';

const BlogDetails = () => {
    let { token, url, imageURL } = useContext(DataContext);
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        getBlog();
    }, []);


    async function getBlog() {
        try {
            await axios({
                method: 'GET',
                url: url + 'blog/' + id,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data.data);
                setBlog(response.data.data)
            }).catch(error => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Link className='blog-goBack' to='/'>
                <span> &#8592;</span> <span>Go Back</span>
            </Link>
            {blog ? (
                <div className='blog-wrap'>
                    <header>
                        <p className='blog-date'>Published {blog.createdAt}</p>
                        <h1>{blog.title}</h1>
                        <div className='blog-subCategory'>
                            <div>
                                <p className='chip'>{blog.category}</p>
                            </div>
                        </div>
                    </header>
                    {
                        blog.image ?
                            <img className='blogItem-cover' src={imageURL + 'blog/' + blog.image} alt='cover' />
                            : <img className='blogItem-cover' src={'/assets/images/default.jpg'} alt='cover' />

                    }
                    <footer>
                        <div className='blogItem-author'>
                            {
                                blog.authorId.profilePic ?
                                    <img src={imageURL + 'user/' + blog.authorId.profilePic} alt='avatar' />
                                    :
                                    <img src={'/assets/images/author.jpg'} alt='avatar' />
                            }
                            <div>
                                <h6>{blog.authorId.userName}</h6>
                                <p>{blog.createdAt}</p>
                            </div>
                        </div>
                    </footer>
                    <p className='blog-desc'>{blog.description}</p>
                </div>
            ) : "Blog Not Found!!"}
        </>
    );
};

export default BlogDetails;
