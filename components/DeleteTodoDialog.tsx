"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteTodo } from "@/actions/todos.actions";
import { ITodo } from "@/types";
import Spinner from "./Spinner";

const DeleteTodoDialog = ({ todo }: { todo: ITodo }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await deleteTodo(todo.id);
      toast.success("Todo deleted.");
      setOpen(false);
    } catch {
      toast.error("Couldn't delete the todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="icon" variant="destructive" aria-label="Delete todo">
            <Trash size={16} />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete todo?</DialogTitle>
          <DialogDescription>
            &quot;{todo.title}&quot; will be permanently deleted. This can&apos;t
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" disabled={isLoading} />}>
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTodoDialog;
