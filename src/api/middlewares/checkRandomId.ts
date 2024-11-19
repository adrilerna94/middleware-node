
export const isValidRandom = (num : number) : boolean => {
  return !isNaN(num) && Number.isInteger(num) && num >= 1;
}
