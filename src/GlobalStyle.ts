import { createGlobalStyle } from "styled-components";
import MontserratBold from "./fonts/Montserrat/Montserrat-Bold.ttf";
import MontserratSemiBold from "./fonts/Montserrat/Montserrat-SemiBold.ttf";

const GlobalStyle = createGlobalStyle`

  :root {
    --image-wrapper-padding: 1.43vh;
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 700;
    src: url(${MontserratBold}) format('truetype')
  }

  @font-face {
    font-family: 'Montserrat';
    font-weight: 600;
    src: url(${MontserratSemiBold}) format('truetype')
  }
`;

export default GlobalStyle;