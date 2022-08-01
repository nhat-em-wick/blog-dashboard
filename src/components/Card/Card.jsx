import React from 'react'
import classNames from 'classnames/bind'

import styles from './Card.module.scss'
const cx = classNames.bind(styles)

const Card = ({children, style}) => {
  return (
    <div className={cx('wrapper')} style={style}>{children}</div>
  )
}

export default Card