import { createGlobalStyle } from "styled-components";
import { BREAKPOINTS, COMMON } from "./abstracts/_variables";

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: #FFFFFF;
    --black: #000000;

    --light-gray-100: #FAFAFA;
    --light-gray-200: #F7F7FA;
    --light-gray-300: #F6F6F7;
    --light-gray-400: #F3F4F7;
    --light-gray-500: #F2F2F5;
    --light-gray-600: #FDF8F2;

    --gray-100: #EDEDF0;
    --gray-200: #E6E6E6;
    --gray-250: #BFC5D1;
    --gray-300: #B7B7C0;
    --gray-400: #919AAC;
    --gray-550: #5D5E6C;
    --gray-600: #4B4B62;
    --gray-700: #7C7B7B;
    --gray-800: #313131;
    --gray-900: #231F20;

    --red-50: #E5A8A8;
    --red-100: #EA4335;
    --red-400: #AA1F18;
    --red-500: #C81818;
    --red-600: #D91C1C;

    --orange-50: #FFb900;
    --orange-100: #FF9000;
    --orange-125: #FF9026;
    --orange-150: #ED8A1D;
    --orange-200: #E58122;
    --orange-250: #FF7B00;
    --orange-300: #FF5C00;

    --yellow-100: #F9BC04;

    --green-100: #CEEBD8;
    --green-400: #109E41;
    --green-600: #5BCA00;

    --blue-100: #D1E8FF;
    --blue-300: #4286d4;

    --brown-100: #FFE5C3;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow: hidden;
    background: var(--gray-600);
  }

  button, a {
    cursor: pointer;
  }

  body, input, textarea, select, button {
    font: 400 ${COMMON.FONT_SIZE_BASE} "Roboto", sans-serif;
    color: var(--white);
  }


  @media (max-width: ${BREAKPOINTS.xl}) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: ${BREAKPOINTS.lg}) {
    html {
      font-size: 87.5%;
    }
  }

  @media (max-width: ${BREAKPOINTS.md}) {
    html {
      font-size: 82.25%;
    }
  }

  /** default scrollbar
  width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--orange-100);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--orange-250);
  }
`;
