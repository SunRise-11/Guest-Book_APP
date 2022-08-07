import { getCookie } from "cookies-next";
import { atom, useAtom } from "jotai";
import React, { PropsWithChildren, useEffect, useLayoutEffect } from "react";
import { decodeToken } from "react-jwt";
import Login, { JWT, userAtom } from "./components/Login";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!user?.username) {
      const accessToken = getCookie("access_token");
      if (accessToken && typeof accessToken === "string") {
        const decoded = decodeToken<JWT>(accessToken);

        if (decoded) {
          setUser({
            username: decoded.sub,
            isAdmin: decoded?.roles.some((role) => role === "ROLE_ADMIN"),
          });
        }
      }
    }
  }, [setUser, user]);

  return (
    <div>
      <header className="h-16 border-b w-full flex items-center justify-between px-6 bg-white">
        <h1 className="text-2xl">
          <b className="text-blue-600">Guest</b>book
        </h1>
        <div>
          <Login />
        </div>
      </header>

      <main className="m-auto border-r border-l max-w-4xl">
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
