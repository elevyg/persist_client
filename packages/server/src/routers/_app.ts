/**
 * This file contains the root router of your tRPC-backend
 */
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  wakeUp: publicProcedure.mutation(async () => {
    const data = Math.floor(Math.random() * 100);
    console.log("woke up", data);
    // return random number
    return data;
  }),
});

export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
