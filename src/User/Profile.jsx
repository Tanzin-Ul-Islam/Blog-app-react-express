import React from 'react'
import { useState, useContext } from 'react';
import './profile.css'
import { DataContext } from '../DataProvider';
import swal from 'sweetalert';
import axios from 'axios';
export default function Profile() {
  const { url, imageURL, userInfo, setUserInfo, token } = useContext(DataContext);
  let [isEdit, setEdit] = useState(false);
  let [name, setName] = useState(userInfo.name);
  let [userName, setUserName] = useState(userInfo.userName);
  let [phone, setPhone] = useState(userInfo.phone);
  let [gender, setGender] = useState(userInfo.gender);
  let [address, setAddress] = useState(userInfo.address);
  let [selectedFile, setSelectedFile] = useState(null);

  function editToogle() {
    setEdit(isEdit = !isEdit);
  }

  async function handleForm(e) {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('userName', userName);
      formData.append('phone', phone);
      formData.append('gender', gender);
      formData.append('address', address);
      formData.append('image', selectedFile ? selectedFile : userInfo.profilePic);
      await axios({
        method: 'PUT',
        url: url + 'user/profile',
        data: formData,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then((response) => {
        if (response.status = 200) {
          let res = response.data.data;
          localStorage.setItem('name', res.name)
          localStorage.setItem('userName', res.userName);
          localStorage.setItem('phone', res.phone);
          localStorage.setItem('gender', res.gender);
          localStorage.setItem('address', res.address);
          localStorage.setItem('profilePic', res.profilePic);
          let obj = {
            name: res.name,
            userName: res.userName,
            phone: res.phone,
            gender: res.gender,
            address: res.address,
            profilePic: res.profilePic
          }
          setUserInfo({ ...userInfo, obj });
          setSelectedFile(null);
          setEdit(false);
          swal({
            icon: 'success',
            text: response.data.msg
          });
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

  return (
    <div>
      <div class="card mb-5 " style={{ width: '30rem', margin: 'auto' }}>
        {
          userInfo && !userInfo.profilePic ?
            <img src="/assets/images/default.jpg" class="card-img-top" alt="default.jpg" height={240} width={100} />
            :
            <img src={imageURL + 'user/' + userInfo.profilePic} class="card-img-top" alt={userInfo.profilePic} height={240} width={100} />
        }

        <i class="fa-solid fa-pen-to-square edit-btn" onClick={() => { editToogle() }} style={{ cursor: 'pointer' }}></i>
        {isEdit ?
          <label
            for="p_image"
            class="profile_img_upload_btn"
          >
            <i class="fa-solid fa-camera img-btn" for="image" style={{ cursor: 'pointer' }}></i>
          </label>
          : ""}

        <div class="card-body">
          <div class="row g-3 align-items-center">
            {
              !isEdit
                ?
                <div>
                  <p><span><strong>Full Name:</strong>&ensp; {userInfo.name ? userInfo.name : 'N/A'}</span></p>
                  <p><span><strong>User Name:</strong>&ensp; {userInfo.userName ? userInfo.userName : 'N/A'}</span></p>
                  <p><span><strong>Email:</strong>&ensp; {userInfo.email ? userInfo.email : 'N/A'}</span></p>
                  <p><span><strong>Phone:</strong>&ensp; {userInfo.phone ? userInfo.phone : 'N/A'}</span></p>
                  <p><span><strong>Address:</strong>&ensp; {userInfo.address ? userInfo.address : 'N/A'}</span></p>
                  <p><span><strong>Gender:</strong>&ensp; {userInfo.gender ? userInfo.gender : 'N/A'}</span></p>
                </div>
                :
                <div>
                  <form onSubmit={(e) => { handleForm(e) }}>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Name</label>
                      <input type="text" class="form-control" aria-describedby="emailHelp" value={name} onChange={e => { setName(e.target.value) }} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">UserName</label>
                      <input type="text" class="form-control" id="exampleInputPassword1" value={userName} onChange={e => { setUserName(e.target.value) }} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Phone</label>
                      <input type="tel" class="form-control" id="exampleInputPassword1" value={phone} onChange={e => { setPhone(e.target.value) }} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Gender</label>
                      <select class="form-select" aria-label="Default select example" value={gender} onChange={e => { setGender(e.target.value) }}>
                        <option style={{ display: 'none' }} selected>Select category</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="exampleFormControlTextarea1" class="form-label">Address</label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={address} onChange={e => { setAddress(e.target.value) }}></textarea>
                    </div>

                    <div class="mb-3">
                      <input type="file" name="imge_field" hidden class="form-control" id="p_image" rows="3" defaultValue={selectedFile} onChange={e => { setSelectedFile(e.target.files[0]) }} />
                    </div>

                    <button type="submit" class="btn btn-primary">Update</button>
                  </form>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
