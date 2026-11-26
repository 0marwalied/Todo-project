import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { getTodos } from "@/actions/todos.actions";
import AddTodoForm from "@/components/AddTodoForm";
import TodosTabel from "@/components/TodosTabel";
import Spinner from "@/components/Spinner";

// Reads request data (auth headers), so it must render inside <Suspense>.
async function Todos() {
  await auth.protect();
  const todos = await getTodos();
  return (
    <div className="flex flex-col gap-10 lg:w-5xl md:w-3xl w-full py-4">
      <div className="self-end">
        <AddTodoForm />
      </div>

      {!todos.length ? (
        <p className="text-center text-lg text-muted-foreground">
          No todos yet. Create one!
        </p>
      ) : (
        <TodosTabel todos={todos} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center space-y-2 p-2 w-full">
      <Suspense fallback={<Spinner />}>
        <Todos />
      </Suspense>
    </main>
  );
}
