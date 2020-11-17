import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Slink = styled(Link)`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 15px;
  display: block;
  text-decoration: none;
  color: #a8a8b3;
  display: flex;
  align-items: center;
  transition: transform 0.2s;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  strong {
    font-size: 20px;
    color: #3d3d4d;
  }

  div {
    margin: 0 10px;
    flex: 1;

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }

  svg {
    margin-left: auto;
    color: #cbcbd6;
  }

  &:active {
    color: #a8a8b3;
  }
  &:hover {
    a,
    svg,
    p > strong {
      color: #04d361;
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;
    img {
      display: none;
    }
    svg {
      display: none;
    }

    div {
      margin-bottom: 10px;
    }
    strong {
      display: block;
      width: 100%;
      font-size: 16px;
      text-align: center;
    }

    p {
      padding-top: 10px;
      font-size: 14px;
    }
  }
`;
