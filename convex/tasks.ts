import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { v4 } from "uuid";
import { StatusValidator } from "./schema";
import { Id } from "./_generated/dataModel";

export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export const listTasks = query({
  // Validators for arguments.
  args: {},

  // Function implementation.
  handler: async (ctx, args) => {
    // Read the database as many times as you need here.
    // See https://docs.convex.dev/database/reading-data.
    const tasks = await ctx.db.query("kanban_tasks").collect();

    // Arguments passed from the client are properties of the args object.
    // console.log(args.first, args.second);

    // Write arbitrary JavaScript here: filter, aggregate, build derived data,
    // remove non-public properties, or create new objects.
    return tasks;
  }
});

export const addTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.insert("kanban_tasks", {
      id: v4(),
      title: args.title,
      description: args.description ?? "",
      status: "TODO"
    });

    return task;
  }
});

export const updateTask = mutation({
  args: {
    _id: v.id("kanban_tasks"),
    // id: v.optional(v.string())
    status: StatusValidator
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.patch(args._id, { status: args.status });

    return task;
  }
});

export const removeTask = mutation({
  args: {
    _id: v.id("kanban_tasks")
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.delete(args._id);

    return task;
  }
});
