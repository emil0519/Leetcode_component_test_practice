import {
  GreyLabel,
  FlexContainer,
  GreyContaner,
  WarningArea,
  ColumnFlexbox,
  AlignLeftFlexBox,
  IsRedBorderType,
} from "../styles/styles";
import { AgeGroupType } from "../type";
import { addComma } from "../utils/addComma";
import styled from "styled-components";


interface PropsType {
  inputFee: AgeGroupType["price"];
  setInputFee: (fee: AgeGroupType["price"]) => void;
}

export const PriceInput = ({inputFee, setInputFee}:PropsType):React.ReactElement => {
  const isValidNumberString = (str: string): boolean => {
    return /^\d+(\.\d+)?$/.test(str.replace(/,/g, ""));
  };

  const getWarningText = (input: string): string => {
    switch (true) {
      case !input.length:
        return "不可以為空白";
      case !isValidNumberString(input):
        return "只能輸入數字";
      default:
        return "";
    }
  };

  return (
    <ColumnFlexbox>
      <GreyLabel htmlFor="accomendationFee">入住費用(每人每晚)</GreyLabel>
      <FlexContainer>
        <GreyContaner>TWD</GreyContaner>
        <StyledInput
          id="accomendationFee"
          placeholder="請輸入費用"
          value={inputFee}
          onChange={(e) => {
            console.log(inputFee)
            if (!inputFee.length) setInputFee("");
            setInputFee(e.target.value);
          }}
          onBlur={(e) => setInputFee(addComma(e.target.value))}
          $isRedBorder={!inputFee.length}
        />
      </FlexContainer>
      {(!inputFee.length || !isValidNumberString(inputFee)) && (
        <WarningArea>{getWarningText(inputFee)}</WarningArea>
      )}
      <AlignLeftFlexBox>
        <GreyLabel>輸入0表示免費</GreyLabel>
      </AlignLeftFlexBox>
    </ColumnFlexbox>
  );
};

export const StyledInput = styled.input<IsRedBorderType>`
  border-radius: 4px;
  border-color: ${(props) => props.theme.colors.lightGrey};
  padding: 4px;
  border: 1px solid ${({ $isRedBorder }) => ($isRedBorder ? "red" : "black")};
`;