import type { Todo } from "@components/todo-list/consts";
import { HttpResponse, delay, type HttpResponseResolver } from "msw";

interface TodoServiceConfig {
  todos?: Todo[];
  delayAmount?: number;
}

class TodoService {
  private _delayAmount: number;
  private _todos: Todo[];

  constructor({ todos = [], delayAmount = 200 }: TodoServiceConfig) {
    this._todos = todos;
    this._delayAmount = delayAmount;
  }

  getTodos: HttpResponseResolver = async () => {
    await delay(this._delayAmount);
    return HttpResponse.json(this._todos, { status: 200 });
  };

  getTodo: HttpResponseResolver = async ({ params }) => {
    try {
      const { id } = params;

      await delay(this._delayAmount);
      return HttpResponse.json(
        this._todos.find((todo) => todo.id === id),
        { status: 200 },
      );
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) message = e.message;
      return HttpResponse.json({ message }, { status: 400 });
    }
  };

  addTodo: HttpResponseResolver = async ({ request }) => {
    try {
      const { content } = (await request.json()) as { content: string };

      const newTodo = {
        id: String(this._todos.length + 1),
        content,
        completed: false,
      };
      this._todos.push(newTodo);

      await delay(this._delayAmount);
      return HttpResponse.json(newTodo, { status: 201 });
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) message = e.message;
      return HttpResponse.json({ message }, { status: 400 });
    }
  };

  editTodo: HttpResponseResolver = async ({ request, params }) => {
    try {
      const { id } = params;
      const { content } = (await request.json()) as { content: string };

      const index = this._todos.findIndex((todo) => todo.id === id);
      this._todos[index].content = content;

      await delay(this._delayAmount);
      return HttpResponse.json(this._todos[index], { status: 200 });
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) message = e.message;
      return HttpResponse.json({ message }, { status: 400 });
    }
  };

  toggleTodo: HttpResponseResolver = async ({ params }) => {
    try {
      const { id } = params;

      const index = this._todos.findIndex((todo) => todo.id === id);
      this._todos[index].completed = !this._todos[index].completed;

      await delay(this._delayAmount);
      return HttpResponse.json(this._todos[index], { status: 200 });
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) message = e.message;
      return HttpResponse.json({ message }, { status: 400 });
    }
  };

  deleteTodo: HttpResponseResolver = async ({ params }) => {
    try {
      const { id } = params;

      const index = this._todos.findIndex((todo) => todo.id === id);
      this._todos.splice(index, 1);

      await delay(this._delayAmount);
      return HttpResponse.json({ status: 200 });
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) message = e.message;
      return HttpResponse.json({ message }, { status: 400 });
    }
  };
}

export default TodoService;
