import { useEffect, useState } from "react";
import styles from "./Blog.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { setHeading } from "~/redux/headingSlice";
import Card from "~/components/Card";
import { useNavigate } from "react-router-dom";
import Table from "~/components/Table";
import Button from "~/components/Button";
import Search from "~/components/Search";
import postsApi from "~/api/postsApi";
import Pagination from "~/components/Pagination";
import { setPosts, addPost, removePost } from "~/redux/postsSlice";
import { notifySuccess } from "~/components/Toast";

const cx = classNames.bind(styles);
const Blog = () => {
  const column = [
    { heading: "tiêu đề", value: "title" },
    { heading: "danh mục", value: "categories.name", type: 'array' },
    { heading: "tác giả", value: "author" },
    { heading: "thời gian", value: "createdAt", type:"time" },
    { heading: "hành động", value: "", type: 'action' },
  ];
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.value)

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 10
  })

  useEffect(() => {
    dispatch(setHeading("Bài viết"));
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postsApi.getAll(filters)
        dispatch(setPosts(res.elements.posts))
        setPagination(res.elements.pagination)
      } catch (error) {
        console.error(error)
      }
    }
    getPosts()
  }, [filters])

  const navigate = useNavigate()
  const handleEditItem = (item) => {
    navigate(`/post/edit/${item.slug}`)
  }

  const handleDelItem = async (item) => {
    try {
      const res = await postsApi.delete(item.slug)
      dispatch(removePost(res.element))
      notifySuccess('Xóa thành công')
    } catch (error) {
      console.error(error)
      throw new Error(error.response.data.message)
    }
  }

  const handlePageChange = (page) => {
    setFilters({
      ...filters,
      page: page
    })
  }

  return (
    <>
      <section className={cx("header")}>
        <div className={cx("header-left")}>
         <Search size="sm" placeholder={'Tìm bài viết'} onSubmit={(value) => setFilters({
          ...filters,
          page: 1,
          q: value
         })}/>
        </div>
        <Button onClick={() => navigate(`/post/add`)} classNames="btn btn-primary btn-sm">
          Thêm bài viết
        </Button>
      </section>
      <section className={cx("body")}>
        <Card>
          <Table
              onActionDel={(item) => handleDelItem(item)}
              onActionEdit={(item) => handleEditItem(item)}
              data={posts}
              column={column}
              dataEmpty={"Không tìm thấy bài viết"}
            />
            {
              posts.length > 0 && <Pagination pagination={pagination} onPageChange={page => handlePageChange(page)} />
            }
        </Card>
      </section>
    </>
  );
};

export default Blog;
