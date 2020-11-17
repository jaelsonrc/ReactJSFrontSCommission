import { createGlobalStyle } from 'styled-components';
import { shade } from 'polished';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #f0f0f5;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px 20px;
  }

  button {
    cursor: pointer;
  }

  .link{
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1.125em;
    line-height: 34px;
    color: #5c8599;
    font-weight: 800;
    background-color: transparent;
    border: 0;
  }


  .tbnLinkDefault {
    margin-top: 0;
    width: 42px;
    height: 42px;
    text-decoration: none;
    border: 0;
    cursor: pointer;
    border-radius: 20px;
    color: #ffffff;
    font-weight: 800;
    padding: 0 10px;
    transition: background-color 0.2s;
    background: #04d361;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }

    @media (max-width: 700px) {
      width: 32px;
      height: 32px;
    }
  }



      form.landing-page-form {
      max-width: 100%;
      background: #ffffff;
      border: 1px solid #d3e2e5;
      border-radius: 30px;
      padding: 20px 40px;

      @media (max-width: 700px) {
          background: transparent;
          padding: 5px;
          border: 0;
          width: 100%;
      }

      fieldset {
       border: 0;
      }
}
`;
