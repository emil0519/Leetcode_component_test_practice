import styled from "styled-components";
import { PriceInput } from "./component/priceInput";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyle";

const theme = {
  colors: {
    lightGrey: "#f0f0f0",
    darkGrey: "#333333",
    red: "#f5425a",
    lightRed: "#F9EAE8",
  },
};

const OuterWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <OuterWrapper>
        <PriceInput />
      </OuterWrapper>
    </ThemeProvider>
  );
}

export default App;
