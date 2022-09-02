import React, { useState, useContext } from 'react';
import './header.css';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { DataContext } from '../../DataProvider';
export default function Header() {
    let history = useHistory()
    const { token, setToken, userInfo } = useContext(DataContext);
    function logout() {
        localStorage.clear();
        setToken(null);
        history.push('/');
    }
    return (
        <nav class="navbar mb-5">
            <Link to="/" class="nav-logo">Blog App</Link>
            <ul class="nav-links">
                <li><NavLink to="/">Home</NavLink></li>
                <li>
                    <div class="dropdown">
                        <a href='javascript:void(0)' class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Category
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="javascript:void(0)" style={{ color: 'black' }} onClick={() => { history.push('/?category=' + 'food') }}>Food</a></li>
                            <li><a class="dropdown-item" href="javascript:void(0)" style={{ color: 'black' }} onClick={() => { history.push('/?category=' + 'sports') }}>Sports</a></li>
                            <li><a class="dropdown-item" href="javascript:void(0)" style={{ color: 'black' }} onClick={() => { history.push('/?category=' + 'travel') }}>Travel</a></li>
                        </ul>
                    </div>
                </li>
                {
                    token == null ?
                        <li><NavLink to="/login"><i class="fa-solid fa-user sign-in-icon"></i> Sign In</NavLink></li>
                        :
                        <li>
                            <div class="dropdown">
                                <a href='javascript:void(0)' class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-user"></i> Profile
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link to="/profile" class="dropdown-item" href="javascript:void(0)" style={{ color: 'black' }}>Profile</Link></li>
                                    <li><Link to="/user-blogs" class="dropdown-item" href="javascript:void(0)" style={{ color: 'black' }}>Your Blogs</Link></li>
                                    <li><Link class="dropdown-item" href="javascript:void(0)" style={{ color: 'black' }} onClick={() => { logout() }}>Logout</Link></li>
                                </ul>
                            </div>
                        </li>
                }
            </ul>
        </nav>
    )
}
