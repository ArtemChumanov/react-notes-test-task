import styled from "styled-components";

export const DropdownWrapper = styled.div`
  position: absolute;
  width: 264px;
  background: ${({ theme }) => `${theme.backgrounds.middleBlack}`};
  border: 1px solid #575757;
  border-radius: 8px;
  top: 100%;
  right: 0;
  padding: 16px;
  z-index: 20;
`;

export const Item = styled.div`
  display: block;
  span {
    display: block;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => `${theme.colors.white}`};
    padding: 10px;
  }
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

export const SearchItem = styled(Item)``;
