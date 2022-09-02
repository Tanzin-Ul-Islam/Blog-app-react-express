import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
   
    const url = 'http://localhost:3001/api/';
    const imageURL = 'http://localhost:3001/';
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
    const [userInfo, setUserInfo] = useState({
        name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
        userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
        email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
        phone: localStorage.getItem('phone') ? localStorage.getItem('phone') : '',
        profilePic: localStorage.getItem('profilePic') ? localStorage.getItem('profilePic') : '',
        gender: localStorage.getItem('gender') ? localStorage.getItem('gender') : '',
        address: localStorage.getItem('address') ? localStorage.getItem('address') : '',
    });
    return (
        <DataContext.Provider value={{
            url,
            imageURL,
            token,
            setToken,
            userInfo,
            setUserInfo
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;