import styled from "styled-components";
import {
  GreyLabel,
  FlexContainer,
  GreyContaner,
  StyledInput,
  WarningArea,
} from "../styles";
import { useEffect, useState } from "react";
import { addComma } from "../utils/addComma";

const ColumnFlexbox = styled(FlexContainer)`
  flex-direction: column;
  gap: 4px;
`;

const AlignLeftFlexBox = styled(FlexContainer)`
  justify-content: flex-end;
`;

export const PriceInput = () => {
  const [inputFee, setInputFee] = useState<string>("0");
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
            if (!inputFee.length) setInputFee("");
            setInputFee(e.target.value);
          }}
          onBlur={(e) => setInputFee(addComma(e.target.value))}
          isEmpty={!inputFee.length}
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
