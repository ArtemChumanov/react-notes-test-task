import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../../components/shared/Modal/Modal";
import Sidebar from "./Sidebar/Sidebar";
import NotesCreator from "./NotesCreator/NotesCreator";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteFolder, getNotesByUserId } from "../../redux/notes/notesThunk";

const Home = () => {
  const { isAuth, uid } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const { currentIdFolder } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getNotesByUserId(uid as string));
  }, [dispatch, uid]);

  const confirmHandle = () => {
    dispatch(deleteFolder(currentIdFolder));
    setOpenModal(false);
  };

  return isAuth ? (
    <HomeWrapper>
      {openModal && (
        <Modal
          setOpenModal={() => setOpenModal(false)}
          onClick={confirmHandle}
        />
      )}
      <WindowWrapper>
        <Sidebar />
        <NotesCreator setOpenModal={() => setOpenModal(true)} />
      </WindowWrapper>
    </HomeWrapper>
  ) : (
    <Navigate to="/signIn" replace />
  );
};

export default Home;

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  gap: 4px;
  background: black;
  position: relative;
  justify-content: center;
  align-items: center;
`;
export const WindowWrapper = styled.div`
  width: 1200px;
  height: 570px;
  display: flex;
`;
