/**
 * The Convex HTTP router for this app.
 *
 * This defines the app's public API. It is used to handle incoming HTTP requests.
 *
 * You can add routes to this router using the various methods on its API, such as
 * `http.get()`, `http.post()`, `http.put()`, and `http.delete()`. See the
 * [Convex docs](https://docs.convex.dev/http) for more information.
 */

import { httpRouter } from "convex/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

export default http;
