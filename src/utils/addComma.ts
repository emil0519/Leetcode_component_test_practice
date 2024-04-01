export const addComma = (input: number | string): string => {
    const parts = input.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] || "";
  
    const processedIntegerPart = integerPart.replace(/,/g, "");
    const formattedIntegerPart = processedIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return `${formattedIntegerPart}${decimalPart ? `.${decimalPart}` : ""}`;
  };
  