import Cookies from "js-cookie";

import { User } from "../components/Login";

class TokenService {
  getLocalRefreshToken() {
    const cookie = Cookies.get("user");
    if (cookie) {
      const user = JSON.parse(cookie) as undefined | User;
      return user?.refreshToken;
    }
  }
  getLocalAccessToken() {
    const cookie = Cookies.get("user");
    if (cookie) {
      const user = JSON.parse(cookie) as undefined | User;
      return user?.accessToken;
    }
  }
  updateLocalAccessToken(token: string) {
    const cookie = Cookies.get("user");
    if (cookie) {
      const user = JSON.parse(cookie) as undefined | User;
      if (user) {
        user.accessToken = token;
        return Cookies.set("user", JSON.stringify(user));
      }
    }
  }
  getUser() {
    const cookie = Cookies.get("user");
    if (cookie) {
      const user = JSON.parse(cookie) as undefined | User;
      return user;
    }
  }
  setUser(user: User) {
    return Cookies.set("user", JSON.stringify(user));
  }
  removeUser() {
    return Cookies.remove("user");
  }
}

export default new TokenService();
