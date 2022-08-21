import styled from "styled-components";

export const PasswordBlockerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  h3 {
    margin: 28px 0 8px 0;
    color: ${({ theme }) => `${theme.colors.white}`};
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => `${theme.colors.white}`};
  opacity: 0.5;
  margin: 0 0 16px 0;
`;
