import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeading } from "~/redux/headingSlice";
import Card from "~/components/Card";
import { useNavigate } from "react-router-dom";
import Table from "~/components/Table";
import Button from "~/components/Button";
import Search from "~/components/Search";

import Pagination from "~/components/Pagination";
import { setPages, addPage, removePage } from "~/redux/pagesSlice";
import { notifySuccess } from "~/components/Toast";
import pagesApi from "~/api/pagesApi";

const Pages = () => {
  const column = [
    { heading: "tiêu đề", value: "title" },
    { heading: "tác giả", value: "author" },
    { heading: "thời gian", value: "createdAt", type:"time" },
    { heading: "hành động", value: "", type: 'action' },
  ];
  const dispatch = useDispatch();
  const pages = useSelector(state => state.pages.value)

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
    dispatch(setHeading("Trang"));
  }, []);

  useEffect(() => {
    const getPages = async () => {
      try {
        const res = await pagesApi.getAll(filters)
        setPagination(res.elements.pagination)
        dispatch(setPages(res.elements.pages))
      } catch (error) {
        console.error(error)
      }
    }
    getPages()
  }, [filters])

  const navigate = useNavigate()
  const handleEditItem = (item) => {
    navigate(`/page/edit/${item.slug}`)
  }

  const handleDelItem = async (item) => {
    try {
      const res = await pagesApi.delete(item.slug)
      dispatch(removePage(res.element))
      notifySuccess('Xóa thành công')
    } catch (error) {
      console.error(error)
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
      <section>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
         <Search size="sm" placeholder={'Tìm trang'} onSubmit={(value) => setFilters({
          ...filters,
          page: 1,
          q: value
         })}/>
        <Button onClick={() => navigate(`/page/add`)} classNames="btn btn-primary btn-sm">
          Thêm trang mới
        </Button>
        </div>
      </section>
      <section>
        <Card>
          <Table
              onActionDel={(item) => handleDelItem(item)}
              onActionEdit={(item) => handleEditItem(item)}
              data={pages}
              column={column}
              dataEmpty={"Không tìm thấy trang"}
            />
            {
              pages.length > 0 && <Pagination pagination={pagination} onPageChange={page => handlePageChange(page)} />
            }
        </Card>
      </section>
    </>
  );
};

export default Pages;
