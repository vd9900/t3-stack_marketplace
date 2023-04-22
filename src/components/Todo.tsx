import { TODO } from "../types";
import { api } from "../utils/api";
import React, { ChangeEvent, MouseEvent } from "react";

const Todo: React.FC<TODO> = ({ text, id, done }) => {
  const trpc = api.useContext();
  // toggle done button
  const { mutate: toggleMutation } = api.todo.toggle.useMutation({
    onSettled: () => {
      trpc.todo.all.invalidate();
    },
  });

  // delete todo
  const { mutate: deleteMutation } = api.todo.delete.useMutation({
    onSettled: () => {
      trpc.todo.all.invalidate();
    },
  });

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input
            className="focus:ring-3 h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            type="checkbox"
            name="done"
            id={id}
            checked={done}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              toggleMutation({ id, done: e.target.checked });
            }}
          />
          <label
            htmlFor={id}
            className={`cursor-pointer ${done ? "line-through" : ""}`}
          >
            {text}
          </label>
        </div>
        <button
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            deleteMutation(id);
          }}
          className="w-full rounded-lg bg-blue-700 px-2 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Todo;
