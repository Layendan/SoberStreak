import type { Actions, PageServerLoad } from './$types';

import { db } from '$lib/server/db';
import { counters } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import { and, desc, eq } from 'drizzle-orm';

export const load = (async ({ parent }) => {
	const { session } = await parent();

	if (!session?.user?.id) {
		return { session };
	}

	const countersResponse = await db
		.selectDistinct()
		.from(counters)
		.where(eq(counters.userId, session.user.id))
		.orderBy(desc(counters.date));

	return { session, counters: countersResponse };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ locals, request }) => {
		const session = await locals.auth();

		if (!session?.user?.id) {
			return fail(401, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const title = data.get('title')?.toString().trim();

		if (!title) {
			return fail(400, { title, missing: true, message: 'Title is required' });
		}

		try {
			await db.insert(counters).values({
				userId: session.user.id,
				title
			});
		} catch (err) {
			console.error('Error inserting counter:', err);
			return fail(500, { message: 'Failed to create counter' });
		}

		return { success: true };
	},
	reset: async ({ locals, request }) => {
		const session = await locals.auth();

		if (!session?.user?.id) {
			return fail(401, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const id = data.get('id')?.toString();

		if (!id) {
			return fail(400, { message: 'Counter ID is required' });
		}

		const parsedId = parseInt(id, 10);

		if (isNaN(parsedId)) {
			return fail(400, { message: 'Invalid Counter ID' });
		}

		try {
			await db
				.update(counters)
				.set({ date: new Date() })
				.where(and(eq(counters.id, parsedId), eq(counters.userId, session.user.id)));
		} catch (err) {
			console.error('Error resetting counter:', err);
			return fail(500, { message: 'Failed to reset counter' });
		}

		return { success: true };
	},
	delete: async ({ locals, request }) => {
		const session = await locals.auth();

		if (!session?.user?.id) {
			return fail(401, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const id = data.get('id')?.toString();

		if (!id) {
			return fail(400, { message: 'Counter ID is required' });
		}

		const parsedId = parseInt(id, 10);

		if (isNaN(parsedId)) {
			return fail(400, { message: 'Invalid Counter ID' });
		}

		try {
			await db
				.delete(counters)
				.where(and(eq(counters.id, parsedId), eq(counters.userId, session.user.id)));
		} catch (err) {
			console.error('Error deleting counter:', err);
			return fail(500, { message: 'Failed to delete counter' });
		}

		return { success: true };
	}
} satisfies Actions;
