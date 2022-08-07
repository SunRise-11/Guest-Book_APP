import React, { Fragment, useState } from "react";
import { deleteCookie, setCookie } from "cookies-next";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { atom, useAtom } from "jotai";
import { decodeToken } from "react-jwt";

export type User = {
  username: string;
  isAdmin: boolean;
};

export type JWT = {
  sub: string;
  roles: string[];
  iss: string;
  exp: number;
};

export const userAtom = atom<User | undefined>(undefined);

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });

    const data = await res.json();

    setCookie("access_token", data.access_token);
    setCookie("refresh_token", data.refresh_token);
    const decoded = decodeToken<JWT>(data.access_token);

    if (decoded) {
      setUser({
        username: decoded.sub,
        isAdmin: decoded?.roles.some((role) => role === "ROLE_ADMIN"),
      });
    }
  };

  const handleSignOut = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setUser(undefined);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
          {user ? "Account" : "Login"}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          {user?.username && (
            <div className="px-4 py-3">
              <p className="text-sm">
                Signed in as <b>{user.username}</b>
              </p>
            </div>
          )}
          {user ? (
            <div className="py-1">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    type="submit"
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }
                      block w-full text-left px-4 py-2 text-sm`}
                    onClick={(e) => handleSignOut(e)}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          ) : (
            <div className="py-1">
              <div className="px-3 py-4 space-y-3">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="jsmith"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => handleLogin(e)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Login
                </button>
              </div>

              {user && (
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      type="submit"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }
                      block w-full text-left px-4 py-2 text-sm`}
                      onClick={(e) => handleSignOut(e)}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Login;
