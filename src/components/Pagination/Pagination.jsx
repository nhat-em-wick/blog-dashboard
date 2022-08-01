import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Pagination.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Button from "../Button";
import { v4 as uuidv4 } from "uuid";

const cx = classNames.bind(styles);
const Pagination = ({pagination, onPageChange}) => {

  const { page, limit, total } = pagination
  const totalPages = Math.ceil(total / limit)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
 
  const [renderItem, setRenderItem] = useState(pageNumbers)
  const [currentPage, setCurrentPage] = useState(1)

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page)
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    setRenderItem(pageNumbers)
  }, [pagination])

  const handlePrev = () => {
    handlePageChange(currentPage - 1)
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }
  const handleNext = () => {
    handlePageChange(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Button onClick={handlePrev} classNames={`btn btn-outline-primary ${cx('item')} ${currentPage <= 1 ? 'btn-disabled' : ''}`}>
          <MdKeyboardArrowLeft />
        </Button>
        {
        renderItem.map((item, index) => (
          <React.Fragment key={uuidv4()}>
            {
              (item < maxPageNumberLimit + 1 && item > minPageNumberLimit) ? <Button
                onClick={() => handlePageChange(item)}
                classNames={`btn btn-outline-primary ${cx('item')} ${item === currentPage ? cx('active') : ''}`}>
                {item}
              </Button> : null
            }
          </React.Fragment>
        ))
      }
        <Button onClick={handleNext} classNames={`btn btn-outline-primary ${cx('item')} ${currentPage >= totalPages ? 'btn-disabled' : ''}`}>
          <MdKeyboardArrowRight />
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
