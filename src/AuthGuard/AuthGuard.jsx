import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { DataContext } from '../DataProvider'
export default function AuthGuard({ children }) {
  let history = useHistory()
  let { token } = useContext(DataContext);
  if (token) {
    return children
  } else {
    return history.push('/login');
  }
}
