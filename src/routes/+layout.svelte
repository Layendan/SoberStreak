<script lang="ts">
	import '../app.css';

	import type { LayoutProps } from './$types';

	import { signIn, signOut } from '@auth/sveltekit/client';
	import { thumbs } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';

	import '@fontsource/chewy';

	let { children, data }: LayoutProps = $props();

	const avatar = createAvatar(thumbs, {
		size: 32
	}).toDataUri();
</script>

<header class="navbar bg-base-200 mb-2 rounded-b-lg px-2 shadow-sm">
	<a class="navbar-start mr-auto gap-2" href="/">
		<enhanced:img src="/static/soberstreak.png" alt="SoberStreak Logo" class="h-8 w-8">
		</enhanced:img>
		<h1 class="text-2xl font-bold">SoberStreak</h1>
	</a>
	<details class="dropdown dropdown-end">
		<summary class="btn btn-ghost btn-circle avatar">
			<img
				class="h-8 w-8 rounded-full object-cover"
				src={data.session?.user?.image ?? avatar}
				alt="Avatar" />
		</summary>
		<ul class="menu dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
			<li class="text-center font-bold">
				Welcome, {data.session?.user?.name ?? 'Guest'}!
			</li>
			<div class="divider m-0"></div>
			<li>
				<button
					class="btn btn-block btn-sm {data.session?.user ? 'btn-error' : 'btn-primary'}"
					onclick={() => (data.session?.user ? signOut() : signIn('discord'))}>
					{data.session?.user ? 'Sign Out' : 'Sign In'}
				</button>
			</li>
		</ul>
	</details>
</header>

{@render children()}
