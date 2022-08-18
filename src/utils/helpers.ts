import { IFolder, INote } from "../types/types";

export const findIndexById = (arrayOfObj: any, currentId: any) => {
  return arrayOfObj?.findIndex(({ id }: any) => id === currentId);
};

export const mutableArray = (
  array: IFolder[],
  fields: INote,
  currentId: string,
  nestId: number | null,
  action: string
) => {
  const findIndexChangeArray = array.findIndex((i: any) => i.id === currentId);
  console.log(array[findIndexChangeArray]?.notesList);
  let newField = {};
  if (action === "edit") {
    const findIndexNestArray = array[findIndexChangeArray].notesList.findIndex(
      (n: any) => n.id === nestId
    );
    newField = {
      ...array[findIndexChangeArray],
      notesList: [
        ...array[findIndexChangeArray].notesList.slice(0, findIndexNestArray),
        {
          ...array[findIndexChangeArray].notesList[findIndexNestArray],
          ...fields,
        },
        ...array[findIndexChangeArray].notesList.slice(findIndexNestArray + 1),
      ],
    };
  } else {
    newField = {
      ...array[findIndexChangeArray],
      notesList: [
        ...array[findIndexChangeArray].notesList,
        {
          ...fields,
          time: "1",
          id: array[findIndexChangeArray].notesList.length + 1,
        },
      ],
    };
  }

  return {
    updatedArray: [
      ...array.slice(0, findIndexChangeArray),
      newField,
      ...array.slice(findIndexChangeArray + 1),
    ],
    updatedItem: newField,
  };
};

export const iterate = (v: number[] | string[]) => {
  const stylesRes: string[] = [];
  v.forEach((i) => stylesRes.push(i === "auto" ? `${i}` : `${i}px`));
  return stylesRes.join(" ");
};
