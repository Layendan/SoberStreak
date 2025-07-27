<script lang="ts">
	import type { PageProps } from './$types';

	import CounterWrapper from '$lib/components/CounterWrapper.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { enhance } from '$app/forms';
	import { flip } from 'svelte/animate';

	let { data, form }: PageProps = $props();

	let newCounterModal: HTMLDialogElement;
</script>

<div class="mx-2 h-full">
	<div
		class="carousel carousel-vertical carousel-center rounded-box border-base-200 bg-base-200 h-4/5 w-full space-y-2 border-8">
		{#each data.counters ?? [] as counter (counter.id)}
			<li animate:flip={{ duration: 300 }}>
				<CounterWrapper {counter} />
			</li>
		{:else}
			{#if data.session?.user}
				<p class="m-auto text-center">
					You have no counters yet.
					<br />
					Create one to start tracking your sobriety!
				</p>
			{:else}
				<div class="flex flex-col items-center m-auto gap-2">
					<p>Please sign in to create and view your counters.</p>
					<button class="btn btn-primary btn-block btn-lg" onclick={() => signIn('discord')}>
						Sign In with Discord
					</button>
				</div>
			{/if}
		{/each}
	</div>

	<div class="divider my-1"></div>

	<button
		class="btn btn-secondary btn-block btn-lg"
		onclick={() => newCounterModal.showModal()}
		disabled={!data.session?.user}>
		Add New Counter
	</button>
</div>
<dialog id="new_counter_modal" class="modal" bind:this={newCounterModal}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Create New Counter</h3>
		{#if form?.message}
			<p class="text-error">{form.message}</p>
		{/if}
		<form
			method="POST"
			action="?/create"
			class="mt-2 flex flex-row gap-2"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update();

					if (result.type === 'success') newCounterModal.close();
				};
			}}>
			<input
				type="text"
				name="title"
				placeholder="Counter Title"
				class="input input-bordered w-full"
				required />
			<button class="btn btn-info">Create</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
