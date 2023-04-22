import { toast } from "react-hot-toast";
import { TODO } from "../types";
import { todoInput } from "../types";
import { api } from "../utils/api";
import React, { ChangeEvent, FormEvent } from "react";
import { TRPCContext } from "@trpc/react-query/shared";

const CreateTodo: React.FC = () => {
  const [newTodo, setNewTodo] = React.useState<string>("");

  const trpc = api.useContext();

  const { mutate } = api.todo.create.useMutation({
    onSettled: async () => {
      setNewTodo("");
      await trpc.todo.all.invalidate();
    },
  });
  return (
    <div>
      <form
        onSubmit={(e: FormEvent<HTMLElement>) => {
          e.preventDefault();
          const result = todoInput.safeParse(newTodo);
          if (!result.success) {
            toast.error(result.error.format()._errors.join("\n"));
            return;
          }
          mutate(newTodo);
        }}
        className="flex gap-2"
      >
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="New Todo..."
          type="text"
          name="new-todo"
          id="new-todo"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.currentTarget.value)
          }
          value={newTodo}
        />
        <button className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
