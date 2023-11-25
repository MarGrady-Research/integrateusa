export const sortOnOrder = (
  firstString: string,
  secondString: string,
  order: string[]
) => {
  const getIndex = (str: string) => order.indexOf(str);

  return getIndex(firstString) - getIndex(secondString);
};
