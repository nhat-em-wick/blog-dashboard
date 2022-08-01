import React from 'react'
import styles from './Title.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const Title = ({style, title}) => {
  return (
    <h3 className={cx('heading')} style={style}>{title}</h3>
  )
}

export default Title