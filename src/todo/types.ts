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

export interface Tag {
  id: string;
  createdAt: string;
  userId: string;
  name: string;
}
