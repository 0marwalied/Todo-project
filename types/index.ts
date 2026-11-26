interface ITodo {
  id: string;
  userId: string;
  title: string;
  body?: string | null;
  completed?: boolean;
  createdAt: Date;
}

export type { ITodo };
