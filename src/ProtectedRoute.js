import { useContext } from "react";
import AppContext from "./AppContext";
import { Navigate, Outlet, Routes } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  
  const appContext = useContext(AppContext);
  if (appContext.user === "") {
    // 로그인되지 않았다면 로그인 페이지로 리다이렉트
    Swal.fire({
      icon: "warning",
      title: "",
      text: `로그인을 해주시기 바랍니다.`,
      
      confirmButton: true,
      confirmButtonText: "확인",
      confirmButtonColor: "#FFCD4A",
      customClass: {
        confirmButton: 'no-outline',
      }
    
  })
    
    return <Navigate to="/login" />;
  }

  return <Outlet/>;
};

export default ProtectedRoute;