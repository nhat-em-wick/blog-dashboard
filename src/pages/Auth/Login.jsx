import React from "react";
import Card from "~/components/Card";
import { FormText } from "~/components/Form";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Button from "~/components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "~/redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { notifyError } from "~/components/Toast";

const cx = classNames.bind(styles);

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ.")
        .required("Email là bắt buộc."),
      password: Yup.string()
        .required("Mật khẩu là bắt buộc.")
        .min(6, "Mật khẩu từ 6 ký tự trở lên"),
    }),
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password
      };
      try {
        const action = await dispatch(login(data))
        // const user = unwrapResult(action)
        navigate('/dashboard')
      } catch (error) {
        console.error(error)
        notifyError(error.data.error.message)
      }
    },
  });

  return (
    <div className="grid">
      <div className="row">
        <div className="col l-4 l-o-4">
          <Card>
            <h2 className={cx("heading")}>Blog</h2>
            <div className={cx("form")}>
              <FormText
                label={"Email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                id="email"
              />
              <FormText
                id="password"
                label={"Mật khẩu"}
                type={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
              />
              <Button onClick={() => formik.handleSubmit()} classNames="btn btn-primary btn-sm">Đăng nhập</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
