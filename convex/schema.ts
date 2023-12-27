import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// export const Status = {
//   // v.union(
//   // v.literal("TODO"),
//   // v.literal("IN_PROGRESS"),
//   // v.literal("DONE"))
// };

export const StatusValidator = v.union(
  v.literal("TODO"),
  v.literal("IN_PROGRESS"),
  v.literal("DONE")
);

export default defineSchema({
  kanban_tasks: defineTable({
    id: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    status: StatusValidator,
    listOrder: v.number()
  })
    .index("by_uuid", ["id"])
    .index("by_list_order", ["listOrder"]),

  users: defineTable({ name: v.string(), tokenIdentifier: v.string() }).index(
    "by_token",
    ["tokenIdentifier"]
  )
});
