import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const { email, uid, accessToken } = useAppSelector((state) => state.users);

  return {
    isAuth: !!accessToken,
    email,
    uid,
  };
};
