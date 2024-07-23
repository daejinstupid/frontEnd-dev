import { useEffect, useState } from "react";
import { createContext } from "react";

//전역 상태를 제공하는 객체 생성 및 내보내기
const AppContext = createContext({
  user: "",
  accessToken: "",
  role: "",
  setUser: function (user) {
    //화살표함수로 하면 this 객체 사용시 해당 const 내부 js 객체를 가리키지 않는다. 그래서 function으로 적어야함.
    this.user = user;
  },
  setAccessFunction: function (accessToken) {
    this.accessToken = accessToken;
  },
  setRole: function (role) {
    this.role = role;
  },
});

export default AppContext;

//AppContext를 제공하는 provider 컴포넌트 생성 및 내보내기
//초기값을 줄때 localstorage에 담겨있던 값을 넣어줌(context에서!!) - 새로고침시에도 로그인 유지!
export function AppContextProvider(props) {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const value = {
    user,
    accessToken,
    role,
    setUser,
    setAccessToken,
    setRole,
  };

  //상태가 변경되면 스토리지에 상태저장
  useEffect(() => {
    localStorage.setItem("user", user);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("role", role);
  }, [user, accessToken, role]);

  return (
    <AppContext.Provider value={value}>
      {props.children} {/**자식들에게 value값 모두 전달 */}
    </AppContext.Provider>
  );
}
