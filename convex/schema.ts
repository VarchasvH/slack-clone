// This file defines the Convex data model for your app.
//
// The "Convex data model" is the set of tables and their schemas that Convex
// provides to you. The tables are stored in the `Convex` database.
//
// The `defineSchema` and `defineTable` functions are used to define the schema
// of the Convex data model.
//
// The `authTables` function is used to include the tables that are required for
// Convex's built-in auth features.

import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,

  workspaces: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }),

  members: defineTable({
    userId: v.id("users"),
    workspaceId: v.id("workspaces"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
    .index("by_user_id", ["userId"])
    .index("by_workspace_id", ["workspaceId"])
    .index("by_workspace_id_user_id", ["workspaceId", "userId"]),
});

export default schema;
