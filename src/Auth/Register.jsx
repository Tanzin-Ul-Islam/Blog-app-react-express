import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { DataContext } from '../DataProvider';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './register.css'
export default function Register() {
    let history = useHistory();
    const { url, token, setToken, userInfo, setUserInfo } = useContext(DataContext);

    let [name, setName] = useState('');
    let [userName, setUserName] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [password, setpassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [termsCondition, setTermsCondition] = useState(false);

    let validation = () => {
        if (!name) {
            swal({
                text: "Please enter name.",
                icon: "error",
            });
            return false;
        } else if (!userName) {
            swal({
                text: "Please enter user name.",
                icon: "error",
            });
            return false;
        } else if (!email) {
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
        } else if (!confirmPassword) {
            swal({
                text: "Please enter confirm password.",
                icon: "error",
            });
            return false;
        } else {
            if (password == confirmPassword) {
                return true
            } else {
                swal({
                    text: "Password did not matched!",
                    icon: "error",
                })
                return false;
            }
        }
    }
    let register = async (e) => {
        e.preventDefault();
        if (validation()) {
            try {
                let data = {
                    name: name,
                    userName: userName,
                    email: email,
                    phone: phone,
                    password: password
                }
                await axios.post(url + 'auth/signup', data).then((response) => {
                    if (response.status = 200) {
                        let res = response.data.data;
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('id', res._id);
                        localStorage.setItem('name', res.name);
                        localStorage.setItem('userName', res.userName);
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
                        console.log("user info", userInfo)
                        swal({
                            icon: 'success',
                            text: response.data.msg
                        });
                        history.push('/');
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
                        <h1>Sign Up</h1>
                        <p>It's not long before you embark on this journey! </p>

                        <form class="flex-c" onSubmit={(e) => { register(e) }}>
                            <div class="input-box">
                                <span class="label">Name</span>
                                <div class=" flex-r input">
                                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="name" />
                                    <i class="fas fa-at"></i>
                                </div>
                            </div>

                            <div class="input-box">
                                <span class="label">User Name</span>
                                <div class=" flex-r input">
                                    <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder="user name" />
                                    <i class="fas fa-at"></i>
                                </div>
                            </div>

                            <div class="input-box">
                                <span class="label">E-mail</span>
                                <div class=" flex-r input">
                                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="name@abc.com" />
                                    <i class="fas fa-at"></i>
                                </div>
                            </div>

                            <div class="input-box">
                                <span class="label">Phone No</span>
                                <div class=" flex-r input">
                                    <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="phone no" />
                                    <i class="fas fa-at"></i>
                                </div>
                            </div>

                            <div class="input-box">
                                <span class="label">Password</span>
                                <div class="flex-r input">
                                    <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="8+ (a, A, 1, #)" />
                                    <i class="fas fa-lock"></i>
                                </div>
                            </div>

                            <div class="input-box">
                                <span class="label">Confirm Password</span>
                                <div class="flex-r input">
                                    <input type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="8+ (a, A, 1, #)" />
                                    <i class="fas fa-lock"></i>
                                </div>
                            </div>

                            <div class="check">
                                <input type="checkbox" value={termsCondition} onChange={(e) => { setTermsCondition(e.target.checked) }} name="radio" id="" />
                                <span>I've read and agree with T&C</span>
                            </div>

                            <input class="btn" type="submit" value="Sign Up" />
                            <span class="extra-line">
                                <span>Already have an account?</span> &ensp;
                                <Link to="/login">Sign In</Link>
                            </span>
                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
}
