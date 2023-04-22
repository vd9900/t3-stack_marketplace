import { z } from "zod";
import { AppRouter, appRouter } from "./server/api/root";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type allTodosOutput = RouterOutput["todo"]["all"];
export const todoInput = z
  .string({
    required_error: "Describe your tode",
  })
  .min(1)
  .max(20);

export type TODO = allTodosOutput[number];
