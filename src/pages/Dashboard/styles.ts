import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 100%;
  form {
    margin-top: 40px;
    max-width: 100%;
  }
`;

export const Topo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  > div {
    margin-top: 0px !important;
  }
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Filtro = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
