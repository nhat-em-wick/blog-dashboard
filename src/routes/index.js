import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DefaultLayout, AuthLayout } from "~/components/Layout";
import Dashboard from "~/pages/Dashboard";
import { Pages, AddPage, EditPage } from "~/pages/Page";
import {
  Posts,
  AddPost,
  EditPost,
  Categories,
  EditCategory,
} from "~/pages/Post";
import { Login } from "~/pages/Auth";
import ProtectedRoute, { CheckLogin } from "./ProtectedRoute";

const RouterPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/post" element={<Navigate to="/post/all" replace />} />
            <Route path="/post/all" element={<Posts />} />
            <Route path="/post/add" element={<AddPost />} />
            <Route path="/post/categories" element={<Categories />} />
            <Route
              path="/post/categories/edit/:slug"
              element={<EditCategory />}
            />
            <Route path="/post/edit/:slug" element={<EditPost />} />
            <Route path="/page" element={<Navigate to="/page/all" replace />} />
            <Route path="/page/all" element={<Pages />} />
            <Route path="/page/add" element={<AddPage />} />
            <Route path="/page/edit/:slug" element={<EditPage />} />
          </Route>
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route index path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPage;
