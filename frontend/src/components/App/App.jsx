import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layout/Layout.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const AuthPage = lazy(() => import("../../pages/AuthPage/AuthPage.jsx"));

function App() {
  return (
    <Suspense fallback={    
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='auth/:authType' element={<AuthPage />} />
          <Route path='*' element={<NotFound />} />


          <Route element={<ProtectedRoute />}>
            <Route index element={<MainPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
