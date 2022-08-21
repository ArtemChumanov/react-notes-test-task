import styled from "styled-components";

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const AuthPageStyle = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(102.46deg, #504099 4.53%, #4b4af9 98.77%);
`;
export const OutSideContainer = styled.div`
  background: linear-gradient(166.49deg, #212226 13.59%, #020202 104.12%);
  width: 377px;
  min-height: 457px;
  padding: 32px;
  border-radius: 24px;
  position: relative;
`;
export const InsideContainer = styled.div``;
export const NavigateButton = styled.button<{ active: boolean }>`
  background: transparent;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: white;
  opacity: 0.5;
  padding: 0 0 8px 0;
  border: 0;
  border-bottom: ${({ active }) => (active ? "2px solid #dfa549" : "none")};
  margin-right: 32px;
  cursor: pointer;
`;
