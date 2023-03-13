// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Home from "../pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ChooseTeam } from "../pages/ChooseTeam";

export function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/chooseTeam" element={<ChooseTeam/>} />
      </Routes>
  );
}

export default App;
