import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export interface IsRedBorderType extends InputHTMLAttributes<HTMLInputElement> {
  $isRedBorder: boolean;
}

export const theme = {
  colors: {
    lightGrey: "#f0f0f0",
    darkGrey: "#333333",
    red: "#f5425a",
    lightRed: "#F9EAE8",
    green: "#76CCCA"
  },
};

export const GreyLabel = styled.label`
  color: ${(props) => props.theme.colors.darkGrey};
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const GreyContaner = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  padding: 8px 4px;
  font-weight: #f0f0f0;
`;

export const WarningArea = styled.aside`
  color: ${(props) => props.theme.colors.red};
  background-color: ${(props) => props.theme.colors.lightRed};
  width: 100%;
  font-size: 10px;
  padding: 4px;
`;

export const ColumnFlexbox = styled(FlexContainer)`
  flex-direction: column;
  gap: 4px;
`;

export const AlignLeftFlexBox = styled(FlexContainer)`
  justify-content: flex-end;
`;

export {};
