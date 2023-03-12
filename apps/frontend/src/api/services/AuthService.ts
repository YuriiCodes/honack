import $api from "../http";
import LocalStorageService from "./LocalStorageService";
export default class AuthService {
  static async signUp(email:string, password:string, username:string) {
    const response = await $api.post('/auth/register', {
      email,
      password,
      username,
    });
    if (response.status === 201) {
      console.log(response.data.access_token)
      LocalStorageService.setToken(response.data.access_token);
    }
    return response;
  }
}
