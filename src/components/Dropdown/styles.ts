import styled from 'styled-components';

export const Container = styled.nav`
  position: relative;
  display: inline-block;

  .dropdown-content {
    display: block;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    top: 45px;
    right: -20px;
    transition: 1s;
  }

  .dropdown-content a,
  .dropdown-content button {
    color: #5c8599;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: normal;
    width: 100%;
    text-align: center;
    border: 0;
    background-color: transparent;
    margin: 0;
  }

  .dropdown-content a:hover,
  .dropdown-content button:hover {
    background-color: #f1f1f1;
  }

  &:hover .dropdown-content {
    opacity: 1;
    visibility: visible;
    transition: 1s;
  }
`;
