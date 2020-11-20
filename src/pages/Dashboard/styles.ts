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
    min-width: 800px;
    @media (max-width: 700px) {
      min-width: 300px;
    }
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

export const ItemList = styled.div`
  display: flex;
  align-items: center;

  > svg {
    width: 42px;
    height: 42px;
    color: #a8a8b3;
    cursor: pointer;
    &:hover {
      color: red;
    }

    @media (max-width: 700px) {
      display: none;
    }
  }
`;
