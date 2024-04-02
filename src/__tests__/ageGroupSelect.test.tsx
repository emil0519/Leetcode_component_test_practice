import { render, screen } from "@testing-library/react";
import { AgeGroupSelect } from "../component/ageGroupSelect";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/styles";

describe("AgeGroupSelect", () => {
  test("shows warning text when ageRange[0] equals ageRange[1]", () => {
    render(
      <ThemeProvider theme={theme}>
        <AgeGroupSelect
          ageRange={[19, 20]}
          setAgeRange={() => {}}
          isShowOverlapWarning={false}
        />
      </ThemeProvider>
    );
    expect(screen.queryByText("年齡區間不可重疊")).not.toBeInTheDocument();
  });
  test("hide warning text when ageRange[0] equals ageRange[1]", () => {
    render(
      <ThemeProvider theme={theme}>
        <AgeGroupSelect
          ageRange={[20, 20]}
          setAgeRange={() => {}}
          isShowOverlapWarning={false}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("年齡區間不可重疊")).toBeInTheDocument();
  });
});
