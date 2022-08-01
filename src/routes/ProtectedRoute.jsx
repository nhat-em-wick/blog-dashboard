import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { logout } from '~/redux/authSlice';

const ProtectedRoute = () => {
  const user = useSelector(state => state.auth.user)
  const accessToken = user?.access_token
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if(user && jwt_decode(accessToken).exp >= Date.now() / 1000) {
      return
    }else {
      dispatch(logout())
      navigate('/login')
    }
  }, [location])
  return <Outlet />
}
 

export default ProtectedRoute