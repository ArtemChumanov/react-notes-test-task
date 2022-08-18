import {Route, Routes} from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";

const Routers = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path={"signIn"} element={<SignIn/>} />
                <Route path={"signUp"} element={<SignUp/>}/>
            </Route>
        </Routes>
    );
};
export  default Routers