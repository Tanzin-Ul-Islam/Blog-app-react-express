import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import Chip from '../../../common/Chip';
import './blog-item.css';
import { DataContext } from '../../DataProvider';
import { useLocation, useHistory } from 'react-router-dom';
const BlogItem = ({ blog }) => {
    let history = useHistory();
    let location = useLocation();
    let id = localStorage.getItem('id')
    const { token, imageURL } = useContext(DataContext);
    return (
        <div className='blogItem-wrap'>
            <Link to={token ? `/blog-details/${blog._id}` : '/login'}>
                {
                    blog.image ?
                        <img className='blogItem-cover' src={imageURL + 'blog/' + blog.image} alt='cover' />
                        : <img className='blogItem-cover' src={'/assets/images/default.jpg'} alt='cover' />
                }
            </Link>
            <p className='chip'>
                <span>{blog.category}</span>
                {
                    (location.pathname == '/user-blogs' && blog.authorId?._id == id) ?
                        <div>
                            <span style={{ float: 'right' }} className="m-1"><i class="fa-solid fa-trash-can" style={{ cursor: 'pointer' }}></i></span>
                            <span style={{ float: 'right' }} className="m-1">
                                <i class="fa-solid fa-pen-to-square" onClick={() => { history.push('/update-blog/' + blog._id) }} style={{ cursor: 'pointer' }}></i>
                            </span>
                        </div>
                        : ''
                }
            </p>
            <h3>{blog.title}</h3>
            <p className='blogItem-desc'>{blog.description.substring(0, 80)}</p>
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
                <Link className='blogItem-link' to={token ? `/blog-details/${blog._id}` : '/login'}>
                    ➝
                </Link>
            </footer>
        </div>
    );
};

export default BlogItem;
