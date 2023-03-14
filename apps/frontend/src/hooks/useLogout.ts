import { useAuthStore } from "../stores/AuthStore";
import AuthService from "../api/services/AuthService";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    AuthService.logout();
    logout();
  }
  return { handleLogout };
}
