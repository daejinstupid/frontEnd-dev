import { useEffect, useState } from "react";
import axios from "axios"; // axiosConfig.js에서 설정한 axios 기본 설정을 사용
import { useParams } from "react-router-dom";
import ManagerNav from "./ManagerNav";
import Footer from "../Footer";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ManagerCancelReservationStats = () => {
    const { cafeId } = useParams();
    const [stats, setStats] = useState([]);

    useEffect(() => {
        axios.get(`/manager/cancelreservationstats/${cafeId}`) // axiosConfig.js에서 설정한 baseURL을 사용
            .then((response) => {
                setStats(response.data);
            })
            .catch((error) => {
                console.error("Error fetching cancel reason stats:", error);
            });
    }, [cafeId]);

    // 차트 데이터 준비
    const chartData = {
        labels: stats.map(stat => stat.cancelContent),
        datasets: [
            {
                label: "취소 횟수",
                data: stats.map(stat => stat.cancelCount),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40"
                ]
            }
        ]
    };

    return (
        <div>
            <ManagerNav />
            <div>
                <h2>취소 사유 통계</h2>
                <div style={{ width: "50%", margin: "0 auto" }}>
                    <Pie data={chartData} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ManagerCancelReservationStats;
