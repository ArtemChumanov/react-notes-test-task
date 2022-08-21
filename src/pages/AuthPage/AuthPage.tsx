import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import Flex from "../../components/shared/Flex/Flex";
import Image from "../../components/shared/Image/Image";
// @ts-ignore
import LogoImg from "../../assets/icons/BT_Logo.svg";
import { useDispatch } from "react-redux";
import { clearData } from "../../redux/notes/noteSlice";
import { useAuth } from "../../hooks/useAuth";
import {
  AuthPageStyle,
  InsideContainer,
  LogoWrapper,
  NavigateButton,
  OutSideContainer,
} from "./AuthPage.styled";
import { cleanErrors } from "../../redux/users/userSlice";
import { useAppSelector } from "../../hooks/reduxHooks";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authLogin, setAuthLogin] = useState(true);
  const { isAuth } = useAuth();
  const { error } = useAppSelector((state) => state.users);

  const toggleFormHandle = () => {
    setAuthLogin(!authLogin);
    dispatch(cleanErrors());
  };

  useEffect(() => {
    isAuth && navigate("/");
  }, [isAuth, navigate]);

  useEffect(() => {
    dispatch(clearData());
  }, [dispatch]);

  return (
    <AuthPageStyle>
      <LogoWrapper>
        <Image
          src={LogoImg}
          imageSize={[196, 26]}
          styles={{ margin: [0, 0, 25, 0] }}
        />
        <OutSideContainer>
          <Flex styles={{ margin: [0, 0, 51, 0] }}>
            <NavigateButton onClick={toggleFormHandle} active={authLogin}>
              SIGN IN
            </NavigateButton>
            <NavigateButton onClick={toggleFormHandle} active={!authLogin}>
              SIGN UP
            </NavigateButton>
          </Flex>
          <InsideContainer>
            {authLogin ? (
              <SignIn errorMessage={error} />
            ) : (
              <SignUp errorMessage={error} />
            )}
          </InsideContainer>
        </OutSideContainer>
      </LogoWrapper>
    </AuthPageStyle>
  );
};

export default AuthPage;
