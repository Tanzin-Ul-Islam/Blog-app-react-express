import axios from 'axios';
import React from 'react'
import { useState, useContext } from 'react'
import swal from 'sweetalert';
import './add-blog.css'
import { DataContext } from '../../DataProvider';
import { useHistory } from 'react-router-dom';
export default function AddBlog() {
    let history = useHistory();
    const { url, token } = useContext(DataContext);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    function validation() {
        if (!title) {
            swal({
                title: "Please enter blog title",
                icon: 'error'
            });
            return false;
        } else if (!category) {
            swal({
                title: "Please select category",
                icon: 'error'
            });
            return false;
        } else if (!featuredImage) {
            swal({
                title: "Please provide image",
                icon: 'error'
            });
            return false;
        } else if (!description) {
            swal({
                title: "Please enter description.",
                icon: 'error'
            });
            return false;
        } else {
            return true;
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (validation()) {
            let data = {
                title: title,
                description: description,
                image: featuredImage,
                category: category,
            }
            await axios({
                method: 'POST',
                url: url + 'blog',
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => {
                if(response.status == 201){
                    swal({
                        icon: 'success',
                        text: response.data.msg,
                    });
                    history.push('/user-blogs');
                }
            }).catch((error) => {
                swal({
                    icon: "error",
                    text: error.response.data.msg
                })
            })
        }

    }
    return (
        <div>
            <div class="card mb-3 card-style">
                {
                    !previewImage ?
                        <img src='/assets/images/default.jpg' height={320} width={'100%'} />
                        :
                        <img src={previewImage} height={320} width={'100%'} />
                }
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div class="card-body">
                        <h5 class="card-title">Add new blog</h5>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Title</label>
                            <input type="text" class="form-control" value={title} onChange={(e) => {
                                setTitle(e.target.value)
                            }} placeholder="title" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Category</label>
                            <select class="form-select" aria-label="Default select example" value={category} onChange={(e) => {
                                setCategory(e.target.value)
                            }}>
                                <option style={{ display: 'none' }} selected>Select category</option>
                                <option value="food">Food</option>
                                <option value="travel">Travel</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Featured Image</label>
                            <input type="file" class="form-control" accept="image/*" defaultValue={featuredImage} onChange={(e) => {
                                setFeaturedImage(e.target.files[0]);
                                setPreviewImage(URL.createObjectURL(e.target.files[0]))
                            }} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => {
                                setDescription(e.target.value)
                            }}></textarea>
                        </div>
                        <button className='btn btn-primary'>Create</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
