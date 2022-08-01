import { useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

const cx = classNames.bind(styles);

const menu = [
  {
    display: "Dashboard",
    icon: `bx bxs-home`,
    path: "/dashboard",
    children: [],
  },
  {
    display: "Bài viết",
    icon: `bx bxl-blogger`,
    path: "/post",
    children: [
      {
        display: "Tất cả bài viết",
        path: "/post/all",
      },
      {
        display: "Thêm bài viết",
        path: "/post/add",
      },
      {
        display: "Danh mục",
        path: "/post/categories",
      },
    ],
  },
  {
    display: "Trang",
    icon: `bx bxs-bookmarks`,
    path: "/page",
    children: [
      {
        display: "Tất cả trang",
        path: "/page/all",
      },
      {
        display: "Thêm trang mới",
        path: "/page/add",
      },
    ],
  },
];

const Sidebar = ({ shrink, onShrink }) => {
  const handleShrink = () => {
    onShrink();
  };

  const [activeItem, setActiveItem] = useState(0);

  const handleActiveItem = (index) => {
    setActiveItem(index);
  };

  return (
    <>
      <div className={`${cx("wrapper")} ${shrink ? cx("shrink") : ""}`}>
        <div className={cx("logo")}>
          <div className={cx("logo-content")}>Front-end Developer</div>
          <span onClick={handleShrink} className={cx("logo-menu")}>
            <span className={cx("logo-menu__hamburger")}></span>
          </span>
        </div>
        <ul className={cx("menu")}>
          {menu.map((item, index) => (
            <ItemSidebar
              key={index}
              item={item}
              index={index}
              onActiveItem={(index) => handleActiveItem(index)}
              activeItem={activeItem}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

Sidebar.propTypes = {};

const ItemSidebar = ({ activeItem, onActiveItem, index, item }) => {
  const handleActiveItem = () => onActiveItem(index);

  return (
    <li onClick={handleActiveItem} className={cx("menu-item")}>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          isActive
            ? `${cx("menu-item__link")} ${cx("active")}`
            : `${cx("menu-item__link")}`
        }
      >
        <span className={cx("menu-item__icon")}>
          <i className={item.icon}></i>
        </span>
        <span className={cx("menu-item__text")}>{item.display}</span>
        {item.children.length > 0 && (
          <span
            className={`${cx("menu-item__icon-sub")} ${
              activeItem === index ? cx("expanded") : ""
            }`}
          >
            <IoMdArrowDropright />
          </span>
        )}
      </NavLink>
      {item.children.length > 0 && (
        <ul
          className={`${cx("menu__sub")} ${
            activeItem === index ? cx("expanded") : ""
          }`}
        >
          {item.children.map((subItem, index) => (
            <li key={index} className={cx("menu__sub-item")}>
              <NavLink
                to={subItem.path}
                className={({ isActive }) =>
                  isActive
                    ? `${cx("menu__sub-item__link")} ${cx("active")}`
                    : `${cx("menu__sub-item__link")}`
                }
              >
                {subItem.display}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;
