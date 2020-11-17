import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Topo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  a {
    text-decoration: none;
    color: #5c8599;
  }
  @media (max-width: 700px) {
    margin-top: 5px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 100%;
  line-height: 56px;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  img {
    border-radius: 5px;
  }
  @media (max-width: 700px) {
    font-size: 32px;
    flex-direction: column;
    margin-top: 15px;
  }
`;

export const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  margin: 20px auto;

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    @media (max-width: 700px) {
      height: 50px;
      width: 110px;
    }
    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }

  > div {
    width: 100%;
    display: flex;
    input {
      flex: 1;
      height: 70px;
      padding: 0 24px;
      border: 0;
      border-radius: 5px 0 0 5px;
      color: #3a3a3a;
      border: 2px solid #fff;
      border-right: 0;

      @media (max-width: 700px) {
        padding: 0 10px;
        height: 50px;
      }

      ${props =>
        props.hasError &&
        css`
          border-color: #c53030;
        `}

      &::placeholder {
        color: #a8a8b3;
      }
    }
  }
  @media (max-width: 700px) {
    padding: 5px;
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
