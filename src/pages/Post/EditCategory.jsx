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
import { useDispatch } from "react-redux";
import { setHeading } from "~/redux/headingSlice";
import Search from "~/components/Search";
import { notifyError, notifySuccess } from "~/components/Toast";
import { useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

const column = [
  { heading: "tên", value: "name" },
  {heading: "Đường dẫn", value: "slug"},
  { heading: "hành động", value: "", type: 'action' },
];
const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [optsCate, setOptsCate] = useState([])
  const [parent, setParent] = useState({name: "Trống", value: ""})
  const [category, setCategory] = useState('')
  const {slug} = useParams()
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("danh mục"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const resCategory = await categoriesApi.getBySlug(slug)
        const resCategories = await categoriesApi.getAll()
        const filterCate = resCategories.elements.categories.filter(item => item._id !== resCategory.element._id && item.parent === null)
        setCategories(resCategories.elements.categories)
        setOptsCate(filterCate)
        setCategory(resCategory.element)
        setParent((resCategory.element.parentId === '' || resCategory.element.parentId==null) ? {name: "Trống", value: ""} : resCategory.element.parentId )
      } catch (error) {
        notifyError(`có lỗi xảy ra: ${error.data.error.message}`)
        console.error(error)
      }
    }
    getCategory()
  }, [slug])

  const formik = useFormik({
    initialValues: {
      name: category.name || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Không được để trống"),
    }),
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        parentId: parent?._id || '',
        slug: 'nhat-tam-giac'
      }
      try {
        const res = await categoriesApi.edit(slug, data)
        notifySuccess('Sửa thành công')
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
    navigate(`/blog/categories/${item.slug}`)
  }
 
  return (
    <div className="grid">
      <div className="row">
        <div className="col l-6 l-o-3">
          <Card>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <Title
              title="Sửa danh mục"
              style={{ fontSize: "var(--h4-font-size)", marginBottom: '0' }}
            />
            <Button onClick={() => navigate(-1)} classNames="btn btn-outline-primary btn-xs">Quay lại</Button>
            </div>
            
            <div className={cx("add-category")}>
              <FormText
                id="name"
                label={"Tên"}
                size={"sm"}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
              />
              <FormSelect defaultValue={parent} label={"Danh mục cha"} opts={optsCate} onChange={(opt) => setParent(opt)} />
              <Button onClick={handleSubmit} classNames="btn btn-primary btn-sm">
                Cập nhật danh mục
              </Button>
            </div>
          </Card>
        </div>
        
      </div>
    </div>
  );
};

Categories.propTypes = {};

export default Categories;
