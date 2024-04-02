import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ColumnFlexbox, FlexContainer } from "../styles/styles";
import { AgeGroupSelect } from "./ageGroupSelect";
import { PriceInput } from "./priceInput";
import { AgeGroupType } from "../type";
import { getNumberIntervals } from "../utils/getNumberIntervals";

interface PropsType {
  onChange: (agePriceList: string) => void;
}

export const AgeGroupPriceList = ({
  onChange,
}: PropsType): React.ReactElement => {
  const defaultAgePrice = { ageGroup: [0, 20], price: "0", id: 0 };
  const [agePriceList, setAgePriceList] = useState<AgeGroupType[]>([
    defaultAgePrice,
  ]);
  const [isDisableAddPrice, setIsDisableAddPrice] = useState<boolean>(false);
  const [isShowOverlapWarning, setIsShowOverlapWarning] =
    useState<boolean>(false);

  useEffect(() => {
    const formattedAgePriceList = agePriceList.map(
      (item) =>
        `{ ageGroup:[${item.ageGroup.join(", ")}], price:${item.price} }`
    );
    onChange(`result = [\n${formattedAgePriceList.join(",\n")}\n]`);
  }, [agePriceList, onChange]);

  useEffect(() => {
    handleIsDiablePrice(setIsDisableAddPrice);
    handleShowOverlapWarning(setIsShowOverlapWarning);
  }, [agePriceList]);

  /**
   * Disable add button when all ages between 0 ~ 20 are selected
   * @param setter set state function to disable / enable add button
   */
  const handleIsDiablePrice = (
    setter: (isDisablePrice: boolean) => void
  ): void => {
    const ageGroupList = getAgeGroupList(agePriceList);
    const isIncludeAllAge =
      getNumberIntervals(ageGroupList).notInclude.length === 0 &&
      ageGroupList.length !== 0;
    setter(isIncludeAllAge);
  };

  /**
   * Show overlap warning of "年齡區間不可重疊" when ages selected overlap
   * @param setter set state function to show overlap warning
   */
  const handleShowOverlapWarning = (
    setter: (isShowOverlapWarning: boolean) => void
  ): void => {
    const ageGroupList = getAgeGroupList(agePriceList);
    console.log("overlap", getNumberIntervals(ageGroupList).overlap);
    const isAgeOverlap =
      getNumberIntervals(ageGroupList).overlap.length !== 0 &&
      ageGroupList.length !== 0;
    setter(isAgeOverlap);
  };

  const getAgeGroupList = (agePriceList: AgeGroupType[]): number[][] =>
    agePriceList.map((item) => item.ageGroup);

  const updateAgeGroup = (
    selectedIndex: number,
    newAgeRange: number[]
  ): void => {
    setAgePriceList(
      agePriceList.map((item, index) => {
        if (index === selectedIndex) {
          return { ...item, ageGroup: newAgeRange };
        }
        return item;
      })
    );
  };
  const updatePrice = (index: number, newPrice: string): void => {
    setAgePriceList(
      agePriceList.map((item, i) => {
        if (i === index) {
          return { ...item, price: newPrice };
        }
        return item;
      })
    );
  };

  return (
    <React.Fragment>
      {agePriceList.map((item, index) => (
        <ColumnFlexbox key={item.id}>
          <FlexSpaceBetween>
            <PriceHeader>價格設定 - {index + 1}</PriceHeader>
            {index !== 0 && (
              <RemoveButton
                onClick={() =>
                  setAgePriceList((prevList) =>
                    prevList.filter((_, idx) => idx !== index)
                  )
                }
              >
                X 移除
              </RemoveButton>
            )}
          </FlexSpaceBetween>
          <FlexWithMarginGap>
            <AgeGroupSelect
              ageRange={agePriceList[index].ageGroup}
              setAgeRange={(newAgeRange) => updateAgeGroup(index, newAgeRange)}
              isShowOverlapWarning={isShowOverlapWarning}
            />
            <PriceInput
              inputFee={agePriceList[index].price.toString()}
              setInputFee={(fee) => updatePrice(index, fee)}
            />
          </FlexWithMarginGap>
          <AddButton
            onClick={() =>
              setAgePriceList((prevList) => [
                ...prevList,
                { ...defaultAgePrice, id: prevList.length + 1 },
              ])
            }
            disabled={isDisableAddPrice}
          >
            + 新增價格設定
          </AddButton>
        </ColumnFlexbox>
      ))}
    </React.Fragment>
  );
};

const PriceHeader = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.darkGrey};
`;

const FlexWithMarginGap = styled(FlexContainer)`
  margin: 12px 0;
  gap: 12px;
`;

const FlexSpaceBetween = styled(FlexContainer)`
  justify-content: space-between;
`;

const AddButton = styled.button`
  color: ${(props) =>
    props.disabled ? props.theme.colors.darkGrey : props.theme.colors.green};
  font-weight: bold;
  align-self: flex-start;
`;

const RemoveButton = styled.button`
  color: ${(props) => props.theme.colors.red};
`;
