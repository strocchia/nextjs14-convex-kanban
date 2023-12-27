"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from "react";
import { Id, Doc } from "@/convex/_generated/dataModel";

export const KanbanContext = createContext({
  draggedId: "",
  setDraggedId: (state: string) => {},
  draggedItem: {},
  setDraggedItem: (state: Doc<"kanban_tasks">) => {}
});

const initialTaskFormat = {
  _id: "" as Id<"kanban_tasks">,
  _creationTime: 0,
  description: "",
  id: "",
  status: "TODO" as "TODO" | "IN_PROGRESS" | "DONE",
  title: ""
};

export function KanbanContextProvider({ children }: { children: ReactNode }) {
  const [draggedId, setDraggedId] = useState<string>("");
  const [draggedItem, setDraggedItem] =
    useState<Doc<"kanban_tasks">>(initialTaskFormat);

  return (
    <KanbanContext.Provider
      value={{
        draggedId,
        setDraggedId,
        draggedItem,
        setDraggedItem
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
