import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

import { useDebounce } from '~/hooks'
import {BiSearch} from 'react-icons/bi'

const cx = classNames.bind(styles)
const Search = ({onSubmit, placeholder}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const debounce = useDebounce(searchTerm)

  useEffect(() => {
    if(!debounce.trim()) {
      return
    }else {
      if(onSubmit) {
        onSubmit(debounce.trim())
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce])

  return (
    <div className={cx('search-box')}>
      <input placeholder={placeholder} className={cx('search-box__input')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <span className={cx('search-box__icon')}>
        <BiSearch />
      </span>
    </div>
  )
}
Search.defaultProps = {
  onSubmit: null
}
Search.propTypes = {
  onSubmit: PropTypes.func
}

export default Search