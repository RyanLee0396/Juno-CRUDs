import { signOut } from "@junobuild/core";

export const Logout = () => {
    return (
        <button onClick={() => signOut()}>点击这里登出II</button>
    );
    }