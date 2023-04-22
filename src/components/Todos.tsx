import { api } from "../utils/api";
import Todo from "./Todo";

export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>error</div>;

  return (
    <>
      {todos.length
        ? todos.map((todo) => <Todo key={todo.id} {...todo} />)
        : "create your first todo"}
    </>
  );
}
