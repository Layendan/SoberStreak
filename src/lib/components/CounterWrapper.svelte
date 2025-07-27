<script lang="ts">
	import type { Counter as CounterType } from '$lib/server/db/schema';

	import { enhance } from '$app/forms';
	import { scale } from 'svelte/transition';
	import Counter from './Counter.svelte';

	let { counter }: { counter: CounterType } = $props();

	let disabled = $state(false);
</script>

<div class="card lg:card-side bg-base-100 h-full shadow-xl" transition:scale>
	<div class="card-body">
		<h2 class="card-title">{counter.title}</h2>
		<p>Started on: {counter.date.toLocaleDateString()}</p>
		<div class="grow-[2]">
			<Counter date={counter.date} />
		</div>
		<div class="grid grid-cols-2 gap-2">
			<form method="POST" action="/?/reset" use:enhance>
				<input type="hidden" name="id" value={counter.id} />
				<button type="submit" class="btn btn-primary btn-block btn-sm mt-2" {disabled}>
					Reset Counter
				</button>
			</form>
			<form method="POST" action="/?/delete" use:enhance>
				<input type="hidden" name="id" value={counter.id} />
				<button type="submit" class="btn btn-error btn-block btn-sm mt-2" {disabled}>
					Delete Counter
				</button>
			</form>
		</div>
	</div>
</div>
