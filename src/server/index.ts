import { Scalar } from "@scalar/hono-api-reference";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { j } from "./jstack";
import { postRouter } from "./routers/post-router";

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


/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = j.mergeRouters(app, {
  post: postRouter,
});
export type AppRouter = typeof appRouter;

// Add routes to the main app router, not the base app
appRouter
  .get(
    "/docs/json",
    openAPISpecs(appRouter, {
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
        url: "/api/docs/json", // Fixed: Full path to the JSON endpoint
      };
    }),
  )
  .get(
    "/status",
    describeRoute({
      description: "Checks if the API is up.",
    }),
    async (c) => {
      // Added actual response
      return c.json({ status: "ok", timestamp: new Date().toISOString() });
    },
  );

// Export the merged router, not the base app
export default appRouter;