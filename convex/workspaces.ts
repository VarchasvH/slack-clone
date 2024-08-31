import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { auth } from "./auth";
export const create = mutation({
  args: {
    name: v.string(),
  },
  /**
   * Creates a new workspace with the given name and associates it with the currently
   * authenticated user.
   *
   * @param args.name The name of the workspace to create.
   * @returns The ID of the newly created workspace.
   * @throws Error If the user is not authenticated.
   */
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) throw new Error("Unauthorized");

    //: TODO: Create a proper method later
    const joinCode = "123456";

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    return workspaceId;
  },
});
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});
