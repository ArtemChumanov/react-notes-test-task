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
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";
import NotesCreator from "./NotesCreator/NotesCreator";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setDeleteFolders } from "../../redux/notes/noteSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "@firebase/firestore";
import { auth, db } from "../../config/firebase";
import { getNotesByUserId, updateFolder } from "../../redux/notes/notesThunk";

const Home = () => {
  const { isAuth } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [statusNoteCreating, setStatusNoteCreating] = useState(true);
  const { currentFolder, folders, currentIdFolder, currentFolderIndex } =
    useAppSelector((state) => state.notes);

  // const docRef = doc(db, "folders");
  // //console.log(col);
  // getDoc(docRef).then((res) => console.log(res));

  console.log(auth);
  useEffect(() => {
    dispatch(getNotesByUserId("asasdssdd"));
  }, []);
  useEffect(() => {
    currentIdFolder &&
      dispatch(
        updateFolder({
          folderId: currentIdFolder,
          currentFolder: folders[currentFolderIndex],
        })
      );
  }, [folders]);

  const dispatch = useAppDispatch();
  const confirmHandle = () => {
    dispatch(setDeleteFolders(folders[currentFolder].id));
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

const NotesWrapper = styled.div`
  //width: calc(100% - 300px);
  flex-grow: 1;
  background: black;
  border-radius: 0 30px 30px 0;
`;
const ContentWrapper = styled.div`
  display: flex;
`;
