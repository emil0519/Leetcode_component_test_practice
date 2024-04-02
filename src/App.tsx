import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/globalStyle";
import { AgeGroupPriceList } from "./component/ageGroupPriceList";
import { theme } from "./styles/styles";



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
        <AgeGroupPriceList onChange={result => console.log(result)}/>
      </OuterWrapper>
    </ThemeProvider>
  );
}

export default App;
