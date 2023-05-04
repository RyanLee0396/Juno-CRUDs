import { signIn } from "@junobuild/core";

export const Login = () => {
    return (
        <button onClick={() => signIn()}>点击进行II登录</button>
    );
    }