import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import AuthPage from "../pages/AuthPage/AuthPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path={"signIn"} element={<AuthPage />} />
      </Route>
    </Routes>
  );
};
export default Routers;
