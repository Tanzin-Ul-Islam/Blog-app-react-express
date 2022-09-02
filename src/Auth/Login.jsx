import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import './login.css'
import { DataContext } from '../DataProvider';
import axios from 'axios';
export default function Login() {
    let history = useHistory();
    const { url, setToken, userInfo, setUserInfo } = useContext(DataContext);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let validation = () => {
        if (!email) {
            swal({
                text: "Please enter email.",
                icon: "error",
            });
            return false;
        } else if (!password) {
            swal({
                text: "Please enter password.",
                icon: "error",
            });
            return false;
        }
        return true;
    }
    let login = async (e) => {
        e.preventDefault();
        if (validation()) {
            try {
                let data = {
                    email: email,
                    password: password
                }
                await axios.post(url + 'auth/signin', data).then((response) => {
                    if (response.status = 200) {
                        let res = response.data.data;
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('id', res._id)
                        localStorage.setItem('name', res.name)
                        localStorage.setItem('userName', res.userName)
                        localStorage.setItem('email', res.email);
                        localStorage.setItem('phone', res.phone);
                        localStorage.setItem('profilePic', res.profilePic);
                        setToken(response.data.token);
                        let obj = {
                            name: res.name,
                            userName: res.userName,
                            email: res.email,
                            phone: res.phone,
                            profilePic: res.profilePic
                        }
                        setUserInfo(obj);
                        console.log("user info",userInfo)
                        swal({
                            icon: 'success', 
                            text: response.data.msg
                        });
                        history.push('/')
                    }
                }).catch(error => {
                    swal({
                        text: error.response.data.msg,
                        icon: "error",
                    });
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <div class=" flex-r container" style={{ margin: '-25px' }}>
                <div class="flex-r login-wrapper">
                    <div class="login-text">
                        <div class="logo">
                            <span><i class="fab fa-speakap"></i></span>
                            <span>Bloggers</span>
                        </div>
                        <h1>Sign In</h1>
                        <p>It's not long before you embark on this journey! </p>

                        <form class="flex-c" onSubmit={(e) => { login(e) }}>
                            <div class="input-box">
                                <span class="label">E-mail</span>
                                <div class=" flex-r input">
                                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="name@abc.com" />
                                    <i class="fas fa-at"></i>
                                </div>
                            </div>

                            <div class="input-box">
                                <span class="label">Password</span>
                                <div class="flex-r input">
                                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="8+ (a, A, 1, #)" />
                                    <i class="fas fa-lock"></i>
                                </div>
                            </div>

                            <input class="btn" type="submit" value="Sign In" />
                            <span class="extra-line">
                                <span>Does not have an account?</span>&ensp;
                                <Link to="/register">Sign Up</Link>
                            </span>
                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
}
