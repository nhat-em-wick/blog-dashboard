import {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import { GoSearch } from "react-icons/go"
import { BiUser,BiLogOut } from "react-icons/bi";
import avatar from '~/assets/images/avatar.jpg'
import { useClickOutside } from '~/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '~/redux/authSlice'
import { useNavigate } from 'react-router-dom'

const cx=classNames.bind(styles)

const Header = ({shrink}) => {
  const actionRef = useRef(null)
  const [openAction, setOpenAction] = useState(false)
  const heading = useSelector(state => state.heading.value)
  useClickOutside(actionRef, () => setOpenAction(false))
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className={`${cx('header')} ${shrink ? cx('shrink') : ''}`}>
      <div className={cx('header-left')}>
        <h3>{heading}</h3>
      </div>
      <div className={cx("header-search")}>
        <input type="text" placeholder='Search...' className={cx('header-search__input')} />
        <span className={cx('header-search__button')}><GoSearch/></span>
      </div>
      <div className={cx("header-right")}>
        <div className={cx("header-right__item")}>
          <div ref={actionRef}  className={cx('user')}>
            <div onClick={() =>setOpenAction(!openAction)} className={cx("user-avatar")}>
              <img src={avatar} alt=""  />
            </div>
            <ul className={`${cx("user-action")} ${openAction ? cx('active') : ''}`}>
              <li className={cx("user-action__item")}>
                <a href="#" className={cx("user-action__link")}>
                  <span className={cx('user-action__icon')}>
                    <BiUser />
                  </span>
                  <span className={cx('user-action__text')}>profile</span>
                </a>
              </li>
              <li className={cx("user-action__item")}>
                <div onClick={handleLogout} className={cx("user-action__link")}>
                    <span className={cx('user-action__icon')}>
                      <BiLogOut />
                    </span>
                    <span className={cx('user-action__text')}>logout</span>
                  </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {}

export default Header