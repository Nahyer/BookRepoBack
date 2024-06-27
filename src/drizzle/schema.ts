import { pgTable, serial, varchar, integer,boolean } from "drizzle-orm/pg-core";


export const BookTable = pgTable('Books', { 
    id : serial('id').primaryKey(),
    title: varchar('title').notNull(),
    author: varchar('author').notNull(),
    year: integer('year').notNull(),
    pages: integer('pages').notNull()
});

export type TIBook = typeof BookTable.$inferInsert;
export type TSBook = typeof BookTable.$inferSelect;