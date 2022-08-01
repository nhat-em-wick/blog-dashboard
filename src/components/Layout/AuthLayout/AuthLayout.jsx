import {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './AuthLayout.module.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const cx = classNames.bind(styles)

const AuthLayout = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    if(user) {
      return navigate('/dashboard')
    }
  }, [navigate])

  return (
    <main className={cx('main')}>
      <Outlet />
    </main>
  )
}

export default AuthLayout