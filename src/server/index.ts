import { Scalar } from "@scalar/hono-api-reference";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { j } from "./jstack";

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 *
 * @see https://jstack.app/docs/backend/app-router
 */
const app = j
  .router()
  .basePath("/api")
  .use(j.defaults.cors)
  .onError(j.defaults.errorHandler);

import { postRouter } from "./routers/post-router";

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(app, {
  post: postRouter,
});
export type AppRouter = typeof appRouter;

app
  .get(
    "/docs/json",
    openAPISpecs(app, {
      documentation: {
        info: {
          title: "Hono API",
          version: "1.0.0",
          description: "JStack API",
        },
        servers: [
          { url: "http://localhost:3000", description: "Local Server" },
        ],
      },
    }),
  )
  .get(
    "/docs",
    Scalar((c) => {
      return {
        url: "/doc",
      };
    }),
  )
  .use(
    describeRoute({
      description: "itlog betlog",
    }),
  )
  .get(
    "/status",
    describeRoute({
      description: "itlog katlog",
    }),
    async (c) => {},
  );

export default app;
