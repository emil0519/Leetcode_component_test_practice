export const addComma = (number:number):string => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
