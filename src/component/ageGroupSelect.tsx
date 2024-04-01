import { useMemo, useState } from "react";
import {
  GreyLabel,
  FlexContainer,
  GreyContaner,
  WarningArea,
  ColumnFlexbox,
  AlignLeftFlexBox,
  IsRedBorderType,
} from "../styles/styles";
import styled from "styled-components";

export const AgeGroupSelect = (): React.ReactElement => {
  const [ageRange, setAgeRange] = useState<number[]>([0, 20]);
  const startOptions = useMemo(() => {
    if (ageRange[1] !== 20) {
      return Array.from({ length: 21 }, (_, index) => ({
        value: index,
        isDisabled: index <= ageRange[1] ? false : true,
      }));
    }
    return Array.from({ length: 21 }, (_, index) => ({
      value: index,
      isDisabled: false,
    }));
  }, [ageRange]);

  const endOptions = useMemo(() => {
    if (ageRange[0] !== 0) {
      return Array.from({ length: 21 }, (_, index) => ({
        value: index,
        isDisabled: index >= ageRange[0] ? false : true,
      }));
    }
    return Array.from({ length: 21 }, (_, index) => ({
      value: index,
      isDisabled: false,
    }));
  }, [ageRange]);

  return (
    <ColumnFlexbox>
      <GreyLabel htmlFor="ageRange">年齡</GreyLabel>
      <FlexContainer>
        <StyledSelect
          id="startAge"
          isRedBorder={ageRange[0] === ageRange[1]}
          onChange={(e) => setAgeRange([Number(e.target.value), ageRange[1]])}
        >
          {startOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.isDisabled}
            >
              {option.value}
            </option>
          ))}
        </StyledSelect>
        <GreyContaner>~</GreyContaner>
        <StyledSelect
          id="endAge"
          isRedBorder={ageRange[0] === ageRange[1]}
          onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
        >
          {endOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.isDisabled}
            >
              {option.value}
            </option>
          ))}
        </StyledSelect>
      </FlexContainer>
      {ageRange[0] === ageRange[1] && (
        <WarningArea>年齡區間不可重疊</WarningArea>
      )}
      <AlignLeftFlexBox>
        <GreyLabel>年齡範圍限制 0 ~ 20 歲</GreyLabel>
      </AlignLeftFlexBox>
    </ColumnFlexbox>
  );
};

const StyledSelect = styled.select<IsRedBorderType>`
  border-radius: 4px;
  border-color: ${(props) => props.theme.colors.lightGrey};
  padding: 4px;
  border: 1px solid ${({ isRedBorder }) => (isRedBorder ? "red" : "black")};
  min-width: 100px;
`;
