"use client";

import Task from "./task";
import { useContext, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDragTaskStore } from "@/lib/dragStore";
import { Id } from "@/convex/_generated/dataModel";
import { KanbanContext } from "./KanbanProvider";

export default function Column({
  title,
  status
}: {
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}) {
  const { draggedId, setDraggedId } = useContext(KanbanContext);

  const tasks = useQuery(api.tasks.listTasks) || [];

  const filteredTasks = useMemo(
    () => tasks.filter(task => task.status === status),
    [tasks, status]
  );

  console.log(draggedId);

  // const draggedTask = useDragTaskStore(state => state.whichDraggedTask);
  // const onDragTask = useDragTaskStore(state => state.onDragTask);

  const updateTask = useMutation(api.tasks.updateTask);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // if (!draggedTask) return;
    // updateTask({ _id: draggedTask as Id<"kanban_tasks">, status });

    // // reset dragged task so you can potentially drag the next one
    // onDragTask("");

    if (!draggedId) return;

    updateTask({
      _id: draggedId as Id<"kanban_tasks">,
      status
    });

    setDraggedId("");
  };

  return (
    <section className='h-[600px] flex-1'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{title}</h2>

      <div
        className='mt-3.5 h-full w-full rounded-xl bg-gray-700/50 p-4'
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <div className='flex flex-col gap-4'>
          {filteredTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}

          {/* {filteredTasks.length === 0 && status === "TODO" && (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Create a new task</p>
            </div>
          )}

          {tasks.length && filteredTasks.length === 0 && status !== "TODO" ? (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Drag your tasks here</p>
            </div>
          ) : null} */}
        </div>
      </div>
    </section>
  );
}
