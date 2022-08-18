import { useSelector } from "react-redux";
import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const { email, id, token } = useAppSelector((state) => state.users);

  return {
    isAuth: !!token,
    email,
    id,
  };
};
