import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  form {
    margin-top: 40px;
  }
  div + div {
    margin-top: 10px;
  }
`;
