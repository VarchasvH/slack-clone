// This file exports a Convex query that returns the user identified by the
// `Authorization` header. The `auth` module is used to get the user ID from
// the header.
//
// This query is used in the client to get the current user.
import { auth } from "./auth";
import { query } from "./_generated/server";

export const current = query({
  args: {},
  /**
   * Get the user identified by the Authorization header, or null if none.
   */
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (userId === null) return null;

    return await ctx.db.get(userId);
  },
});
