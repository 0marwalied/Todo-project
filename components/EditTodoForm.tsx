"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoFormSchema, type TodoFormValues } from "@/schema";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { updateTodo } from "@/actions/todos.actions";
import Spinner from "./Spinner";
import { ITodo } from "@/types";

const EditTodoForm = ({ todo }: { todo: ITodo }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    values: {
      title: todo.title,
      body: todo.body as string,
      completed: todo.completed,
    },
  });

  async function onSubmit(data: TodoFormValues) {
    try {
      setIsLoading(true);
      await updateTodo(todo.id, data);
      toast("The todo has been updated.", {
        position: "bottom-right",
        closeButton: true,
        duration: 3000,
      });
    } catch (error) {
      toast.error("An error occurred while updating the todo.", {
        position: "bottom-right",
        description: `${error}`,
        closeButton: true,
        duration: 3000,
      });
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger
          render={
            <Button size="icon" aria-label="Edit todo">
              <Pen size={16} />
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm p-0">
          <Card className="w-full sm:max-w-md">
            <CardHeader>
              <CardTitle>Edit Todo</CardTitle>
              <CardDescription>Update your task.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="todo-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="todo-form-title">Title</FieldLabel>
                        <Input
                          {...field}
                          id="todo-form-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Buy groceries"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="body"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="todo-form-body">
                          Body (optional)
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            id="todo-form-body"
                            placeholder="Milk, eggs, bread"
                            rows={6}
                            className="min-h-24 resize-none"
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums">
                              {field.value?.length || 0}/80 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription>
                          Any extra details about the task.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="completed"
                    control={form.control}
                    render={({ field }) => (
                      <Field orientation="horizontal">
                        <Checkbox
                          id="todo-form-completed"
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                        <FieldLabel htmlFor="todo-form-completed">
                          Mark as completed
                        </FieldLabel>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation="horizontal">
                <DialogClose
                  render={<Button type="button" variant="outline" />}
                  onClick={() => form.reset()}
                >
                  Cancel
                </DialogClose>
                <Button type="submit" form="todo-form">
                  {isLoading ? (
                    <>
                      <Spinner /> Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </Field>
            </CardFooter>
          </Card>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditTodoForm;
