import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrorRed?: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  padding: 6px 0 7px 16px;
  width: 100%;
  background: #f5f8fa;
  border: 1px solid #d3e2e5;
  color: #5c8599;

  display: flex;
  align-items: center;

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

    div {
    background: #f5f8fa;
    color: #5c8599;
  }

  > div {
    flex: 1;
    background: #f5f8fa;
  }
  .react-select__control,
  .react-select__control:hover,
  .css-1pahdxg-control,
  .css-1pahdxg-control:hover {
    border: 0 !important;
    box-shadow: 0 0 0 0 transparent;
    border-color: none;
  }

  .react-select__option:hover {
    background: #ffffff;
    cursor: pointer;
  }
  .react-select__dropdown-indicator {
    margin-top: -5px;
  }

  .react-select__menu {
    width: calc(100% + 90px);
    transform: translateX(-90px);
  }

  > svg {
    margin-right: 16px;
  }

  label {
    margin-right: 10px;
  }

  input {
    caret-color: transparent;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  max-width: 36px;
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
