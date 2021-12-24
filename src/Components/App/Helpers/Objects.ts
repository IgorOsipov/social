import { usersType } from "../../../Types/types";

export const updateObjectInArray = (
  items: Array<usersType>,
  itemId: number,
  objPropName: string,
  newObjProps: {}
) => {
  return items.map((u) => {
    if (u[objPropName as keyof usersType] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};
