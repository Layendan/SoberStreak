<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';

	let { date }: { date: Date } = $props();

	const currentTime = new SvelteDate();
	let timeDiff = $derived(Math.max(currentTime.getTime() - date.getTime(), 0));
	let totalDays = $derived(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
	let totalHours = $derived(Math.floor(timeDiff / (1000 * 60 * 60)));
	let totalMinutes = $derived(Math.floor(timeDiff / (1000 * 60)));
	let totalSeconds = $derived(Math.floor(timeDiff / 1000));

	$effect(() => {
		const interval = setInterval(() => currentTime.setTime(Date.now()), 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="relative flex items-center justify-center">
	<!-- Days (outermost) -->
	<div
		class="radial-progress text-primary relative flex items-center justify-center"
		style="--value:{Math.min((totalDays / 365) * 100, 100)}; --size:16rem; --thickness: 1.5rem;"
		aria-valuenow={totalDays}
		role="progressbar"
		aria-label="Days">
		<!-- Hours -->
		<div
			class="radial-progress text-secondary relative flex items-center justify-center"
			style="--value:{((totalHours % 24) / 24) * 100}; --size:12rem; --thickness: 1.5rem;"
			aria-valuenow={totalHours % 24}
			role="progressbar"
			aria-label="Hours">
			<!-- Minutes -->
			<div
				class="radial-progress text-accent relative flex items-center justify-center"
				style="--value:{((totalMinutes % 60) / 60) * 100}; --size:8rem; --thickness: 1.5rem;"
				aria-valuenow={totalMinutes % 60}
				role="progressbar"
				aria-label="Minutes">
				<!-- Seconds (innermost) -->
				<div
					class="radial-progress text-success relative flex items-center justify-center"
					style="--value:{((totalSeconds % 60) / 60) * 100}; --size:4rem; --thickness: 1.5rem;"
					aria-valuenow={totalSeconds % 60}
					role="progressbar"
					aria-label="Seconds">
				</div>
			</div>
		</div>
	</div>
</div>

<div class="flex flex-col items-center justify-center text-center">
	<div class="mt-3 grid grid-cols-4 gap-4">
		<div class="flex flex-col items-center">
			<div class="text-base-content text-2xl font-bold">
				{totalDays}
			</div>
			<div class="text-base-content/70 text-sm tracking-wider uppercase">days</div>
		</div>
		<div class="flex flex-col items-center">
			<div class="text-base-content text-2xl font-bold">
				{totalHours % 24}
			</div>
			<div class="text-base-content/70 text-sm tracking-wider uppercase">hours</div>
		</div>
		<div class="flex flex-col items-center">
			<div class="text-base-content text-2xl font-bold">
				{totalMinutes % 60}
			</div>
			<div class="text-base-content/70 text-sm tracking-wider uppercase">min</div>
		</div>
		<div class="flex flex-col items-center">
			<div class="text-base-content text-2xl font-bold">
				{totalSeconds % 60}
			</div>
			<div class="text-base-content/70 text-sm tracking-wider uppercase">sec</div>
		</div>
	</div>
</div>
