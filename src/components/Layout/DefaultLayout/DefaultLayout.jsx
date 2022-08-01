import {useState, useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";


const cx = classNames.bind(styles);
const DefaultLayout = (props) => {
  const [shrink, setShrink] = useState(false)
  const handleShrink = useCallback(() => {
    setShrink(prev => !prev)
  }, [])

  

  return (
    <>
      <Sidebar shrink={shrink} onShrink={handleShrink} />
      <Header shrink={shrink} />
      <main className={`${cx("main")} ${shrink ? cx('shrink') : ''}`}>
        <Outlet />
      </main>
    </>
  );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;
