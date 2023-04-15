import { useAuthStore } from "../stores/AuthStore";
import AuthService from "../api/services/AuthService";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    logout();
    navigate("/");
  }
  return { handleLogout };
}
