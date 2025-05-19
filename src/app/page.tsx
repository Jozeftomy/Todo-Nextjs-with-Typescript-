import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getTodos } from "../../api";

export default async function Home() {
  const tasks =  await getTodos();
  console.log(tasks);
  return (
    <main className="max-w-4xl m-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Todo</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
