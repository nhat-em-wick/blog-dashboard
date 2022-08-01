import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ({classNames, children, onClick, disable}) => {

  const handleClick = () => {
    if(onClick) {
      onClick()
    }
  }

  return (
    <button onClick={handleClick} className={`${classNames}`}>{children}</button>
  )
}
Button.defaultProps = {
  classNames: "btn btn-primary",
  onClick: null
}
Button.propTypes = {
  onClick: PropTypes.func,
  classNames: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string
}

export default Button