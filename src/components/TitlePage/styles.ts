import styled from 'styled-components';

export const Legend = styled.legend`
  width: 100%;

  font-size: 32px;
  line-height: 34px;
  color: #5c8599;
  font-weight: 700;

  border-bottom: 1px solid #d3e2e5;
  margin-bottom: 20px;
  padding-bottom: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  a {
    margin: 5px;
  }
  @media (max-width: 700px) {
    font-size: 22px;
    text-align: center;
    button {
      font-size: 18px;
    }
  }
`;
