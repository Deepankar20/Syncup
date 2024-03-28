import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;

      try {
        const user = await ctx.db.user.findFirst({
          where: {
            username,
          },
        });

        if (user) {
          return {
            data: null,
            code: 401,
            message: "User Already Registered",
          };
        }

        const newUser = await ctx.db.user.create({
          data: {
            username,
            password,
          },
        });

        return {
          data: newUser,
          code: 201,
          message: "User Created Successfully",
        };
      } catch (error) {
        return {
          data: null,
          code: 501,
          message: "Internal Server Error",
        };
      }
    }),

  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;

      try {
        const user = await ctx.db.user.findFirst({
          where: {
            username,
          },
        });

        if (!user) {
          return {
            data: null,
            code: 404,
            message: "User Not Found",
          };
        }

        return {
          data: user,
          code: 201,
          message: "User Logged In Successfully",
        };
      } catch (error) {
        return {
          data: null,
          code: 501,
          message: "Internal Server Error",
        };
      }
    }),

  
});
