import { useAtom } from "jotai";
import React, { PropsWithChildren, useEffect } from "react";
import Login, { userAtom } from "./components/Login";
import tokenHandler from "./lib/tokenHandler";

const isToken = (token: any): boolean => token && typeof token === "string";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (!user) {
      const storedUser = tokenHandler.getUser();
      if (storedUser !== undefined) {
        setUser(storedUser);
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
