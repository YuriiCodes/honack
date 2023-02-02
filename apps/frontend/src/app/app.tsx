// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Home from "../pages/Home";
import {Route, Routes} from "react-router-dom";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
