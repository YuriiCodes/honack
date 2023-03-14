import $api from "../http";
import LocalStorageService from "./LocalStorageService";
import { AuthApiResponse, GetMeApiResponse, UserFromToken } from "@honack/util-shared-types";

export default class AuthService {
  static async signUp(email: string, password: string, username: string) {
    const response = await $api.post<AuthApiResponse>("/auth/register", {
      email,
      password,
      username
    });
    if (response.status === 201) {
      LocalStorageService.setToken(response.data.access_token);
    }
    return response;
  }

  static async login(email: string, password: string) {
    const response = await $api.post<AuthApiResponse>("/auth/login", {
      email, password
    });
    if (response.status === 200) {
      LocalStorageService.setToken(response.data.access_token);
    }
    return response;
  }

  static async getMe() {
    return await $api.get<GetMeApiResponse>("/auth/me");
  }
  static logout() {
    LocalStorageService.cleanToken();

  }

  static parseJwt(token: string): UserFromToken {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(window.atob(base64).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));

    return JSON.parse(jsonPayload) as UserFromToken;
  }
}
