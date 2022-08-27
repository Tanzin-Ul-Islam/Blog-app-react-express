import React from 'react'
import './add-blog.css'
export default function AddBlog() {
    return (
        <div>
            <div class="card mb-3 card-style">
                <img src='/assets/images/default.jpg' height={320} width={'100%'} />
                <div class="card-body">
                    <h5 class="card-title">Add new blog</h5>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        <input type="text" class="form-control" placeholder="title" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Category</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Select category</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Featured Image</label>
                        <input type="file" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button className='btn btn-primary'>Create</button>
                </div>
            </div>
        </div>
    )
}
