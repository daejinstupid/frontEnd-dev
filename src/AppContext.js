import { useEffect, useState, createContext } from "react";

// 전역 상태를 제공하는 객체 생성 및 내보내기
const AppContext = createContext({
  user: "",
  accessToken: "",
  role: "",
  cafeId: "", // 추가된 cafeId 상태
  setUser: function (user) {
    this.user = user;
  },
  setAccessToken: function (accessToken) {
    this.accessToken = accessToken;
  },
  setRole: function (role) {
    this.role = role;
  },
  setCafeId: function (cafeId) { // 추가된 cafeId setter
    this.cafeId = cafeId;
  },
});

export default AppContext;

// AppContext를 제공하는 provider 컴포넌트 생성 및 내보내기
// 초기값을 줄 때 localStorage에 담겨있던 값을 넣어줌(context에서!!) - 새로고침 시에도 로그인 유지
export function AppContextProvider(props) {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [accessToken, setAccessToken] = useState(
      localStorage.getItem("accessToken") || ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [cafeId, setCafeId] = useState(localStorage.getItem("cafeId") || ""); // 추가된 cafeId 상태

  const value = {
    user,
    accessToken,
    role,
    cafeId, // context에 cafeId 포함
    setUser,
    setAccessToken,
    setRole,
    setCafeId, // cafeId setter 포함
  };

  // 상태가 변경되면 localStorage에 상태 저장
  useEffect(() => {
    localStorage.setItem("user", user);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("role", role);
    localStorage.setItem("cafeId", cafeId); // cafeId를 localStorage에 저장
  }, [user, accessToken, role, cafeId]);

  return (
      <AppContext.Provider value={value}>
        {props.children} {/** 자식들에게 value 값 모두 전달 */}
      </AppContext.Provider>
  );
}
