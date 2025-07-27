import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/sveltekit/providers/discord';

export const { handle } = SvelteKitAuth({
	trustHost: true,
	providers: [Discord],
	callbacks: {
		jwt: ({ token, profile }) => {
			if (profile) {
				token.id = profile.id;
			}
			return token;
		},
		session: ({ session, token }) => {
			session.user.id = token.id as string;
			return session;
		}
	}
});
