import { Item } from "../types/Item";

type AddAction = {
  type: "add";
  payload: {
    text: string;
  };
};

type EditAction = {
  type: "edit";
  payload: {
    id: number;
    newText: string;
  };
};

type DoneAction = {
  type: "toogle";
  payload: {
    id: number;
  };
};

type RemoveAction = {
  type: "remove";
  payload: {
    id: number;
  };
};

type listAction = AddAction | EditAction | DoneAction | RemoveAction;

export const listReducers = (list: Item[], action: listAction) => {
  switch (action.type) {
    case "add":
      return [
        ...list,
        {
          id: list.length,
          text: action.payload.text,
          done: false,
        },
      ];
    case "edit":
      return list.map((item) => {
        if (item.id == action.payload.id) item.text = action.payload.newText;
        return item;
      });
    case "toogle":
      return list.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, done: !item.done };
        } else {
          return item;
        }
      });
    case "remove":
      return list.filter((item) => item.id != action.payload.id);
    default:
      return list;
  }
};
