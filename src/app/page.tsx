"use client";

import { useReducer, useState } from "react";
import { Item } from "./types/Item";
import { listReducers } from "./reducers/listReducers";

export default function Home() {
  const [list, dispatch] = useReducer(listReducers, []);
  const [addField, setAddField] = useState("");

  const handleAddItem = () => {
    if (addField.trim() === "") return false;
    dispatch({
      type: "add",
      payload: {
        text: addField.trim(),
      },
    });
    setAddField("");
  };

  const handleToogleDone = (id: number) => {
    dispatch({
      type: "toogle",
      payload: {
        id,
      },
    });
  };

  const handleEditText = (id: number) => {
    let item = list.find((it) => it.id === id);
    if (!item) return false;

    const newText = window.prompt("Editar o texto", item.text);
    if (!newText || newText.trim() === "") return false;

    dispatch({ type: "edit", payload: { id, newText } });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir")) return false;
    dispatch({ type: "remove", payload: { id } });
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-4xl my-4">Lista de Tarefas</div>
      <div className="max-w-2xl mx-auto flex gap-3 rounded-md border border-gray-400 p-4">
        <input
          type="text"
          className="flex-1 rounded-md p-3 outline-none border border-gray-400"
          placeholder="Digite um item"
          value={addField}
          onChange={(e) => setAddField(e.target.value)}
        />
        <button
          onClick={handleAddItem}
          className="p-4 border bg-gray-900 rounded-md text-white cursor-pointer hover:opacity-90"
        >
          Adicionar
        </button>
      </div>
      <ul className="max-w-2xl mx-auto">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex p-3 my-3 border-b border-gray-700 items-center"
          >
            <input
              type="checkbox"
              className="w-4 h-4 mr-4"
              checked={item.done}
              onClick={() => handleToogleDone(item.id)}
            />

            <p className={`flex-1 text-lg ${item.done ? "line-through" : ""}`}>
              {item.text}
            </p>
            <button
              onClick={() => handleEditText(item.id)}
              className="mx-4 bg-gray-400 hover:opacity-90 rounded-md py-1 px-2"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="mx-4 bg-gray-400 hover:opacity-90 rounded-md py-1 px-3"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
