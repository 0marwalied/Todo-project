import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITodo } from "@/types";
import { Badge } from "@/components/ui/badge";
import TodosTableActions from "./TodosTableActions";

const TodosTabel = ({ todos }: { todos: ITodo[] }) => {
  return (
    <Table>
      <TableCaption>A list of your todos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Body</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.title}</TableCell>
            <TableCell>{todo.body}</TableCell>
            <TableCell>
              {todo.completed ? (
                <Badge className="p-3 flex justify-center items-center">
                  Completed
                </Badge>
              ) : (
                <Badge
                  className="p-3 flex justify-center items-center"
                  variant="secondary"
                >
                  Uncompleted
                </Badge>
              )}
            </TableCell>
            <TableCell className="flex justify-end space-x-2">
              <TodosTableActions todo={todo} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TodosTabel;
