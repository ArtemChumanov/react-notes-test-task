import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
// @ts-ignore
import LogoImage from "../../assets/icons/BT_Logo.svg";
// @ts-ignore
import Folder from "../../assets/icons/folder.svg";
// @ts-ignore
import AddFolderImage from "../../assets/icons/folder-add.svg";
import Modal from "../../components/shared/Modal/Modal";
import Sidebar from "./Sidebar/Sidebar";
import NotesCreator from "./NotesCreator/NotesCreator";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setDeleteFolders } from "../../redux/notes/noteSlice";
import { deleteFolder, getNotesByUserId } from "../../redux/notes/notesThunk";

const Home = () => {
  const { isAuth } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const { currentIdFolder } = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(getNotesByUserId("asasdssdd"));
  }, []);

  const dispatch = useAppDispatch();
  const confirmHandle = () => {
    dispatch(setDeleteFolders(currentIdFolder));
    dispatch(deleteFolder(currentIdFolder));
    setOpenModal(false);
  };

  return isAuth ? (
    <HomeWrapper>
      {openModal && (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClick={confirmHandle}
        />
      )}
      <Sidebar />
      <NotesCreator setOpenModal={() => setOpenModal(true)} />
    </HomeWrapper>
  ) : (
    <Navigate to="/signIn" replace />
  );
};

export default Home;

const HomeWrapper = styled.div`
  width: 1200px;
  height: 570px;
  display: flex;
  gap: 4px;
  background: black;
`;
