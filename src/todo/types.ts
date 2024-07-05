export interface Todo {
  id: string;
  createdAt: Date;
  doneAt?: Date;
  title: string;
  userId: string;
}

export interface CreateTodoProps {
  title: string;
  userId: string;
}

export interface DeleteTodoProps {
  userId: string;
  todoId: string;
}

export interface FilterTodoProps {
  search: string;
  status: TodoStatus;
}

export interface GetAllTodoProps {
  userId: string;
  filter: Partial<FilterTodoProps>;
}

export interface GetTodoByIdProps {
  userId: string;
  todoId: string;
}

export interface CompleteTodoProps {
  userId: string;
  todoId: string;
}

export interface Tag {
  id: string;
  createdAt: string;
  userId: string;
  name: string;
}

export enum TodoStatus {
  COMPLETED = 'COMPLETED',
  UNCOMPLETED = 'UNCOMPLETED',
}
