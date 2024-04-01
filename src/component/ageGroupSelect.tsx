import {
  GreyLabel,
  FlexContainer,
  GreyContaner,
  StyledInput,
  WarningArea,
  ColumnFlexbox,
} from "../styles";
export const AgeGroupSelect = () => (
  <ColumnFlexbox>
    <GreyLabel htmlFor="ageRange">年齡</GreyLabel>
    <FlexContainer>
      <StyledInput type="number" id="startAge" value={0} isEmpty={false} />
      <GreyContaner>-</GreyContaner>
      <StyledInput type="number" id="startAge" value={20} isEmpty={false} />
    </FlexContainer>
    <WarningArea>Warning text</WarningArea>
  </ColumnFlexbox>
);
