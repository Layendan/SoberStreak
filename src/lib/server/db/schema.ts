import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const counters = pgTable('counters', {
	id: serial('id').primaryKey(),
	userId: text('user_id').notNull(),
	date: timestamp('date').notNull().defaultNow(),
	title: text('title').notNull()
});

export type Counter = typeof counters.$inferSelect;
