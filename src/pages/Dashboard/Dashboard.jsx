import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { useDispatch } from "react-redux";
import { setHeading } from "~/redux/headingSlice";
import Card from "~/components/Card";

const cx = classNames.bind(styles);
const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeading("dashboard"));
  }, []);

  return (
    <>
      <div className="grid">
        <div className="row">
          <div className="col l-12">
            <section className={cx("status")}>
              <div className="row">
                <div className="col l-3">
                  <Card>
                    <h4>8,461</h4>
                    <span>New Booking</span>
                  </Card>
                </div>
                <div className="col l-3">
                  <Card>
                    <h4>8,461</h4>
                    <span>New Booking</span>
                  </Card>
                </div>
                <div className="col l-3">
                  <Card>
                    <h4>8,461</h4>
                    <span>New Booking</span>
                  </Card>
                </div>
                <div className="col l-3">
                  <Card>
                    <h4>8,461</h4>
                    <span>New Booking</span>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
