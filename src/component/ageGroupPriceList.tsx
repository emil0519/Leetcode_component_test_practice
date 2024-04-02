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
  const [isAddPriceDisable, setIsAddPriceDisalbe] = useState<boolean>(false);

  useEffect(() => {
    const formattedAgePriceList = agePriceList.map(item =>
      `{ ageGroup:[${item.ageGroup.join(', ')}], price:${item.price} }`
    );
    onChange(`result = [\n${formattedAgePriceList.join(',\n')}\n]`);
  }, [agePriceList, onChange]);

  useEffect(()=>{
    const ageGroupList = agePriceList.map(item=> item.ageGroup);
    console.log(getNumberIntervals)
  },[agePriceList])

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
            />
            <PriceInput
              inputFee={agePriceList[index].price.toString()}
              setInputFee={(fee) => updatePrice(index, fee)}
            />
          </FlexWithMarginGap>
          <GreenButton
            onClick={() =>
              setAgePriceList((prevList) => [
                ...prevList,
                { ...defaultAgePrice, id: prevList.length + 1 },
              ])
            }
          >
            + 新增價格設定
          </GreenButton>
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

const GreenButton = styled.button`
  color: ${(props) => props.theme.colors.green};
  font-weight: bold;
  align-self: flex-start;
`;

const RemoveButton = styled.button`
  color: ${(props) => props.theme.colors.red};
`;
