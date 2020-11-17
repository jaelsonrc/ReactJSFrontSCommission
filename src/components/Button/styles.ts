import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  ${props =>
    !props.className &&
    css`
      margin-top: 34px;
      width: 100%;
      height: 64px;
      cursor: pointer;
      border-radius: 20px;
      color: #ffffff;
      font-weight: 800;
      border: 0;
      padding: 0 16px;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;
      background: #04d361;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      &:hover {
        background: ${shade(0.2, '#04d361')};
      }
    `}
`;
