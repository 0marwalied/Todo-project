"use server";

import { todoFormSchema, type TodoFormValues } from "@/schema";
import { db as prisma } from "@/lib/db";
import { cacheTag, updateTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Server actions are public endpoints: every one re-checks who is calling.
async function requireUserId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

const todosTag = (userId: string) => `todos:${userId}`;

// Not exported: callers can't ask for another user's todos by passing an id.
async function getTodosByUserId(userId: string) {
  "use cache";
  cacheTag(todosTag(userId));
  return prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

const getTodos = async () => {
  // auth() reads headers, so it must stay outside "use cache".
  const userId = await requireUserId();
  return getTodosByUserId(userId);
};

const createTodo = async (values: TodoFormValues) => {
  const userId = await requireUserId();
  const data = todoFormSchema.parse(values);
  // userId comes from the session, never from the client.
  await prisma.todo.create({ data: { ...data, userId } });
  updateTag(todosTag(userId));
};

const updateTodo = async (id: string, values: TodoFormValues) => {
  const userId = await requireUserId();
  const data = todoFormSchema.parse(values);
  // Matching userId too means a user can only edit their own todos.
  await prisma.todo.update({ where: { id, userId }, data });
  updateTag(todosTag(userId));
};

const deleteTodo = async (id: string) => {
  const userId = await requireUserId();
  await prisma.todo.delete({ where: { id, userId } });
  updateTag(todosTag(userId));
};

export { getTodos, createTodo, updateTodo, deleteTodo };
