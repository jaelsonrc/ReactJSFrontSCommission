import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrorRed?: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  background: #f5f8fa;
  border: 1px solid #d3e2e5;
  color: #5c8599;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrorRed &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #04d361;
      border-color: #04d361;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #04d361;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #5c8599;

    &::placeholder {
      color: #5c8599;
    }
  }

  svg {
    margin-right: 16px;
  }

  label {
    margin-right: 10px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
