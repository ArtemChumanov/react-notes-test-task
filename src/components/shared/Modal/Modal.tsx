import React, { FC, useRef } from "react";
import styled from "styled-components";
import Flex from "../Flex/Flex";
import Image from "../Image/Image";
// @ts-ignore
import Trash from "../../../assets/icons/trash.svg";
import Button from "../Button/Button";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

interface ModalProps {
  setOpenModal: (arg: any) => void;
  onClick: () => void;
}

const Modal: FC<ModalProps> = ({ setOpenModal, onClick }) => {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, setOpenModal);

  return (
    <ModalWrapper>
      <ModalWindow ref={modalRef}>
        <Flex>
          <ImageBlock>
            <Image src={Trash} imageSize={[36, 41]} />
          </ImageBlock>
          <TextBlock>
            <h3>Delete this</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur incididunt ut labore et
              dolore magna aliqua.
            </p>
          </TextBlock>
        </Flex>
        <ButtonWrapper>
          <Button
            imageButton={false}
            label={"Ok"}
            styles={{
              padding: [8, 0, 8, 0],
              width: 150,
              height: 43,
              background: "#313866",
            }}
            onClick={onClick}
          />
        </ButtonWrapper>
      </ModalWindow>
    </ModalWrapper>
  );
};

export default Modal;
export const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 50;
`;
export const ModalWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  background: #212226;
  border: 1px solid #575757;
  border-radius: 8px;
  padding: 32px 18px;
`;
export const ImageBlock = styled.div`
  width: 115px;
  height: 82px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  box-sizing: border-box;
`;
export const TextBlock = styled.div`
  //flex-grow: 1;
  h3 {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin: 0 0 16px;
  }
  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 0 auto;
`;
