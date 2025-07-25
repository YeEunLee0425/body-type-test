import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bodyTypeResults = pgTable("body_type_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gender: text("gender").notNull(),
  answers: jsonb("answers").notNull(),
  photos: jsonb("photos"),
  result: jsonb("result").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBodyTypeResultSchema = createInsertSchema(bodyTypeResults).pick({
  gender: true,
  answers: true,
  photos: true,
  result: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBodyTypeResult = z.infer<typeof insertBodyTypeResultSchema>;
export type BodyTypeResult = typeof bodyTypeResults.$inferSelect;
