import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyle";
import { AgeGroupPriceList } from "./component/ageGroupPriceList";

const theme = {
  colors: {
    lightGrey: "#f0f0f0",
    darkGrey: "#333333",
    red: "#f5425a",
    lightRed: "#F9EAE8",
    green: "#76CCCA"
  },
};

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100vh;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 100px 0;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <OuterWrapper>
        <AgeGroupPriceList />
      </OuterWrapper>
    </ThemeProvider>
  );
}

export default App;
