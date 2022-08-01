import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "~/components/Card";
import Title from "~/components/Title";
import classNames from "classnames/bind";
import styles from "./Blog.module.scss";
import { FormText, FormSelect } from "~/components/Form";
import Button from "~/components/Button";
import Table from "~/components/Table";
import Pagination from "~/components/Pagination";
import { useFormik } from "formik";
import * as Yup from "yup";
import categoriesApi from "~/api/categoriesApi";
import { useDispatch, useSelector } from "react-redux";
import { setHeading } from "~/redux/headingSlice";
import Search from "~/components/Search";
import { notifyError, notifySuccess } from "~/components/Toast";
import { useNavigate } from "react-router-dom";
import { setCate, addCate, removeCate } from "~/redux/categoriesSlice";

const cx = classNames.bind(styles);

const column = [
  { heading: "tên", value: "name" },
  {heading: "Đường dẫn", value: "slug"},
  { heading: "hành động", value: "", type: 'action' },
];
const Categories = (props) => {
  const categories = useSelector(state => state.categories.value)
  const [parent, setParent] = useState({name: "Trống", value: ""})
  const [search, setSearch] = useState({})
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("danh mục"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await categoriesApi.getAll(search)
        dispatch(setCate(res.elements.categories))
      } catch (error) {
        notifyError(`có lỗi xảy ra: ${error.data.error.message}`)
        console.error(error)
      }
    }
    getCategories()
  }, [search])

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Không được để trống"),
    }),
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        parentId: parent._id
      }
      try {
        const res = await categoriesApi.create(data)
        setParent({name: "Trống", value: ""})
        formik.resetForm()
        dispatch(addCate(res.element))
        notifySuccess('Tạo thành công')
      } catch (error) {
        notifyError(`có lỗi xảy ra: ${error.data.error.message}`)
      }
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit()
  }
 
  const navigate = useNavigate()
  const handleEditItem = (item) => {
    navigate(`/post/categories/edit/${item.slug}`)
  }
  const handleDelItem = async (item) => {
    try {
      const res = await categoriesApi.delete(item.slug)
      dispatch(removeCate(res.element))
      notifySuccess(' Xóa thành công')
    } catch (error) {
      notifyError('Có lỗi xảy ra')
    }
  }

  return (
    <div className="grid">
      <div className="row">
        <div className="col l-4">
          <Card style={{ position: "sticky", top: "var(--header-height" }}>
            <Title
              title="Thêm danh mục"
              style={{ fontSize: "var(--h4-font-size)" }}
            />
            <div className={cx("add-category")}>
              <FormText
                id="name"
                label={"Tên"}
                size={"sm"}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
              />
              <FormSelect defaultValue={parent} label={"Danh mục cha"} opts={categories} onChange={(opt) => setParent(opt)} />
              <Button onClick={handleSubmit} classNames="btn btn-primary btn-sm">
                Thêm danh mục mới
              </Button>
            </div>
          </Card>
        </div>
        <div className="col l-8">
          <Card>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <Title
                title="Quản lý danh mục"
                style={{ fontSize: "var(--h4-font-size)", marginBottom: '0' }}
              />
              <Search placeholder={'Tìm danh mục'} onSubmit={(value) => setSearch({
                q: value
              })} />
            </div>
            <Table
              onActionDel={(item) => handleDelItem(item)}
              onActionEdit={(item) => handleEditItem(item)}
              data={categories}
              column={column}
              dataEmpty={'Không tìm thấy danh mục'}
            />
            
          </Card>
        </div>
      </div>
    </div>
  );
};

Categories.propTypes = {};

export default Categories;
