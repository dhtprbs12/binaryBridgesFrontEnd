import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-size: 10px;
    font-family: 'Roboto', sans-serif;
  }
  html, body {
    margin: 0px;
    height: 100%;
  }
`;

export default GlobalStyle;