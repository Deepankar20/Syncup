import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const roomRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        techstack: z.string(),
        username: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description, techstack, username } = input;

      try {
        const newRoom = await ctx.db.room.create({
          data: {
            name,
            description,
            techstack,
            createdBy: username,
          },
        });

        return {
          code: 201,
          data: newRoom,
          message: "Room Created Successfully",
        };
      } catch (error) {
        return {
          code: 501,
          data: null,
          message: "Internal Server Error",
        };
      }
    }),

  getAllRooms: publicProcedure.mutation(async ({ ctx }) => {
    try {
      const allRooms = await ctx.db.room.findMany({});

      if (!allRooms) {
        return {
          code: 404,
          data: null,
          message: "rooms not found",
        };
      }

      return {
        data: allRooms,
        code: 201,
        message: "got all rooms",
      };
    } catch (error) {
      return {
        code: 501,
        data: null,
        message: "Internal Server Error",
      };
    }
  }),
});
