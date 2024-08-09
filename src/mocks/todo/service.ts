import { HttpResponse, delay, type HttpResponseResolver } from "msw";
import { todos } from "./data";

export const getTodos: HttpResponseResolver = async () => {
  await delay(200);
  return HttpResponse.json(todos, { status: 200 });
};

export const getTodo: HttpResponseResolver = async ({ params }) => {
  try {
    const { id } = params;

    await delay(200);
    return HttpResponse.json(
      todos.find((todo) => todo.id === id),
      { status: 200 }
    );
  } catch (e) {
    let message = "Unknown Error";
    if (e instanceof Error) message = e.message;
    return HttpResponse.json({ message }, { status: 400 });
  }
};

export const addTodo: HttpResponseResolver = async ({ request }) => {
  try {
    const { content } = (await request.json()) as { content: string };

    const newTodo = {
      id: String(todos.length + 1),
      content,
      completed: false,
    };
    todos.push(newTodo);

    await delay(200);
    return HttpResponse.json(newTodo, { status: 201 });
  } catch (e) {
    let message = "Unknown Error";
    if (e instanceof Error) message = e.message;
    return HttpResponse.json({ message }, { status: 400 });
  }
};

export const editTodo: HttpResponseResolver = async ({ request, params }) => {
  try {
    const { id } = params;
    const { content } = (await request.json()) as { content: string };

    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].content = content;

    await delay(200);
    return HttpResponse.json(todos[index], { status: 200 });
  } catch (e) {
    let message = "Unknown Error";
    if (e instanceof Error) message = e.message;
    return HttpResponse.json({ message }, { status: 400 });
  }
};

export const toggleTodo: HttpResponseResolver = async ({ params }) => {
  try {
    const { id } = params;

    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].completed = !todos[index].completed;

    await delay(200);
    return HttpResponse.json(todos[index], { status: 200 });
  } catch (e) {
    let message = "Unknown Error";
    if (e instanceof Error) message = e.message;
    return HttpResponse.json({ message }, { status: 400 });
  }
};

export const deleteTodo: HttpResponseResolver = async ({ params }) => {
  try {
    const { id } = params;

    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);

    await delay(200);
    return HttpResponse.json({ status: 200 });
  } catch (e) {
    let message = "Unknown Error";
    if (e instanceof Error) message = e.message;
    return HttpResponse.json({ message }, { status: 400 });
  }
};
