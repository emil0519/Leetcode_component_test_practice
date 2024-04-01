import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isEmpty: boolean;
}

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

export const StyledInput = styled.input<StyledInputProps>`
  border-radius: 4px;
  border-color: ${(props) => props.theme.colors.lightGrey};
  padding: 4px;
  border: 1px solid ${({ isEmpty }) => (isEmpty ? "red" : "black")};
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

export {};
