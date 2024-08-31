/**
 * Convex auth configuration
 *
 * This file configures the providers for login,
 * and the store for session management.
 *
 * The `convexAuth` function returns an object with
 * the following properties:
 *
 * - `auth`: a function that returns the current
 *   authenticated user, or `undefined` if there is
 *   none.
 * - `signIn`: a function that starts the sign-in
 *   flow.
 * - `signOut`: a function that signs the user out.
 * - `store`: the session store, which is a
 *   `convex-react` store that holds the current user.
 */

import { DataModel } from "./_generated/DataModel";
import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword, Google, GitHub],
});
