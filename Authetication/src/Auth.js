import { createContext, useEffect, useState } from "react";
import { authSubscribe } from "@junobuild/core";
import { Login } from "./Login";
import { Logout } from "./Logout";
//入库！

export const AuthContext = createContext();
// 创建一个新的上下文并导出，以便其他组件可以使用这个上下文来访问和修改信息。

export const Auth = ({ children }) => {
/* 定义一个名为 Auth 的 React 组件，接收一个子组件，也就是我们在 App 导入的 Protected 。
 这个组件会负责处理登录和登出，并根据登录的状态来决定是否显示 Protected 组件。*/



 const [user, setUser] = useState(undefined);
/* 使用 useState 初始化一个状态变量 user，其初始值为 undefined。(未定义)
 setUser 函数用于更新这个状态。*/



  useEffect(() => {
    const sub = authSubscribe((user) => setUser(user));

    return () => sub.unsubscribe();
  }, []);
  /* 在组件挂载时更新订阅认证状态，组件卸载时取消订阅。
   当认证状态发生变化时，组件的 user 状态会相应地更新。*/
  
  

return (
    <AuthContext.Provider value={{ user }}> 
    /* 创建一个 AuthContext 的 Provider 组件，
     并将 user 对象传递给它。*/


      {user !== undefined && user !== null ? (
      /*如果 user 不等于未定义或者不为空，判断为已登录。*/
      
        <div>
          {children}
          <Logout />
          /* 登录后渲染组件 Protected 和 Logout*/
        </div>
      ) : (
        <div>
        <p>尚未登入！</p>
        <Login />
        /* 状态为未登录，渲染 Login 组件，显示尚未登录。*/
        </div>
      )}
    </AuthContext.Provider>
  );
};