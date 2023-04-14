// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.css";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ChooseTeam } from "../pages/ChooseTeam";
import React, { useEffect } from "react";
import { useAuthStore } from "../stores/AuthStore";
import AuthService from "../api/services/AuthService";
import LocalStorageService from "../api/services/LocalStorageService";
import axios, { AxiosError } from "axios";
import { Project } from "../pages/Project";
import ProjectList from "../pages/ProjectList";
import { ProjectMembers } from "../pages/ProjectMembers";
import Guide from "../pages/Guide";
import ResetPassword from "../pages/ResetPassword";

export function App() {
  const login = useAuthStore((state) => state.login);

  // effect to check if the current access token is valid.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const me = await AuthService.getMe();
        if (me.data && me.status === 200) {
          login(AuthService.parseJwt(LocalStorageService.getToken()));
        }
      } catch (e: unknown | AxiosError) {
        // if the error is 401 (unauthorized) then we clean the token,
        // because it is no longer valid.
        if (axios.isAxiosError(e) && e.response?.status === 401) {
          LocalStorageService.cleanToken();
        }
      }
    };
    checkAuth();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/password/reset" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chooseTeam" element={<ChooseTeam />} />
      <Route path="/project/:id" element={<Project />} />
      <Route path="/project/:id/members" element={<ProjectMembers />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path={"/guide"}  element={<Guide />}/>
    </Routes>
  );
}

export default App;
