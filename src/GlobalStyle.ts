import { createGlobalStyle } from "styled-components";
import Montserrat from "./fonts/Montserrat/Montserrat-Bold.ttf";

const GlobalStyle = createGlobalStyle`

  :root {
    --image-wrapper-padding: 1.43vh;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url(${Montserrat}) format('truetype')
  }
`;

export default GlobalStyle;