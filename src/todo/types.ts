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
  id: string;
  userId: string;
}

export interface GetTodoByIdProps {
  userId: string;
  todoId: string;
}

export interface Tag {
  id: string;
  createdAt: string;
  userId: string;
  name: string;
}
