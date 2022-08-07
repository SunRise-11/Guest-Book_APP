import { getCookie, setCookie } from "cookies-next";
import { decodeToken, isExpired } from "react-jwt";

type Request = {
  url: string;
  options: RequestInit;
};

const requestAPI = async (
  { url, options }: Request,
  retry: number = 0
): Promise<any> => {
  if (retry > 2) {
    throw new Error("request failed to complete");
  }
  options = {
    ...options,
  };

  const res = await fetch(url, options);

  const data = await res.json();

  console.log(res.status);

  if (res.status === 401) {
    console.log("expired");
    const refreshToken = getCookie("refresh_token");
    if (refreshToken) {
      if (isExpired(refreshToken.toString())) {
        throw new Error("you need to login in");
      }

      const refresh = await fetch("http://localhost:8080/api/auth/refresh", {
        headers: {
          Authorization: "Bearer " + refreshToken.toString(),
        },
      });

      const refreshData = await refresh.json();

      setCookie("access_token", refreshData.access_token);
      setCookie("refresh_token", refreshData.refresh_token);

      return await requestAPI({ url, options }, retry + 1);
    }
  }

  if (!res.ok) {
    return Promise.reject(data.message);
  }

  return Promise.resolve(data);
};

export default requestAPI;
