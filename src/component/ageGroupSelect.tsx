import { useMemo } from "react";
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
import { AgeGroupType } from "../type";

interface PropsType {
  ageRange: AgeGroupType["ageGroup"];
  setAgeRange: (ageRange: AgeGroupType["ageGroup"]) => void;
  isShowOverlapWarning: boolean;
 }

export const AgeGroupSelect = ({
  ageRange,
  setAgeRange,
  isShowOverlapWarning
}: PropsType): React.ReactElement => {
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
          aria-label="startAge"
          data-testid="startAge"
          $isRedBorder={ageRange[0] === ageRange[1]}
          value={ageRange[0]}
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
          aria-label="endAge"
          data-testid="endAge"
          $isRedBorder={ageRange[0] === ageRange[1]}
          value={ageRange[1]}
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
      {(ageRange[0] === ageRange[1] || isShowOverlapWarning) && (
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
  border: 1px solid ${({ $isRedBorder }) => ($isRedBorder ? "red" : "black")};
  min-width: 100px;
`;
