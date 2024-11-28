import { BrowserRouter, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import Main from "./Main";
import Manager from "./Manager/Manager";
import User from "./User/User";
import Login from "./Login";
import Register from "./Register";
import ManagerCafeInfo from "./Manager/ManagerCafeInfo";
import ManagerReservation from "./Manager/ManagerReservation";
import ManagerReservationStatus from "./Manager/ManagerReservationStatus/ManagerReservationStatus";
import ManagerReservationList from "./Manager/ManagerReservationList";
import ManagerCancelReservationStats from "./Manager/ManagerCancelReservationStats";
import ManagerRegister from "./Manager/ManagerRegister";
import UserSearch from "./User/UserSearch";
import UserFind from "./User/UserFind";
import UserReservationStatus from "./User/UserReservationStatus";
import UserMyReservation from "./User/UserMyReservation";
import UserMyInfo from "./User/UserMyInfo";
import EmptyRegister from "./Manager/EmptyRegister";
import ManagerUpdateStudySetting from "./Manager/ManagerUpdateStudySetting";
import ManagerUpdateDetail from "./Manager/ManagerUpdateDetail";
import ManagerUpdateBasic from "./Manager/ManagerUpdateBasic";
import ManagerUpdate from "./Manager/ManagerUpdate";
import UserReservation from "./User/UserReservation";
import UserReservationStatusStatusEmpty from "./User/UserReservationStatusEmpty";
import UserReservationStatusCancel from "./User/UserReservationStatusCancel";
import UserInfoUpdate from "./User/UserInfoUpdate";
import CafeRegister from "./Manager/CafeRegister";

// UserCafeReviewList를 import 추가
import UserCafeReviewList from "./User/UserCafeReviewList"; // 적절한 경로로 수정

import { addAuthHeader } from "./apis/axiosConfig";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    const accessToken = localStorage.getItem("accessToken") || "";
    if (accessToken !== "") {
        addAuthHeader(accessToken);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/user" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/manager/cafeinfo" element={<ManagerCafeInfo />} />
                    <Route path="/manager/reservation" element={<ManagerReservation />} />
                    <Route path="/manager/reservationstatus" element={<ManagerReservationStatus />} />
                    <Route path="/manager/reservationlist" element={<ManagerReservationList />} />

                    {/* 특정 cafeId에 따른 취소 사유 통계 페이지 */}
                    <Route path="/manager/cancelreservationstats/:cafeId" element={<ManagerCancelReservationStats />} />

                    <Route path="/manager/emptyregister" element={<EmptyRegister />} />
                    <Route path="/manager/register" element={<ManagerRegister />} />
                    <Route path="/manager/updatebasic" element={<ManagerUpdateBasic />} />
                    <Route path="/manager/updatedetail" element={<ManagerUpdateDetail />} />
                    <Route path="/manager/updatesetting" element={<ManagerUpdateStudySetting />} />
                    <Route path="/manager/update" element={<ManagerUpdate />}>

                        <Route index element={<ManagerUpdateBasic />} />
                        <Route path="updatebasic" element={<ManagerUpdateBasic />} />
                        <Route path="updatedetail" element={<ManagerUpdateDetail />} />
                        <Route path="updatesetting" element={<ManagerUpdateStudySetting />} />
                    </Route>

                    <Route path="/manager/cafe/initial" element={<CafeRegister />} />

                    <Route path="/user/search" element={<UserSearch />} />
                    <Route path="/user/find" element={<UserFind />} />
                    <Route path="/user/reservationstatus/:reservationId" element={<UserReservationStatus />} />
                    <Route path="/user/myinfo" element={<UserMyInfo />} />
                    <Route path="/user/myreservation" element={<UserMyReservation />} />
                    <Route path="/user/reservation/:cafeId" element={<UserReservation />} />
                    <Route path="/user/reservationstatus/empty" element={<UserReservationStatusStatusEmpty />} />
                    <Route path="/user/reservationstatus/cancel/:reservationId" element={<UserReservationStatusCancel />} />
                    <Route path="/user/myinfo/update" element={<UserInfoUpdate />} />

                    {/* UserCafeReviews 경로 추가 */}
                    <Route path="/user/reservation/review/:cafeId" element={<UserCafeReviewList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
