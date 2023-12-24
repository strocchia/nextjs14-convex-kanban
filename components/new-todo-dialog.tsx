"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function NewTodoDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addTask = useMutation(api.tasks.addTask);

  const closeWait = () => new Promise(resolve => setTimeout(resolve, 500));

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (title === "") {
      // throw Error("title can't be blank");
      toast.error("`title` field can't be blank");
      return;
    }

    if (typeof title !== "string" || typeof description !== "string") {
      return;
    }

    addTask({ title, description });

    closeWait().then(() => {
      setOpen(false);
      setTitle("");
      setDescription("");
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='sm' className='hover:outline'>
          + Todo
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add a Todo</DialogTitle>
          <DialogDescription>What do you want to accomplish?</DialogDescription>
        </DialogHeader>
        <form
          id='todo-form'
          className='grid gap-4 py-4'
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-4 items-center gap-4'>
            <Input
              id='title'
              name='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              // defaultValue=''
              placeholder='Todo title goes here...'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Textarea
              id='description'
              name='description'
              rows={5}
              value={description}
              onChange={e => setDescription(e.target.value)}
              // defaultValue=''
              placeholder='Describe the todo...'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Button type='submit' size='sm' className='col-span-1'>
              Add it
            </Button>
          </div>
        </form>
        <DialogFooter>
          {/* <DialogTrigger asChild>
            <Button type='submit' size='sm' form='todo-form'>
              Add Todo
            </Button>
          </DialogTrigger> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
