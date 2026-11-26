import EditTodoForm from "./EditTodoForm";
import DeleteTodoDialog from "./DeleteTodoDialog";
import { ITodo } from "@/types";

const TodosTableActions = ({ todo }: { todo: ITodo }) => {
  return (
    <>
      <EditTodoForm todo={todo} />
      <DeleteTodoDialog todo={todo} />
    </>
  );
};

export default TodosTableActions;
